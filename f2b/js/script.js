
document.addEventListener( 'DOMContentLoaded', function() {
    var splide = new Splide( '.splide_logo', {
        updateOnMove: true,
        type: 'loop',
        drag   : false,
        rewind: true,
        arrows: false,
        speed: 6000,
        pagination: false,
        autoplay: true,
        interval: 3000, 
        pauseOnHover: true, 
        gap: '40px',
        focus  : 'center',
        fixedWidth: '278px', 
        fixedHeight: '278px',
        breakpoints: {
            767: {
                gap: '12px',
                fixedWidth: '125px', 
                fixedHeight: '125px'
            },
            1023: {
                gap: '30px',
                fixedWidth: '208px', 
                fixedHeight: '208px'
            },
        }
    });

    splide.on('active', function(slide) {
        // Cчетчик под главным слайдом
        var currentIndex = (slide.index + 1) % splide.length;
        currentIndex = currentIndex < 0 ? currentIndex + splide.length : currentIndex;
        var indexToShow = currentIndex === 0 ? splide.length : currentIndex; // Если индекс 0, показываем последний слайд
        document.querySelector('.current-slide').textContent = indexToShow.toString().padStart(2, '0');
        document.querySelector('.total-slides').textContent = splide.length.toString().padStart(2, '0'); 
    });

    // При загрузке устанавливаем начальную ширину полосы прогресса
    splide.on('mounted', function() {
        document.querySelector('.splide_logo-progress').style.width = (1 / splide.length) * 100 + '%'; 
    });

    // Устанавливаем ширину полосы прогресса при смене слайда
    splide.on('move', function(index) {
        document.querySelector('.splide_logo-progress').style.width = ((index + 1) / splide.length) * 100 + '%'; 
    });

    splide.mount();
    
    document.querySelector('.splide_logo .splide__track').classList.remove('hidden');

    // Обновляем позицию слайдера через небольшой тайм-аут после монтирования
    setTimeout(function() {
        document.querySelector('.splide_logo').style.visibility = 'visible'; // Показываем слайдер после инициализации
        splide.refresh(); // Обновляем слайдер
    }, 100);

    document.querySelector('.splide_logo .splide__list').addEventListener('click', function(event) {
        var slide = event.target.closest('.splide__slide');
        if (slide) {
            var slideContentImg = slide.querySelector('.splide__slide-content img');
            slideContentImg.style.transform = 'scale(1)'; 
            slide.addEventListener('mouseenter', function() {
                slideContentImg.style.transform = 'scale(1.25)'; 
            });
            slide.addEventListener('mouseleave', function() {
                slideContentImg.style.transform = 'scale(1)'; 
            });
            var index = parseInt(slide.getAttribute('data-index'));
            splide.go(index);
        }
    });

});


//Функция обновления счетчика
function updateCounter(index) {
    var currentIndex = (parseInt(index) + 1).toString().padStart(2, '0');
    var totalCount = document.querySelector('.popUp').querySelectorAll('.splide__slide').length.toString().padStart(2, '0');
    document.querySelector('.splide_content-counter').innerText = currentIndex + ' / ' + totalCount;
}

// Функция для обновления адреса почты
function updateEmail(index) {
    document.querySelector('.popUp-pochta a').innerText = emails[index];
    document.querySelector('.popUp-pochta a').setAttribute('href', 'mailto:' + emails[index]);
}

// Функция для обновления ссылки VK
function updateVkLink(index) {
    document.querySelector('.popUp-vk').setAttribute('href', vkLinks[index]);
}

// Функция для обновления ссылки Telegram
function updateTgLink(index) {
    document.querySelector('.popUp-tg').setAttribute('href', tgLinks[index]);
}
    

var prevSvg = document.querySelector('.splide_content-prev');
var nextSvg = document.querySelector('.splide_content-next');

