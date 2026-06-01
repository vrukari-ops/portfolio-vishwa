<template>
  <router-view />

  <!-- Fullscreen Game Overlay — shown when play-btn is clicked in the landing iframe -->
  <Transition name="game-overlay">
    <div v-if="gameOpen" id="game-overlay">
      <iframe
        id="game-frame"
        src="/voltage_fighter.html"
        title="Voltage Fighter Game"
        allowfullscreen
      ></iframe>

      <!-- Exit Button -->
      <button id="exit-game-btn" @click="closeGame" title="Exit Game">
        <span class="exit-icon">✕</span>
        <span class="exit-label">EXIT</span>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const gameOpen = ref(false);

function openGame() {
  gameOpen.value = true;
}

function closeGame() {
  gameOpen.value = false;
}

function handleMessage(event) {
  if (event.data === 'launch-game') {
    openGame();
  }
}

onMounted(() => {
  window.addEventListener('message', handleMessage);
});

onUnmounted(() => {
  window.removeEventListener('message', handleMessage);
});
</script>

<style>
/* ── Global Reset ── */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #080808;
}

/* ── Game Overlay ── */
#game-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #000;
}

#game-frame {
  display: block;
  width: 100%;
  height: 100%;
  border: none;
}

/* ── Exit Button ── */
#exit-game-btn {
  position: fixed;
  top: 20px;
  right: 24px;
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: rgba(8, 8, 8, 0.85);
  border: 1px solid rgba(232, 80, 2, 0.6);
  border-radius: 4px;
  color: #F9F9F9;
  font-family: 'Bebas Neue', 'Syne', sans-serif;
  font-size: 15px;
  letter-spacing: 4px;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
}

#exit-game-btn:hover {
  background: rgba(232, 80, 2, 0.9);
  border-color: #E85002;
  transform: translateY(-1px);
}

#exit-game-btn:active {
  transform: translateY(0);
}

.exit-icon {
  font-size: 13px;
  line-height: 1;
}

.exit-label {
  font-size: 13px;
  letter-spacing: 3px;
}

/* ── Overlay Transition ── */
.game-overlay-enter-active,
.game-overlay-leave-active {
  transition: opacity 0.35s ease;
}

.game-overlay-enter-from,
.game-overlay-leave-to {
  opacity: 0;
}
</style>
