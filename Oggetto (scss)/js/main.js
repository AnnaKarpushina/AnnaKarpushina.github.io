addEventListener('DOMContentLoaded', () => {
    if(document.getElementById("selector_1")){
        var maskOptions = {
            mask: "+{7}(000)000-00-00",
        };
        var mask = new IMask(document.getElementById("selector_1"), maskOptions);
    }
});


// выбираем все элементы <a> на странице, у которых атрибут href начинается с символа #
document.querySelectorAll("a[href^='#']").forEach(function(element) {
    element.addEventListener("click", function(event) {
      event.preventDefault();
    //   ищем селектор со значением атрибута href выбранной ссылки
      var targetElement = document.querySelector(this.getAttribute("href"));
      if (targetElement) {
        // для плавного прокручивания страницы (behavior) до указанного вертикального смещения (top)
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth"
        });
      }
    });
});

$(document).ready(function () {

    $('.slider-speakers').slick({
        arrows: true,
        variableWidth: true,
        prevArrow: '<div class="prev"><svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L15.2415 7.04944L9 13.0989" stroke="white" stroke-width="1.5"/><path d="M0 7.25H14.5" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg></div>',
        nextArrow: '<div class="next"><svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L15.2415 7.04944L9 13.0989" stroke="white" stroke-width="1.5"/><path d="M0 7.25H14.5" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg></div>',
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    arrows: false
                }
            }
        ]
    });
});