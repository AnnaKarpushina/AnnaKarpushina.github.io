export default {
  props: {
    show: { //отвечать за отображение модального окна
      type: Boolean, //может принимать значения true или false
      default: false //изначально модальное окно будет скрыто
    }
  },
  methods: {
    hideDialog() { //вызывается при необходимости скрыть модальное окно
      this.$emit('update:show', false)
    }
  }
}
