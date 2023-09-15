import Searchbar from './Searchbar/Searchbar';
import React, { useEffect, useState } from 'react';
import { getData, getImagesSlice } from './apiFunctions';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Notiflix from 'notiflix';
import Loader from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(500);
  const [loadMoreButtonVisibility, setLoadMoreButtonVisibility] =
    useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [modalImageAlt, setModalImageAlt] = useState('');

  function init() {
    setImages([]);
    setLoadMoreButtonVisibility(false);
  }

  useEffect(() => {
    async function fetchData() {
      var data = await getData(page, searchValue);
      setTotalHits(data.totalHits);
    }
    fetchData();
  }, [page, searchValue]);

  async function addFirstImages(searchValue) {
    var imagesToAdd = await getImagesSlice(1, searchValue, 0, totalHits);
    setImages([...imagesToAdd]);
    setPage(2);
    setSearchValue(searchValue);
    if (imagesToAdd.length < 12) {
      setLoadMoreButtonVisibility(false);
      if (imagesToAdd.length === 0) {
        Notiflix.Notify.failure('No results match your search');
      } else {
        Notiflix.Notify.failure('You reached the end of search result');
      }
    } else {
      setLoadMoreButtonVisibility(true);
    }
  }

  async function addMoreImages() {
    var imagesToAdd = await getImagesSlice(
      page,
      searchValue,
      images.length,
      totalHits
    );
    setImages([...images, ...imagesToAdd]);
    setPage(page + 1);
    if (imagesToAdd.length < 12) {
      setLoadMoreButtonVisibility(false);
      Notiflix.Notify.failure('You reached the end of search results');
    } else {
      setLoadMoreButtonVisibility(true);
    }
  }

  return (
    <>
      <Searchbar
        onSubmit={() => {
          init();
          setLoaderVisibility(true);
          setTimeout(async () => {
            addFirstImages(searchValue);
            setLoaderVisibility(false);
          }, 2000);
        }}
        workWithProps={value => {
          setSearchValue(value);
        }}
      ></Searchbar>
      <ImageGallery
        images={images}
        onImageGalleryClick={(source, description) => {
          setModalImageSrc(source);
          setModalImageAlt(description);
        }}
      ></ImageGallery>
      {loadMoreButtonVisibility && (
        <Button
          loadMoreImages={async () => {
            setLoaderVisibility(true);
            setLoadMoreButtonVisibility(false);
            setTimeout(async () => {
              addMoreImages();
              setLoaderVisibility(false);
            }, 2000);
          }}
        ></Button>
      )}
      {loaderVisibility && <Loader></Loader>}
      {modalImageSrc && (
        <Modal
          imageSrc={modalImageSrc}
          imageAlt={modalImageAlt}
          onCloseModal={() => {
            setModalImageSrc('');
          }}
        ></Modal>
      )}
    </>
  );
};
