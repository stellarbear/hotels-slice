import * as SentryReact from "@sentry/react";

export class Tracker {
    private static initialized = false;

    public static initialize(environment: string, dsn?: string | false) {
        if (!dsn) {
            return;
        }

        SentryReact.init({
            environment,
            dsn,
            integrations: [
                new SentryReact.BrowserTracing(),
                new SentryReact.Replay({
                    maskAllText: false,
                    maskAllInputs: true,
                }),
            ],
            // Performance Monitoring
            tracesSampleRate: 1.0,
            // Session Replay
            replaysSessionSampleRate: 0.1,
            replaysOnErrorSampleRate: 1.0,
        });
        this.initialized = true;
    }

    public static use(fn: (sentry: typeof SentryReact) => unknown) {
        if (this.initialized) {
            fn(SentryReact);
        }
    }
}
