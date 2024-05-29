import {Loader} from "@app/ui-web-kit";
import * as React from "react";
import {useNavigate, useParams} from "react-router";
import {useAuthorization} from "../../../bundle/auth";

type Params = "token";

export const AccountRelay = React.memo(() => {
    const {token} = useParams<Params>();
    const {update} = useAuthorization();
    const navigate = useNavigate();

    React.useEffect(() => {
        update(token);
        navigate("/");
    }, []);

    return <Loader.Spinner />;
});
