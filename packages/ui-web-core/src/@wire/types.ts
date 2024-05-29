import {StyledComponent} from "styled-components";

export type PropsComponent<T> = T extends React.ComponentType<infer P> ? P : never;
export type PropsStyled<T> = T extends StyledComponent<any, any, infer P, any> ? P : never;
