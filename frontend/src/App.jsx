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
          <Route path="/inbox" element={<Chat />}/>
          <Route path="/inbox/:id" element={<Chat />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
