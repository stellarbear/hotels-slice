import styled from "styled-components";
import {Typo} from "../Typography";

const DictionaryKey = styled(Typo.p)`
    color: ${p => p.theme.palette.color("secondary")};
`;

const DictionaryValue = styled(Typo.p)`
`;

export const DictionaryUI = {
    DictionaryKey,
    DictionaryValue,
};
