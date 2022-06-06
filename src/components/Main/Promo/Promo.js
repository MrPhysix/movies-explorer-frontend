import React from 'react';
import './Promo.css';
import NavTab from '../NavTab/NavTab';

const title = 'Учебный проект студента факультета Веб-разработки.';
const buttons = [
  {
    text: 'О проекте',
    link: '',
  },
  {
    text: 'Технологии',
    link: '',
  },
  {
    text: 'Студент',
    link: '',
  },
];

function Promo() {
  return (
    <div className="promo">
      <h1 className="promo__title">{title}</h1>
      <nav className="promo__list">
        {
          buttons.map((item, i) => <NavTab key={i} link={item.link}>{item.text}</NavTab>)
        }
      </nav>
    </div>
  );
}

export default Promo;
