import styled from "styled-components"
import Seats from "../../components/Seats"
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import React, { useContext } from 'react';
import { GlobalContext } from "../../components/Context";

export default function SeatsPage() {

    const [seatsList, setSeatsList] = useState(null);
    const [seatsNameList, setSeatsNameList] = useState(null);
    const [movieSelected, setMovieSelected] = useState(null);
    const [nameClient, setNameClient] = useState("");
    const [cpfClient, setCpfClient] = useState("");
    const [globalState, setGlobalState] = useContext(GlobalContext);
    let selectedSeats = [];
    let nameSelectedSeats = [];
   
    
    const {idSessao} = useParams();
    let session = idSessao;
    session = session.substring(1);
 
    useEffect(() => {
        const requestSeats = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${session}/seats`);

        requestSeats.then(answer => {
            setSeatsList(answer.data.seats);
            let movieObj = {name: answer.data.movie.title, image: answer.data.movie.posterURL, 
            day: answer.data.day.weekday, hour: answer.data.name}
            setMovieSelected(movieObj);
        });
    
        requestSeats.catch(errorRequest => {
            console.log(errorRequest.response.data);
        });
            
    }, []); 

    if (seatsList === null){
        return <> </>
    }

    function buySeats(selectedSeatsList, nameSelectedSeats, nameClient, cpfClient){

        setGlobalState([movieSelected, selectedSeatsList, nameClient, cpfClient, nameSelectedSeats]);

        for (let i=0; i<selectedSeats; i++){
            seatsList.map(function (seat) {
                            if (selectedSeatsList.includes(seat.id)){
                                nameSelectedSeats.push(seat.name);
                            }
                          });
        }
        console.log(nameSelectedSeats);
        let objRequest = {
                            ids: selectedSeatsList,
                            name: nameClient,
                            cpf: cpfClient
                         }

        const requestPurchase = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", objRequest);
        
        requestPurchase.then(answer => {
            // console.log(answer);
        });
    
        requestPurchase.catch(errorRequest => {
            console.log(errorRequest.response.data);
        });
    }

    function updateSeatsList(selectedSeatsList){
        selectedSeats = selectedSeatsList;
    }

    function updateSeatsNames(selectedSeatsNamesList){
        nameSelectedSeats = selectedSeatsNamesList;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "name") {
            setNameClient(value);
        } else if (name === "cpf") {
            setCpfClient(value);
        }
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <Seats list={seatsList} updateSeatsFunction={updateSeatsList} updateSeatsNames={updateSeatsNames} />

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle color="#1AAE9E" border="1px solid #0E7D71"/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color="#C3CFD9" border="1px solid #7B8B99"/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color="#FBE192" border="1px solid #F7C52B"/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input name="name" placeholder="Digite seu nome..." value={nameClient} onChange={handleChange}/>

                CPF do Comprador:
                <input name="cpf" placeholder="Digite seu CPF..." value={cpfClient} onChange={handleChange}/>

                <Link to="/success"> 
                    <button onClick={() => buySeats(selectedSeats, nameSelectedSeats, nameClient, cpfClient)} >Reservar Assento(s)</button>
                </Link>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={movieSelected.image} alt="poster" />
                </div>
                <div>
                    <p>{movieSelected.name}</p>
                    <p>{movieSelected.day} - {movieSelected.hour}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`

const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    a {
        text-decoration: none;
    }
    button {
        align-self: center;
        cursor: pointer;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: ${props => props.border};   // Essa cor deve mudar
    background-color: ${props => props.color}; ;         // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`