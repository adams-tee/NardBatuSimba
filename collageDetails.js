// 1. Create a global counter to track the top layer
let topZIndex = 10;

document.addEventListener("DOMContentLoaded", () => {
    const introScreen = document.getElementById('intro-screen');

    if (introScreen) {
        introScreen.addEventListener('click', () => {
            introScreen.classList.add('fade-out');
        });
    }

    interact('.polaroid').draggable({
        listeners: {
            start(event) {
                // 2. Every time a drag starts, bump the counter by 1
                topZIndex++;
                // 3. Assign it to ONLY the target being dragged
                event.target.style.zIndex = topZIndex;
            },
            move(event) {
                const target = event.target;
                
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                // Keep existing rotation if present
                const existingTransform = target.style.transform;
                let rotation = '';
                if (existingTransform.includes('rotate')) {
                    rotation = existingTransform.match(/rotate\([^)]+\)/)[0];
                }

                target.style.transform = `translate(${x}px, ${y}px) ${rotation}`;

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        }
    });
});