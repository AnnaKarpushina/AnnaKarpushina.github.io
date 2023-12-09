<script>
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

  export default {
    components: {
      Carousel,
      Slide,
      Pagination,
      Navigation,
    }, 
    data() {
      return {  
        items: [ 
          { 
            id: 1, 
            name: 'Станислав', 
            surname: 'Орехов', 
            description: `Дизайнер, визуализатор, <br> руководитель студии <br> d-e-s-i-g-n.ru`, 
            imageUrl: '/src/assets/images/speaker-1.png' 
          },
          { 
            id: 2, 
            name: 'Светлана', 
            surname: 'Котлукова', 
            description: `Маркетолог, руководитель PR-агентства для дизайнеров «АрхДиалог»`, 
            imageUrl: '/src/assets/images/speaker-2.png' 
          },
          { 
            id: 3, 
            name: 'Максим', 
            surname: 'Вересов', 
            description: `Архитектор, строитель, руководитель компании деревянного строительства`, 
            imageUrl: '/src/assets/images/speaker-3.png' 
          },
          { 
            id: 4, 
            name: 'Андрей', 
            surname: 'Циммер', 
            description: `Дизайнер, визуализатор, руководитель студии`, 
            imageUrl: '/src/assets/images/speaker-4.png' 
          },
          { 
            id: 5, 
            name: 'Светлана', 
            surname: 'Котлукова', 
            description: `Маркетолог, руководитель PR-агентства для дизайнеров «АрхДиалог»`, 
            imageUrl: '/src/assets/images/speaker-5.png' 
          }
        ]
      }
    },
    computed: {
      settings() {
        return {
          itemsToShow: 1.5,
          snapAlign: "start",
        };
      },
      breakpoints() {
        return {
          300: {
            itemsToShow: 1.4,
            snapAlign: "start",
          },
          768: {
            itemsToShow: 2.5,
            snapAlign: "start",
          },
          1024: {
            itemsToShow: 3.2,
            snapAlign: "start",
          }
        }
      }
    }
  }
</script>


<template>
    <main class="content">

      <section class="section-questions">
        <div class="wrapper-content">
          <div class="section-questions__experience experience-block">
            <h2 class="experience-block__title">
              <span>Опыт </span>практиков
            </h2>
            <p class="experience-block__description">
              Узнайте, как эффективно работать и зарабатывать в сфере дизайна, визуализации, проектирования и строительства
            </p>
          </div>
        </div>
        <div class="design-experts">
          <div class="design-experts__img-wrap">
            <picture>
              <source media="(max-width:768px)" srcset="/src/assets/images/expert-mobile.png">
              <source media="(min-width:769px)" srcset="/src/assets/images/expert.png">
              <img class="design-experts__img" src="/src/assets/images/expert.png" alt="эксперт">
            </picture>
          </div>
          <div class="design-experts__content">
            <h3 class="design-experts__title"> 
              <span class="design-experts__title-mobile">О чем <br class="header-desktop_none"></span>
              <span class="design-experts__title-mobile-red">молчат <br></span>дизайн-эксперты?
            </h3>
            <p class="design-experts__description">Спикеры поделятся практическим знаниями,
              <br class="design-experts__mobile-none"> особенностями подхода, секретами и фишками.
            </p>
            <span class="design-experts__additional">Каждый найдет свое.</span>
          </div>
        </div>
      </section>

      <section class="section-speakers">
        <h2 class="section-speakers__title">Спикеры</h2>
        <carousel 
          :wrap-around="true" 
          :settings="settings" 
          :breakpoints="breakpoints"
         >
          <slide v-for="item in items" :key="item.id" class="slider-speakers__item">
            <div class="slider-speakers__img-wrap">
              <img :src="item.imageUrl" :alt="'Спикер_' + item.id">
            </div>
            <h3 class="slider-speakers__name">{{ item.name }} <span>{{ item.surname }}</span></h3>
            <p class="slider-speakres__info" v-html="item.description"></p>
          </slide>

          <template #addons>
            <navigation>
              <template #next>
                <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1L15.2415 7.04944L9 13.0989" stroke="#DA353B" stroke-width="1.5"/>
                  <path d="M0 7.25H14.5" stroke="#DA353B" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
              </template>
              <template #prev>
                <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1L1.75854 7.04944L8 13.0989" stroke="#DA353B" stroke-width="1.5"/>
                  <path d="M17 7.25H2.5" stroke="#DA353B" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
              </template>
            </navigation>
          </template>

        </carousel>
      </section>

      <section class="section-form" id="form-section">
        <div class="section-form__left">
          <h2 class="section-form__title">
            <span class="section-form__title-red">Принять </span>
            <span>участие</span> 
          </h2>
          <form class="section-form__form-participate form-participate" action="#" name="participate">
            <div class="form-participate__input-wrap">
              <label class="form-participate__label" for="name">Ваши имя и фамилия</label>
              <input class="form-participate__input input-participate" id="name" type="text" 
              placeholder="Введите имя" value="Елизавета Немирович-Данченко" required>
            </div>
            <div class="form-participate__input-wrap">
              <label class="form-participate__label" for="company">Компания</label>
              <input class="form-participate__input input-participate" id="company" type="text"
              value="OGGETTO" placeholder="Введите название компании" required>
            </div>
            <div class="form-participate__input-wrap">
              <label class="form-participate__label" for="mail">E-mail</label>
              <input class="form-participate__input input-participate" id="mail" type="email" 
              placeholder="Введите почту" required>
            </div>
            <div class="form-participate__input-wrap form-participate__input-wrap_tel">
              <label class="form-participate__label" for="mail">Телефон</label>
              <input class="form-participate__input input-participate" type="tel" v-mask="'+7 (###) ###-####'"
              placeholder="Телефон" required>
            </div>
            <div class="form-participate__button-wrapper">
              <button class="btn-registration button_red button_red-hover" type="submit">
                <span>Зарегистрироваться</span>
              </button>
            </div>
          </form>
        </div>
        <div class="section-form__right">
          <div class="section-form__img-wrap">
            <img src="/src/assets/images/form.png" alt="форма">
          </div>
        </div>
      </section>
    </main>
  </template>