import * as React from 'react';
import { useState } from 'react';
import {AppBar,Box,Toolbar,IconButton,Typography,Menu,AdbIcon,MenuItem,Tooltip,Button,Avatar,Container} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LabTabs from '../tabs/tabs';
import './header.scss';
import { useEffect } from 'storybook/internal/preview-api';




function ResponsiveAppBar() {
  const [currentname, setCurrentname] = useState(localStorage.getItem('nameUser') || null);
  console.log(currentname,"jjj");
  // const [currentname, setCurrentname] = useState(null);

  // useEffect(() => {
  //   const name = localStorage.getItem('nameUser');
  //   setCurrentname(name);
  // }, []); 


  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    // <UserNameProvider>
    //    {({ username }) => (
    <AppBar position="static">
      <Container  className='navbar'  maxWidth="xl">
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
              className='menu'
            >
          <LabTabs
          nameOfClass="navbar-tabs"
          text={["home", "reports", "statistics", "profiles"]}
          nav={["/home","/reports","/statistics","/profiles"] }
        />
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            className='logo'
          >
            TimeOut
          </Typography>
          <Box className="middle-side-box">
          <LabTabs
          nameOfClass="navbar-tabs"
          text={["home", "reports", "statistics", "profiles"]}
          nav={["/home","/reports","/statistics","/profiles"] }
        />
          </Box>

          <Box >
            <Tooltip title={currentname}>
              <IconButton onClick={handleOpenUserMenu} >
                <Avatar alt={currentname} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                        <LabTabs
          nameOfClass="navbar-tabs"
          text={['edit user profile','manage notifications']}
          nav={['/editUserProfile','/manageNotifications'] }
        />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    //   )}
    // </UserNameProvider>
  );
}
export default ResponsiveAppBar;
