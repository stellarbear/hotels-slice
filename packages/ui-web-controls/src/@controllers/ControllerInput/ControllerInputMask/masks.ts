export const masks = {
    "phone":  ["+7 (", /\d/, /\d/, /\d/, ") ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/],
    "numeric": (length: number) => Array.from(Array(length), () => /\d/),
};
