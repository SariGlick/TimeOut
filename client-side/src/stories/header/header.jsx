import * as React from 'react';
import { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Tooltip, Avatar, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LabTabs from '../tabs/tabs';
import Select from '../../stories/Select/Select.jsx';
import SignUp from '../../signUp/signUp.jsx';
import './header.scss';

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [userData, setUserData] = useState({});

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = () => {
    setIsSelectOpen((prev) => !prev);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSave = (updatedUserData) => {
    setUserData(updatedUserData);
    setIsSignupVisible(false);
  };

  const selectFunctions = (selectedValue) => {
    console.log('Selected Value:', selectedValue);
    if (selectedValue == 1) {
      setIsSignupVisible(true);
    } else if (selectedValue == 2) {
     
    }
  };

  return (
    <>
      <AppBar position="static">
        <Container className="navbar" maxWidth="xl">
          <Toolbar disableGutters>
            <Box className="left-side-box">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                className="menu"
              >
                <LabTabs
                  nameOfClass="navbar-tabs"
                  text={["home", "reports", "statistics", "profiles"]}
                  nav={["/home", "/reports", "/statistics", "/profiles"]}
                />
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              className="logo"
            >
              TimeOut
            </Typography>
            <Box className="middle-side-box">
              <LabTabs
                nameOfClass="navbar-tabs"
                text={["home", "reports", "statistics", "profiles"]}
                nav={["/home", "/reports", "/statistics", "/profiles"]}
              />
            </Box>

            <Box className="avatar-container" sx={{ position: 'relative' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              {isSelectOpen && (
                <Box sx={{ position: 'absolute', top: '100%', right: 0 }}>
                  <Select
                    onChange={(selectedValue) => selectFunctions(selectedValue)} // Directly pass the value
                    className="primary"
                    options={[
                      { value: 1, text: "edit user profile", iconSrc: '/images/pencil.svg' },
                      { value: 2, text: "manage notifications", iconSrc: 'images/notification.svg' },
                    ]}
                    title="edit user"
                    size="small"
                    widthOfSelect="180px"
                  />
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {isSignupVisible && (
        <SignUp
          isEditMode={true}
          userData={userData}
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default ResponsiveAppBar;
