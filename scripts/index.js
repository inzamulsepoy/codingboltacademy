const buttons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");
const descriptions = document.querySelectorAll("[data-desc]");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from buttons
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.getAttribute("data-category");

        // Show relevant cards
        cards.forEach(card => {
            card.style.display = card.classList.contains(category) ? "block" : "none";
        });

        // Show relevant description
        descriptions.forEach(desc => {
            desc.style.display = desc.getAttribute("data-desc") === category ? "block" : "none";
        });
    });
});

// Show classroom by default
document.querySelector('.filter-btn[data-category="classroom"]').click();


// Navbar Toggle for Mobile
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});





// whatsapp
document.addEventListener("DOMContentLoaded", function () {
    const waWidget = document.querySelector(".wa-widget");
    const waClose = document.querySelector(".wa-close");
  
    // Track if widget was closed in this session
    let closed = false;
  
    function handleScroll() {
      // Only show if user scrolled > 300px AND has not closed it
      if (window.scrollY > 10 && !closed) {
        waWidget.classList.add("wa-show");
      } else {
        waWidget.classList.remove("wa-show");
      }
    }
  
    // Scroll listener
    window.addEventListener("scroll", handleScroll);
  
    // Close button hides widget until page reload
    waClose.addEventListener("click", () => {
      closed = true;
      waWidget.classList.remove("wa-show");
    });
  });
  
  // Show tab after 300px scroll with slide animation
  window.addEventListener("scroll", () => {
    const tab = document.getElementById("quote-tab");
    if (window.scrollY > 10) {
      tab.classList.add("show");
    } else {
      tab.classList.remove("show");
    }
  });
  