<template>
  <header class="header">
      <div class="header-main">
        <div class="header-main__top">
          <div class="header-main__logo-wrap">
            <a class="header-main__logo" href="index.html">
              <svg class="header-main__logo-icon">
                <use xlink:href="#logo-header-icon"></use>
              </svg>
            </a>
          </div>
          <nav class="header-main__navigation navigation-main">
            <ul class="navigation-main__list">
              <li class="navigation-main__item navigation-main__item_active">
                <a class="navigation-main__link_hover" href="#">о&nbsp;конференции</a>
              </li>
              <li class="navigation-main__item">
                <a class="navigation-main__link_hover" href="#">спикеры</a>
              </li>
              <li class="navigation-main__item">
                <a class="navigation-main__link_hover" href="#">программа</a>
              </li>
              <li class="navigation-main__item">
                <a class="navigation-main__link_hover" href="#">фотогалерея</a>
              </li>
              <li class="navigation-main__item">
                <a class="navigation-main__link_hover" href="#">организаторы</a>
              </li>
            </ul>
          </nav>
          <div class="header-main__button-wrap">
            <a class="button button_red button_participate button_red-hover" @click="scrollToForm">
              <span>принять участие</span>
            </a>
            <a class="button-mobile button_red" @click="scrollToForm">
              <span class="button-mobile__text">участвовать</span>
            </a>
          </div>
        </div>
        <div class="header-main__content">
          <h1 class="header-main__title">Дизайн <br>
            <span class="header-main__title-dop">конференция</span>
          </h1>
          <p class="header-main__description">Главное событие в дизайне <br class="header-desktop_none"> и архитектуре</p>
          <a class="button button_transparent button_mobile-transparent" @click="scrollToForm">
            <span>принять участие</span>
          </a>
        </div>
        <div class="header-main__notification">
          <div class="notification__date">7-9 Апреля 2019 <br>
            <span class="notification__place">Культурный центр "Зил"</span>
          </div>
          <div class="notification__logo">
            <span class="letter-big">ЗИЛ <br></span>
            <span class="letter-small">культурный <br>центр</span>
          </div>
        </div>
      </div>
  </header>
</template>


<script>
export default {
  methods: {
    scrollToForm() {
      if (document.getElementById('form-section')) {
        // scrollIntoView() - это метод, который вызывается на элементе DOM и используется для прокрутки 
        // контейнера просмотра таким образом, чтобы элемент стал видимым внутри контейнера
        document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' })
        // behavior: 'smooth' - обеспечивает плавный скроллинг
      }
    },
  },
};
</script>