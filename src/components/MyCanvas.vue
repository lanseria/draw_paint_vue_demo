<template>
  <div id="canvasBox" :style="getHorizontalStyle">
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
    this.canvasBox = document.getElementById('canvasBox');
    this.initCanvas();
  },
  computed: {
    getHorizontalStyle() {
      const d = document;
      const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
      const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;
      let length = (h - w) / 2;
      let width = w;
      let height = h;

      switch (this.degree) {
        case -90:
          length = -length;
        case 90:
          width = h;
          height = w;
          break;
        default:
          length = 0;
      }
      if (this.canvasBox) {
        this.canvasBox.removeChild(document.querySelector('canvas'));
        this.canvasBox.appendChild(document.createElement('canvas'));
        this.$nextTick(() => {
          this.initCanvas();
        }, 200);
      }
      return {
        transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
        width: `${width}px`,
        height: `${height}px`,
        transformOrigin: 'center center'
      };
    }
  },
  methods: {
    initCanvas() {
      const canvas = document.querySelector('canvas');
      this.draw = new Draw(canvas, -this.degree);
    },
    clear() {
      this.draw.clear();
    }
  }
};

</script>

<style>
#canvasBox {
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
