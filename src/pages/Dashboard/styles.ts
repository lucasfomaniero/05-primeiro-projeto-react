import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Title = styled.h1`
    font-size: 48px;
    color: #3a3a3a;
    margin-top: 80px;
    max-width: 450px;
    line-height: 56px;
`;

interface FormProps {
    hasError: boolean;
}

export const Form = styled.form<FormProps>`
    margin-top: 40px;
    max-width: 700px;
    display: flex;

    input {
        flex: 1;
        height: 70px;
        padding: 0 24px;
        border: 0;
        border-radius: 5px 0 0 5px;
        color: #3a3a3a;
        border: 2px solid #fff;
        border-right: 0px;

        ${props =>
            props.hasError &&
            css`
                border-color: #c53030;
            `}

        &::placeholder {
            color: #a8a8b3;
        }
    }

    button {
        width: 210px;
        height: 70px;
        background: #04d361;
        border: 0;
        color: #fff;
        font-weight: bold;
        border-radius: 0 5px 5px 0;
        transition: background-color 0.2s;
        &:hover {
            background: ${shade(0.2, '#04d361')};
        }
    }
`;

export const Repositories = styled.div`
    margin-top: 80px;
    max-width: 700px;

    a {
        background: #fff;
        border-radius: 5px;
        display: block;
        width: 100%;
        padding: 24px;
        text-decoration: none;
        display: flex;
        align-items: center;
        transition: transform 0.2s;
        position: relative;
        & + a {
            margin-top: 16px;
        }

        &:hover {
            transform: translateX(10px);
        }

        img {
            width: 64px;
            height: 64px;
            border-radius: 50%;
        }

        div {
            margin-left: 24px;
            display: flex;
            flex: 1;
            flex-direction: column;

            strong {
                color: #3d3d4d;
                font-size: 24px;
            }

            p {
                color: #a8a8b3;
                font-size: 18px;
                margin-top: 4px;
            }
        }
        svg {
            margin-left: auto;
            color: #c9c9d4;
        }
    }
`;

export const Error = styled.span`
    margin-top: 8px;
    color: #c53030;
    font-weight: bold;
    display: block;
`;

export const OptionsContainer = styled.div`
    flex-direction: row;
    justify-content: space-between;
    display: flex;
    max-width: 700px;
    div {
        display: block;
    }
    span {
        display: flex;
        margin-top: 8px;
    }

    svg {
        margin-right: 8px;
    }
    button {
        display: block;
        border: 0px;
    }
`;
