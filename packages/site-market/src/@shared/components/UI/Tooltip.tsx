import * as UI from "@app/ui-web-kit";
import React from "react";

/* eslint-disable max-len */
const TootltipTriggerIcon = React.memo(() => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            fill="#B3B3B3"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-9-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-2 2.25a.75.75 0 0 0 0 1.5h.25V17a.75.75 0 0 0 1.5 0v-7a.75.75 0 0 0-.75-.75h-1Z"
        />
    </svg>
));


UI.TooltipUI.TootltipTrigger = TootltipTriggerIcon;
