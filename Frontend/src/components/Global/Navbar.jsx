import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/nav.scss";
import { Add, Facebook, People, } from "@mui/icons-material";
import logo from '../../assets/img/logo.png'
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/actions";
import { StyledButtonMain } from "./styled";
import { Button } from "@mui/material";
import { clearUser } from "../../redux/user/actions";


// const StyledButtonMain = StyledButtonMainStyled()
const Navbar = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const auth = useSelector(state => state.auth)
  const handleLogout = () => {
    dispatch(logOut())
    localStorage.clear(clearUser());
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const navFields = [
    {
      name: 'Facebook',
      icon: <Facebook />,
      func: () => navigate('/fb-profile'),
      show: auth ? true : false
    },
    {
      name: 'My Profile',
      icon: <People />,
      func: () => navigate('/profile'),
      show: auth ? true : false
    },
    {
      name: 'Create Post',
      icon: <Add />,
      func: () => navigate('/createPost'),
      show: auth ? true : false
    },
    {
      name: auth ? 'Logout' : 'Login',
      icon: '',
      func: auth ? handleLogout : handleLogin,
      show: true
    },
  ]
  return (
    <nav className="nav">
      <img style={{ cursor: 'pointer' }} onClick={() => navigate('/')} src={logo} alt="logo" width={80} height={60} />
      <div className="links">
        {navFields?.map((navItem, i) => (
          navItem.show &&
          <Button
            key={i}
            onClick={navItem.func}
            startIcon={navItem.icon}
            variant="contained"
          >
            {navItem.name}
          </Button>
        ))
        }

        <>
        </>
      </div>
    </nav>
  );
};

export default Navbar;
