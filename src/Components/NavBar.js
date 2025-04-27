import React, { useEffect, useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [userHasLogin, setUserHasLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserHasLogin(!!token);
  }, []);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      setUserHasLogin(false);
      window.location.href = "/login";
    }
  };

  const navLinks = [
    { label: "Home", path: "/home" },
    { label: "Courses", path: "/courses" },
    { label: "Add Courses", path: "/addcourses" },
    { label: "My Profile", path: "/profile" },
  ];

  return (
    <header className="flex items-center sticky top-0 z-50 justify-between p-4 shadow-md bg-blue-100 text-gray-600  border-black">
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <IconButton
          onClick={toggleDrawer(true)}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </div>

      {/* Logo / Brand */}
      <div className="text-xl font-bold">MyApp</div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6 ml-auto text-lg font-semibold">
        {navLinks.map(({ label, path }) => (
          <Link
            key={path}
            to={path}
            className="hover:text-black hover:font-semibold hover:underline"
          >
            {label}
          </Link>
        ))}

        {!userHasLogin ? (
          <Link to="/login" className="hover:text-black hover:font-bold">
            Login
          </Link>
        ) : (
          <Link
            to="#"
            onClick={handleLogout}
            className="hover:text-red-600 hover:font-semibold"
          >
            Logout
          </Link>
        )}
      </nav>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div className="w-64 p-4">
          <List>
            {navLinks.map(({ label, path }) => (
              <ListItem key={path} button onClick={toggleDrawer(false)}>
                <Link to={path} className="w-full text-black no-underline">
                  <ListItemText primary={label} />
                </Link>
              </ListItem>
            ))}

            <ListItem button onClick={toggleDrawer(false)}>
              {!userHasLogin ? (
                <Link to="/login" className="w-full text-black no-underline">
                  <ListItemText primary="Login" />
                </Link>
              ) : (
                <Link
                  to="#"
                  onClick={handleLogout}
                  className="w-full text-black no-underline"
                >
                  <ListItemText primary="Logout" />
                </Link>
              )}
            </ListItem>
          </List>
        </div>
      </Drawer>
    </header>
  );
}
