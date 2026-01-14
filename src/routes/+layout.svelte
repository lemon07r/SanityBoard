<script>
    import AuroraBackground from '$lib/components/core/AuroraBackground.svelte';
    import Navbar from '$lib/components/core/Navbar.svelte';
	import '../app.css';
    import { Toaster } from 'svelte-sonner';
</script>

<Toaster theme="dark" position="top-center" />
<AuroraBackground />
<Navbar />

<div class="relative z-10 min-h-screen flex flex-col pt-20"> <!-- Added pt-20 for fixed nav -->
    <slot />
</div>
