import React from 'react';
import './AboutProject.css';
import Title from '../Title/Title';
import { articles } from '../../../utils/landing-consts';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <Title>о проекте</Title>
      <ul className="about-project__articles">
        {
          articles.map((item) => (
            <li className="article" key={item._id}>
              <h3 className="article__title">{item.title}</h3>
              <p className="article__text">{item.text}</p>
            </li>
          ))
        }
      </ul>
      <div className="about-project__line">
        <div className="line__colored">
          <p className="line__text" style={{ color: '#000' }}>1 неделя</p>
        </div>
        <div className="line">
          <p className="line__text">4 недели</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
