import React, { useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const images = import.meta.glob('../images/gallery/*.{jpeg,jpg,png,svg}', { eager: true });
const imageArray = Object.values(images).map(mod => mod.default);

export default function Gallery() {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;
        const handleOnUp = () => {
            track.dataset.mouseDownAt = "0";
            track.dataset.prevPercentage = track.dataset.percentage;
        };

        const moveTo = (nextPercentage) => {
            track.dataset.percentage = nextPercentage;
            track.dataset.prevPercentage = nextPercentage;

            track.animate(
                { transform: `translate(${nextPercentage}%, -50%)` },
                { duration: 800, fill: "forwards" }
            );

            for (const image of track.getElementsByClassName("image")) {
                image.animate(
                    { objectPosition: `${100 + nextPercentage}% center` },
                    { duration: 800, fill: "forwards" }
                );
            }
        };

        const handleOnMove = e => {
            if (track.dataset.mouseDownAt === "0") return;

            const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
            const maxDelta = window.innerWidth / 2;

            const percentage = (mouseDelta / maxDelta) * -100;
            const nextUnc = parseFloat(track.dataset.prevPercentage) + percentage;
            const next = Math.max(Math.min(nextUnc, 0), -100);

            moveTo(next);
        };

        const handleKey = (e) => {
            const step = 1;
            const prev = parseFloat(track.dataset.prevPercentage || "0");

            if (e.key === "ArrowLeft") {
                moveTo(Math.min(prev + step, 0));
            }
            if (e.key === "ArrowRight") {
                moveTo(Math.max(prev - step, -100));
            }
        };

        track.addEventListener("mousedown", handleOnDown);
        track.addEventListener("mouseup", handleOnUp);
        track.addEventListener("mousemove", handleOnMove);
        window.addEventListener("keydown", handleKey);

        return () => {
            track.removeEventListener("mousedown", handleOnDown);
            track.removeEventListener("mouseup", handleOnUp);
            track.removeEventListener("mousemove", handleOnMove);
            window.removeEventListener("keydown", handleKey);
        };
    }, []);


    return (
        <div id="image-track" ref={trackRef} data-mouse-down-at="0" data-prev-percentage="0">
            {imageArray.map((src, i) => (
                <img className="image" key={i} src={src} alt={`Gallery squirrel ${i}`} draggable="false" />
            ))}
        </div>
    );
}

// // Mount component
// const mountPoint = document.querySelector("#gallery");
// if (mountPoint) {
//     createRoot(mountPoint).render(<Gallery />);
// }
