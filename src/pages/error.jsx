import { Link, useRouteError } from "react-router-dom";
import { Button, Result } from 'antd';
export default function ErrorPage() {
    const error = useRouteError();
    // console.error(error);

    return (

        <Result
            status="404"
            title="Oops! 404 Error"
            subTitle={error.statusText || error.message}
            extra={
                <Button type="primary" >
                    <Link to="/">
                        <span>Back to Home Page</span>
                    </Link>
                </Button>
            }
        />

    );
}
