import { useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <div className="w-[1320px] mx-auto">
      <h1>All &gt; {currentPath}</h1>
    </div>
  );
};

export default Breadcrumbs;
