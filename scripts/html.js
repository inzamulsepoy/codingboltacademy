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
