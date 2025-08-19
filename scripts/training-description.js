document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      header.classList.toggle('active');

      if (content.style.maxHeight) {
          content.style.maxHeight = null;
          content.classList.remove('open');
      } else {
          document.querySelectorAll('.accordion-content').forEach(c => {
              c.style.maxHeight = null;
              c.classList.remove('open');
              c.previousElementSibling.classList.remove('active');
          });
          content.style.maxHeight = content.scrollHeight + "px";
          content.classList.add('open');
      }
  });
});
