import { useContext, useState, useEffect, Fragment } from "react";
import useHttp from "../../hooks/use-http";

import Checkout from "./Checkout";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const { isLoading, error, sendRequest: sendOrderRequest } = useHttp();

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    sendOrderRequest({
      url: "https://app-6-movieapp-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      method: "POST",
      body: { user: userData, orderedItems: cartCtx.items },
      headers: {
        "Content-Type": "application/json"
      }
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const clearCartHandler = () => {
    cartCtx.clearCart();
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        >
          {item.name}
        </CartItem>
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button
        className={classes["button--alt"]}
        onClick={props.onHideCartHandler}
      >
        Close
      </button>
      {hasItems && (
        <button
          className={classes.button}
          onClick={orderHandler}
        >
          Order
        </button>
      )}
      {hasItems && <button className={classes.button} onClick={clearCartHandler}>Clear order</button>}
    </div>
  );

  const isSunbmitingModalContent = <p>Sending order data...</p>;

  const didSunbmitingModalContent = (
    <Fragment>
      <p>Successfully send the order!</p>
      <div className={classes.actions}>
      <button
        className={classes["button--alt"]}
        onClick={props.onHideCartHandler}
      >
        Close
      </button>
    </div>
    </Fragment>
  );

  const cartModalContent = (
    <Fragment>
      {" "}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={props.onHideCartHandler}
        />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  return (
    <Modal onHideCartHandler={props.onHideCartHandler}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSunbmitingModalContent}
      {!isSubmitting && didSubmit && didSunbmitingModalContent}
    </Modal>
  );
};

export default Cart;
