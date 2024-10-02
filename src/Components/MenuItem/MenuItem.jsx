import { NavLink } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      className="flex items-center rounded-md p-3 hover:bg-black hover:text-white"
    >
      <Icon className="w-5 h-5" />

      <span className="mx-4 xl:text-md desktop:text-lg font-medium">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
