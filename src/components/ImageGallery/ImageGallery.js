import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import React from 'react';

export default function ImageGallery({ images }) {
  return (
    <ul class={css.gallery}>
      {images.map((image, index) => {
        return (
          <ImageGalleryItem
            source={image.webformatURL}
            description={image.tags}
            key={index}
          ></ImageGalleryItem>
        );
      })}
    </ul>
  );
}
