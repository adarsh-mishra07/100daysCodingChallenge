// 1️⃣ Select all gallery images
const images = document.querySelectorAll('.gallery img');

// 2️⃣ Select the lightbox and image inside it
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

// 3️⃣ When user clicks on any image
images.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex'; // Show lightbox
        lightboxImg.src = img.src;       // Set clicked image as large image
    });
});

// 4️⃣ When user clicks close button (×)
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none'; // Hide popup
});

// 5️⃣ When user clicks outside the image, also close
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});
