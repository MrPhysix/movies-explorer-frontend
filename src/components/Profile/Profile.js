import React, { useMemo } from 'react';
import './Profile.css';

// const info = {
//   name: 'Виталий',
//   email: 'pochta@yandex.ru',
// };

function ProfileInfoLine({ header, children }) {
  return (
    <div className="profile__info_line">
      <div className="info_line__header">{header}</div>
      <div className="info_line__text">{children}</div>
    </div>
  );
}

function Profile({ handleLogOut, userInfo }) {
  const onLogOutClick = useMemo(() => handleLogOut, []);
  const { name, email } = userInfo;
  const nameCapitalized = name && name[0].toUpperCase() + name.slice(1);
  return (
    <main className="profile">
      <div className="profile__wrapper">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <div className="profile__info">
          <ProfileInfoLine header="Имя">{nameCapitalized}</ProfileInfoLine>
          <i className="line__divider" />
          <ProfileInfoLine header="Email">{email}</ProfileInfoLine>
        </div>
        <div className="profile__buttons">
          <button
            className="profile__button link-hover"
            type="button"
          >
            Редактировать
          </button>
          <button
            className="profile__button link-hover"
            type="button"
            onClick={onLogOutClick}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </main>
  );
}

export default Profile;
