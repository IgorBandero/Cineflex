import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from 'axios';
import Movies from "../../components/Movies";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function HomePage() {

    return (
        <>
            <PageContainer>
            Selecione o filme
            <Movies />            
            </PageContainer>               
        </>        
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
    padding-top: 70px;
`
