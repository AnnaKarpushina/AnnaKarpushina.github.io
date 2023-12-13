export default {
  props: {
    // props будут отвечать за то - видим мы модальное окно или нет
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false)
    }
  }
}
