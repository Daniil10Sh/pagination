
const apiKey = '39817570-11b8dc068d8384a93a606abbf&editors_choice=true'; 
const apiUrl = 'https://pixabay.com/api/';
const imageGallery = document.getElementById('image-gallery');
const loadMoreButton = document.getElementById('load-more');
let currentPage = 1;
const perPage = 12;
async function fetchImages(page = 1) {
    try {
        const response = await fetch(`${apiUrl}?key=${apiKey}&editors_choice=true&per_page=${perPage}&page=${page}`);
        const data = await response.json();
        return data.hits;
    } catch (error) {
        console.error('Помилка отримання даних:', error);
        return [];
    }
}
function renderImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
        imgElement.alt = image.tags;
        imgElement.loading = 'lazy'; 
        imageGallery.appendChild(imgElement);
    });
}
loadMoreButton.addEventListener('click', async () => {
    currentPage++;
    const newImages = await fetchImages(currentPage);
    renderImages(newImages);
});
(async function initializeGallery() {
    const initialImages = await fetchImages(currentPage);
    renderImages(initialImages);
})();
