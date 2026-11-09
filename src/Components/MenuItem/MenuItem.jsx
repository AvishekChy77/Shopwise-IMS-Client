import { NavLink } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink to={address} className="side-link">
      <Icon className="size-5 shrink-0" />
      <span>{label}</span>
    </NavLink>
  );
};

export default MenuItem;
