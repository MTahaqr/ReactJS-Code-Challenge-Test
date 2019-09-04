import { Container } from 'unstated'

const defaultState = {
  list: [
    {
      id: 1,
      completed: false,
      text: 'Read README',
      todoListId: 1
    },
    {
      id: 2,
      completed: false,
      text: 'Add one todo',
      todoListId: 1
    },
    {
      id: 3,
      completed: false,
      text: 'Add filters',
      todoListId: 1
    },
    {
      id: 4,
      completed: false,
      text: 'Add multiple lists',
      todoListId: 1

    },
    {
      id: 5,
      completed: false,
      text: 'Optional: add tests',
      todoListId: 1

    },
    {
      id: 6,
      completed: false,
      text: 'Optional: add tests',
      todoListId: 1

    },
    {
      id: 7,
      completed: false,
      text: 'first item of list 2',
      todoListId: 2

    },
    {
      id: 8,
      completed: false,
      text: 'First Item of list 3',
      todoListId: 3

    }

  ],
  todoList: [
    {
      id: 1,
      text: 'First List'
    },
    {
      id: 2,
      text: 'Second List'
    },
    {
      id: 3,
      text: 'Third List'
    }


  ],
  filterType: 'all',
  showListOrItem: 'todoLists',
  selectedTodoListId: 1


}

class TodosContainer extends Container {
  constructor(props) {
    super(props)

    this.state = this.readStorage()

  }

  readStorage() {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState')
      if (state) {
        return JSON.parse(state)
      }
    }

    return defaultState
  }

  syncStorage() {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state)
      window.localStorage.setItem('appState', state)
    }
  }

  getList() {
    const {
      list,
      filterType,
      selectedTodoListId
    } = this.state;
    if (filterType === 'completed') return list.filter(item => item.completed === true && item.todoListId === parseInt(selectedTodoListId))
    else if (filterType === 'active') return list.filter(item => item.completed === false && item.todoListId === parseInt(selectedTodoListId))
    else return list.filter(item => item.todoListId === parseInt(selectedTodoListId))
  }

  getTodoList() {
    return this.state.todoList
  }

  toggleComplete = async id => {
    const item = this.state.list.find(i => i.id === id)
    const completed = !item.completed

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state => {
      const list = state.list.map(item => {
        if (item.id !== id) return item
        return {
          ...item,
          completed
        }
      })
      return { list }
    })

    this.syncStorage()
  }

  createTodo = async text => {
    const { showListOrItem, selectedTodoListId } = this.state
    await this.setState(state => {
      if (showListOrItem !== 'todoLists') {
        const item = { completed: false, text, id: state.list.length + 1, todoListId: parseInt(selectedTodoListId) }
        const list = state.list.concat(item)
        return { list }
      }
      else {
        const item = { text, id: state.todoList.length + 1 }
        const todoList = state.todoList.concat(item)
        return { todoList }
      }
    })

    this.syncStorage()
  }

  filter = async filterType => {
    await this.setState(state => {
      return { filterType }
    })
  }
  showSelectedList = async e => {
    const selectedTodoListId = e.target.options[e.target.selectedIndex].value
    await this.setState(state => {
      return { selectedTodoListId }
    })
  }

  showTodoListOrItem = async e => {
    const showListOrItem = e.target.options[e.target.selectedIndex].value
    await this.setState(state => {
      if (showListOrItem === 'todoLists')
        return { showListOrItem, selectedTodoListId: 1 }
      else return { showListOrItem }
    })
  }

  showListOrItem() {
    return this.state.showListOrItem
  }

  getSelectedListName() {
    const { selectedTodoListId, todoList } = this.state
    const selectedtodoList = todoList.filter(list => list.id === parseInt(selectedTodoListId))
    return selectedtodoList[0].text
  }

  getFilterType() {
    return this.state.filterType
  }
}



export default TodosContainer
