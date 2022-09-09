import { Link } from "react-router-dom";

const NoFoundPage = () => {
  return (
    <div className="flex align-center justify-center flex-col text-center h-3/6">
      <div className="font-sans text-center text-xl text-red-400">
        Seems like you going wrong direction let's go home
      </div>
      <Link className="text-blue-700" to="/">
        Home
      </Link>
    </div>
  );
};

export default NoFoundPage;
