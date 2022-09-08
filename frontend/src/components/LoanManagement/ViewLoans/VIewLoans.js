import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import { orange, red, blue, green } from '@material-ui/core/colors';
import './ViewTopics.css'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';

function ViewTopics() {

    const [isStaff, setIsStaff] = useState(false)
    const [topics, setTopics] = useState([])
    const history = useHistory()
    const location = useLocation()
    const [user, setUser] = useState("");

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }

        if (localStorage.getItem("staffAuthToken")) {
            setIsStaff(true)
        }

        async function getAllTopics() {
            axios.get(`http://localhost:8070/topic`).then((res) => {
                setTopics(res.data)
            }).catch((error) => {
                alert("Failed to fetch document")
            })
        }

        getAllTopics();
    }, [location, isStaff])



    function filterContent(data, searchTerm) {
        const result = data.filter((topics) =>
            topics.group.toLowerCase().includes(searchTerm)
        )
        setDocuments(result)
    }


    function handleSearchAll(event) {
        const searchTerm = event.currentTarget.value
        axios.get(`http://localhost:8070/topic`).then((res) => {
            filterContent(res.data, searchTerm.toLowerCase())
        }).catch((error) => {
            alert("Failed to fetch documents")
        })
    }

    function add() {
        history.push(`/tdocAdd`)
    }

    const setData = async (tstatus, id) => {

        const value = {
            tstatus,
        };

        await axios
            .put(`http://localhost:8070/topic/${id}`, value)
            .then(() => {
                alert(`Topic is ${tstatus}ed`);
                window.location.reload(false);
            })
            .catch((err) => {
                alert(`Something went to wrong !!!`);
            });
    };

    const setEvaluate = async (tstatus, id) => {

        const value = {
            tstatus,
        };

        await axios
            .put(`http://localhost:8070/topic/${id}`, value)
            .then(() => {
                alert(`Topic is ${tstatus}ed`);
                window.location.reload(false);
            })
            .catch((err) => {
                alert(`Something went to wrong !!!`);
            });
    };




    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    </div>
                </div>
                <div className="col-3">
                </div>
                <div className="col-5">
                    <div className="px-3 search" align="right" style={{ top: '40px', position: 'relative', right: '460px' }}>
                        <input style={{ color: "black", fontWeight: "500", borderRadius: "8px", border: "2px solid grey", padding: '6px 123px' }}
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search"
                            onChange={handleSearchAll}
                            required
                        /><div style={{ position: 'relative', right: '510px', top: '-35px' }}><SearchIcon /></div>
                    </div>
                </div>
            </div>

            <br /><br /><br />
            <div className="productGrid"  >
                {topics.map((Topic, key) => (
                    <div key={key}>
                        <div className="p-3" style={{ overflowX: 'auto', width: 1500,marginLeft:-50 }}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ width: 260 }}>{Topic.group}</td>
                                        <td style={{ width: 400 }}>{Topic.leader}</td>
                                        <td style={{ width: 400 }}>{Topic.category}</td>
                                        <td style={{ width: 1200 }}>{Topic.topic}</td>
                                        <td style={{ width: 450, color: blue[300] }}>{Topic.tstatus}</td>
                                        <div>
                                            {isStaff === true ?
                                                <div style={{width:180}}>
                                                    <button
                                                        className="btn btn-success"
                                                        disabled={
                                                            Topic.tstatus === "Accepted" 
                                                        }
                                                        onClick={() => setData("Accepted", Topic._id)}
                                                    >
                                                        &nbsp;Approve
                                                    </button>

                                                    &nbsp;&nbsp;&nbsp;
                                                    <button
                                                        class="btn btn-info"
                                                        disabled={
                                                            Topic.tstatus === "Rejected" 
                                                        }
                                                        onClick={() => setEvaluate("Rejected", Topic._id)}
                                                    >
                                                        &nbsp;Reject
                                                    </button>
                                                </div>
                                                :

                                                <div>
                                                    
                                                    <button
                                                        disabled={
                                                            Topic.tstatus === "Submitted for grading" ||
                                                            Topic.tstatus === "Rejected"
                                                        }
                                                        className="btn btn-warning ms-3"
                                                        onClick={() => add()}
                                                    >
                                                        &nbsp;Document Upload
                                                    </button>
                                                </div>



                                            }</div>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewTopics