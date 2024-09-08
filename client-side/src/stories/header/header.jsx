import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {AppBar,Box,Toolbar,IconButton,Typography,Menu,AdbIcon,MenuItem,Tooltip,Button,Avatar,Container} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LabTabs from '../tabs/tabs';
import Select from '../Select/Select.jsx';
import './header.scss';
import { selectAuth } from '../../redux/auth/auth.selector';
import SignUp from '../../components/signUp/signUp.jsx';
import { HEADER } from '../../constants.js';
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useSelector(selectAuth);
  const [isSelectOpen, setIsSelectOpen] = useState(false); 
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    setIsSelectOpen((prev) => !prev);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
   const handleSave = () => {
    setIsSignupVisible(false);
  };
 

  const selectFunctions = (selectedValue) => {
    console.log('Selected Value:', selectedValue);
    if (selectedValue == 1) {
      setIsSignupVisible(true);
    } else if (selectedValue == 2) {
     
    }
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
           { <Tooltip title={user ? "Open settings" : ""}>
              <IconButton onClick={handleOpenUserMenu} >
              <Avatar>{getAvatarLetter()}</Avatar>
              </IconButton>
            </Tooltip>}
                {user && user.name && isSelectOpen && (
                <Box sx={{ position: 'absolute', top: '100%', right: 0 }}>
                  <Select
                    onChange={(selectedValue) => selectFunctions(selectedValue)} 
                    className="primary"
                    options={[
                      { value: 1, text: HEADER.edit_user, iconSrc: '/images/pencil.svg' },
                      { value: 2, text: HEADER.manage_notifications, iconSrc: 'images/notification.svg' },
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
        onSave={handleSave}
         />
      )}
    </div>
  );
}
export default ResponsiveAppBar;