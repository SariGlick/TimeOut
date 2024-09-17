import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './FooterComponent.scss'

const Footer = () => {
  const { t: translate } = useTranslation();
  return (
    <Box className="footer-wrapper">
      <Typography variant="body2" className="footer-text">
        {translate('fotter')}<a href="https://extra.tech/he/%D7%A2%D7%9E%D7%95%D7%93-%D7%94%D7%91%D7%99%D7%AA/" className='link-style'>  ExtraTeck</a>
      </Typography>
    </Box>
  );
};

export default Footer;
