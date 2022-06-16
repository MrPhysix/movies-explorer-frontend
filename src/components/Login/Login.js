import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import FormElement from '../FormElement/FormElement';
import FormElementInput from '../FormElement/FormElementInput/FormElementInput';
import './Login.css';

function Login() {
  return (
    <main className="login">
      <div className="login__wrapper">
        <Link to="/" className="login__logo_link">
          <img src={Logo} alt="logo" className="login__logo" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <FormElement
          submitText="Войти"
          underText="Ещё не зарегистрированы?"
          linkToPath="/signup"
          underLinkText="Регистрация"
        >
          <FormElementInput
            labelText="Email"
            placeholderText="pochtavitaliya@yandex.ru"
          />
          <FormElementInput
            labelText="Пароль"
            errorText="Вы ввели неправильный логин или пароль. "
            placeholderText="******"
            type="password"
          />
        </FormElement>
      </div>
    </main>
  );
}

export default Login;
