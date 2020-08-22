import React, { useState, useEffect } from 'react';
import api from '../src/services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getRepositories();
  }, []);

  async function getRepositories() {
    const { data } = await api.get('/repositories');

    setRepositories(data);
  }

  async function handleAddRepository() {
    // TODO
    const { data } = await api.post('/repositories', {
      title: `new_repository_${Date.now()}`,
      url: '',
      techs: [],
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository() {
    const repos = [...repositories];
    const { id } = repos.pop();

    await api.delete(`/repositories/${id}`);

    setRepositories(repos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
      <button onClick={handleRemoveRepository}>Remover</button>
    </div>
  );
}

export default App;
