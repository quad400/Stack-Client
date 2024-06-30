import MainNav from "@/components/MainNav";
import SideNav from "@/components/SideNav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <main className="flex flex-col h-full w-full">
      <nav>
        <MainNav />
      </nav>
      <div className="flex h-full w-full space-x-4 mt-8 px-4 md:px-8 lg:px-12">
        <div className="hidden md:flex md:w-64 lg:w-72 xl:w-80 h-full">
          <SideNav />
        </div>
        <main className="w-full h-full">
          <Outlet />
        </main>
      </div>
    </main>
  );
};

export default Dashboard;
