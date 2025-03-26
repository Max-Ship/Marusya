import style from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/authState";
import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";


const AccountData: FC = memo(() => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userData = useAppSelector((state) => state.auth.userData);

    if (!userData) {
        return;
    }

    const initials = userData.name[0] + userData.surname[0];

    const handleLogout = async () => {
        await dispatch(logout()).unwrap();
        navigate('/', { replace: true });
    }

    return (
        <div className={`flex flex__column ${style.dataAccount}`}>
            <div className={`flex flex__column ${style.dataAccount__data}`}>
                <div className={`flex ${style.dataAccount__wrapData}`}>
                    <div className={`flex flex__column ${style.dataAccount__marker}`}>
                        {initials}
                    </div>
                    <div className={`flex flex__column ${style.dataAccount__markerWrap}`}>
                        <span className={style.dataAccount__markerKey}>Имя Фамилия</span>
                        <span className={style.dataAccount__markerValue}>{userData.name} {userData.surname}</span>
                    </div>
                </div>
                <div className={`flex ${style.dataAccount__wrapData}`}>
                    <div className={`flex flex__column ${style.dataAccount__marker}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" fill="white" />
                        </svg>
                    </div>
                    <div className={`flex flex__column ${style.dataAccount__markerWrap}`}>
                        <span className={style.dataAccount__markerKey}>Электронная почта</span>
                        <span className={style.dataAccount__markerValue}>{userData.email}</span>
                    </div>
                </div>
            </div>
            <button className={`${style.dataAccount__btnLogout} ${style.btnPaddingUI}`} onClick={handleLogout}>Выйти из аккаунта</button>
        </div>
    )
});


export default AccountData;