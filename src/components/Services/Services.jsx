import axios from 'axios';

const apiKey = '38630454-b1080283bd37eb37a5f5742ac';
const perPage = 12;

export const fetchImages = (query, page) => {
  return axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
};
