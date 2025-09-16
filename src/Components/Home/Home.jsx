import { styled, Button } from "@mui/material";

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

const Home = () => {
  return (
    <Base>
      <Section>Username</Section>
      <Section>
        <CustomButton variant="contained">Picture A</CustomButton>
        <CustomButton variant="contained">Picture B</CustomButton>
        <CustomButton variant="contained">Picture C</CustomButton>
      </Section>
      <Section>
        <Button variant="contained">Highscores!</Button>
      </Section>
    </Base>
  );
};

export default Home;
