<template>
  <div class="hk" @wheel.prevent="onWheel" ref="root">

    <!-- nav -->
    <div class="hk-nav">
      <button class="hk-back" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
        </svg>
        Portfolio
      </button>
      <span class="hk-count">{{ pad(current + 1) }} / {{ pad(slides.length) }}</span>
    </div>

    <!-- slides — stacked full-screen, each with framed image inside -->
    <div
      v-for="(s, i) in slides"
      :key="i"
      class="hk-slide"
      :style="slideStyle(i)"
    >
      <!-- black frame — consistent padding on all sides -->
      <div class="hk-frame">
        <img :src="s" :alt="'Frame ' + (i + 1)" draggable="false" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const root   = ref(null);

const slides = [
  '/hundekari/frame-02.jpg',
  '/hundekari/frame-03.jpg',
  '/hundekari/frame-04.jpg',
  '/hundekari/frame-05.jpg',
  '/hundekari/frame-06.jpg',
  '/hundekari/frame-07.jpg',
  '/hundekari/frame-08.jpg',
  '/hundekari/frame-09.jpg',
  '/hundekari/frame-10.jpg',
  '/hundekari/frame-11.jpg',
  '/hundekari/frame-12.jpg',
  '/hundekari/frame-13.jpg',
  '/hundekari/frame-14.jpg',
  '/hundekari/frame-15.jpg',
  '/hundekari/frame-16.jpg',
];

const current  = ref(0);
const busy     = ref(false);
const DURATION = 680;

function pad(n) { return String(n).padStart(2, '0'); }

// Slides 0..current  → translateY(0)    visible
// Slides current+1.. → translateY(-100%)  parked above screen
// z-index = i+1 so later slides sit on top
function slideStyle(i) {
  return {
    transform:  i > current.value ? 'translateY(-100%)' : 'translateY(0%)',
    zIndex:     i + 1,
    transition: `transform ${DURATION}ms cubic-bezier(0.77, 0, 0.175, 1)`,
  };
}

function next() {
  if (busy.value || current.value >= slides.length - 1) return;
  busy.value = true;
  current.value++;
  setTimeout(() => { busy.value = false; }, DURATION);
}

function prev() {
  if (busy.value || current.value <= 0) return;
  busy.value = true;
  current.value--;
  setTimeout(() => { busy.value = false; }, DURATION);
}

// ── wheel ──────────────────────────────────────────────
let wheelAcc = 0;
function onWheel(e) {
  wheelAcc += e.deltaY;
  if (Math.abs(wheelAcc) >= 40) {
    wheelAcc > 0 ? next() : prev();
    wheelAcc = 0;
  }
}

// ── touch ──────────────────────────────────────────────
let touchY = 0;
function onTouchStart(e) { touchY = e.touches[0].clientY; }
function onTouchEnd(e) {
  const dy = touchY - e.changedTouches[0].clientY;
  if (Math.abs(dy) > 44) dy > 0 ? next() : prev();
}

// ── keyboard ───────────────────────────────────────────
function onKey(e) {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); next(); }
  if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
  if (e.key === 'Escape') goBack();
}

function goBack() { router.push('/'); }

onMounted(() => {
  window.addEventListener('keydown',    onKey,         { passive: false });
  window.addEventListener('touchstart', onTouchStart,  { passive: true });
  window.addEventListener('touchend',   onTouchEnd,    { passive: true });
});
onUnmounted(() => {
  window.removeEventListener('keydown',    onKey);
  window.removeEventListener('touchstart', onTouchStart);
  window.removeEventListener('touchend',   onTouchEnd);
});
</script>

<style scoped>
/* ── root: full-screen, no scroll ── */
.hk {
  position: fixed;
  inset: 0;
  background: #000;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
}

/* ── slide: fills the full screen ── */
.hk-slide {
  position: absolute;
  inset: 0;
  background: #000;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── frame: the consistent black border ──
   top:  72px — leaves room for nav + breathing space
   sides: 60px — equal margin on left and right
   bottom: 60px — equal to sides for visual balance
   The image sits centered inside this frame and is never cropped.
   object-fit: contain scales the image to fit fully, preserving aspect ratio.
   Black fill appears wherever the image doesn't reach.
──────────────────────────────────────────────────── */
.hk-frame {
  position: absolute;
  top:    72px;
  left:   60px;
  right:  60px;
  bottom: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hk-frame img {
  display: block;
  max-width:  100%;
  max-height: 100%;
  width:  auto;
  height: auto;
  /* object-fit not needed — width/height auto + max constraints handle it */
}

/* ── nav ── */
.hk-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 48px;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%);
}
.hk-back {
  pointer-events: all;
  display: flex; align-items: center; gap: 8px;
  background: none; border: none; cursor: pointer;
  color: rgba(255,255,255,0.5);
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
  transition: color 0.2s; padding: 0;
}
.hk-back:hover { color: #EF4136; }
.hk-back svg { width: 14px; height: 14px; }
.hk-count {
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 2px;
  color: rgba(255,255,255,0.35);
}

/* ── mobile: tighter frame ── */
@media (max-width: 768px) {
  .hk-frame {
    top:    60px;
    left:   20px;
    right:  20px;
    bottom: 20px;
  }
  .hk-nav { padding: 18px 24px; }
}
</style>
