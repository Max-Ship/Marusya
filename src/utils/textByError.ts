function addTextByError(error: any, textError: string = ""): string {
    try {
        if (String(error.status).startsWith('5') || error.message === "Network Error") {
            return "Провете соединение с интернетом или зайдите по позже! Сервер не отвечает!";
        } else if (String(error.status).startsWith('4')) {
            if (error.response) {
                if (error.response.data.result === false) {
                    return "Ошибка авторизации! Введите заригестрированную почту и пароль!";
                } else if (error.response.data.error === "User already exists") {
                    return "Такой пользователь уже существует! Введите другой Email!";
                }
            } else {
                return "Извините возникла непредвиденная ошибка! Перезагрузите страницу или зайдите по позже!";
            }
        }
        return textError;
    } catch {
        return textError;
    }
}


export default addTextByError;
