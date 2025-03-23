import styled from 'styled-components';
import {LinksArray, SecondarylinksArray, SideBarCard, v} from '../../../index';
import {NavLink} from 'react-router-dom';

export const SideBar = ({state, setState}) => {
  return (
    <Main isOpen={state}>
      <span className="sidebarButton" onClick={() => setState(!state)}>
        {<v.iconoflechaderecha />}
      </span>
      <Container isOpen={state} className={state ? 'active' : ''}>
        <div className="logoContent">
          <div className="imgContent">
            <img src={v.logo} />
          </div>
          <h2>Cerdys</h2>
        </div>
        {/* liks de las vistas */}
        {LinksArray.map(({icon, label, to}) => (
          <div
            key={label}
            className={`linkContainer ${state ? 'active' : ''} `}
          >
            <NavLink
              to={to}
              className={({isActive}) => `links ${isActive ? 'active' : ''}`}
            >
              <div className="linkIcon">{icon}</div>
              {state && <span>{label}</span>}
            </NavLink>
          </div>
        ))}
        <Divider />

        {SecondarylinksArray.map(({icon, label, to}) => (
          <div
            key={label}
            className={`linkContainer ${state ? 'active' : ''} `}
          >
            <NavLink
              to={to}
              className={({isActive}) => `links ${isActive ? 'active' : ''}`}
            >
              <div className="linkIcon">{icon}</div>
              {state && <span>{label}</span>}
            </NavLink>
          </div>
        ))}

        <Divider />
        {state && <SideBarCard />}
      </Container>
    </Main>
  );
};
const Container = styled.div`
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.bg};
  position: fixed;
  padding-top: 20px;
  z-index: 50;
  height: 100%;
  width: 65px;
  grid-template-columns: 65px 1fr;

  &.active {
    width: 220px;
  }

  .logoContent {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 60px;
    .imgContent {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      cursor: pointer;
      transition: all 0.5s ease-in-out;

      transform: ${({isOpen}) => (isOpen ? `scale(0.7)` : `scale(1.5)`)}
        rotate(${({theme}) => theme.logorotate});

      img {
        width: 100%;
        animation: flotar 1.7s ease-in-out infinite alternate;
      }
    }
    h2 {
      display: ${({isOpen}) => (isOpen ? `block` : `none`)};
    }

    @keyframes flotar {
      0% {
        transform: translate(0, 0px);
      }
      50% {
        transform: translate(0, 4px);
      }
      100% {
        transform: translate(0, -0px);
      }
    }
  }

  .linkContainer {
    margin: 5px 0;
    transition: all 0.3s;
    padding: 0 5%;
    position: relative;

    &:hover {
      background: ${(props) => props.theme.bgAlpha} !important;
    }

    .links {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: calc(${() => v.smSpacing}-2px) 0;
      color: ${(props) => props.theme.text};
      height: 60px;

      .linkIcon {
        padding: ${() => v.smSpacing} ${() => v.mdSpacing};
        svg {
          font-size: 25px;
        }
      }
      &.active {
        color: ${(props) => props.theme.bg5};

        &::before {
          content: '';
          position: absolute;
          height: 100%;
          background: ${(props) => props.theme.bg5};
          width: 4px;
          border-radius: 10px;
          left: 0;
        }
      }
    }
  }
`;

const Main = styled.div`
  .sidebarButton {
    position: fixed;
    top: 70px;
    left: 42px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${(props) => props.theme.bgtgderecha};
    box-shadow: 0 0 4px ${(props) => props.theme.bg3},
      0 0 7px ${(props) => props.theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 100;
    transform: ${({isOpen}) =>
      isOpen ? `translateX(162px) rotate(3.142rad)` : `initial`};
    color: ${(props) => props.theme.text};
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg4};
  margin: ${() => v.lgSpacing} 0;
`;

// * mequede en 2:45:50
