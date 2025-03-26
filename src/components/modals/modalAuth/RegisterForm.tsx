import style from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { register as registerAction } from "../../../store/slices/authState";
import BtnLoader from "../../loaders/btnLoader/BtnLoader";
import { userSchema } from "../../../types/types";
import { FC } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";


interface FormData extends z.infer<typeof userSchema> {
    confirmPassword: string;
}

const confirmPasswordSchema = z.string().min(8, { message: "Пароль должен содержать минимум 8 символов" });

const registerSchema = userSchema.extend({
    confirmPassword: confirmPasswordSchema,
}).refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
});


const RegisterForm: FC = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.auth);

    const { register, handleSubmit, setValue, clearErrors, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: FormData) => {
        try {
            const { confirmPassword, ...userData } = data;
            await dispatch(registerAction(userData)).unwrap();
        } catch (err) {
            console.error("Ошибка при регистрации:", err);
        }
    };

    const handleBlurInputClear = (field: keyof FormData) => {
        return () => {
            if (errors[field]?.message) {
                setValue(field, "", { shouldValidate: false });
                clearErrors(field);
            }
        };
    };

    return (
        <form className={`flex flex__column ${style.form}`} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={style.form__title}>Регистрация!</h2>
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
                    className={`${style.formInput} ${style.registerInput} ${errors.email ? style.errorInput : ""}`}
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
                        <clipPath id="clip70_1389">
                            <rect id="icon" rx="0.000000" width="23.000000" height="23.000000" transform="translate(0.500000 0.500000)" fill="white" fillOpacity="0" />
                        </clipPath>
                    </defs>
                    <rect id="icon" rx="0.000000" width="23.000000" height="23.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fillOpacity="0" />
                    <g clipPath="url(#clip70_1389)">
                        <path id="Vector" d="M4 22C4 17.58 7.58 14 12 14C16.41 14 20 17.58 20 22L18 22C18 18.68 15.31 16 12 16C8.68 16 6 18.68 6 22L4 22ZM12 13C8.68 13 6 10.31 6 7C6 3.68 8.68 1 12 1C15.31 1 18 3.68 18 7C18 10.31 15.31 13 12 13ZM12 11C14.21 11 16 9.2 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.2 9.79 11 12 11Z" fillRule="nonzero" />
                    </g>
                </svg>

                <input
                    className={`${style.formInput} ${style.registerInput} ${errors.name ? style.errorInput : ""}`}
                    type="text"
                    placeholder="Имя"
                    {...register("name")}
                    required
                    onBlur={handleBlurInputClear("name")}
                />
                {errors.name && <p className={style.errorInputText}>{errors.name.message}</p>}
            </div>
            <div className={`flex ${style.wrapperInput}`}>
                <svg width="24.000000" height="24.000000" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <defs>
                        <clipPath id="clip70_1389">
                            <rect id="icon" rx="0.000000" width="23.000000" height="23.000000" transform="translate(0.500000 0.500000)" fill="white" fillOpacity="0" />
                        </clipPath>
                    </defs>
                    <rect id="icon" rx="0.000000" width="23.000000" height="23.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fillOpacity="0" />
                    <g clipPath="url(#clip70_1389)">
                        <path id="Vector" d="M4 22C4 17.58 7.58 14 12 14C16.41 14 20 17.58 20 22L18 22C18 18.68 15.31 16 12 16C8.68 16 6 18.68 6 22L4 22ZM12 13C8.68 13 6 10.31 6 7C6 3.68 8.68 1 12 1C15.31 1 18 3.68 18 7C18 10.31 15.31 13 12 13ZM12 11C14.21 11 16 9.2 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.2 9.79 11 12 11Z" fillRule="nonzero" />
                    </g>
                </svg>

                <input
                    className={`${style.formInput} ${style.registerInput} ${errors.surname ? style.errorInput : ""}`}
                    type="text"
                    placeholder="Фамилия"
                    {...register("surname")}
                    required
                    onBlur={handleBlurInputClear("surname")}
                />
                {errors.surname && <p className={style.errorInputText}>{errors.surname.message}</p>}
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
                    className={`${style.formInput} ${style.registerInput} ${errors.password ? style.errorInput : ""}`}
                    type="password"
                    placeholder="Пароль"
                    {...register("password")}
                    required
                    onBlur={handleBlurInputClear("password")}
                />
                {errors.password && <p className={style.errorInputText}>{errors.password.message}</p>}

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
                    className={`${style.formInput} ${style.registerInput} ${errors.confirmPassword ? style.errorInput : ""}`}
                    type="password"
                    placeholder="Подтвердите пароль"
                    {...register("confirmPassword")}
                    required
                    onBlur={handleBlurInputClear("confirmPassword")}
                />
                {errors.confirmPassword && <p className={style.errorInputText}>{errors.confirmPassword.message}</p>}

            </div>
            {loading === 'pending' && <p>Загрузка...</p>}
            <button className={`${style.form__button} ${style.register__button}`} type="submit">{loading === 'pending' && <BtnLoader />}Регистрация</button>
        </form>


    )
}


export default RegisterForm;