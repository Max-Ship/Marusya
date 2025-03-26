import style from "./style.module.scss";
import { useAppDispatch } from "../../../store/hooks";
import { resetRegSuccess } from "../../../store/slices/authState";
import { FC } from "react";


const SuccessForm: FC = () => {
    const dispatch = useAppDispatch();

    const handleButton = () => {
        dispatch(resetRegSuccess())
    }

    return (
        <div className={`flex flex__column ${style.form}`}>
            <h2 className={style.form__title}>Регистрация завершена!</h2>
            <p className={style.form__text}>Используйте вашу электронную почту для входа</p>
            <button className={style.form__button} onClick={handleButton}>Войти</button>
        </div>
    )
}


export default SuccessForm;