import { Outlet } from "react-router-dom";
import { styled } from "@mui/material";

const Base = styled("div")({
  flex: 1,
  width: "100%",
  height: "100%",
  display: "flex",
});

const Layout = () => {
  return (
    <Base>
      <Outlet />
    </Base>
  );
};

export default Layout;
