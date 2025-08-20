// document.getElementById('copy-btn').addEventListener('click', () => {
//   const upiId = document.getElementById('upi-id').innerText;
  
//   navigator.clipboard.writeText(upiId)
//     .then(() => {
//       alert('UPI ID copied to clipboard!');
//     })
//     .catch(() => {
//       alert('Failed to copy UPI ID.');
//     });
// });

document.getElementById('copy-btn').addEventListener('click', () => {
  const upiId = document.getElementById('upi-id').innerText;

  navigator.clipboard.writeText(upiId)
    .then(() => {
      const popup = document.getElementById('copy-popup');
      popup.classList.add('show');

      // Hide after 2 seconds
      setTimeout(() => {
        popup.classList.remove('show');
      }, 2000);
    })
    .catch(() => {
      alert('Failed to copy UPI ID.');
    });
});

