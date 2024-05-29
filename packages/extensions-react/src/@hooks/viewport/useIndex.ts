import * as React from "react";

class TrackSet {
    private readonly set;

    constructor(init: number) {
        this.set = new Set([init]);
    }

    public mount() {
        const max = Math.max(...this.set.keys());
        const update = max + 1;

        this.set.add(update);
        return update;
    }

    public unmount(value: number) {
        this.set.delete(value);
    }
}

const set = new TrackSet(30);

export const useIndex = () => {
    const [index] = React.useState(() => set.mount());

    React.useEffect(() => () => {
        set.unmount(index);
    }, [index]);

    return index;
};
