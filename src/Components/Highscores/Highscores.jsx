import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import prettyMilliseconds from "pretty-ms";

const Base = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  color: theme.palette.primary.main,
}));

const Back = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  alignSelf: "start",
  width: "10%",
  marginTop: "5%",
  marginLeft: "5%",
});

const PlayerContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "20%",
  marginLeft: "5%",
});

const Player = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const PlayerName = styled("div")({
  marginRight: "20%",
});

const Highscores = () => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    (async () => {
      const url = `${import.meta.VITE_URL}/highscores`;
      const res = await axios.get(url, { withCredentials: true });
      setHighScores(res.data);
      console.log(res.data);
    })();
  }, []);

  return (
    <Base>
      <Back to="/">&larr; Back</Back>
      <PlayerContainer>
        <p style={{ fontSize: "2rem" }}>The Great Wave off Kanagawa</p>
        {highScores.map((map) => (
          <Player key={map.id}>
            <PlayerName>{map.username}</PlayerName>
            <p>{prettyMilliseconds(map.time, { secondsDecimalDigits: 0 })}</p>
          </Player>
        ))}
      </PlayerContainer>
      {/* <div>
        <p>Picture b</p>
        {data.map((score, index) => (
          <Player key={index}>
            <p>name</p>
            <p>{score}</p>
          </Player>
        ))}
      </div>
      <div>
        <p>Picture c</p>
        {data.map((score, index) => (
          <Player key={index}>
            <p>name</p>
            <p>{score}</p>
          </Player>
        ))}
      </div> */}
    </Base>
  );
};

export default Highscores;
