import Consts from "../../Consts";
import styles from "./Header.module.scss";
const Header = () => {
    return <div className={styles.Header}>
        {Consts.SiteName}
    </div>
}

export default Header;