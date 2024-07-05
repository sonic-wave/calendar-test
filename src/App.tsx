import Calendar from './components/Calendar/Calendar';
import { TodoProvider } from './context/Todo';

function App() {

  return (
    <>
    <TodoProvider>
      <div className="app-container">
        <h1>To-Do лист</h1>
        <Calendar />
      </div>
    </TodoProvider>
    </>
  )
}

export default App
