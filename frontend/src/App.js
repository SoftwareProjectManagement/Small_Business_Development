import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
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
import ViewLoans from "./components/LoanManagement/ViewLoans/ViewLoans";
import Loan from "./components/LoanManagement/LoanInterface/Loan";
import RequestForm2 from "./components/LoanManagement/RequestForm2/RequestForm2";
import ViewLoans2 from "./components/LoanManagement/ViewLoans2/ViewLoans2";
import AddProducts from "./components/ProductManagement/AddProducts/AddProducts";
import ViewSeller from "./components/SellerManagement/ViewSeller";
import ViewUsers from "./components/UserManagement/AllUsers/AllUsers";
import ReportSeller from "./components/SellerManagement/ReportSeller";
import Home from "./components/Home/Home";
import Tips from "./components/TipsManagement/Tips";
import Workshop from "./components/WorkshopManagement/Workshop"
import PaymentHistory from "./components/PaymentManagement/PaymentHistory"
import History from "./components/PaymentManagement/History"
import UpdateProduct from "./components/ProductManagement/UpdateProduct/UpdateProduct";
import ReportsProducts from "./components/ProductManagement/ReportProducts/ReportsProducts";
import LoanReport from "./components/LoanManagement/ViewLoans/ReportPage";
import LoanReport2 from "./components/LoanManagement/ViewLoans2/ReportPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
                <Route path="/request/add" element={<AddSeller />} />
                <Route path="/user/signin" element={<Login />} />
                <Route path="/user/signup" element={<SignUp />} />
                <Route path="/admin/signin" element={<AdminLogin />} />
                <Route path="/cart/:id" element={<Cart />} />
                <Route path="/product/item/:id" element={<SingleItem />} />
                <Route path="/loan/form1" element={<RequestForm1 />} />
                <Route path="/loan/view_loan" element={<ViewLoans />} />
                <Route path="/loan" element={<Loan />} />
                <Route path="/loan/form1" element={<RequestForm1 />} />
                <Route path="/loan/view_loan" element={<ViewLoans />} />
                <Route path="/loan/form2" element={<RequestForm2 />} />
                <Route path="/loan/view_loan2" element={<ViewLoans2 />} />
                <Route path="/sellerR" element={<ReportSeller/>} />
                <Route path="/" element={<Home/>} />
                <Route path="/tips" element={<Tips/>} />
                <Route path="/workshops" element={<Workshop />}/>
                <Route path="/viewPayments" element={<PaymentHistory />}/>
                <Route path="/history" element={<History />}/>

           
                <Route path="/product/item/:id" element={<SingleItem />} />
                <Route path="/category/add" element={<AddCategory />} />
                <Route path="/category/view" element={<ViewCategory />} />
                <Route path="/products/view/:id" element={<ViewProdcuts />} />
                <Route path="/products/add" element={<AddProducts />} />
                <Route path="/requests" element={<ViewSeller />} />
                <Route path="/all" element={<ViewUsers />} />
                <Route path="/products/update/:id" element={<UpdateProduct />} />
                <Route path="/products/reports" element={<ReportsProducts />} />
                <Route path="/loan/view_loan2" element={<ViewLoans2 />} />



                <Route path="/loan/view_loan/report" element={<LoanReport />} />
                <Route path="/loan/view_loan2/report" element={<LoanReport2 />} />

      </Routes>
      <Footer />
    </Router>
  );

}

export default App;
