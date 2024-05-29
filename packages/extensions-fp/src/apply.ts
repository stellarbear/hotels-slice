type Function = (...args: any) => any;

export const apply = <T extends Function>(...fns: T[]) => (...input: Parameters<T>): void => {
    fns.forEach(fn => fn(...input as any));
};

// const isPromise = (src: any): src is Promise<any> => {
//     return src && typeof src.then === "function";
// };

// export function chain<T extends (...args: any) => any>(...fns: T[]) {
//     return (...args: Parameters<T>) => {
//         let handle = null;

//         for (const fn of fns) {
//             if (isPromise(handle)) {
//                 handle = handle.then(() => fn(...(args as any)));
//             } else {
//                 handle = fn(...(args as any));
//             }
//         }

//         return void 0;
//     };
// }
