import React from 'react';
import './App.scss';
import Header from './stories/header/header';
import ProfileImageEditButton from './components/settings/editUserProfile/ProfileImageEdit';

function App() {
  return (
    <div className="App">
      <Header />
      <ProfileImageEditButton />
    </div>
  );
}

export default App;
