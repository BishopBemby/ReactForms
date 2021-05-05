import { useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

const reducerHandler = (state, action) => {
  if (action.type === "VALUE_CHANGE") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "VALUE_BLUR") {
    return {
      isTouched: true,
      value: state.value,
    };
  }
  if (action.type === "RESET") {
    return {
      value: "",
      isTouched: false,
    };
  }
  return initialState;
};

const useInput = (validateValue) => {
  const [state, dispatch] = useReducer(reducerHandler, initialState);

  const valueIsValid = validateValue(state.value);
  const hasError = !valueIsValid && state.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "VALUE_CHANGE", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "VALUE_BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: state.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
