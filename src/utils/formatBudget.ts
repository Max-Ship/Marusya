function formatBudget(budget: string | null, language: string | null): string {
    const lang = language?.toLowerCase() ?? 'en';
    const currency = lang === 'ru' ? 'руб.' : 'USD';
    const multiplier = lang === 'ru' ? 100 : 1;

    return budget !== null ? `${(Number(budget) * multiplier).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ${currency}` : 'Неизвестно';
}


export default formatBudget;
