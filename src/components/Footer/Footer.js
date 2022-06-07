import React from 'react';
import './Footer.css';
import ExternalLink from '../ExternalLink/ExternalLink';
import { facebook, github } from '../../utils/landing-consts';

const title = 'Учебный проект Яндекс.Практикум х BeatFilm.';
const year = new Date().getFullYear();
const links = [
  {
    title: 'Яндекс.Практикум',
    link: '',
  },
  github, facebook,
];

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">{title}</h2>
      <div className="footer__bottom">
        <time className="footer__date">
          &copy;
          {' '}
          {year}
        </time>
        <nav className="footer__nav">
          {
            links.map((item) => (
              <ExternalLink
                key={item.title}
                link={item.link}
                className="nav__link link-hover"
              >
                {item.title}
              </ExternalLink>
            ))
          }
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
