$(document).ready(function () {
  $('.slider-marquee_component').each(function () {
    // Function to determine the speed based on screen width
    function getAttributeValueForCurrentDevice(element, attributePrefix, defaultValue) {
      const screenWidth = $(window).width();
      if (screenWidth >= 992) {
        return element.attr(attributePrefix + '-desktop') || defaultValue;
      }
      if (screenWidth >= 768 && screenWidth < 992) {
        return element.attr(attributePrefix + '-tablet') || defaultValue;
      }
      if (screenWidth >= 478 && screenWidth < 768) {
        return element.attr(attributePrefix + '-mobile-landscape') || defaultValue;
      }
      return element.attr(attributePrefix + '-mobile-portrait') || defaultValue;
    }

    // Retrieve the speed and spaceBetween values for the current device
    const speedValue = getAttributeValueForCurrentDevice($(this), 'speed', 11000);
    const spaceBetweenValue = getAttributeValueForCurrentDevice($(this), 'space-between', 60);

    // Initialize the slider with the speed and spaceBetween values
    const swiper = initializeSwiper($(this), speedValue, spaceBetweenValue);

    // Adjust the speed and spaceBetween when resizing the window
    $(window).on('resize', function () {
      const newSpeed = getAttributeValueForCurrentDevice($(this), 'speed', 11000);
      const newSpaceBetween = getAttributeValueForCurrentDevice($(this), 'space-between', 60);
      swiper.params.speed = newSpeed;
      swiper.params.spaceBetween = newSpaceBetween;
      swiper.update();
    });

    // Function to initialize the Swiper
    function initializeSwiper(element, speed, spaceBetween) {
      return new Swiper(element.find('.swiper')[0], {
        spaceBetween: spaceBetween,
        slidesPerView: 'auto',
        grabCursor: true,
        a11y: false,
        freeMode: true,
        speed: speed,
        loop: true,
        allowTouchMove: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
      });
    }

    // Pause on hover functionality
    if ($(this).attr('pause-on-hover') === 'true') {
      $(this)
        .find('.swiper')
        .hover(
          function () {
            swiper.autoplay.stop();
          },
          function () {
            swiper.autoplay.start();
          }
        );
    }
  });
});
