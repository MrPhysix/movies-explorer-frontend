import React from 'react';
import TypeAnimation from 'react-type-animation';
import Title from '../Title/Title';
import './Techs.css';
import { subtitle, stack } from '../../../utils/landing-consts';
import ExternalLink from '../../ExternalLink/ExternalLink';

function Techs() {
  return (
    <section className="technology" id="techs">
      <div className="technology_wrap">
        <Title>технологии</Title>
        <TypeAnimation
          cursor
          sequence={['', 1500, '7 технологий', 30000]}
          wrapper="h3"
          repeat={Infinity}
          className="technology__title"
        />
        {/* <h3 className="technology__title">7 технологий</h3> */}
        <p className="technology__subtitle">{subtitle}</p>
        <ul className="technology__list">
          {
          stack.map((item) => (
            <ExternalLink key={item.title} className="technology__link" link={item.link}>{item.title}</ExternalLink>
          ))
        }
        </ul>
      </div>
    </section>
  );
}

export default Techs;
