import styled from "styled-components";

const HomeHeroStyle = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  .hero__slider {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .hero__slider_single {
    width: 100%;
    position: absolute;
    background: var(--purple);
    background-image: linear-gradient(
      180deg,
      rgba(67, 130, 163, 1) 50%,
      rgba(48, 73, 116, 1) 100%
    );
    transition: 0.3s transform;
    &.hero__slider_single--active: {
      transform: translateX(0);
    }
  }
  .hero__image {
    img {
      object-fit: cover;
      width: 100%;
      height: calc(100vh - var(--headerLgHeight));
      ${(props) => props.theme.breakpoints.lgDown} {
        height: calc(100vh - var(--headerMdHeight));
      }
      opacity: 0.9;
    }
  }
  .hero__info {
    position: absolute;
    bottom: 0;
    z-index: 2;
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 var(--containerLgPadding) 60px;
    background: var(--black);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 0.8) 100%
    );
    color: var(--white);
    ${(props) => props.theme.breakpoints.lgDown} {
      padding: 45% var(--containerMdPadding) 60px;
    }
    p {
      margin: 0;
      padding: 0 10px;
    }
    h1 {
      font-size: 45px;
      margin: 0;
      font-weight: 600;
      line-height: 60px;
      a {
        color: inherit;
        text-decoration: none;
        padding: 0 10px;
        background-image: linear-gradient(
          120deg,
          rgba(89, 196, 251, 0.3) 0%,
          rgba(79, 123, 197, 0.3) 100%
        );
        background-repeat: no-repeat;
        background-size: 100% 0.2em;
        background-position: 0 88%;
        transition: background-size 0.25s;
        &:hover {
          background-size: 100% 0.5em;
          color: inherit;
          text-decoration: none;
        }
      }
    }
    span {
      display: block;
      margin: 0;
      font-size: 17px;
      font-weight: 500;
      padding: 0 10px;
    }
  }
  .hero__controller {
    position: fixed;
    top: 50%;
    left: 60%;
    transform: translate(-50%, 50%);
    z-index: 5;
    background-color: var(--white);
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    ${(props) => props.theme.breakpoints.lgDown} {
      display: none;
    }
    button {
      padding: 0;
      outline: none;
      border: none;
      background-color: transparent;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      font-size: 25px;
      color: var(--purple);
      transition: 0.2s background-color;
      svg {
        transition: 0.2s transform;
      }
      &:hover {
        background-color: #4f7bc520;
        svg {
          transform: scale(1.15);
        }
      }
    }
  }
`;

export default HomeHeroStyle;
