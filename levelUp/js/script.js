window.addEventListener('DOMContentLoaded', () => {

    const sliderWrapper = document.querySelector('.reviews__slider-wrapper'),
        slider = document.querySelector('.reviews__slider'),
        slide = document.querySelectorAll('.reviews__slide'),
        slidesField = document.querySelector('.reviews__slider-inner'),
        width = window.getComputedStyle(sliderWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    slidesField.style.width = 200 * slide.length + '%'; //Помещаем все слайды на страницу
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    sliderWrapper.style.overflow = 'hidden'; //ограничили область видимости
    
    //Установили слайдам одинаковую ширину
    //Задаем ширину картинкам из sliderWrapper 
    slide.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slide.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); //Устанавливаем атрибут и нумерацию
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #000;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        
        if ( i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot); //Для того чтобы работать с массивом
    }
    
    function crop(str) {
        return +str.replace(/\D/g, '');
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            //Получаем атрибут
            const slideTo = e.target.getAttribute('data-slide-to');

            //Кликнули на 4 будет 4
            slideIndex = slideTo;
            offset = crop(width) * (slideTo - 1);
            //Смещение слайдера
            slidesField.style.transform = `translateX(-${offset}px)`;

            //Выделение точек
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
});