const swiper = new Swiper(".memberSwiper", {

    loop: true,

    autoplay: {

        delay: 2500,

        disableOnInteraction: false,

    },

    spaceBetween: 30,

    navigation: {

        nextEl: ".swiper-button-next",

        prevEl: ".swiper-button-prev",

    },

    breakpoints: {

        320: {

            slidesPerView: 1,

        },

        768: {

            slidesPerView: 2,

        },

        1024: {

            slidesPerView: 4,

        }

    }

});