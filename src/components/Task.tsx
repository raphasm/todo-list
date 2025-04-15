import styles from './Task.module.css'
import { Check } from '@phosphor-icons/react'
import { Trash } from '@phosphor-icons/react'
import { ITask } from '../App'

interface IProps {
  task: ITask
  toggleTaskStatus: (id: string) => void
  handleDeleteTask: (id: string) => void
}

export function Task({ task, toggleTaskStatus, handleDeleteTask }: IProps) {
  function handleToggleTask() {
    toggleTaskStatus(task.id)
  }

  function handleDelete() {
    handleDeleteTask(task.id)
  }

  const checkBoxChecked = task.isChecked
    ? styles['circleChecked']
    : styles['circleUnchecked']

  const paragraphIsChecked = task.isChecked ? styles['textChecked'] : ''

  return (
    <div className={styles.container}>
      <section>
        <label htmlFor="checkbox" onClick={handleToggleTask} id={task.id}>
          <input readOnly type="checkbox" checked={task.isChecked} />
          <span className={`${styles.checkbox} ${checkBoxChecked}`}>
            {task.isChecked && (
              <Check size={13} weight="bold" color="#f2f2f2" />
            )}
          </span>

          <p className={`${styles.paragraph} ${paragraphIsChecked}`}>
            {task.text}
          </p>
        </label>
      </section>

      <button onClick={handleDelete}>
        <Trash size={16} />
      </button>
    </div>
  )
}
