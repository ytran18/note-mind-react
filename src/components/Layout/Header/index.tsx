import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import useAuth from "@hooks/useAuth";
import UserAvatar from "@components/UI/UserAvatar";

const Header = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    return (
        <header className="w-full px-4 py-3 sm:py-4 md:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="font-semibold text-lg sm:text-xl cursor-pointer" onClick={() => navigate('/')}>Note Mind</div>
                {!loading && (
                    !user ? (
                        <Button
                            className="!bg-black !text-white font-semibold text-xs sm:text-sm"
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