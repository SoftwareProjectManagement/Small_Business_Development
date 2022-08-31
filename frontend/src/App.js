import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AdminLogin from "./components/AdminManagement/AdminLogin";
import Login from "./components/UserManagement/SignIn/SignIn";
import SignUp from "./components/UserManagement/SignUp/SignUp";


function App() {
    return (
        <Router>
            <Switch>
                <Route path="/user/signin" exact component={Login}/>
                <Route path="/user/signup" exact component={SignUp}/>
                <Route path="/admin/signin" exact component={AdminLogin}/>

            </Switch>
        </Router>
    );
}

export default App;