// Copy Button Functionality
document.querySelectorAll(".copy-btn").forEach(button => {
  button.addEventListener("click", () => {
    const code = button.previousElementSibling.innerText;
    navigator.clipboard.writeText(code).then(() => {
      button.innerText = "Copied!";
      setTimeout(() => button.innerText = "Copy", 1500);
    });
  });
});

// Learn More Toggle
document.querySelectorAll(".learn-btn").forEach(button => {
  button.addEventListener("click", () => {
    const hiddenContent = button.nextElementSibling;
    hiddenContent.style.display =
      hiddenContent.style.display === "block" ? "none" : "block";

    button.innerText =
      hiddenContent.style.display === "block" ? "Show Less" : "Learn More";
  });
});
