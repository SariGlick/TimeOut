import React from 'react';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import './App.scss';
import ProfileImageEditButton from './components/settings/ProfileImageEdit';

function App() {
  return (
    <div className="App">
      <Header />
      <ProfileImageEditButton userId={'6694d2295d41f7809588274c'}/>
      <Footer />
    </div>
  );
}

export default App;
