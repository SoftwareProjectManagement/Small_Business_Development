import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckRound from '@material-ui/icons/TripOrigin';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Input from '@material-ui/core/Input';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Button, IconButton } from '@material-ui/core';
import { orange} from '@material-ui/core/colors';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChoosePaymentModal from "../PaymentManagement/ChoosePaymentModal";
import Aos from "aos";
import "aos/dist/aos.css"
import './Cart.css';
import Swal from 'sweetalert2'

function Cart(props) {
    const [openModal, setOpenModal] = useState(false);
    const [items, setItems] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const navigate = useNavigate();
    let finalTotal = 0;

    const config = {
        headers: {
            "content-Type": "application/json",
            Authorization: `${localStorage.getItem("userAuthToken")}`
        }
    };
    Aos.init({duration:2000})

    useEffect(() => {   
        //Fetch Item 
        async function getData() {
            await axios.get(`http://localhost:8070/cart/6318dda9ca4f244a3964c401`,config).then((res) => {
                setItems(res.data.result) 
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Fetch Products!'
                });
            })
        }
        getData();        
    }, [props]);

    //Select all checkboxes
    const handleSelectAll = event => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(items.map(item => item._id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    //One checkbox
    function handleClick(event) {
        const id = event.currentTarget.id;
        const checked = event.currentTarget.checked;
        setIsCheck([...isCheck, id]);

        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };

    isCheck.map(productID => (                                              
        getTotal(productID)
    ))

    localStorage.setItem("selectedItem",JSON.stringify(isCheck))

    async function getTotal() {
        let iTotal
        await axios.get(`http://localhost:8070/cart/6318dda9ca4f244a3964c401`,config).then((res) => {
            iTotal = res.data.result.total 
            finalTotal = finalTotal + iTotal
            console.log(finalTotal);
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Failed to Fetch Calculated Value!'
            });
        })
        localStorage.setItem("total",finalTotal)
    }

    //Update Item
    async function updateQuantity(id,quantity,price) {
        
        try {
            await axios.put(`http://localhost:8070/cart/update/${id}`,{quantity,price},config)
            window.location.reload();
        } catch (error) {            
            if(error.response.status === 401){
                Swal.fire({
                    icon: 'error',
                    title: 'Authentication failed. Please Sign In again'
                });
                navigate('/user/signin')
                } 
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Update failed'
                });
            }
        }       
    }

    //Delete Item
    async function deleteItem(id){        
        await axios.delete(`http://localhost:8070/cart/delete/${id}`, config).then(() => {
            Swal.fire({
                icon: 'error',
                title: 'Product deleted successfully'
            });
            setItems(items.filter(element => element._id !== id))
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Failed to delete the item\n${error.message}'
            });
        }) 
    } 

    //Increment Quantity
    function increment(id,Price) {
        items.forEach(Item => {
            if(Item._id === id){
                if(Item.quantity<10){
                    Item.quantity++
                    updateQuantity(Item._id,Item.quantity,Price)
                }
            }
        })       
    }

    //Decrease Item
    function decrease(id,Price) {
        items.forEach(Item => {
            if(Item._id === id){
                if(Item.quantity>1){
                    Item.quantity--
                    updateQuantity(Item._id,Item.quantity,Price)
                }
            }
        })       
    }

    function pay() {
        setOpenModal(true);
    }

    return(
        <div>
            {openModal && <ChoosePaymentModal setOpenModal={setOpenModal} />}

            <div className="cartContainer">
            
            <div className="cartHeader">
                <h3>Shopping Cart</h3>
            </div>

            <div className="cartDetailsHeader">
                
            </div>

            {/* <div className="row">
                    <div className="col-12"> <br/>
                    select all check box
                        <FormControlLabel
                            control={<Checkbox icon={<CheckRound/>}
                            checkedIcon={<CheckCircleIcon style={{color:orange[600]}}/>}
                            id="selectAll" 
                            name="checkedH" />}
                            onChange={handleSelectAll}
                            checked={isCheckAll}
                            label="Select All"
                        />            
                    </div>                    
                </div> */}

            <div className="row">
                    <div className="col-xl-8"data-aos="slide-up">
                        {/* map */}
                        {items.map((Item, key) => ( 
                            <div key={key} >                                
                                <div className="cart-box mb-3 shadow">                        
                                    <div className="row align-items-center ">
                                        <div className="col-sm-1">
                                            {/* Check box for item */}
                                            <FormControlLabel                                                    
                                                checked={isCheck.includes(Item._id)}
                                                control={
                                                    <Checkbox icon={<CheckRound />} 
                                                        checkedIcon={<CheckCircleIcon style={{color:orange[600]}}/>}  name="checkedH" 
                                                        id = {Item._id}
                                                        onChange={handleClick}
                                                    />
                                                }
                                            />
                                        </div>
                                        {/* Product Image */}
                                        <div className="col-sm-2">
                                            <div ><img className="product-Img" src={Item.itemid.imgUrl} alt="product"></img></div>
                                        </div>
                                        {/* Product Name and description */}
                                        <div className="col-sm-4">                                                
                                            <h4><b>{Item.itemid.name}</b></h4>
                                            <p className="textShort mb-1">Rs.&nbsp;{Item.itemid.price}.00</p>   
                                            <Link className="linkColor" to={`/product/item/${Item.itemid._id}`}>Show more</Link>
                                        </div>
                                        <div className="col-sm-2">
                                            <div>
                                                {/* Quantity decrease button */}
                                                <IconButton onClick={()=>decrease(Item._id,Item.itemid.price)}>
                                                    <RemoveCircleIcon style={{color: "black"}}></RemoveCircleIcon>
                                                </IconButton>

                                                {/* Quantity */}
                                                <Input type="text" name="quantity" className="quantity" disableUnderline margin="dense" readOnly value={(Item.quantity)}/>
                                                
                                                {/* Quantity decrease button */}
                                                <IconButton onClick={()=>increment(Item._id,Item.itemid.price)}>
                                                    <AddCircleIcon style={{color: "black"}}></AddCircleIcon>
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div className="col-sm-2 textShort">
                                            Rs.&nbsp;{Item.total}.00
                                            {}
                                        </div>
                                        <div className="col-sm-1">
                                            <IconButton onClick={()=>deleteItem(Item._id)}>
                                                <DeleteIcon fontSize="large" style={{ color:orange[900] }}></DeleteIcon>
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Order Summary Card */}
                    <div className="col-xl-4" >
                        <div className="cardSummary shadow">
                            <h5>Order Summary</h5>
                                <br/>
                                <div className="row">
                                    {/* Address */}
                                    <div className="col-xl-12 mb-3">
                                        <h6>Address:</h6>
                                        <OutlinedInput  
                                            type="text" id="lastname" placeholder="Address" 
                                            required fullWidth
                                            // value={user.address}
                                        />                                   
                                    </div>
                                    <hr/>                                                                  
                                    {/* Pay Button */}
                                    <Button variant="contained" style={{ backgroundColor: orange[900],color: 'white'}} onClick={pay}>
                                    <b>Go to Payment</b>
                                    </Button>
                                </div>                                
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;