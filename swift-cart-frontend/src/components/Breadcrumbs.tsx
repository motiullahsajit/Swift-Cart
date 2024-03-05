import { useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  console.log(location);

  let currentPath = location.pathname;

  return (
    <div>
      <h1>asdf</h1>
    </div>
  );
};

export default Breadcrumbs;
