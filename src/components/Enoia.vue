<template>
  <div class="enoia-wrap">
    <!-- back button floating over the iframe -->
    <button class="enoia-back" @click="goBack">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
      </svg>
      Portfolio
    </button>

    <iframe
      src="https://enoia-4v8x.vercel.app"
      class="enoia-frame"
      title="Enoia Project"
      allow="fullscreen"
    ></iframe>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function goBack() { router.push('/'); }
</script>

<style scoped>
.enoia-wrap {
  position: fixed;
  inset: 0;
  background: #000;
}

.enoia-frame {
  display: block;
  width: 100%;
  height: 100%;
  border: none;
}

.enoia-back {
  position: fixed;
  top: 24px;
  left: 48px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  padding: 10px 20px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}
.enoia-back:hover {
  color: #E85002;
  border-color: rgba(232, 80, 2, 0.5);
  background: rgba(0, 0, 0, 0.75);
}
.enoia-back svg {
  width: 13px;
  height: 13px;
}

@media (max-width: 768px) {
  .enoia-back { left: 20px; top: 16px; padding: 8px 14px; }
}
</style>
