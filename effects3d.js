/* ===================================
   EFFETS 3D SANS WEBGL
   Sphère de technologies et inclinaison des cartes.
   Fonctionne même si Three.js ne se charge pas.
   =================================== */

(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // ---------- Sphère de technologies ----------
    const sphere = document.getElementById('techSphere');

    if (sphere) {
        const tags = Array.from(sphere.querySelectorAll('.tech-tag'));
        const count = tags.length;

        // Répartition régulière sur la sphère (spirale de Fibonacci).
        const points = tags.map((_, i) => {
            const y = 1 - (2 * (i + 0.5)) / count;
            const r = Math.sqrt(1 - y * y);
            const theta = i * Math.PI * (3 - Math.sqrt(5));
            return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
        });

        const BASE_SPEED = 0.004;
        let speedX = BASE_SPEED * 0.4;
        let speedY = BASE_SPEED;
        let targetX = speedX;
        let targetY = speedY;

        const step = (ax, ay) => {
            const cosY = Math.cos(ay), sinY = Math.sin(ay);
            const cosX = Math.cos(ax), sinX = Math.sin(ax);
            points.forEach((p) => {
                const x1 = p.x * cosY + p.z * sinY;
                const z1 = -p.x * sinY + p.z * cosY;
                const y1 = p.y * cosX - z1 * sinX;
                const z2 = p.y * sinX + z1 * cosX;
                p.x = x1;
                p.y = y1;
                p.z = z2;
            });
        };

        const draw = () => {
            const radius = sphere.clientWidth * 0.4;
            points.forEach((p, i) => {
                const depth = (p.z + 1) / 2; // 0 = derrière, 1 = devant
                const scale = 0.75 + depth * 0.4;
                const tag = tags[i];
                tag.style.transform =
                    `translate(-50%, -50%) translate3d(${(p.x * radius).toFixed(1)}px, ${(p.y * radius).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
                tag.style.opacity = (0.25 + depth * 0.75).toFixed(2);
                tag.style.zIndex = String(Math.round(depth * 100));
            });
        };

        sphere.addEventListener('pointermove', (e) => {
            const rect = sphere.getBoundingClientRect();
            const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
            targetY = nx * 0.03;
            targetX = -ny * 0.03;
        });
        sphere.addEventListener('pointerleave', () => {
            targetX = BASE_SPEED * 0.4;
            targetY = BASE_SPEED;
        });

        let visible = false;
        let frame = null;

        const tick = () => {
            speedX += (targetX - speedX) * 0.06;
            speedY += (targetY - speedY) * 0.06;
            step(speedX, speedY);
            draw();
            frame = visible ? requestAnimationFrame(tick) : null;
        };

        step(0.4, 0.6);
        draw();
        sphere.classList.add('is-ready');

        if (!reduceMotion) {
            new IntersectionObserver((entries) => {
                visible = entries[0].isIntersecting;
                if (visible && frame === null) frame = requestAnimationFrame(tick);
            }).observe(sphere);
        }
        window.addEventListener('resize', draw);
    }

    // ---------- Inclinaison 3D ----------
    if (canHover && !reduceMotion) {
        // Cartes : s'inclinent vers le pointeur.
        document.querySelectorAll('.stat-card, .skill-category, .contact-card, .highlight-item').forEach((card) => {
            card.classList.add('tilt-3d');
            card.addEventListener('pointermove', (e) => {
                const rect = card.getBoundingClientRect();
                const nx = (e.clientX - rect.left) / rect.width - 0.5;
                const ny = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform =
                    `perspective(900px) rotateX(${(-ny * 10).toFixed(2)}deg) rotateY(${(nx * 10).toFixed(2)}deg) translateZ(8px)`;
            });
            card.addEventListener('pointerleave', () => {
                card.style.transform = '';
            });
        });
    }
})();
