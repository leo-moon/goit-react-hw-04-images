import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/?key=32187725-9ebb8484d7ffd0cb9d2ef83f1',
  params: {
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchNewImages = async (search = '', page = 1, per_page=6) => {
  const data = await instance.get('', {
    params: {
      q: search,
      per_page: per_page,
      page: page,
    },
  });
  return data;
};

export const startImages = async per_page => {
  const data = await instance.get('', {
    params: {
      per_page: per_page,
    },
  });
  console.log('startImages', data);
  return data;
};
