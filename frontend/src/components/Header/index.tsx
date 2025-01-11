import { useContext, useState } from "react";
import WiseMoneyLogo from "../../assets/img/Logo.svg";
import { HeaderContainer, MenuContainer, HamburgerIcon } from "./styles";
import { AuthContext } from "../../contexts/auth";
import Button from "../../components/Button";
import Divider from "@mui/material/Divider";
import { Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const { signed, singOut, currentUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    singOut();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <HeaderContainer>
        <img src={WiseMoneyLogo} alt="WiseMoney Logo" />
        <HamburgerIcon onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </HamburgerIcon>
        <MenuContainer isOpen={isMenuOpen}>
          {signed && currentUser && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt={currentUser.name}
                src={""}
                sx={{ marginRight: "10px", bgcolor: "#fff", color: "#15b858" }}
              >
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0]?.toUpperCase())
                  .join("")}
              </Avatar>
              <span style={{ color: "#fff", marginRight: "10px" }}>
                Olá, {currentUser.name.split(" ").shift()}
              </span>
              <Button text="SAIR" onClick={handleLogout} />
            </div>
          )}
        </MenuContainer>
      </HeaderContainer>
      <Divider sx={{ backgroundColor: "#fff" }} />
    </>
  );
};

export default Header;
