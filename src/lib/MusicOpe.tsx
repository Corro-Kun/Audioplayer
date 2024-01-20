export function OpeDurations(data: number) {
    const minutes = Math.floor(data / 60);
    const seconds = Math.floor(data % 60);

    const result = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    return result;
}