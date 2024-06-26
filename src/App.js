import './App.css';
import Register from './Components/Register/register';
import Login from './Components/Login/login';
import HomePage from './Components/Home/home';
import Profile from './Components/Profile/profile';
import Notifications from './Components/Notifications/notifications';
import OtherProfile from './Components/Profile/OtherProfile';
import EditProfile from "./Components/Profile/EditProfile";
import Form from "./Components/Form/form";
import Ranking from "./Components/Ranking/ranking";
import MatchHistory from "./Components/MatchHistory/MatchHistory";
import Incidents from './Components/Incidents/incidents';
import ForgotPassword from "./Components/ForgotPassword/forgotPassword";
import ResetPassword from './Components/ForgotPassword/resetPassword';
import CongratsPage from "./Components/CongratsPage/congratsPage";

import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function Auth() {
    const token = localStorage.getItem('token');
    if (token) {
        const {exp} = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (exp > currentTime) {
            return <Outlet/>
        }
    }
    return <Navigate to={"/login"}/>
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route element={<Auth/>} >
                            <Route path={"/home"} element={<HomePage/>}/>
                            <Route path={"/profile"} element={<Profile/>}/>
                            <Route path={"/notifications"} element={<Notifications/>}/>
                            <Route path="/profile/:id" element={<OtherProfile/>}/>
                            <Route path={"/EditProfile"} element={<EditProfile/>}/>
                            <Route path={"/form"} element={<Form/>}/>
                            <Route path="/ranking" element={<Ranking/>}/>
                            <Route path={"/MatchHistory"} element={<MatchHistory/>}/>
                            <Route path={"/incidents/:id"} element={<Incidents/>}/>
                            <Route path={"/ForgotPassword"} element={<ForgotPassword/>}/>
                            <Route path="/resetPassword" element={<ResetPassword />} />
                            <Route path="/congratsPage" element={<CongratsPage/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </header>
        </div>
    );
}
export default App;