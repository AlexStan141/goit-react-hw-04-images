import React from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({ imageSrc, imageAlt, onCloseModal }) {
  return (
    <>
      <div className={css.overlay} onClick={onCloseModal}></div>
      <div className={css.modal}>
        <img src={imageSrc} alt={imageAlt} className={css.image} />
      </div>
    </>
  );
}

Modal.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
