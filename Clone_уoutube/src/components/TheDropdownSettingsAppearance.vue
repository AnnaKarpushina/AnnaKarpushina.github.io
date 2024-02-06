<template>
  <DropdownSettingsHeader title="Тема" @back="$emit('close')" />
  <section class="py-2">
    <div class="text-gray-500 text-xs p-3">Настройка будет применена только в этом браузере.</div>
    <ul>
      <DropdownSettingsListItem
        v-for="(themeName, themeId) in themes"
        :key="themeId"
        :label="themeName"
        :active="themeId === selectedOptions.theme.id"
        @click="selectOption({ id: themeId, text: themeName })"
      />
    </ul>
  </section>
</template>

<script>
  import dropdownSubmenu from '../mixins/dropdownSubmenu'

  export default {
    mixins: [ dropdownSubmenu ],

    data () {
      return {
        optionName: 'theme',
        themes: [ 'Как на устройстве', 'Темная', 'Светлая' ]
      }
    }
  }
</script>
