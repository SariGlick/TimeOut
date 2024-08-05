import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { AccountCircle, Settings, Report, People } from '@mui/icons-material';
import '../../styles/homePage.scss';

const HomePage = () => {
  return (
    <div className="homepage">
      <main>
        <section className="feature even">
          <div className="content">
            <div className="text">
              <h2>Enhance Your Browsing Experience with Our Chrome Add-on</h2>
              <p>
                Install our Chrome extension to block or limit access to specific websites. Create profiles for work, home, and more, giving you control over your online activity.
              </p>
              <Link to="/login" className="btn-primary">Login</Link>
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
              <h2>Personalize Your Profiles</h2>
              <p>
                Create and manage profiles for different settings like work and home. Link accounts from over 17,000 financial institutions and view your transactions in one place.
              </p>
              <Link to="/profiles" className="btn-primary">Go to Profiles</Link>
            </div>
          </div>
        </section>
        <section className="feature even">
          <div className="content">
            <div className="text">
              <h2>Manage Your Settings</h2>
              <p>
                Customize your preferences to better track and understand your spending habits. Adjust your profile settings to suit your needs and enhance your browsing experience.
              </p>
              <Link to="/settings" className="btn-primary">Go to Settings</Link>
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
              <h2>Get Detailed Reports</h2>
              <p>
                Review your transactions, track your spending by category, and receive monthly insights to help you better understand your money habits.
              </p>
              <Link to="/reports" className="btn-primary">Go to Reports</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
