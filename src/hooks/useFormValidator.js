import React, { useCallback } from 'react';

function useFormValidator() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isFormValid, setIsValid] = React.useState(false);

  const handleChange = (evt) => {
    const { target } = evt;
    const { name } = target;
    const { value } = target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback((
    newValues = {},
    newErrors = {},
    newIsValid = false,
  ) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return {
    values, setValues, errors, isFormValid, handleChange, resetForm,
  };
}

export default useFormValidator;
