import getRefs from './get-refs';
const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = getRefs();

const KEY = "35668361-6ed5c81517d8d0bc1dc269174";
const BASE_URL = "https://pixabay.com/api/";

export default class ImagesApiService {
constructor(perPage = 40, searchQuery = ''){
    this.searchQuery = searchQuery;
    this.page = 1;
    this.perPage = perPage;    
}

async fetchImages() {
    const URL = `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&
    image_type=photo&orientation=horizontal&
    safesearch=true&per_page=${this.perPage}&page=${this.page}`;
    const response = await axios.get(URL);
      
    const { totalHits, hits } = response.data;
    this.page += 1;

    return  { totalHits, hits };

}

        resetPage() {
        this.page = 1;
    }


get query() {
    return this.searchQuery;
}

set query(newSearchQuery) {
    return this.searchQuery = newSearchQuery;
}
}


