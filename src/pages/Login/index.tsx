import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { auth, fireStore } from '@core/firebase/firebase';
import { User } from '@utils/interface';

// redux
import { useAppDispatch } from '@core/redux';
import { userLogin } from '@core/redux/user';

import IconLeft from '@icons/iconArrowLeft.svg';
import IconGoogle from '@icons/iconGoogle.svg';
import IconGithub from '@icons/iconGithub.svg';

const { v4 } = require("uuid");

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLoginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const currEmail = result.user.email;
                const credential = GoogleAuthProvider.credentialFromResult(result);

                if (credential) {
                    const userRef = collection(fireStore, 'users');
                    getDocs(userRef).then((querySnapshot) => {
                        let users: any[] = [];
                        querySnapshot.forEach((doc) => {
                            if (doc.data()) users.push(doc.data());
                        })

                        let isExist = false;
                        let currUser: User = {
                            _id: '',
                            name: '',
                            email: '',
                            image: '',
                            createdAt: new Date().getTime(),
                        };
                        users.find((user) => {
                            if (user.email === currEmail) {
                                isExist = true;
                                currUser = user;
                            };
    
                            if (!isExist) {
                                const newUser: User = {
                                    _id: v4(),
                                    email: result.user.email!,
                                    name: result.user.displayName!,
                                    image: result.user.photoURL!,
                                    createdAt: new Date().getTime(),
                                };
        
                                const docRef = doc(collection(fireStore, 'users'), newUser._id);
                                dispatch(userLogin(newUser));
                                setDoc(docRef, newUser);
                                navigate('/mainpage');
                                message.success("Register successfully !!!");
                            } else {
                                dispatch(userLogin(currUser));
                                navigate('/mainpage');
                                message.success("Login successfully !!!");
                            };
                        });
                        localStorage.setItem('user-login', credential.accessToken!)
                    })
                }

            })
    };

    return (
        <div className="h-full max-w-3xl w-[48rem] 2xl:max-w-5xl 2xl:w-[64rem] mx-auto flex flex-col">
                <div
                    className='flex items-center w-fit p-2 gap-3 text-sm font-medium cursor-pointer hover:bg-[#f1f5f9] transition-colors duration-200 rounded-md select-none'
                    onClick={() => navigate('/')}
                >
                    <IconLeft />
                    Back                
                </div>
            <div className="flex flex-col flex-1 items-center justify-center gap-5">
                <div className="font-medium">Login to see your content!</div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <Button
                        className="!px-6 !font-medium"
                        classNames={{
                            icon: 'w-5 h-5'
                        }}
                        icon={<IconGoogle />}
                        onClick={handleLoginWithGoogle}
                    >
                        Login with Google
                    </Button>
                    <Button
                        className="!px-6 !font-medium"
                        classNames={{
                            icon: 'w-5 h-5'
                        }}
                        icon={<IconGithub />}
                    >
                        Login with Github
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;