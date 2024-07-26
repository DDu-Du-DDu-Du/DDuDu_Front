import { Outlet } from "react-router-dom";

const Layout = () => {
  // 바텀 혹은 탑 네브가 정의됨
  return (
    <main id="app">
      Layout
      <Outlet />
    </main>
  );
};

export default Layout;
