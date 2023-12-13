// Директива focus при монтировании элемента устанавливает на него фокус
const focusDirective = {
  mounted(el) {
    el.focus()
  },
  name: 'focus'
}

// Директива intersection при монтировании элемента создает новый экземпляр IntersectionObserver, который отслеживает, 
// когда элемент становится видимым в окне браузера. Когда элемент становится видимым, вызывается функция, 
// переданная в значение директивы intersection (Для постов где пагинация это нужно, чтобы появлялись при скролле)
const intersectionDirective = {
  mounted(el, binding) {
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        binding.value()
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(el)
  },
  name: 'intersection'
}

export default [ focusDirective, intersectionDirective ]
