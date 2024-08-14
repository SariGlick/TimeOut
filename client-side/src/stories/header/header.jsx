import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {AppBar,Box,Toolbar,IconButton,Typography,Menu,AdbIcon,MenuItem,Tooltip,Button,Avatar,Container} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LabTabs from '../tabs/tabs';
import MessageIcon from './Icon'
import './header.scss';
import { selectAuth } from '../../redux/auth/auth.selector';
function ResponsiveAppBar() {
  const [currentname, setCurrentname] = useState(localStorage.getItem('nameUser') || null);
  const [currentProfile, setCurrentProfile] = useState(localStorage.getItem('nameProfile') || null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useSelector(selectAuth); 
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
  const getAvatarLetter = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return '';
  };

  return (
    <div className='arooundDiv'>
    <AppBar position="static" className='navbar' >
      <Container   maxWidth="xl">
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
            { !currentProfile && < IconButton onClick={handleOpenUserMenu} >
                <Avatar alt={currentname} src="/static/images/avatar/2.jpg" />
              </IconButton>}
        
            { currentProfile && < IconButton onClick={handleOpenUserMenu} >
                <Avatar alt={currentname} src="/static/images/avatar/2.jpg" />
              </IconButton>}
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
          <MessageIcon/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  );
}
export default ResponsiveAppBar;