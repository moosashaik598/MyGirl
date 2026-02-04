// Editable love lines for typewriter effect
const loveLines = [
    "You make my heart skip a beat every single day...",
    "With you, every moment becomes a beautiful memory...",
    "You're the reason I believe in love at first sight...",
    "Your smile lights up my entire world...",
    "Every day with you is my favorite day...",
    "You're not just my love, you're my best friend...",
    "Thank you for being the most amazing person in my life..."
];

// Typewriter effect
let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');
const typeSpeed = 80;
const deleteSpeed = 50;
const pauseTime = 2000;

function typeWriter() {
    const currentLine = loveLines[lineIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentLine.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentLine.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentLine.length) {
        setTimeout(() => {
            isDeleting = true;
        }, pauseTime);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        lineIndex = (lineIndex + 1) % loveLines.length;
    }
    
    const speed = isDeleting ? deleteSpeed : typeSpeed;
    setTimeout(typeWriter, speed);
}

// Start typewriter effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Surprise button functionality
const surpriseBtn = document.getElementById('surpriseBtn');
const letterSection = document.getElementById('letterSection');
const closeBtn = document.getElementById('closeBtn');

surpriseBtn.addEventListener('click', () => {
    letterSection.classList.remove('hidden');
    setTimeout(() => {
        letterSection.classList.add('visible');
    }, 10);
    triggerConfetti();
});

closeBtn.addEventListener('click', () => {
    letterSection.classList.remove('visible');
    setTimeout(() => {
        letterSection.classList.add('hidden');
    }, 500);
});

// Close letter when clicking outside
letterSection.addEventListener('click', (e) => {
    if (e.target === letterSection) {
        closeBtn.click();
    }
});

// Music button functionality
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
let isPlaying = true;

musicBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
        musicIcon.classList.add('playing');
        musicIcon.textContent = '🎵';
    } else {
        musicIcon.classList.remove('playing');
        musicIcon.textContent = '🔇';
    }
});

// Confetti animation
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Confetti particle class
class Confetti {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.getRandomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }
    
    getRandomColor() {
        const colors = [
            '#FF6B9D', '#C44569', '#FFC312', '#EE5A6F',
            '#F79F1F', '#EA2027', '#FF9FF3', '#FF71CE',
            '#01CDFE', '#05FFA1', '#B967FF', '#FFFB96'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        
        if (this.y > canvas.height) {
            this.reset();
        }
        
        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

let confettiParticles = [];
let confettiActive = false;
let animationFrameId = null;

function triggerConfetti() {
    confettiActive = true;
    confettiParticles = [];
    
    for (let i = 0; i < 150; i++) {
        confettiParticles.push(new Confetti());
    }
    
    animateConfetti();
    
    // Stop confetti after 5 seconds
    setTimeout(() => {
        confettiActive = false;
    }, 5000);
}

function animateConfetti() {
    if (!confettiActive && confettiParticles.length === 0) {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confettiParticles.forEach((confetti, index) => {
        confetti.update();
        confetti.draw();
        
        // Remove confetti that are off screen and confetti is not active
        if (!confettiActive && confetti.y > canvas.height) {
            confettiParticles.splice(index, 1);
        }
    });
    
    animationFrameId = requestAnimationFrame(animateConfetti);
}

// Smooth scrolling for scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    });
}

// Add parallax effect to hero on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 700;
    }
});

// Animate gallery items on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

// Observe all photo items
document.querySelectorAll('.photo-item').forEach(item => {
    observer.observe(item);
});

// Add click effect to photos
document.querySelectorAll('.photo-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
        
        // Create a ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)';
        ripple.style.borderRadius = '20px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'fadeOut 0.6s ease-out forwards';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add fadeOut animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(1.5);
        }
    }
`;
document.head.appendChild(style);

// Prevent context menu on long press (for mobile)
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.photo-item')) {
        e.preventDefault();
    }
});

// Add some sparkle effect on hero
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight * 0.6 + 'px';
    sparkle.style.width = '3px';
    sparkle.style.height = '3px';
    sparkle.style.background = 'white';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1';
    sparkle.style.animation = 'sparkleAnim 2s ease-out forwards';
    sparkle.style.boxShadow = '0 0 10px white';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnim {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Create sparkles periodically
setInterval(createSparkle, 500);
