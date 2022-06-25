import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import FormElement from '../FormElement/FormElement';
import FormElementInput from '../FormElement/FormElementInput/FormElementInput';
import './Login.css';
import useFormValidator from '../../hooks/useFormValidator';
import { regEx } from '../../utils/consts';
import Preloader from '../Preloader/Preloader';

// test@test.ru : test@test.ru

function Login({ onSubmit, isLoading }) {
  // const
  const {
    values, errors, isFormValid, handleChange, resetForm,
  } = useFormValidator();
  const { email, password } = values; // uncontrolled input warning
  // handlers
  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();
    console.log('handle');
    console.log(email, password);
    onSubmit(email.toLowerCase(), password);
  }, [email, password]);

  // effects
  useEffect(() => {
    resetForm();
  }, []);

  return (
    <main className="login">
      {!isLoading ? (
        <div className="login__wrapper">
          <Link to="/" className="login__logo_link">
            <img src={Logo} alt="logo" className="login__logo" />
          </Link>
          <h1 className="login__title">Рады видеть!</h1>
          <FormElement
            isFormValid={isFormValid}
            onSubmit={handleSubmit}
            submitText="Войти"
            underText="Ещё не зарегистрированы?"
            linkToPath="/signup"
            underLinkText="Регистрация"
          >
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
            />
          </FormElement>
        </div>
      ) : <Preloader />}
    </main>
  );
}

export default Login;
