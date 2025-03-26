import { langs } from './languagesList';


function convertLanguage(code: string | null): string {
    return !code || !langs[code.toLowerCase()] ? "Неизвестно" : langs[code.toLowerCase()];
}


export default convertLanguage;