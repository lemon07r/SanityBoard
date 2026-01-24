<script lang="ts">
  import { onMount } from 'svelte';
  import { Renderer, Program, Mesh, Triangle } from 'ogl';

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const renderer = new Renderer({ canvas, alpha: false, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    // Match theme background color #09090b (approx 0.035, 0.035, 0.043)
    gl.clearColor(0.035, 0.035, 0.043, 1.0);

    function resize() {
      // Update DPR on resize for multi-monitor setups
      renderer.dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', resize);
    resize();

    const program = new Program(gl, {
      vertex: /* glsl */ `
        attribute vec2 uv;
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 0, 1);
        }
      `,
      fragment: /* glsl */ `
        #ifdef GL_FRAGMENT_PRECISION_HIGH
          precision highp float;
        #else
          precision mediump float;
        #endif
        
        uniform float uTime;
        varying vec2 vUv;
        
        // Fast hash for dithering
        float hash(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * 0.1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
        }
        
        void main() {
          vec2 p = vUv * 2.0 - 1.0;
          float t = uTime * 0.15; // Slow movement
          
          // Background color: #09090b (hsl(240 10% 3.9%))
          vec3 bgColor = vec3(0.035, 0.035, 0.043);
          
          // Aurora colors: Violet/Magma/Toxic
          vec3 color1 = vec3(0.18, 0.05, 0.25); // Deep Indigo
          vec3 color2 = vec3(0.3, 0.1, 0.05);   // Faint Magma
          vec3 color3 = vec3(0.0, 0.2, 0.15);   // Toxic Teal
          
          // Smooth organic variation using layered sine waves
          float wave1 = sin(p.x * 2.0 + t) * sin(p.y * 1.5 - t * 0.7) * 0.5 + 0.5;
          float wave2 = sin((p.x + p.y) * 1.5 + t * 0.5) * 0.5 + 0.5;
          float wave3 = sin(p.x * 0.7 - p.y * 1.2 + t * 0.3) * 0.5 + 0.5;
          
          float mixVal = smoothstep(0.3, 0.7, wave1);
          vec3 auroraColor = mix(color1, color2, mixVal);
          auroraColor = mix(auroraColor, color3, wave2 * 0.4);
          // Add subtle depth variation with third wave
          auroraColor += (wave3 - 0.5) * 0.08;
          
          // Vignette
          float dist = length(p);
          float alpha = smoothstep(1.5, 0.0, dist);
          
          // Blend with background color in shader (high precision)
          // instead of relying on 8-bit alpha blending
          vec3 finalColor = mix(bgColor, auroraColor, alpha * 0.5);
          
          // Triangular distribution dithering
          // Sum of two uniform samples = triangular distribution (smoother noise)
          vec2 ditherCoord = gl_FragCoord.xy + fract(uTime * 100.0);
          float dither = (hash(ditherCoord) + hash(ditherCoord + 1.0) - 1.0) / 255.0;
          
          finalColor += dither;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      uniforms: { uTime: { value: 0 } },
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    let animateId: number;
    let isAnimating = true;

    function update(t: number) {
      if (!isAnimating) return;
      animateId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        isAnimating = false;
        cancelAnimationFrame(animateId);
      } else {
        isAnimating = true;
        animateId = requestAnimationFrame(update);
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animateId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  });
</script>

<canvas bind:this={canvas} class="fixed inset-0 -z-10 pointer-events-none w-full h-full opacity-100"></canvas>
