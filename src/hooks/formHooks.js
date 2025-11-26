// src/hooks/formHooks.js
import { useState } from "react";

// Yleiskäyttöinen lomakehooki
export default function useForm(callback, initState) {
  const [inputs, setInputs] = useState(initState);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    // kutsutaan komponentista annettua funktiota
    callback();
  };

  const handleInputChange = (event) => {
    event.persist();
    console.log(event.target.name, event.target.value);
    setInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    inputs,
    handleInputChange,
    handleSubmit,
  };
}
