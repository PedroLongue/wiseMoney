import { useContext } from "react";
// import { Navigate } from "react-router-dom";
import WiseMoneyLogo from "../../assets/img/Logo.svg";
import { HeaderContainer } from "./styles";
import {AuthContext} from "../../contexts/auth";
import Button from "../../components/Button";

const Header = () => {
  const { signed, singOut } = useContext(AuthContext);

  const handleLogout = () => {
    singOut();
  };

  return (
    <HeaderContainer>
      <img src={WiseMoneyLogo} alt="WiseMoney Logo" />
      {signed && <Button text="SAIR" onClick={handleLogout} />}
    </HeaderContainer>
  );
};

export default Header;
