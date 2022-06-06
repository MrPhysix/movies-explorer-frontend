import React from 'react';
import './Footer.css';
import ExternalLink from '../ExternalLink/ExternalLink';

const title = 'Учебный проект Яндекс.Практикум х BeatFilm.';
const year = new Date().getFullYear();
const links = [
  {
    title: 'Яндекс.Практикум',
    link: '',
  },
  {
    title: 'Github',
    link: '',
  },
  {
    title: 'Facebook',
    link: '',
  },
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
                link={item.link}
                className="nav__link"
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
