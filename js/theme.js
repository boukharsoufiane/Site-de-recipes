"use strict";

document.addEventListener("DOMContentLoaded", function () {
    /* ===============================================================
		HERO SLIDER
	=============================================================== */
    var heroSlider = new Swiper(".hero-slider", {
        autoPlay: true,
        loop: true,
        parallax: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    /* ===============================================================
		DISHES SLIDER
	=============================================================== */
    var dishesSlider = new Swiper(".dishes-slider", {
        slidesPerView: 3,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
    });

    
});
