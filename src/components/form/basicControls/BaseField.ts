import type { UiThemeIconName } from '../../../themes/registry';

export type InputMode = "text" | "email" | "search" | "tel" | "url" | "none" | "numeric" | "decimal";
export type MessageType = "default" | "success" | "error";

export const MessageIconNames = {
    success: "fill_check_input",
    error: "fill_attention_1",
} as const;

export interface IBaseMessage {
    message: string;
    iconName?: UiThemeIconName;
    type: MessageType;
}

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
    message?: IBaseMessage
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
