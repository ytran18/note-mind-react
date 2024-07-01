import React from "react";
import Header from "../Header";

interface DefaultLayoutProps {
    children: React.ReactNode;
}

const DefaultLayout = (props: DefaultLayoutProps) => {

    const { children } = props;

    return (
        <div className="w-screen h-screen flex flex-col">
            <div className="">
                <Header />
            </div>
            <div className="flex flex-grow">
                {children}
            </div>
        </div>
    );
};

export default DefaultLayout;