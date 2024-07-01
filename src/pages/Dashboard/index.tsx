import { Button } from "antd";

const Dashboard = () => {
    return (
        <div className="w-full h-full flex justify-center">
            <div className="absolute top-0 -z-10 h-full w-full bg-white">
                <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[20%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
                <div className="hidden md:flex absolute left-0 bottom-0 h-[500px] w-[500px] -translate-x-[30%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
            </div>
            <div className="px-4 py-16 lg:px-16 flex flex-col items-center gap-3">
                <p className="mt-2 max-w-xl text-center text-4xl font-semibold tracking-tight text-[#013720] sm:text-5xl lg:text-[3.5rem] lg:leading-none">
                    <span
                        style={{display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance'}}
                    >
                        Revolutionise <span className="opacity-[.32]">your</span> Learning{" "}
                        <span className="opacity-[0.32]">Experience</span>
                    </span>
                </p>
                <p className="2xl:text-md text-center text-base text-gray-500 md:text-lg">
                    Fueling your learning journey, every step of the way
                </p>
                <Button className="!font-medium">
                    Get Started
                    <span className="ml-3 transition-all group-hover:animate-pulse">
                        🚀
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default Dashboard;