import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsReact} from "@app/extensions-react";
import {ExtensionsSentry} from "@app/extensions-sentry";
import {ErrorBoundary, ThemeMount, ThemePalette} from "@app/ui-web-core";
import {Breadcrumbs, Exception, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {AuthorizationProvider, AuthorizationSection} from "../auth";
import {App} from "./App";
import {Anon} from "./Auth";
import {environment} from "./environment";

environment();
ThemePalette.wire({
    primary: "#40bf95",
    secondary: "#808080",

    error: "#DF2020",
    success: "#29A352",
    information: "#4055bf",
    expectation: "#FF8105",
});

ExtensionsSentry.Tracker.initialize("admin", admin.SENTRY_KEY);

ExtensionsApollo.Mutation.wire((options) => {
    const notify = useNotification.snackbar();
    options.onError = (error) => notify.error(error.message);
});
ExtensionsApollo.Query.wire((options) => {
    const notify = useNotification.snackbar();
    options.onError = (error) => notify.error(error.message);
});

ErrorBoundary.Catch.fallback = ExtensionsReact.contextToProps(ErrorBoundary.use, Exception.for(admin.PRODUCTION));
ErrorBoundary.Catch.report = (error, {componentStack}) =>
    ExtensionsSentry.Tracker.use((sentry) =>
        sentry.captureException(error, {contexts: {react: {componentStack}}}));

createRoot(ExtensionsReact.getDomNode()).render(
    <ThemeMount>
        <ErrorBoundary.Catch>
            <BrowserRouter>
                <Breadcrumbs.Provider>
                    <AuthorizationProvider expect="Admin">
                        <AuthorizationSection anonymous={<Anon />}>
                            <App />
                        </AuthorizationSection>
                    </AuthorizationProvider>
                </Breadcrumbs.Provider>
            </BrowserRouter>
        </ErrorBoundary.Catch>
    </ThemeMount>,
);
