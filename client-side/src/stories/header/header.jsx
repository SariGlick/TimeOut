import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'
import i18next from 'i18next';
import {AppBar,Box,Toolbar,IconButton,Typography,Menu,AdbIcon,MenuItem,Tooltip,Button,Avatar,Container} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LabTabs from '../tabs/tabs';
import './header.scss';
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {t,i18n}= useTranslation();


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
  const direction={direction:'rtl'}
  return (
    <>
    {i18next.resolvedLanguage=='he' ?( <AppBar position="static" >
      <Container  className='navbar'  maxWidth="xl">
        <Toolbar disableGutters>
        <Box >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
         
          <Box className="middle-side-box">
          <LabTabs
          nameOfClass="navbar-tabs"
          text={[t('home'), t('reports') ,t("statistics"), t("profiles")]}
          nav={["/home","/reports","/statistics","/profiles"] }
        />
          </Box>
         
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            className='logo'
          >
            {t('timeout')}
          </Typography>
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
          text={[t('home'), t('reports') ,t("statistics"), t("profiles")]}
          nav={["/home","/reports","/statistics","/profiles"] }
        />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>)
    :( <AppBar position="static"  >
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
          text={[t('home'), t('reports') ,t("statistics"), t("profiles")]}
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
            {t('timeout')}
          </Typography>
          <Box className="middle-side-box">
          <LabTabs
          nameOfClass="navbar-tabs"
          text={[t('home'), t('reports') ,t("statistics"), t("profiles")]}
          nav={["/home","/reports","/statistics","/profiles"] }
        />
          </Box>
          <Box >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
    </AppBar>)}
   
    </>
    

  );
}
export default ResponsiveAppBar;