import React from "react";
import HeaderLogo from "./header-logo";
import Navigation from "./navigation";
import WelcomeMsg from "./welcome-msg";

const header = () => {
    return (
        <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14">
                    <HeaderLogo />
                    <Navigation />
                </div>
                <WelcomeMsg />
            </div>
        </header>
    );
};

export default header;
