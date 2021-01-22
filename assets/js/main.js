$(function() {

  const nav = $('nav');
  const navHeight = nav.outerHeight();

  const header = $('#header');
  const introH = $('#intro').innerHeight();
  let scrollOffset = $(window).scrollTop();

  // Activate sections

  function activateCurrentSection(pos) {
    let id; 
    const sections = $('.nav_menu');
  
    const lastSection = sections[sections.length-1];
    const lastSectionTooSmall = $(lastSection).height() < $(window).height();
  
    if (lastSectionTooSmall) {
      const lastSectionTopPos = $(lastSection).offset().top;
      const lastSectionTriggerPos = $(window).height() + $(document).scrollTop() - ($(lastSection).height()/2);
      var lastSectionInView = lastSectionTriggerPos > lastSectionTopPos;
    }
  
    if (lastSectionTooSmall && lastSectionInView) {
      id = $(lastSection).attr('id');
    } else { 
  
      sections.each(function() {
        const top = $(this).offset().top - navHeight;
        const bottom = top + $(this).outerHeight();
  
        if (pos >= top && pos <= bottom) {
      id = $(this).attr('id');
        }
      });
    }
  
    if (id) {
      nav.find('a').removeClass('active');
      nav.find('a[href="#' + id + '"]').addClass('active');
    }
  }

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
    activateCurrentSection(scrollOffset);
  });

  // Smooth scroll

  $('[data-scroll]').on('click', function(event) {
    event.preventDefault();
    const link = $(this);
    const blockId = link.data('scroll');
    const blockOffset = $(blockId).offset().top - navHeight + 5;

    $('#nav a').removeClass('active');
    link.addClass('active');

    $('html, body').animate({
      scrollTop: blockOffset,
    }, 500);

    $('#nav').removeClass('active');
    $('#nav_toggle').removeClass('active');
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
