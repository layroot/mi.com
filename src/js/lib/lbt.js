import Swiper from './swiper-bundle.js';
var mySwiper = new Swiper('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // 如果需要滚动条
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    autoplay: true, //自动切换
})
var mySwiper2 = new Swiper('.swiper-container2', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination2',
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next2',
        prevEl: '.swiper-button-prev2',
    },

    // 如果需要滚动条
    scrollbar: {
        el: '.swiper-scrollbar2',
    },
    autoplay: false, //自动切换
    sliderPerView: 4,
})
export { mySwiper };
export { mySwiper2 };