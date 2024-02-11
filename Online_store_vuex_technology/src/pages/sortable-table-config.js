export const tableConfig = [
  {
    id: 'images',
    title: 'Изображения',
    template(data) {
      return `<img class="sortable-table-image" src="${data[0].url}" alt="product_image_${Math.floor(Math.random() * 1000)}" />`
    }
  },
  {
    id: 'price',
    title: 'Цена',
  },
  {
    id: 'title',
    title: 'Название',
  },
  {
    id: 'description',
    title: 'Описание',
    template(data) {
      // Принимает массив данных и возвращает строку, содержащую первые 130 символов первого элемента массива данных, 
      // после чего добавляется многоточие
      // Метод slice() возвращает новый массив, содержащий копию части исходного массива, в данном случае с 0 до 130 символов
      return `${ data.slice(0, 130) + '...' }`
    }
  }
];
