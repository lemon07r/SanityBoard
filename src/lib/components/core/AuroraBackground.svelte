<script lang="ts">
  import { onMount } from 'svelte';
  import { Renderer, Program, Mesh, Triangle } from 'ogl';
  import { theme } from '$lib/stores/theme.svelte';

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
        uniform float uTheme; // 0.0 = Dark, 1.0 = Light
        varying vec2 vUv;
        
        // Fast hash for dithering
        float hash(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * 0.1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
        }
        
        void main() {
          vec2 p = vUv * 2.0 - 1.0;
          
          // --- Dynamic Parameters based on Theme ---
          // Light mode moves faster (0.4) vs Dark mode (0.15)
          float speed = mix(0.15, 0.4, uTheme);
          float t = uTime * speed;
          
          // --- Turbulence for Ink Effect (Light Mode) ---
          // Warp coordinates more aggressively in light mode for "swirl"
          float warp = sin(p.y * 5.0 + t) * mix(0.0, 0.2, uTheme);
          p.x += warp;
          
          // --- Dark Mode Colors (Aurora) ---
          vec3 bgDark = vec3(0.035, 0.035, 0.043);
          vec3 color1Dark = vec3(0.18, 0.05, 0.25); // Deep Indigo
          vec3 color2Dark = vec3(0.3, 0.1, 0.05);   // Faint Magma
          vec3 color3Dark = vec3(0.0, 0.2, 0.15);   // Toxic Teal

          // --- Light Mode Colors (Ink/Smoke) ---
          vec3 bgLight = vec3(1.0, 1.0, 1.0);       // Paper White
          vec3 color1Light = vec3(0.70, 0.72, 0.78); // Deep Grey Mist
          vec3 color2Light = vec3(0.50, 0.52, 0.58); // Visible Graphite
          vec3 color3Light = vec3(0.30, 0.32, 0.40); // Dark Ink

          // Interpolate base palette based on theme
          vec3 bgColor = mix(bgDark, bgLight, uTheme);
          vec3 color1 = mix(color1Dark, color1Light, uTheme);
          vec3 color2 = mix(color2Dark, color2Light, uTheme);
          vec3 color3 = mix(color3Dark, color3Light, uTheme);
          
          // Smooth organic variation using layered sine waves
          float wave1 = sin(p.x * 2.0 + t) * sin(p.y * 1.5 - t * 0.7) * 0.5 + 0.5;
          float wave2 = sin((p.x + p.y) * 1.5 + t * 0.5) * 0.5 + 0.5;
          float wave3 = sin(p.x * 0.7 - p.y * 1.2 + t * 0.3) * 0.5 + 0.5;
          
          // Sharpen edges in light mode for "Ink" look
          // Dark Mode: Soft (0.3 - 0.7) | Light Mode: Sharp (0.45 - 0.55)
          float edgeLower = mix(0.3, 0.45, uTheme);
          float edgeUpper = mix(0.7, 0.55, uTheme);
          
          float mixVal = smoothstep(edgeLower, edgeUpper, wave1);
          
          vec3 auroraColor = mix(color1, color2, mixVal);
          auroraColor = mix(auroraColor, color3, wave2 * 0.4);
          
          // Add subtle depth variation
          auroraColor += (wave3 - 0.5) * 0.08;
          
          // Vignette
          float dist = length(p);
          float alpha = smoothstep(1.5, 0.0, dist);
          
          // Blend with background color
          vec3 finalColor = mix(bgColor, auroraColor, alpha * 0.5);
          
          // Triangular distribution dithering
          vec2 ditherCoord = gl_FragCoord.xy + fract(uTime * 100.0);
          float dither = (hash(ditherCoord) + hash(ditherCoord + 1.0) - 1.0) / 255.0;
          
          finalColor += dither;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      uniforms: { 
        uTime: { value: 0 },
        uTheme: { value: theme.current === 'dark' ? 0.0 : 1.0 }
      },
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    let animateId: number;
    let isAnimating = true;

    function update(t: number) {
      if (!isAnimating) return;
      animateId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      
      // Smoothly interpolate theme uniform
      const targetTheme = theme.current === 'dark' ? 0.0 : 1.0;
      program.uniforms.uTheme.value += (targetTheme - program.uniforms.uTheme.value) * 0.05;

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

<canvas 
    bind:this={canvas} 
    class="fixed inset-0 -z-10 pointer-events-none w-full h-full opacity-100"
></canvas>
