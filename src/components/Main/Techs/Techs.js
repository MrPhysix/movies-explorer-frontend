import React from 'react';
import Title from '../Title/Title';
import './Techs.css';
import NavTab from '../NavTab/NavTab';

const subtitle = 'На курсе веб-разработки мы освоили технологии, '
  + 'которые применили в дипломном проекте.';
const stack = [
  {
    title: 'HTML',
    link: '',
  },
  {
    title: 'CSS',
    link: '',
  },
  {
    title: 'JS',
    link: '',
  },
  {
    title: 'React',
    link: '',
  },
  {
    title: 'Git',
    link: '',
  },
  {
    title: 'Express.js',
    link: '',
  },
  {
    title: 'mongoDB',
    link: '',
  },
];

function Techs() {
  return (
    <div className="technology">
      <Title>технологии</Title>
      <h3 className="technology__title">7 технологий</h3>
      <p className="technology__subtitle">{subtitle}</p>
      <ul className="technology__list">
        {
          stack.map((item) => (
            <NavTab key={item.title} link={item.link}>{item.title}</NavTab>
          ))
        }
      </ul>
    </div>
  );
}

export default Techs;
