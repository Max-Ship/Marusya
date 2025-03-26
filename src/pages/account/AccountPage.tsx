import style from "./style.module.scss";
import Favotites from "../../../public/svg/favorites_off.svg";
import User from "../../../public/svg/user_off.svg";
import FavoritList from "../../components/favoritsList/FavoritList";
import AccountData from "../../components/accountData/AccountData";
import { FC, memo, useState } from "react";


const AccountPage: FC = () => {
    const [isBlock, setIsBlock] = useState(false)

    const handleFavoritesClick = () => {
        setIsBlock(true);
    };

    const handleAccountClick = () => {
        setIsBlock(false);
    };

    return (
        <div className={style.container}>
            <div className={`flex flex__column ${style.account}`}>
                <h1 className={style.account__title}>Мой аккаунт</h1>
                <div className={`flex ${style.account__btnWrap}`}>
                    <button className={`flex ${style.account__btn} ${style.account__btn_favorites}`} onClick={handleFavoritesClick}>
                        <img className={style.account__btnImg} src={Favotites} alt="Favotites" />
                    </button>
                    <button className={`flex ${style.account__btn} ${style.account__btn_account}`} onClick={handleAccountClick}>
                        <img className={style.account__btnImg} src={User} alt="User" />
                    </button>
                </div>
                {isBlock ? <FavoritList /> : <AccountData />}
            </div>
        </div>
    )
}


export default memo(AccountPage);