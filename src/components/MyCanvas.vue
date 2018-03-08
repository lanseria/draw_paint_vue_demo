<template>
  <div class="canvasBox">
    <div class="greet" @click="clear">
      清屏
    </div>
    <canvas ref="canvas" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp"></canvas>
    <div class="selectword">
      <div class="word" v-for="(w,i) in words" :key="i" v-text="w"></div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
import axios from 'axios';
import { debounce } from '../utils/debounce';

export default {
  name: 'MyCanvas',
  data () {
    return {
      width: '',
      height: '',
      bihua: '',
      context: undefined,
      lastX: '',
      lastY: '',
      drawing: false,
      imagedataa: [],
      bihuaa: [],
      lga: [],
      lg: 'zh-cn',
      words: []
    }
  },
  mounted () {
    this.initCanvas()
  },
  created () {
    this.$watch('bihua', debounce((bh) => {
      this._senddata(bh);
    }, 500))
  },
  computed: {
  },
  methods: {
    initCanvas () {
      const canvas = this.$refs.canvas
      const context = this.context = canvas.getContext('2d');
      let { width, height } = window.getComputedStyle(canvas, null);
      this.width = +width.replace('px', '');
      this.height = +height.replace('px', '') - 25;
      // 根据设备像素比优化canvas绘图
      const devicePixelRatio = window.devicePixelRatio;
      if (devicePixelRatio) {
        canvas.style.width = `${this.width}px`;
        canvas.style.height = `${this.height}px`;
        canvas.height = this.height * devicePixelRatio;
        canvas.width = this.width * devicePixelRatio;
        context.scale(devicePixelRatio, devicePixelRatio);
      } else {
        canvas.width = this.width;
        canvas.height = this.height;
      }
      // 调整画笔
      context.lineWidth = 6;
      context.strokeStyle = 'black';
      context.lineCap = 'round';
      context.lineJoin = 'round';
      // 移动端性能太弱, 去掉模糊以提高手写渲染速度
      const isMobile = /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent);
      if (!isMobile) {
        context.shadowBlur = 1;
        context.shadowColor = 'black';
      }
    },
    clear () {
      this.context.clearRect(0, 0, this.width, this.height);
      this.bihua = '';
      this.imagedataa = [];
      this.lga = [];
      this.bihuaa = [];
    },
    // 触摸结束
    onTouchEnd () {
      this.bihua += 's';
    },
    onTouchMove (event) {
      try {
        let top, left;
        const canvas = this.$refs.canvas;
        top = this._getY(canvas);
        left = this._getX(canvas);
        event.preventDefault();
        this._drawLine(this.lastX, this.lastY, event.touches[0].clientX - left + document.body.scrollLeft,
          event.touches[0].clientY -
          top + document.body.scrollTop);
        this.lastX = event.touches[0].clientX;
        this.lastY = event.touches[0].clientY;

        this.lastX = this.lastX - left + document.body.scrollLeft;
        this.lastY = this.lastY - top + document.body.scrollTop;
      } catch (err) {
        console.log(err.description);
      }
    },
    // 触摸开始
    onTouchStart (event) {
      const canvas = this.$refs.canvas;
      const context = this.context;
      console.log(canvas.width, canvas.height);
      const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
      this.imagedataa.push(imgData);
      this.bihuaa.push(this.bihua);
      this.lga.push(this.lg);
      event.preventDefault();
      this.lastX = event.touches[0].clientX;
      this.lastY = event.touches[0].clientY;
      let top, left;
      top = this._getY(canvas);
      left = this._getX(canvas);
      this.lastX = this.lastX - left + document.body.scrollLeft;
      this.lastY = this.lastY - top + document.body.scrollTop;
      this._drawRound(this.lastX, this.lastY);
    },
    onMouseDown (event) {
      const canvas = this.$refs.canvas;
      const context = this.context;
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
      this.imagedataa.push(imgData);
      this.bihuaa.push(this.bihua);
      this.lga.push(this.lg);
      this.drawing = true;
      this.lastX = event.clientX;
      this.lastY = event.clientY;
      let top, left;
      top = this._getY(canvas);
      left = this._getX(canvas);
      this.lastX = this.lastX - left + document.body.scrollLeft;
      this.lastY = this.lastY - top + document.body.scrollTop;
      this._drawRound(this.lastX, this.lastY);
    },
    onMouseMove (event) {
      const canvas = this.$refs.canvas
      if (this.drawing) {
        try {
          let top, left;
          top = this._getY(canvas);
          left = this._getX(canvas);
          this._drawLine(this.lastX, this.lastY, event.clientX - left + document.body.scrollLeft, event.clientY - top + document.body.scrollTop);
          this.lastX = event.clientX;
          this.lastY = event.clientY;
          this.lastX = this.lastX - left + document.body.scrollLeft;
          this.lastY = this.lastY - top + document.body.scrollTop;
        } catch (err) {
          console.log(err.description);
        }
      }
    },
    onMouseUp () {
      this.drawing = false;
      this.bihua += 's';
    },
    _senddata (bh) {
      axios.post('/api/one', qs.stringify({bh: this.lg + bh})).then(res => {
        console.log(res)
        this.words = res.data.split(' ')
      }).catch(e => {
        console.log(e)
      })
    },
    _drawLine (startX, startY, endX, endY) {
      const context = this.context
      context.beginPath();
      context.lineCap = 'round';
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.stroke();
      this.bihua += `${Math.round(endX)}a${Math.round(endY)}a`;
    },
    _drawRound (x, y) {
      const context = this.context
      context.fillStyle = '#000000';
      context.beginPath();
      context.arc(x, y, 3, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
      this.bihua += `${Math.round(x)}a${Math.round(y)}a`;
    },
    _getX (obj) {
      let parObj = obj;
      let left = obj.offsetLeft;
      while (parObj === parObj.offsetParent) {
        left += parObj.offsetLeft;
      }
      return left;
    },
    _getY (obj) {
      let parObj = obj;
      let top = obj.offsetTop;
      while (parObj === parObj.offsetParent) {
        top += parObj.offsetTop;
      }
      return top;
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
  flex: 0 0 25px;
  line-height: 25px;
  font-size: 15px;
  user-select: none;
  background: #999;
  cursor: pointer;
  color: antiquewhite;
}
canvas {
  flex: 1;
  cursor: crosshair;
  border: 2px #aaa solid;
  box-sizing: border-box;
}
.selectword {
  display: flex;
  flex: 0 0 25px;
}
.word {
  flex: 1;
  border-right: 1px #aaa solid;
}
.word:last-child {
  border-right: 0;
}
</style>
