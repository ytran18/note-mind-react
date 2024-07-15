import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import MotionBox from "@components/Animations/MotionBox";
import { fadeIn, slideIn, bounce, slideInFromLeft, slideInFromRight, scaleUp, rotateIn } from "@lib/animations";

import IconNoteTaking from '@icons/illustration/note-taking.svg';

const Dashboard = () => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/mainpage');
    };

    return (
        <div className="w-full h-full flex justify-center">
            <div className="absolute top-0 -z-10 h-full w-full bg-white">
                <MotionBox
                    className="relative"
                    animation={scaleUp(0.2)}
                >
                    <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[20%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
                </MotionBox>
                <MotionBox animation={scaleUp(0.3)}>
                    <div className="hidden md:flex absolute left-0 bottom-0 h-[500px] w-[500px] -translate-x-[30%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
                </MotionBox>
            </div>
            <div className="px-4 py-16 lg:px-16 flex flex-col items-center gap-3">
                <p className="mt-2 max-w-xl text-center text-4xl font-semibold tracking-tight text-[#013720] sm:text-5xl lg:text-[3.5rem] lg:leading-none">
                    <span
                        style={{display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance'}}
                    >
                        <MotionBox className="relative" animation={fadeIn(0.5)}>
                            Revolutionise <span className="opacity-[.32]">your</span>
                        </MotionBox>
                        <MotionBox className="relative" animation={fadeIn(1)}>
                            Learning{" "} <span className="opacity-[0.32]">Experience</span>
                        </MotionBox>
                    </span>
                </p>
                <MotionBox className="relative" animation={scaleUp(1.5)}>
                    <p className="2xl:text-md text-center text-base text-gray-500 md:text-lg">
                        Fueling your learning journey, every step of the way
                    </p>
                </MotionBox>
                <MotionBox className="relative" animation={fadeIn(2)}>
                    <Button
                        className="!font-medium"
                        onClick={handleNavigate}
                    >
                        Get Started
                        <span className="ml-3 transition-all group-hover:animate-pulse">
                            🚀
                        </span>
                    </Button>
                </MotionBox>
                <MotionBox
                    animation={scaleUp(2.5)}
                    className="w-full h-[400px] md:w-[512px] md:h-[512px] relative"
                >
                    <IconNoteTaking />
                </MotionBox>
            </div>
        </div>
    );
};

export default Dashboard;