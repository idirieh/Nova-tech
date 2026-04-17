// Custom Cursor - Circle with Dot
(function() {
  // Only initialize on devices with fine pointer (mouse)
  if (window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  // Create cursor elements
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  
  const circle = document.createElement('div');
  circle.className = 'cursor-circle';
  
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  
  cursor.appendChild(circle);
  cursor.appendChild(dot);
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let circleX = 0;
  let circleY = 0;
  let dotX = 0;
  let dotY = 0;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Animation loop for smooth following
  function animate() {
    // Circle follows with slight delay (smooth lag)
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;
    
    // Dot follows instantly
    dotX = mouseX;
    dotY = mouseY;

    circle.style.left = circleX + 'px';
    circle.style.top = circleY + 'px';
    dot.style.left = dotX + 'px';
    dot.style.top = dotY + 'px';

    requestAnimationFrame(animate);
  }
  animate();

  // Handle mouse down (click)
  document.addEventListener('mousedown', () => {
    cursor.classList.add('cursor-click');
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('cursor-click');
  });

  // Handle hover on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select, [role="button"]');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });

  // Handle dynamically added elements
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (target.closest('a, button, .btn, input, textarea, select, [role="button"]')) {
      cursor.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target;
    if (target.closest('a, button, .btn, input, textarea, select, [role="button"]')) {
      cursor.classList.remove('cursor-hover');
    }
  });

  // Handle visibility change (pause when tab hidden)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cursor.style.opacity = '0';
    } else {
      cursor.style.opacity = '1';
    }
  });
})();
