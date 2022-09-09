import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import { orange, red, blue, green } from '@material-ui/core/colors';
import './ViewSubmissions.css'
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function ViewSubmissions() {

  const [document, setDocuments] = useState([])
  const history = useHistory()
  const location = useLocation()
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }

    async function getAllDocuments() {
      axios.get(`http://localhost:8070/tdoc`).then((res) => {
        setDocuments(res.data)
      }).catch((error) => {
        alert("Failed to fetch document")
      })
    }

    getAllDocuments();
  }, [location])



  function filterContent(data, searchTerm) {
    const result = data.filter((product) =>
      product.group.toLowerCase().includes(searchTerm)
    )
    setDocuments(result)
  }


  function handleSearchAll(event) {
    const searchTerm = event.currentTarget.value
    axios.get(`http://localhost:8070/tdoc`).then((res) => {
      filterContent(res.data, searchTerm.toLowerCase())
    }).catch((error) => {
      alert("Failed to fetch documents")
    })
  }

  function view(id) {
    history.push(`/tdocView/${id}`)
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
          <div className="px-3 search" align="right" style={{top:'40px',position:'relative',right:'460px'}}>
            <input style={{color:"black",fontWeight:"500",borderRadius:"8px",border:"2px solid grey",padding:'6px 123px'}}
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              onChange={handleSearchAll}
              required
            /><div style={{position:'relative',right:'510px',top:'-35px'}}><SearchIcon/></div>
          </div>
        </div>
      </div>
<br/><br/><br/>
      {/* <span>
        <button className="productBtn" style={{ backgroundColor: orange[400],fontSize:'18px',padding:'7px 30px' ,borderRadius:'10px',border:'2px solid orange',position:'relative',top:'-28px',left:'1100px'}} onClick={() => add()}><AddIcon/> Add New</button>
      </span> */}
      <div className="productGrid"  >
        {document.map((Document, key) => (
          <div key={key}>
              <div className="p-3" style={{overflowX:'auto'}}>
                <table>
                  <tbody>
                  <tr>
                <td style={{width:600}}>{Document.topic}</td>
                <td style={{width:260}}>{Document.group}</td>
                <td style={{width:300}}>{Document.leader}</td>
               
                <td style={{width:120}}>

                  <IconButton>
                    <PictureAsPdfIcon style={{ color: red[500], backgroundPosition: 'center' }} ></PictureAsPdfIcon>
                  </IconButton>
                </td>
<td>
                  <span>
                    <MoreHorizIcon style={{ color: orange[900] ,cursor:'pointer'}} onClick={() => view(Document._id)}/>
                  </span>
                  </td>
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

export default ViewSubmissions
