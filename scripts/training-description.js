// document.querySelectorAll('.accordion-header').forEach(header => {
//   header.addEventListener('click', () => {
//       const content = header.nextElementSibling;
//       header.classList.toggle('active');

//       if (content.style.maxHeight) {
//           content.style.maxHeight = null;
//           content.classList.remove('open');
//       } else {
//           document.querySelectorAll('.accordion-content').forEach(c => {
//               c.style.maxHeight = null;
//               c.classList.remove('open');
//               c.previousElementSibling.classList.remove('active');
//           });
//           content.style.maxHeight = content.scrollHeight + "px";
//           content.classList.add('open');
//       }
//   });
// });


// // ---------------------+--------------------
// const buttons = document.querySelectorAll(".collapsible");

// buttons.forEach(btn => {
//   btn.addEventListener("click", () => {
//     // Close all sections
//     buttons.forEach(b => {
//       if (b !== btn) {
//         b.classList.remove("active");
//         b.nextElementSibling.classList.remove("show");
//       }
//     });

//     // Toggle the clicked one
//     btn.classList.toggle("active");
//     btn.nextElementSibling.classList.toggle("show");
//   });
// });

// ----------------------------changes in animations------------

// Enhanced Training Description JavaScript - Based on original structure
// Accordion functionality with smooth animations
let isAnimating = false;

document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    if (isAnimating) return;
    
    const content = header.nextElementSibling;
    const isCurrentlyActive = header.classList.contains('active');
    
    isAnimating = true;
    
    // Close all other accordions with smooth animation
    document.querySelectorAll('.accordion-content').forEach(c => {
      const h = c.previousElementSibling;
      if (c !== content && h.classList.contains('active')) {
        closeAccordionSmooth(h, c);
      }
    });
    
    // Toggle current accordion
    if (isCurrentlyActive) {
      closeAccordionSmooth(header, content);
    } else {
      openAccordionSmooth(header, content);
    }
    
    // Reset animation lock after transition
    setTimeout(() => {
      isAnimating = false;
    }, 600);
  });
  
  // Add accessibility attributes
  header.setAttribute('role', 'button');
  header.setAttribute('tabindex', '0');
  header.setAttribute('aria-expanded', 'false');
  
  // Keyboard support
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      header.click();
    }
  });
});

// Smooth opening function
function openAccordionSmooth(header, content) {
  header.classList.add('active');
  header.setAttribute('aria-expanded', 'true');
  
  // Get natural height
  content.style.maxHeight = 'none';
  const naturalHeight = content.scrollHeight;
  content.style.maxHeight = '0';
  
  // Force reflow
  content.offsetHeight;
  
  // Start animation
  content.classList.add('open');
  content.style.maxHeight = naturalHeight + 'px';
  
  // Animate child elements with stagger
  animateChildElements(content, true);
  
  // Smooth scroll to accordion
  setTimeout(() => {
    header.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }, 200);
  
  // Reset max-height after animation
  setTimeout(() => {
    if (header.classList.contains('active')) {
      content.style.maxHeight = 'none';
    }
  }, 600);
}

// Smooth closing function
function closeAccordionSmooth(header, content) {
  header.classList.remove('active');
  header.setAttribute('aria-expanded', 'false');
  
  // Set current height
  content.style.maxHeight = content.scrollHeight + 'px';
  
  // Force reflow
  content.offsetHeight;
  
  // Animate child elements out
  animateChildElements(content, false);
  
  // Start closing animation
  requestAnimationFrame(() => {
    content.style.maxHeight = '0';
    
    setTimeout(() => {
      content.classList.remove('open');
    }, 600);
  });
}

// Animate child elements with stagger effect
function animateChildElements(container, isOpening) {
  const childElements = container.querySelectorAll('.mods, .enrol-btn, img, .modules, .level-1');
  
  childElements.forEach((element, index) => {
    if (isOpening) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 100 + (index * 80));
    } else {
      element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      element.style.opacity = '0';
      element.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        if (!container.classList.contains('open')) {
          element.style.opacity = '';
          element.style.transform = '';
          element.style.transition = '';
        }
      }, 400);
    }
  });
}

