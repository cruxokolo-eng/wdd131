document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;

const parameters = new URLSearchParams(window.location.search);
const productNames = new Map([
    ['fc-1888', 'flux capacitor'],
    ['fc-2050', 'power laces'],
    ['fs-1987', 'time circuits'],
    ['ac-2000', 'low voltage reactor'],
    ['jj-1969', 'warp equalizer']
]);
const isSubmitted = parameters.get('submitted') === '1'
    && parameters.has('product')
    && parameters.has('rating')
    && parameters.has('installationDate');

if (isSubmitted) {
    const reviewCount = Number(localStorage.getItem('reviewCount')) || 0;
    const updatedCount = reviewCount + 1;
    localStorage.setItem('reviewCount', updatedCount);

    document.getElementById('review-count').textContent = updatedCount;
    const productId = parameters.get('product');
    document.getElementById('review-product').textContent = productNames.get(productId) || productId;
    document.getElementById('review-rating').textContent = `${parameters.get('rating')} out of 5 stars`;
    document.getElementById('review-date').textContent = parameters.get('installationDate');
    document.getElementById('review-features').textContent = parameters.getAll('features').join(', ') || 'None selected';
    document.getElementById('review-text').textContent = parameters.get('review') || 'No written review';
    document.getElementById('review-name').textContent = parameters.get('userName') || 'Not provided';
} else {
    document.getElementById('confirmation-content').hidden = true;
    document.getElementById('no-submission').hidden = false;
}