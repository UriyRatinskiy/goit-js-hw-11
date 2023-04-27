const KEY = "35668361-6ed5c81517d8d0bc1dc269174";
const BASE_URL = "https://pixabay.com/api/";

export default class NewsApiService {
constructor(){
    this.query = '';
    this.page = 1;    
}

fetchPhotoCard() {
    const URL = `${BASE_URL}?key=${KEY}&q=${this.query}&
    image_type=photo&orientation=horizontal&
    safesearch=true&per_page=40&page=${this.page}`;
      
   return fetch(URL)
    .then(r => r.json())
    .then(({ hits }) => {
        this.incrementPage();

        return hits;

    });
};
    incrementPage() {
    this.page += 1;
}
    resetPage() {
        this.page = 1;
    }


get searchQuery() {
    return this.query;
};

set searchQuery(newQuery) {
    this.query = newQuery;
};
};


