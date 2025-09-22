import { useParams } from "react-router-dom";
import { styled } from "@mui/material";
import PictureA from "../../assets/PictureA.jpg";
import { useState } from "react";

const Base = styled("div")({
  display: "flex",
  width: "100%",
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
  display: "flex",
  flex: 2,
});

const PictureContainer = styled("img")({
  maxWidth: "80%",
  margin: "auto",
});

const GameArea = () => {
  const params = useParams();
  const [clickPos, setClickPos] = useState("");
  const [disabledOnClick, setDisabledOnClick] = useState(false);

  const handleImageClick = (event) => {
    const bRect = event.target.getBoundingClientRect();

    const x = event.clientX - bRect.left;
    const y = event.clientY - bRect.top;
    setClickPos({ x, y });
    setDisabledOnClick(!disabledOnClick);
  };

  return (
    <Base>
      <Sidebar>
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
        </ItemWrapper>
      </Sidebar>
      <Picture>
        {params.pictureID}
        <PictureContainer
          sx={{
            userSelect: "none",
            WebkitUserDrag: "none",
            MozUserSelect: "none",
            MsUserSelect: "none",
          }}
          onClick={disabledOnClick ? null : handleImageClick}
          src={PictureA}
        />
      </Picture>
    </Base>
  );
};

export default GameArea;
