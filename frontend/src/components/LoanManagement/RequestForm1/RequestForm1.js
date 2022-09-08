import { useState } from 'react';
import axios from 'axios';
import './AddTopics.css'
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';


function AddTopics() {

    const [group, setGroup] = useState("");
    const [topic, setTopic] = useState("");
    const [leader, setLeader] = useState("");
    const [category, setCategory] = useState("");


    async function add(event) {
        event.preventDefault();
        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };

        const newTopic = { group, topic, leader, category}

        try {
            await axios.post("http://localhost:8070/topic/add", newTopic, config)
            alert("Topic Registration Successfull")
            event.target.reset();
        } catch (error) {
            alert("Topic registration Failed");
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
            <div className="create_topic">
                <form onSubmit={add} className="addtopic">
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <br /><br />
                                <div>
                                    <label className='label11'>Group ID</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group30">
                                            <OutlinedInput
                                                type="group" id="group" placeholder="Group ID" required fullWidth
                                                onChange={(e) => setGroup(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>

                                    <label className='label11'>Research Criteria</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group30">
                                            <OutlinedInput
                                                type="details" id="details" placeholder="Select your research criteria from the given list" required fullWidth
                                                onChange={(e) => setCategory(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>
                                    <label className='label11'>Research Topic</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group30">
                                            <OutlinedInput
                                                type="topic" id="topic" placeholder="Your Topic"
                                                required fullWidth
                                                onChange={(e) => setTopic(e.target.value)}
                                                inputProps={{ style: { padding: 35 } }}
                                            />
                                        </div>
                                    </div>
                                    <label className='label11'>Group Leader</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group30">
                                            <OutlinedInput
                                                type="leader" id="leader" placeholder="Group Leader" required fullWidth
                                                onChange={(e) => setLeader(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className='des'>
                            <label className='label11'>Discussion Subscription</label><br /><div className='check'><CheckBoxOutlinedIcon/></div>
                            </div>
                            </div>


                           
                        </div>
                        <div className="form-group50">
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

export default AddTopics