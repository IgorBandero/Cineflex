import styled from "styled-components"
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Seats(props) {

    /*
    const [seatsList, setSeatsList] = useState(null);
    const [styleSeat, setStyleSeat] = useState({seatBorder:"1px solid #7B8B99", seatColor:"#C3CFD9"});

    const {idSessao} = useParams();
    console.log(idSessao);
    let session = idSessao;
    session = session.substring(1);
 
    useEffect(() => {
        const requestSeats = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${session}/seats`);

        requestSeats.then(answer => {
            setSeatsList(answer.data.seats);
        });
    
        requestSeats.catch(errorRequest => {
            console.log(errorRequest.response.data);
        });
            
    }, []); 

    if (seatsList === null){
        return <> </>
    }
    */

    function renderSeat(seat){
        let styleSeat = {seatBorder:"1px solid #7B8B99", seatColor:"#C3CFD9"};
        if (!seat.isAvailable){
            styleSeat = {seatBorder:"1px solid #F7C52B", seatColor:"#FBE192"};
        }
        return (<SeatItem key={seat.id} style={styleSeat}>{seat.name}</SeatItem>);
    }

/*
    function renderSeat(seat){
        let estilo = {seatBorder:"1px solid #7B8B99", seatColor:"#C3CFD9"};
        // let estilo = styleSeat;
        if (!seat.isAvailable){
            estilo = {seatBorder:"1px solid #F7C52B", seatColor:"#FBE192"};
        }
        // setStyleSeat(estilo);
        // return (<SeatItem key={seat.id} style={estilo}>{seat.name}</SeatItem>);
    } */


    return (

        <SeatsContainer>
            {props.list.map(seat => renderSeat(seat))}         
        </SeatsContainer>

    )
}

const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const SeatItem = styled.div`
    border: ${props => props.style.seatBorder}; ;         // Essa cor deve mudar
    background-color: ${props => props.style.seatColor};  // Essa cor deve mudar
    color: "#000000";
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    cursor: pointer;
`