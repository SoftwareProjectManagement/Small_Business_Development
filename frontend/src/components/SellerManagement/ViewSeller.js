import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router';
import { orange, red, blue, green } from '@material-ui/core/colors';
import './ViewSeller.css'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function ViewSeller() {

    const [isAdmin, setIsAdmin] = useState(false)
    const [sellers, setSellers] = useState([])
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

        async function getAllSellers() {
            axios.get(`http://localhost:8070/request`).then((res) => {
                setSellers(res.data)
            }).catch((error) => {
                alert("Failed to fetch the details")
            })
        }

        getAllSellers();
    }, [location, isAdmin])



    function filterContent(data, searchTerm) {
        const result = data.filter((sellers) =>
            sellers.name.toLowerCase().includes(searchTerm)
        )
        setSellers(result)
    }


    function handleSearchAll(event) {
        const searchTerm = event.currentTarget.value
        axios.get(`http://localhost:8070/request`).then((res) => {
            filterContent(res.data, searchTerm.toLowerCase())
        }).catch((error) => {
            alert("Failed to fetch the details")
        })
    }

    const setData = async (jstatus, id) => {

        const value = {
            jstatus,
        };

        await axios
            .put(`http://localhost:8070/request/${id}`, value)
            .then(() => {
                alert(`Request is ${jstatus}ed`);
                window.location.reload(false);
            })
            .catch((err) => {
                alert(`Something went wrong !!!`);
            });
    };

    function add(){
navigate("/add")
    }

    const setEvaluate = async (jstatus, id) => {

        const value = {
            jstatus,
        };

        await axios
            .put(`http://localhost:8070/request/${id}`, value)
            .then(() => {
                alert(`Request is ${jstatus}ed`);
                window.location.reload(false);
            })
            .catch((err) => {
                alert(`Something went wrong !!!`);
            });
    };


    function Pdf(proof) {
        window.open(proof);
    }

    async function deleteSeller(id) {
        await axios
          .delete(`http://localhost:8070/request/${id}`)
          .then(() => {
            alert("Request deleted successfully");
            window.location.reload(false);
          })
          .catch((error) => {
            alert(`Failed to delete the request\n${error.message}`);
          });
      }
      
      function generate(){
        navigate("/sellerR")
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
                {isAdmin == true?
                <div>
                <button style={{padding:"10px 15px",background:"orange",width:200,borderRadius:"10px",border:"2px solid white",fontWeight:500}} onClick={()=>generate()}>Genarate Report</button>
                </div>
                :
                <div></div>
}
            </div>

            <br />
            <div className="product"  >
                {sellers.map((Seller, key) => (
                    <div key={key}>
                        <div className="p-3" style={{ overflowX: 'auto', width: 1600,marginLeft:-100 }}>
                            <table  style={{ border: "2px solid black"}}>
                            <thead style={{height:70,background:"rgb(82, 82, 82)",color:"white"}}>
                                    <tr>
                                        <td>Full Name</td>
                                        <td>Address</td>
                                        <td>NIC Number</td>
                                        <td>Mobile</td>
                                        <td>E-mail</td>
                                        <td>Registration ID</td>
                                        <td>Certificate</td>
                                        <td>Status</td>
                                        <td>Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ width: 560 }}>{Seller.name}</td>
                                        <td style={{ width: 400 }}>{Seller.address}</td>
                                        <td style={{ width: 400 }}>{Seller.nic}</td>
                                        <td style={{ width: 400 }}>{Seller.mobile}</td>
                                        <td style={{ width: 400 }}>{Seller.email}</td>
                                        <td style={{ width: 500 }}>{Seller.reg}</td>
                                        
                                        <td style={{ width: 300 }}> <IconButton onClick={() => Pdf(`${Seller.proof}`)}>
                    <PictureAsPdfIcon style={{ color: red[500], backgroundPosition: 'center' }} ></PictureAsPdfIcon>
                  </IconButton></td>
                                        <td style={{ width: 450, color: blue[300] }}>{Seller.jstatus}</td>
                                        <div>
                                            {isAdmin === true ?
                                                <div style={{width:280}}>
                                                    <button
                                                        className="btn btn-success"
                                                        disabled={
                                                            Seller.jstatus === "Accepted" 
                                                        }
                                                        onClick={() => setData("Accepted", Seller._id)}
                                                    >
                                                        &nbsp;Approve
                                                    </button>

                                                    &nbsp;&nbsp;&nbsp;
                                                    <button
                                                        class="btn btn-info"
                                                        disabled={
                                                            Seller.jstatus === "Rejected" 
                                                        }
                                                        onClick={() => setEvaluate("Rejected", Seller._id)}
                                                    >
                                                        &nbsp;Reject
                                                    </button>

                                                    &nbsp;&nbsp;&nbsp;
                                                    <button style={{fontSize:15,fontWeight:"500",borderRadius:"50%",border:"none",backgroundColor:"red",width:40,height:40,color:"white"}}
                                                       
                                                        onClick={() => deleteSeller(Seller._id)}
                                                    >
                                                        &nbsp;X
                                                    </button>
                                                </div>
                                                :

                                                <div style={{width:180}}>
                                                    
                                                    <button
                                                        disabled={
                                                            Seller.jstatus === "In progress" ||
                                                            Seller.jstatus === "Rejected"
                                                        }
                                                        className="btn btn-warning ms-3"
                                                        onClick={() => add()}
                                                    >
                                                        &nbsp;Sell Products
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

export default ViewSeller