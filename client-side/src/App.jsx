import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import DateFormatter from './components/date/GenericDate.jsx'

function App() {

const currentUser={ "_id": "669f86c302f253ec5a6f5162",
"name": "Test-User",
"email": "testuser@example.com",
"password": "$2b$10$IlUR0EDO.Eu8O4K8BgaFfeXWgeLxdZ6WSw0GXBWm7XZDZ1ouQmdeC",
"formatedDate": "yyyy-MM-dd",
"profileImage": "profile.jpg",
"visitsWebsites": [],
"profiles": [],
"preferences": [ "669f86c302f253ec5a6f5162" ]};

const date=new Date();
console.log(date);
  return (
    <>
      <RouterProvider router={router} />
      <Provider store={store}>
        <DateFormatter currentUser={currentUser} date={date}/>
        <Footer />
      </Provider>
    </>
  );
}
export default App;
