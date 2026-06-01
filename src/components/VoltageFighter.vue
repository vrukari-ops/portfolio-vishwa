<template>
  <iframe
    id="game-frame"
    src="/voltage_fighter_v9.html"
    title="Voltage Fighter Game"
  ></iframe>
</template>

<script setup>
// Serves voltage_fighter.html as a static file from /public via a fullscreen iframe.
// This guarantees 100% exact replication — canvas, game loop, audio all run as-is.
</script>

<style scoped>
#game-frame {
  display: block;
  width: 100vw;
  height: 100vh;
  border: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
