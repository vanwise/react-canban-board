const DEFAULT_DATA = {
  columns: {
    'todo': {
      id: 'todo',
      title: 'TODO'
    },
    'in-progress': {
      id:'in-progress',
      title: 'In progress'
    },
    'testing': {
      id:'testing',
      title: 'Testing'
    },
    'done': {
      id: 'done',
      title: 'Done'
    }
  },
  cards: {
    123: {
      id: 123,
      columnId: 'testing',
      author: 'Admin',
      title: 'Карточка',
      desc: 'Пример карточки'
    }
  },
  comments: {
    123: {
      id: 123,
      cardId: 123,
      author: 'Admin',
      text: 'Hello world'
    }
  }
}

export default DEFAULT_DATA;