/* ============================================================
   CIVITAS'26 — Building Systems (buildings.js)

   Procedural text voxels  → structural morph → building geometry
   Architectural detailing → sky bridges → courtyard

   All geometry is generated from geometric rules.
   No model loading. No image extrusion.
   ============================================================ */
(function () {
    'use strict';

    var scene    = window.CIVITAS.scene;
    var isMobile = window.CIVITAS.isMobile;
    var isLowEnd = window.CIVITAS.isLowEnd;

    /* ═══════════════════════════════════════════════════════════
       CONSTANTS  (1 unit ≈ 5 m)
       ═══════════════════════════════════════════════════════════ */
    var B_LENGTH  = 24;       // building length   (X)  ≈ 120 m
    var B_WIDTH   = 5.6;      // building width    (Z)  ≈  28 m
    var B_HEIGHT  = 4.8;      // building height   (Y)  ≈  24 m (5 storeys)
    var STOREY    = 0.96;     // one storey height
    var COURTYARD = 4.4;      // courtyard gap     (Z)  ≈  22 m
    var FILLET    = 0.9;      // corner radius          ≈ 4.5 m
    var SLAB_PROJ = 0.2;      // slab overhang          ≈ 1 m

    // Building-centre Z positions
    var BZ_A = -(COURTYARD / 2 + B_WIDTH / 2);   // −5.0
    var BZ_B =  (COURTYARD / 2 + B_WIDTH / 2);   // +5.0

    /* ═══════════════════════════════════════════════════════════
       UTILITIES
       ═══════════════════════════════════════════════════════════ */
    function lerp(a, b, t) { return a + (b - a) * t; }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    // Deterministic pseudo-random (0-1) from seed
    function srand(seed) {
        var x = Math.sin(seed * 9301 + 49297) * 49297;
        return x - Math.floor(x);
    }

    /* ═══════════════════════════════════════════════════════════
       SECTION 1 — TEXT VOXEL SYSTEM
       ═══════════════════════════════════════════════════════════ */

    // ── 1a. Sample text pixels from an off-screen canvas ──────
    function sampleText() {
        var W = 320, H = 80;
        var cvs = document.createElement('canvas');
        cvs.width = W; cvs.height = H;
        var ctx = cvs.getContext('2d');

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle    = '#fff';
        ctx.font         = isMobile ? 'bold 32px Arial, Helvetica, sans-serif' : 'bold 52px Arial, Helvetica, sans-serif';
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("CIVITAS'26", W / 2, H / 2);

        var img  = ctx.getImageData(0, 0, W, H).data;
        var step = isMobile ? 2 : 3;     // mobile: better detail (less decimation)
        var sc   = 10 / W;               // text ≈ 10 world-units wide
        var out  = [];

        for (var y = 0; y < H; y += step) {
            for (var x = 0; x < W; x += step) {
                if (img[(y * W + x) * 4] > 128) {
                    out.push({
                        x:   (x - W / 2) * sc,
                        y:   (H / 2 - y) * sc,    // flip Y
                        z:   0,
                        row: Math.floor(y / (H / 6))
                    });
                }
            }
        }
        return out;
    }

    // ── 1b. Phase-2 targets — structural slab grid ────────────
    function makePhase2(src) {
        var layers = 6;
        var minY = Infinity, maxY = -Infinity;
        for (var i = 0; i < src.length; i++) {
            if (src[i].y < minY) minY = src[i].y;
            if (src[i].y > maxY) maxY = src[i].y;
        }
        var range  = (maxY - minY) || 1;
        var layerH = range / layers;
        var beamSp = 2.0;
        var out = [];

        for (var i = 0; i < src.length; i++) {
            var p  = src[i];
            var li = Math.min(layers - 1, Math.floor((p.y - minY) / layerH));
            var ty = (li - layers / 2 + 0.5) * 1.4;     // separate layers
            var tx = p.x * 1.35;                          // widen horizontally
            // Snap toward beam grid (vertical divisions)
            var snap = Math.round(tx / beamSp) * beamSp;
            tx = lerp(tx, snap, 0.3);
            var tz = srand(i * 37) * 0.35 - 0.175;
            out.push({ x: tx, y: ty, z: tz });
        }
        return out;
    }

    // ── 1c. Phase-3 targets — building-volume surface ─────────
    function makePhase3(src) {
        var half = Math.floor(src.length / 2);
        var out  = [];

        for (var i = 0; i < src.length; i++) {
            var isA        = i < half;
            var bz         = isA ? BZ_A : BZ_B;
            var localIdx   = isA ? i : i - half;
            var localTotal = isA ? half : src.length - half;
            var t          = localIdx / localTotal;

            var fl = B_LENGTH - 2 * FILLET;           // flat front length
            var sl = B_WIDTH  - 2 * FILLET;           // flat side length
            var perim = 2 * (fl + sl);
            var d = t * perim;

            var tx, tz;
            if (d < fl) {
                tx = -fl / 2 + d;
                tz = bz - B_WIDTH / 2;
            } else if (d < fl + sl) {
                tx = fl / 2;
                tz = bz - B_WIDTH / 2 + (d - fl);
            } else if (d < 2 * fl + sl) {
                tx = fl / 2 - (d - fl - sl);
                tz = bz + B_WIDTH / 2;
            } else {
                tx = -fl / 2;
                tz = bz + B_WIDTH / 2 - (d - 2 * fl - sl);
            }
            var ty = srand(i * 53) * B_HEIGHT;
            out.push({ x: tx, y: ty, z: tz });
        }
        return out;
    }

    // ── 1d. Create InstancedMesh ──────────────────────────────
    var textPositions, p2Targets, p3Targets;
    var instCount, instMesh, dummy;

    function createTextInstances() {
        textPositions = sampleText();
        instCount     = textPositions.length;
        p2Targets     = makePhase2(textPositions);
        p3Targets     = makePhase3(textPositions);

        var sz  = isMobile ? 0.08 : 0.12;   // smaller on mobile for more detailed text
        var geo = new THREE.BoxGeometry(sz, sz, sz * 0.5);
        var mat = new THREE.MeshStandardMaterial({
            color:        0xffffff,       // pure white — maximises light reception
            roughness:    0.12,
            metalness:    0.25,
            emissive:     new THREE.Color(0x0055dd),
            emissiveIntensity: 1.6,       // strong inner glow
            transparent:  true,
            opacity:      1.0
        });

        instMesh = new THREE.InstancedMesh(geo, mat, instCount);
        instMesh.castShadow    = true;
        instMesh.receiveShadow = true;
        dummy = new THREE.Object3D();

        for (var i = 0; i < instCount; i++) {
            dummy.position.set(
                textPositions[i].x,
                textPositions[i].y,
                textPositions[i].z
            );
            dummy.rotation.set(0, 0, 0);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            instMesh.setMatrixAt(i, dummy.matrix);
        }
        instMesh.instanceMatrix.needsUpdate = true;
        scene.add(instMesh);
    }

    // ── 1e. Update morph each frame (scroll-driven) ───────────
    function updateMorph(progress) {
        if (!instMesh) return;
        if (progress > 0.66) { instMesh.visible = false; return; }

        for (var i = 0; i < instCount; i++) {
            var px, py, pz, s = 1;

            if (progress <= 0.15) {
                // Phase 1 — text
                px = textPositions[i].x;
                py = textPositions[i].y;
                pz = textPositions[i].z;

            } else if (progress <= 0.35) {
                // Phase 2 — text → structural grid
                var t2 = easeInOutCubic((progress - 0.15) / 0.20);
                px = lerp(textPositions[i].x, p2Targets[i].x, t2);
                py = lerp(textPositions[i].y, p2Targets[i].y, t2);
                pz = lerp(textPositions[i].z, p2Targets[i].z, t2);

            } else if (progress <= 0.55) {
                // Phase 3 — structural grid → building volumes
                var t3 = easeInOutCubic(clamp((progress - 0.35) / 0.20, 0, 1));
                px = lerp(p2Targets[i].x, p3Targets[i].x, t3);
                py = lerp(p2Targets[i].y, p3Targets[i].y, t3);
                pz = lerp(p2Targets[i].z, p3Targets[i].z, t3);

            } else {
                // Settled — fade out as real building geometry appears
                px = p3Targets[i].x;
                py = p3Targets[i].y;
                pz = p3Targets[i].z;
                s  = 1 - clamp((progress - 0.55) / 0.10, 0, 1);
            }

            dummy.position.set(px, py, pz);
            dummy.scale.set(s, s, s);
            dummy.rotation.set(0, 0, 0);
            dummy.updateMatrix();
            instMesh.setMatrixAt(i, dummy.matrix);
        }
        instMesh.instanceMatrix.needsUpdate = true;
        instMesh.visible = true;
    }

    /* ═══════════════════════════════════════════════════════════
       SECTION 2 — BUILDING GEOMETRY
       ═══════════════════════════════════════════════════════════ */

    // ── Rounded-rectangle Shape (floor plan in XY) ────────────
    function rrShape(w, d, r) {
        var s  = new THREE.Shape();
        var hw = w / 2, hd = d / 2;
        r = Math.min(r, hw, hd);
        s.moveTo(-hw + r, -hd);
        s.lineTo( hw - r, -hd);
        s.quadraticCurveTo( hw, -hd,  hw, -hd + r);
        s.lineTo( hw,  hd - r);
        s.quadraticCurveTo( hw,  hd,  hw - r,  hd);
        s.lineTo(-hw + r,  hd);
        s.quadraticCurveTo(-hw,  hd, -hw,  hd - r);
        s.lineTo(-hw, -hd + r);
        s.quadraticCurveTo(-hw, -hd, -hw + r, -hd);
        return s;
    }

    // ── Groups ────────────────────────────────────────────────
    var buildingGrp  = new THREE.Group();
    var detailGrp    = new THREE.Group();
    var bridgeGrp    = new THREE.Group();
    var courtyardGrp = new THREE.Group();

    buildingGrp.visible  = false;
    detailGrp.visible    = false;
    bridgeGrp.visible    = false;
    courtyardGrp.visible = false;

    scene.add(buildingGrp);
    scene.add(detailGrp);
    scene.add(bridgeGrp);
    scene.add(courtyardGrp);

    // ── Rotate all groups 90° on Y-axis for side/drone view ───
    var ROT_Y = Math.PI / 2;
    buildingGrp.rotation.y  = ROT_Y;
    detailGrp.rotation.y    = ROT_Y;
    bridgeGrp.rotation.y    = ROT_Y;
    courtyardGrp.rotation.y = ROT_Y;

    // ── Shared materials ──────────────────────────────────────
    var facadeMat = new THREE.MeshStandardMaterial({
        color: 0xf0efe8, roughness: 0.75, metalness: 0.0,
        transparent: true, opacity: 0
    });

    var slabMat = new THREE.MeshStandardMaterial({
        color: 0xeae9e2, roughness: 0.80, metalness: 0.0,
        transparent: true, opacity: 0
    });

    var winMat = new THREE.MeshStandardMaterial({
        color: 0x1a2a3a, roughness: 0.30, metalness: 0.30,
        transparent: true, opacity: 0
    });

    var ribbonMat = new THREE.MeshStandardMaterial({
        color: 0x0a1520, roughness: 0.20, metalness: 0.40,
        transparent: true, opacity: 0
    });

    var voidMat = new THREE.MeshStandardMaterial({
        color: 0x0d1218, roughness: 0.40, metalness: 0.10,
        transparent: true, opacity: 0
    });

    var bridgeMat = new THREE.MeshStandardMaterial({
        color: 0x4a3525, roughness: 0.40, metalness: 0.50,
        transparent: true, opacity: 0
    });

    var railMat = new THREE.MeshStandardMaterial({
        color: 0x667788, roughness: 0.30, metalness: 0.55,
        transparent: true, opacity: 0
    });

    var courtMat = new THREE.MeshStandardMaterial({
        color: 0x8b5a3a, roughness: 0.85, metalness: 0.0,
        transparent: true, opacity: 0
    });
    var stripMat = new THREE.MeshStandardMaterial({
        color: 0x6b3a2a, roughness: 0.90, metalness: 0.0,
        transparent: true, opacity: 0
    });
    var plantMat = new THREE.MeshStandardMaterial({
        color: 0x3a5a3a, roughness: 0.90, metalness: 0.0,
        transparent: true, opacity: 0
    });
    var groundMat = new THREE.MeshStandardMaterial({
        color: 0x1a1e28, roughness: 1.0, metalness: 0.0,
        transparent: true, opacity: 0
    });

    // ── 2a. Main building bodies ──────────────────────────────
    function createBodies() {
        var shape = rrShape(B_LENGTH, B_WIDTH, FILLET);
        var geo   = new THREE.ExtrudeGeometry(shape, {
            depth: B_HEIGHT, bevelEnabled: false
        });
        // Rotate so extrusion goes upward (+Y)
        geo.rotateX(-Math.PI / 2);

        var bodyA = new THREE.Mesh(geo, facadeMat);
        bodyA.position.set(0, 0, BZ_A);
        bodyA.castShadow = true; bodyA.receiveShadow = true;
        buildingGrp.add(bodyA);

        var geo2  = geo.clone();
        var bodyB = new THREE.Mesh(geo2, facadeMat);
        bodyB.position.set(0, 0, BZ_B);
        bodyB.castShadow = true; bodyB.receiveShadow = true;
        buildingGrp.add(bodyB);
    }

    // ── 2b. Horizontal slab projections ───────────────────────
    function createSlabs() {
        var shape = rrShape(
            B_LENGTH + 2 * SLAB_PROJ,
            B_WIDTH  + 2 * SLAB_PROJ,
            FILLET   + SLAB_PROJ
        );
        var geo = new THREE.ExtrudeGeometry(shape, {
            depth: 0.06, bevelEnabled: false
        });
        geo.rotateX(-Math.PI / 2);

        for (var s = 0; s <= 5; s++) {
            var y = s * STOREY;
            var a = new THREE.Mesh(geo, slabMat);
            a.position.set(0, y, BZ_A);
            a.castShadow = true;
            detailGrp.add(a);

            var b = new THREE.Mesh(geo.clone(), slabMat);
            b.position.set(0, y, BZ_B);
            b.castShadow = true;
            detailGrp.add(b);
        }
    }

    // ── 2c. Slit windows (InstancedMesh) ──────────────────────
    function createWindows() {
        var winGeo = new THREE.BoxGeometry(0.35, 0.08, 0.04);
        var data   = [];  // {x, y, z, ry}

        [BZ_A, BZ_B].forEach(function (bz, bIdx) {
            // Front & back faces (long faces, along X)
            var faces = [
                { z: bz - B_WIDTH / 2 - 0.02, ry: 0 },
                { z: bz + B_WIDTH / 2 + 0.02, ry: 0 }
            ];
            faces.forEach(function (f, fIdx) {
                for (var s = 0; s < 5; s++) {
                    var baseY = s * STOREY + STOREY * 0.35;
                    var xMin  = -B_LENGTH / 2 + FILLET + 0.5;
                    var xMax  =  B_LENGTH / 2 - FILLET - 0.5;
                    for (var x = xMin; x < xMax; x += 1.8) {
                        var seed = bIdx * 1e3 + fIdx * 500 + s * 50 + Math.floor(x * 10);
                        if (srand(seed) > 0.68) continue;
                        data.push({
                            x:  x + srand(s * 3 + x) * 0.3,
                            y:  baseY + srand(seed + 7) * STOREY * 0.25,
                            z:  f.z,
                            ry: f.ry
                        });
                    }
                }
            });

            // Side faces (short faces, along Z)
            var sides = [
                { x: -B_LENGTH / 2 - 0.02, ry: Math.PI / 2 },
                { x:  B_LENGTH / 2 + 0.02, ry: Math.PI / 2 }
            ];
            sides.forEach(function (s2, sIdx) {
                for (var s = 0; s < 5; s++) {
                    var baseY = s * STOREY + STOREY * 0.35;
                    var zMin  = bz - B_WIDTH / 2 + FILLET + 0.3;
                    var zMax  = bz + B_WIDTH / 2 - FILLET - 0.3;
                    for (var z = zMin; z < zMax; z += 1.8) {
                        var seed = bIdx * 2e3 + sIdx * 700 + s * 60 + Math.floor(z * 10);
                        if (srand(seed) > 0.6) continue;
                        data.push({
                            x:  s2.x,
                            y:  baseY + srand(seed + 11) * STOREY * 0.2,
                            z:  z,
                            ry: s2.ry
                        });
                    }
                }
            });
        });

        var d   = new THREE.Object3D();
        var inst = new THREE.InstancedMesh(winGeo, winMat, data.length);
        for (var i = 0; i < data.length; i++) {
            d.position.set(data[i].x, data[i].y, data[i].z);
            d.rotation.set(0, data[i].ry, 0);
            d.scale.set(1, 1, 1);
            d.updateMatrix();
            inst.setMatrixAt(i, d.matrix);
        }
        inst.instanceMatrix.needsUpdate = true;
        detailGrp.add(inst);
    }

    // ── 2d. Continuous ribbon glazing ─────────────────────────
    function createRibbon() {
        var rLen = B_LENGTH - 2 * FILLET - 1;
        var geo  = new THREE.BoxGeometry(rLen, 0.18, 0.05);
        var cy   = 2 * STOREY + STOREY * 0.5;   // corridor level

        // Block A — front / back
        var m;
        m = new THREE.Mesh(geo, ribbonMat);
        m.position.set(0, cy, BZ_A - B_WIDTH / 2 - 0.025);
        detailGrp.add(m);

        m = new THREE.Mesh(geo.clone(), ribbonMat);
        m.position.set(0, cy, BZ_A + B_WIDTH / 2 + 0.025);
        detailGrp.add(m);

        // Block B — front / back
        m = new THREE.Mesh(geo.clone(), ribbonMat);
        m.position.set(0, cy, BZ_B - B_WIDTH / 2 - 0.025);
        detailGrp.add(m);

        m = new THREE.Mesh(geo.clone(), ribbonMat);
        m.position.set(0, cy, BZ_B + B_WIDTH / 2 + 0.025);
        detailGrp.add(m);
    }

    // ── 2e. Controlled voids (balanced asymmetry) ─────────────
    function createVoids() {
        var geo = new THREE.BoxGeometry(1.5, 1.2, 0.08);
        var positions = [
            { x: -5,  y: 1.5, z: BZ_A - B_WIDTH / 2 - 0.03 },
            { x:  7,  y: 3.2, z: BZ_A - B_WIDTH / 2 - 0.03 },
            { x:  3,  y: 0.8, z: BZ_A + B_WIDTH / 2 + 0.03 },
            { x: -4,  y: 2.8, z: BZ_B + B_WIDTH / 2 + 0.03 },
            { x:  6,  y: 1.2, z: BZ_B - B_WIDTH / 2 - 0.03 },
            { x: -8,  y: 3.5, z: BZ_B + B_WIDTH / 2 + 0.03 }
        ];
        positions.forEach(function (p) {
            var m = new THREE.Mesh(geo, voidMat);
            m.position.set(p.x, p.y, p.z);
            detailGrp.add(m);
        });
    }

    // ── 2f. Sky bridges ───────────────────────────────────────
    function createBridges() {
        var span = COURTYARD + 1.0;
        var bGeo = new THREE.BoxGeometry(0.8, 0.18, span);
        var rGeo = new THREE.BoxGeometry(0.02, 0.5, span);

        var specs = [
            { x: -4, y: 2 * STOREY },
            { x:  2, y: 3 * STOREY },
            { x:  8, y: 4 * STOREY }
        ];
        specs.forEach(function (sp) {
            // Deck
            var deck = new THREE.Mesh(bGeo, bridgeMat);
            deck.position.set(sp.x, sp.y, 0);
            deck.castShadow = true;
            bridgeGrp.add(deck);

            // Left railing
            var rL = new THREE.Mesh(rGeo, railMat);
            rL.position.set(sp.x - 0.35, sp.y + 0.30, 0);
            bridgeGrp.add(rL);

            // Right railing
            var rR = new THREE.Mesh(rGeo.clone(), railMat);
            rR.position.set(sp.x + 0.35, sp.y + 0.30, 0);
            bridgeGrp.add(rR);
        });
    }

    // ── 2g. Courtyard + ground ────────────────────────────────
    function createCourtyard() {
        // Courtyard paving
        var cGeo = new THREE.PlaneGeometry(B_LENGTH, COURTYARD);
        var court = new THREE.Mesh(cGeo, courtMat);
        court.rotation.x = -Math.PI / 2;
        court.position.set(0, 0.01, 0);
        court.receiveShadow = true;
        courtyardGrp.add(court);

        // Red / brown linear paving strips
        var sGeo = new THREE.PlaneGeometry(B_LENGTH - 2, 0.15);
        for (var s = -3; s <= 3; s++) {
            var strip = new THREE.Mesh(sGeo, stripMat);
            strip.rotation.x = -Math.PI / 2;
            strip.position.set(0, 0.015, s * 0.6);
            courtyardGrp.add(strip);
        }

        // Minimal planting rows
        var pGeo = new THREE.BoxGeometry(B_LENGTH - 4, 0.08, 0.3);
        [-1.5, 1.5].forEach(function (pz) {
            var p = new THREE.Mesh(pGeo, plantMat);
            p.position.set(0, 0.04, pz);
            courtyardGrp.add(p);
        });

        // Extended ground plane
        var gGeo = new THREE.PlaneGeometry(60, 40);
        var gnd  = new THREE.Mesh(gGeo, groundMat);
        gnd.rotation.x = -Math.PI / 2;
        gnd.position.set(0, -0.02, 0);
        gnd.receiveShadow = true;
        courtyardGrp.add(gnd);
    }

    /* ═══════════════════════════════════════════════════════════
       SECTION 3 — INITIALISE ALL
       ═══════════════════════════════════════════════════════════ */
    createTextInstances();
    createBodies();
    createSlabs();
    if (!isLowEnd) {
        createWindows();
        createRibbon();
        createVoids();
    }
    createBridges();
    createCourtyard();

    /* ═══════════════════════════════════════════════════════════
       SECTION 4 — VISIBILITY / OPACITY DRIVER
       ═══════════════════════════════════════════════════════════ */
    function updateVisibility(progress) {

        // Building bodies — fade in during late Phase 3 → Phase 4
        if (progress > 0.50) {
            buildingGrp.visible = true;
            var bO = clamp((progress - 0.50) / 0.15, 0, 1);
            facadeMat.opacity = bO;
            if (bO >= 0.98) { facadeMat.transparent = false; facadeMat.opacity = 1; }
            else            { facadeMat.transparent = true; }
        } else {
            buildingGrp.visible = false;
        }

        // Details (slabs, windows, glazing, voids) — Phase 4
        if (progress > 0.60) {
            detailGrp.visible = true;
            var dO = clamp((progress - 0.60) / 0.15, 0, 1);
            slabMat.opacity   = dO;
            winMat.opacity    = dO;
            ribbonMat.opacity = dO;
            voidMat.opacity   = dO;
        } else {
            detailGrp.visible = false;
        }

        // Bridges — Phase 5
        if (progress > 0.80) {
            bridgeGrp.visible = true;
            var brO = clamp((progress - 0.80) / 0.10, 0, 1);
            bridgeMat.opacity = brO;
            railMat.opacity   = brO * 0.5;
        } else {
            bridgeGrp.visible = false;
        }

        // Courtyard — Phase 5
        if (progress > 0.82) {
            courtyardGrp.visible = true;
            var cO = clamp((progress - 0.82) / 0.12, 0, 1);
            courtMat.opacity  = cO;
            stripMat.opacity  = cO;
            plantMat.opacity  = cO * 0.7;
            groundMat.opacity = cO * 0.4;
        } else {
            courtyardGrp.visible = false;
        }
    }

    /* ═══════════════════════════════════════════════════════════
       PUBLIC API
       ═══════════════════════════════════════════════════════════ */
    window.CIVITAS.buildings = {
        instMesh:     instMesh,
        buildingGrp:  buildingGrp,
        detailGrp:    detailGrp,
        bridgeGrp:    bridgeGrp,
        courtyardGrp: courtyardGrp,
        facadeMat:    facadeMat,
        updateMorph:      updateMorph,
        updateVisibility: updateVisibility
    };
})();
