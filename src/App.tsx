import { Header } from './components/Header'
import './global.css'
import styles from './App.module.css'
import { Task } from './components/Task'
import { useEffect, useState } from 'react'

import { PlusCircle } from '@phosphor-icons/react'
import { v4 as uuid } from 'uuid'

export interface ITask {
  id: string
  text: string
  isChecked: boolean
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [inputValue, setInputValue] = useState('')
  const [countTask, setCountTask] = useState(Number)

  useEffect(() => {
    let count = 0
    tasks.filter((tasks) => {
      if (tasks.isChecked === true) {
        return count++
      }
    })

    setCountTask(count)
  }, [setCountTask, tasks])

  function onChangeInputValue(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event?.target.value)
  }

  function handleAddTask() {
    event?.preventDefault()
    if (!inputValue) return

    const newTask: ITask = {
      id: uuid(),
      text: inputValue,
      isChecked: false,
    }

    setTasks((state) => [...state, newTask])
    setInputValue('')
  }

  function handleToggleTask(id: string) {
    const updateTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isChecked = !task.isChecked
      }

      return { ...task }
    })

    setTasks(updateTasks)
  }

  function handleDeleteTask(id: string) {
    const filterTask = tasks.filter((task) => task.id !== id)

    setTasks(filterTask)
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleAddTask}>
          <input
            placeholder="Adicione uma nova tarefa"
            onChange={onChangeInputValue}
            value={inputValue}
          />
          <button type="submit">
            Criar <PlusCircle size={16} />
          </button>
        </form>

        <div className={styles.formContainer}>
          <div className={styles.taskContainer}>
            <main className={styles.main}>
              <p>
                Tarefas criadas <span>{tasks.length}</span>
              </p>

              <p>
                Concluídas <span>{countTask}</span>{' '}
              </p>
            </main>
          </div>
        </div>

        {tasks.map((task) => (
          <section>
            <Task
              key={task.id}
              task={task}
              handleDeleteTask={handleDeleteTask}
              toggleTaskStatus={handleToggleTask}
            />
          </section>
        ))}
      </div>
    </div>
  )
}
