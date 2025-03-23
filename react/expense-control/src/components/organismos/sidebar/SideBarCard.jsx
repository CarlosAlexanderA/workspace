import React from 'react';
import {v} from '../../../index';
import styled from 'styled-components';

function SideBarCard() {
  return (
    <Container>
      <span className="icon">{<v.iconoayuda />}</span>
      <div className="cardContent">
        <div className="circle1"></div>
        <div className="circle2"></div>

        <h3>Centro de ayuda</h3>

        <button className="btn">Conectar</button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  text-align: center;
  position: relative;

  .icon {
    position: absolute;
    font-size: 3rem;
    border-radius: 50%;
    top: -8px;
    right: 50%;
    transform: translateX(50%);
    z-index: 100;
  }

  .cardContent {
    position: relative;
    padding: 1rem;
    background: ${({theme}) => theme.bg5};
    border-radius: 10px;
    overflow: hidden;

    .circle1,
    .circle2 {
      position: absolute;
      background: ${({theme}) => theme.whiteBg};
      border-radius: 50%;
      opacity: 0.7;
    }

    .circle1 {
      height: 100px;
      width: 100px;
      top: -50px;
      left: -50px;
    }

    .circle2 {
      height: 130px;
      width: 130px;
      bottom: -80px;
      right: -70px;
      z-index: 1;
    }
    h3 {
      font-size: 1.1rem;
      margin-top: 1rem;
      padding: 1rem;
      font-weight: 800;
      color: #000;
    }
  }
`;

export default SideBarCard;
