import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AllTransactions from "./pages/allTransactions/AllTransactions";
import AllCashbackScheme from "./components/AllCashbackScheme/AllCashbackScheme";
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
function App() {
  const token = localStorage.getItem("security_token"); 
  const { currentuser } = useSelector(state => state.user)
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={!currentuser ? <Register/> : <Navigate to="/home"/>}/>
      <Route path="/login" element={!currentuser ? <Login/> : <Navigate to="/home"/>}/>
      <Route path="/home" element={currentuser ? <Home/> : <Navigate to="/login"/>}/>
      <Route path="/transactions" element={ currentuser ? <AllTransactions/> : <Navigate to="/login"/>}/>
      <Route path="/admin" element={ currentuser ? <Admin/> : <Navigate to="/login"/>}/>
      <Route path="allcashbackschemes" element={ currentuser ? <AllCashbackScheme/> : <Navigate to="/login"/>}/>
    </Routes>
    </BrowserRouter>
    {/* <AllTransactions/> */}
    <ToastContainer/>
    </>
  );
}

export default App;
