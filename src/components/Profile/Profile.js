import React, { useMemo } from 'react';
import './Profile.css';

function Profile({ handleLogOut }) {
  const onLogOutClick = useMemo(() => handleLogOut, []);

  return (
    <main className="profile">
      <h1 className="profile__title">Привет Виталий</h1>
      <div className="profile__info">
        <div className="profile__info_str">Виталий</div>
        <i className="divider" />
        <div className="profile__info_str">pochta@yandex.ru</div>
      </div>
      <button className="profile__button" type="button">Редактировать</button>
      <button
        className="profile__button"
        type="button"
        onClick={onLogOutClick}
      >
        Выйти из аккаунта
      </button>
    </main>
  );
}

export default Profile;
