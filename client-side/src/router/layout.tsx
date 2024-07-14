import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../stories/header/header";
import React from "react";
export default function Layout() {
    return (
        <>
            <nav><ResponsiveAppBar/></nav>
            <main><Outlet/></main>
            <footer></footer>
        </>
    );
}