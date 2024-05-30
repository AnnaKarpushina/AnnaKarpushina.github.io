document.addEventListener('DOMContentLoaded', function() {
    var splideLogo = new Splide('.splide_logo', {       
        updateOnMove: true,
        type: 'loop',        
        drag: true,         
        arrows: false,
        speed: 700,     
        pagination: false,
        autoplay: true,        
        interval: 6000, 
        pauseOnHover: false,         
        gap: '40px',
        padding: '40%',        
        focus: 'center',
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

    var progressElement = document.querySelector('.splide_logo-progress');
    var interval = splideLogo.options.interval;
    var timer;
    var isPopUpOpen = false;

    function handleMouseEnter() {
        if (!isPopUpOpen) {
            splideLogo.Components.Autoplay.pause();
            stopProgress();
        }
    }

    function handleMouseLeave() {
        if (!isPopUpOpen) {
            splideLogo.Components.Autoplay.play();
            startProgress();
        }
    }

    function addHoverHandlers(slide) {
        slide.addEventListener('mouseenter', handleMouseEnter);
        slide.addEventListener('mouseleave', handleMouseLeave);
    }

    function removeHoverHandlers(slide) {
        slide.removeEventListener('mouseenter', handleMouseEnter);
        slide.removeEventListener('mouseleave', handleMouseLeave);
    }

    splideLogo.on('active', function(slide) {
        addHoverHandlers(slide.slide);

        // Счетчик под главным слайдом
        var currentIndex = (slide.index + 1) % splideLogo.length;
        currentIndex = currentIndex < 0 ? currentIndex + splideLogo.length : currentIndex;
        var indexToShow = currentIndex === 0 ? splideLogo.length : currentIndex; // Если индекс 0, показываем последний слайд
        document.querySelector('.current-slide').textContent = indexToShow.toString().padStart(2, '0');
        document.querySelector('.total-slides').textContent = splideLogo.length.toString().padStart(2, '0'); 
    });

    splideLogo.on('inactive', function(slide) {
        removeHoverHandlers(slide.slide);
    });

    splideLogo.on('mounted move', function() {
        handlePopUp();
    });

    function handlePopUp() {
        var isPopUpHidden = document.querySelector('.popUp').classList.contains('hidden');
        isPopUpOpen = !isPopUpHidden; 
        var activeSlide = document.querySelector('.splide__slide.is-active');

        function isCursorOnActiveSlide() {
            // Проверка, находится ли курсор на активном слайде
            return activeSlide && activeSlide.matches(':hover');
        }
    
        if (isPopUpHidden && !isCursorOnActiveSlide()) {
            splideLogo.Components.Autoplay.play();
            startProgress();
        } else {
            splideLogo.Components.Autoplay.pause();
            stopProgress();
        }
    }

    var observer = new MutationObserver(function(mutationsList) {
        for (var mutation of mutationsList) {
            if (mutation.attributeName === 'class') {
                handlePopUp();
            }
        }
    });
    
    observer.observe(document.querySelector('.popUp'), { attributes: true });
    
    function startProgress() {
        clearInterval(timer); 
        progressElement.style.transition = 'width 0s'; 
        progressElement.style.width = '0%'; 
        
        setTimeout(function() {
            progressElement.style.transition = 'width ' + interval + 'ms linear';
            progressElement.style.width = '100%'; 
            progressElement.classList.add('border-2');
        }, 0); 

        timer = setInterval(function() {
            progressElement.style.transition = 'width 0s';
            progressElement.style.width = '0%';
        }, interval); 
    }

    function stopProgress() {
        clearInterval(timer);
        progressElement.style.transition = 'width 0s';
        progressElement.style.width = progressElement.style.width; 
        progressElement.classList.remove('border-2');
    }

    splideLogo.mount();
    
    document.querySelector('.splide_logo .splide__track').classList.remove('hidden');

    setTimeout(function() {
        document.querySelector('.splide_logo').style.visibility = 'visible';
        splideLogo.refresh();
    }, 100);

    document.querySelector('.splide_logo .splide__list').addEventListener('click', function(event) {
        var slide = event.target.closest('.splide__slide');
        if (slide) {
            var index = parseInt(slide.getAttribute('data-index'));
            splideLogo.go(index);
        }
    });

    document.querySelector('.popUp').addEventListener('transitionend', handlePopUp);
    
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
    document.querySelector('.popUp-pochta a').setAttribute('href', 'https://' + emails[index]);
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

var splideContent = new Splide('.splide_content', {
    perPage: 1,
    pagination: false,
    arrows: false,
    rewind: false,
    drag: false
});

var activeSlideIndex; 
splideContent.mount();


function openPopup(index) {

    document.getElementById('closeButton').style.display = 'none';

    // Используем requestAnimationFrame, чтобы дать браузеру время отрисовать элемент
    requestAnimationFrame(() => {
        positionCloseButton();
        document.getElementById('closeButton').style.display = '';
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
    if (!document.querySelector('.splide_content').contains(event.target)) {
        closePopup(); 
    }
});


////////////////////////////////////////////////////////////////

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

