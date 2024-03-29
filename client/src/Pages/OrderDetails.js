import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import moment from "moment";

const OrderDetails = () => {
  const navigate = useNavigate()
  const [order, setOrder] = useState("");
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState([]);
  const [newOrderStatus, setNewOrderStatus] = useState("");

  const { id } = useParams("");

 


  
  

  const cancelHandler = async () => {

    const token = localStorage.getItem("usersdatatoken");
    const res = await fetch(`/cancelorder/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
    });

    console.log(res);
    const data = await res.json();
    if (res.status !== 201) {
      alert("NO data availble");
    } else {
      orderDetail();
    }
  };
  const ReturnAndExchangeHandler = () => {
    console.log("return ");
    navigate(`/order/return&exchange/${id}`)
  };
  const orderDetail = async () => {
    const token = localStorage.getItem("usersdatatoken");
    const res = await fetch(`/order/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
    });

    console.log(res);
    const data = await res.json();
    if (res.status !== 201) {
      alert("NO data availble");
    } else {
      setOrder(data?.order);
      setProducts(data?.order?.products);
      setAddress(data?.order?.shipping_address);
    }
  };

  useEffect(() => {
    orderDetail();
    // cancelHandler();
  }, []);
  console.log(order);
  console.log(products);
  console.log(products[0]?.product[0]?.imgpath);
  console.log(address);

  return (
    <>
      <Header />

      <div className="breadcrumb-section breadcrumb-bg-color--golden">
        <div className="breadcrumb-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="breadcrumb-title">My Order</h3>
                <div className="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                  <nav aria-label="breadcrumb">
                    <ul>
                      <li>
                        <NavLink to={"/"}>Home</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/myaccount"}>Order</NavLink>
                      </li>

                      <li className="active" aria-current="page">
                        #{order._id}
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="wishlish-table-wrapper"
        data-aos="fade-up"
        data-aos-delay="0"
      >
        <div className="container">
          {order?.orderStatus == "processing" ||
          order?.orderStatus == "confirmed" ? (
            <>
              <div className="login_submit">
                <button
                  className="btn btn-md btn-black-default-hover mb-4"
                  type="submit"
                  onClick={cancelHandler}
                >
                  cancel
                </button>
              </div>
            </>
          ) : (
            ""
          )}
          {order?.orderStatus == "deliverd" ? (
            <>
              <div className="login_submit">
                <button
                  className="btn btn-md btn-black-default-hover mb-4"
                  type="submit"
                  onClick={ReturnAndExchangeHandler}
                >
                  Return & Exchange
                </button>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="row">
            <div className="col-12">
              <div className="table_desc">
                <div className="table_page table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th className="product_remove">Date</th>
                        <th className="product_thumb">Image</th>
                        <th className="product_name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product_stock">Status</th>
                        <th className="product_addcart">Total </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((item, index) => {
                        return (
                          
                            <tr key={index}>
                              <td class="product_remove">
                                <a href="#">
                                  {moment(order.orderDate).format("L")}{" "}
                                </a>
                              </td>
                              <td class="product_thumb">
                                <a>
                                  <img
                                    src={`/uploads/${item.product[0].imgpath}`}
                                    alt=""
                                  />
                                </a>
                              </td>
                              <td class="product_name">
                                <a href="product-details-default.html">
                                  {item.product[0].product_name}
                                </a>
                              </td>
                              <td class="product-price">
                                ₹{item.product[0].selling_price}.00 X{" "}
                                {item.quantity}
                                <del style={{ fontSize: "10px" }}>
                                  ₹{item?.product[0].actual_price}.00
                                </del>
                              </td>
                              <td class="product_stock">{order.orderStatus}</td>
                              <td class="product_addcart">
                                <a
                                  href="#"
                                  class="btn btn-md btn-golden"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalAddcart"
                                >
                                  {item.product[0].selling_price *
                                    item.quantity}{" "}
                                </a>
                              </td>
                            </tr>
                         
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="coupon_area">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div
                    className="coupon_code left"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <h3>Address </h3>
                    <div className="coupon_inner">
                      {/* <p>Enter your coupon code if you have one.</p>
                           <input className="mb-2" placeholder="Coupon code" type="text"/>
                           <button type="submit" className="btn btn-md btn-golden">Apply coupon</button> */}
                      {address.map((item,index) => {
                        return (
                          
                            <span class="plan-details" key={index}>
                              <span class="plan-type">Home</span>
                              <span class="plan-cost">
                                {item.fname}
                                <span class="slash"> </span>
                                <abbr class="plan-cycle" title="month">
                                  {item.lname}
                                </abbr>
                              </span>
                              <span>
                                {item.streetAddress},{item.landmark},{item.city}
                                ,{item.state},{item.pinocde}{" "}
                                <span class="slash"> -</span>
                                {item.pincode}
                              </span>
                              <span>{item.phone}</span>
                              <span>{item.email}</span>
                            </span>
                          
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* <SubTotal iteam={list}/> */}
                <div className="col-lg-6 col-md-6">
                  <div
                    className="coupon_code right"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <h3>Order Totals</h3>
                    <div className="coupon_inner">
                      <div className="cart_subtotal">
                        <p>Subtotal</p>
                        <p className="cart_amount">₹{order.totalPrice}.00</p>
                      </div>
                      <div className="cart_subtotal ">
                        {order.CoupanName === "" ? (
                          ""
                        ) : (
                          <>
                            <p>Coupan Discount</p>
                            <p className="cart_amount">
                              <span></span> - ₹
                              {Math.round(order.CoupanDiscountPrice)}
                            </p>
                          </>
                        )}
                      </div>
                      <div className="cart_subtotal ">
                        {order?.WalletBalance > 0 ? (
                          <>
                            <p>Balance Discount</p>
                            <p className="cart_amount">
                              <span></span> - ₹{order.WalletBalance}
                            </p>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="cart_subtotal ">
                        <p>Shipping</p>
                        <p className="cart_amount">
                          <span></span>+ ₹40.00
                        </p>
                      </div>
                      {/* <a href="#">Calculate shipping</a> */}

                      <div className="cart_subtotal">
                        <p>Total Amount</p>
                        <p className="cart_amount">
                          ₹{Math.round(order.totalPriceAfterDiscounts)}.00
                        </p>
                      </div>
                      {/* <div className="checkout_btn">
                               <NavLink to={"/cart/address"} className="btn btn-md btn-golden">Proceed to Checkout</NavLink>
                           </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 

       {
        products.map((item)=>{
            return(<>
                {item?.product[0]?.product_name}
            </>)
        })
       }
       {
        address.map((item)=>{
            return(<>
                {item?.lname}
            </>)
        })
    } */}
      <Footer />
    </>
  );
};

export default OrderDetails;
