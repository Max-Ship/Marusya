import style from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { closeAuthModal, login } from "../../../store/slices/authState";
import BtnLoader from "../../loaders/btnLoader/BtnLoader";
import { loginSchema } from "../../../types/types";
import { FC } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";


interface FormData extends z.infer<typeof loginSchema> { }

const LoginForm: FC = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.auth);

    const { register, handleSubmit, setValue, clearErrors, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const submitLogin = async (userData: FormData) => {
        await dispatch(login(userData)).unwrap();
        dispatch(closeAuthModal());
    };

    const onSubmit = handleSubmit(async (data: FormData) => {
        await submitLogin(data);
    });


    const handleBlurInputClear = (field: keyof FormData) => {
        return () => {
            if (errors[field]?.message) {
                setValue(field, "", { shouldValidate: false });
                clearErrors(field);
            }
        };
    };

    return (
        <form className={`flex flex__column ${style.form}`} onSubmit={onSubmit}>
            <div className={`flex ${style.wrapperInput}`}>
                <svg width="24.000000" height="24.000000" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <defs>
                        <clipPath id="clip70_1387">
                            <rect id="icon" rx="0.000000" width="23.000000" height="23.000000" transform="translate(0.500000 0.500000)" fill="white" fillOpacity="0" />
                        </clipPath>
                    </defs>
                    <rect id="icon" rx="0.000000" width="23.000000" height="23.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fillOpacity="0" />
                    <g clipPath="url(#clip70_1387)">
                        <path id="Vector" d="M21 3C21.55 3 22 3.44 22 4L22 20C22 20.55 21.54 21 21 21L2.99 21C2.44 21 2 20.55 2 20L2 19L20 19L20 7.3L12 14.5L2 5.5L2 4C2 3.44 2.44 3 3 3L21 3ZM8 15L8 17L0 17L0 15L8 15ZM5 10L5 12L0 12L0 10L5 10ZM19.56 5L4.43 5L12 11.8L19.56 5Z" fillRule="nonzero" />
                    </g>
                </svg>
                <input
                    className={`${style.formInput} ${style.loginInput} ${errors.email ? style.errorInput : ""}`}
                    type="text"
                    placeholder="Электронная почта"
                    {...register("email")}
                    required
                    onBlur={handleBlurInputClear("email")}
                />
                {errors.email && <p className={style.errorInputText}>{errors.email.message}</p>}
            </div>
            <div className={`flex ${style.wrapperInput}`}>
                <svg width="24.000000" height="24.000000" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <defs>
                        <clipPath id="clip70_1395">
                            <rect id="icon" rx="0.000000" width="23.000000" height="23.000000" transform="translate(0.500000 0.500000)" fill="white" fillOpacity="0" />
                        </clipPath>
                    </defs>
                    <rect id="icon" rx="0.000000" width="23.000000" height="23.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fillOpacity="0" />
                    <g clipPath="url(#clip70_1395)">
                        <path id="Vector" d="M12.91 13C12.44 15.83 9.97 18 7 18C3.68 18 1 15.31 1 12C1 8.68 3.68 6 7 6C9.97 6 12.44 8.16 12.91 11L23 11L23 13L21 13L21 17L19 17L19 13L17 13L17 17L15 17L15 13L12.91 13ZM7 16C9.2 16 11 14.2 11 12C11 9.79 9.2 8 7 8C4.79 8 3 9.79 3 12C3 14.2 4.79 16 7 16Z" fillRule="nonzero" />
                    </g>
                </svg>
                <input
                    className={`${style.formInput} ${style.loginInput} ${errors.password ? style.errorInput : ""}`}
                    type="password"
                    placeholder="Пароль"
                    {...register("password")}
                    required
                    onBlur={handleBlurInputClear("password")}
                />
                {errors.password && <p className={style.errorInputText}>{errors.password.message}</p>}
            </div>
            <button className={`${style.form__button} ${style.login__button}`} type="submit">{loading === 'pending' && <BtnLoader />}Войти</button>
        </form>
    )
}


export default LoginForm;