// Функция для обновления состояния стрелок
function updateSvgOpacity(index) {
    // если находится на первом слайде
    if (index == 0) { 
        prevSvg.style.opacity = '0.2';
        prevSvg.classList.remove('cursor-pointer');
        document.querySelector('.splide_content-prev svg').classList.remove('group-hover:stroke-[#37DEFD]');
    } else {
        prevSvg.style.opacity = '1';
        prevSvg.classList.add('cursor-pointer');
        document.querySelector('.splide_content-prev svg').classList.add('group-hover:stroke-[#37DEFD]');
    }

    // если находится на последнем слайде
    if (index == document.querySelector('.popUp').querySelectorAll('.splide_content .splide__slide').length - 1) { 
        nextSvg.style.opacity = '0.2';
        nextSvg.classList.remove('cursor-pointer');
        document.querySelector('.splide_content-next svg').classList.remove('group-hover:stroke-[#37DEFD]');
    } else {
        nextSvg.style.opacity = '1';
        nextSvg.classList.add('cursor-pointer');
        document.querySelector('.splide_content-next svg').classList.add('group-hover:stroke-[#37DEFD]');
    }
}

function handleSlideClick(slide) {
    if (slide.classList.contains('is-active')) {
        var index = parseInt(slide.getAttribute('data-index'));
        currentIndex = index;
        // Функция для обработки клика на кнопке
        function handleButtonClick(offset) {
            return function() {
                if ((offset === -1 && prevSvg.style.opacity !== '0.2') || (offset === 1 && nextSvg.style.opacity !== '0.2')) {
                    
                    var totalCount = document.querySelector('.popUp').querySelectorAll('.splide__slide').length;
                    currentIndex = (currentIndex + offset + totalCount) % totalCount;
                    splideContent.go(currentIndex);
                    updateCounter(currentIndex);
                    updateEmail(currentIndex);
                    updateVkLink(currentIndex);
                    updateTgLink(currentIndex);
                    updateSvgOpacity(currentIndex);
                }
            };
        }

        // Убедимся, что обработчики добавляются только один раз
        if (!prevSvg.hasListener) {
            prevSvg.addEventListener('click', handleButtonClick(-1));
            prevSvg.hasListener = true;
        }
        if (!nextSvg.hasListener) {
            nextSvg.addEventListener('click', handleButtonClick(1));
            nextSvg.hasListener = true;
        }

        updateCounter(index);
        updateEmail(index);
        updateVkLink(index); 
        updateTgLink(index);
        updateSvgOpacity(index);

        setTimeout(function() {
            openPopup(index);
        }, 0.5);
    }
}

document.addEventListener( 'DOMContentLoaded', function() {
    var splide = new Splide( '.splide_content', {
        perPage: 1,
        pagination: false,
        arrows: false
    });

    splide.mount();

    // Обновляем при переключении слайдов
    splide.on('moved', function() {
        var index = splide.index; 
        updateCounter(index);
        updateEmail(index);
        updateVkLink(index);
        updateTgLink(index);
        updateSvgOpacity(index);
    });

});


var splideContent = new Splide('.splide_content');
var activeSlideIndex; 
splideContent.mount();

function openPopup(index) {

    // Используем requestAnimationFrame, чтобы дать браузеру время отрисовать элемент
    requestAnimationFrame(() => {
        positionCloseButton();
    });

    var slideCount = splideContent.Components.Elements.slides.length;
    if (index >= 0 && index < slideCount) {
        splideContent.go(index);
        activeSlideIndex = index;
        setTimeout(function() {
            splideContent.refresh();
        }, 0.5); 
        document.querySelector('.popUp').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', function() {
        setTimeout(function() {
            var currentSlideIndex = splideContent.index; // Получаем текущий индекс слайда
            splideContent.refresh();
            splideContent.go(currentSlideIndex); // Устанавливаем текущий индекс после обновления
        }, 0.5); 
    });
}

function closePopup() {
    document.querySelector('.popUp').classList.add('hidden');
    document.body.style.overflow = 'auto';
    document.querySelector('.popUp').querySelectorAll('.splide__slide').forEach(function(slide) {
        slide.classList.remove('is-active');
    });
}

