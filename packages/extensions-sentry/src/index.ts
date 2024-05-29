import {ErrorBoundary} from "@sentry/react";
import {Tracker} from "./Sentry";

export const ExtensionsSentry = {
    Tracker,
    Boundary: ErrorBoundary,
};
