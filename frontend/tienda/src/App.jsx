import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from './components/PivateRoute.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import AdminPanel from './components/Auth/Admin.jsx';
import Home from './components/pages/Home.jsx'
import Layout from './components/Layout/';
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App