document.addEventListener("click", function(event) {
    // Проверяем, был ли клик вне области splide_content
    if (!document.querySelector('.splide_content').contains(event.target)) {
        closePopup(); 
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closePopup(); 
    }
});


document.addEventListener('DOMContentLoaded', ()=> {
    const options = {
        root: null, //в качестве корневого элемента используется viewport (область просмотра)
        rootMargin: '0px',
        threshold: 1 //означает, что наблюдатель срабатывает, когда элемент полностью находится в области видимости
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const step = entry.target
            
            //Если элемент видим в области просмотра
            if (entry.isIntersecting) {
                step.classList.add('is-active')
            }
            else {
                //Если нет следующего соседнего элемента
                if (!step.nextElementSibling) {
                    step.classList.remove('is-active')
                }
                else {
                    if (!step.nextElementSibling.classList.contains('is-active')) {
                        // Если верхняя граница элемента находится ниже верхней границы viewport
                        if (step.getBoundingClientRect().top > 0) step.classList.remove('is-active')                                
                    }
                }
            }
        })
    }, options)

    document.querySelectorAll('.step').forEach(step => {
        observer.observe(step)
        
        //Если верхняя граница элемента находится выше или на уровне верхней границы viewport
        if (step.getBoundingClientRect().top <= 0) {
            step.classList.add('is-active')
        }
    })

})

function toggleLanguageBlock() {
    var languageBlock = document.querySelector('.language-block');

    languageBlock.classList.toggle('rounded-b-[16px]');
    document.querySelector('.language-choice').classList.toggle('hidden');

    if (languageBlock.classList.contains('gradient-background-language-en')) {
        languageBlock.classList.remove('gradient-background-language-en');
        languageBlock.classList.add('gradient-background-language');
        languageBlock.classList.add('bg-opacity-20', 'bg-[#CCA4FB]');
    } else {
        languageBlock.classList.remove('gradient-background-language');
        languageBlock.classList.remove('bg-opacity-20', 'bg-[#CCA4FB]');
        languageBlock.classList.add('gradient-background-language-en');
    }
}

var isPreviousLanguageEn = true; // Инициализация предположения, что предыдущий язык был "en"

function changeLanguage(event) {
    document.querySelector('.language-choice-py').innerText = event.target.innerText;

    if (isPreviousLanguageEn) {
        document.querySelector('.language-choice-en').innerText = 'py';
    } else {
        document.querySelector('.language-choice-en').innerText = 'en';
    }

    isPreviousLanguageEn = !isPreviousLanguageEn; // Обновляем значение предположения о предыдущем языке
}

// Функция, которая проверяет, находится ли элемент внутри указанного контейнера
function isDescendant(container, element) {
    return container.contains(element);
}

// Обработчик клика на всё окно
document.addEventListener('click', function(event) {
    var languageBlock = document.querySelector('.language-block');
    var languageChoice = document.querySelector('.language-choice');

    if (!isDescendant(languageBlock, event.target) && !isDescendant(languageChoice, event.target)) {
        // Проверяем текущее состояние, чтобы применить нужные классы
        if (!languageChoice.classList.contains('hidden')) {
            languageBlock.classList.add('rounded-b-[16px]', 'bg-opacity-20', 'bg-[#CCA4FB]');
            languageBlock.classList.remove('gradient-background-language-en');
            languageBlock.classList.add('gradient-background-language');
            languageChoice.classList.add('hidden');
        }
    }
});



function positionCloseButton() {
    var button = document.getElementById('closeButton');
    var slider = document.getElementById('slider');
    if (!button || !slider) return;
    
    var sliderRect = slider.getBoundingClientRect();
    var offset;

    if (window.innerWidth >= 1024) {
        offset = 60;
    } else if (window.innerWidth >= 640) {
        offset = 76;
    } else {
        offset = 36;
    }

    button.style.right = `calc(${window.innerWidth - sliderRect.right + offset}px)`;
}

document.addEventListener('DOMContentLoaded', function() {
    positionCloseButton(); 
    window.addEventListener('resize', positionCloseButton);
});

