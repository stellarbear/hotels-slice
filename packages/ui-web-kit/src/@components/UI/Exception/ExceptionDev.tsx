import * as React from "react";
import {Colored, Flex} from "../../Core";
import {Card} from "../Card";
import {Typo} from "../Typography";

type Props = {
  error: Error;
  reset?: () => void;
};

export const ExceptionDev = React.memo<Props>((props) => {
  const {error} = props;

  return (
    <Card>
      <Flex.Col>
        <Typo.p>
          <Colored color="error">
            <span>Что-то пошло не так: </span>
          </Colored>
          <Typo.span>
            {error.message}
          </Typo.span>
        </Typo.p>

        <Typo.Caption as="pre">
          {error.stack}
        </Typo.Caption>
      </Flex.Col>
    </Card>
  );
});
