import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import AdminLogin from "./components/AdminManagement/AdminLogin";
import AddSeller from "./components/SellerManagement/AddSeller";
import Login from "./components/UserManagement/SignIn/SignIn";
import SignUp from "./components/UserManagement/SignUp/SignUp";
import Cart from "./components/CartManagement/Cart";


function App() {
    return (
        <Router>
            <Routes>
            <Route path="/request/add" element={<AddSeller/>}/>
                <Route path="/user/signin" element={<Login/>}/>
                <Route path="/user/signup" element={<SignUp/>} />
                <Route path="/admin/signin" element={<AdminLogin/>} />
                <Route path="/cart" element={<Cart/>} />
            </Routes>
        </Router>
    );
}

export default App;