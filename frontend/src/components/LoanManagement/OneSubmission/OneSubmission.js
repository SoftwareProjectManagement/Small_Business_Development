import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import './OneSubmission.css'
import axios from 'axios'
import { orange, blue, red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Popup from './Popup.js';
import './style.css';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



function OneSubmission(props) {
    const [isAdmin, setIsAdmin] = useState(false)
    const [id, setId] = useState("");
    const [topic, setTopic] = useState("");
    const [group, setGroup] = useState("");
    const [leader, setLeader] = useState("");
    const [details, setDetails] = useState("");
    const [url, setUrl] = useState("");
    const history = useHistory()
    const [user, setUser] = useState("");
    const [reply, setReply] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const config = {
        headers: {
            "content-Type": "application/json"
        }
    };

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }

        if (localStorage.getItem("staffAuthToken")) {
            setIsAdmin(true)
        }
        async function getDocumentDetails() {
            axios.get(`http://localhost:8070/tdoc/one/${props.match.params.id}`).then((res) => {
                setId(res.data.document._id)
                setTopic(res.data.document.topic)
                setGroup(res.data.document.group)
                setDetails(res.data.document.details)
                setLeader(res.data.document.leader)
                setUrl(res.data.document.url)
            }).catch((err) => {
                alert("Failed to Fetch Details")
            })
        }
        getDocumentDetails();

    }, [props])


    function Pdf(url) {
        window.open(url);
    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const reply1 = [
        'In Progress', 'Approved', 'Rejected'
    ]


    const handleChange = (event) => {
        setReply(event.target.value);
    };

    function enter() {
        localStorage.setItem("reply", reply);
    }

    console.log(reply);



    return (

        <div style={{ width: '1000px', height: '1000px' }}>
            <div className="container" align="center" style={{ position: 'absolute', left: '20px' }}>
                <div>
                    {isOpen && <Popup
                        content={<>

                            <div className="col-xl-6 mb-3">
                                <InputLabel id="demo-mutiple-chip-label">Your Reply</InputLabel>
                                <Select
                                    id="demo-mutiple-chip"
                                    multiple fullWidth
                                    value={reply}
                                    onChange={handleChange}
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={(selected) => (
                                        <div >
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </div>
                                    )}
                                >
                                    {reply1.map((reply1) => (
                                        <MenuItem key={reply1} value={reply1} >
                                            {reply1}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>

                            <button style={{ padding: '5px 20px', borderRadius: '10px', background: 'orange', border: '2px solid orangered', color: 'white' }} onClick={enter}><b>Submit</b></button>
                        </>}
                        handleClose={togglePopup}
                    />}
                </div>


                <br /><br />
                <h2 className='header'>{topic}</h2><br /><br />
                <select>
                    <option >Display replies in nested form</option>
                    <option >Display replies in list view</option>
                </select>
                <br /><br />
                <div className="detailProductCard" >
                    <div className="detailProduct">
                        <div className="box-detailProduct">
                            <div className="row">
                                <h2 className='topic'>Research Topic &nbsp; :&nbsp;&nbsp; </h2><h2 className='topicV'> {topic}</h2><br /><br />
                                <h2 className='topic'>Group Id &nbsp; :&nbsp;&nbsp;</h2><h2 className='topicV'>{group}</h2><br /><br />
                                <h2 className='topic'>Group Leader &nbsp; :&nbsp;&nbsp;</h2><h2 className='topicV'>{leader}</h2><br /><br />
                                <h2 className='topic'>Group Members &nbsp; :&nbsp;&nbsp;</h2><h2 className='topicV'>{details}</h2><br /><br />
                                <IconButton onClick={() => Pdf(`${url}`)} style={{ position: 'relative', left: '910px', top: '-250px', height: '50px', width: '50px' }}>
                                    <PictureAsPdfIcon style={{ color: red[500], backgroundPosition: 'center', height: '50px', width: '50px' }} ></PictureAsPdfIcon>
                                </IconButton>
                                <h2 className='topicV1'>{group}.pdf</h2>
                            </div>

                        </div>

                    </div>
                    <div>
                        {isAdmin === true ?
                            <div>
                                <a className="approve" onClick={togglePopup}>
                                    Reply  |  Evaluate
                                </a>
                            </div>
                            :
                            <div>
                                <a className="approve" >
                                    Permalink
                                </a>
                            </div>
                        }
                    </div>

                </div>


                <div>


                </div>
            </div>

            <div className='replyCard'><h6 style={{ top: '25px', position: 'relative' }}>Status</h6><br /><br /><div style={{ background: '#02254bd0', color: 'white' }}>{reply}</div></div>
        </div>
    )
}

export default OneSubmission
