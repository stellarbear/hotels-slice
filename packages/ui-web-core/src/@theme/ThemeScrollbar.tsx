import {createGlobalStyle} from "styled-components";

export const ScrollbarStyle = createGlobalStyle`
    *::-webkit-scrollbar {
        width: 2px;
        height: 2px;
    }

    *::-webkit-scrollbar-track {
        background-color: transparent;
    }

    *::-webkit-scrollbar-thumb {
        background-color: transparent;
        border-radius: 20px;
        border: 2px solid ${p => p.theme.palette.color("primary", {alpha: 0.4})};
        background-clip: content-box;
    }

    *::-webkit-scrollbar-thumb:hover {
        border-color: ${p => p.theme.palette.color("primary")};
    }

    *::-webkit-scrollbar-corner {
        background: rgba(0, 0, 0, 0);
    }
`;
