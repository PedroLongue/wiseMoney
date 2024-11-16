import WiseMoneyLogo from "../../assets/img/Logo.svg";
import { HeaderContainer } from "./styles";
import AuthContext from "../../contexts/auth";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <HeaderContainer>
      <img src={WiseMoneyLogo} />
      {user && <p>SAIR</p>}
    </HeaderContainer>
  );
};

export default Header;
