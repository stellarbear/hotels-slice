import * as React from "react";

type Props = {
    id?: string;
    hidden?: boolean;

    title: React.ReactNode;
    children: React.ReactNode;
};

export const TabItem = React.memo<Props>(() => null);
