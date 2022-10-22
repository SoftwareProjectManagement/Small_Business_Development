import { useState } from 'react';
import axios from 'axios';
import './RequestForm1.css'
import OutlinedInput from "@material-ui/core/OutlinedInput";
import LoanImage from './loan.jpg';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function RequestForm1() {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [nic, setNic] = useState("");
    const [mobile, setMobile] = useState("");
    const [sellerID, setSellerId] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();


    async function add(event) {
        event.preventDefault();
        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };

        const newFormRequest = { name, address,email, nic, mobile, sellerID, description}

        try {
            await axios.post("http://localhost:8070/loan/add", newFormRequest, config)
            Swal.fire({
                icon: 'success',
                text: 'Request Added Successfuly',
                showConfirmButton: false,
              })
            event.target.reset();
            navigate('/loan/view_loan')
        } catch (error) {
            alert("Request Failed!");
        }
    }

    return (
        <div className="container pt-4">
                    <div className="row">
                        <div className="col-12">
                            <div className="pb-2" style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: '28px', fontWeight: 'bold' }}>Welcome To The Loan Schema</p>
                                <p style={{ fontSize: '20px'}}>
                                Simply fill the below form details to get a loan. Once you get the loan approval, 
                                you will be able to get the loan from us.</p>
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

                                            <label className='label11'>Address</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="address" id="address" placeholder="Enter Your Address" required fullWidth
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        inputProps={{ style: { padding: 12 } }}
                                                    />
                                                </div>
                                            </div>

                                            <label className='label11'>Email</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="email" id="email" placeholder="Enter Your Email" required fullWidth
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        inputProps={{ style: { padding: 12 } }}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <label className='label11'>NIC</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="text" 
                                                        id="nic" placeholder="Enter Your NIC Number" required fullWidth
                                                        value={nic}
                                                        onChange={(e) => {
                                                            const limitOfNic = 12;
                                                            setNic(e.target.value.slice(0,limitOfNic));}}
                                                        inputProps={{ style: { padding: 12 },
                                                        pattern:"[1-9]{1}[0-9]{10}[vV0-9]{1}"
                                                    }}
                                                    />
                                                </div>
                                            </div>

                                            <label className='label11'>MOBILE</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="tel" id="mobile" placeholder="Enter Your Mobile Number" required fullWidth
                                                        value={mobile}
                                                        onChange={(e) => {
                                                            const limit = 10;
                                                            setMobile(e.target.value.slice(0,limit));
                                                        }}
                                                        inputProps={{ style: { padding: 12 },
                                                        pattern:"[0]{1}[0-9]{9}" }}
                                                        
                                                    />
                                                </div>
                                            </div>

                                            <label className='label11'>SELLER ID</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="sellerID" id="sellerID" placeholder="Enter Your Seller ID" required fullWidth
                                                        onChange={(e) => setSellerId(e.target.value)}
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

export default RequestForm1