/* Custom Cursor across all pages */
const cursor = document.querySelector('.cursor');

const positionCursor = (e) => {
  const mouseY = e.clientY;
  const mouseX = e.clientX;

  cursor.style.top = `${mouseY}px`;
  cursor.style.left = `${mouseX}px`;
};

window.addEventListener('mousemove', positionCursor);


/* Photo/Video Areas for Arrow Buttons/Slider */
function initSlider(container) {
    let currentSlide = 0;
    const slider = container.querySelector('.slider');
    const slides = slider.querySelectorAll('img');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    const totalSlides = slides.length;
    const visibleSlides = 2;
    const maxSlide = totalSlides - visibleSlides;

    function updateSlider() {
        const moveAmount = (currentSlide * 100) / visibleSlides;
        slider.style.transform = `translateX(-${moveAmount}%)`;
    }
    
    function moveSlide(direction) {
        currentSlide += direction;
        
        if (currentSlide < 0) {
            currentSlide = 0;
        } else if (currentSlide >= maxSlide) {
            currentSlide = maxSlide;
        }
        
        updateSlider();
    }

    prevBtn.addEventListener('click', () => moveSlide(-1));
    nextBtn.addEventListener('click', () => moveSlide(1));

    updateSlider();
}

document.querySelectorAll('.slider-container').forEach(container => {
    initSlider(container);
});

// Overlay functions
function openOverlay(imgSrc) {
    document.getElementById('overlay').classList.add('active');
    document.getElementById('overlayImg').src = imgSrc;
}

function closeOverlay() {
    document.getElementById('overlay').classList.remove('active');
}

// Adds the click event to all the sliders
document.querySelectorAll('.slider img').forEach(img => {
    img.addEventListener('click', () => openOverlay(img.src));
});

// Closes the overlay when clicking outside the image
document.getElementById('overlay').addEventListener('click', (e) => {
    if (e.target.id === 'overlay') {
        closeOverlay();
    }
});

// Closes the overlay with escape key if necessary
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeOverlay();
    }
});