import { useState } from 'react'

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Credenciais fixas apenas para fins didáticos
    if (usuario === 'admin' && senha === '123456') {
      setErro('')
      onLogin()
    } else {
      setErro('Usuário ou senha inválidos.')
    }
  }

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-sm col-12 col-md-5">
        <div className="card-body p-4">
          <h2 className="text-center mb-1">Cadastro de Docentes</h2>
          <p className="text-center text-muted">Faça login para continuar</p>

          {erro && <div className="alert alert-danger">{erro}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Usuário</label>
              <input
                type="text"
                className="form-control"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Entrar
            </button>
          </form>
          <p className="text-muted small text-center mt-3 mb-0">
            Use <strong>admin</strong> / <strong>123456</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
