import './App.css';
import Register from './register';
import Login from './login';
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
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route element={<Auth/>} >
                    <Route path={"/home"} element={<div>kkLog</div>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default App;
import './App.css';
import Register from './register';
import Login from './login';
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
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route element={<Auth/>} >
                    <Route path={"/home"} element={<div>kkLog</div>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default App;