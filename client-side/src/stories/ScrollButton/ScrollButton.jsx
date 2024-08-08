import React, { useEffect, useState } from "react";
import GenericButton from "../Button/GenericButton";
import "./ScrollButton.scss";

const SCROLL_TO_TOP_TEXT = "Scroll to top"
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
            <GenericButton onClick={scrollToTop} className="myBtn" label={SCROLL_TO_TOP_TEXT} size="large">{SCROLL_TO_TOP_TEXT}</GenericButton>
        </div>
    );
};

export default ScrollButton;
