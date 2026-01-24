<script>
    import AuroraBackground from '$lib/components/core/AuroraBackground.svelte';
    import Navbar from '$lib/components/core/Navbar.svelte';
    import Footer from '$lib/components/core/Footer.svelte';
	import '../app.css';
    import { Toaster } from 'svelte-sonner';
    import { seoConfig } from '$lib/seo/config';

    let { children } = $props();

    // Base WebSite schema for the entire site
    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: seoConfig.siteName,
        url: seoConfig.siteUrl,
        description: seoConfig.defaultDescription,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${seoConfig.siteUrl}/?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
        }
    };
</script>

<svelte:head>
    {@html `<${'script'} type="application/ld+json">${JSON.stringify(websiteSchema)}</${'script'}>`}
</svelte:head>

<Toaster theme="dark" position="top-center" />
<AuroraBackground />
<Navbar />

<div class="relative z-10 min-h-screen flex flex-col pt-20">
    <div class="flex-1">
        {@render children()}
    </div>
    <Footer />
</div>
