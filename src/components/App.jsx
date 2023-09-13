import Searchbar from './Searchbar/Searchbar';
import React, { useEffect, useState } from 'react';
import { getData, getImagesSlice } from './apiFunctions';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loadMoreButtonVisibility, setLoadMoreButtonVisibility] =
    useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);

  return (
    <>
      <Searchbar
        onSubmit={async values => {
          var imagesToAdd = await getImagesSlice(1, values.search, 0, 26);
          setImages([...imagesToAdd]);
          setPage(2);
          setSearchValue(values.search);
          if (imagesToAdd.length == 12) {
            setLoadMoreButtonVisibility(true);
          }
        }}
      ></Searchbar>
      <ImageGallery images={images}></ImageGallery>
      {loadMoreButtonVisibility && (
        <Button
          loadMoreImages={async () => {
            var imagesToAdd = await getImagesSlice(
              page,
              searchValue,
              images.length,
              26
            );
            setImages([...images, ...imagesToAdd]);
            setPage(page + 1);
            if (imagesToAdd.length < 12) {
              setLoadMoreButtonVisibility(false);
            }
          }}
        ></Button>
      )}
    </>
  );
};
