import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmaiInput
  } = useInput((value) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return (value.match(emailRegex) ? true : false) && value.trim() !== "";
  });

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
    reset: resetStreetInput
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeInputBlurHandler,
    reset: resetPostalCodeInput
  } = useInput((value) => value.trim() !== "" && value.trim().length === 5);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
    reset: resetCityInput
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredStreetIsValid &&
    enteredPostalCodeIsValid &&
    enteredCityIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      email: enteredEmail,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode
    });
    resetNameInput();
    resetEmaiInput();
    resetStreetInput();
    resetPostalCodeInput();
    resetCityInput();
  };

  const nameInputClasses = nameInputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const emailInputClasses = emailInputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const postalCodeInputClasses = postalCodeInputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const streetInputClasses = streetInputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const cityInputClasses = cityInputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  return (
    <form
      className={classes.form}
      onSubmit={confirmHandler}
    >
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputHasError && (
          <p className="error-text">Name field must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputHasError && <p className="error-text">Invalid e-mail</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetInputBlurHandler}
        />
        {streetInputHasError && (
          <p className="error-text">Street field must not be empty</p>
        )}
      </div>
      <div className={postalCodeInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeInputBlurHandler}
        />
        {postalCodeInputHasError && (
          <p className="error-text">
            Postal code must not be empty and must have length 5 symbols
          </p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityInputBlurHandler}
        />
        {cityInputHasError && (
          <p className="error-text">City field must not be empty</p>
        )}
      </div>
      <div className={classes.actions}>
        <button
          type="button"
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
