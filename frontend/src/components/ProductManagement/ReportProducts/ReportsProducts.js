import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { green } from "@material-ui/core/colors";
import "./ReportsProducts.css";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button } from "@material-ui/core";
// import FileDownloadIcon from '@mui/icons-material/FileDownload';

function ReportsProducts(p) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [category, setCategory] = useState([]);

  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if(products.length > 0) {
      getAllCategories();
    }
  }, [products]);

  async function getAllProducts() {
    axios
      .get(`http://localhost:8070/product`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        alert("Failed to fetch all products");
      });
  }

  async function getAllCategories() {
    axios
      .get(`http://localhost:8070/category/`)
      .then(({ data }) => {
        setCategory(data);
      })
      .catch((error) => {
      });
  }

  useEffect(() => {
    if(category.length > 0) {
      //console.log(products);
      for (let j = 0; j < products?.length; j++) {
        for (let i = 0; i < category?.length; i++) {
          if (products[j]?.category == category[i]._id) {
            console.log(category[i].categoryname);
            //products.forEach(p => p.categoryname = category[i].categoryname);
            products[j] = {...products[j],'categoryname':category[i].categoryname}
          }
        }
      }
      console.log(products);
    }
  }, [category]);


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div ref={componentRef}>
            <div className="container" align="center">
              <div className="box-single-product">
                <div className="row">
                  <div className="col-xl-2" align="center">
                    <img src="/images/Logo.png" width="100px" alt="logo" />
                  </div>
                  <div className="col-xl-8" align="center">
                    <h3>CEYLON CAPITAL CORP</h3>
                    <h6>Digitally Generated Product Details Report</h6>
                  </div>
                  <div className="col-xl-2" align="right">
                    <p>
                      {date}/{month}/{year}
                    </p>
                  </div>
                </div>
                <hr />
                <br />
                <div className="product px-6">
                  <div className="col-4">
                    <div className="pb-2 px-8 d-flex flex-wrap align-items-center justify-content-between">
                      <h3 style={{ textAlign: "center" }}> All Products </h3>
                    </div>
                  </div>
                  <div className="col-3"></div>
                </div>
                <div className="blue-table ">
                  <div className="blue-table, box-view-product">
                    <table>
                      <thead className="table-head-colour">
                        <tr className="table-head-colour">
                          <th
                            className="table-head-colour"
                            style={{ textAlign: "center" }}
                          >
                            Product Name
                          </th>
                          <th
                            className="table-head-colour"
                            style={{ textAlign: "center" }}
                          >
                            Details
                          </th>
                          <th
                            className="table-head-colour"
                            style={{ textAlign: "center" }}
                          >
                            Price
                          </th>
                          <th
                            className="table-head-colour"
                            style={{ textAlign: "center" }}
                          >
                            Category
                          </th>
                        </tr>
                      </thead>
                      <tbody style={{ textAlign: "center" }}>
                        {products.map((Product, key) => (
                          <tr key={key}>
                            <td width="10px">{Product.name}</td>
                            <td style={{ textAlign: "center" }} width="800px">
                              {Product.description}
                            </td>
                            <td width="30px">Rs.{Product.price}.00</td>
                            <td width="280px">{Product.categoryname}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mt-5" align="right"></div>
              </div>
            </div>
          </div>
          <center>
            <div className="w-25 p-3" align="center">
              <Button
                className="print__button"
                variant="contained"
                endIcon={<GetAppIcon />}
                style={{ backgroundColor: green[700], color: "white" }}
                disableElevation
                onClick={handlePrint}
                fullWidth
              >
                Print Details
              </Button>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}

export default ReportsProducts;