// Enhanced collapsible functionality - Based on original structure
const buttons = document.querySelectorAll(".collapsible");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const isCurrentlyActive = btn.classList.contains("active");
    
    // Close all other sections with smooth animation
    buttons.forEach(b => {
      if (b !== btn && b.classList.contains("active")) {
        closeCollapsibleSmooth(b);
      }
    });

    // Toggle the clicked one
    if (isCurrentlyActive) {
      closeCollapsibleSmooth(btn);
    } else {
      openCollapsibleSmooth(btn);
    }
  });
  
  // Add accessibility
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('role', 'button');
  
  // Keyboard support
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });
});

// Smooth collapsible opening
function openCollapsibleSmooth(button) {
  const content = button.nextElementSibling;
  
  button.classList.add("active");
  button.setAttribute('aria-expanded', 'true');
  content.classList.add("show");
  
  // Smooth fade in animation
  content.style.opacity = '0';
  content.style.transform = 'translateY(-10px)';
  content.style.display = 'block';
  
  requestAnimationFrame(() => {
    content.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
  });
}

// Smooth collapsible closing
function closeCollapsibleSmooth(button) {
  const content = button.nextElementSibling;
  
  button.classList.remove("active");
  button.setAttribute('aria-expanded', 'false');
  
  content.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  content.style.opacity = '0';
  content.style.transform = 'translateY(-10px)';
  
  setTimeout(() => {
    content.classList.remove("show");
    content.style.display = 'none';
    content.style.opacity = '';
    content.style.transform = '';
    content.style.transition = '';
  }, 300);
}

// Enhanced animations and performance optimizations
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth entrance animations to accordion items
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  // Observe accordion items for scroll animations
  accordionItems.forEach((item, index) => {
    // Add staggered entrance delay
    item.style.animationDelay = `${index * 0.1}s`;
    observer.observe(item);
  });

  // Enhanced hover effects for accordion headers
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('mouseenter', () => {
      if (!header.classList.contains('active') && !isAnimating) {
        header.style.transform = 'translateX(8px)';
        header.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      }
    });
    
    header.addEventListener('mouseleave', () => {
      if (!header.classList.contains('active')) {
        header.style.transform = 'translateX(0)';
      }
    });
  });

  // Add click ripple effect to buttons
  function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(220, 20, 60, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
      `;
      
      element.style.position = 'relative';
      element.style.overflow = 'hidden';
      element.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  // Add ripple effects to interactive elements
  document.querySelectorAll('.enrol-btn, .accordion-header, .collapsible').forEach(addRippleEffect);

  // Performance optimization for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
    document.body.classList.add('reduced-motion');
  }
  
  prefersReducedMotion.addEventListener('change', () => {
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.1s');
      document.body.classList.add('reduced-motion');
    } else {
      document.documentElement.style.setProperty('--animation-duration', '0.4s');
      document.body.classList.remove('reduced-motion');
    }
  });

  console.log('✨ Enhanced Training Description animations loaded successfully!');
});

// Add CSS for ripple animation
const rippleCSS = document.createElement('style');
rippleCSS.textContent = `
  @keyframes rippleEffect {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  /* Reduced motion styles */
  .reduced-motion * {
    animation-duration: 0.1s !important;
    animation-delay: 0s !important;
    transition-duration: 0.1s !important;
  }
`;
document.head.appendChild(rippleCSS);



// --------------------------------------------------
// Auto-open based on URL hash (#id)
document.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash;
  if (hash) {
    const targetItem = document.querySelector(hash);
    if (targetItem) {
      const header = targetItem.querySelector(".accordion-header");
      const content = header.nextElementSibling;

      // Open the accordion smoothly
      openAccordionSmooth(header, content);

      // Scroll into view
      setTimeout(() => {
        targetItem.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }
});
