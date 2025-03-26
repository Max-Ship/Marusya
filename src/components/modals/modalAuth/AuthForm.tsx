import style from "./style.module.scss";
import logo from "../../../../public/svg/logo_marusya_b.svg";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import SuccessForm from "./SuccessForm";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { closeAuthModal, resetAuthForm } from "../../../store/slices/authState";
import ButtonClose from "../../buttonClose/ButtonClose";
import { FC, useState } from "react";
import ModalErrors from "../errorsModal/ModalErrors";


const AuthForm: FC = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const isOpen = useAppSelector((state) => state.auth.isAuthModalOpen);
    const regSuccess = useAppSelector((state) => state.auth.regSuccess);
    const errors = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(closeAuthModal());
    };

    const toggleForm = () => {
        dispatch(resetAuthForm());
        setIsRegistering(!isRegistering);
    };

    return (isOpen && (<div className={`flex flex__column ${style.modalOverlay}`}>
        <div className={`flex flex__column ${style.container_form}`}>
            <img className={style.authLogo} src={logo} alt="Logo" />
            {!regSuccess ?
                <>
                    {isRegistering ? <LoginForm /> : <RegisterForm />}
                    <button className={style.authFormBtn} onClick={toggleForm}>
                        {isRegistering ? "Регистрация" : "У меня есть пароль"}
                    </button>
                </>
                :
                <SuccessForm />
            }
            <ButtonClose style={style.closeButton} onClose={handleClose} />
            {errors && <ModalErrors inModal={true} />}
        </div>
    </div>)
    )
}


export default AuthForm;
