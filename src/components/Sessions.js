import styled from "styled-components"
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';


export default function Sessions (props){

    let assentos = "/assentos/:";

    return (

        <>  
            {props.list.map(item => 
                                <SessionContainer key={item.id}> 
                                    {item.weekday} - {item.date}    
                                    <ButtonsContainer>
                                        {item.showtimes.map(sessionTime => 
                                        <Link to={assentos + sessionTime.id} key={sessionTime.id}>
                                            <button> 
                                                {sessionTime.name}
                                            </button>
                                        </Link>)}
                                    </ButtonsContainer>                                                                      
                                </SessionContainer>
            )}        
        </>
    )
        
}

const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
    button {
        cursor: pointer;
    }
`