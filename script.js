// Control de la música
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('birthday-song');
  const musicToggle = document.getElementById('musicToggle');
  
  if (audio && musicToggle) {
    audio.volume = 0.20;
    let isPlaying = false;
    
    musicToggle.addEventListener('click', () => {
      if (isPlaying) {
        audio.pause();
        musicToggle.textContent = '🎵 Reproducir Música';
        musicToggle.classList.remove('playing');
        isPlaying = false;
      } else {
        audio.play().then(() => {
          musicToggle.textContent = '⏸️ Pausar Música';
          musicToggle.classList.add('playing');
          isPlaying = true;
        }).catch(e => {
          console.log('Error reproduciendo música:', e);
          alert('No se pudo reproducir la música. Verifica que el archivo existe.');
        });
      }
    });
    
    // Mostrar una notificación amigable
    setTimeout(() => {
      if (!isPlaying) {
        musicToggle.style.animation = 'musicPulse 1.5s ease-in-out 3';
      }
    }, 2000);
  }
});

// Control del álbum con efecto suave y confiable
document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  const prevBtn = document.getElementById('prevPage');
  const nextBtn = document.getElementById('nextPage');
  let currentPage = 0;
  let isAnimating = false;

  // Sonido de voltear página
  const pageFlipSound = new Audio('assets/page-flip.mp3');
  pageFlipSound.volume = 0.5;

  function showOnlyCurrentPage() {
    pages.forEach((page, idx) => {
      // Limpiar todas las clases de animación
      page.classList.remove('active', 'photo-flipping-forward', 'photo-flipping-backward');
      
      // Solo mostrar la página actual
      if (idx === currentPage) {
        page.classList.add('active');
      }
    });
  }

  function updateButtons() {
    prevBtn.disabled = currentPage === 0 || isAnimating;
    nextBtn.disabled = currentPage === pages.length - 1 || isAnimating;
  }

  function playSound() {
    pageFlipSound.currentTime = 0;
    pageFlipSound.play().catch(e => console.log('Error reproduciendo sonido:', e));
  }

  function goToNextPage() {
    if (isAnimating || currentPage >= pages.length - 1) return;
    
    isAnimating = true;
    updateButtons();
    playSound();
    
    // Efecto de salida en la foto actual
    pages[currentPage].classList.add('photo-flipping-forward');
    
    // Cambiar a la siguiente página
    setTimeout(() => {
      currentPage++;
      showOnlyCurrentPage();
      isAnimating = false;
      updateButtons();
      console.log('Página actual:', currentPage);
    }, 600); // Tiempo ajustado a la animación CSS
  }

  function goToPreviousPage() {
    if (isAnimating || currentPage <= 0) return;
    
    isAnimating = true;
    updateButtons();
    playSound();
    
    // Cambiar inmediatamente a la página anterior
    currentPage--;
    showOnlyCurrentPage();
    
    // Efecto de entrada desde atrás
    pages[currentPage].classList.add('photo-flipping-backward');
    
    // Limpiar animación
    setTimeout(() => {
      pages[currentPage].classList.remove('photo-flipping-backward');
      isAnimating = false;
      updateButtons();
      console.log('Página actual:', currentPage);
    }, 600); // Tiempo ajustado
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', goToPreviousPage);
    nextBtn.addEventListener('click', goToNextPage);

    // Inicializar
    showOnlyCurrentPage();
    updateButtons();
    console.log('Álbum inicializado con', pages.length, 'páginas');
  }
});
  