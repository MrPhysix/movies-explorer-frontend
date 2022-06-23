import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormValidator from '../../hooks/useFormValidator';
import Logo from '../../images/logo.svg';
import FormElement from '../FormElement/FormElement';
import FormElementInput from '../FormElement/FormElementInput/FormElementInput';
import './Register.css';
import { regEx } from '../../utils/consts';

function Register({ onSubmit }) {
  // const
  const {
    values, errors, isFormValid, handleChange, resetForm,
  } = useFormValidator();
  const { name, email, password } = values;
  // handlers
  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();
    console.log('onSBM');
    console.log(name);
    onSubmit(name, email, password);
  }, [name, email, password]);

  // effects
  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    console.log(name);
    console.log(email);
    console.log(password);
  }, [name, email, password]);

  return (
    <main className="register">
      <div className="register__wrapper">
        <Link to="/" className="register__logo_link">
          <img src={Logo} alt="logo" className="register__logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <FormElement
          isFormValid={isFormValid}
          onSubmit={handleSubmit}
          submitText="Зарегистрироваться"
          underText="Уже зарегистрированы?"
          linkToPath="/signin"
          underLinkText="Войти"
        >
          <FormElementInput
            name="name"
            labelText="Имя"
            errorText={errors.name}
            placeholderText="Например, Виталий"
            optionStyle={{ textTransform: 'capitalize' }}
            pattern={regEx.name}
            value={name}
            onChange={handleChange}
            minLength="2"
            maxLength="32"
          />
          <FormElementInput
            name="email"
            labelText="Email"
            errorText={errors.email}
            placeholderText="pochtavitaliya@yandex.ru"
            type="email"
            pattern={regEx.email}
            value={email}
            onChange={handleChange}
            minLength="4"
            maxLength="32"
          />
          <FormElementInput
            name="password"
            labelText="Пароль"
            errorText={errors.password}
            placeholderText="******"
            type="password"
            value={password}
            onChange={handleChange}
            minLength="4"
            maxLength="32"
          />
        </FormElement>
      </div>
    </main>
  );
}

export default Register;
