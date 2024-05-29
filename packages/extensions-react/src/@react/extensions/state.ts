export type ReactStateAction<T> = React.Dispatch<React.SetStateAction<T>>;
export type ReactState<T> = [T, ReactStateAction<T>];
export type ReactStateProps<T, Key extends string = "state"> =
    & Record<Key, T>
    & Record<`set${Capitalize<Key>}`, React.Dispatch<React.SetStateAction<T>>>;
