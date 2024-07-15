import './App.scss';

import { Route, Routes } from 'react-router';
import LabTabs from './stories/tabs/tabs';
import Header from './stories/header/header';
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx"; 

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
