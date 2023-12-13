<template>
  <SidebarSection>
    <ul>
      <SidebarNavItem label="Главная" icon="home" is-active />
      <SidebarNavItem label="Shorts" icon="fire" />
      <SidebarNavItem label="Подписки" icon="collection" />
    </ul>
  </SidebarSection>
  <SidebarSection>
    <ul>
      <SidebarNavItem label="Библиотека" icon="duplicate" />
      <SidebarNavItem label="История" icon="clock" />
    </ul>
  </SidebarSection>
  <SidebarSection class="px-8 py-4 font-medium leading-5 border-b">
    <span class="text-sm">Войдите, чтобы лайкать видео, комментировать и подписываться</span>
    <ButtonLogin
      class="focus:outline-none flex items-center px-2 py-0.5 mt-3 text-sm text-blue-700 uppercase border border-blue-700 rounded-sm"
    />
  </SidebarSection>
  <SidebarSection>
    <SidebarSectionHeading title="Лучшее на YouTube" />
    <ul>
      <SidebarNavItem label="Музыка" icon="musicNote" />
      <SidebarNavItem label="Спорт" icon="speakerphone" />
      <SidebarNavItem label="Видеоигры" icon="puzzle" />
      <SidebarNavItem label="Фильмы" icon="film" />
      <SidebarNavItem label="Новости" icon="newspaper" />
      <SidebarNavItem label="Трансляции" icon="statusOnline" />
      <SidebarNavItem label="Видео 360°" icon="eye" />
    </ul>
  </SidebarSection>
  <SidebarSection>
    <ul>
      <SidebarNavItem label="Просмотр каналов" icon="plusCircle" />
    </ul>
  </SidebarSection>
  <SidebarSection>
    <SidebarSectionHeading title="Еще с YouTube" />
    <ul>
      <SidebarNavItem label="YouTube Premium" icon="play" />
    </ul>
  </SidebarSection>
  <SidebarSection>
    <ul>
      <SidebarNavItem label="Настройки" icon="cog" />
      <SidebarNavItem label="История отчета" icon="flag" />
      <SidebarNavItem label="Помощь" icon="questionMarkCircle" />
      <SidebarNavItem label="Отправить отзыв" icon="annotation" />
    </ul>
  </SidebarSection>
  <SidebarSection class="px-6 py-4 text-xs font-semibold space-y-4">
    <TheFooter />
  </SidebarSection>
</template>

<script>
  import SidebarSection from './SidebarSection.vue'
  import SidebarSectionHeading from './SidebarSectionHeading.vue'
  import SidebarNavItem from './SidebarNavItem.vue'
  import ButtonLogin from './ButtonLogin.vue'
  import TheFooter from './TheFooter.vue'

  export default {
    components: {
      SidebarSection,
      SidebarSectionHeading,
      SidebarNavItem,
      ButtonLogin,
      TheFooter
    }
  }
</script>
