<script>
    import AuroraBackground from '$lib/components/core/AuroraBackground.svelte';
    import Navbar from '$lib/components/core/Navbar.svelte';
	import '../app.css';
    import { Toaster } from 'svelte-sonner';

    let { children } = $props();
</script>

<Toaster theme="dark" position="top-center" />
<AuroraBackground />
<Navbar />

<div class="relative z-10 min-h-screen flex flex-col pt-20">
    {@render children()}
</div>
