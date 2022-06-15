import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import FormElement from '../FormElement/FormElement';
import FormElementInput from '../FormElement/FormElementInput/FormElementInput';
import './Register.css';

function Register() {
  return (
    <main className="register">
      <div className="register__wrapper">
        <Link to="/">
          <img src={Logo} alt="logo" className="register__logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать</h1>
        <FormElement
          submitText="Зарегистрироваться"
          underText="Уже зарегистрированы?"
          linkToPath="/signin"
          underLinkText="Войти"
        >
          <FormElementInput
            labelText="Имя"
            errorText="При регистрации пользователя произошла ошибка"
            placeholderText="Например, Виталий"
            optionStyle={{ textTransform: 'capitalize' }}
          />
          <FormElementInput
            labelText="Email"
            errorText="Пользователь с таким email уже существует."
            placeholderText="pochtavitaliya@yandex.ru"
          />
          <FormElementInput
            labelText="Пароль"
            errorText="Что-то пошло не так..."
            placeholderText="******"
            type="password"
          />
        </FormElement>
      </div>
    </main>
  );
}

export default Register;
