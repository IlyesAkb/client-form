export default {
  data: () => ({
    options: {
      sex: [
        {value: 1, text: 'Мужской'},
        {value: 2, text: 'Женский'},
      ],
      clientType: [
        {value: 1, text: 'VIP'},
        {value: 2, text: 'Проблемные'},
        {value: 3, text: 'ОМС'},
      ],
      doctor: [
        {value: 1, text: 'Иванов'},
        {value: 2, text: 'Захаров'},
        {value: 3, text: 'Чернышева'},
      ],
      document: [
        {value: 1, text: 'Пасспорт'},
        {value: 2, text: 'Свидетельство о рождении'},
        {value: 3, text: 'Вод. удостоверение'},
      ]
    },
    errors: {
      required: 'Это поле обязательно для заполнения',
      wrongDate: 'Введена некоректная дата',
      invalidForm: 'Пожалуйста, заполните форму'
    }
  })
}