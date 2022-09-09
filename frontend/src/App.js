import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import AdminLogin from "./components/AdminManagement/AdminLogin";
import AddSeller from "./components/SellerManagement/AddSeller";
import Login from "./components/UserManagement/SignIn/SignIn";
import SignUp from "./components/UserManagement/SignUp/SignUp";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Cart from "./components/CartManagement/Cart";
import SingleItem from "./components/ProductManagement/SingleItem/SingleItem";
import AddCategory from "./components/CategoryManagement/AddCategory/AddCategory";
import ViewCategory from "./components/CategoryManagement/ViewCategory/ViewCategory";
import ViewProdcuts from "./components/ProductManagement/ViewAllProdcuts/ViewProducts";
import RequestForm1 from "./components/LoanManagement/RequestForm1/RequestForm1";
//import ViewLoans from "./components/LoanManagement/ViewLoans/ViewLoans"
import AddProducts from "./components/ProductManagement/AddProducts/AddProducts";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/request/add" element={<AddSeller />} />
                <Route path="/user/signin" element={<Login />} />
                <Route path="/user/signup" element={<SignUp />} />
                <Route path="/admin/signin" element={<AdminLogin />} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/product/item/:id" element={<SingleItem/>}/>
                <Route path="/category/add" element={<AddCategory/>}/>
                <Route path="/category/view" element={<ViewCategory/>}/>
                <Route path="/products/view" element={<ViewProdcuts/>}/>
                <Route path="/loan/form_1" element={<RequestForm1 />} />
                {/* <Route path="/loan/view_loan" element={<ViewLoans />} /> */}
                <Route path="/products/add" element={<AddProducts/>} />
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;