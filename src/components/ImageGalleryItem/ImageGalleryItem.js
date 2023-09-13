import React from 'react';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ source, description }) {
  return (
    <li>
      <img src={source} alt={description} class={css.image} />
    </li>
  );
}
