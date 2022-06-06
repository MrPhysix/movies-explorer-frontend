import React from 'react';
import './Portfolio.css';
import ExternalLink from '../../ExternalLink/ExternalLink';

const links = [
  {
    title: 'Статичный сайт',
    link: '',
  },
  {
    title: 'Адаптивный сайт',
    link: '',
  },
  {
    title: 'Одностраничное приложение',
    link: '',
  },
];

function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__pages">
        {
          links.map((item) => (
            <div key={item.title} className="portfolio__page">
              <ExternalLink
                link={item.link}
                className="page__link button-hover"
              >
                {item.title}
              </ExternalLink>
            </div>
          ))
        }
      </ul>
    </div>
  );
}

export default Portfolio;
