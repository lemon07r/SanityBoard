<script lang="ts">
	import { page } from '$app/state';
	import {
		seoConfig,
		formatTitle,
		getCanonicalUrl,
		getImageUrl,
		type SeoProps
	} from '$lib/seo/config';

	let {
		title,
		description = seoConfig.defaultDescription,
		canonical,
		noindex = false,
		nofollow = false,
		openGraph,
		twitter,
		jsonLd
	}: SeoProps = $props();

	// Computed values
	let computedTitle = $derived(formatTitle(title));
	let computedCanonical = $derived(canonical ?? getCanonicalUrl(page.url.pathname));
	let computedDescription = $derived(description ?? seoConfig.defaultDescription);

	// Open Graph computed values
	let ogTitle = $derived(openGraph?.title ?? title ?? seoConfig.defaultTitle);
	let ogDescription = $derived(openGraph?.description ?? computedDescription);
	let ogImage = $derived(getImageUrl(openGraph?.image ?? seoConfig.defaultImage));
	let ogImageAlt = $derived(openGraph?.imageAlt ?? ogTitle);
	let ogType = $derived(openGraph?.type ?? 'website');

	// Twitter computed values
	let twitterCard = $derived(twitter?.card ?? 'summary_large_image');
	let twitterTitle = $derived(twitter?.title ?? ogTitle);
	let twitterDescription = $derived(twitter?.description ?? ogDescription);
	let twitterImage = $derived(twitter?.image ? getImageUrl(twitter.image) : ogImage);
	let twitterImageAlt = $derived(twitter?.imageAlt ?? ogImageAlt);

	// Robots directive
	let robotsContent = $derived(
		[noindex ? 'noindex' : 'index', nofollow ? 'nofollow' : 'follow'].join(', ')
	);
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{computedTitle}</title>
	<meta name="title" content={computedTitle} />
	<meta name="description" content={computedDescription} />
	<meta name="robots" content={robotsContent} />
	<link rel="canonical" href={computedCanonical} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={ogType} />
	<meta property="og:url" content={computedCanonical} />
	<meta property="og:title" content={ogTitle} />
	<meta property="og:description" content={ogDescription} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:alt" content={ogImageAlt} />
	<meta property="og:site_name" content={seoConfig.siteName} />
	<meta property="og:locale" content={seoConfig.locale} />

	{#if openGraph?.article}
		{#if openGraph.article.publishedTime}
			<meta property="article:published_time" content={openGraph.article.publishedTime} />
		{/if}
		{#if openGraph.article.modifiedTime}
			<meta property="article:modified_time" content={openGraph.article.modifiedTime} />
		{/if}
		{#if openGraph.article.authors}
			{#each openGraph.article.authors as author}
				<meta property="article:author" content={author} />
			{/each}
		{/if}
		{#if openGraph.article.tags}
			{#each openGraph.article.tags as tag}
				<meta property="article:tag" content={tag} />
			{/each}
		{/if}
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content={twitterCard} />
	<meta name="twitter:url" content={computedCanonical} />
	<meta name="twitter:title" content={twitterTitle} />
	<meta name="twitter:description" content={twitterDescription} />
	<meta name="twitter:image" content={twitterImage} />
	<meta name="twitter:image:alt" content={twitterImageAlt} />
	{#if seoConfig.twitterHandle}
		<meta name="twitter:site" content={seoConfig.twitterHandle} />
		<meta name="twitter:creator" content={seoConfig.twitterHandle} />
	{/if}

	<!-- JSON-LD Structured Data -->
	{#if jsonLd}
		{@html `<${'script'} type="application/ld+json">${JSON.stringify(jsonLd)}</${'script'}>`}
	{/if}
</svelte:head>
