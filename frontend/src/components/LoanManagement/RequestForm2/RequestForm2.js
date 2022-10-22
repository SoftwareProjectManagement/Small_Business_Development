import { useState } from 'react';
import axios from 'axios';
import './RequestForm2.css'
import OutlinedInput from "@material-ui/core/OutlinedInput";
import LoanImage from './loan_req2.jpg';
import { useNavigate } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Swal from 'sweetalert2';

function RequestForm2() {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [nic, setNic] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();

    const [previewSource, setPreviewSource] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [fileInputState, setFileInputState] = useState('');

    //handling the file uploading
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

    async function add(event) {
        event.preventDefault();
        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };

        let businessRegistration

        if (previewSource) {
            const formData = new FormData();
            formData.append("file", selectedFile)
            formData.append("upload_preset", "topic_doc")


            try {
                await axios.post("https://api.cloudinary.com/v1_1/movie-reservation/image/upload", formData).then((res) => {
                    businessRegistration = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        const newFormRequest = { name, address,email, nic, mobile, description, amount, businessRegistration}

        try {
            await axios.post("http://localhost:8070/loan2/add", newFormRequest, config)
            Swal.fire({
                icon: 'success',
                text: 'Request Added Successfuly',
                showConfirmButton: false,
              })
            event.target.reset();
            navigate('/loan/view_loan2')
        } catch (error) {
            alert("Request Failed!");
        }
    }

    return (
        <div className="container pt-4">
                    <div className="row">
                        <div className="col-12">
                            <div className="pb-2" style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: '28px', fontWeight: 'bold' }}>Congratulations! You Can Apply For a Loan</p>
                                <p style={{ fontSize: '20px'}}>
                                Simply fill the below form details to get a loan. Once you get the loan approval, 
                                you will be able to get the loan from us. We will contact you as soon as possible.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                        <form onSubmit={add} className="request-form">
                            <div className="row">
                                <div className="col-8">
                                    <div className="row">
                                        <br /><br />
                                        <div>
                                            <label className='label11'>NAME</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="name" id="name" placeholder="Enter Your Name" required fullWidth
                                                        onChange={(e) => setName(e.target.value)}
                                                        inputProps={{ style: { padding: 12 } }}
                                                    />
                                                </div>
                                            </div>

                                            <label className='label11'>ADDRESS</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="address" id="address" placeholder="Enter Your Address" required fullWidth
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        inputProps={{ style: { padding: 12 } }}
                                                    />
                                                </div>
                                            </div>

                                            <label className='label11'>NIC</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="nic" id="nic" placeholder="Enter Your NIC Number" required fullWidth
                                                        value={nic}
                                                        onChange={(e) => {
                                                            const limitOfNic = 12;
                                                            setNic(e.target.value.slice(0,limitOfNic));}}
                                                        inputProps={{ style: { padding: 12 },
                                                        pattern:"[1-9]{1}[0-9]{10}[vV0-9]{1}"}}
                                                    />
                                                </div>
                                            </div>

                                            <label className='label11'>MOBILE</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="text" id="mobile" placeholder="Enter Your Mobile Number" required fullWidth
                                                        value={mobile}
                                                        onChange={(e) => {
                                                            const limit = 10;
                                                            setMobile(e.target.value.slice(0,limit))}}
                                                        inputProps={{ style: { padding: 12},
                                                            pattern:"[0]{1}[0-9]{9}"
                                                          }}
                                                    />
                                                </div>
                                            </div>

                                            <label className='label11'>EMAIL</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="email" id="email" placeholder="Enter Your Email" required fullWidth
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        inputProps={{ style: { padding: 12 } }}
                                                    />
                                                </div>
                                            </div>

                                            <label className='label11'>DESCRIPTION</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="description" id="description" placeholder="Why do you want this loan?" required fullWidth
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        maxRows={5}
                                                        multiline={true}
                                                    />
                                                </div>
                                            </div>

                                            <label className='label11'>Expected Amount</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="any" id="amount" placeholder="Enter your loan amount" required fullWidth
                                                        onChange={(e) => setAmount(e.target.value)}
                                                        inputProps={{ style: { padding: 12 } }}
                                                    />
                                                </div>
                                            </div>

                                            <label className='label11'>BUSINESS REGISTRATION</label><br />

                                        <label htmlFor="businessRegistration">
                                            <input
                                                style={{ display: 'none' }}
                                                id="businessRegistration"
                                                name="businessRegistration"
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleFileInputChange}
                                                value={fileInputState}
                                            />

                                            <Button style={{position:"relative",top:-25,right:-260,width:220,fontSize:13}} variant="contained" component="span">
                                                < FileUploadOutlinedIcon/> Upload document
                                            </Button>
                                        </label>
                                            
                                        </div>
                                    </div>
                                    <div className="form-group50">
                                        <input className="btn form1-btn" type="submit" value="Submit"/>
                                    </div>
                                </div>
                            </div>
                        </form>
                        </div>
                        <div className="col-4">
                            <div className="image-content">
                                <img src={LoanImage} alt="loanImage" className="style-image"/>
                            </div>
                            <div className="image-description-content">
                                <h2 className="font-image">We provide the loan facility to expand your business.</h2>
                            </div>
                        </div>
                    </div>  
        </div>

    )
}

export default RequestForm2