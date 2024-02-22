import { useLocation } from "react-router-dom";
import { logOut } from "../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/Layout/SideBar";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hideNavBarPaths = ["/login", "/" , "/forgetPassword"];

  const hideNavBar = hideNavBarPaths.includes(location.pathname);
  const handleLogout = async () => {
    await dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="layout">
      {!hideNavBar && <SideBar logout={handleLogout} data={children} />}
      {hideNavBar && <main>{children}</main>}
    </div>
  );
};

export default Layout;
