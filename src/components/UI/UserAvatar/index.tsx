import { Avatar, message, Popover } from "antd";
import { auth } from "@core/firebase/firebase";
import { useNavigate } from "react-router-dom";

interface User {
    _id: string;
    name: string;
    email: string;
    image: string;
};

interface UserAvatarProps {
    user: User;
}

const UserAvatar = (props: UserAvatarProps) => {

    const { user } = props;
    const naviagte = useNavigate();

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem('user-login');
            setTimeout(() => {
                naviagte('/login');
                message.success('Sign out successfully!')
            },1000);
        } catch (error) {
            message.error('Something went wrong!')
        };
    };

    return (
        <Popover
            arrow={false}
            trigger={"click"}
            placement="bottomRight"
            content={
                <div className="flex flex-col w-64">
                    <div className="flex flex-col gap-2 mb-3 px-2">
                        <div className="font-semibold text-sm">{user.name}</div>
                        <div className="text-xs">{user.email}</div>
                    </div>
                    <div className="w-full h-[1px] border-t"></div>
                    <div
                        className="mt-3 cursor-pointer hover:bg-[#F1F5F9] transition-colors duration-300 rounded-md"
                        onClick={handleSignOut}
                    >
                        <div className="text-sm p-2 flex items-center font-medium">Sign out</div>
                    </div>
                </div>
            }
        >
            <Avatar
                className="cursor-pointer"
                src={user.image}
            />
        </Popover>
    )
};

export default UserAvatar;