// Only for editor
declare module 'react-i18next' {
    export function useTranslation(): {
        t: (key: string, options?: any) => any;
        i18n: any;
    };
}
