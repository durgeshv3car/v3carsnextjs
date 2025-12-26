import React from "react";

interface MarqueeProps {
    text: string;
    speed?: string; // optional speed control
}

const Marquee: React.FC<MarqueeProps> = ({ text, speed = "60s" }) => {
    return (

        <div
            className="inline-block animate-marquee"
            style={{
                animationDuration: speed,
            }}
        >
            {text}
        </div>
    );
};

export default Marquee;
