import { useState } from 'react'
import Login from './components/Login'
import Menu from './components/Menu'
import Welcome from './components/Welcome'
import DocenteForm from './components/DocenteForm'
import ListDocentes from './components/ListDocentes'

function App() {
  // State global da aplicação
  const [logged, setLogged] = useState(false)
  const [docentes, setDocentes] = useState([])
  const [activeScreen, setActiveScreen] = useState('welcome')
  const [docenteToEdit, setDocenteToEdit] = useState(null)

  const handleLogin = () => {
    setLogged(true)
    setActiveScreen('welcome')
  }

  const handleLogout = () => {
    setLogged(false)
    setDocenteToEdit(null)
    setActiveScreen('welcome')
  }

  const handleNavigate = (screen) => {
    // Ao ir para "Cadastrar" pelo menu, sai do modo de edição
    if (screen === 'form') setDocenteToEdit(null)
    setActiveScreen(screen)
  }

  // CREATE + UPDATE
  const handleSubmit = (docente) => {
    if (docenteToEdit) {
      setDocentes(
        docentes.map((d) => (d.id === docenteToEdit.id ? { ...docente, id: d.id } : d))
      )
    } else {
      setDocentes([...docentes, { ...docente, id: Date.now() }])
    }
    setDocenteToEdit(null)
    setActiveScreen('list')
  }

  // UPDATE (inicia edição)
  const handleEditDocente = (docente) => {
    setDocenteToEdit(docente)
    setActiveScreen('form')
  }

  // DELETE
  const handleDeleteDocente = (id) => {
    setDocentes(docentes.filter((d) => d.id !== id))
  }

  if (!logged) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div>
      <Menu
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <main className="container my-4">
        {activeScreen === 'welcome' && <Welcome total={docentes.length} />}
        {activeScreen === 'form' && (
          <DocenteForm
            docenteToEdit={docenteToEdit}
            handleSubmit={handleSubmit}
          />
        )}
        {activeScreen === 'list' && (
          <ListDocentes
            docentes={docentes}
            onEdit={handleEditDocente}
            handleDeleteDocente={handleDeleteDocente}
          />
        )}
      </main>
    </div>
  )
}

export default App
