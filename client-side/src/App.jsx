import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import './App.scss';
import Settings from './components/settings/Settings.jsx';
import Localization from './components/settings/UserLocalization.jsx'

function App() {
  const user={
    "_id": "66940b051ccb2852370d5a17",
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "password": "securePassword123",
    "visitsWebsites": [],
    "profiles": [],
    "profileImage": "profile.jpg",
    "preference": {
        "sendNotificationTime": 30,
        "soundVoice": "×××ª ××¢× ×¢×©×",
        "_id": "66930c2e2aad987e24078e12",
        "emailFrequency": "weekly",
        "timeZone": "GMT+2:00",
        "language": "fr"
    }
}

  return (
    <>
      <RouterProvider router={router} />
      <Provider store={store}>
        <Settings user={user}></Settings>
        {/* <Localization ></Localization> */}
        <Footer />
      </Provider>
    </>
  );
}
export default App;
