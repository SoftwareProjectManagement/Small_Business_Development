import { useState } from 'react';
import axios from 'axios';
import './AddSeller.css'
import Button from "@material-ui/core/Button";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';


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
            alert("Request Added Successfully")
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
                <div className="col-12">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2 style={{ fontSize: '26px' }}> <br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Topic Document Submission</h2>
                    </div>
                </div>
            </div>
            <br></br>
            <div className="create_sub">
                <form onSubmit={add} className="addsub">
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <br /><br />
                                <div>
                                    <label className='label1'>Full Name</label><br />
                                    <div className="col-md-10 mb-4">
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
                                                type="leader" id="leader" placeholder="NIC Number" required fullWidth
                                                onChange={(e) => setNIC(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>
                                    <label className='label1'>Mobile Number</label><br />
                                    <div className="col-md-14 mb-4">
                                        <div className="form-group3">
                                            <OutlinedInput
                                                type="details" id="details" required fullWidth
                                                onChange={(e) => setMobile(e.target.value)}
                                                inputProps={{ style: { padding: 68 } }}
                                            />
                                        </div>
                                    </div>

                                    <label className='label1'>Email Address</label><br />
                                    <div className="col-md-14 mb-4">
                                        <div className="form-group3">
                                            <OutlinedInput
                                                type="details" id="details" required fullWidth
                                                onChange={(e) => setEmail(e.target.value)}
                                                inputProps={{ style: { padding: 68 } }}
                                            />
                                        </div>
                                    </div>

                                    <label className='label1'>Bussiness Registration Number</label><br />
                                    <div className="col-md-14 mb-4">
                                        <div className="form-group3">
                                            <OutlinedInput
                                                type="details" id="details" required fullWidth
                                                onChange={(e) => setReg(e.target.value)}
                                                inputProps={{ style: { padding: 68 } }}
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
                                <div className="form-group4">
                                <label className='label2'>Upload Documents</label>
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

                                        <Button color="primary" variant="contained" component="span">
                                            < FileUploadOutlinedIcon/> &nbsp; Upload document
                                        </Button>
                                    </label>
                                </div>
                            </div>
                        </div>


                        <div className='des'>
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
</div>

    )
}

export default AddSeller