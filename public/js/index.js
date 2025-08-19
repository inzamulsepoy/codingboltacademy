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
