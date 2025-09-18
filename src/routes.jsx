import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import GameArea from "./Components/GameArea/GameArea";
import Highscores from "./Components/Highscores/Highscores";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/picture/:pictureID", element: <GameArea /> },
      { path: "/highscores", element: <Highscores /> },
    ],
  },
];

export default routes;
