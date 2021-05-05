import useInput from "../hooks/useInput";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: inputIsValid,
    hasError: hasNameError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: hasEmailError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail
  } = useInput((value) => value.includes("@"));

  // const [inputIsValid, setInputIsValid] = useState(false); // at the beginning this is not ideal, and if useEffect hook is used where http request is there, it will be called even if the name is not added. thus touched state is used

  let formIsValid = false;

  if (inputIsValid && emailIsValid) {
    formIsValid = true;
  }

  const onSubmitForm = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    // nameRef.current.value = ''; // not ideal to use so userefs are not good for resetting the input back to null.
    resetName();
    resetEmail();
  };

  const nameInputClasses = hasNameError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = hasEmailError
    ? "form-control invalid"
    : "form-control";


  return (
    <form onSubmit={onSubmitForm}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onBlur={nameBlurHandler}
          onChange={nameChangeHandler}
        />
        {hasNameError && <p className="error-text">Add a name</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
        />
        {hasEmailError && <p className="error-text">Add an E-mail</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
