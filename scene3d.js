/* ===================================
   SCÈNE 3D — « L'ENTITÉ »
   Un seul nuage de particules vivant accompagne toute la page.
   Il respire, fuit le curseur, réagit aux clics et à la vitesse
   de défilement, et se métamorphose en un symbole par section :

   Accueil        → planète et ses anneaux
   À propos       → double hélice d'ADN
   Expérience     → spirale ascendante
   Projets        → </>
   Certifications → bouclier validé
   Compétences    → cube en treillis
   Contact        → @
   =================================== */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.getElementById('bg3d');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const FOV = 55;
const CAMERA_Z = 10;
const TAU = Math.PI * 2;

// ---------- Générateurs de formes (rayon ≈ 2,3 unités) ----------

const rand = (a = 1, b) => (b === undefined ? Math.random() * a : a + Math.random() * (b - a));
const jitter = (amount) => (Math.random() - 0.5) * 2 * amount;

function build(count, fn) {
    const out = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const p = fn(i, i / count);
        out[i * 3] = p[0];
        out[i * 3 + 1] = p[1];
        out[i * 3 + 2] = p[2];
    }
    return out;
}

function planet(count) {
    const golden = Math.PI * (3 - Math.sqrt(5));
    return build(count, (i, t) => {
        if (t < 0.62) {
            // Surface
            const n = count * 0.62;
            const y = 1 - (2 * (i + 0.5)) / n;
            const r = Math.sqrt(1 - y * y);
            const a = i * golden;
            return [Math.cos(a) * r * 1.75, y * 1.75, Math.sin(a) * r * 1.75];
        }
        if (t < 0.72) {
            // Noyau
            const a = rand(TAU), b = Math.acos(rand(-1, 1)), r = Math.cbrt(Math.random()) * 0.75;
            return [Math.sin(b) * Math.cos(a) * r, Math.cos(b) * r, Math.sin(b) * Math.sin(a) * r];
        }
        // Deux anneaux inclinés
        const second = t > 0.86;
        const a = rand(TAU);
        const r = (second ? 2.75 : 2.35) + jitter(0.06);
        const tilt = second ? -0.9 : 0.45;
        const x = Math.cos(a) * r, z = Math.sin(a) * r;
        return [x, z * Math.sin(tilt) + jitter(0.03), z * Math.cos(tilt)];
    });
}

function helix(count) {
    return build(count, (i, t) => {
        const y = rand(-2.7, 2.7);
        const a = y * 1.7;
        if (t < 0.4) return [Math.cos(a) * 1.1 + jitter(0.06), y, Math.sin(a) * 1.1 + jitter(0.06)];
        if (t < 0.8) return [Math.cos(a + Math.PI) * 1.1 + jitter(0.06), y, Math.sin(a + Math.PI) * 1.1 + jitter(0.06)];
        // Barreaux entre les deux brins
        const step = Math.round(y / 0.36) * 0.36;
        const sa = step * 1.7;
        const k = rand(-1, 1);
        return [Math.cos(sa) * 1.1 * k, step + jitter(0.02), Math.sin(sa) * 1.1 * k];
    });
}

function spiral(count) {
    return build(count, () => {
        const t = Math.random();
        const a = t * TAU * 3.5;
        const r = 2.5 * (1 - t * 0.8) + jitter(0.12);
        return [Math.cos(a) * r, -2.5 + t * 5 + jitter(0.08), Math.sin(a) * r];
    });
}

function lattice(count) {
    const half = 1.7;
    const levels = [-half, 0, half];
    return build(count, () => {
        // Un point sur une arête du treillis 3×3×3 : deux coordonnées fixées, une libre.
        const axis = Math.floor(rand(3));
        const p = [0, 0, 0];
        for (let k = 0; k < 3; k++) {
            p[k] = k === axis ? rand(-half, half) : levels[Math.floor(rand(3))] + jitter(0.025);
        }
        return p;
    });
}

// Échantillonne un dessin 2D pour en faire un relief de particules.
function fromCanvas(count, draw) {
    const S = 256;
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#fff';
    draw(ctx, S);
    const data = ctx.getImageData(0, 0, S, S).data;
    const filled = [];
    for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
            if (data[(y * S + x) * 4 + 3] > 128) filled.push(x, y);
        }
    }
    const pixels = filled.length / 2;
    return build(count, () => {
        const k = Math.floor(rand(pixels)) * 2;
        const x = ((filled[k] + Math.random()) / S - 0.5) * 5;
        const y = (0.5 - (filled[k + 1] + Math.random()) / S) * 5;
        return [x, y, jitter(0.22)];
    });
}

