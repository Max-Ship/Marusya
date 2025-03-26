import style from "./style.module.scss";
import { FC } from "react";


const ListLoader: FC = () => {
    return (
        <div className={`flex flex__column ${style.container}`}>
            <div className={style.loader}>
                <span>L</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
                <span className={style.dot}>.</span>
                <span className={style.dot}>.</span>
                <span className={style.dot}>.</span>
            </div>
        </div>
    )
}


export default ListLoader