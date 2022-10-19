import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./ViewProdcuts.css";
import axios from "axios";
import { orange, red, blue, green } from "@material-ui/core/colors";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Category } from "@material-ui/icons";

function ViewProdcuts() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [category, setCategory] = useState([]);
  const categoryId = useParams();
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, [products]);
  
  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, [isAdmin]);


  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    if (localStorage.getItem("adminAuthToken")) {
      setIsAdmin(true);
    }
    
  }, [products]);

  async function getAllCategories() {
    axios
      .get(`http://localhost:8070/category/`)
      .then(({ data }) => {
        setCategory(data);
        
        for(let i=0; i<category.length; i++) {
          if (categoryId.id == category[i]._id) {
            setCategoryName(category[i].categoryname);
          }
        }
      })
      .catch((error) => {
        alert("Failed to fetch Category");
      });
  }

  async function getAllProducts() {
    axios
      .get(`http://localhost:8070/product/`)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => {
        alert("Failed to fetch Products");
      });
  }

  function view(id) {
    navigate(`/product/item/${id}`,{ state: { cname:categoryName} });
  }

  function addProduct() {
    navigate(`/products/add`);
  }

  function filterContent(data, searchTerm) {
    const result = data.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    setProducts(result);
  }
  function handleSearchAll(event) {
    const searchTerm = event.currentTarget.value;
    axios
      .get(`http://localhost:8070/product`)
      .then((res) => {
        filterContent(res.data, searchTerm.toLowerCase());
        
      })
      .catch((error) => {
        alert("Admin Failed to fetch products");
      });
  }

  const productListByCategory = products.filter(
    (product) => product.category === categoryId.id
  );

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-4">
          <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
            <h2 className="header_topic"> {categoryName} Products</h2>

            <div className="px-1 search" align="right">
            <input
                className="searchBox"
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                onChange={handleSearchAll}
                required
              />
        </div>
          </div>
        </div>
        <div className="col-3"></div>
        <div className="col-5">
          {isAdmin === true ? (
            <div className="px-3 search" align="right"></div>
          ) : (
            <div className="px-3 search" align="right"></div>
          )}
        </div>
      </div>
      <div className="productGrid">
        {isAdmin && (
          <Button
            className="mx-2 productBtn1"
            style={{ backgroundColor: orange[400], color: "white" }}
            onClick={() => addProduct()}
          >
            Add Product <AddIcon />
          </Button>
        )}
        {productListByCategory &&
          productListByCategory.map((Products, key) => (
            <div key={key}>
              <div className="productCard">
                <div className="imgBx">
                  <img
                    src={`${Products.imgUrl}`}
                    alt="product"
                    className="itemProduct"
                  />
                </div>
                <div className="p-3 text_data">
                  <h7>{Products.name}</h7>
                  <br />
                  <h7>{Products.price}</h7> <br />
                  <h7>{Products.description}</h7>
                  <div align="right">
                    <span>
                      &nbsp;&nbsp;&nbsp;
                      <button
                        className="productBtn"
                        style={{ backgroundColor: red[400] }}
                        onClick={() => view(Products._id)}
                      >
                        {" "}
                        View{" "}
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ViewProdcuts;
