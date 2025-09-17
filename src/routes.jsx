import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Picture from "./Components/Picture/Picture";
import Highscores from "./Components/Highscores/Highscores";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/picture/:pictureID", element: <Picture /> },
      { path: "/highscores", element: <Highscores /> },
    ],
  },
];

export default routes;
