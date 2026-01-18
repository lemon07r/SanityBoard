<script lang="ts">
  import { onMount } from 'svelte';
  import { Renderer, Program, Mesh, Triangle } from 'ogl';

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const renderer = new Renderer({ canvas, alpha: true, dpr: 1 });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    function resize() {
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
        precision highp float;
        uniform float uTime;
        varying vec2 vUv;
        
        float noise(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          vec2 p = vUv * 2.0 - 1.0;
          float t = uTime * 0.15; // Slow movement
          
          // Aurora colors: Violet/Magma/Toxic
          vec3 color1 = vec3(0.18, 0.05, 0.25); // Deep Indigo
          vec3 color2 = vec3(0.3, 0.1, 0.05);   // Faint Magma
          vec3 color3 = vec3(0.0, 0.2, 0.15);   // Toxic Teal
          
          float n1 = noise(p + t);
          float n2 = noise(p * 2.0 - t * 0.5);
          
          float mixVal = smoothstep(0.3, 0.7, sin(p.x * 1.5 + t) * 0.5 + 0.5);
          vec3 finalColor = mix(color1, color2, mixVal);
          finalColor = mix(finalColor, color3, n2 * 0.4);
          
          // Vignette
          float dist = length(p);
          float alpha = smoothstep(1.5, 0.0, dist);
          
          gl_FragColor = vec4(finalColor, alpha * 0.5);
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
