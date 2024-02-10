import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavbarLoggedOut from "./components/NavbarLoggedOut";
import Chat from './components/chat/Chat';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarLoggedOut />
        <Routes>
          <Route path="/inbox" Component={Chat}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
