export const tableConfig = [
  {
    id: 'images',
    title: 'Изображения',
    template(data) {
      return `<img class="sortable-table-image" alt="product image" src="${data[0].url}" />`
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
      // Принимает массив данных и возвращает строку, содержащую первые 70 символов первого элемента массива данных, 
      // после чего добавляется многоточие
      // Метод slice() возвращает новый массив, содержащий копию части исходного массива, в данном случае с 0 до 70 символов
      return `${data.slice(0, 70) + '...'}`
    }
  }
];
