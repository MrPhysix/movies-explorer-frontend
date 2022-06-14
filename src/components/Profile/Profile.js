import React, { useMemo } from 'react';
import './Profile.css';

const info = {
  name: 'Виталий',
  email: 'pochta@yandex.ru',
};
// <i className="divider" />

function ProfileInfoLine({ header, children }) {
  return (
    <div className="profile__info_line">
      <div className="line__header">{header}</div>
      <div className="line__text">{children}</div>
    </div>
  );
}

function Profile({ handleLogOut }) {
  const onLogOutClick = useMemo(() => handleLogOut, []);

  return (
    <main className="profile">
      <div className="profile__wrapper">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <div className="profile__info">
          <ProfileInfoLine header="Имя">{info.name}</ProfileInfoLine>
          <i className="line__divider" />
          <ProfileInfoLine header="Email">{info.email}</ProfileInfoLine>
        </div>
        <button className="profile__button link-hover" type="button">Редактировать</button>
        <button
          className="profile__button link-hover"
          type="button"
          onClick={onLogOutClick}
        >
          Выйти из аккаунта
        </button>
      </div>
    </main>
  );
}

export default Profile;
