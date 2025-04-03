import styled from 'styled-components';

export default function BtnFiltro({bgColor, textColor, icono, funcion}) {
  return (
    <Container $bgcolor={bgColor} $textcolor={textColor} onClick={funcion}>
      <div className="contentIcon">
        <span> {icono}</span>
      </div>
    </Container>
  );
}
const Container = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({$bgcolor}) => $bgcolor};
  color: ${({$textcolor}) => $textcolor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  position: relative;
  cursor: pointer;

  .contentIcon {
    position: absolute;
    top: 25%;
    bottom: 25%;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    transition: 0.2s;

    &:hover {
      transform: scale(1.3);
    }
  }
`;
