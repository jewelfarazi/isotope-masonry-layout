(function($,sr){
  // http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function(func, threshold, execAsap) {
    var timeout;

    return function debounced () {
      var obj = this, args = arguments;
      function delayed () {
        if (!execAsap)
          func.apply(obj, args);
        timeout = null;
      }

      if (timeout)
        clearTimeout(timeout);
      else if (execAsap)
        func.apply(obj, args);

      timeout = setTimeout(delayed, threshold || 50);
    };
  };

  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

(function ($) {

  "use strict";

  // Initiating Isotope
  var $container = $('.projects-list');
  var colWidth = function () {
    var w = $container.width(),
      columnNum = 1,
      columnWidth = 0;
    if (w > 1200) {
      columnNum  = 5;
    } else if (w > 900) {
      columnNum  = 4;
    } else if (w > 600) {
      columnNum  = 3;
    } else if (w > 300) {
      columnNum  = 1;
    }
    columnWidth = Math.floor(w/columnNum);
    columnWidth = columnWidth - 10;
    // Item width
    $container.find('.project-item').each(function() {
      var $item = $(this);
      var multiplier_w = $item.attr('class').match(/item-w(\d)/);
      var width = multiplier_w ? columnWidth*multiplier_w[1]-4 : columnWidth-4;
      // Update item width
      $item.css({
        width: width
      });
    });
    return columnWidth;
  };
  var isotope = function () {
    $container.isotope({
      resizable: false,
      itemSelector: '.project-item',
      masonry: {
        columnWidth: colWidth(),
        gutter: 10
      }
    });
  };

  // Activating Isotope Filter Navigation
  $('#filterNav').on('click', 'li', function () {
    // remove active previous
    $('#filterNav').find('li').removeClass('active');
    // Add active class
    $(this).addClass('active');
    var selector = $(this).attr('data-filter');
    $container.isotope({
      filter: selector
    });
  });

  // Calling Isotope
  isotope();
  $(window).smartresize(isotope);

  // Call after content loading
  $(window).load(function () {
    isotope();
  });

})(jQuery);