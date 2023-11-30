import { NavLink } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      className="flex items-center p-2 border-b hover:border-y-white border-y-black"
    >
      <Icon className="w-5 h-5" />

      <span className="mx-4 text-lg font-medium">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
