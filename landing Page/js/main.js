$(window).load(function () {
  $(".before-after").twentytwenty({
    before_label: 'Без скинали',
    after_label: 'Со скинали'
  });

  $('.before-slider').slick({
    draggable: false,   // не перелистывается
    dots: true,  // кнопки
    dotsClass: 'before-slider__dots',
    prevArrow: $('.arrow-left'),
    nextArrow: $('.arrow-right')
  });

  $('.menu-button').on('click', function () {
    $('.menu').toggleClass('menu_active');
  });

  $("a[href^='#']").click(function() {
    var _href = $(this).attr('href');
    $('html, body').animate({ scrollTop: $(_href).offset().top -140 + 'px'});
    return false;
  });
  $('input[type="tel"]').mask("+7 (999) 999-99-99");

  // Показывать карту только когда докрутили до нее
  var reviews = $('#reviews');
  // отсчитывать кол-во пикселей прокрученное до элемента reviewsTop
  var reviewsTop = reviews.offset().top;
  // когда мы прокручиваем сайт
  $(window).bind('scroll', function() {
    var windowTop = $(this).scrollTop();
    if(windowTop > reviewsTop) {
      $('#map').html('<script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A4be25906272f5dc0e1bd671c996edfc3f14d2a152450c609b7006565f2e3584b&amp;width=100%25&amp;height=410&amp;lang=ru_RU&amp;scroll=false"></script>');
      $(window).unbind('scroll');
    }
  });
});
