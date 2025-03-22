import React from "react";
import Navbar from "./navbar";
import Topbar from "./topbar";

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Navbar />

            {/* Main Content Wrapper */}
            <div className="flex-1"> {/* Add flex-1 to take full width */}
                <Topbar />
                <main className="p-8 flex-1 ">{children}</main> {/* Add flex-1 here */}
            </div>
        </div>
    );
};

export default LayoutComponent;
