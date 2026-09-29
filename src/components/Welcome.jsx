function Welcome({ total }) {
  return (
    <div className="p-5 bg-white rounded shadow-sm text-center">
      <h1 className="display-6">Bem-vindo(a)!</h1>
      <p className="lead">
        Sistema de cadastro de docentes da coordenação acadêmica.
      </p>
      <p className="text-muted mb-0">
        Docentes cadastrados: <strong>{total}</strong>
      </p>
    </div>
  )
}

export default Welcome
