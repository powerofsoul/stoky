import Consts from "../../Consts";
import style from "./Footer.module.scss";

const Footer = () => {
    return (
        <div className={style.Footer}>
            <div className={style.Content}>
                <a href="/">{Consts.SiteName}</a>
            </div>
        </div>
    );
};

export default Footer;
