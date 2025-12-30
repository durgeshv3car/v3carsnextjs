import { createPortal } from "react-dom";
import { useState } from "react";

type Props = {
    text: string;
    children: React.ReactNode;
    tooltipClassName?: string;
};

export default function CustomTooltip({
    text,
    children,
    tooltipClassName = "",
}: Props) {
    const [show, setShow] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    return (
        <>
            <div
                onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setPos({
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                    });
                    setShow(true);
                }}
                onMouseLeave={() => setShow(false)}
                className="inline-flex"
            >
                {children}
            </div>

            {show &&
                createPortal(
                    <div
                        style={{
                            left: pos.x,
                            top: pos.y - 4,
                            transform: "translate(-50%, -100%)",
                        }}
                        className={`fixed z-[9999] px-3 py-1 rounded-md text-sm border shadow ${tooltipClassName}`}
                    >
                        {text}
                    </div>,
                    document.body
                )}
        </>
    );
}
