import React from 'react';
import './InfoTooltip.css';
//
import successMarkIcon from '../../images/succes-mark.svg';
import failMarkIcon from '../../images/fail-mark.svg';

const infoTooltipConfig = {
  success: {
    title: 'Успешно',
    regTitle: 'Вы успешно зарегистрировались!',
    image: successMarkIcon,
  },
  fail: {
    title: 'Что-то пошло не так! \n Попробуйте ещё раз.',
    image: failMarkIcon,
  },
};

function InfoTooltip({ infoTooltip, handleClose }) {
  const failed = infoTooltip.isFailed;
  const successText = infoTooltip.auth
    ? infoTooltipConfig.success.regTitle
    : infoTooltipConfig.success.title;
  return (
    <div className="info-tooltip fail">
      <img className="info-tooltip__image" src={failed ? infoTooltipConfig.fail.image : infoTooltipConfig.success.image} alt="process mark" />
      <h2 className="info-tooltip__title">{failed ? infoTooltipConfig.fail.title : successText}</h2>
      <button
        onClick={handleClose}
        className="info-tooltip__button button-hover"
        type="button"
      >
        Ok
      </button>
    </div>
  );
}

export default InfoTooltip;
