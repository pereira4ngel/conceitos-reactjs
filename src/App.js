import React, { useState, useEffect } from "react";
import { api } from './services/api'
import "./styles.css";

function App() {
  const [values, setValue] = useState({
    title: '',
    url: '',
    techs: ''
  })
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  },[])

  async function handleAddRepository(e) {
    e.preventDefault()
    const responseBody = await api.post('repositories', ({
      title: values.title,
      url: values.urls,
      techs: values.techs
    }))

    setRepositories([...repositories, responseBody.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  const handleTitleValue = (event) => {
    setValue({ ...values, title: event.target.value})
  }

  const handleUrlValue = (event) => {
    setValue({ ...values, url: event.target.value})
  }

  const handleTechsValue = (event) => {
    setValue({ ...values, techs: event.target.value})
  }

  return (
    <div>
      <form>
        <input type="text" value={values.title} onChange={handleTitleValue} placeholder='Nome do repositório' name='title'/>
        <input type="text" value={values.url} onChange={handleUrlValue} placeholder='Url' name='url'/>
        <input type="text" value={values.techs} onChange={handleTechsValue} placeholder='Tecnologias' name='techs'/>
        <button onClick={handleAddRepository}>Adicionar</button>
      </form>
      <section>
        <h3>Repositórios</h3>
        <ul data-testid="repository-list">
        { 
          repositories.map((repository) =>  
            <li key={repository.id}>
            {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        }
        </ul>
      </section>
    </div>
  );
}

export default App;
