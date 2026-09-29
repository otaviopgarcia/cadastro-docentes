function ListDocentes({ docentes, onEdit, handleDeleteDocente }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="mb-3">Docentes Cadastrados</h2>

        {docentes.length === 0 ? (
          <div className="alert alert-info mb-0">Nenhum docente cadastrado.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Formação / Área</th>
                  <th>Email Institucional</th>
                  <th className="text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                {docentes.map((docente) => (
                  <tr key={docente.id}>
                    <td>{docente.nome}</td>
                    <td>{docente.formacao}</td>
                    <td>{docente.emailInstitucional}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => onEdit(docente)}
                      >
                        Alterar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteDocente(docente.id)}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ListDocentes
