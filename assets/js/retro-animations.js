// =========================================
// RETRO GAMING ANIMATIONS
// =========================================

/**
 * Typewriter effect for hero text
 */
function typewriterEffect(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

/**
 * Glitch text effect
 */
function glitchText(element) {
  const originalText = element.textContent;
  const glitchChars = '▓▒░█▀▄▌▐│┤┴┬├─┼';

  let iterations = 0;
  const maxIterations = 10;

  const interval = setInterval(() => {
    element.textContent = originalText
      .split('')
      .map((char, index) => {
        if (index < iterations) {
          return originalText[index];
        }
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      })
      .join('');

    iterations += 1 / 2;

    if (iterations >= originalText.length) {
      clearInterval(interval);
      element.textContent = originalText;
    }
  }, 50);
}

/**
 * Add glitch effect to headers on hover
 */
function initGlitchHeaders() {
  const headers = document.querySelectorAll('h1, h2, h3');

  headers.forEach(header => {
    header.addEventListener('mouseenter', () => {
      if (!header.classList.contains('glitching')) {
        header.classList.add('glitching');
        glitchText(header);
        setTimeout(() => {
          header.classList.remove('glitching');
        }, 1000);
      }
    });
  });
}

/**
 * Button press animation
 */
function initButtonAnimations() {
  const buttons = document.querySelectorAll('.social-links a, .links a, nav a');

  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 255, 102, 0.5);
        pointer-events: none;
        animation: buttonPress 0.3s ease;
      `;

      this.style.position = 'relative';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 300);
    });
  });
}

/**
 * Matrix rain effect (lightweight canvas version)
 */
function initMatrixRain() {
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -2;
    opacity: 0.15;
  `;

  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff66';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  setInterval(draw, 50);

  // Resize handler
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/**
 * Retro cursor blink
 */
function addBlinkingCursor(element) {
  const cursor = document.createElement('span');
  cursor.textContent = '▮';
  cursor.style.cssText = `
    animation: blink 1s infinite;
    margin-left: 5px;
  `;
  element.appendChild(cursor);
}

/**
 * Arcade sound effect simulation (visual feedback)
 */
function arcadeSoundFeedback(element) {
  element.style.transition = 'none';
  element.style.transform = 'scale(0.95)';

  setTimeout(() => {
    element.style.transition = 'all 0.3s ease';
    element.style.transform = 'scale(1)';
  }, 100);
}

/**
 * Project card hover effects
 */
function initProjectCardEffects() {
  const projects = document.querySelectorAll('.project');

  projects.forEach(project => {
    project.addEventListener('mouseenter', function () {
      this.style.setProperty('--hover-width', '100%');
    });

    project.addEventListener('mouseleave', function () {
      this.style.setProperty('--hover-width', '0%');
    });
  });
}

/**
 * Initialize all retro effects
 */
function initRetroEffects() {
  // Matrix rain disabled for cleaner monochrome aesthetic
  // if (window.innerWidth > 768) {
  //   initMatrixRain();
  // }

  // Initialize glitch headers
  // initGlitchHeaders();

  // Initialize button animations
  initButtonAnimations();

  // Initialize project card effects
  initProjectCardEffects();

  // Subtle flicker disabled for monochrome theme
  // setInterval(() => {
  //   if (Math.random() > 0.95) {
  //     document.body.style.opacity = '0.98';
  //     setTimeout(() => {
  //       document.body.style.opacity = '1';
  //     }, 50);
  //   }
  // }, 3000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRetroEffects);
} else {
  initRetroEffects();
}

// Add CSS for button press animation
const style = document.createElement('style');
style.textContent = `
  @keyframes buttonPress {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }
`;
document.head.appendChild(style);
