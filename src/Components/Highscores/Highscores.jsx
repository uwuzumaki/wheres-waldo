import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Base = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  color: theme.palette.primary.main,
}));

const Back = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  alignSelf: "start",
});

const Player = styled("div")({
  display: "flex",
});

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Highscores = () => {
  useEffect(() => {});
  return (
    <Base>
      <Back to="/">&larr; Back</Back>
      <div>
        <p>Picture A</p>
        {data.map((score, index) => (
          <Player key={index}>
            <p>name</p>
            <p>{score}</p>
          </Player>
        ))}
      </div>
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
