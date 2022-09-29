import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router';
import { orange, red, blue, green } from '@material-ui/core/colors';
import './ViewUsers.css'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function ViewUser() {

    const [isAdmin, setIsAdmin] = useState(false)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState("");

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }

        if (localStorage.getItem("adminAuthToken")) {
            setIsAdmin(true)
        }

        async function getAllUsers() {
            axios.get(`http://localhost:8070/user/view`).then((res) => {
                setUsers(res.data)
            }).catch((error) => {
                alert("Failed to fetch the details")
            })
        }

        getAllUsers();
    }, [location, isAdmin])



    function filterContent(data, searchTerm) {
        const result = data.filter((users) =>
            users.firstname.toLowerCase().includes(searchTerm)
        )
        setUsers(result)
    }


    function handleSearchAll(event) {
        const searchTerm = event.currentTarget.value
        axios.get(`http://localhost:8070/user/view`).then((res) => {
            filterContent(res.data, searchTerm.toLowerCase())
        }).catch((error) => {
            alert("Failed to fetch the details")
        })
    }


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
                    <div className="px-3 search" align="right" style={{ top: '60px', position: 'relative', right: '0px' }}>
                        <input style={{ color: "black", fontWeight: "500", borderRadius: "8px", border: "2px solid grey", padding: '6px 123px' }}
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search for something?"
                            onChange={handleSearchAll}
                            required
                        /><div style={{ position: 'relative', right: '10px', top: '-35px' }}><SearchIcon /></div>
                    </div>
                </div>
            </div>

            <br /><br /><br />
            <div className="product"  >
                {users.map((Users, key) => (
                    <div key={key}>
                        <div className="p-3" style={{ overflowX: 'auto', width: 1500,marginLeft:-70 }}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ width: 560 }}>{Users.firstname}</td>
                                        <td style={{ width: 400 }}>{Users.lastname}</td>
                                        <td style={{ width: 400 }}>{Users.imgUrl}</td>
                                        <td style={{ width: 400 }}>{Users.phone}</td>
                                        <td style={{ width: 400 }}>{Users.email}</td>
                            
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

export default ViewUser