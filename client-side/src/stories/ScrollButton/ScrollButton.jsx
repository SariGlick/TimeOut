import React, { useEffect, useState } from "react";
import GenericButton from "../Button/GenericButton";
import "./ScrollButton.scss";

const ScrollButton = () => {
    const [showButton, setShowButton] = useState(true); 

    useEffect(() => {
        const handleScroll = () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        document.body.scrollTop = 0; 
        document.documentElement.scrollTop = 0; 
    };

    return (
        <div className={`scroll-button ${showButton ? 'show' : 'hide'}`}>
            <GenericButton onClick={scrollToTop} className="myBtn" label="↑" size="large">Top</GenericButton>
        </div>
    );
};

export default ScrollButton;