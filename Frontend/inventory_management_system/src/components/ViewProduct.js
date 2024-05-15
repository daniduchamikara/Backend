import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';


import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";


export default function InsertProduct() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState();
    const [productBarcode, setProductBarcode] = useState();
    const [productQty, setProductQty] = useState();
    const [ReorderLevel, setReOrderLvl] = useState();
    const [purchaseDate, setPurchaseDate] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate("");

    const setName = (e) => {
        setProductName(e.target.value);
    };

    const setPrice = (e) => {
        setProductPrice(e.target.value);
    };

    const setBarcode = (e) => {
        const value = e.target.value.slice(0, 12);
        setProductBarcode(value);
    };
    const setOrderLvl = (e) => {
        setReOrderLvl(e.target.value);
    }
    const setDate = (e) => {
        setPurchaseDate(e.target.value);
    };

    const setQty = (e) => {
        setProductQty(e.target.value);
    }

    const {id} = useParams("");

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await fetch(`http://localhost:3001/products/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = await res.json();

                if (res.status === 201) {
                    console.log("Data Retrieved.");
                    setProductName(data.ProductName);
                    setReOrderLvl(data.ReorderLevel);
                    setProductPrice(data.ProductPrice);
                    setProductBarcode(data.ProductBarcode);
                    setProductQty(data.ProductQty);
                    setPurchaseDate(data.PurchaseDate);

                    if (data.ProductQty<=data.ReorderLevel){
                        Swal.fire({
                            title: "Reorder",
                            text: "Initiate The Re-Ordering Process Re-Order Level Achieved",
                            icon: "warning "
                        });
                    }
                } else {
                    console.log("Something went wrong. Please try again.");
                }
            } catch (err) {
                console.log(err);
            }
        };

        getProduct();
    }, [id]);

    const updateProduct = async (e) => {
        e.preventDefault();

        if (!productName || !productPrice || !productBarcode || !productQty) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:3001/updateproduct/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "ProductName": productName, "ProductPrice": productPrice, "ProductBarcode": productBarcode, "ProductQty": productQty,
                    "PurchaseDate": purchaseDate, "ReOrderLevel": ReorderLevel })
            });

            await response.json();

            if (response.status === 201) {
                alert("Data Updated");
                navigate('/products');
            }
            else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className='container-fluid p-5'>
            <h1 className=''>View Product Information</h1>
            <div className="mt-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="product_name" className="form-label fs-4 fw-bold">Product Name</label>
                <input type="text" onChange={setName} value={productName} className="form-control fs-5" id="product_name" placeholder="Enter Product Name" disabled />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="product_price" className="form-label fs-4 fw-bold">Product Price</label>
                <input type="number" onChange={setPrice} value={productPrice} className="form-control fs-5" id="product_price" placeholder="Enter Product Price" disabled />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="product_quantity" className="form-label fw-bold">Product Quantity</label>
                <input type="number" onChange={setQty} value={productQty} className="form-control fs-5" id="product_qty" placeholder="Enter Product Quantity" disabled />
            </div>
            <div  className="mt-3 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="product_detail" className="form-label fw-bold">Product Purchase Date</label>
                <input type="number" onChange={setDate} value={purchaseDate} className="form-control fs-5" id="product_PD" placeholder="Enter Product Quantity" disabled />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="product_quantity" className="form-label fw-bold">Product Re-Order Level</label>
                <input type="number" onChange={setOrderLvl} value={ReorderLevel} className="form-control fs-5" id="product_qty" placeholder="Enter Re Order Level" disabled />
            </div>
            <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="product_barcode" className="form-label fs-4 fw-bold">Product Barcode</label>
                <input type="number" onChange={setBarcode} value={productBarcode} maxLength={12} className="form-control fs-5" id="product_barcode" placeholder="Enter Product Barcode" disabled />
            </div>

            <div className="col text-center col-lg-6 ">
                {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
            </div>
        </div>
    )
}
