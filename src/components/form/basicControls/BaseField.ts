export type InputMode = "text" | "email" | "search" | "tel" | "url" | "none" | "numeric" | "decimal";

export interface IBaseFieldProps {
    autofocus?: boolean;
    dataTest?: string;
    disabled?: boolean;
    errorMessages?: string;
    infoMessage?: string;
    label?: string;
    modelValue?: string | number;
    name: string;
    placeholder?: string;
    rules?: string | string[];
}

export const baseFieldDefault = {
    autofocus: false,
    disabled: false,
    errorMessages: "",
    infoMessage: "",
    placeholder: "",
};

export function isShowInternalBtn(value: string) {
    return value?.length;
}
