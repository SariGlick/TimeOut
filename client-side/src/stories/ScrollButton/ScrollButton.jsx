import React, { useEffect, useState } from "react";
import GenericButton from "../Button/GenericButton";

const ScrollButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.onscroll = function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
    }, []);

    const scrollToTop = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    return (
        <div>
            {showButton && <GenericButton onClick={scrollToTop} className="myBtn" label="Go to top">Top</GenericButton>}
        </div>
    );
};

export default ScrollButton;