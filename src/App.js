import './App.css';
import Register from './Components/Register/register';
import Login from './Components/Login/login';
import HomePage from './Components/Home/home';
import Profile from './Components/Profile/profile';
import Notifications from './Components/Notifications/notifications';
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
                        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirige la ruta por defecto a /login */}
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route element={<Auth/>} >
                            <Route path={"/home"} element={<HomePage/>}/>
                            <Route path={"/profile"} element={<Profile/>}/>
                            <Route path={"/notifications"} element={<Notifications/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </header>
        </div>
    );
}
export default App;