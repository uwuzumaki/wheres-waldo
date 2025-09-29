import { useParams, Link } from "react-router-dom";
import { styled, Button } from "@mui/material";
import PictureA from "../../assets/PictureA.jpg";
import { useState } from "react";

const Base = styled("div")({
  display: "flex",
  width: "100%",
});

const Back = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  alignSelf: "start",
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

const GameArea = () => {
  const params = useParams();
  const [clickPos, setClickPos] = useState("");
  const [visible, setVisible] = useState(false);
  const [pick, setPick] = useState(null);

  const handleImageClick = (event) => {
    setVisible(!visible);
    const bRect = event.target.getBoundingClientRect();
    const x = event.clientX - bRect.left;
    const y = event.clientY - bRect.top;
    setClickPos({ x, y });
  };

  const handleOnClick = (event) => {
    setPick(event.target.textContent);
  };

  return (
    <Base>
      <Sidebar>
        <Back to="/">&larr; Back</Back>
        <h1>Find</h1>
        <ItemWrapper>
          <Indicator sx={{ color: "red" }}>X</Indicator>
          <Item>Item A</Item>
        </ItemWrapper>
        <ItemWrapper>
          <Indicator sx={{ color: "red" }}>X</Indicator>
          <Item>Item B</Item>
        </ItemWrapper>
        <ItemWrapper>
          <Indicator sx={{ color: "Green" }}>
            <>&#10004;</>
          </Indicator>
          <Item>Item C</Item>
        </ItemWrapper>
        <ItemWrapper sx={{ marginLeft: "15%" }}>Total guesses</ItemWrapper>
        <ItemWrapper sx={{ marginLeft: "15%" }}>Time: </ItemWrapper>
        <ItemWrapper>
          {clickPos.x} {clickPos.y}
          {pick}
        </ItemWrapper>
      </Sidebar>
      <Picture>
        <PictureWrapper>
          <Options
            variant="contained"
            show={visible ? "flex" : "none"}
            left={clickPos.x}
            top={clickPos.y}
            option={-70}
            onClick={handleOnClick}
          >
            Jordan
          </Options>
          <Options
            variant="contained"
            show={visible ? "flex" : "none"}
            left={clickPos.x}
            top={clickPos.y}
            option={0}
            onClick={handleOnClick}
          >
            Lebron
          </Options>
          <Options
            variant="contained"
            show={visible ? "flex" : "none"}
            left={clickPos.x}
            top={clickPos.y}
            option={+70}
            onClick={handleOnClick}
          >
            Bryant
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
