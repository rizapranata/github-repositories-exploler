import { Route, Routes, HashRouter } from "react-router-dom";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
