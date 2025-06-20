document.addEventListener('DOMContentLoaded', () => {
  // Typing animation
  const typedText = document.getElementById('typed-text');
  const texts = ["Web Developer", "UI/UX Designer", "Creative Coder"];
  let index = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;

  function type() {
    if (!typedText) return;
    
    const currentText = texts[index];
    
    if (isDeleting) {
      typedText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = charIndex === currentText.length ? 1500 : 150;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % texts.length;
    }

    setTimeout(type, typingSpeed);
  }

  // Overlay animation with requestAnimationFrame
  function animateOverlay() {
    const overlay = document.getElementById('overlay');
    const door = document.getElementById('door');
    
    if (!overlay || !door) return;
    
    let startTime = null;
    const duration = 3000;

    function animateDoor(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / 1000;
      
      if (progress < 1) {
        door.style.transform = `scale(${1 - progress * 0.3})`;
        door.style.boxShadow = `0 0 ${80 + progress * 50}px ${30 + progress * 50}px rgba(187, 187, 187, ${0.9 - progress * 0.5})`;
        requestAnimationFrame(animateDoor);
      }
    }

    function animateZoom(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;
      
      if (progress < 1) {
        overlay.style.opacity = 1 - progress;
        overlay.style.transform = `scale(${1 + progress * 4})`;
        requestAnimationFrame(animateZoom);
      } else {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }

    requestAnimationFrame(animateDoor);
    setTimeout(() => {
      startTime = null;
      requestAnimationFrame(animateZoom);
    }, 1000);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Start animations after a short delay
  setTimeout(() => {
    if (document.getElementById('overlay')) {
      animateOverlay();
    }
    if (typedText) {
      type();
    }
  }, 500);

  // Focus styles for keyboard navigation
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('keyboard-focus');
    }
  });

  document.addEventListener('mousedown', () => {
    document.documentElement.classList.remove('keyboard-focus');
  });
});