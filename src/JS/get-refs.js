export default function getRefs() {
    return {
        searchInput: document.querySelector('input'),
        searchBtn: document.querySelector('button'),
        searchForm: document.querySelector('#search-form'),
        galleryListEl: document.querySelector('.gallery'),
        loadMoreBtn: document.querySelector('.load-more'),
    };
}