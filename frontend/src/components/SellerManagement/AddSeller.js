import { useState } from 'react';
import axios from 'axios';
import './AddSeller.css'
import Button from "@material-ui/core/Button";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import Swal from 'sweetalert2';


function AddSeller() {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [nic, setNIC] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [reg, setReg] = useState("");

    const [previewSource, setPreviewSource] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [fileInputState, setFileInputState] = useState('');

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



    async function add(event) {
        event.preventDefault();
        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };

        let proof


        if (previewSource) {
            const formData = new FormData();
            formData.append("file", selectedFile)
            formData.append("upload_preset", "topic_doc")


            try {
                await axios.post("https://api.cloudinary.com/v1_1/movie-reservation/image/upload", formData).then((res) => {
                    proof = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        const newRequest = { name,address,nic,mobile,email,reg, proof }

        try {
            await axios.post("http://localhost:8070/request/add", newRequest, config)
            Swal.fire({
                icon: 'success',
                text: 'Request Added Successfuly',
                showConfirmButton: false,
              })
            event.target.reset();
        } catch (error) {
            alert("Request can't be Added");
        }
    }

    return (
        <div>
        <div style={{ width: '1000px', height: '900px' }}>
        <div className="container" align="left" >
            <div className="row">
                <div className="col-12" style={{marginTop:20}}>
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2 style={{ fontSize: '26px' }}> <br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Are You Willing to Join With Us ?</h2>
                        <p style={{ width:800,fontSize:18,marginLeft:200}}>Simply fill the below form details to join with us and get your products. Once you get the approval you will be add your products into our platform and enhance your market place.</p>
                    </div>
                    <div style={{position:"absolute",marginTop:100,marginLeft:1030}}>
                        <img src="/images/win.png"/>
                    </div>
                </div>
            </div>
            <br></br>
            <div className="create_sub" style={{marginLeft:130,width:880}}>
                <form onSubmit={add} className="addsub">
                    
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <br /><br />
                                <div>
                                    <label className='label1'>Full Name</label><br />
                                    <div className="col-md-7 mb-3">
                                        <div className="form-group3">
                                            <OutlinedInput
                                                type="group" id="group" placeholder="Full Name" required fullWidth
                                                onChange={(e) => setName(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>
                                    <label className='label1'>Address</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group3">
                                            <OutlinedInput
                                                type="topic" id="topic" placeholder="Permenet Address"
                                                required fullWidth
                                                onChange={(e) => setAddress(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>
                                    <label className='label1'>NIC Number</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group3">
                                            <OutlinedInput
                                                type="leader" id="nic" placeholder="NIC Number" required fullWidth
                                                value={nic}
                                                onChange={(e) => {
                                                    const limitOfNic = 12;
                                                    setNIC(e.target.value.slice(0,limitOfNic));
                                                }}
                                                
                                                inputProps={{ style: { padding: 12 },
                                                pattern:"[1-9]{1}[0-9]{10}[vV0-9]{1}"
                                            }}
                                            />
                                        </div>
                                    </div>
                                    <label className='label1'>Mobile Number</label><br />
                                    <div className="col-md-14 mb-4">
                                        <div className="form-group3">
                                            <OutlinedInput
                                                type="tel" id="phone" placeholder="Mobile Number" required fullWidth
                                                value={mobile}
                                                onChange={(e) => {
                                                    const limitOfNic = 12;
                                                    setMobile(e.target.value.slice(0,limitOfNic))}}
                                                inputProps={{ style: { padding: 12 } ,
                                                pattern:"[0]{1}[0-9]{9}"
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <label className='label1'>Email Address</label><br />
                                    <div className="col-md-14 mb-4">
                                        <div className="form-group3">
                                            <OutlinedInput
                                                type="details" id="details" placeholder="Email Address" required fullWidth
                                                onChange={(e) => setEmail(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>

                                    <label className='label1'>Bussiness ID</label><br />
                                    <div className="col-md-14 mb-4">
                                        <div className="form-group3">
                                            <OutlinedInput
                                                type="details" id="details" placeholder="Bussiness Registration Number" required fullWidth
                                                onChange={(e) => setReg(e.target.value)}
                                                inputProps={{ style: { padding:12 } }}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                           
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                            <div>
                                {previewSource ?
                                    <img className="previewImgsub" />
                                    :
                                    <img className="previewImgsub"  />
                                }
                                <div className="form-group4" style={{marginTop:-55,marginLeft:310}}>
                                <label className='label2'>Bussiness Registration Certificate</label>
                                    <label htmlFor="profilepic">
                                        <input
                                            style={{ display: 'none' }}
                                            id="profilepic"
                                            name="profilepic"
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleFileInputChange}
                                            value={fileInputState}
                                        />

                                        <Button  variant="contained" component="span" style={{position:"relative",top:-15,left:110,width:250,fontSize:13}}>
                                            < FileUploadOutlinedIcon/> &nbsp; Upload document
                                        </Button>
                                    </label>
                                </div>
                            </div>
                        </div>

<br/><br/><br/> <br/><br/>  <br/><br/> 
                        <div className='des' style={{position:"relative",top:50,left:32}}>
                            <label className='label1'>I hereby accept the terms and conditions</label><br /><div className='check'><CheckBoxOutlinedIcon/></div>
                            </div>

                        <div className="form-group5">
                        <input className="btn" type="submit" value="Submit" style={{ padding: '5px 20px', borderRadius: '10px', background: 'orange', border: '2px solid orangered', color: 'white',fontSize:'18px' }}/>
                    </div>
                    </div>


                   
                </form>
            </div>
        </div>

     
</div>
<br/><br/>   <br/><br/>   <br/><br/>  <br/><br/>  <br/><br/>  <br/><br/>  
</div>


    )
}

export default AddSeller