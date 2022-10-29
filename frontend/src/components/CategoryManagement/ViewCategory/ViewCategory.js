import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ViewCategory.css";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";
import PrintIcon from "@mui/icons-material/Print";

function ViewCategory() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    if (localStorage.getItem("adminAuthToken")) {
      setIsAdmin(true);
    }

    async function getAllCategory() {
      axios
        .get(`http://localhost:8070/category/`)
        .then((res) => {
          setCategory(res.data);
        })
        .catch((error) => {
          alert("Failed to fetch Category");
        });
    }
    getAllCategory();
  }, [location, isAdmin]);

  function view(id) {
    navigate(`/products/view/${id}`);
  }

  function addProduct() {
    navigate(`/category/add`);
  }

  function printProduct() {
    navigate(`/products/reports`);
  }

  function filterContent(data, searchTerm) {
    const result = data.filter((category) =>
      category.categoryname.toLowerCase().includes(searchTerm)
    );
    setCategory(result);
  }
  function handleSearchAll(event) {
    const searchTerm = event.currentTarget.value;
    axios
      .get(`http://localhost:8070/category`)
      .then((res) => {
        filterContent(res.data, searchTerm.toLowerCase());
      })
      .catch((error) => {
        alert("Admin Failed to fetch products");
      });
  }

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-4">
          <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
            <h2 className="header_topic">Product Category</h2>

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
        <br />
        <br />
        <br />
        <br />
        {isAdmin && (
        <Button className="printbtn" onClick={() => printProduct()}>
          Print All Prodcuts &nbsp;&nbsp;&nbsp;&nbsp;
          <PrintIcon />
        </Button>
             )}
        <br />

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
            style={{ color: "white" }}
            onClick={() => addProduct()}
          >
            Add Category <AddIcon />
          </Button>
        )}
        {category.map((Category, key) => (
          <div key={key}>
            <div className="productCard">
              <div className="imgBx">
                <img
                  src={`${Category.imgUrl}`}
                  alt="product"
                  className="itemProduct"
                />
              </div>
              <div className="p-3">
                <h7 className="category_name">{Category.categoryname}</h7>

                <div align="right">
                  <span>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      className="productBtn"
                      onClick={() => view(Category._id)}
                    >
                      {" "}
                      View Products{" "}
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
      <br />
    </div>
  );
}

export default ViewCategory;
