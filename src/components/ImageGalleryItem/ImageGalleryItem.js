import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  source,
  description,
  onImageClick,
}) {
  return (
    <li>
      <img
        src={source}
        alt={description}
        className={css.image}
        onClick={() => {
          onImageClick(description);
        }}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  source: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
