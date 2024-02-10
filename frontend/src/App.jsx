import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavbarLoggedOut from "./components/NavbarLoggedOut";
import Message from './components/Message'

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarLoggedOut />
        <Routes>
          <Route path="/inbox" Component={Message}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