function glyph(count, text) {
    return fromCanvas(count, (ctx, S) => {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 200px Consolas, "Courier New", monospace';
        const width = ctx.measureText(text).width;
        const size = Math.min(200, (200 * S * 0.92) / width);
        ctx.font = `bold ${size}px Consolas, "Courier New", monospace`;
        ctx.fillText(text, S / 2, S / 2 + size * 0.04);
    });
}

function shield(count) {
    return fromCanvas(count, (ctx) => {
        ctx.beginPath();
        ctx.moveTo(128, 14);
        ctx.lineTo(226, 50);
        ctx.lineTo(226, 126);
        ctx.bezierCurveTo(226, 190, 182, 228, 128, 246);
        ctx.bezierCurveTo(74, 228, 30, 190, 30, 126);
        ctx.lineTo(30, 50);
        ctx.closePath();
        ctx.fill();
        // La coche est découpée dans le bouclier.
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 24;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(82, 130);
        ctx.lineTo(116, 166);
        ctx.lineTo(178, 94);
        ctx.stroke();
    });
}

// ---------- Shaders ----------

const vertexShader = /* glsl */ `
    uniform float uTime;
    uniform float uProgress;
    uniform float uTurbulence;
    uniform float uBurst;
    uniform float uScalePx;
    uniform float uAlpha;
    uniform vec3 uMouse;
    uniform vec3 uBurstOrigin;
    uniform vec3 uColorA;
    uniform vec3 uColorB;

    attribute vec3 aTarget;
    attribute vec4 aRand;

    varying vec3 vColor;
    varying float vAlpha;

    void main() {
        // Métamorphose échelonnée : chaque particule part à son propre moment.
        float stagger = 0.45;
        float p = clamp(uProgress * (1.0 + stagger) - aRand.x * stagger, 0.0, 1.0);
        p = p * p * (3.0 - 2.0 * p);
        vec3 pos = mix(position, aTarget, p);

        // En plein vol, le nuage tourbillonne et s'éparpille.
        float mid = sin(p * 3.14159265);
        float angle = mid * (aRand.y - 0.5) * 2.6;
        float c = cos(angle), s = sin(angle);
        pos.xz = mat2(c, -s, s, c) * pos.xz;
        pos += (aRand.yzw - 0.5) * mid * 1.7;

        // Respiration et agitation, amplifiées par la vitesse de défilement.
        float amp = 0.035 + uTurbulence * 0.3;
        pos += amp * vec3(
            sin(uTime * 0.9 + aRand.y * 40.0),
            cos(uTime * 0.7 + aRand.z * 40.0),
            sin(uTime * 1.1 + aRand.w * 40.0)
        );
        pos *= 1.0 + 0.03 * sin(uTime * 0.8 + length(pos) * 1.5);

        vec4 world = modelMatrix * vec4(pos, 1.0);

        // Les particules fuient le curseur.
        vec2 away = world.xy - uMouse.xy;
        float force = smoothstep(1.5, 0.0, length(away));
        world.xy += normalize(away + 1e-4) * force * 0.75;
        world.z += force * (aRand.w - 0.5) * 1.2;

        // Onde de choc (clic ou pulsation).
        vec3 fromBurst = world.xyz - uBurstOrigin;
        float ring = exp(-pow(length(fromBurst) - uBurst * 9.0, 2.0) * 1.5) * (1.0 - uBurst);
        world.xyz += normalize(fromBurst + 1e-4) * ring * 0.9;

        vec4 mv = viewMatrix * world;
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (0.6 + aRand.z * 0.9) * (1.0 + force * 1.5 + ring * 2.0) * uScalePx / -mv.z;

        vec3 color = mix(uColorA, uColorB, p);
        color = mix(color, vec3(1.0), step(0.9, aRand.w) * 0.6);
        vColor = color * (1.0 + force * 0.8 + ring);
        vAlpha = uAlpha * (0.65 + 0.35 * sin(uTime * 1.6 + aRand.x * 30.0));
    }
`;

const fragmentShader = /* glsl */ `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
        float d = length(gl_PointCoord - 0.5);
        float disc = smoothstep(0.5, 0.05, d);
        gl_FragColor = vec4(vColor, disc * vAlpha);
    }
`;

// ---------- Scène ----------

