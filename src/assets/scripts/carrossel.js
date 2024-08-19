var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  slideIndex += n;
  showSlides(slideIndex);
}

function currentSlide(n) {
  slideIndex += n;
  showSlides(slideIndex);
}

function showSlides(n) {
  var i;

  // @ts-ignore
  var contentArea = tinymce && tinymce.activeEditor ? tinymce.activeEditor.getContentAreaContainer() : null;

  if (contentArea) {
    // @ts-ignore
    var slides = contentArea.querySelectorAll(
      'div:not(.mce-offscreen-selection) > .tiny-carrossel-container .slideshow-container .mySlides',
    );
    // @ts-ignore
    var dots = contentArea.querySelectorAll('div:not(.mce-offscreen-selection) > .tiny-carrossel-container .dot');

    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }

    if (slides[slideIndex - 1]) {
      slides[slideIndex - 1].style.display = 'block';
    }

    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].className += ' active';
    }
  }
}
