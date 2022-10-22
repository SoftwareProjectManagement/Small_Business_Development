import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router';
import { red } from '@material-ui/core/colors';
import './ViewLoans2.css'
import axios from 'axios'
import Swal from 'sweetalert2';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function ViewLoans2() {

    const [isAdmin, setIsAdmin] = useState(false);
    const [loans, setLoans] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState("");

    const config = {
        headers: {
            "content-Type": "application/json"
        }
    };

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }

        if (localStorage.getItem("adminAuthToken")) {
            setIsAdmin(true)
        }

        async function getAllRequests() {
            axios.get(`http://localhost:8070/loan2`).then((res) => {
                setLoans(res.data)
            }).catch((error) => {
                alert("Failed to fetch document")
            })
        }

        getAllRequests();
    }, [location, isAdmin])

    function filterContent(data, searchTerm) {
        const result = data.filter((loans) =>
            loans.name.toLowerCase().includes(searchTerm)
        )
        setLoans(result)
    }

    function handleSearchAll(event) {
        const searchTerm = event.currentTarget.value
        axios.get(`http://localhost:8070/loan2`).then((res) => {
            filterContent(res.data, searchTerm.toLowerCase())
        }).catch((error) => {
            alert("Failed to fetch documents")
        })
    }

    function add() {
        navigate(`/`)
    }

    const setData = async (loanStatus, id) => {

        const value = {
            loanStatus,
        };

        await axios
            .put(`http://localhost:8070/loan2/${id}`, value)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    text: `Loan is ${loanStatus}`,
                    showConfirmButton: false,
                  })
                window.location.reload(false);
            })
            .catch((err) => {
                alert(`Something went to wrong !!!`);
            });
    };

    const setStatus = async (loanStatus, id) => {

        const value = {
            loanStatus,
        };

        await axios
            .put(`http://localhost:8070/loan2/${id}`, value)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    text: `Loan is ${loanStatus}`,
                    showConfirmButton: false,
                  })
                window.location.reload(false);
            })
            .catch((err) => {
                alert(`Something went to wrong !!!`);
            });
    };

    async function deleteRequest(id) {
        console.log(id);
        await axios.delete(`http://localhost:8070/loan2/delete/${id}`, config).then(() => {
            Swal.fire({
                icon: 'success',
                text: 'Successfully Deleted!',
                showConfirmButton: false,
              })
            navigate('/loan/view_loan2')
        }).catch((error) => {
            alert(`Cancellation Failed\n${error.message}`)
        })
    }

    function Pdf(businessRegistration) {
        window.open(businessRegistration);
    }

    const navigateToReport = () => {
        navigate('/loan/view_loan/report');
      }

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12 heading">
                <h1>Seller's Loan Request List</h1>
                </div>
            </div>
            <div className="row">
            {isAdmin === true ?
                <div>
                    <button
                        className="btn btn-warning ms-3"
                        onClick={navigateToReport}>
                        &nbsp;Generate Report
                    </button>
                </div>
                :
                <div></div>}

                <div className="col-xl-2 search-box">
                    <div className="px-3 search" align="right" style={{ top: '10px', position: 'relative' }}>
                        <input style={{ color: "black", fontWeight: "500", borderRadius: "8px", border: "2px solid grey", padding: '6px 12px' }}
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search"
                            onChange={handleSearchAll}
                            required
                        /><div style={{ position: 'relative', right: '510px', top: '-35px' }}>
                                <SearchRoundedIcon />
                            </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                                <div className="p-5">
                                    <table>
                                        <thead className="table-head">
                                            <tr>
                                                <th className="table-head-title th-border">Name</th>
                                                <th className="table-head-title th-border">NIC</th>
                                                <th className="table-head-title th-border">Email</th>
                                                <th className="table-head-title th-border">Mobile</th>
                                                <th className="table-head-title th-border">Business Registration</th>
                                                <th className="table-head-title th-border" style={{ textAlign:'center' }}>Status</th>
                                                {isAdmin === true ?
                                                        <th className="table-head-title th-border" style={{ textAlign:'center' }}>Action</th>
                                                        :
                                                        <div></div>
                                                    }
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {loans.map((Loan, key) => (
                                            <tr key={key} className="table-body">
                                                <td className="text-l tb-border" style={{ width: 400, padding: '5px 15px'}}>{Loan.name}</td>
                                                <td className="text-l tb-border"  style={{ width: 160, padding: '5px 15px' }}>{Loan.nic}</td>
                                                <td className="text-l tb-border" style={{ width: 200, padding: '5px 15px' }}>{Loan.email}</td>
                                                <td className="text-l tb-border"  style={{ width: 160, padding: '5px 15px' }}>{Loan.mobile}</td>
                                                <td className="text-l tb-border"  style={{ width: 160, padding: '5px 15px', textAlign:'center' }}>
                                                <IconButton onClick={() => Pdf(`${Loan.businessRegistration}`)}>
                                                    <PictureAsPdfIcon style={{ color: red[500], backgroundPosition: 'center' }} ></PictureAsPdfIcon>
                                                </IconButton>
                                                </td>
                                                <td className="text-l tb-border"  style={{ width: 260, padding: '5px 15px', textAlign:'center' }}>
                                                {
                                                Loan.loanStatus === "Rejected" ? <span className="bg-danger rounded text-white p-1">Rejected</span>:
                                                Loan.loanStatus === "Accepted" ? <span className="bg-success rounded text-white p-1">Accepted</span>
                                                :
                                                <span className="bg-warning rounded text-black p-1">Pending</span>
                                                }
                                                </td>
                                                {isAdmin === true ?
                                                <td className="text-l tb-border"  style={{ width: 460 }}>
                                                            <button
                                                                style={{ margin: '3px 3px 5px 3px' }}
                                                                className="btn btn-success"
                                                                disabled={
                                                                    Loan.loanStatus === "Accepted" 
                                                                }
                                                                onClick={() => setData("Accepted", Loan._id)}
                                                            >Approve
                                                            </button>
                                                            <button
                                                                style={{ margin: '3px 5px 5px 5px' }}
                                                                class="btn btn-danger"
                                                                disabled={
                                                                    Loan.loanStatus === "Rejected" 
                                                                }
                                                                onClick={() => setStatus("Rejected", Loan._id)}
                                                            >Reject
                                                            </button>
                                                            <button
                                                                style={{ margin: '3px 5px 5px 5px', padding: '2px 0px' }}
                                                                className="btn btn-danger"
                                                                onClick={() => deleteRequest(Loan._id)}
                                                            ><DeleteRoundedIcon/></button>                                              
                                                </td>
                                                :
                                                <></>
                                                }
                                            </tr>
                                            ))} 
                                        </tbody>
                                    </table>
                                </div>
                </div>
            </div>
        </div>
    )
}

export default ViewLoans2