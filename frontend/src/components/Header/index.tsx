import { useContext } from "react";
import WiseMoneyLogo from "../../assets/img/Logo.svg";
import { HeaderContainer } from "./styles";
import { AuthContext } from "../../contexts/auth";
import Button from "../../components/Button";
import Divider from "@mui/material/Divider";

const Header = () => {
  const { signed, singOut, currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    singOut();
  };

  console.log({ currentUser });

  return (
    <>
      <HeaderContainer>
        <img src={WiseMoneyLogo} alt="WiseMoney Logo" />
        {signed && currentUser && (
          <div>
            <span style={{ color: "#fff", marginRight: "10px" }}>
              Olá, {currentUser.name.split(" ").shift()}
            </span>{" "}
            <Button text="SAIR" onClick={handleLogout} />
          </div>
        )}
      </HeaderContainer>
      <Divider sx={{ backgroundColor: "#fff" }} />
    </>
  );
};

export default Header;
