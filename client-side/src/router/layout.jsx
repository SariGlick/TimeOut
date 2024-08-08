import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../stories/header/header";

export default function Layout() {
    return (
        <>
            <nav><ResponsiveAppBar/></nav>
            <main><Outlet/></main>
            <footer></footer>
        </>
    );
}