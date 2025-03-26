import { profileSchema, typeLogin, typeProfile, typeUser } from "../types/types";
import API from "./url";


export const registerUser = async (userData: typeUser): Promise<void> => {
    try {
        await API.post('/user', userData);
    } catch (error: any) {
        console.error("Ошибка регистрации:", error);
        throw error;
    }
};

export const loginUser = async (userData: typeLogin): Promise<void> => {
    try {
        await API.post('/auth/login', userData);
    } catch (error: any) {
        console.error("Ошибка авторизации:", error);
        throw error;
    }
};

export const logoutUser = async (): Promise<void> => {
    try {
        await API.get('/auth/logout');
    } catch (error: any) {
        console.error("Ошибка выхода:", error);
        throw error;
    }
};

export const fetchMe = async (): Promise<typeProfile> => {
    try {
        const response = await API.get('/profile');
        const parsedData = profileSchema.parse(response.data);
        return parsedData;
    } catch (error: any) {
        console.error("Ошибка идентификации пользователя:", error);
        throw error;
    }
}




