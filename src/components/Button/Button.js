import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ loadMoreImages }) {
  return (
    <button onClick={loadMoreImages} className={css.button}>
      Load more
    </button>
  );
}

Button.propTypes = {
  loadMoreImages: PropTypes.func.isRequired,
};
