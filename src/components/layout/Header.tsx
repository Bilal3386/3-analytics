import { useHistory } from "react-router-dom";
import classes from "./Header.module.css";

interface Props {
  name: string;
  isLoggedIn: boolean;

  onLogoutClick: () => void;
}

const Header: React.FC<Props> = (props) => {
  const history = useHistory();
  const { isLoggedIn, onLogoutClick } = props;
  const handleLogout = () => {
    onLogoutClick();
    history.push("/auth");
  };

  return (
    <header>
      <div className={classes["header-left"]}>
        <h1>{props.name}</h1>
      </div>
      <div className={classes[`header-right`]}>
        {isLoggedIn ? <button onClick={handleLogout}>Logout</button> : <></>}
      </div>
    </header>
  );
};

export default Header;
