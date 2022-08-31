import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from 'axios';

function AdminLogin() {

    const [showPassword, setShowPassword] = useState()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    //show hide password
    function handleShowPassword(){
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    async function signIn(event){
        event.preventDefault();

        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };
        
        try {
            //getting data from backend
            const {data} = await axios.post("http://localhost:8070/admin/signin", {email, password}, config);

            //setting the patient authorization token
            localStorage.setItem("adminAuthToken", `Admin ${data.token}`)
            //setting user
            localStorage.setItem("user", JSON.stringify(data.result))
            
            history.push('/')
        } catch (error) {
            if(error.response.status === 404){
                alert("Invalid Email")
            }
            else if(error.response.status === 400){
                alert("Password Incorrect")
            }
            else{
                alert("Authentication Failed")
            }
        }
    }

    return (
        <div className="container" align="center">
            <div className="card-form">
                <form className="boxSignIn" onSubmit={signIn} style={{position:'relative',top:70,width:500}}>
                    <h1 className="form-h1">Sign In</h1><br/>
                    <p className="text-muted"> All your project needs at one place!</p> 
                    <input 
                        type="email" 
                        name="email" 
                        id="email"
                        placeholder="E-mail&nbsp;&nbsp; Address" 
                        onChange={(event)=> {setEmail(event.target.value)}} 
                        required 
                    />

                    <input
                        type={showPassword ? "text" : "password"} 
                        name="password"
                        id="password" 
                        placeholder="Password" 
                        onChange={(event)=> {setPassword(event.target.value)}} 
                        handleShowPassword={handleShowPassword}  
                        required 
                    />
                    <span className="showhide">
                        <IconButton onClick={handleShowPassword} >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </span>
<br/>
                    <input className="form-submit-btn" type="submit" value="Sign In" />

                    <br></br><br></br>
                    <div className="text-muted">
                        <p>Are you a Staff Member? <Link to="/staff/login"> Click here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin
