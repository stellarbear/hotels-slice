import {isArray, isDefined, isNumber, isString} from "@app/extensions-guard";
import phone from "phone";
import {ValidateFN} from "./useForm";

export const validators = {
    "length_max": (length: number) => (v: any) => isString(v) && v.length <= length ||
        `Максимальная длина - ${length}`,
    "length_min": (length: number) => (v: any) => isString(v) && v.length >= length ||
        `Минимальная длина - ${length}`,
    "length_exact": (length: number) => (v: any) => isString(v) && v.length == length ||
        `Необходимая длина - ${length}`,
    "email": (v: any) => isString(v) && new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(v.trim()) ||
        "Некорректный email формат",
    "phone": (v: any) => isString(v) && phone(v).isValid ||
        "Некорректный телефонный формат",
    "required": (v: any) => (isString(v) ? v.trim().length > 0 : isDefined(v)) ||
        "Поле обязательно для заполнения",
    "array_min": (size: number) => (v: any) => isArray(v) && v.length >= size ||
        `Минимальное количество - ${size}`,
    "array_max": (size: number) => (v: any) => isArray(v) && v.length <= size ||
        `Максимальное количество - ${size}`,
    "number_min": (size: number) => (v: any) => isNumber(v) && v >= size ||
        `Значение от - ${size}`,
    "number_max": (size: number) => (v: any) => isNumber(v) && v <= size ||
        `Значение до - ${size}`,
    "link": (v: any) => isString(v) && v.trim().startsWith("https://") ||
        "Некорректная ссылка",
    "string_numbers": (v: any) => isString(v) && v.split("").some(e =>
        "0123456789".includes(e)) ||
        "Отсутсвуют цифры",
    "string_letters": (v: any) => isString(v) && v.split("").some(e =>
        "abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщыюя".includes(e)) ||
        "Отсутсвуют буквы",
} satisfies Record<string, ((...args: any) => ValidateFN) | ValidateFN>;
