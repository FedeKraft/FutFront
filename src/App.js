import './App.css';
import Register from './register';
import Login from './login';
import HomePage from './home';
import Profile from './profile';
import Notifications from './notifications';
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