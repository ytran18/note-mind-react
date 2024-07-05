import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import useAuth from "@hooks/useAuth";
import UserAvatar from "@components/UI/UserAvatar";

const Header = () => {

    const navigate = useNavigate();
    const user = useAuth().user;
    const loading = useAuth().loading;

    return (
        <header className="max-w-5xl w-[64rem] flex flex-col px-4 py-4 lg:px-16 mx-auto 2xl:max-w-7xl 2xl:w-[80rem]">
            <div className="flex items-center justify-between bg-opacity-30 backdrop-blur-lg backdrop-filter">
                <div className="font-semibold cursor-pointer">Note Mind</div>
                {!loading && (
                    !user ? (
                        <Button
                            className="!bg-black !text-white font-semibold text-sm"
                            onClick={() => navigate('/login')}
                        >
                            Sign in
                        </Button>
                    ) : (
                        <UserAvatar user={user}/>
                    )
                )}
            </div>
        </header>
    );
};

export default Header;