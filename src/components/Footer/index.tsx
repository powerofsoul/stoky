import Consts from "../../Consts"
import style from "./Footer.module.scss"

const Footer = () => {
    return <div className={style.footer}>
        <p>
            {Consts.SiteName}
        </p>
    </div>
}

export default Footer;