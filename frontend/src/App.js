import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import AdminLogin from "./components/AdminManagement/AdminLogin";
import Login from "./components/UserManagement/SignIn/SignIn";
import SignUp from "./components/UserManagement/SignUp/SignUp";


function App() {
    return (
        <Router>
            <Routes>

                <Route path="/user/signin" element={<Login/>}/>
                <Route path="/user/signup" element={<SignUp/>} />
                <Route path="/admin/signin" element={<AdminLogin/>} />
            </Routes>
        </Router>
    );
}

export default App;