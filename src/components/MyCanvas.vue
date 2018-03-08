<template>
  <div class="canvasBox">
    <div class="greet">
      <a @touchstart="clear" @mousedown="clear">清屏</a>
    </div>
    <canvas></canvas>
  </div>
</template>

<script>
import Draw from '../utils/draw';

export default {
  name: 'MyCanvas',
  components: {
    Draw
  },
  mounted() {
    this.initCanvas();
  },
  computed: {
  },
  methods: {
    initCanvas() {
      const canvas = document.querySelector('canvas');
      this.draw = new Draw(canvas);
    },
    clear() {
      this.draw.clear();
    }
  }
};

</script>

<style>
.canvasBox {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.greet {
  font-size: 15px;
  user-select: none;
  background: #999;
}
.greet a {
  cursor: pointer;
  color: antiquewhite;
}
canvas {
  flex: 1;
  cursor: crosshair;
  border: 2px #aaa solid;
  box-sizing: border-box;
}
</style>
