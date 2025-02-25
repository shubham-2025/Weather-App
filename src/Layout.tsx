import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

function Layout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default Layout;
