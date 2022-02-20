import styled from "styled-components";

export const ContentWrapper = styled.section`
  position: relative;
  width: 100%;
  height: calc(100vh - var(--headerLgHeight));
  ${(props) => props.theme.breakpoints.lgDown} {
    height: calc(100vh - var(--headerMdHeight));
    overflow-y: auto;
  }
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const ContentWrapperSplitted = styled.section<{
  width: string;
  custom?: (theme: any) => string;
}>`
  width: ${(props) => props.width};
  ${(props) => props.theme.breakpoints.lgUp} {
    height: 100%;
    overflow-y: auto;
  }
  ${(props) => props.theme.breakpoints.lgDown} {
    width: 100% !important;
  }
  ${(props) => (props.custom ? props.custom(props.theme) : "")}
`;

export const OriginalWrapper = styled.section<{
  custom?: (theme: any) => string;
}>`
  width: 100%;
  padding-right: var(--containerLgPadding);
  padding-left: var(--containerLgPadding);
  ${(props) => props.theme.breakpoints.lgDown} {
    padding-right: var(--containerMdPadding);
    padding-left: var(--containerMdPadding);
    height: calc(100vh - var(--headerMdHeight));
  }
  ${(props) => props.theme.breakpoints.lgUp} {
    height: calc(100vh - var(--headerLgHeight));
    overflow-y: auto;
  }
  ${(props) => (props.custom ? props.custom(props.theme) : "")}
`;
