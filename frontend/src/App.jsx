import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from "./context/authContext";
import Navbar from "./components/Navbar";
import Chat from './components/chat/Chat';
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="" element={<Chat />}/>
              <Route path=":id" element={<Chat />}/>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
