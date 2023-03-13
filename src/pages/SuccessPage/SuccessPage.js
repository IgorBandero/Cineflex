import styled from "styled-components"
import { Link, useParams } from "react-router-dom";
import React, { useContext } from 'react';
import { GlobalContext } from "../../components/Context";

export default function SuccessPage(props) {

        /* {props.seatsList.map(seat => <p>Assento {seat.nameSeat}</p>

                )}*/
    
    const [globalState, setGlobalState] = useContext(GlobalContext);

    console.log(globalState[4]);


    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <strong><p>Filme e sessão</p></strong>
                <p>{globalState[0].name}</p>
                <p>{globalState[0].day} - {globalState[0].hour}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                {globalState[4].map(seat => <p key={seat}> Assento {seat} </p>)}
                
            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <p>Nome: {globalState[2]}</p>
                <p>CPF: {globalState[3]}</p>
            </TextContainer>
            <Link to="/" > 
                <button>Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
        cursor: pointer;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`