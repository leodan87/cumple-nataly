// Efecto de aparición al hacer scroll
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.classList.add('visible');
      } else {
        section.classList.remove('visible');
      }
    });
  });
  
  // Botón de control para la música
  document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('birthday-song');
    audio.volume = 0.20; // Ajusta el volumen
  });
  