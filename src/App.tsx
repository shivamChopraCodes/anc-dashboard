import "./App.css"
import Dashboard from "./pages/home"

function App() {
  return (
    <div className="App">
      <div className="w-full p-4 flex justify-between ">
        <a href="mailto:contactshivamchopra@gmail.com">
          Email:{" "}
          <span className="text-blue-600 underline">
            contactshivamchopra@gmail.com
          </span>
        </a>
        <a href="https://www.linkedin.com/in/shivam-chopra-22688b147/">
          Linkedin:{" "}
          <span className="text-blue-600 underline">Shivam Chopra</span>
        </a>
      </div>
      <Dashboard />
    </div>
  )
}

export default App
