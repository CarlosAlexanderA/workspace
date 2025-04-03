import styled from 'styled-components';

export default function BtnCircular({
  icono,
  width,
  height,
  bgColor,
  textColor,
  fontSize,
  translateX,
  translateY,
}) {
  return (
    <Container
      $bgcolor={bgColor}
      $textcolor={textColor}
      $height={height}
      $width={width}
      $fontsize={fontSize}
      $translatex={translateX}
      $translatey={translateY}
    >
      <span>{icono}</span>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({$bgcolor}) => $bgcolor};
  min-width: ${({$width}) => $width};
  min-height: ${({$height}) => $height};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  transform: translateX(${({$translatex}) => $translatex})
    translateY(${({$translatey}) => $translatey});

  span {
    font-size: ${({$fontsize}) => $fontsize};
    text-align: center;
    color: ${({$textcolor}) => $textcolor};
  }
`;
