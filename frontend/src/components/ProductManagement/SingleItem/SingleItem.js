import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SingleItem.css";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Swal from "sweetalert2";
import ChoosePaymentModal from "../../PaymentManagement/ChoosePaymentModal";
import { AddToCart } from "../../../Utils/CartUtils";

function SingleItem(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [product, setProduct] = useState();
  const productId = useParams();
  console.log(productId);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    if (localStorage.getItem("adminAuthToken")) {
      setIsAdmin(true);
    }

    async function getProductDetails() {
      axios
        .get(`http://localhost:8070/product/item/${productId.id}`)
        .then((res) => {
          setId(res.data.product._id);
          setName(res.data.product.name);
          setCategory(res.data.product.category);
          setPrice(res.data.product.price);
          setDescription(res.data.product.description);
          setImgUrl(res.data.product.imgUrl);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Failed to Fetch Products!",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(`/cart`);
            } else {
              navigate(`/cart`);
            }
          });
        });
    }
    getProductDetails();
  }, [props]);

  function view(id) {
    navigate(`/product/item/${id}`);
  }

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="Maincontainer">
      <div className="Headercontainer">
        <h5>
          Products {">"} {category} {">"} {name}
        </h5>
        <button>Back</button>
      </div>
      <div className="Productcontainer">
        <div className="imageContainer">
          <img src={`${imgUrl}`} alt="productImg" />
        </div>
        <div className="DescriptionContainer">
          <h2>
            {name}
            <hr />
          </h2>
          <div className="StarContainer">
            <span className="checked">
              <StarIcon />
            </span>
            <span className="checked">
              <StarIcon />
            </span>
            <span className="checked">
              <StarIcon />
            </span>
            <span className="checked">
              <StarIcon />
            </span>
            <span className="">
              <StarIcon />
            </span>
          </div>
          <h4>
            <span className="bold">Category :</span> {category}
          </h4>
          <h5>
            <span className="bold">Price :</span> Rs.{price}.00
          </h5>
          <h5>
            <span className="bold">Description :</span> {description}
          </h5>
        </div>
        <div className="ButtonContainer">
          <button onClick={() => AddToCart(id, user._id, category, price)}>
            Add To Cart <ShoppingCartIcon />
          </button>

          <button
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Buy Now <ShoppingBagIcon />
          </button>
        </div>
      </div>
      <div className="RelatedProductcontainer">
        <h5>
          Related Products
          <hr />
        </h5>
        <div className="relatedItemContainer">
          <div className="blabla">
            <div className="RelatedimageContainer">
              <img
                src={`https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fae01.alicdn.com%2Fkf%2FUTB8eRp.XHnJXKJkSahGq6xhzFXaI%2FPortable-Linen-Cotton-Polka-Dot-Drawstring-Insulated-Food-Lunch-Box-Bag-Gift.jpg&f=1&nofb=1`}
                alt="productImg"
              />
            </div>
            <div className="RelatedDescriptionContainer">
              <h2>Box Bag</h2>
              <h5>Price : Rs.750.00</h5>
            </div>
          </div>

          <div className="blabla">
            <div className="RelatedimageContainer">
              <img
                src={`https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0092%2F4781%2F7813%2Fproducts%2Fimage_531721ae-2342-4d41-90ed-620c6e09414f_1024x1024.jpg%3Fv%3D1610239958&f=1&nofb=1`}
                alt="productImg"
              />
            </div>
            <div className="RelatedDescriptionContainer">
              <h2>Side Bag</h2>
              <h5>Price : Rs.450.00</h5>
            </div>
          </div>

          <div className="blabla">
            <div className="RelatedimageContainer">
              <img
                src={`https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.etsystatic.com%2F5717530%2Fr%2Fil%2F1c107c%2F2879144467%2Fil_fullxfull.2879144467_4934.jpg&f=1&nofb=1`}
                alt="productImg"
              />
            </div>
            <div className="RelatedDescriptionContainer">
              <h2>Ladies Bag</h2>
              <h5>Price : Rs.950.00</h5>
            </div>
          </div>

          <div className="blabla">
            <div className="RelatedimageContainer">
              <img src={`${imgUrl}`} alt="productImg" />
            </div>
            <div className="RelatedDescriptionContainer">
              <h2>{name}</h2>
              <h5>Price : Rs.{price}.00</h5>
            </div>
          </div>
        </div>
      </div>
      {openModal && <ChoosePaymentModal setOpenModal={setOpenModal} />}
    </div>
  );
}

export default SingleItem;
