import * as UI from "@app/ui-web-kit";
import React from "react";

/* eslint-disable max-len */
const InputHiddenIcon = React.memo(() => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            strokeLinecap="round" 
            strokeWidth="1.5"
            stroke="currentColor"
            d="M22 8s-4 6-10 6S2 8 2 8m13 5.5 1.5 2.5m3.5-5 2 2M2 13l2-2m5 2.5L7.5 16"
        />
    </svg>
));

UI.InputUI.InputHiddenIcon = InputHiddenIcon;
