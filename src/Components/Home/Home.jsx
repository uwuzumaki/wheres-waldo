import { styled, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const Base = styled("div")(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  color: "white",
}));

const Section = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginLeft: "auto",
  marginRight: "auto",
});

const CustomButton = styled(Button)({
  marginLeft: "5%",
  marginRight: "5%",
});

const CustomTextField = styled(TextField)(({ theme }) => ({
  caretColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
}));

const CustomLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
});

const Home = () => {
  return (
    <Base>
      <Section>
        <CustomButton variant="contained">
          <CustomLink to="/picture/kanagawa">Picture A</CustomLink>
        </CustomButton>
        {/* <CustomButton variant="contained">
          <CustomLink to="/picture/b">Picture B</CustomLink>
        </CustomButton>
        <CustomButton variant="contained">
          <CustomLink to="/picture/c">Picture C</CustomLink>
        </CustomButton> */}
      </Section>
      <Section>
        <CustomLink to="/highscores">
          <Button variant="contained">Highscores!</Button>
        </CustomLink>
      </Section>
    </Base>
  );
};

export default Home;
