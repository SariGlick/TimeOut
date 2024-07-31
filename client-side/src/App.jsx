import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import DateFormatSelect from './components/date/Select-date-format.jsx'

const currentUser = {
  "name": "Test-User",
  "email": "testuser@example.com",
  "password": "$2b$10$IlUR0EDO.Eu8O4K8BgaFfeXWgeLxdZ6WSw0GXBWm7XZDZ1ouQmdeC",
  "formatedDate": "yyyy-MM-dd",
  "profileImage": "profile.jpg",
  "visitsWebsites": [],
  "profiles": [],
  "preferences": [
    {
      "_id": "66a0b3c52dd0dde7df269f6a",
    }
  ] 
}


function App() {

  return (
    <>
      <RouterProvider router={router} />
      <Provider store={store}>
        <DateFormatSelect currentUser={currentUser}/>
        <Footer />
      </Provider>
    </>
  );
}
export default App;
