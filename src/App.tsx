
import './App.css'
import { taskData } from './Data'
import { nanoid } from 'nanoid';


const initialTasks: TaskProps[] = []

taskData.forEach((task) => {
  initialTasks.push({...task,
     id:nanoid(),
    })

})

function App() {

  return (
    <>
     
    </>
  )
}

export default App
