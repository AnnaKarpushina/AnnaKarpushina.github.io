<template>
  <DropdownSettingsHeader title="Выберите свое местоположение" @back="$emit('close')" />
  <section class="py-2">
    <ul class="max-h-96 overflow-auto">
      <DropdownSettingsListItem
        v-for="(locationName, locationId) in locations"
        :key="locationId"
        :label="locationName"
        :active="locationId === selectedOptions.location.id"
        @click="selectOption({ id: locationId, text: locationName })"
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
        optionName: 'location',
        locations: [ 'Россия', 'Соединенные Штаты' ]
      }
    }
  }
</script>
