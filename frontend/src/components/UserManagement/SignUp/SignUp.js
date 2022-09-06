import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from 'axios';
import './SignUp.css';

function SignUp() {
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState();
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false)

    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState();

    function passwordOnFocus(){
        setShowMessage(true)
    }

    function passwordOnBlur(){
        setShowMessage(false)
    }

    //show hide password
    function handleShowPassword(){
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    //handling the image uploading
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(event.target.value);
    };

    //display a preview of uploaded image
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    //header
    const config = {
        headers: {
            "content-Type": "application/json"
        }
    };

    //add new item
    async function register(event){
        event.preventDefault();

        let imgUrl

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile) 
            formData.append("upload_preset", "student_pictures")

            try {
                await axios.post("https://api.cloudinary.com/v1_1/movie-reservation/image/upload", formData).then((res) =>{
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        if(password === confirmpassword){

            const newUser = {firstname,lastname,email,phone,password,imgUrl}

            try {
                await axios.post("http://localhost:8070/user/signup", newUser , config)
                    alert("Registration Successful")
                    navigate('/user/signin')
            } catch (error) {
                if(error.response.status === 409){
                    alert(error.response.data.message)
                }
                else{
                    alert("User Registration failed")
                } 
            }
        }else{
            alert("Passwords don't match");
        }        
    }

    return (
            <div className="container" align="center" id="regback">
                <div className="card-form">
                
                    <form onSubmit={register} className="boxSignUp">
                        <div style={{position:"relative",top:-30}}>
                    <div className="col-11">
                        <div  align="center">
                            <h2>Sign Up</h2>
                        </div>
                    </div><br/>
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput
                                                type="text" id="firstname" placeholder="First Name" 
                                                required fullWidth
                                                onChange={(event)=> {setFirstName(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div><br/>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput  
                                                type="text" id="lastname" placeholder="Last Name" 
                                                required fullWidth
                                                onChange={(event)=> {setLastName(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div><br/>
                                
                                    <div className="col-md-8 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput  
                                                type="email" id="email" placeholder="Email" 
                                                required fullWidth
                                                onChange={(event)=> {setEmail(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div><br/>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="tel" id="phone" placeholder="phone" required fullWidth
                                                onChange={(event)=> {setPhone(event.target.value)}}
                                                inputProps={{style: {padding: 12}, pattern: "[0-9]{10}"}}
                                            />
                                        </div>
                                    </div><br/>
              
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type={showPassword ? "text" : "password"}
                                                id="password" name="password" placeholder="Password" required fullWidth
                                                onChange={(event)=> {setPassword(event.target.value)}}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                    <IconButton onClick={handleShowPassword}>
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                    </InputAdornment>
                                                }
                                                inputProps={{style: {padding: 12}, pattern: "[A-Za-z0-9]{8,}"}}
                                                onFocus={passwordOnFocus}
                                                onBlur={passwordOnBlur}
                                            />
                                        </div>
                                    </div><br/>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type={showPassword ? "text" : "password"}
                                                id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" required fullWidth
                                                onChange={(event)=> {setConfirmPassword(event.target.value)}}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                    <IconButton onClick={handleShowPassword}>
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                    </InputAdornment>
                                                }
                                                inputProps={{style: {padding: 12}, pattern: "[A-Za-z0-9]{8,}"}}
                                                onFocus={passwordOnFocus}
                                                onBlur={passwordOnBlur}
                                            />
                                        </div>
                                    </div><br/>
                                    <div className="col-xl-12 mb-4">
                                        {showMessage &&
                                            <div className="PWmessage">
                                                <p>Password must contain lowercase letters, uppercase letters, numbers and should consist minimum of 8 characters</p>
                                            </div>
                                        }
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input id="terms" type="checkbox" required/>
                                            <label for="terms">&nbsp;I agree to the <Link to="/terms">Terms and Conditions</Link>.</label>
                                        </div>
                                    </div>
                                </div>
                            </div><br/>
                            <div className="col-4 d-flex justify-content-center">
                                <div>
                                    {previewSource ? 
                                        <img src={previewSource} alt="preview" className="previewImg"/>
                                    :
                                        <img src="/images/avatar.jpg" className="previewImg" alt="profile pic"/>
                                    }
                                    <div className="form-group">
                                        <label htmlFor="profilepic">
                                            <input
                                                style={{ display: 'none' }}
                                                id="profilepic"
                                                name="profilepic"
                                                type="file"
                                                onChange={handleFileInputChange}
                                                value={fileInputState}
                                            />

                                            <Button color="rgb(253, 139, 8)" variant="contained" component="span" style={{fontSize:13}}>
                                                <AddAPhotoIcon/> &nbsp; Upload Profile Picture
                                            </Button>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div><br/>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input className="regbtn" type="submit" value="Sign Up" />
                                </div>
                            </div>
                        </div>
                        
                        <p>Already have an account? <a href="/user/signin">Sign In</a></p>
                        </div>
                    </form>             
                </div>                   
            </div>
    )
}

export default SignUp
