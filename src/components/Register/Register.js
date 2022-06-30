import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormValidator from '../../hooks/useFormValidator';
import Logo from '../../images/logo.svg';
import FormElement from '../FormElement/FormElement';
import FormElementInput from '../FormElement/FormElementInput/FormElementInput';
import Preloader from '../Preloader/Preloader';
import './Register.css';
import { regEx } from '../../utils/consts';

function Register({ onSubmit, isLoading }) {
  // const
  const {
    values, errors, isFormValid, handleChange, resetForm,
  } = useFormValidator();
  const { name, email, password } = values; // uncontrolled input warning
  // handlers
  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();
    onSubmit(name, email.toLowerCase(), password);
  }, [name, email, password]);

  // effects
  useEffect(() => {
    resetForm();
  }, []);

  return (
    <main className="register">
      {!isLoading ? (
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
              maxLength="30"
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
      ) : <Preloader />}
    </main>
  );
}

export default Register;
