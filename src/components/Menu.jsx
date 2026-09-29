function Menu({ activeScreen, onNavigate, onLogout }) {
  const btnClass = (screen) =>
    activeScreen === screen ? 'btn btn-light' : 'btn btn-outline-light'

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container d-flex flex-wrap gap-2">
        <span className="navbar-brand mb-0 h1">Docentes</span>
        <div className="d-flex gap-2">
          <button className={btnClass('welcome')} onClick={() => onNavigate('welcome')}>
            Início
          </button>
          <button className={btnClass('form')} onClick={() => onNavigate('form')}>
            Cadastrar
          </button>
          <button className={btnClass('list')} onClick={() => onNavigate('list')}>
            Listar
          </button>
          <button className="btn btn-danger" onClick={onLogout}>
            Sair
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Menu
