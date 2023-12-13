<template>
  <DropdownSettingsHeader title="Restricted Mode" @back="$emit('close')" />
  <section class="px-3 py-4 space-y-4 text-black text-sm">
    <p>Это помогает скрыть потенциально «взрослые» видео. Ни один фильтр не дает 100% точности.</p>
    <p>Этот параметр применим только к этому браузеру</p>
    <div class="text-gray-600 font-semibold flex items-center">
      <span class="uppercase mr-2">Активировать ограниченный режим</span>
      <input
        type="checkbox"
        :checked="selectedOptions.restrictedMode.enabled"
        @input="selectOption"
      />
    </div>
    <template v-if="selectedOptions.restrictedMode.enabled">
      <p>Блокировка Ограниченного режима не позволяет другим пользователям изменять настройки Ограниченного режима в этом браузере.</p>
      <p>Заблокировать ограниченный режим в этом браузере</p>
    </template>
  </section>
</template>

<script>
  import dropdownSubmenu from '../mixins/dropdownSubmenu'

  export default {
    mixins: [dropdownSubmenu],

    methods: {
      selectOption ($event) {
        const enabled = $event.target.checked
        const value = { enabled, text: enabled ? 'On' : 'Off' }

        this.$emit('select-option', { name: 'restrictedMode', value })
      }
    }
  }
</script>
