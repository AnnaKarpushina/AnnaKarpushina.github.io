
// Маска для номера телефона
addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('input[data-validation="phone"]').forEach(function(element) {
        var maskOptions = {
            mask: "+{7}(000)000-00-00",
        };
        var mask = IMask(element, maskOptions);
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////



// Кнопка Далее. Универсальная функция для проверки заполнения полей ввода и перехода на следующий шаг
function handleNextButtonClick(button, contentSelector, deliveryType) {
    button.addEventListener("click", function() {
        var currentStep = button.closest(".js-step");
        var nextStep = currentStep.nextElementSibling;

        // Если указан тип доставки, то проверяем поля ввода только в этом разделе
        if (deliveryType) {
            var deliverySection = button.closest('.js-method-item-delivery[data-content="' + deliveryType + '"]');
            if (deliverySection) {
                var inputsFilled = true; // Локальная переменная для текущего раздела доставки

                // Проверяем наличие инпутов или кнопки "изменить пункт самовывоза"
                if (deliverySection.querySelector(contentSelector + ' input[type="text"]') || deliverySection.querySelector('.js-point')) {
                    deliverySection.querySelectorAll(contentSelector + ' input[type="text"]').forEach(function(input) {
                        if (input.classList.contains('js-error-border') || input.value.trim() === '') {
                            inputsFilled = false;
                        }
                    });

                    // Проверяем, был ли выбран пункт самовывоза только в разделе самовывоза
                    if (deliveryType === 'content2' && !isPickupSelected()) {
                        document.querySelector('.js-point').style.color = '#F7434B';
                        currentStep.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
                        return; // Прекращаем выполнение обработчика 
                    } else {
                        // Если все поля заполнены и выбран пункт самовывоза, сбрасываем цвет фона текущего шага
                        currentStep.querySelector(".js-step-arrow").style.backgroundColor = "";
                    }
                }
                // Если не все поля заполнены, предотвращаем переход на следующий шаг и подсвечиваем поля
                if (!inputsFilled) {
                    // Если не все поля заполнены, выполняем действия для каждого инпута
                    deliverySection.querySelectorAll(contentSelector + ' input[type="text"]').forEach(function(input) {
                        var label = input.nextElementSibling;
                        if (input.value.trim() === '') { // Проверяем, пуст ли инпут
                            label.style.color = "#F7434B";
                            input.classList.add("js-error-border");
                        }
                        currentStep.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
                    });
                    return; // Прерываем выполнение функции, чтобы не продолжать на следующий шаг
                }
            }
        } else {
            // Иначе проверяем поля ввода в обычных разделах
            var inputsFilled = true; // Локальная переменная для обычных разделов
            currentStep.querySelectorAll(contentSelector + ' input[type="text"]').forEach(function(input) {
                if (input.classList.contains('js-error-border') || input.value.trim() === '') {
                    inputsFilled = false;
                } else {
                    currentStep.querySelector(".js-step-arrow").style.backgroundColor = "";
                }
            });

            // Если не все поля заполнены, предотвращаем переход на следующий шаг и подсвечиваем поля
            if (!inputsFilled) {
                // Если не все поля заполнены, выполняем действия для каждого инпута
                currentStep.querySelectorAll(contentSelector + ' input[type="text"]').forEach(function(input) {
                    var label = input.nextElementSibling;
                    if (input.value.trim() === '') { // Проверяем, пуст ли инпут
                        label.style.color = "#F7434B";
                        input.classList.add("js-error-border");
                    }
                    currentStep.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
                });
                return; // Прерываем выполнение функции, чтобы не продолжать на следующий шаг
            }
        }

        // Продолжаем на следующий шаг
        proceedToNextStep(currentStep, nextStep);
    });
}


// Обработка кнопок "Далее" для разных разделов (первый раздел)
document.querySelectorAll(".js-goods .js-nextButton").forEach(function(button) {
    handleNextButtonClick(button, 'js-goods');
});

// Кнопка "Далее" в разделе частного лица
document.querySelectorAll(".js-private-person-content .js-nextButton").forEach(function(button) {
    handleNextButtonClick(button, '.js-private-person-content');
});

// Кнопка "Далее" в разделе юридического лица
document.querySelectorAll(".js-entity-content .js-nextButton").forEach(function(button) {
    handleNextButtonClick(button, '.js-entity-content');
});

// Кнопка "Далее" в разделе доставок
document.querySelectorAll(".js-method-item-delivery .js-nextButton").forEach(function(button) {
    var deliveryType = button.closest('.js-method-item-delivery').dataset.content;
    handleNextButtonClick(button, '.js-method-item-delivery', deliveryType);
});

// Функция для проверки выбора пункта самовывоза
function isPickupSelected() {
    return document.querySelector('.js-point').textContent === 'изменить пункт самовывоза';
}


// Функция для перехода на следующий шаг
function proceedToNextStep(currentStep, nextStep) {

    // Удаляем стили ошибки из инпутов предыдущего шага
    var previousStepContent = currentStep.querySelector(".js-step-content");
    previousStepContent.querySelectorAll('input[type="text"]').forEach(function(input) {
        var label = input.nextElementSibling;
        label.style.color = "";
        input.classList.remove("js-error-border");
    });
    document.querySelector('.js-point').style.color = '';

    // Если все поля заполнены, разрешаем переход на следующий шаг
    var currentStepContent = currentStep.querySelector(".js-step-content")
    var nextStepContent = nextStep.querySelector(".js-step-content")

    currentStep.classList.add("js-step-actives") //Добавляем на шаги который мы прошли

    if (nextStepContent) {
        currentStep.querySelector(".js-step-change").style.display = "block"
        currentStep.classList.remove("js-step-active")
        currentStepContent.style.display = "none" // Скрыть текущий контент
        nextStep.classList.add("js-step-active")
        nextStepContent.style.display = "block" // Показать следующий контент
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////


// Обработчик события для кнопки "Изменить" на каждом шаге
document.querySelectorAll(".js-step-change").forEach(function(changeButton) {
    changeButton.addEventListener("click", function() {
        var currentStep = changeButton.closest(".js-step");

        // Если текущий шаг не активный
        if (!currentStep.classList.contains("js-step-active")) {
            // Удаляем класс js-step-active с предыдущего активного шага
            document.querySelectorAll('.js-step-active').forEach(function(step) {
                step.classList.remove('js-step-active')
                step.querySelector('.js-step-content').style.display = "none"

                if (isPrivatePerson && step.classList.contains('js-step-two')) {
                    step.querySelectorAll('.js-private-person-content input[type="text"]').forEach(function(input) {
                        if (input.classList.contains('js-error-border') || input.value.trim() === '') {
                            var label = input.nextElementSibling;
                            label.style.color = "#F7434B";
                            input.classList.add("js-error-border");
                            step.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
                        } 
                    });
                } 
        
                if (!isPrivatePerson && step.classList.contains('js-step-two')) {
                    step.querySelectorAll('.js-entity-content input[type="text"]').forEach(function(input) {
                        if (input.classList.contains('js-error-border') || input.value.trim() === '') {
                            var label = input.nextElementSibling;
                            label.style.color = "#F7434B";
                            input.classList.add("js-error-border");
                            step.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
                        } 
                    });
                } 
        
                if (step.classList.contains('js-step-tree')) {
                    step.querySelectorAll('.index-city input[type="text"], .js-inside-border-selected input[type="text"]').forEach(function(input) {
                        if (input.classList.contains('js-error-border') || input.value.trim() === '') {
                            var label = input.nextElementSibling;
                            label.style.color = "#F7434B";
                            input.classList.add("js-error-border");
                            step.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
                        } 
                    });
                }
        
                if (step.classList.contains('js-step-tree')) {
                    step.querySelectorAll('.js-inside-border-selected .js-point').forEach(function(div) {
                        if (div.textContent !== 'изменить пункт самовывоза') {
                            step.querySelector(".js-point").style.color = "#F7434B";
                            step.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
                        } 
                    });
                }
        
                if (isPrivatePerson && step.classList.contains('js-step-four')) {
                    step.querySelectorAll('.js-payment-method-not-active').forEach(function(div) {
                        if (!div.classList.contains('.clicked')) {
                            step.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
                        } 
                    });
                }
        
                if (!isPrivatePerson && step.classList.contains('js-step-four')) {
                    step.querySelectorAll('.js-payment-method-ur').forEach(function(div) {
                        if (!div.classList.contains('.clicked')) {
                            step.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
                        } 
                    });
                }

                if (step.classList.contains('js-step-four') && document.querySelector('.js-payment-method-ur').classList.contains('clicked')) {
                    step.querySelector(".js-step-arrow").style.backgroundColor = "";
                }

                // Проверяем, есть ли хотя бы один элемент с классом 'js-payment-method-not-active'
                const hasClickedClass = Array.from(document.querySelectorAll('.js-payment-method-not-active')).some(function(element) {
                    return element.classList.contains('clicked');
                });

                // Проверяем, выбран ли способ оплаты или отмечен флажок сертификата
                if (step.classList.contains('js-step-four') && (hasClickedClass || document.getElementById('toddler').checked)) {
                    step.querySelector(".js-step-arrow").style.backgroundColor = "";
                }

            });

            //делаем активный шаг и открываем контент 
            currentStep.querySelector(".js-step-content").style.display = "block";
            currentStep.classList.add("js-step-active");
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////



// Обработчик события input для каждого поля ввода
document.querySelectorAll('input[type="text"]').forEach(function(input) {
    input.addEventListener('input', function() {
        var label = input.nextElementSibling // Находим следующий элемент (label) после поля ввода
        if (label.classList.contains('placeholder-text')) { 
            if (input.value.trim() !== '') {
                label.style.color = ""
                input.classList.remove("js-error-border")

                // Дополнительная валидация для номера телефона
                if (input.getAttribute('data-validation') === 'phone') {
                    var phonePattern = /^\+?[0-9()-]+$/;
                    var phoneNumber = input.value.replace(/[^\d]/g, ''); // Удаление всех символов, кроме цифр
                    if (phoneNumber.length > 0 && phoneNumber.length < 11) { // Проверяем, что номер содержит не менее 10 цифр
                        label.style.color = "#F7434B";
                        input.classList.add("js-error-border");
                    } else if (!phonePattern.test(input.value.trim())) {
                        label.style.color = "#F7434B";
                        input.classList.add("js-error-border");
                    } 
                } 
                
                // Дополнительная валидация для электронной почты
                if (input.getAttribute('data-validation') === 'email') {
                    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value.trim())) {
                        label.style.color = "#F7434B";
                        input.classList.add("js-error-border");
                    } 
                } 
                
                // Дополнительная валидация для индекса
                if (input.getAttribute('data-validation') === 'postcode') {
                    var postcodeNumber = input.value.trim(); // Удаление всех символов, кроме цифр
                    if (!/^\d+$/.test(postcodeNumber)) { // Проверяем, что в строке остались только цифры
                        label.style.color = "#F7434B";
                        input.classList.add("js-error-border");
                    } else if (postcodeNumber.length !== 6) { // Проверяем, что индекс содержит ровно 6 цифр
                        label.style.color = "#F7434B";
                        input.classList.add("js-error-border");
                    } 
                } 

                // Дополнительная валидация для ИНН
                if (input.getAttribute('data-validation') === 'inn') {
                    if (document.querySelector('.js-entity-organization').style.display !== 'block') {
                        label.style.color = "#F7434B";
                        input.classList.add("js-error-border");
                    } 
                } 

                // Дополнительная валидация для Города
                if (input.getAttribute('data-validation') === 'city') {
                    if (document.querySelector('.js-delivery-and-assembly').style.display !== 'block') {
                        label.style.color = "#F7434B";
                        input.classList.add("js-error-border");
                    }
                } 

                // Дополнительная валидация для Банка 
                if (input.getAttribute('data-validation') === 'bank') {
                    if (!bankSelectedFlag) {
                        label.style.color = "#F7434B";
                        input.classList.add("js-error-border");
                    } 
                } 
            } 
        }
    })
})


////////////////////////////////////////////////////////////////////////////////////////////////////



// Рамка у input и textarea
const textInputs = document.querySelectorAll('input[type="text"], textarea')

document.addEventListener('click', (event) => {
    // Проверяем, был ли клик сделан внутри или вне инпута
    const isClickInsideInput = Array.from(textInputs).some(input => input.contains(event.target))
    
    // Если клик был сделан вне инпута, убираем рамку у всех инпутов
    if (!isClickInsideInput) {
        textInputs.forEach(input => input.style.border = '1px solid #333232')
    }
})

// Добавляем обработчик события click к каждому найденному инпуту
textInputs.forEach(input => {
    input.addEventListener('click', () => {
        // Сбрасываем рамку у всех инпутов
        textInputs.forEach(otherInput => otherInput.style.border = '1px solid #333232')
         // Добавляем рамку при нажатии на инпут
        input.style.border = '1px solid #A7A7A7'
    })
})



////////////////////////////////////////////////////////////////////////////////////////////////////



// Рамка при наведении на 3 и 4 шагу
document.querySelectorAll('.js-method-item').forEach(div => {
    div.style.border = '1px solid #333232'

    div.addEventListener('mouseover', () => {
        if (!div.classList.contains('clicked')) {
            div.style.border = '1px solid #A7A7A7'
            div.classList.add('hovered')
        }
    })

    div.addEventListener('mouseout', () => {
        if (!div.classList.contains('clicked')) {
            div.style.border = '1px solid #333232'
            div.classList.remove('hovered')
        }
    })
})



////////////////////////////////////////////////////////////////////////////////////////////////////



// 1 шаг

// Функция для вычисления скидки для каждого товара
function calculateDiscountForItem(item) {
    // Получение значений элементов для конкретного товара
    var itemsSumElement = item.querySelector('.js-items-sum')
    var itemsSumDiscountElement = item.querySelector('.js-items-sum-discount')
    
    // Проверка наличия значений items-sum и js-items-sum-discount
    if (itemsSumElement && itemsSumDiscountElement) {
        var itemsSum = parseFloat(itemsSumElement.innerText.replace(/\s/g, '').replace('₽', ''))
        var itemsSumDiscount = parseFloat(itemsSumDiscountElement.innerText.replace(/\s/g, '').replace('₽', ''))

        // Проверка наличия значения itemsSum
        if (!isNaN(itemsSum)) {
            // Вычисление суммы скидки для конкретного товара
            var discountAmount = itemsSum - itemsSumDiscount

            // Рассчет процента скидки для конкретного товара относительно исходной суммы
            var discountPercent = (discountAmount / itemsSum) * 100

            // Находим элемент .js-items-discount внутри текущего товара и устанавливаем его текст равным вычисленному проценту скидки
            item.querySelector('.js-items-discount span').innerText = Math.round(discountPercent)
        } else {
            // Если itemsSum пусто, скрываем блок .js-items-discount
            item.querySelector('.js-items-discount').style.display = 'none'
            item.querySelector('.js-items-sum').style.display = 'none'
        }
    }
}

document.querySelectorAll('.js-goods-order-items').forEach(function(item) {
    calculateDiscountForItem(item)

    // Получаем значение скидки и количество товара из соответствующих элементов
    const discount = parseFloat(item.querySelector('.js-items-sum-discount').textContent.replace(/[^\d.]/g, ''))
    const quantity = parseInt(item.querySelector('.js-items-quantity').textContent)

    // Вычисляем общую сумму для текущего товара (скидка * количество)
    const totalAmount = discount * quantity

    // Форматируем общую сумму для вывода 
    const formattedTotalAmount = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(totalAmount)

    // Находим элемент .items-total внутри текущего товара и устанавливаем его текст равным вычисленной общей сумме
    item.querySelector('.js-items-total').textContent = formattedTotalAmount
})

// Функция для вычисления суммы товаров
function calculateTotalItemsAmount() {
    let totalItemsAmount = 0

    // Вычисляем общую сумму для каждого товара
    document.querySelectorAll('.js-items-total').forEach(function(element) {
        const itemTotalText = element.textContent.replace(/[^\d.]/g, '')
        totalItemsAmount += parseFloat(itemTotalText)
    })

    return totalItemsAmount
}

// После того как общие суммы для всех товаров были вычислены и установлены, 
// мы можем вычислить общую сумму всех товаров и вывести ее в нужном элементе
let totalItemsAmount = calculateTotalItemsAmount()

// Устанавливаем форматированную общую сумму товаров в элементе 
document.querySelector('.js-amount-of-goods').textContent = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(totalItemsAmount)

// Устанавливаем форматированную общую итоговую сумму в элементе 
document.querySelector('.js-payment-total').textContent = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(totalItemsAmount)

// Количество товаров в элемент
document.querySelector('.js-product-positions').textContent = document.querySelectorAll('.js-goods-order-items').length



////////////////////////////////////////////////////////////////////////////////////////////////////

//2 шаг
let isPrivatePerson = true // По умолчанию устанавливаем частное лицо

document.addEventListener('DOMContentLoaded', function() {
    const entity = document.querySelector('.js-entity')
    const entityContent = document.querySelector('.js-entity-content')
    const privateEntity = document.querySelector('.js-private-person')
    const privateContent = document.querySelector('.js-private-person-content')

    // клик на юридическое лицо
    entity.addEventListener('click', function() {
        isPrivatePerson = false
        entityContent.style.display = 'block'
        privateContent.style.display = 'none'
        entity.classList.add('private-person-entity-active')
        privateEntity.classList.remove('private-person-entity-active')
        openDeliveryAndAssemblyBlock() // Вызываем функцию для обновления отображения блоков доставки
    })

    // клик на частное лицо
    privateEntity.addEventListener('click', function() {
        isPrivatePerson = true
        privateContent.style.display = 'grid'
        entityContent.style.display = 'none'
        privateEntity.classList.add('private-person-entity-active')
        entity.classList.remove('private-person-entity-active')
        openDeliveryAndAssemblyBlock() // Вызываем функцию для обновления отображения блоков доставки
    })

    // Показать контент для частного лица изначально
    privateContent.style.display = 'grid'
    // Добавить класс активности для частного лица изначально
    privateEntity.classList.add('private-person-entity-active')
})



////////////////////////////////////////////////////////////////////////////////////////////////////

// Глобальная переменная-флаг для проверки, сработал ли выбор города
let citySelectedFlag = false;

let bankSelectedFlag = false; 

// Inpit в виде Select на 2 и 3 шагу

class SelectInput {
    constructor(inputElement, selectList) {
        this.inputElement = inputElement
        this.selectList = selectList
        this.initialize()
    }

    initialize() {
        this.selectList.style.display = 'none'

        this.inputElement.addEventListener('mouseenter', () => {
            this.selectList.style.border = '1px solid #A7A7A7'
        })

        this.selectList.addEventListener('mouseenter', () => {
            this.inputElement.style.border = '1px solid #A7A7A7'
            this.selectList.style.border = '1px solid #A7A7A7'
        })

        this.inputElement.addEventListener('focus', () => {
            this.inputElement.style.border = '1px solid #A7A7A7'
        })

        this.inputElement.addEventListener('blur', () => {
            this.inputElement.style.border = '1px solid #333232'
        })

        this.inputElement.addEventListener('input', () => {
            const value = this.inputElement.value.trim()
            let hasMatch = false
            if (value !== '') {
                this.selectList.querySelectorAll('p').forEach(p => {
                    const text = p.textContent.toLowerCase(); 
                    const spans = p.querySelectorAll('span');
                    
                    if (spans.length > 0) {
                        spans.forEach(span => {
                            const spanText = span.textContent.toLowerCase();
                            const highlightedSpan = spanText.replace(new RegExp(value, 'gi'), match => `<mark style="color:white;background-color: transparent;">${match}</mark>`);
                            span.innerHTML = highlightedSpan;
                        });
                    } else {
                        const highlightedText = text.replace(new RegExp(value, 'gi'), match => `<mark style="color:white;background-color: transparent;">${match}</mark>`);
                        p.innerHTML = highlightedText;
                    }
        
                     // Проверяем, содержит ли текст элемента списка введенный текст
                    if (text.includes(value.toLowerCase())) {
                        p.style.display = 'block';
                        hasMatch = true;
                    } else {
                        p.style.display = 'none';
                    }
                });
            } else {
                this.selectList.querySelectorAll('p').forEach(p => {
                    p.style.display = 'block';
                    const spans = p.querySelectorAll('span');
                    spans.forEach(span => {
                        span.innerHTML = span.textContent;
                    });
                });
            }

            // Скрыть список, если нет совпадений
            if (!hasMatch) {
                this.selectList.style.display = 'none';
            } else {
                this.selectList.style.display = 'block';
            }

        })
        
        this.selectList.querySelectorAll('p').forEach(p => {
            p.addEventListener('click', () => {
                this.inputElement.value = p.textContent
                citySelectedFlag = true; // Установка флага при выборе города
                this.selectList.style.display = 'none'
                this.inputElement.style.border = '1px solid #333232'
                openDeliveryAndAssemblyBlock(); 
                updateInputCity()
            })  
        })

        this.selectList.querySelectorAll('p.js-inside-select-list-item').forEach(p => {
            p.addEventListener('click', () => {
                const smallInn = p.querySelector('.js-small-inn').textContent
                const organizationInn = p.querySelector('.js-organization-inn').textContent.toUpperCase()
                this.inputElement.value = smallInn + " / " + organizationInn
                this.selectList.style.display = 'none'
                this.inputElement.style.border = '1px solid #333232'
                document.querySelector('.js-entity-organization').style.display = 'block'
                updateInputInn()
            })
        })

        this.selectList.querySelectorAll('p.js-inside-select-list-item-bank').forEach(p => {
            p.addEventListener('click', () => {
                const smallInn = p.querySelector('.js-small-bank').textContent
                const organizationInn = p.querySelector('.js-organization-bank').textContent.toUpperCase()
                const namberKs = p.querySelector('.js-namber-ks').textContent
                this.inputElement.value = smallInn + "    " + organizationInn + "    " + namberKs
                this.selectList.style.display = 'none'
                this.inputElement.style.border = '1px solid #333232'
                bankSelectedFlag = true
                updateInputBank()
            })
        })

        document.addEventListener('click', event => {
            if (!this.inputElement.contains(event.target)) {
                this.selectList.style.display = 'none'
                this.inputElement.style.border = '1px solid #333232'
            }

        })
    }
}

// Инициализация каждого набора элементов
document.querySelectorAll('.js-inside-select-input').forEach((inputElement, index) => {
    new SelectInput(inputElement, document.querySelectorAll('.js-inside-select-list')[index])
})


function updateInputBank() {
    const input = document.querySelector('.js-inside-select-input_bank');
    const label = input.nextElementSibling;

    if (bankSelectedFlag) {
        label.style.color = ""; 
        input.classList.remove("js-error-border"); 
    }
}

function updateInputInn() {
    const input = document.querySelector('.js-inside-select-input_inn');
    const label = input.nextElementSibling;

    if (document.querySelector('.js-entity-organization').style.display = 'block') {
        label.style.color = ""; 
        input.classList.remove("js-error-border"); 
    }
}

function updateInputCity() {
    const input = document.querySelector('.js-inside-select-input_city');
    const label = input.nextElementSibling;

    if (document.querySelector('.js-delivery-and-assembly').style.display = 'block') {
        label.style.color = ""; 
        input.classList.remove("js-error-border"); 
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////



// 3 шаг - открытие доставок после ввода инпутов

// Функция для проверки выбора города
function isCitySelected() {
    const selectedCity = document.querySelector('.js-inside-select-input_city').value.trim(); // Получаем значение выбранного города и удаляем пробелы по краям
    const cityOptions = document.querySelectorAll('.js-inside-select-list_city p'); // Получаем список всех городов из выпадающего списка

    // Проверяем, что значение города не пустое и выбранное значение существует в списке городов
    return citySelectedFlag && selectedCity !== "" && Array.from(cityOptions).some(option => option.textContent.trim() === selectedCity);
}

// Функция для проверки валидности индекса
function isPostalCodeValid() {
    const postalCodeInput = document.querySelector('input[data-validation="postcode"]');
    if (!postalCodeInput) return false; // Проверяем наличие поля с индексом
    return /^\d{6}$/.test(postalCodeInput.value.trim());  // Проверяем, что индекс содержит ровно 6 цифр
}

// Функция для открытия блока .js-delivery-and-assembly, варианта доставки и оплаты 
function openDeliveryAndAssemblyBlock() {
    // Проверяем заполненность всех полей и результат валидации по индексу
    if (isCitySelected() && isPostalCodeValid()) {
        document.querySelector('.js-delivery-and-assembly').style.display = 'block'

        document.querySelectorAll('.js-method-item-delivery').forEach(block => {
            const contentType = block.getAttribute('data-content')
            if (isBlockOpenableForPerson(contentType, isPrivatePerson)) {
                block.style.display = 'block'
            } else {
                block.style.display = 'none'
            }
        })

        // Показываем методы оплаты в зависимости от типа лица
        document.querySelectorAll('.js-payment').forEach(paymentMethod => {
            // Проверяем тип метода оплаты
            const methodType = paymentMethod.classList.contains('js-payment-private-person') ? 'js-payment-private-person' : 'js-payment-entity'; 
            if (isPaymentMethodOpenableForPerson(methodType, isPrivatePerson)) {
                paymentMethod.style.display = 'block';
            } else {
                paymentMethod.style.display = 'none';
            }
        });

    } else {
        document.querySelector('.js-delivery-and-assembly').style.display = 'none'
    }
}

// Вызываем функцию при загрузке страницы
window.addEventListener('load', openDeliveryAndAssemblyBlock)

// Добавляем обработчик события для каждого инпута внутри .index-city
document.querySelectorAll('.index-city input[type="text"]').forEach(input => {
    input.addEventListener('input', openDeliveryAndAssemblyBlock)
})


// Открытие контента доставок
function isBlockOpenableForPerson(contentType, isPrivatePerson) {
    const index = parseInt(contentType.replace('content', ''))
    if (isPrivatePerson) {
        // Открываем контент с data-content "content1", "content2", и "content4" для частных лиц
        return index === 1 || index === 2 || index === 4
    } else {
        // Открываем контент за исключением content5 для юридических лиц
        return index !== 5
    }
}

// Функция для определения, должен ли метод оплаты быть открыт для данного типа лица
function isPaymentMethodOpenableForPerson(methodType, isPrivatePerson) {
    if (isPrivatePerson) {
        // Показываем методы оплаты для частных лиц
        return methodType == 'js-payment-private-person';
    } else {
        // Показываем методы оплаты для юридических лиц
        return methodType == 'js-payment-entity';
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////



//3 шаг - Клик доставку
document.querySelectorAll('.js-method-item-delivery').forEach(div => {
    div.addEventListener('click', () => {

        // Проверяем, была ли уже выбрана опция доставки
        const alreadySelected = document.querySelector('.js-method-item-delivery.js-inside-border-selected')
        if (alreadySelected === div) {
            return // Игнорируем повторное нажатие на выбранную опцию доставки
        }

        // Удаляем класс у предыдущей выбранной опции доставки (если есть)
        if (alreadySelected) {
            alreadySelected.classList.remove('js-inside-border-selected')

            // Очищаем выбор сборки при смене доставки
            document.querySelectorAll('.js-assemblage input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false
            })

            // Очищаем содержимое блока услуги сборки
            document.querySelectorAll('.js-assembly-service-block').forEach(assemblyServiceBlock => {
                assemblyServiceBlock.querySelector('.js-assembly-service').textContent = ''
            })

            // Скрываем блок сборки
            document.querySelector('.js-assembly-service-block').style.display = 'none'
        }

        // Добавляем класс к выбранной опции доставки
        div.classList.add('js-inside-border-selected')

        // Показываем соответствующее содержимое и устанавливаем его видимость
        document.querySelectorAll('.js-inside-content').forEach(content => {
            if (content.id === div.dataset.content) {
                content.style.display = 'block'
                setTimeout(() => {
                    content.style.opacity = '1'
                }, 100)
            } else {
                content.style.opacity = '0'
                content.style.display = 'none'
            }
        })
        
        // Обновляем стоимость доставки только если она была выбрана
        const priceElement = div.querySelector('.js-inside-row-data p:first-child')
        if (priceElement) {
            const price = priceElement.textContent.trim()

            // Отображаем цену и название доставки
            const nameDisplay = document.querySelector('.js-delivery-info p:first-child')
            document.querySelector('.js-payment-info-price').textContent = price
            nameDisplay.textContent = div.querySelector('.js-inside-row-title').textContent.trim()

            // Вычисляем общую итоговую сумму (сумма товаров + стоимость доставки + стоимость сборки)
            updateTotalAmount()
        }

        // выбор пункта самовывоза 
        document.querySelector('.js-pickup').addEventListener('click', function(event) {
            event.preventDefault()

            document.querySelector('.js-point').style.color = '';
            
            const newTitleAdres = document.createElement('p')
            newTitleAdres.className = 'assembly-city-title-adres'
            newTitleAdres.textContent = 'ул. Московская, 374/3, '

            const assemblyInfo = document.querySelector('.js-info')

            if (document.querySelector('.js-point').textContent !== 'изменить пункт самовывоза') {
                assemblyInfo.parentNode.insertBefore(newTitleAdres, assemblyInfo)
                document.querySelector('.js-point').textContent = 'изменить пункт самовывоза'
                assemblyInfo.textContent = 'пн-вс 09:00-21:00'
            }
        })
        
    })
})


// 3 шаг - функция для пересчета итоговой суммы после выбора доставки и сборки
function updateTotalAmount() {
    // Получаем сумму товаров
    let totalAmount = totalItemsAmount
    
    // Получаем стоимость выбранной доставки
    const selectedDeliveryPriceElement = document.querySelector('.js-payment-info-price')
    if (selectedDeliveryPriceElement) {
        const deliveryPrice = parseFloat(selectedDeliveryPriceElement.textContent.replace(/\s/g, '').replace('₽', ''))
        totalAmount += deliveryPrice
    }

    // Получаем стоимость сборки, если чекбокс выбран
    const assemblyCheckboxes = document.querySelectorAll('.js-assemblage input[type="checkbox"]')
    assemblyCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const assemblyPrice = parseInt(checkbox.parentElement.querySelector('.js-assembly').textContent.trim().replace(/\s/g, ''))
            totalAmount += assemblyPrice
        }
    })

    // Форматируем и выводим новую итоговую сумму
    const formattedTotalAmount = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(totalAmount)
    document.querySelector('.js-payment-total').textContent = formattedTotalAmount
}



////////////////////////////////////////////////////////////////////////////////////////////////////



// 3 шаг - добавляем обработчик события для всех чекбоксов сборки

document.querySelectorAll('.js-assemblage input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const selectedDelivery = document.querySelector('.js-method-item-delivery.js-inside-border-selected')
        const assemblyServiceBlock = document.querySelector('.js-assembly-service-block')

        // Получаем элемент цены сборки для текущего блока доставки
        const assemblyPriceElement = selectedDelivery.querySelector('.js-assembly')
        // Получаем цену сборки, только если она доступна для выбранной доставки
        const assemblyPrice = assemblyPriceElement ? parseInt(assemblyPriceElement.textContent.trim().replace(/\s/g, '')) : 0

        let anyChecked = false
        document.querySelectorAll('.js-assemblage input[type="checkbox"]').forEach(checkbox => {
            if (checkbox.checked) {
                anyChecked = true
            }
        })

        if (anyChecked && selectedDelivery && assemblyPrice > 0) {
            assemblyServiceBlock.style.display = 'flex'
            assemblyServiceBlock.querySelector('.js-assembly-service').textContent = `${assemblyPrice} ₽`
        } else {
            assemblyServiceBlock.style.display = 'none'
        }

        updateTotalAmount()
    })
})



////////////////////////////////////////////////////////////////////////////////////////////////////



// 4 шаг - Рамка 
document.querySelectorAll('.js-method-item-payment').forEach(div => {
    div.addEventListener('click', () => {
        document.querySelectorAll('.js-method-item-payment').forEach(otherDiv => {
            if (otherDiv !== div) {
                otherDiv.style.border = '1px solid #333232'
                otherDiv.classList.remove('hovered', 'clicked')
            }
        })
        div.style.border = '1px solid #D4FC39'
        div.classList.add('clicked')
    })
})



////////////////////////////////////////////////////////////////////////////////////////////////////



// 4 шаг - Делаем элементы оплаты неактивными, если есть сертификат

if (document.querySelector('.js-selected-certificate')) {
    var paymentMethodElements = document.querySelectorAll('.js-payment-method-not-active')
    Array.from(paymentMethodElements).forEach(function(element) {
        element.style.pointerEvents = 'none'
        element.style.cursor = 'not-allowed'
        element.style.opacity = '0.3'
    })
}



////////////////////////////////////////////////////////////////////////////////////////////////////


// 4 шаг - Сертификат

const certificateCheckbox = document.getElementById('toddler')
const certificateInfo = document.querySelector('.js-certificate-info')
const priceCertificate = document.querySelector('.js-price-certificate')
certificateInfo.style.display = 'none'

// Сохраняем исходную сумму заказа
let originalTotalAmount = 0

if (certificateCheckbox) {

    certificateCheckbox.addEventListener('change', function() {
        const infocertifNumber = document.querySelector('.js-sum-certificate')
        const selectedDelivery = document.querySelector('.js-method-item-delivery.js-inside-border-selected')
        const totalAmountElement = document.querySelector('.js-payment-total')

        if (certificateCheckbox.checked && selectedDelivery) {
            // Выбор сертификата
            const certificateAmount = -parseInt(infocertifNumber.textContent.replace(/\D/g, ''))
            const totalAmount = parseFloat(totalAmountElement.textContent.trim().replace(/\s/g, '').replace('₽', ''))

            // Сохраняем исходную сумму заказа только один раз
            if (originalTotalAmount === 0) {
                originalTotalAmount = totalAmount
            }

            // Вычитаем стоимость сертификата из общей суммы
            totalAmountElement.textContent = `${(totalAmount + certificateAmount).toLocaleString()} ₽`
            priceCertificate.textContent = `${certificateAmount.toLocaleString()} ₽`
            certificateInfo.style.display = 'flex'
        } else {
            // Отмена выбора сертификата
            if (originalTotalAmount !== 0) {
                totalAmountElement.textContent = `${originalTotalAmount.toLocaleString()} ₽`
                priceCertificate.textContent = ''
                certificateInfo.style.display = 'none'
                originalTotalAmount = 0 // Сброс исходной суммы заказа
            }
        }
    })
}


// Если после выбора сертификата, сменили лицо, то сертификат должен быть сброшен 
document.addEventListener('DOMContentLoaded', function() {
    // обработчик события изменения типа лица
    document.querySelector('.js-entity').addEventListener('click', resetCertificate);
    document.querySelector('.js-private-person').addEventListener('click', resetCertificate);

    // функция сброса выбора сертификата
    function resetCertificate() {
        certificateCheckbox.checked = false; // сброс выбора сертификата
        certificateInfo.style.display = 'none'; // скрытие информации о сертификате
        originalTotalAmount = 0; // сброс исходной суммы заказа
        //updateTotalAmount(); // обновление отображения итоговой суммы
        priceCertificate.textContent = ''; // очистка отображения стоимости сертификата
    }
});




////////////////////////////////////////////////////////////////////////////////////////////////////


// 4 шаг - Клик на оплату 

// Общий обработчик для кнопки "Оформить заказ"
function handlePlaceOrder() {
    document.querySelectorAll('.js-step').forEach(function(step) {
        step.querySelector(".js-step-arrow").style.backgroundColor = "";
    });
    document.querySelector('.js-placing-an-order').style.display = 'none';
    document.querySelector('.js-order__success').style.display = 'flex';
}

document.querySelectorAll('.js-payment-method, .js-payment-method-ur').forEach(function(methodItem) {
    methodItem.addEventListener('click', function() {
        document.querySelector(".js-payment-button-link").addEventListener("click", handlePlaceOrder);
    })
})

// Привязываем обработчик к кнопке для метода оплаты сертификатом
document.querySelectorAll('.js-certificate-method').forEach(function(certificateMethod) {
    certificateMethod.addEventListener('click', function() {
        // Проверяем, отмечен ли флажок сертификата
        if (document.getElementById('toddler').checked) {
            document.querySelector(".js-payment-button-link").addEventListener("click", handlePlaceOrder);
        }
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////


// Функция для проверки заполненности полей в разделах перед оформлением заказа
function checkFieldsBeforeOrder() {
    var allFieldsFilled = true;

    // Проверяем заполненность полей в каждом разделе
    document.querySelectorAll('.js-step').forEach(function(step) {

        if (isPrivatePerson && step.classList.contains('js-step-two')) {
            step.querySelectorAll('.js-private-person-content input[type="text"]').forEach(function(input) {
                if (input.classList.contains('js-error-border') || input.value.trim() === '') {
                    var label = input.nextElementSibling;
                    label.style.color = "#F7434B";
                    input.classList.add("js-error-border");
                    allFieldsFilled = false;
                    step.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
                } 
            });
        } 

        if (!isPrivatePerson && step.classList.contains('js-step-two')) {
            step.querySelectorAll('.js-entity-content input[type="text"]').forEach(function(input) {
                if (input.classList.contains('js-error-border') || input.value.trim() === '') {
                    var label = input.nextElementSibling;
                    label.style.color = "#F7434B";
                    input.classList.add("js-error-border");
                    allFieldsFilled = false;
                    step.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
                } 
            });
        } 

        if (step.classList.contains('js-step-tree')) {
            step.querySelectorAll('.index-city input[type="text"]').forEach(function(input) {
                if (input.classList.contains('js-error-border') || input.value.trim() === '') {
                    var label = input.nextElementSibling;
                    label.style.color = "#F7434B";
                    input.classList.add("js-error-border");
                    allFieldsFilled = false;
                    step.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
                } else {
                    step.querySelector(".js-step-arrow").style.backgroundColor = ""; // Сбрасываем цвет до пустого значения
                }
            });
        }

        if (step.classList.contains('js-step-tree')) {
            step.querySelectorAll('.js-inside-border-selected input[type="text"]').forEach(function(input) {
                if (input.classList.contains('js-error-border') || input.value.trim() === '') {
                    var label = input.nextElementSibling;
                    label.style.color = "#F7434B";
                    input.classList.add("js-error-border");
                    allFieldsFilled = false;
                    step.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
                } else {
                    step.querySelector(".js-step-arrow").style.backgroundColor = ""; // Сбрасываем цвет до пустого значения
                    allFieldsFilled = true;
                    var label = input.nextElementSibling;
                    label.style.color = "";
                    input.classList.remove("js-error-border");

                    document.querySelectorAll('.js-method-item-delivery input[type="text"], .js-method-item-delivery .js-point').forEach(function(element) {
                        if (element.tagName.toLowerCase() === 'input') {
                            var input = element;
                            var label = input.nextElementSibling;
                            label.style.color = "";
                            input.classList.remove("js-error-border");
                        } else if (element.classList.contains('js-point')) {
                            element.style.color = "";
                        }
                    });

                }
            });
        }

        if (step.classList.contains('js-step-tree')) {
            let foundSelected = false; // Переменная для отслеживания наличия выбранного элемента
            step.querySelectorAll('.js-method-item-delivery').forEach(function(div) {
                if (div.classList.contains('js-inside-border-selected')) {
                    foundSelected = true; // Если найден выбранный элемент, устанавливаем значение в true
                }
            });
            if (!foundSelected) { // Если не найден выбранный элемент
                allFieldsFilled = false;
                step.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
            } 
        }

        if (step.classList.contains('js-step-tree')) {
            step.querySelectorAll('.js-inside-border-selected .js-point').forEach(function(div) {
                if (div.textContent !== 'изменить пункт самовывоза') {
                    step.querySelector(".js-point").style.color = "#F7434B";
                    allFieldsFilled = false;
                    step.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
                } else {
                    document.querySelectorAll('.js-method-item-delivery input[type="text"], .js-method-item-delivery .js-point').forEach(function(element) {
                        if (element.tagName.toLowerCase() === 'input') {
                            var input = element;
                            var label = input.nextElementSibling;
                            label.style.color = "";
                            input.classList.remove("js-error-border");
                        } else if (element.classList.contains('js-point')) {
                            element.style.color = "";
                        }
                    });
                }
            });
        }

        if (isPrivatePerson && step.classList.contains('js-step-four')) {
            step.querySelectorAll('.js-payment-method-not-active').forEach(function(div) {
                if (!div.classList.contains('.clicked')) {
                    allFieldsFilled = false;
                    step.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
                } 
            });
        }

        if (!isPrivatePerson && step.classList.contains('js-step-four')) {
            step.querySelectorAll('.js-payment-method-ur').forEach(function(div) {
                if (!div.classList.contains('.clicked')) {
                    allFieldsFilled = false;
                    step.querySelector(".js-step-arrow").style.backgroundColor = "#F7434B";
                } 
            });
        }

    });

    // Возвращаем булево значение, указывающее, заполнены ли все поля или нет
    return allFieldsFilled;
}


// Клик на кнопку "Оформить заказ"
document.querySelector(".js-payment-button-link").addEventListener("click", function() {

    // Сбрасываем цвет фона стрелок перед проверкой полей
    document.querySelectorAll(".js-step-arrow").forEach(function(arrow) {
        arrow.style.backgroundColor = "";
    });

    var fieldsFilled = checkFieldsBeforeOrder();

    // Если все поля заполнены, выполняем оформление заказа
    if (fieldsFilled) {
        document.querySelector('.js-placing-an-order').style.display = 'none';
        document.querySelector('.js-order__success').style.display = 'flex';
    }
})
