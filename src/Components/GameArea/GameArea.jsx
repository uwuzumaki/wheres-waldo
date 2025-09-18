import { useParams } from "react-router-dom";
import { styled } from "@mui/material";

const Base = styled("div")({
  display: "flex",
  width: "100%",
});

const Sidebar = styled("div")({
  flex: "0 1 250px",
  minWidth: "20%",
  borderRight: "1px solid #fff",
});

const Picture = styled("main")({
  flex: 2,
});

const GameArea = () => {
  const params = useParams();

  return (
    <Base>
      <Sidebar>picture</Sidebar>
      <Picture>{params.pictureID}</Picture>
    </Base>
  );
};

export default GameArea;
