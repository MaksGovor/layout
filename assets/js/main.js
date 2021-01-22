$(function() {

  const header = $('#header');
  const introH = $('#intro').innerHeight();
  let scrollOffset = $(window).scrollTop();


  // Header fixed

  function checkScroll(scrollOffset) {
    const fixator = 'fixed';

    if( scrollOffset >= introH ) {
      header.addClass(fixator);
    } else {
      header.removeClass(fixator);
    }
  }

  checkScroll(scrollOffset);

  $(window).on('scroll', () => {
    scrollOffset = $(this).scrollTop();

    checkScroll(scrollOffset);
  });

  // Smooth scroll

  $('[data-scroll]').on('click', function(event) {
    event.preventDefault();
    const link = $(this);
    const blockId = link.data('scroll');
    const blockOffset = $(blockId).offset().top;

    $('#nav a').removeClass('active');
    link.addClass('active');

    $('html, body').animate({
      scrollTop: blockOffset,
    }, 500);
  })

  // Menu nav toggle

  $('#nav_toggle').on('click', function(event) {
    event.preventDefault();

    $('#nav').toggleClass('active');
    $(this).toggleClass('active');
  });

  // Collapse

  $('[data-collapse]').on('click', function(event) {
    event.preventDefault();
    
    const accordionItem = $(this);
    const blockId = accordionItem.data('collapse');

    accordionItem.toggleClass('active');
  });

  // Slider

  $('[data-slider]').slick({
    infinity: true,
    fade: false,
    slidesToShow: 1,
    slidesToScroll: 1
  })

});