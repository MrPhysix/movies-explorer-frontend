import React from 'react';
import './Promo.css';
import NavTab from '../NavTab/NavTab';

const buttons = [
  {
    text: 'О проекте',
    link: 'about-project',
  },
  {
    text: 'Технологии',
    link: 'techs',
  },
  {
    text: 'Студент',
    link: 'about-me',
  },
];

function Promo() {
  return (
    <div className="promo">
      <div className="promo__backplate">
        <h1 className="promo__title">
          Учебный проект студента факультета
          {' '}
          <span className="promo__title_span">Веб-разработки.</span>
        </h1>
        <div className="promo__list">
          {
          buttons.map((item) => (
            <NavTab
              key={item.link}
              link={item.link}
              anchor
            >
              {item.text}
            </NavTab>
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default Promo;
