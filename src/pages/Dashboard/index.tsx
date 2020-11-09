import React, { useState, useEffect, FormEvent } from 'react';
import { FiEdit } from 'react-icons/fi';
import logoImage from '../../assets/logo.svg';
import { Title, Form, Repositories, Error, OptionsContainer } from './styles';
import api from '../../services/api';
import Card from './Components/Card';

interface Repository {
    description: string;
    fullName: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem(
            '@githubExplorer:repositories',
        );
        return storagedRepositories ? JSON.parse(storagedRepositories) : [];
    });
    const [newRepo, setNewRepo] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Save repositories in local storage
    useEffect(() => {
        localStorage.setItem(
            `@githubExplorer:repositories`,
            JSON.stringify(repositories),
        );
    }, [repositories]);

    async function handleAddRepository(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        try {
            event.preventDefault();
            if (!newRepo) {
                setInputError('Digite o autor/nome do repositório');
                return;
            }
            const response = await api.get(`repos/${newRepo}`);
            if (response.status === 200 && response.data) {
                const repository: Repository = {
                    description: response.data.description,
                    fullName: response.data.full_name,
                    owner: response.data.owner,
                };
                setInputError('');
                setRepositories([...repositories, repository]);
            }
            setNewRepo('');
        } catch (error) {
            setInputError('Não foi possível encontrar o repositório desejado');
        }
    }

    function handleEditPressed() {
        setIsEditing(!isEditing);
        console.log('Está editando: ', isEditing);
    }
    return (
        <>
            <img src={logoImage} alt="Github explorer logo" />
            <Title>Explore repositórios no Github</Title>
            <Form hasError={Boolean(inputError)} onSubmit={handleAddRepository}>
                <input
                    value={newRepo}
                    onChange={e => setNewRepo(e.target.value)}
                    placeholder="Digite o nome do repositório"
                />
                <button type="submit">Pesquisar</button>
            </Form>

            <OptionsContainer>
                <div>
                    {inputError && (
                        <Error>
                            <p>{inputError}</p>
                        </Error>
                    )}
                </div>
                {repositories.length > 0 && (
                    <div>
                        <span>
                            <FiEdit size={20} />
                            <button type="button" onClick={handleEditPressed}>
                                {isEditing ? 'Concluir' : 'Editar'}
                            </button>
                        </span>
                    </div>
                )}
            </OptionsContainer>

            <Repositories>
                {repositories.map(repository => {
                    const { description, fullName, owner } = repository;
                    return (
                        <Card
                            isEditing={isEditing}
                            key={fullName}
                            description={description}
                            full_name={fullName}
                            owner={owner}
                        />
                    );
                })}
            </Repositories>
        </>
    );
};

export default Dashboard;
