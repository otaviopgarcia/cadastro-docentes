import { useState } from 'react'

const UFS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA',
  'PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
]

// ---------- Máscaras ----------
const maskCPF = (v) =>
  v
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')

const maskTelefone = (v) =>
  v
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2')

const maskCEP = (v) =>
  v
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{5})(\d{1,3})$/, '$1-$2')

// ---------- Validação de CPF (dígitos verificadores) ----------
const cpfValido = (cpf) => {
  const nums = cpf.replace(/\D/g, '')
  if (nums.length !== 11 || /^(\d)\1{10}$/.test(nums)) return false

  const calcDigito = (base, pesoInicial) => {
    let soma = 0
    for (let i = 0; i < base.length; i++) {
      soma += Number(base[i]) * (pesoInicial - i)
    }
    const resto = (soma * 10) % 11
    return resto === 10 ? 0 : resto
  }

  const d1 = calcDigito(nums.slice(0, 9), 10)
  const d2 = calcDigito(nums.slice(0, 10), 11)
  return d1 === Number(nums[9]) && d2 === Number(nums[10])
}

function DocenteForm({ docenteToEdit, handleSubmit }) {
  // Um useState para cada campo
  const [nome, setNome] = useState(docenteToEdit ? docenteToEdit.nome : '')
  const [cpf, setCpf] = useState(docenteToEdit ? docenteToEdit.cpf : '')
  const [formacao, setFormacao] = useState(docenteToEdit ? docenteToEdit.formacao : '')
  const [emailInstitucional, setEmailInstitucional] = useState(
    docenteToEdit ? docenteToEdit.emailInstitucional : ''
  )
  const [emailParticular, setEmailParticular] = useState(
    docenteToEdit ? docenteToEdit.emailParticular : ''
  )
  const [celular, setCelular] = useState(docenteToEdit ? docenteToEdit.celular : '')
  const [endereco, setEndereco] = useState(docenteToEdit ? docenteToEdit.endereco : '')
  const [numero, setNumero] = useState(docenteToEdit ? docenteToEdit.numero : '')
  const [cidade, setCidade] = useState(docenteToEdit ? docenteToEdit.cidade : '')
  const [cep, setCep] = useState(docenteToEdit ? docenteToEdit.cep : '')
  const [uf, setUf] = useState(docenteToEdit ? docenteToEdit.uf : '')
  const [erros, setErros] = useState({})

  const validar = () => {
    const novosErros = {}

    if (nome.trim().length < 3) {
      novosErros.nome = 'O nome deve ter no mínimo 3 caracteres.'
    }
    if (!cpf.trim()) {
      novosErros.cpf = 'O CPF é obrigatório.'
    } else if (!cpfValido(cpf)) {
      novosErros.cpf = 'CPF inválido.'
    }
    if (!formacao.trim()) {
      novosErros.formacao = 'A formação/área de atuação é obrigatória.'
    }

    if (!emailInstitucional.trim()) {
      novosErros.emailInstitucional = 'O email institucional é obrigatório.'
    } else if (!emailInstitucional.includes('@')) {
      novosErros.emailInstitucional = 'O email institucional deve conter "@".'
    }
    if (emailParticular.trim() && !emailParticular.includes('@')) {
      novosErros.emailParticular = 'O email particular deve conter "@".'
    }
    if (!celular.trim()) {
      novosErros.celular = 'O telefone celular é obrigatório.'
    } else if (celular.replace(/\D/g, '').length !== 11) {
      novosErros.celular = 'Informe o celular no formato (00) 00000-0000.'
    }

    if (!endereco.trim()) novosErros.endereco = 'O endereço é obrigatório.'
    if (!String(numero).trim()) novosErros.numero = 'O número é obrigatório.'
    if (!cidade.trim()) novosErros.cidade = 'A cidade é obrigatória.'
    if (!cep.trim()) {
      novosErros.cep = 'O CEP é obrigatório.'
    } else if (cep.replace(/\D/g, '').length !== 8) {
      novosErros.cep = 'Informe o CEP no formato 00000-000.'
    }
    if (!uf) novosErros.uf = 'Selecione um estado.'

    return novosErros
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const novosErros = validar()
    setErros(novosErros)

    if (Object.keys(novosErros).length > 0) return

    handleSubmit({
      nome: nome.trim(),
      cpf,
      formacao: formacao.trim(),
      emailInstitucional: emailInstitucional.trim(),
      emailParticular: emailParticular.trim(),
      celular,
      endereco: endereco.trim(),
      numero,
      cidade: cidade.trim(),
      cep,
      uf,
    })
  }

  const inputClass = (campo) => (erros[campo] ? 'form-control is-invalid' : 'form-control')

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="mb-4">
          {docenteToEdit ? 'Alterar Docente' : 'Cadastrar Novo Docente'}
        </h2>

        <form onSubmit={onSubmit} noValidate>
          {/* Grupo 1 - Dados Pessoais */}
          <fieldset className="border rounded p-3 mb-4">
            <legend className="float-none w-auto px-2 fs-5">Dados Pessoais</legend>
            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label">Nome Completo</label>
                <input
                  type="text"
                  className={inputClass('nome')}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                {erros.nome && <div className="invalid-feedback">{erros.nome}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label">CPF</label>
                <input
                  type="text"
                  className={inputClass('cpf')}
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(maskCPF(e.target.value))}
                />
                {erros.cpf && <div className="invalid-feedback">{erros.cpf}</div>}
              </div>
              <div className="col-12">
                <label className="form-label">Formação / Área de Atuação</label>
                <input
                  type="text"
                  className={inputClass('formacao')}
                  value={formacao}
                  onChange={(e) => setFormacao(e.target.value)}
                />
                {erros.formacao && <div className="invalid-feedback">{erros.formacao}</div>}
              </div>
            </div>
          </fieldset>

          {/* Grupo 2 - Contatos */}
          <fieldset className="border rounded p-3 mb-4">
            <legend className="float-none w-auto px-2 fs-5">Contatos</legend>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Email Institucional</label>
                <input
                  type="email"
                  className={inputClass('emailInstitucional')}
                  value={emailInstitucional}
                  onChange={(e) => setEmailInstitucional(e.target.value)}
                />
                {erros.emailInstitucional && (
                  <div className="invalid-feedback">{erros.emailInstitucional}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Email Particular (opcional)</label>
                <input
                  type="email"
                  className={inputClass('emailParticular')}
                  value={emailParticular}
                  onChange={(e) => setEmailParticular(e.target.value)}
                />
                {erros.emailParticular && (
                  <div className="invalid-feedback">{erros.emailParticular}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Telefone Celular</label>
                <input
                  type="tel"
                  className={inputClass('celular')}
                  placeholder="(00) 00000-0000"
                  value={celular}
                  onChange={(e) => setCelular(maskTelefone(e.target.value))}
                />
                {erros.celular && <div className="invalid-feedback">{erros.celular}</div>}
              </div>
            </div>
          </fieldset>

          {/* Grupo 3 - Endereço */}
          <fieldset className="border rounded p-3 mb-4">
            <legend className="float-none w-auto px-2 fs-5">Endereço</legend>
            <div className="row g-3">
              <div className="col-md-9">
                <label className="form-label">Endereço Residencial</label>
                <input
                  type="text"
                  className={inputClass('endereco')}
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
                {erros.endereco && <div className="invalid-feedback">{erros.endereco}</div>}
              </div>
              <div className="col-md-3">
                <label className="form-label">Número</label>
                <input
                  type="text"
                  className={inputClass('numero')}
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
                {erros.numero && <div className="invalid-feedback">{erros.numero}</div>}
              </div>
              <div className="col-md-5">
                <label className="form-label">Cidade</label>
                <input
                  type="text"
                  className={inputClass('cidade')}
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />
                {erros.cidade && <div className="invalid-feedback">{erros.cidade}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label">CEP</label>
                <input
                  type="text"
                  className={inputClass('cep')}
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => setCep(maskCEP(e.target.value))}
                />
                {erros.cep && <div className="invalid-feedback">{erros.cep}</div>}
              </div>
              <div className="col-md-3">
                <label className="form-label">UF</label>
                <select
                  className={erros.uf ? 'form-select is-invalid' : 'form-select'}
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {UFS.map((sigla) => (
                    <option key={sigla} value={sigla}>
                      {sigla}
                    </option>
                  ))}
                </select>
                {erros.uf && <div className="invalid-feedback">{erros.uf}</div>}
              </div>
            </div>
          </fieldset>

          <button type="submit" className="btn btn-success">
            {docenteToEdit ? 'Salvar Alterações' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default DocenteForm
