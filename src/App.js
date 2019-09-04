import React from 'react'
import { Provider, Subscribe } from 'unstated'

import styled from 'styled-components'

import TodosContainer from './store'

import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import Select from './components/Select'
import Filter from './components/Filter'
function App() {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[TodosContainer]}>
          {todos => {
            const list = todos.getList()
            const todoList = todos.getTodoList()
            const showListOrItem = todos.showListOrItem()
            const getSelectedListName = todos.getSelectedListName()
            const getFilterType = todos.getFilterType()
            return (
              <TodosWrapper>
                <DivWrapperLeftSelect>
                  <Select
                    // placeholder={'Show Todo list or Items'}
                    options={[{ id: 'todoLists', value: 'Todo List' }, { id: 'todoItems', value: 'Todo Items' }]}
                    onSelect={todos.showTodoListOrItem}
                    width={'100'}
                  />
                </DivWrapperLeftSelect>
                <AddTodo onAddTodo={todos.createTodo} showListOrItem={showListOrItem} />
                <DivWrapperRightSelect>
                  {(showListOrItem !== 'todoLists') && <Select
                    // placeholder={'Todo list'}
                    options={todoList}
                    onSelect={todos.showSelectedList}
                  />}
                </DivWrapperRightSelect>
                {(showListOrItem !== 'todoLists') && <Div><Filter onSelect={todos.filter} getFilterType={getFilterType} /> <Heading>{getSelectedListName}</Heading></Div>}
                <TodoList items={showListOrItem === 'todoLists' ? todoList : list} showListOrItem={showListOrItem} toggleComplete={todos.toggleComplete} />
              </TodosWrapper>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`

const TodosWrapper = styled.div`
  max-width: 1500px;
  display: flex;
  flex-direction: column;
`
const DivWrapperLeftSelect = styled.div`
  position:absolute;
  left: 23%
`
const DivWrapperRightSelect = styled.div`
  position:absolute;
  right: 23%
`
const Heading = styled.h3`
`
const Div = styled.div`
`

export default App
