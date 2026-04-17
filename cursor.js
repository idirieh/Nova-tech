// Custom Cursor - Circle with Dot
(function() {
  // Debug: log that cursor script is running
  console.log('Cursor script loaded');
  
  // Only initialize on devices with fine pointer (mouse)
  if (window.matchMedia('(pointer: coarse)').matches) {
    console.log('Touch device detected - cursor disabled');
    return;
  }
  console.log('Mouse device detected - cursor enabled');

  try {
    // Create cursor elements directly with fixed positioning
    const circle = document.createElement('div');
    circle.id = 'cursor-circle';
    circle.style.cssText = `
      position: fixed !important;
      width: 40px !important;
      height: 40px !important;
      border: 2px solid #00daf3 !important;
      border-radius: 50% !important;
      pointer-events: none !important;
      z-index: 999999 !important;
      transform: translate(-50%, -50%) !important;
      transition: width 0.15s ease, height 0.15s ease, background-color 0.2s ease !important;
      background-color: transparent !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    `;
    
    const dot = document.createElement('div');
    dot.id = 'cursor-dot';
    dot.style.cssText = `
      position: fixed !important;
      width: 6px !important;
      height: 6px !important;
      background-color: #00daf3 !important;
      border-radius: 50% !important;
      pointer-events: none !important;
      z-index: 999999 !important;
      transform: translate(-50%, -50%) !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    `;

    // Wait for DOM to be ready
    function initCursor() {
      document.body.appendChild(circle);
      document.body.appendChild(dot);
      console.log('Cursor elements added to DOM');

      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let circleX = mouseX;
      let circleY = mouseY;

      // Track mouse position
      document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update dot position immediately
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
      }, { passive: true });

      // Animation loop for smooth circle following
      let animationId;
      function animate() {
        // Circle follows with slight delay (smooth lag)
        circleX += (mouseX - circleX) * 0.15;
        circleY += (mouseY - circleY) * 0.15;

        circle.style.left = circleX + 'px';
        circle.style.top = circleY + 'px';

        animationId = requestAnimationFrame(animate);
      }
      animate();

      // Handle mouse down (click)
      document.addEventListener('mousedown', function() {
        circle.style.width = '30px';
        circle.style.height = '30px';
      });

      document.addEventListener('mouseup', function() {
        circle.style.width = '40px';
        circle.style.height = '40px';
      });

      // Handle hover on interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select, [role="button"], label');
      interactiveElements.forEach(function(el) {
        el.addEventListener('mouseenter', function() {
          circle.style.width = '60px';
          circle.style.height = '60px';
          circle.style.backgroundColor = 'rgba(0, 218, 243, 0.1)';
        });
        el.addEventListener('mouseleave', function() {
          circle.style.width = '40px';
          circle.style.height = '40px';
          circle.style.backgroundColor = 'transparent';
        });
      });

      // Handle visibility change (pause when tab hidden)
      document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
          circle.style.opacity = '0';
          dot.style.opacity = '0';
        } else {
          circle.style.opacity = '1';
          dot.style.opacity = '1';
        }
      });
    }

    // Initialize immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCursor);
    } else {
      initCursor();
    }
  } catch (error) {
    console.error('Cursor initialization error:', error);
  }
})();
