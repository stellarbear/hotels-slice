import * as React from "react";
import {Colored, Flex} from "../../Core";
import {Button} from "../Button";
import {Card} from "../Card";
import {Typo} from "../Typography";

type Props = {
  error: Error;
  reset?: () => void;
};

export const ExceptionUser = React.memo<Props>((props) => {
  const {reset = () => window.location.reload()} = props;

  return (
    <Card>
      <Flex.Row s={8} justify="space-between" align="center">
        <div>
          <Colored color="error">
            <Typo.p>
              Что-то пошло не так
            </Typo.p>
          </Colored>
          <Typo.p>
            Мы уже знаем о проблеме и решаем её
          </Typo.p>
        </div>

        <Button onClick={reset}>
          Попробовать еще раз
        </Button>
      </Flex.Row>
    </Card >
  );
});
