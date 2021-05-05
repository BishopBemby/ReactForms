import useInput from "../hooks/useInput";

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: firstInputIsValid,
    hasError: hasFirstNameError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredLastName,
    isValid: lastInputIsValid,
    hasError: hasLastNameError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: hasEmailError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));

  const firstNameInputClasses = hasFirstNameError
  ? "form-control invalid"
  : "form-control";

  const lastNameInputClasses = hasLastNameError
  ? "form-control invalid"
  : "form-control";

const emailInputClasses = hasEmailError
  ? "form-control invalid"
  : "form-control";

  let formIsValid = false;

  if (firstInputIsValid && lastInputIsValid && emailIsValid) {
    formIsValid = true;
  }

  const onSubmitForm = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    // nameRef.current.value = ''; // not ideal to use so userefs are not good for resetting the input back to null.
    resetFirstName();
    resetLastName();
    resetEmail();
  };
  return (
    <form onSubmit={onSubmitForm}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={enteredFirstName}
            onBlur={firstNameBlurHandler}
            onChange={firstNameChangeHandler}
          />
          {hasFirstNameError && <p className="error-text">Add a first name</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={enteredLastName}
            onBlur={lastNameBlurHandler}
            onChange={lastNameChangeHandler}
          />
          {hasLastNameError && <p className="error-text">Add a last name</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={enteredEmail}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
        />
        {hasEmailError && <p className="error-text">Enter a valid email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
