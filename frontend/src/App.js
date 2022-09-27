import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import AdminLogin from "./components/AdminManagement/AdminLogin";
import AddSeller from "./components/SellerManagement/AddSeller";
import Login from "./components/UserManagement/SignIn/SignIn";
import SignUp from "./components/UserManagement/SignUp/SignUp";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Cart from "./components/CartManagement/Cart";
import RequestForm1 from "./components/LoanManagement/RequestForm1/RequestForm1";
import ViewLoans from "./components/LoanManagement/ViewLoans/ViewLoans";
import Loan from "./components/LoanManagement/LoanInterface/Loan";
import RequestForm2 from "./components/LoanManagement/RequestForm2/RequestForm2";
import ViewLoans2 from "./components/LoanManagement/ViewLoans2/ViewLoans2"

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
                {/* loan schema */}
                <Route path="/loan" element={<Loan />} />
                <Route path="/loan/form1" element={<RequestForm1 />} />
                <Route path="/loan/view_loan" element={<ViewLoans />} />
                <Route path="/loan/form2" element={<RequestForm2 />} />
                <Route path="/loan/view_loan2" element={<ViewLoans2 />} />
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;