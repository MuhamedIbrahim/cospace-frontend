import styled from "styled-components";

const HeaderStyle = styled.header<{ headerStyle: "default" | "blue" }>`
  position: relative;  
  height: var(--headerLgHeight);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--${(props) =>
    props.headerStyle === "blue" ? "purple" : "lightGrey2"});
  padding: 10px var(--containerLgPadding);
  color: var(--${(props) =>
    props.headerStyle === "blue" ? "lightGrey3" : "darkGrey2"});
  font-weight: 500;
  font-size: 15px;
  transition: .2s background-color;
  ${(props) => props.theme.breakpoints.lgDown} {
    height: var(--headerMdHeight);
    padding: 10px var(--containerMdPadding);
  }
  nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    li {
      &:not(:first-of-type) {
        ${(props) => props.theme.breakpoints.lgUp} {
          margin-${(props) =>
            props.theme.lang === "ar" ? "right" : "left"}: 40px;
        }
      }
      a, button {
        transition: color .1s;
        outline: none;
        background: none;
        border: none;
        padding: 0;
        color: var(--${(props) =>
          props.headerStyle === "blue" ? "lightGrey3" : "darkGrey2"});
        font-weight: 500;
        font-size: 15px;
        &:hover {
          text-decoration: none;
          color: var(--${(props) =>
            props.headerStyle === "blue" ? "white" : "purple"});
        }
      }
    }
  }
  .header__main_nav {
    flex: 1;
    ${(props) => props.theme.breakpoints.lgUp} {
      padding: 0 100px;
      .lang_switcher {
        display: none;
      }
      .header__profile_name {
        display: none;
        & + li {
          margin-${(props) => (props.lang === "ar" ? "right" : "left")}: 0;
        }
      }
    }
    ${(props) => props.theme.breakpoints.lgDown} {
      // display: none;
      position: absolute;
      height: 100vh;
      background-color: var(--white);
      ${(props) => (props.theme.lang === "ar" ? "left" : "right")}: 0;
      top: 0;
      flex-direction: column;
      align-items: flex-start;
      padding: 60px 40px 40px;
      overflow-y: auto;
      transition: .3s width, .3s transform;
      width: 150px;
      transform: translateX(100%);
      visibility: hidden;
      z-index: 100;
      &.header__main_nav--expanded {
        visibility: visible;
        transform: translateX(0);
        width: 100%;
      }
      li {
        &, &:hover {
          color: var(--darkGrey2);
        }
        &:not(:last-child) {
          margin-bottom: 20px;
        }
        a, button {
          &, &:hover {
            color: var(--darkGrey2);
          }
          font-size: 15px;
        }
      }
      .header__mob_nav_close {
        position: absolute;
        top: 20px;
        ${(props) => (props.theme.lang === "ar" ? "left" : "right")}: 30px;
        button {
          font-size: 25px;
          color: var(--darkGrey2);
        }
      }
      .header__profile_name {
        border-bottom: 1px solid var(--lightGrey4);
        padding-bottom: 20px;
        width: 100%;
        .header__profile_img, .header__profile_img img {
          width: 42px;
          height: 42px;
        }      
      }
    }
  }
  .header__profile_nav {
    ${(props) => props.theme.breakpoints.lgDown} {
        display: none;
    }
  }
  .header__profile_name {
    display: flex;
    align-items: center;
  }
  .header__profile_img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--lightGrey3);
    margin-${(props) => (props.theme.lang === "ar" ? "left" : "right")}: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--darkGrey2);
    img {
      width: 32px;
      height: 32px;
      object-fit: contain;
      border-radius: 50%;
    }
  }
  .header__mob_nav_switcher {
    ${(props) => props.theme.breakpoints.lgUp} {
        display: none;
    }
    button {
      outline: none;
      background: none;
      border: none;
      padding: 0;
      font-size: 22px;
      color: var(--${(props) =>
        props.headerStyle === "blue" ? "white" : "darkGrey2"});
    }
  }

`;

export default HeaderStyle;
