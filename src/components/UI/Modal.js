import classes from './Modal.module.css';
import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return (
    <div
      className={classes.backdrop}
      onClick={props.onHideCartHandler}
    />
  );
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return(
    <Fragment>
    {ReactDOM.createPortal(
        <Backdrop onHideCartHandler={props.onHideCartHandler}/>,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
}

export default Modal;