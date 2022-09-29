import axios from "axios";
import Swal from 'sweetalert2'

export const AddToCart = (itemID,id,category,Price) => {

    const itemid = itemID
    const userID = id
    const quantity = 1
    const type = category
    const price = Price
    let total = quantity*price;

    const cartItem = {itemid, userID, quantity, type, price, total}
    const config = {
        headers: {
            "content-Type": "application/json",
            Authorization: `${localStorage.getItem("userAuthToken")}`
        }
    };

    axios.post("http://localhost:8070/cart/add", cartItem , config).then((res)=>{
        Swal.fire({
            icon: 'success',
            title: 'Product Added To The Cart',
          });
    }).catch((error)=>{         
        if(error.response.status === 409){
            Swal.fire({
                icon: 'error',
                title: 'Product already exists in your cart'
              });
         }else if(error.response.status === 401){
            Swal.fire({
                icon: 'error',
                title: 'Please Login'
              });
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Product cant be Added !'
              });     
        }        
    })
}