export type TelemetryChannel =
    | "app"
    | "device"
    | "history"
    | "console"
    | "apollo"
    | "error"
    | "meta";

export type TelemetryChunk = [number, any];
export type TelemetryShape = Map<string, TelemetryChunk[]>;
type TelemetrySubscribeFn = (entry: TelemetryShape) => void;

const telemetry: TelemetryShape = new Map();

export class TelemetryHandle {
    private static readonly subscriptions: TelemetrySubscribeFn[] = [];

    public static initialize(state: TelemetryShape) {
        telemetry.clear();
        state.forEach((value, key) => telemetry.set(key, value));
    }

    public static register(channel: TelemetryChannel, info: any, limit = 10) {
        const update = telemetry.get(channel) ?? [];
        update.push([Number(new Date()), info]);

        update.splice(0, Math.max(0, update.length - limit));
        telemetry.set(channel, update);
        this.notify();
    }

    public static defaults(): TelemetryShape {
        return telemetry;
    }

    private static notify() {
        this.subscriptions.forEach(s => s(telemetry));
    }

    public static subscribe(fn: TelemetrySubscribeFn) {
        this.subscriptions.push(fn);
    }

    public static unsubscribe(fn: TelemetrySubscribeFn) {
        const index = this.subscriptions.findIndex(e => e === fn);
        this.subscriptions.splice(index, 1);
    }
}
