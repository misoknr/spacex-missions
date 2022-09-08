export function localizeTimestamp(timestamp: string, locale: string): string {
    return new Date(timestamp).toLocaleString(locale);
}
