import { useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";

const Layout = ({ children }) => {
  const location = useLocation();

  // List of paths where BottomNav should be hidden
  const hideNavPaths = ["/portfolio"];

  // Check if current path is in hide list
  const hideNav = hideNavPaths.includes(location.pathname);

  return (
    <>
      {/* Your header/navbar here */}
      <main>{children}</main>

      {/* Conditionally render BottomNav */}
      {!hideNav && <BottomNav />}
    </>
  );
};

export default Layout;
