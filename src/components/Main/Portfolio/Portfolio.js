import React from 'react';
import './Portfolio.css';
import ExternalLink from '../../ExternalLink/ExternalLink';

const links = [
  {
    title: 'Статичный сайт',
    link: 'https://github.com/MrPhysix/MrPhysix.github.io',
  },
  {
    title: 'Адаптивный сайт',
    link: 'https://github.com/MrPhysix/russian-travel',
  },
  {
    title: 'Одностраничное приложение',
    link: 'https://github.com/MrPhysix/react-mesto-api-full',
  },
];

function Portfolio() {
  return (
    <section className="portfolio">
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
    </section>
  );
}

export default Portfolio;
