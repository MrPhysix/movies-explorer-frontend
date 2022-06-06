import React from 'react';
import './AboutProject.css';
import Title from '../Title/Title';

const article = [{
  _id: 1,
  title: 'Дипломный проект включал 5 этапов',
  text: 'Составление плана, работу над бэкендом, вёрстку, '
    + 'добавление функциональности и финальные доработки.',
},
{
  _id: 2,
  title: 'На выполнение диплома ушло 5 недель',
  text: 'У каждого этапа был мягкий и жёсткий дедлайн, '
    + 'которые нужно было соблюдать, чтобы успешно защититься.',
}];

function AboutProject() {
  return (
    <div className="about-project">
      <Title>о проекте</Title>
      <ul className="about-project__articles">
        {
          article.map((item) => (
            <li className="article" key={item._id}>
              <h3 className="article__title">{item.title}</h3>
              <p className="article__text">{item.text}</p>
            </li>
          ))
        }
      </ul>
      <div className="about-project__line">
        <div className="line__colored">
          <p className="line__text">1 неделя</p>
        </div>
        <div className="line">
          <p className="line__text">4 недели</p>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;
