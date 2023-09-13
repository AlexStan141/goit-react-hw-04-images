const API_KEY = '38167390-c27f94e9d5334bbe499e3be3b';

export async function getData(page, value) {
  var q = value.split(' ').join('+');
  var dataResponse = await fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  );
  var dataJson = await dataResponse.json();
  return dataJson;
}

export async function getImagesSlice(
  page,
  value,
  currentNrOfImages,
  nrOfImages
) {
  var dataJson = await getData(page, value);
  var allImages = dataJson.hits;
  return allImages.slice(0, Math.min(12, nrOfImages - currentNrOfImages));
}
