import React from 'react';
import Title from '../Title/Title';
import './Techs.css';
import NavTab from '../NavTab/NavTab';
import { subtitle, stack } from '../../../utils/landing-consts';

function Techs() {
  return (
    <div className="technology" id="techs">
      <div className="technology_wrap">
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
    </div>
  );
}

export default Techs;
