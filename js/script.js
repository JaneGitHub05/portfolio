console.log("loaded");

function typer(target, texts, period) {
    console.log(`Called typer(${target}, ${texts}, ${period})`);

    let loopIndex = 0;        // which phrase
    let revealed = "";        // what's currently shown
    let isDeleting = false;   // mode
    let pauseUntil = 0;       // timestamp until which we pause

    const typingSpeed = 120;
    const deletingSpeed = 60;
    const pauseBeforeDelete = period;
    const pauseBetweenWords = 500;

    const interval = setInterval(() => {
        const now = Date.now();

        // If we're in a pause, just wait and do nothing.
        if (now < pauseUntil) return;

        const fullText = texts[loopIndex % texts.length];

        if (!isDeleting) {
            // TYPE FORWARD
            revealed = fullText.substring(0, revealed.length + 1);

            if (revealed === fullText) {
                // Finished typing → pause before deleting
                isDeleting = true;
                pauseUntil = now + pauseBeforeDelete;
            }
        } else {
            // DELETE BACKWARD
            revealed = fullText.substring(0, revealed.length - 1);

            if (revealed === "") {
                // Finished deleting → next word
                isDeleting = false;
                loopIndex++;
                pauseUntil = now + pauseBetweenWords;
            }
        }

        target.innerHTML = `${revealed}`;

    }, 50);  // small loop tick for smooth animation
}

//TODO: ON #TERMINAL ENTER: pause, change image to look up, clear above interval, clear text, start new interval

document.addEventListener("DOMContentLoaded", (e) => {
    console.log("DOM content loaded");
    typer(document.querySelector("#typing"), ["Hello world", "It is i :D", "Hi hello testing testing."], 2000);
});

// GALLERY
import React from 'react';
import { createRoot } from "react-dom/client";
import Gallery from "../react/gallery.jsx";


let root = null;

document.querySelector("#open-gallery").addEventListener("click", () => {
    const mountPoint = document.querySelector("#gallery");
    console.log("mountPoint" + mountPoint);
    if (!root) {
        root = createRoot(mountPoint);
    }
    document.querySelector("#mini-me").style.transition = "opacity 0.3s ease";
    document.querySelector("#mini-me").style.opacity = "0";
    root.render(React.createElement(Gallery));
    requestAnimationFrame(() => {
        gsap.from("#gallery", {
            x: 80,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        });
    });
});

document.querySelector("#open-aboutme").addEventListener("click", () => {
    if (root) {
        gsap.to("#mini-me", { opacity: 1, duration: 0.3, ease: "power1.out" });

        gsap.to("#gallery", {
            x: 80,
            opacity: 0,
            duration: 0.5,
            ease: "power3.in",
            onComplete: () => {
                root.unmount();
                root = null;

                const mountPoint = document.querySelector("#gallery");
                if (mountPoint) {
                    mountPoint.style.opacity = "";
                    mountPoint.style.transform = "";
                }
            }
        });
    }
});
