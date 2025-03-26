function formatRuntime(runtimeInMinutes: number): string {
    const hours = Math.floor(runtimeInMinutes / 60);
    const minutes = runtimeInMinutes % 60;

    if (hours === 0) {
        return `${minutes} мин`;
    } else if (minutes === 0) {
        return `${hours} ч`;
    } else {
        return `${hours} ч ${minutes} мин`;
    }
}


export default formatRuntime;