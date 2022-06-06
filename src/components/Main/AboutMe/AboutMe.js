import React from 'react';

import './AboutMe.css';
import Title from '../Title/Title';
import AuthorPhoto from '../../../images/about-me.png';
import ExternalLink from '../../ExternalLink/ExternalLink';

const name = 'Виталий';
const position = 'Фронтенд-разработчик, 30 лет';
const about = 'Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена'
  + 'и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. '
  + 'С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,'
  + ' начал заниматься фриланс-заказами и ушёл с постоянной работы.';
const links = [{
  text: 'Facebook',
  ref: 'https://facebook.com/',
}, {
  text: 'GitHub',
  ref: 'https://github.com/',
}];

function AboutMe() {
  return (
    <div className="about-me">
      <Title>студент</Title>
      <div className="about-me_info">
        <article className="info__article">
          <h3 className="info__title">{name}</h3>
          <p className="info__subtitle">{position}</p>
          <p className="info__text">{about}</p>
          <nav className="about-me_pages">
            {
              links.map((item) => <ExternalLink link={item.link} className="pages_link link-hover">{item.text}</ExternalLink>)
            }
          </nav>
        </article>
        <img src={AuthorPhoto} alt="author" className="about-me_image" />
      </div>
    </div>
  );
}

export default AboutMe;
