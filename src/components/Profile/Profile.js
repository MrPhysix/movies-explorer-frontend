import React, {
  useContext, useCallback, useEffect, useState,
} from 'react';
import './Profile.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormValidator from '../../hooks/useFormValidator';
import { regEx } from '../../utils/consts';

function ProfileInfoLine({
  name, labelText, errorText,
  placeholderText, pattern, value,
  onChange, minLength, maxLength,
}) {
  return (
    <>
      <div className="profile__info_line">
        <div className="info_line__header">{labelText}</div>
        <input
          name={name}
          id={name}
          className="info_line__input"
          value={value}
          placeholder={placeholderText}
          pattern={pattern}
          onChange={onChange}
          minLength={minLength}
          maxLength={maxLength}
        />
      </div>
      <p className="info_line__error">{errorText}</p>
    </>
  );
}

function Profile({ onLogOut, onSubmit }) {
  // const
  const currentUser = useContext(CurrentUserContext);
  // user
  const { name, email } = currentUser;
  //
  const nameCapitalized = name && name[0].toUpperCase() + name.slice(1);
  const {
    values, errors, isFormValid, handleChange, resetForm,
  } = useFormValidator();
  const isActive = !isFormValid || (name === values.name || email === values.email);
  // states
  const [inputValue, setInputValue] = useState({ name, email });
  // handlers
  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();
    console.log('evt');
    onSubmit(inputValue.name, inputValue.email);
  }, [inputValue]);

  // effects
  useEffect(() => {
    resetForm();
  }, []);

  useEffect(() => {
    setInputValue({ name, email });
    console.log('currentUser');
    console.log(currentUser);
  }, [currentUser]);

  useEffect(() => {
    console.log('inputValue');
    console.log(inputValue);
  }, [inputValue]);

  return (
    <main className="profile">
      <form className="profile__wrapper" onSubmit={handleSubmit}>
        <h1 className="profile__title">
          Привет,
          {' '}
          <span style={{ color: '#3DDC84' }}>{nameCapitalized}</span>
        </h1>
        <div className="profile__info">
          <ProfileInfoLine
            name="name"
            labelText="Имя"
            errorText={errors.name}
            placeholderText={nameCapitalized}
            pattern={regEx.name}
            value={values.name}
            onChange={(evt) => {
              setInputValue((prev) => ({ ...prev, name: evt.target.value }));
              handleChange(evt);
            }}
            minLength="2"
            maxLength="30"
          />
          <i className="line__divider" />
          <ProfileInfoLine
            name="email"
            labelText="Email"
            errorText={errors.email}
            placeholderText={email}
            pattern={regEx.email}
            value={values.email}
            onChange={(evt) => {
              setInputValue((prev) => ({ ...prev, email: evt.target.value }));
              handleChange(evt);
            }}
            minLength="4"
            maxLength="32"
          />
        </div>
        <div className="profile__buttons">
          <button
            disabled={isActive}
            className="profile__button link-hover"
            type="submit"
          >
            Редактировать
          </button>
          <button
            className="profile__button link-hover"
            type="button"
            onClick={onLogOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}

export default Profile;
