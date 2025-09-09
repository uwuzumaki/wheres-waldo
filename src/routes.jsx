import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
];

export default routes;
