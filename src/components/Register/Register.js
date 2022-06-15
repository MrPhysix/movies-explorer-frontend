import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <main className="register">
      <div className="register__wrapper">
        <img src="" alt="" className="logo" />
        <h1 className="register__title">Добро пожаловать</h1>
        <form action="" className="register__form">
          <button className="register__submit" type="button">Зарегистрироваться</button>
          <p className="register__under-submit">
            Уже зарегистрированы?
            <Link to="/signin" className="register__submit">Войти</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Register;
