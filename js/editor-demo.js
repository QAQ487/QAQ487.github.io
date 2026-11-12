/* Lightweight WebGL sketch for the ghost-editor viewport. No libraries. */
(function () {
  const TAU = Math.PI * 2;
  const CANOPY = [0.059, 0.102, 0.086, 1];
  const LOOP = 8;

  function compile(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn(gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  function program(gl, vs, fs) {
    const p = gl.createProgram();
    const v = compile(gl, gl.VERTEX_SHADER, vs);
    const f = compile(gl, gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return null;
    gl.attachShader(p, v);
    gl.attachShader(p, f);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(p));
      return null;
    }
    return p;
  }

  function bindAttribs(gl, prog, names) {
    const out = { prog: prog, u: {}, a: {} };
    const nu = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < nu; i++) {
      const info = gl.getActiveUniform(prog, i);
      out.u[info.name] = gl.getUniformLocation(prog, info.name);
    }
    names.forEach((n) => { out.a[n] = gl.getAttribLocation(prog, n); });
    return out;
  }

  function buffer(gl, data, type) {
    const b = gl.createBuffer();
    gl.bindBuffer(type || gl.ARRAY_BUFFER, b);
    gl.bufferData(type || gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return b;
  }

  /* ---------- math ---------- */
  function ident() {
    const m = new Float32Array(16);
    m[0] = m[5] = m[10] = m[15] = 1;
    return m;
  }
  function mul(a, b) {
    const o = new Float32Array(16);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        o[j * 4 + i] =
          a[i] * b[j * 4] + a[4 + i] * b[j * 4 + 1] +
          a[8 + i] * b[j * 4 + 2] + a[12 + i] * b[j * 4 + 3];
      }
    }
    return o;
  }
  function perspective(fovy, aspect, near, far) {
    const f = 1 / Math.tan(fovy / 2);
    const m = new Float32Array(16);
    const nf = 1 / (near - far);
    m[0] = f / aspect;
    m[5] = f;
    m[10] = (far + near) * nf;
    m[11] = -1;
    m[14] = (2 * far * near) * nf;
    return m;
  }
  function lookAt(ex, ey, ez, cx, cy, cz, ux, uy, uz) {
    let zx = ex - cx, zy = ey - cy, zz = ez - cz;
    let zl = 1 / Math.hypot(zx, zy, zz);
    zx *= zl; zy *= zl; zz *= zl;
    let xx = uy * zz - uz * zy, xy = uz * zx - ux * zz, xz = ux * zy - uy * zx;
    let xl = Math.hypot(xx, xy, xz) || 1;
    xx /= xl; xy /= xl; xz /= xl;
    const yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
    const m = ident();
    m[0] = xx; m[1] = yx; m[2] = zx;
    m[4] = xy; m[5] = yy; m[6] = zy;
    m[8] = xz; m[9] = yz; m[10] = zz;
    m[12] = -(xx * ex + xy * ey + xz * ez);
    m[13] = -(yx * ex + yy * ey + yz * ez);
    m[14] = -(zx * ex + zy * ey + zz * ez);
    return m;
  }
  function translate(m, x, y, z) {
    const t = ident();
    t[12] = x; t[13] = y; t[14] = z;
    return mul(m, t);
  }
  function rotateY(m, r) {
    const c = Math.cos(r), s = Math.sin(r);
    const t = ident();
    t[0] = c; t[2] = -s; t[8] = s; t[10] = c;
    return mul(m, t);
  }
  function rotateX(m, r) {
    const c = Math.cos(r), s = Math.sin(r);
    const t = ident();
    t[5] = c; t[6] = s; t[9] = -s; t[10] = c;
    return mul(m, t);
  }
  function normalMat(m) {
    // inverse-transpose of the upper 3x3, returned as mat3 in mat4's first cells? we'll use 9 floats
    const a00 = m[0], a01 = m[1], a02 = m[2];
    const a10 = m[4], a11 = m[5], a12 = m[6];
    const a20 = m[8], a21 = m[9], a22 = m[10];
    const b01 = a22 * a11 - a12 * a21;
    const b11 = -a22 * a10 + a12 * a20;
    const b21 = a21 * a10 - a11 * a20;
    const det = a00 * b01 + a01 * b11 + a02 * b21 || 1;
    const id = 1 / det;
    const o = new Float32Array(9);
    o[0] = b01 * id;
    o[1] = (-a22 * a01 + a02 * a21) * id;
    o[2] = (a12 * a01 - a02 * a11) * id;
    o[3] = b11 * id;
    o[4] = (a22 * a00 - a02 * a20) * id;
    o[5] = (-a12 * a00 + a02 * a10) * id;
    o[6] = b21 * id;
    o[7] = (-a21 * a00 + a01 * a20) * id;
    o[8] = (a11 * a00 - a01 * a10) * id;
    return o;
  }

  /* ---------- geometry ---------- */
  function icosahedron() {
    const t = (1 + Math.sqrt(5)) / 2;
    const raw = [
      -1, t, 0,  1, t, 0,  -1, -t, 0,  1, -t, 0,
      0, -1, t,  0, 1, t,   0, -1, -t,  0, 1, -t,
      t, 0, -1,  t, 0, 1,  -t, 0, -1,  -t, 0, 1
    ];
    const v = [];
    for (let i = 0; i < raw.length; i += 3) {
      const l = Math.hypot(raw[i], raw[i + 1], raw[i + 2]) || 1;
      v.push(raw[i] / l, raw[i + 1] / l, raw[i + 2] / l);
    }
    const f = [
      0,11,5, 0,5,1, 0,1,7, 0,7,10, 0,10,11,
      1,5,9, 5,11,4, 11,10,2, 10,7,6, 7,1,8,
      3,9,4, 3,4,2, 3,2,6, 3,6,8, 3,8,9,
      4,9,5, 2,4,11, 6,2,10, 8,6,7, 9,8,1
    ];
    const pos = [], nrm = [], edges = new Map();
    function edge(a, b) {
      const k = a < b ? a + "," + b : b + "," + a;
      if (edges.has(k)) return;
      edges.set(k, true);
    }
    for (let i = 0; i < f.length; i += 3) {
      const ia = f[i] * 3, ib = f[i + 1] * 3, ic = f[i + 2] * 3;
      const ax = v[ia], ay = v[ia + 1], az = v[ia + 2];
      const bx = v[ib], by = v[ib + 1], bz = v[ib + 2];
      const cx = v[ic], cy = v[ic + 1], cz = v[ic + 2];
      let nx = (by - ay) * (cz - az) - (bz - az) * (cy - ay);
      let ny = (bz - az) * (cx - ax) - (bx - ax) * (cz - az);
      let nz = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
      const nl = Math.hypot(nx, ny, nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      pos.push(ax, ay, az, bx, by, bz, cx, cy, cz);
      nrm.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
      edge(f[i], f[i + 1]); edge(f[i + 1], f[i + 2]); edge(f[i + 2], f[i]);
    }
    const wpos = [];
    edges.forEach((_, k) => {
      const [a, b] = k.split(",").map(Number);
      wpos.push(v[a * 3], v[a * 3 + 1], v[a * 3 + 2], v[b * 3], v[b * 3 + 1], v[b * 3 + 2]);
    });
    return {
      pos: new Float32Array(pos),
      nrm: new Float32Array(nrm),
      wire: new Float32Array(wpos),
      tris: pos.length / 3,
      lines: wpos.length / 3
    };
  }

  function gridLines(half, step) {
    const p = [];
    for (let i = -half; i <= half; i += step) {
      p.push(-half, 0, i, half, 0, i);
      p.push(i, 0, -half, i, 0, half);
    }
    return new Float32Array(p);
  }

  function axisLines() {
    // origin gizmo, slightly shorter arms + a tip bump via extra verts
    const s = 1.15, t = 0.18;
    return new Float32Array([
      0,0,0, s,0,0,  s,0,0, s-t, t*0.4,0,  s,0,0, s-t,-t*0.4,0,
      0,0,0, 0,s,0,  0,s,0, t*0.4,s-t,0,  0,s,0, -t*0.4,s-t,0,
      0,0,0, 0,0,s,  0,0,s, t*0.4,0,s-t,  0,0,s, -t*0.4,0,s-t
    ]);
  }
  function axisColors() {
    const R = [0.86, 0.32, 0.28], G = [0.45, 0.78, 0.52], B = [0.35, 0.55, 0.92];
    const c = [];
    for (let i = 0; i < 6; i++) c.push(...R);
    for (let i = 0; i < 6; i++) c.push(...G);
    for (let i = 0; i < 6; i++) c.push(...B);
    return new Float32Array(c);
  }

  const VS_MESH = `
    attribute vec3 aPos, aNrm;
    uniform mat4 uMVP, uModel;
    uniform mat3 uNrm;
    varying vec3 vN, vW;
    void main() {
      vec4 w = uModel * vec4(aPos, 1.0);
      vW = w.xyz;
      vN = normalize(uNrm * aNrm);
      gl_Position = uMVP * vec4(aPos, 1.0);
    }
  `;
  const FS_MESH = `
    precision mediump float;
    varying vec3 vN, vW;
    uniform vec3 uColor, uEye, uKeyDir, uFillDir;
    uniform float uRough, uMetal, uFill;
    float D_GGX(float NoH, float r) {
      float a = r * r, a2 = a * a;
      float d = NoH * NoH * (a2 - 1.0) + 1.0;
      return a2 / (3.14159 * d * d);
    }
    float G_Schlick(float NoV, float NoL, float r) {
      float k = (r + 1.0) * (r + 1.0) / 8.0;
      float gv = NoV / (NoV * (1.0 - k) + k);
      float gl = NoL / (NoL * (1.0 - k) + k);
      return gv * gl;
    }
    vec3 F_Schlick(float VoH, vec3 f0) {
      return f0 + (1.0 - f0) * pow(1.0 - VoH, 5.0);
    }
    vec3 shade(vec3 L, vec3 Lcol, vec3 N, vec3 V, vec3 base, float rough, float metal) {
      vec3 H = normalize(V + L);
      float NoL = max(dot(N, L), 0.0);
      float NoV = max(dot(N, V), 0.04);
      float NoH = max(dot(N, H), 0.0);
      float VoH = max(dot(V, H), 0.0);
      vec3 f0 = mix(vec3(0.04), base, metal);
      vec3 F = F_Schlick(VoH, f0);
      float D = D_GGX(NoH, max(rough, 0.04));
      float G = G_Schlick(NoV, NoL, rough);
      vec3 spec = (D * G * F) / max(4.0 * NoV * NoL, 0.001);
      vec3 diff = (1.0 - F) * (1.0 - metal) * base / 3.14159;
      return (diff + spec) * Lcol * NoL;
    }
    void main() {
      vec3 N = normalize(vN);
      vec3 V = normalize(uEye - vW);
      vec3 key = shade(normalize(uKeyDir), vec3(1.35, 1.28, 1.15), N, V, uColor, uRough, uMetal);
      vec3 fill = shade(normalize(uFillDir), vec3(0.35, 0.55, 0.48), N, V, uColor, uRough, uMetal);
      vec3 amb = uColor * vec3(0.08, 0.12, 0.10);
      vec3 col = amb + key + fill;
      col = col / (col + vec3(1.0));
      col = pow(col, vec3(1.0 / 2.2));
      gl_FragColor = vec4(col, uFill);
    }
  `;

  const VS_LINE = `
    attribute vec3 aPos;
    attribute vec3 aCol;
    uniform mat4 uMVP;
    uniform vec3 uColor;
    uniform float uUseAttr;
    varying vec3 vC;
    void main() {
      vC = mix(uColor, aCol, uUseAttr);
      gl_Position = uMVP * vec4(aPos, 1.0);
    }
  `;
  const FS_LINE = `
    precision mediump float;
    varying vec3 vC;
    uniform float uAlpha;
    void main() { gl_FragColor = vec4(vC, uAlpha); }
  `;

  function init(root) {
    const canvas = root.querySelector("[data-editor-canvas]");
    if (!canvas) return null;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: true,
      powerPreference: "low-power",
      preserveDrawingBuffer: true
    });
    if (!gl) return null;

    const meshProg = program(gl, VS_MESH, FS_MESH);
    const lineProg = program(gl, VS_LINE, FS_LINE);
    if (!meshProg || !lineProg) return null;
    const mesh = bindAttribs(gl, meshProg, ["aPos", "aNrm"]);
    const line = bindAttribs(gl, lineProg, ["aPos", "aCol"]);

    const ico = icosahedron();
    const icoPos = buffer(gl, ico.pos);
    const icoNrm = buffer(gl, ico.nrm);
    const icoWire = buffer(gl, ico.wire);
    const grid = gridLines(5, 1);
    const gridBuf = buffer(gl, grid);
    const axis = axisLines();
    const axisBuf = buffer(gl, axis);
    const axisCol = buffer(gl, axisColors());

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dprCap = 2;
    let playing = !reduce;
    let start = performance.now();
    let time = reduce ? 3.6 : 0;
    let yawUser = 0, pitchUser = 0, yawTarget = 0, pitchTarget = 0;
    let selection = "mesh";
    let autoSelectUntil = 0;
    let raf = 0;
    let visible = true;
    let pointerId = null;

    const hier = root.querySelectorAll("[data-entity]");
    const inspRot = root.querySelector("[data-insp='rot']");
    const inspRough = root.querySelector("[data-insp='rough']");
    const inspMetal = root.querySelector("[data-insp='metal']");

    function setSelection(id, fromUser) {
      selection = id;
      if (fromUser) autoSelectUntil = time + 4;
      hier.forEach((el) => {
        const on = el.getAttribute("data-entity") === id;
        el.classList.toggle("is-active", on);
        if (on) el.setAttribute("aria-current", "true");
        else el.removeAttribute("aria-current");
      });
    }
    setSelection("mesh", false);
    hier.forEach((el) => {
      el.addEventListener("click", () => setSelection(el.getAttribute("data-entity"), true));
    });

    function resize() {
      const mobile = root.clientWidth < 700 || window.matchMedia("(max-width: 800px)").matches;
      dprCap = mobile ? 1.5 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    function autoSelect(t) {
      if (reduce) return;
      if (t < autoSelectUntil) return;
      const u = (t % LOOP) / LOOP;
      if (u < 0.62) setSelection("mesh", false);
      else if (u < 0.8) setSelection("light", false);
      else setSelection("grid", false);
    }

    function fillAmount(t) {
      if (reduce) return 1;
      const u = t % LOOP;
      if (u < 1.6) return 0.04;
      if (u < 3.1) return 0.04 + 0.96 * ((u - 1.6) / 1.5);
      return 1;
    }
    function wireAmount(t) {
      if (reduce) return 0.22;
      const fill = fillAmount(t);
      return 0.95 - fill * 0.7;
    }
    function roughness(t) {
      if (reduce) return 0.34;
      return 0.30 + 0.10 * Math.sin(t * 0.7);
    }

    function draw(t) {
      resize();
      const fill = fillAmount(t);
      const rough = roughness(t);
      const metal = 0.28;
      const autoYaw = reduce ? 0.55 : t * 0.22;
      const yaw = autoYaw + yawUser;
      const pitch = 0.32 + pitchUser;

      const aspect = canvas.width / Math.max(1, canvas.height);
      const proj = perspective(50 * Math.PI / 180, aspect, 0.1, 40);
      const dist = 5.1;
      const cx = Math.sin(yaw) * Math.cos(pitch) * dist;
      const cy = 1.55 + Math.sin(pitch) * 1.4;
      const cz = Math.cos(yaw) * Math.cos(pitch) * dist;
      const view = lookAt(cx, cy, cz, 0, 0.55, 0, 0, 1, 0);
      const vp = mul(proj, view);

      gl.clearColor(CANOPY[0], CANOPY[1], CANOPY[2], 1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.lineWidth(1);

      const gridModel = ident();
      const gridMVP = mul(vp, gridModel);
      const gridHi = selection === "grid" ? 0.85 : 0.38;
      gl.useProgram(line.prog);
      gl.uniformMatrix4fv(line.u.uMVP, false, gridMVP);
      gl.uniform3f(line.u.uColor, 0.42, 0.55, 0.48);
      gl.uniform1f(line.u.uUseAttr, 0);
      gl.uniform1f(line.u.uAlpha, gridHi);
      gl.bindBuffer(gl.ARRAY_BUFFER, gridBuf);
      gl.enableVertexAttribArray(line.a.aPos);
      gl.vertexAttribPointer(line.a.aPos, 3, gl.FLOAT, false, 0, 0);
      if (line.a.aCol >= 0) {
        gl.disableVertexAttribArray(line.a.aCol);
        gl.vertexAttrib3f(line.a.aCol, 0.42, 0.55, 0.48);
      }
      gl.drawArrays(gl.LINES, 0, grid.length / 3);

      let model = ident();
      model = translate(model, 0, 1.05, 0);
      model = rotateY(model, reduce ? 0.4 : t * 0.15);
      model = rotateX(model, 0.18);
      const mvp = mul(vp, model);
      const nrm = normalMat(mul(view, model));

      if (fill > 0.02) {
        gl.useProgram(mesh.prog);
        gl.uniformMatrix4fv(mesh.u.uMVP, false, mvp);
        gl.uniformMatrix4fv(mesh.u.uModel, false, model);
        gl.uniformMatrix3fv(mesh.u.uNrm, false, nrm);
        gl.uniform3f(mesh.u.uColor, 0.62, 0.78, 0.68);
        gl.uniform3f(mesh.u.uEye, cx, cy, cz);
        const lightBoost = selection === "light" ? 1.25 : 1;
        gl.uniform3f(mesh.u.uKeyDir, 0.7 * lightBoost, 0.95 * lightBoost, 0.45);
        gl.uniform3f(mesh.u.uFillDir, -0.35, 0.2, -0.55);
        gl.uniform1f(mesh.u.uRough, rough);
        gl.uniform1f(mesh.u.uMetal, metal);
        gl.uniform1f(mesh.u.uFill, fill);
        gl.bindBuffer(gl.ARRAY_BUFFER, icoPos);
        gl.enableVertexAttribArray(mesh.a.aPos);
        gl.vertexAttribPointer(mesh.a.aPos, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, icoNrm);
        gl.enableVertexAttribArray(mesh.a.aNrm);
        gl.vertexAttribPointer(mesh.a.aNrm, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, ico.tris);
      }

      const wAlpha = wireAmount(t) * (selection === "mesh" || fill < 0.9 ? 1 : 0.55);
      gl.useProgram(line.prog);
      gl.uniformMatrix4fv(line.u.uMVP, false, mvp);
      gl.uniform3f(line.u.uColor, 0.82, 0.93, 0.86);
      gl.uniform1f(line.u.uUseAttr, 0);
      gl.uniform1f(line.u.uAlpha, wAlpha);
      gl.bindBuffer(gl.ARRAY_BUFFER, icoWire);
      gl.enableVertexAttribArray(line.a.aPos);
      gl.vertexAttribPointer(line.a.aPos, 3, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.LINES, 0, ico.lines);

      if (selection === "mesh") {
        gl.disable(gl.DEPTH_TEST);
        const gizmo = translate(ident(), 0, 1.05, 0);
        gl.uniformMatrix4fv(line.u.uMVP, false, mul(vp, gizmo));
        gl.uniform1f(line.u.uUseAttr, 1);
        gl.uniform1f(line.u.uAlpha, 0.95);
        gl.bindBuffer(gl.ARRAY_BUFFER, axisBuf);
        gl.enableVertexAttribArray(line.a.aPos);
        gl.vertexAttribPointer(line.a.aPos, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, axisCol);
        if (line.a.aCol >= 0) {
          gl.enableVertexAttribArray(line.a.aCol);
          gl.vertexAttribPointer(line.a.aCol, 3, gl.FLOAT, false, 0, 0);
        }
        gl.drawArrays(gl.LINES, 0, axis.length / 3);
        if (line.a.aCol >= 0) gl.disableVertexAttribArray(line.a.aCol);
        gl.enable(gl.DEPTH_TEST);
      }

      if (inspRot) {
        const rx = (0.18 * 180 / Math.PI);
        const ry = ((reduce ? 0.4 : t * 0.15) % TAU) * 180 / Math.PI;
        inspRot.textContent = rx.toFixed(1) + ", " + (ry < 0 ? ry + 360 : ry).toFixed(1) + ", 0.0";
      }
      if (inspRough) inspRough.textContent = rough.toFixed(2);
      if (inspMetal) inspMetal.textContent = metal.toFixed(2);
    }

    function frame(now) {
      if (!visible) { raf = 0; return; }
      if (playing && !reduce) {
        time = (now - start) / 1000;
        yawUser += (yawTarget - yawUser) * 0.08;
        pitchUser += (pitchTarget - pitchUser) * 0.08;
      }
      autoSelect(time);
      draw(time);
      if (playing && !reduce) raf = requestAnimationFrame(frame);
      else raf = 0;
    }

    function startLoop() {
      if (reduce) { draw(3.6); return; }
      if (!playing || raf) return;
      start = performance.now() - time * 1000;
      raf = requestAnimationFrame(frame);
    }
    function stopLoop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    canvas.addEventListener("pointerdown", (e) => {
      if (reduce) return;
      pointerId = e.pointerId;
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener("pointermove", (e) => {
      if (reduce) return;
      if (pointerId !== null) {
        yawTarget += e.movementX * 0.005;
        pitchTarget = Math.max(-0.5, Math.min(0.6, pitchTarget - e.movementY * 0.004));
      } else {
        const r = canvas.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        yawTarget = nx * 0.55;
        pitchTarget = -ny * 0.28;
      }
    });
    canvas.addEventListener("pointerup", (e) => {
      if (pointerId === e.pointerId) pointerId = null;
    });
    canvas.addEventListener("pointerleave", () => {
      if (pointerId === null) { yawTarget = 0; pitchTarget = 0; }
    });

    const io = new IntersectionObserver((entries) => {
      visible = entries.some((en) => en.isIntersecting && en.intersectionRatio > 0.05);
      if (visible) startLoop();
      else stopLoop();
    }, { threshold: [0, 0.05, 0.2] });
    io.observe(root);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { visible = false; stopLoop(); }
      else if (root.getBoundingClientRect().bottom > 0) { visible = true; startLoop(); }
    });

    window.addEventListener("resize", () => { resize(); draw(time); });
    if (window.ResizeObserver) {
      new ResizeObserver(() => { resize(); draw(time); }).observe(canvas);
    }

    resize();
    draw(reduce ? 3.6 : 0);
    startLoop();
    document.documentElement.setAttribute("data-editor-ready", "1");

    return {
      seek(t) {
        time = t;
        start = performance.now() - t * 1000;
        autoSelect(t);
        draw(t);
      },
      pause() { playing = false; stopLoop(); draw(time); },
      play() { if (reduce) return; playing = true; startLoop(); },
      get time() { return time; }
    };
  }

  function boot() {
    const root = document.querySelector("[data-editor]");
    if (!root) return;
    const api = init(root);
    window.EditorDemo = api || { ready: false };
    if (api) window.EditorDemo.ready = true;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
