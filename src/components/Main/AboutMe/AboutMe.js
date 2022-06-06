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
    <div className="about-me" id="about-me">
      <Title>студент</Title>
      <div className="about-me_info">
        <article className="info__article">
          <h3 className="info__title">{name}</h3>
          <p className="info__subtitle">{position}</p>
          <p className="info__text">{about}</p>
          <nav className="about-me_pages">
            {
              links.map((item) => <ExternalLink link={item.link} className="pages_link link-hover">{item.title}</ExternalLink>)
            }
          </nav>
        </article>
        <img src={AuthorPhoto} alt="author" className="about-me_image" />
      </div>
    </div>
  );
}

export default AboutMe;
