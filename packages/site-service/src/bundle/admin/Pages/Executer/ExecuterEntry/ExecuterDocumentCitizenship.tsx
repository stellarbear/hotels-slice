import {SwitchUnion} from "@app/ui-web-core";
import {Typo} from "@app/ui-web-kit";
import React from "react";
import {queryExecuterEntry} from "./ExecuterEntry";

export const ExecuterDocumentCitizenship = React.memo(() => {
    const [executer] = queryExecuterEntry.use();
    const citizenship = executer.adminGetExecuterById.passportData?.citizenship;

    return (
        <Typo.p>
            <SwitchUnion
                value={citizenship}
                as={[
                    [undefined, () => null],
                    ["OTHER", () => "Другое"],
                    ["RUSSIA", () => "РФ"],
                ]}
            />
        </Typo.p>
    );
});
