import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [bthHighlight, setBthHighlight] = useState(false);
  const cartCtx = useContext(CartContext);

  const {items} = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${bthHighlight ? classes.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBthHighlight(true);
    const timer = setTimeout(() => {setBthHighlight(false)},300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button
      className={btnClasses}
      onClick={props.onClick}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.badge}>Your </span>
      <span>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
