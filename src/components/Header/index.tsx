import Consts from "../../Consts";
import style from "./Header.module.scss";

const Header = () => {
    return <div className={style.Header}>
        <div className={style.Content}>
            {Consts.SiteName}
        </div>
    </div>
}

export default Header;