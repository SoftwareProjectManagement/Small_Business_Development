import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import AdminLogin from "./components/AdminManagement/AdminLogin";
import AddSeller from "./components/SellerManagement/AddSeller";
import Login from "./components/UserManagement/SignIn/SignIn";
import SignUp from "./components/UserManagement/SignUp/SignUp";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Cart from "./components/CartManagement/Cart";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d13eff63c95f52d5d0244d63a0d149202afc2929
import SingleItem from "./components/ProductManagement/SingleItem/SingleItem";
import AddCategory from "./components/CategoryManagement/AddCategory/AddCategory";
import ViewCategory from "./components/CategoryManagement/ViewCategory/ViewCategory";
import ViewProdcuts from "./components/ProductManagement/ViewAllProdcuts/ViewProducts";
<<<<<<< HEAD
=======
import RequestForm1 from "./components/LoanManagement/RequestForm1/RequestForm1";
import ViewLoans from "./components/LoanManagement/ViewLoans/ViewLoans"
>>>>>>> e8cf2c68516b0395ef93df8c55b4834f5322989b
=======
import RequestForm1 from "./components/LoanManagement/RequestForm1/RequestForm1";
//import ViewLoans from "./components/LoanManagement/ViewLoans/ViewLoans"
import AddProducts from "./components/ProductManagement/AddProducts/AddProducts";
>>>>>>> d13eff63c95f52d5d0244d63a0d149202afc2929

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d13eff63c95f52d5d0244d63a0d149202afc2929
                <Route path="/product/item/:id" element={<SingleItem/>}/>
                <Route path="/category/add" element={<AddCategory/>}/>
                <Route path="/category/view" element={<ViewCategory/>}/>
                <Route path="/products/view" element={<ViewProdcuts/>}/>
<<<<<<< HEAD
=======
                <Route path="/loan/form1" element={<RequestForm1 />} />
                <Route path="/loan/view_loan" element={<ViewLoans />} />
>>>>>>> e8cf2c68516b0395ef93df8c55b4834f5322989b
=======
                <Route path="/loan/form_1" element={<RequestForm1 />} />
                {/* <Route path="/loan/view_loan" element={<ViewLoans />} /> */}
                <Route path="/products/add" element={<AddProducts/>} />
>>>>>>> d13eff63c95f52d5d0244d63a0d149202afc2929
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;