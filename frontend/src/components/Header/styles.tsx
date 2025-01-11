import styled from "styled-components";


interface MenuContainerProps {
  isOpen: boolean;
}


export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #101813;
  color: #fff;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

export const HamburgerIcon = styled.div`
  display: none;
  color: #fff;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MenuContainer = styled.div<MenuContainerProps>`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    position: absolute;
    z-index: 1;
    top: 60px;
    right: 0;
    background-color: #101813;
    flex-direction: column;
    width: 100%;
  }
    
  > div {
    @media (max-width: 768px) {
      flex-direction: ${(props) => (props.isOpen ? "column" : "row")};
      gap: 10px;
    }
  }
`;
