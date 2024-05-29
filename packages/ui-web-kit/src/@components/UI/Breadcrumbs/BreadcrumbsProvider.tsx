import * as React from "react";
import {Breadcrumb, BreadcumbsContext} from "./BreadcrumbsContext";

type Props = {
    children: React.ReactNode;
};

export const BreadcrumbsProvider = React.memo<Props>((props) => {
    const {children} = props;

    const [track] = React.useState(new Set<string>());
    const crumbsRef = React.useRef<Breadcrumb[]>([]);
    const [crumbs, setCrumbs] = React.useState<Breadcrumb[]>([]);

    const add = React.useCallback((crumb: Breadcrumb) => {
        if (!track.has(crumb.to)) {
            track.add(crumb.to);
            crumbsRef.current = [...crumbsRef.current, crumb];
        }

        React.useEffect(() => {
            setCrumbs(crumbsRef.current);
            
            return () => {
                track.delete(crumb.to);
                crumbsRef.current = crumbsRef.current.filter(e => e.to !== crumb.to);
                setCrumbs(crumbsRef.current);
            };
        }, []);
    }, []);

    const context = React.useMemo(() =>
        ({crumbs, add}),
        [crumbs, add]);

    return (
        <BreadcumbsContext.Provider value={context}>
            {children}
        </BreadcumbsContext.Provider>
    );

});
