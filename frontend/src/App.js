import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import AdminLogin from "./components/AdminManagement/AdminLogin";
import Login from "./components/UserManagement/SignIn/SignIn";
import SignUp from "./components/UserManagement/SignUp/SignUp";
import Cart from "./components/CartManagement/Cart";
import SingleItem from "./components/ProductManagement/SingleItem/SingleItem";


function App() {
    return (
        <Router>
            <Routes>

                <Route path="/user/signin" element={<Login/>}/>
                <Route path="/user/signup" element={<SignUp/>} />
                <Route path="/admin/signin" element={<AdminLogin/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/product/item/:id" element={<SingleItem/>}/>
            </Routes>
        </Router>
    );
}

export default App;