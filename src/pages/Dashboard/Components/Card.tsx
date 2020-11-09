import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronRight, FiXCircle } from 'react-icons/fi';

interface CardProps {
    description: string;
    full_name: string;
    owner: {
        login: string;
        avatar_url: string;
    };
    isEditing: boolean;
}
// eslint-disable-next-line
const Card: React.FC<CardProps> = ({description, full_name, owner, isEditing}) => {
    return (
        <>
            <Link key={full_name} to={`/repositories/${full_name}`}>
                <img src={owner.avatar_url} alt={owner.login} />
                <div>
                    <strong>{full_name}</strong>
                    <p>{description}</p>
                </div>
                <FiChevronRight size={20} />
                {isEditing && (
                    <DeleteButtonContainer>
                        <FiXCircle size={20} className="DeleteButton" />
                    </DeleteButtonContainer>
                )}
            </Link>
        </>
    );
};

export default Card;

const DeleteButtonContainer = styled.div`
    flex: 1;
    flex-wrap: wrap;
    max-width: 20px;
    flex-direction: column;
    justify-content: flex-start !important;

    svg {
        color: #000 !important;
    }
`;
