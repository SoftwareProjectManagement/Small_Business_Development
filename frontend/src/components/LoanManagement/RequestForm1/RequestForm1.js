import { useState } from 'react';
import axios from 'axios';
import './RequestForm1.css'
import OutlinedInput from "@material-ui/core/OutlinedInput";
import LoanImage from './loan.jpg';


function RequestForm1() {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [nic, setNic] = useState("");
    const [mobile, setMobile] = useState("");
    const [sellerID, setSellerId] = useState("");
    const [description, setDescription] = useState("");


    async function add(event) {
        event.preventDefault();
        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };

        const newFormRequest = { name, address, nic, mobile, sellerID, description}

        try {
            await axios.post("http://localhost:8070/loan/add", newFormRequest, config)
            alert("Request Sent Successfully!")
            event.target.reset();
        } catch (error) {
            alert("Request Failed!");
        }
    }

    return (
        <div>
            <div style={{ width: '1000px', height: '900px' }}>
                <div className="container" align="left">
                    <div className="row">
                        <div className="col-12">
                            <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                                <h2 style={{ fontSize: '26px' }}> <br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome To The Loan Schema</h2>
                                <p style={{ fontSize: '20px', float: 'left' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Simply fill the below form details to get a loan. Once you get the loan approval, 
                                you will be able 
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                to get the loan from us.</p>
                            </div>
                        </div>
                    </div>
                    <br></br>
                 
                    <div className="row">
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
                                                        type="name" id="name" placeholder="Enter Name" required fullWidth
                                                        onChange={(e) => setName(e.target.value)}
                                                        inputProps={{ style: { padding: 12 } }}
                                                    />
                                                </div>
                                            </div>

                                            <label className='label11'>Address</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="address" id="address" placeholder="Enter Address" required fullWidth
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        inputProps={{ style: { padding: 12 } }}
                                                    />
                                                </div>
                                            </div>

                                            <label className='label11'>NIC</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="nic" id="nic" placeholder="Enter NIC" required fullWidth
                                                        onChange={(e) => setNic(e.target.value)}
                                                        inputProps={{ style: { padding: 12 } }}
                                                    />
                                                </div>
                                            </div>

                                            <label className='label11'>MOBILE</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="mobile" id="mobile" placeholder="Enter Mobile Number" required fullWidth
                                                        onChange={(e) => setMobile(e.target.value)}
                                                        inputProps={{ style: { padding: 12 } }}
                                                    />
                                                </div>
                                            </div>

                                            <label className='label11'>SELLER ID</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="sellerID" id="sellerID" placeholder="Enter Seller ID" required fullWidth
                                                        onChange={(e) => setSellerId(e.target.value)}
                                                        inputProps={{ style: { padding: 12 } }}
                                                    />
                                                </div>
                                            </div>

                                            <label className='label11'>DESCRIPTION</label><br />
                                            <div className="col-md-10 mb-4">
                                                <div className="form-group30">
                                                    <OutlinedInput
                                                        type="description" id="description" placeholder="Enter Description" required fullWidth
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        inputProps={{ style: { padding: 12 } }}
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
                </div>    
            </div>
            <aside className='aside'>
                <div className="image-content">
                    <img src={LoanImage} alt="loanImage" className="style-image"/>
                </div>
                <div className="image-description-content">
                    <h2 className="font-image">We provide the loan facility to expand your business.</h2>
                </div>
            </aside>
        </div>

    )
}

export default RequestForm1