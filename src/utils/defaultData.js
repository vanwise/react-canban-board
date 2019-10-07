const DEFAULT_DATA = {
  columns: [
    {
      id: 'todo',
      title: 'TODO'
    },
    {
      id:'in-progress',
      title: 'In progress'
    },
    {
      id:'testing',
      title: 'Testing'
    },
    {
      id: 'done',
      title: 'Done'
    }
  ],
  cards: [
    {
      id: 123,
      columnId: 'testing',
      author: 'Admin',
      title: 'Карточка',
      desc: 'Пример карточки'
    }
  ],
  comments: [
    {
      id: 123,
      cardId: 123,
      author: 'Admin',
      text: 'Hello world'
    }
  ]
}

export default DEFAULT_DATA;