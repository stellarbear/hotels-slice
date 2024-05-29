import {ExtensionsReact, useMouseScroll} from "@app/extensions-react";
import * as React from "react";
import styled from "styled-components";
import {AutoScroll, AutoScrollTarget, Flex} from "../../Core";
import {TabItem} from "./TabItem";
import {TabUI} from "./styles";

type Props = {
    children: React.ReactNode;

    defaultId?: string;
    onTabChange?: (id?: string) => void;
};

type TabItem = React.ComponentProps<typeof TabItem>;
const pickTabs = ExtensionsReact.pickChildren(TabItem);

export const TabHandle = React.memo<Props>((props) => {
    const {children, onTabChange, defaultId} = props;

    const tabPanelRef = React.useRef<null | HTMLDivElement>(null);
    const mouse = useMouseScroll(tabPanelRef);

    const data = React.useMemo(() => pickTabs(children), [children]);
    const filtered = React.useMemo(() => data.filter(t => !t.hidden), [data]);

    const active = React.useMemo(() => Math.max(
        filtered.findIndex(e => e.id === defaultId), -1),
        [defaultId]);

    const onTabClick = React.useCallback((tab: TabItem) => () => {
        onTabChange?.(tab.id);
    }, []);

    return (
        <Flex.Col>
            <AutoScroll smooth deps={[active]}>
                <TabUI.TabHandleContent
                    {...mouse}
                    ref={tabPanelRef}>
                    {filtered.map((tab, index) => (
                        <AutoScrollTarget
                            key={index}
                            if={active === index}>
                            <TabUI.TabHandleButton
                                active={active === index}
                                onClick={onTabClick(tab)}>
                                {tab.title}
                            </TabUI.TabHandleButton>
                        </AutoScrollTarget>
                    ))}
                </TabUI.TabHandleContent>
            </AutoScroll>
            <TabContainer>
                {active >= 0 ? filtered[active].children : null}
            </TabContainer>
        </Flex.Col>
    );
});

const TabContainer = styled.div`
    position:relative;
`;
