import convertLanguage from "./convertLanguages/convertLanguage";
import formatBudget from "./formatBudget";
import formatRuntime from "./formatTime";
import generateDefaultPosterUrl from "./generateDefaultPosterUrl";
import handleBlurInputClear from "./handleBlurInputClear";
import addTextByError from "./textByError";

// Тесты для handleBlurInputClear
describe('handleBlurInputClear', () => {
    const mockSetValue = jest.fn();
    const mockClearErrors = jest.fn();
    const errors = { username: { message: 'Error message' } };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should clear value and error when error exists', () => {
        const handler = handleBlurInputClear(
            'username',
            mockSetValue as any,
            mockClearErrors,
            errors as any
        );

        handler();
        expect(mockSetValue).toHaveBeenCalledWith('username', '', { shouldValidate: false });
        expect(mockClearErrors).toHaveBeenCalledWith('username');
    });

    it('should do nothing when no error exists', () => {
        const handler = handleBlurInputClear(
            'username',
            mockSetValue as any,
            mockClearErrors,
            {} as any
        );

        handler();
        expect(mockSetValue).not.toHaveBeenCalled();
        expect(mockClearErrors).not.toHaveBeenCalled();
    });
});

// Тесты для generateDefaultPosterUrl
describe('generateDefaultPosterUrl', () => {
    it('should generate correct URL', () => {
        const result = generateDefaultPosterUrl(300, 450, 'Test Title');
        expect(result).toBe('https://dummyimage.com/300x450/fff.gif&text=Test Title');
    });

    it('should handle special characters', () => {
        const result = generateDefaultPosterUrl(200, 300, 'Movie: "Best"');
        expect(result).toContain('Movie: "Best"');
    });
});

// Тесты для formatRuntime
describe('formatRuntime', () => {
    it('should format 90 minutes correctly', () => {
        expect(formatRuntime(90)).toBe('1 ч 30 мин');
    });

    it('should handle only hours', () => {
        expect(formatRuntime(120)).toBe('2 ч');
    });

    it('should handle only minutes', () => {
        expect(formatRuntime(45)).toBe('45 мин');
    });
});

// Тесты для formatBudget
describe('formatBudget', () => {
    it('should format RUB correctly', () => {
        expect(formatBudget('1000000', 'ru')).toBe('100 000 000 руб.');
    });

    it('should format USD correctly', () => {
        expect(formatBudget('1500000', 'en')).toBe('1 500 000 USD');
    });

    it('should handle null budget', () => {
        expect(formatBudget(null, 'en')).toBe('Неизвестно');
    });

    it('should handle different multipliers', () => {
        expect(formatBudget('1000', 'ru')).toBe('100 000 руб.');
        expect(formatBudget('1000', 'en')).toBe('1 000 USD');
    });
});

describe('addTextByError', () => {
    it('should return server error message for 5xx status codes', () => {
        const error = { status: 500 };
        expect(addTextByError(error)).toBe("Провете соединение с интернетом или зайдите по позже! Сервер не отвечает!");
    });

    it('should return network error message', () => {
        const error = { message: "Network Error" };
        expect(addTextByError(error)).toBe("Провете соединение с интернетом или зайдите по позже! Сервер не отвечает!");
    });

    it('should return auth error message for 401/403 status codes', () => {
        const error = {
            status: 401,
            response: {
                data: { result: false }
            }
        };
        expect(addTextByError(error)).toBe("Ошибка авторизации! Введите заригестрированную почту и пароль!");
    });

    it('should return user exists error message', () => {
        const error = {
            status: 400,
            response: {
                data: { error: "User already exists" }
            }
        };
        expect(addTextByError(error)).toBe("Такой пользователь уже существует! Введите другой Email!");
    });

    it('should return default error message for other 4xx errors', () => {
        const error = { status: 400 };
        expect(addTextByError(error)).toBe("Извините возникла непредвиденная ошибка! Перезагрузите страницу или зайдите по позже!");
    });

    it('should return fallback text when error is not recognized', () => {
        const error = { status: 200 };
        expect(addTextByError(error)).toBe("");
    });

    it('should return fallback text when error processing fails', () => {
        const error = { status: null };
        expect(addTextByError(error)).toBe("");
    });

    it('should return fallback text when error is undefined', () => {
        expect(addTextByError(undefined)).toBe("");
    });

    it('should return custom fallback text when provided', () => {
        const error = { status: 200 };
        expect(addTextByError(error, "Custom error message")).toBe("Custom error message");
    });
});

// Тесты для convertLanguage
describe('convertLanguage', () => {
    it('returns "Неизвестно" for empty string', () => {
        expect(convertLanguage('')).toBe('Неизвестно');
    });

    it('returns "Неизвестно" for non-existent code', () => {
        expect(convertLanguage('non-existent')).toBe('Неизвестно');
    });

    it('returns correct language name for existing code', () => {
        expect(convertLanguage('ru')).toBe('Русский');
        expect(convertLanguage('en')).toBe('Английский');
        expect(convertLanguage('zh')).toBe('Китайский');
    });

    it('works with uppercase codes', () => {
        expect(convertLanguage('RU')).toBe('Русский');
        expect(convertLanguage('EN')).toBe('Английский');
    });

    it('works with mixed-case codes', () => {
        expect(convertLanguage('Ru')).toBe('Русский');
        expect(convertLanguage('En')).toBe('Английский');
    });

});


