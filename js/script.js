console.log("loaded");

function typer(target, texts, period) {
    console.log(`Called typer(${target}, ${texts}, ${period})`);

    let loopIndex = 0;
    let revealed = "";
    let isDeleting = false;
    let pauseUntil = 0;

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
            revealed = fullText.substring(0, revealed.length + 1);

            if (revealed === fullText) {
                isDeleting = true;
                pauseUntil = now + pauseBeforeDelete;
            }
        } else {
            revealed = fullText.substring(0, revealed.length - 1);

            if (revealed === "") {
                isDeleting = false;
                loopIndex++;
                pauseUntil = now + pauseBetweenWords;
            }
        }

        target.innerHTML = `${revealed}`;

    }, 50);
}

document.addEventListener("DOMContentLoaded", (e) => {
    console.log("DOM conent loaded");
    typer(document.querySelector("#typing"), ["Hello world", "It is i :D", "Hi hello testing testing."], 2000);
});

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

const down = 'M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z';
const center = 'M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V683H0V-0.3z';

ScrollTrigger.create({
    trigger: '.footer',
    start: 'top bottom',
    toggleActions: 'play pause resume reverse',
    markers: true,
    onEnter: self => {
        const velocity = self.getVelocity();
        const variation = velocity / 10000;

        gsap.fromTo('#bouncy-path', {
            morphSVG: down
        }, {
            duration: 2,
            morphSVG: center,
            ease: `elastic.out(${1 + variation}, ${1 - variation})`,
            overwrite: 'true'
        });
    }
});