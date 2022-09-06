import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './SingleItem.css'
import axios from 'axios'
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Swal from 'sweetalert2'
import ChoosePaymentModal from "../../PaymentManagement/ChoosePaymentModal"
import {AddToCart} from '../../../Utils/CartUtils'

function SingleItem(props) {
    const [isAdmin,setIsAdmin]=useState(false)
    const[id,setId]=useState("");
    const[name,setName]=useState("");
    const[category,setCategory]=useState("");
    const[price,setPrice]=useState("");
    const[description,setDescription]=useState("");
    const[imgUrl,setImgUrl]=useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState("");

    useEffect(() => {

        if(localStorage.getItem("user")){
            setUser(JSON.parse(localStorage.getItem('user')))
        }
        
        if(localStorage.getItem("adminAuthToken")){
            setIsAdmin(true)
        }

      async function getProductDetails() {
        axios.get(`http://localhost:8070/product/item/631446670e647d4bbc460185`).then((res) => {
          setId(res.data.product._id)  
          setName(res.data.product.name)
          setCategory(res.data.product.category)
          setPrice(res.data.product.price)
          setDescription(res.data.product.description)   
          setImgUrl(res.data.product.imgUrl)
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Failed to Fetch Products!'
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate(`/cart`)
                }else{
                    navigate(`/cart`)
                }
              });
        })
      }
      getProductDetails();

    }, [props])
    
    function view(id){
        navigate(`/product/item/${id}`)
    }

    const [openModal, setOpenModal] = useState(false);
    
   
    return (
        <div className="Maincontainer">
            <div className="Headercontainer">
                <h5>Products {'>'} {category} {'>'} {name}</h5>
                <button>Back</button>
            </div>
            <div className="Productcontainer">
                <div className='imageContainer'>
                    <img src={`${imgUrl}`} alt="productImg" />
                </div>
                <div className='DescriptionContainer'>
                    <h2>{name}<hr /></h2>
                    <div className='StarContainer'>
                        <span className="checked"><StarIcon /></span>
                        <span className="checked"><StarIcon /></span>
                        <span className="checked"><StarIcon /></span>
                        <span className="checked"><StarIcon /></span>
                        <span className=""><StarIcon /></span>
                    </div>
                    <h4><span className="bold">Category :</span> {' '}{' '} {category}</h4>
                    <h5><span className="bold">Price :</span> {' '}{' '} Rs.{price}.00</h5>
                    <h5><span className="bold">Description :</span> {' '}{' '} {description}</h5>
                </div>
                <div className='ButtonContainer'>
                    <button onClick={()=>AddToCart(id, user._id, category, price)}>
                        Add To Cart <ShoppingCartIcon />
                    </button>

                    <button onClick={() => {setOpenModal(true);}}>
                        Buy Now <ShoppingBagIcon />
                    </button>
                </div>
            </div>
            <div className="RelatedProductcontainer">
                <h5>Related Products<hr /></h5>
                <div className='relatedItemContainer'>
                    <div className='blabla'>
                        <div className='RelatedimageContainer'>
                            <img src={`${imgUrl}`} alt="productImg" />
                        </div>
                        <div className='RelatedDescriptionContainer'>
                            <h2>{name}</h2>
                            <h5>Price : {' '}{' '} Rs.{price}.00</h5>
                        </div>
                    </div>

                    <div className='blabla'>
                        <div className='RelatedimageContainer'>
                            <img src={`${imgUrl}`} alt="productImg" />
                        </div>
                        <div className='RelatedDescriptionContainer'>
                            <h2>{name}</h2>
                            <h5>Price : {' '}{' '} Rs.{price}.00</h5>
                        </div>
                    </div>

                    <div className='blabla'>
                        <div className='RelatedimageContainer'>
                            <img src={`${imgUrl}`} alt="productImg" />
                        </div>
                        <div className='RelatedDescriptionContainer'>
                            <h2>{name}</h2>
                            <h5>Price : {' '}{' '} Rs.{price}.00</h5>
                        </div>
                    </div>

                    <div className='blabla'>
                        <div className='RelatedimageContainer'>
                            <img src={`${imgUrl}`} alt="productImg" />
                        </div>
                        <div className='RelatedDescriptionContainer'>
                            <h2>{name}</h2>
                            <h5>Price : {' '}{' '} Rs.{price}.00</h5>
                        </div>
                    </div>
                    
                </div>
            </div>
            {openModal && <ChoosePaymentModal setOpenModal={setOpenModal} />}
        </div>         
    )
}

export default SingleItem;