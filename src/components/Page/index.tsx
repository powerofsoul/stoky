import Footer from "../Footer"
import Header from "../Header"
import styles from "./Page.module.scss";

interface Props {
    children?: JSX.Element;
}

const Page = (props: Props) => {
    return <div className={styles.Page}>
        <Header />
            {props.children}
        <Footer/>
    </div>
}

export default Page;