function init() {
    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    } catch (err) {
        canvas.remove();
        return;
    }

    const isSmall = () => window.innerWidth < 768;
    const pixelRatio = Math.min(window.devicePixelRatio, isSmall() ? 1.5 : 2);
    renderer.setPixelRatio(pixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
    camera.position.z = CAMERA_Z;

    const COUNT = isSmall() ? 3200 : 7500;

    // side : côté de l'écran (1 = droite) ; spin : la forme tourne sur elle-même,
    // sinon elle reste face à la caméra pour rester lisible.
    const stages = [
        { id: 'home', points: planet(COUNT), color: 0x58a6ff, side: 1, spin: true },
        { id: 'about', points: helix(COUNT), color: 0xa371f7, side: -1, spin: true },
        { id: 'experience', points: spiral(COUNT), color: 0x3fb950, side: 1, spin: true },
        { id: 'projects', points: glyph(COUNT, '</>'), color: 0x39c5cf, side: -1, spin: false },
        { id: 'certifications', points: shield(COUNT), color: 0xe3b341, side: 1, spin: false },
        { id: 'skills', points: lattice(COUNT), color: 0xf778ba, side: -1, spin: true },
        { id: 'contact', points: glyph(COUNT, '@'), color: 0x58a6ff, side: 1, spin: false }
    ].filter((stage) => document.getElementById(stage.id));

    stages.forEach((stage) => (stage.color = new THREE.Color(stage.color)));

    const randoms = new Float32Array(COUNT * 4);
    for (let i = 0; i < randoms.length; i++) randoms[i] = Math.random();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
    geometry.setAttribute('aTarget', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
    geometry.setAttribute('aRand', new THREE.BufferAttribute(randoms, 4));

    const uniforms = {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uTurbulence: { value: 0 },
        uBurst: { value: 1 },
        uScalePx: { value: 1 },
        uAlpha: { value: 1 },
        uMouse: { value: new THREE.Vector3(999, 999, 0) },
        uBurstOrigin: { value: new THREE.Vector3() },
        uColorA: { value: new THREE.Color() },
        uColorB: { value: new THREE.Color() }
    };

    const entity = new THREE.Points(
        geometry,
        new THREE.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        })
    );
    entity.frustumCulled = false;
    scene.add(entity);

    // Charge la paire de formes entre lesquelles on se trouve.
    let loadedIndex = -1;
    function loadPair(index) {
        if (index === loadedIndex) return;
        loadedIndex = index;
        const next = Math.min(index + 1, stages.length - 1);
        geometry.attributes.position.array.set(stages[index].points);
        geometry.attributes.aTarget.array.set(stages[next].points);
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.aTarget.needsUpdate = true;
        uniforms.uColorA.value.copy(stages[index].color);
        uniforms.uColorB.value.copy(stages[next].color);
    }

    // ---------- Étoiles ----------
    const starCount = isSmall() ? 400 : 1100;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = jitter(24);
        starPositions[i * 3 + 1] = -Math.random();
        starPositions[i * 3 + 2] = rand(-24, 2);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
        starGeometry,
        new THREE.PointsMaterial({ color: 0x9cc0ff, size: 0.055, transparent: true, opacity: 0.6, sizeAttenuation: true })
    );
    scene.add(stars);

    // ---------- Mise en page ----------
    let viewWidth = 0;
    let viewHeight = 0;
    let unitsPerPixel = 0;
    let boundaries = [];

    function layout() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();

        viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * CAMERA_Z;
        viewWidth = viewHeight * camera.aspect;
        unitsPerPixel = viewHeight / h;
        uniforms.uScalePx.value = (0.05 * h * pixelRatio) / (2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)));

        // La métamorphose vers une section a lieu quand son sommet traverse le milieu de l'écran.
        boundaries = stages.slice(1).map((stage) => document.getElementById(stage.id).offsetTop - h / 2);

        stars.scale.y = document.documentElement.scrollHeight * unitsPerPixel * 0.4 + 16;
    }

    // ---------- Interactions ----------
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false };
    const ndc = new THREE.Vector3();

    function pointerToWorld(target) {
        ndc.set(pointer.tx, -pointer.ty, 0.5).unproject(camera).sub(camera.position);
        const t = -camera.position.z / ndc.z;
        return target.copy(camera.position).addScaledVector(ndc, t);
    }

    window.addEventListener('pointermove', (e) => {
        pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
        pointer.active = e.pointerType !== 'touch';
    }, { passive: true });
    document.addEventListener('pointerleave', () => (pointer.active = false));

    let burstStart = -10;
    let lastBurst = 0;
    function burst(origin) {
        uniforms.uBurstOrigin.value.copy(origin);
        burstStart = elapsed;
        lastBurst = elapsed;
    }
    window.addEventListener('pointerdown', (e) => {
        pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
        burst(pointerToWorld(new THREE.Vector3()));
    }, { passive: true });

    // ---------- Animation ----------
    const clock = new THREE.Clock();
    const smooth = (a, b, x) => THREE.MathUtils.smoothstep(x, a, b);
    let elapsed = 0;
    let lastScroll = window.scrollY;
    let turbulence = 0;

    function render() {
        const dt = Math.min(clock.getDelta(), 0.05);
        if (!reduceMotion) elapsed += dt;

        const h = window.innerHeight;
        const scrollY = window.scrollY;
        const small = isSmall();

        // Position continue dans l'histoire : 0 = accueil, 1 = à propos, etc.
        let story = 0;
        for (const b of boundaries) story += smooth(b - h * 0.4, b + h * 0.4, scrollY);
        const index = Math.min(Math.floor(story), stages.length - 1);
        const progress = Math.min(story - index, 1);
        const from = stages[index];
        const to = stages[Math.min(index + 1, stages.length - 1)];
        loadPair(index);
        uniforms.uProgress.value = progress;

        // Vitesse de défilement → agitation.
        const speed = Math.abs(scrollY - lastScroll);
        lastScroll = scrollY;
        turbulence += (Math.min(speed / 50, 1) - turbulence) * 0.08;
        uniforms.uTurbulence.value = reduceMotion ? 0 : turbulence;
        uniforms.uTime.value = elapsed;

        // Pulsation spontanée quand personne ne clique.
        if (!reduceMotion && elapsed - lastBurst > 7) burst(entity.position);
        uniforms.uBurst.value = Math.min((elapsed - burstStart) / 1.2, 1);

        pointer.x += (pointer.tx - pointer.x) * 0.05;
        pointer.y += (pointer.ty - pointer.y) * 0.05;
        camera.position.x = pointer.x * 0.5;
        camera.position.y = -pointer.y * 0.3;
        camera.lookAt(0, 0, 0);
        camera.updateMatrixWorld();

        if (pointer.active) pointerToWorld(uniforms.uMouse.value);
        else uniforms.uMouse.value.set(999, 999, 0);

        // L'entité glisse d'un côté à l'autre selon la section.
        const eased = smooth(0, 1, progress);
        const side = THREE.MathUtils.lerp(from.side, to.side, eased);
        const bob = Math.sin(elapsed * 0.6) * 0.15;
        const heroness = index === 0 ? 1 - eased : 0;
        if (small) {
            // Sur mobile : en haut à droite dans l'accueil, puis centrée et discrète.
            entity.position.set(viewWidth * 0.22 * heroness, viewHeight * 0.27 * heroness + bob, -3 * heroness);
            entity.scale.setScalar(0.62);
            uniforms.uAlpha.value = 0.38 + 0.4 * heroness;
        } else {
            const wide = window.innerWidth > 1024;
            entity.position.set(side * viewWidth * (wide ? 0.25 : 0.3), bob, 0);
            entity.scale.setScalar(wide ? 1 : 0.8);
            uniforms.uAlpha.value = (wide ? 0.75 : 0.5) + 0.25 * heroness;
        }

        const spinAngle = elapsed * 0.25;
        const faceAngle = Math.sin(elapsed * 0.5) * 0.35;
        entity.rotation.y = THREE.MathUtils.lerp(from.spin ? spinAngle : faceAngle, to.spin ? spinAngle : faceAngle, eased) + pointer.x * 0.3;
        entity.rotation.x = pointer.y * 0.2;

        stars.position.y = 8 + scrollY * unitsPerPixel * 0.4;
        stars.rotation.y = elapsed * 0.01;

        renderer.render(scene, camera);
    }

    let running = false;
    function loop() {
        if (!running) return;
        render();
        requestAnimationFrame(loop);
    }
    function start() {
        if (running || document.hidden) return;
        running = true;
        clock.getDelta();
        requestAnimationFrame(loop);
    }
    function stop() {
        running = false;
    }

    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    window.addEventListener('resize', layout);
    // Les images qui se chargent changent la hauteur des sections.
    new ResizeObserver(layout).observe(document.body);

    canvas.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        stop();
    });
    canvas.addEventListener('webglcontextrestored', () => {
        loadedIndex = -1;
        layout();
        start();
    });

    layout();
    render();
    canvas.classList.add('is-ready');
    start();
}

if (canvas) init();
