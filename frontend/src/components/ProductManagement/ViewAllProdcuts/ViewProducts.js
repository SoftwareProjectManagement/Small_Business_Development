import React,{useEffect, useState} from 'react'
import { useNavigate,useLocation  } from 'react-router-dom'
import './ViewProdcuts.css'
import axios from 'axios'
import { orange,red,blue,green } from '@material-ui/core/colors';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

function ViewProdcuts() {
    const [isAdmin,setIsAdmin]= useState(false)
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState("");
  
    useEffect(() => { 
      if(localStorage.getItem("user")){
        setUser(JSON.parse(localStorage.getItem('user')))
      }
  
      if(localStorage.getItem("adminAuthToken")){
        setIsAdmin(true)
      }

      async function getAllProducts() {
        axios.get(`http://localhost:8070/product/`).then((res) => {
          setProducts(res.data)  
        }).catch((error) => {
          alert("Failed to fetch Category")
        })
      }
      getAllProducts();
      
    }, [location,isAdmin])
    
    
    function view(id){
      navigate(`/product/item/${id}`)
    }
    
    function addProduct(){
        navigate(`/products/add`)
    }
    return (
        <div className="container">
          <div className="row">
              <div className="col-4">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>Products</h2>
                </div>
              </div>
              <div className="col-3">
              </div>
              <div className="col-5">
              {isAdmin === true ?
                <div className="px-3 search" align="right">
                 
                </div>
                :
                <div className="px-3 search" align="right">
                 
                </div> 
              }  
          </div>
        </div>
        <div className="productGrid"  > 
          {isAdmin && 
            <Button  className="mx-2 productBtn" style={{backgroundColor:blue[400],color:'white'}} onClick={()=>addProduct()}>
            Add Product <AddIcon/>
            </Button>  
          }
          {products.map((Products,key)=>( 
                <div key={key}> 
                    <div className="productCard" >
                        <div className="imgBx">
                            <img  src={`${Products.imgUrl}`} alt="product" className="itemProduct"/>
                        </div>
                        <div className="p-3">
                            <h7>{Products.name}</h7>
                            <h7>{Products.category}</h7>
                            <h7>{Products.price}</h7>
                            <h7>{Products.description}</h7>
                           
                            <div align="right">
                              <span> 
                                  
                                  &nbsp;&nbsp;&nbsp;
                                  <button className="productBtn" style={{backgroundColor:red[400]}} onClick={()=>view(Products._id)}> View </button>
                              </span> 
                            </div>
                        </div>
                    </div>
                </div>
          ))} 
        </div>
      </div>
    )      
}

export default ViewProdcuts
