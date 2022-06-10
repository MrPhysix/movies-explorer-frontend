import React from 'react';

import './AboutMe.css';
import Title from '../Title/Title';
import AuthorPhoto from '../../../images/about-me.png';
import ExternalLink from '../../ExternalLink/ExternalLink';
import {
  name, position,
  about, facebook, github,
} from '../../../utils/landing-consts';

const links = [facebook, github];

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <Title>студент</Title>
      <div className="about-me__info">
        <article className="info__article">
          <div className="info__wrap">
            <h3 className="info__title">{name}</h3>
            <p className="info__subtitle">{position}</p>
            <p className="info__text">{about}</p>
          </div>
          <nav className="about-me__pages">
            {
              links.map((item) => <ExternalLink key={item.title} link={item.link} className="pages_link link-hover">{item.title}</ExternalLink>)
            }
          </nav>
        </article>
        <img src={AuthorPhoto} alt="author" className="about-me__image" />
      </div>
    </section>
  );
}

export default AboutMe;
