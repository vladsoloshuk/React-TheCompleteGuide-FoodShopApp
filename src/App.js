import "./App.css";
import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = (event) => {
    event.preventDefault();
    setCartIsShown(true);
  }

  const hideCartHandler = (event) => {
    event.preventDefault();
    setCartIsShown(false);
  }

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart onHideCartHandler={hideCartHandler}></Cart>
      )}
      <Header onShowCartHandler={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
