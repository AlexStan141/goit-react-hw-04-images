import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import React from 'react';

export default function ImageGallery({ images, onImageGalleryClick }) {
  return (
    <ul className={css.gallery}>
      {images.map((image, index) => {
        return (
          <ImageGalleryItem
            source={image.webformatURL}
            description={image.tags}
            key={index}
            onImageClick={description => {
              onImageGalleryClick(image.largeImageURL, description);
            }}
          ></ImageGalleryItem>
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.any).isRequired,
  onImageGalleryClick: PropTypes.func.isRequired,
};
