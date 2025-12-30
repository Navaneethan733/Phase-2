
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat h3");
  counters.forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const inc = target / 80;
      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(update, 30);
      } else {
        counter.innerText = target + "+";
      }
    };
    update();
  });
});

// Testimonial Carousel with Smooth Movement
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.testimonials-carousel');
    const items = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselContainer = document.querySelector('.carousel-container');
    
    let currentIndex = 0;
    let isAnimating = false;
    const totalItems = items.length;
    let autoRotateInterval;
    
    // Function to update carousel position with smooth animation
    function updateCarousel(direction = 'next') {
        if (isAnimating) return;
        
        isAnimating = true;
        
        // Remove active class from all items
        items.forEach(item => item.classList.remove('active'));
        
        // Calculate new index based on direction
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % totalItems;
        } else {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        }
        
        // Calculate the transform value based on current index
        const translateX = -currentIndex * 100;
        
        // Apply smooth transform with enhanced easing
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Update active dot with animation
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Add active class to current item with delay for animation
        setTimeout(() => {
            items[currentIndex].classList.add('active');
            isAnimating = false;
        }, 300);
        
        // Reset auto-rotation timer
        resetAutoRotate();
    }
    
    // Next button click handler with enhanced feedback
    nextBtn.addEventListener('click', function() {
        if (!isAnimating) {
            // Add click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            updateCarousel('next');
        }
    });
    
    // Previous button click handler with enhanced feedback
    prevBtn.addEventListener('click', function() {
        if (!isAnimating) {
            // Add click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            updateCarousel('prev');
        }
    });
    
    // Dot click handlers with smooth transition
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            if (!isAnimating) {
                const targetIndex = parseInt(this.getAttribute('data-index'));
                
                if (targetIndex !== currentIndex) {
                    // Determine direction for smooth animation
                    const direction = targetIndex > currentIndex ? 'next' : 'prev';
                    currentIndex = targetIndex;
                    
                    // Remove active class from all items
                    items.forEach(item => item.classList.remove('active'));
                    
                    // Calculate transform
                    const translateX = -currentIndex * 100;
                    carousel.style.transform = `translateX(${translateX}%)`;
                    
                    // Update dots
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === currentIndex);
                    });
                    
                    // Add active class with delay
                    setTimeout(() => {
                        items[currentIndex].classList.add('active');
                        isAnimating = false;
                    }, 300);
                    
                    resetAutoRotate();
                }
            }
        });
    });
    
    // Auto-rotation function
    function startAutoRotate() {
        autoRotateInterval = setInterval(() => {
            if (!isAnimating) {
                updateCarousel('next');
            }
        }, 5000); // Change slide every 5 seconds
    }
    
    // Reset auto-rotation timer
    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        startAutoRotate();
    }
    
    // Pause auto-rotation on hover
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });
    
    // Resume auto-rotation when mouse leaves
    carouselContainer.addEventListener('mouseleave', () => {
        startAutoRotate();
    });
    
    // Touch swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carouselContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && !isAnimating) {
                updateCarousel('next'); // Swipe left
            } else if (diff < 0 && !isAnimating) {
                updateCarousel('prev'); // Swipe right
            }
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!isAnimating) {
            if (e.key === 'ArrowLeft') {
                updateCarousel('prev');
            } else if (e.key === 'ArrowRight') {
                updateCarousel('next');
            }
        }
    });
    
    // Initialize carousel
    function initCarousel() {
        items[currentIndex].classList.add('active');
        startAutoRotate();
    }
    
    // Start the carousel
    initCarousel();
});

