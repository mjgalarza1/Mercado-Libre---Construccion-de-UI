import Navbar from '../components/layout/Navbar/Navbar.jsx';
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const handleSearch = (event, value) => {
    event.preventDefault();
    const queryValue = event.target.elements.query.value.trim();
    if (queryValue) {
        navigate(`/search?query=${queryValue}`);
    }
  }

  return (
      <>
        <Navbar submitfcn={(e) => handleSearch(e, e.target.value)}/>
        <Outlet />
      </>
  );
}
