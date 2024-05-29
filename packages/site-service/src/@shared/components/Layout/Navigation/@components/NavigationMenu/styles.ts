import styled, {css} from "styled-components";

export const NavigationMenuLogo = styled.div`
    display: flex;
    align-items: center;
    color: #ffffff;
    width: 146px;
    height: 128px;
    min-height: 80px;
    margin: auto;
`;

type NavigationOptionContentProps = {
    active?: boolean;
};

export const NavigationOptionContent = styled.div<NavigationOptionContentProps>`
    cursor: pointer;
    position: relative;
    padding: 1rem 2rem;
    color: rgba(255, 255, 255, 0.25);
    transition: color ${p => p.theme.variables.animation};

    &::before {
        content: "";
        width: 4px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        transition: background-color ${p => p.theme.variables.animation};
    }

    ${p => p.active && css`
        color: #ffffff;

        &::before {
            background-color: ${p => p.theme.palette.color("primary")};
        }
    `}
`;
