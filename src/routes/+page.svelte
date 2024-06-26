<script lang="ts">
  import NavigationBar from '$lib/components/page/landing/navigation.svelte';
  import HeroSection from '$lib/components/page/landing/hero.svelte';
  import FeaturesSection from '$lib/components/page/landing/features.svelte';
  import SupportSection from '$lib/components/page/landing/support.svelte';
  import CTASection from '$lib/components/page/landing/cta.svelte';
  import PricingSection from '$lib/components/page/landing/pricing.svelte';
  import FAQSection from '$lib/components/page/landing/faq.svelte';
  import FooterBar from '$lib/components/page/landing/footer.svelte';
</script>

<div>
  <NavigationBar />
  <HeroSection />
  <FeaturesSection />
  <SupportSection />
  <CTASection />
  <PricingSection />
  <FAQSection />
  <FooterBar />
</div>
