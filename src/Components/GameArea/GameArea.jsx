import { useParams } from "react-router-dom";
import { styled } from "@mui/material";

const Base = styled("div")({
  display: "flex",
});

const Sidebar = styled("div")({
  flex: 1,
});

const Picture = styled("main")({
  flex: 2,
});

const GameArea = () => {
  const params = useParams();

  return (
    <Base>
      <p>picture</p>
      <p>{params.pictureID}</p>
    </Base>
  );
};

export default GameArea;
