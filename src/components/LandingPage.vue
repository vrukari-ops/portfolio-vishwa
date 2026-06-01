<template>
  <iframe
    id="landing-frame"
    src="/vishwa-final.html"
    title="Vishwa Rukari Portfolio"
  ></iframe>
</template>

<script setup>
// Serves vishwa-final.html as a static file from /public via a fullscreen iframe.
// This guarantees 100% exact replication — all scripts, styles, and animations run as-is.
</script>

<style scoped>
#landing-frame {
  display: block;
  width: 100vw;
  height: 100vh;
  border: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
