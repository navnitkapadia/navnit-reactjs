import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <NavBar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
