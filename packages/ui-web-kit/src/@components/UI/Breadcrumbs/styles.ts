import styled from "styled-components";
import {Link} from "../Link";

export const Crumb = styled(Link)`
    color: ${p => p.theme.variables.input};
    opacity: 0.8;
    white-space: nowrap;

    &:not(:last-child)::after {
        content: '/';
        margin-left: 0.5rem;
    }
`;

export const BreadcrumbUI = {
    Crumb,
};
