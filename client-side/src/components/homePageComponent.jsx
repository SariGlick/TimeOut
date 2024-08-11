
import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { AccountCircle, Settings, Report, People } from '@mui/icons-material';
import { homePageTexts } from '../../src/constants/homePageconstatnts';
import '../styles/homePage.scss';

const HomePage = () => {
  return (
    <div className="homepage">
      <main>
        <section className="feature even">
          <div className="content">
            <div className="text">
              <h2>{homePageTexts.enhanceBrowsing.title}</h2>
              <p>{homePageTexts.enhanceBrowsing.description}</p>
              <Link to={homePageTexts.enhanceBrowsing.link} className="btn-primary">{homePageTexts.enhanceBrowsing.buttonText}</Link>
            </div>
            <div className="feature-icon-container">
              <IconButton className="feature-icon">
                <AccountCircle fontSize="inherit" />
              </IconButton>
            </div>
          </div>
        </section>
        <section className="feature odd">
          <div className="content">
            <div className="feature-icon-container">
              <IconButton className="feature-icon">
                <People fontSize="inherit" />
              </IconButton>
            </div>
            <div className="text">
              <h2>{homePageTexts.personalizeProfiles.title}</h2>
              <p>{homePageTexts.personalizeProfiles.description}</p>
              <Link to={homePageTexts.personalizeProfiles.link} className="btn-primary">{homePageTexts.personalizeProfiles.buttonText}</Link>
            </div>
          </div>
        </section>
        <section className="feature even">
          <div className="content">
            <div className="text">
              <h2>{homePageTexts.manageSettings.title}</h2>
              <p>{homePageTexts.manageSettings.description}</p>
              <Link to={homePageTexts.manageSettings.link} className="btn-primary">{homePageTexts.manageSettings.buttonText}</Link>
            </div>
            <div className="feature-icon-container">
              <IconButton className="feature-icon">
                <Settings fontSize="inherit" />
              </IconButton>
            </div>
          </div>
        </section>
        <section className="feature odd">
          <div className="content">
            <div className="feature-icon-container">
              <IconButton className="feature-icon">
                <Report fontSize="inherit" />
              </IconButton>
            </div>
            <div className="text">
              <h2>{homePageTexts.getReports.title}</h2>
              <p>{homePageTexts.getReports.description}</p>
              <Link to={homePageTexts.getReports.link} className="btn-primary">{homePageTexts.getReports.buttonText}</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
