import styled, {FlattenInterpolation, StyledComponent, ThemedStyledProps} from "styled-components";

export const extend = <T extends StyledComponent<any, any, any, any>>(
    component: T,
    styles: T extends StyledComponent<any, infer Theme, infer Props, any>
        ? FlattenInterpolation<ThemedStyledProps<Props, Theme>>
        : never,
) => styled(component)`${styles}`;
