import { styled } from "@mui/material";

const Base = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  color: theme.palette.primary.main,
}));

const Player = styled("div")({
  display: "flex",
});

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Highscores = () => {
  return (
    <Base>
      <div>
        <p>Picture A</p>
        {data.map((score) => (
          <Player>
            <p>name</p>
            <p>{score}</p>
          </Player>
        ))}
      </div>
      <div>
        <p>Picture b</p>
        {data.map((score) => (
          <Player>
            <p>name</p>
            <p>{score}</p>
          </Player>
        ))}
      </div>
      <div>
        <p>Picture c</p>
        {data.map((score) => (
          <Player>
            <p>name</p>
            <p>{score}</p>
          </Player>
        ))}
      </div>
    </Base>
  );
};

export default Highscores;
