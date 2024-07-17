import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

const NotFoundPage = () => {

    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Result
                status={"404"}
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button
                        type="primary"
                        onClick={() => navigate('/')}
                    >
                        Back Home
                    </Button>
                }
            />
        </div>
    );
};

export default NotFoundPage;