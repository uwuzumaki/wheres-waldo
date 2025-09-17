import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Picture from "./Components/Picture/Picture";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/picture/:pictureID", element: <Picture /> },
    ],
  },
];

export default routes;
