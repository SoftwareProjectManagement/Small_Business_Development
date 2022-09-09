import { useState } from 'react';
import axios from 'axios';
import './DocumentSubmission.css'
import Button from "@material-ui/core/Button";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import KeyboardOutlinedIcon from '@mui/icons-material/KeyboardOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import FormatBoldOutlinedIcon from '@mui/icons-material/FormatBoldOutlined';
import FormatItalicOutlinedIcon from '@mui/icons-material/FormatItalicOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import FormatAlignCenterOutlinedIcon from '@mui/icons-material/FormatAlignCenterOutlined';
import FormatAlignJustifyOutlinedIcon from '@mui/icons-material/FormatAlignJustifyOutlined';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
import FormatAlignRightOutlinedIcon from '@mui/icons-material/FormatAlignRightOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';


function DocumentSubmission() {

    const [group, setGroup] = useState("");
    const [topic, setTopic] = useState("");
    const [leader, setLeader] = useState("");
    const [details, setDetails] = useState("");

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

        let url


        if (previewSource) {
            const formData = new FormData();
            formData.append("file", selectedFile)
            formData.append("upload_preset", "topic_doc")


            try {
                await axios.post("https://api.cloudinary.com/v1_1/movie-reservation/image/upload", formData).then((res) => {
                    url = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        const newDocument = { group, topic, leader, details, url }

        try {
            await axios.post("http://localhost:8070/tdoc/add", newDocument, config)
            alert("Document Added Successfully")
            event.target.reset();
        } catch (error) {
            alert("Document can't be Added");
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
                                    <label className='label1'>Group ID</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group3">
                                            <OutlinedInput
                                                type="group" id="group" placeholder="Group ID" required fullWidth
                                                onChange={(e) => setGroup(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>
                                    <label className='label1'>Research Topic</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group3">
                                            <OutlinedInput
                                                type="topic" id="topic" placeholder="Your Topic"
                                                required fullWidth
                                                onChange={(e) => setTopic(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>
                                    <label className='label1'>Group Leader</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group3">
                                            <OutlinedInput
                                                type="leader" id="leader" placeholder="Group Leader" required fullWidth
                                                onChange={(e) => setLeader(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>
                                    <label className='label1'>Group Members</label><br />
                                    <div className='fill'><div className='icons'><KeyboardOutlinedIcon />&nbsp;&nbsp;&nbsp;&nbsp;<FormatColorTextOutlinedIcon />
                                        &nbsp;&nbsp;&nbsp;&nbsp;<FormatBoldOutlinedIcon />&nbsp;&nbsp;&nbsp;&nbsp;<FormatItalicOutlinedIcon />&nbsp;&nbsp;&nbsp;&nbsp;<FormatListBulletedOutlinedIcon />
                                        &nbsp;&nbsp;&nbsp;&nbsp;<FormatListNumberedOutlinedIcon />&nbsp;&nbsp;&nbsp;&nbsp;<FormatAlignCenterOutlinedIcon />&nbsp;&nbsp;&nbsp;&nbsp;<FormatAlignJustifyOutlinedIcon />
                                        &nbsp;&nbsp;&nbsp;&nbsp;< FormatAlignLeftOutlinedIcon />&nbsp;&nbsp;&nbsp;&nbsp;<FormatAlignRightOutlinedIcon />&nbsp;&nbsp;&nbsp;&nbsp;<AddPhotoAlternateOutlinedIcon />
                                    </div> </div>
                                    <div className="col-md-14 mb-4">
                                        <div className="form-group3">
                                            <OutlinedInput
                                                type="details" id="details" required fullWidth
                                                onChange={(e) => setDetails(e.target.value)}
                                                inputProps={{ style: { padding: 68 } }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='des'>
                            <label className='label1'>Discussion Subscription</label><br /><div className='check'><CheckBoxOutlinedIcon/></div>
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
                        <div className="form-group5">
                        <input className="btn" type="submit" value="Submit" style={{ padding: '5px 20px', borderRadius: '10px', background: 'orange', border: '2px solid orangered', color: 'white',fontSize:'18px' }}/>
                    </div>
                    </div>


                   
                </form>
            </div>
        </div>

        
</div>
<aside className='aside'>
<div class="vertical-menu" align="center">
  <a href="#" class="active">Research Criterias</a>
  <a href="#"></a>
  <a href="#">Distributed & Parallel Computing</a>
  <a href="#">ICT for Development</a>
  <a href="#">Data Communucation & Networking</a>
  <a href="#">Robotics & Intelligent Systems</a>
  <a href="#">Assistive Tecnology</a>
  <a href="#">Human Computer Interaction</a>
  <a href="#">Elearning and Education</a>
  <a href="#">Computational Linguistics</a>
  <a href="#">Visual Computing</a>
  <a href="#">Digital Lab</a> 
  <a href="#">Software Engineering</a>
  <a href="#">Artificial Intelligence</a>
  <a href="#">Internet Security</a>
</div>

        </aside>
</div>

    )
}

export default DocumentSubmission