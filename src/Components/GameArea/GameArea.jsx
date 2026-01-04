import { useParams, Link, useNavigate } from "react-router-dom";
import { styled, Button, Box, TextField } from "@mui/material";
import PictureA from "../../assets/PictureA.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import prettyMilliseconds from "pretty-ms";

const Base = styled("div")({
  display: "flex",
  width: "100%",
});

const Back = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  alignSelf: "start",
  margin: "15%",
});

const Sidebar = styled("div")(({ theme }) => ({
  flex: "0 1 250px",
  minWidth: "20%",
  borderRight: "1px solid #fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: theme.palette.primary.main,
}));

const ItemWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  color: theme.palette.primary.main,
  padding: "5% 0",
  margin: "5% 0",
  width: "100%",
}));

const Indicator = styled("div")({
  marginLeft: "15%",
});

const Item = styled("div")(({ theme }) => ({
  display: "flex",
  color: theme.palette.primary.main,
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  marginLeft: "3%",
}));

const Picture = styled("div")({
  flex: 2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const PictureWrapper = styled("div")({
  display: "inline-block",
  lineHeight: 0,
  width: "fit-content",
  maxWidth: "80%",
  position: "relative",
});

const Options = styled(Button)(({ show, option, left, top }) => ({
  width: "100px",
  height: "40px",
  position: "absolute",
  display: show,
  justifyContent: "center",
  alignItems: "center",
  left: left + 45,
  top: top + option - 20,
}));

const PictureContainer = styled("img")({
  display: "block",
  width: "100%",
});

const Modal = styled("div")(({ visible, theme }) => ({
  display: visible,
  position: "fixed",
  zIndex: 1,
  paddingTop: "10%",
  color: theme.palette.primary.main,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgb(0, 0, 0)",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
}));

const ModalContent = styled("div")(({ theme }) => ({
  width: "80%",
  height: "60%",
  background: theme.palette.secondary.light,
  border: "1px solid white",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
}));

const HighScoreInput = styled(TextField)(({ theme }) => ({
  marginRight: "1rem",
  "& .MuiInputBase-input": {
    color: theme.palette.primary.main,
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.primary.main,
  },
  "&:hover .MuiInput-underline:before": {
    borderBottomColor: theme.palette.primary.main,
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: theme.palette.primary.main,
  },
}));

const GameArea = () => {
  const params = useParams();
  let nav = useNavigate();
  const [clickPos, setClickPos] = useState("");
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [modalVisibile, setModalVisible] = useState(false);
  const [gameStats, setGameStats] = useState(null);
  const [wasHighScore, setWasHighScore] = useState(false);
  const [highScoreName, setHighScorename] = useState("");
  const [foundObjs, setFoundObjs] = useState({
    obj1: false,
    obj2: false,
    obj3: false,
  });

  useEffect(() => {
    const createAt = dayjs(localStorage.getItem("createAt"));
    const sameDay = dayjs().isSame(createAt, "day");
    const map = params.pictureID;
    (async () => {
      try {
        if (!sameDay) {
          const url = `${import.meta.env.env.VITE_URL}/picture/newPlayer`;
          const res = await axios.post(
            url,
            { map },
            {
              withCredentials: true,
            }
          );
          localStorage.setItem("createAt", res.data.createAt);
          localStorage.setItem("id", res.data.id);
        } else {
          const id = localStorage.getItem("id");
          const url = `${import.meta.env.VITE_URL}/picture/currentPlayer`;
          const res = await axios.post(
            url,
            { id },
            {
              withCredentials: true,
            }
          );
          localStorage.setItem("createAt", res.data.createAt);
          localStorage.setItem("id", res.data.id);
          setGameStats(
            prettyMilliseconds(res.data.totalTime, {
              secondsDecimalDigits: 0,
            })
          );
          setFoundObjs({ obj1: true, obj2: true, obj3: true });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (gameStats) {
      setModalVisible(true);
    }
  }, [gameStats]);

  const handleImageClick = (event) => {
    setOptionsVisible(!optionsVisible);
    const bRect = event.target.getBoundingClientRect();
    const x = event.clientX - bRect.left;
    const y = event.clientY - bRect.top;
    const width = bRect.width;
    const height = bRect.height;
    setClickPos({ x, y, width, height });
  };

  const handleOnClick = async (event) => {
    const pick = event.target.attributes.pick.value;
    const id = localStorage.getItem("id");
    const url = `${import.meta.env.VITE_URL}/picture/map/${params.pictureID}`;
    const gameData = {
      x: clickPos.x,
      y: clickPos.y,
      width: clickPos.width,
      height: clickPos.height,
      pick: pick,
      id,
    };
    try {
      setOptionsVisible(!optionsVisible);
      const attempt = await axios.post(url, gameData, {
        withCredentials: true,
      });
      console.log(attempt);
      attempt.data.result
        ? setFoundObjs((objs) => ({ ...objs, [attempt.data.pick]: true }))
        : null;
      attempt.data.status ? await checkWin(localStorage.getItem("id")) : null;
    } catch (error) {
      console.log(error);
    }
  };

  // Check highscore function
  const checkWin = async (id) => {
    try {
      const url = `${import.meta.env.VITE_URL}/picture/gameOver`;
      const res = await axios.post(url, { id }, { withCredentials: true });
      console.log(res);
      setGameStats(
        prettyMilliseconds(res.data.session.totalTime, {
          secondsDecimalDigits: 0,
        })
      );
      setWasHighScore(res.data.newHighscore);
      setModalVisible(true);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setHighScorename(event.target.value);
  };

  const handleUpdate = async () => {
    const session = localStorage.getItem("id");
    const name = highScoreName;
    try {
      const url = `${import.meta.env.VITE_URL}/picture/updateHighScore`;
      const res = await axios.post(
        url,
        { session, name },
        { withCredentials: true }
      );
      setModalVisible(false);
      console.log(res);
      nav("/highscores");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Base>
      <Sidebar>
        <Back to="/">&larr; Back</Back>
        <ItemWrapper>
          <Indicator sx={{ color: foundObjs.obj1 ? "green" : "red" }}>
            {foundObjs.obj1 ? <>&#10004;</> : "X"}
          </Indicator>
          <Item>Men 1</Item>
        </ItemWrapper>
        <ItemWrapper>
          <Indicator sx={{ color: foundObjs.obj2 ? "green" : "red" }}>
            {foundObjs.obj2 ? <>&#10004;</> : "X"}
          </Indicator>
          <Item>Volanco</Item>
        </ItemWrapper>
        <ItemWrapper>
          <Indicator sx={{ color: foundObjs.obj3 ? "green" : "red" }}>
            {foundObjs.obj3 ? <>&#10004;</> : "X"}
          </Indicator>
          <Item>Fur</Item>
        </ItemWrapper>
      </Sidebar>
      <Picture>
        <Modal visible={modalVisibile ? "block" : "none"}>
          <ModalContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box>Your time was: {gameStats}</Box>
              {wasHighScore && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box sx={{ padding: "5%" }}>
                    Congrats! That's a highscore! Please enter your name:{" "}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      width: "100%",
                    }}
                  >
                    <HighScoreInput
                      label="Name"
                      autoFocus="true"
                      variant="standard"
                      color="primary"
                      value={highScoreName}
                      onChange={handleChange}
                    ></HighScoreInput>
                    <Button onClick={handleUpdate}>Submit</Button>
                  </Box>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <Back to="/">Home</Back>
              <Back to="/highscores">Highscores</Back>
            </Box>
          </ModalContent>
        </Modal>
        <PictureWrapper>
          <Options
            variant="contained"
            show={optionsVisible ? "flex" : "none"}
            left={clickPos.x}
            top={clickPos.y}
            option={-70}
            pick={"obj1"}
            onClick={handleOnClick}
          >
            Men 1
          </Options>
          <Options
            variant="contained"
            show={optionsVisible ? "flex" : "none"}
            left={clickPos.x}
            top={clickPos.y}
            option={0}
            pick={"obj2"}
            onClick={handleOnClick}
          >
            Volnaco
          </Options>
          <Options
            variant="contained"
            show={optionsVisible ? "flex" : "none"}
            left={clickPos.x}
            top={clickPos.y}
            option={+70}
            pick={"obj3"}
            onClick={handleOnClick}
          >
            Fur
          </Options>
          <PictureContainer
            sx={{
              userSelect: "none",
              WebkitUserDrag: "none",
              MozUserSelect: "none",
              MsUserSelect: "none",
            }}
            onClick={handleImageClick}
            src={PictureA}
          />
        </PictureWrapper>
      </Picture>
    </Base>
  );
};

export default GameArea;
