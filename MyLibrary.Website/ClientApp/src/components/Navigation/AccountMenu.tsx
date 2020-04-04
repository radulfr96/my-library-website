/* eslint-disable linebreak-style */
import {
  IconButton, Menu, MenuItem, makeStyles,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import Axios from 'axios';
import React, { useContext } from 'react';
import { AppContext } from '../../Context';

const useStyles = makeStyles(() => ({
  navLink: {
    color: '#000000',
    textDecoration: 'none',
  },
}));

export default function AccountMenu(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const context = useContext(AppContext);
  const classes = useStyles();

  const logOut = () => {
    Axios.post('/api/user/logout');
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
      >
        <PersonIcon color="secondary" />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <NavLink className={classes.navLink} to="/account">
          <MenuItem style={{ display: context.userInfo?.username !== undefined ? 'block' : 'none' }} onClick={handleClose}>
            My Account
          </MenuItem>
        </NavLink>
        <MenuItem
          style={{ display: context.userInfo?.username !== undefined ? 'block' : 'none' }}
          onClick={() => {
            logOut();
            context.clearUserInfo();
            handleClose();
          }}
        >
          <NavLink className={classes.navLink} to="/">
            Log out
          </NavLink>
        </MenuItem>
        <MenuItem style={{ display: context.userInfo?.username === undefined ? 'block' : 'none' }} onClick={handleClose}>
          <NavLink className={classes.navLink} to="/login">
            Log in
          </NavLink>
        </MenuItem>
        <MenuItem style={{ display: context.userInfo?.username === undefined ? 'block' : 'none' }} onClick={handleClose}>
          <NavLink className={classes.navLink} to="/register">
            Sign Up
          </NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
}