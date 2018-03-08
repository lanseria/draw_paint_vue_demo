/**
 * Created by louizhai on 17/6/30.
 * description: Use canvas to draw.
 */
function Draw(canvas, degree, config = {}) {
  if (!(this instanceof Draw)) {
    return new Draw(canvas, config);
  }
  if (!canvas) {
    return;
  }
  let {
    width,
    height
  } = window.getComputedStyle(canvas, null);
  width = width.replace('px', '');
  height = height.replace('px', '');

  let bihua = '';
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.width = width;
  this.height = height;
  const context = this.context;

  // 根据设备像素比优化canvas绘图
  const devicePixelRatio = window.devicePixelRatio;
  if (devicePixelRatio) {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.height = height * devicePixelRatio;
    canvas.width = width * devicePixelRatio;
    context.scale(devicePixelRatio, devicePixelRatio);
  } else {
    canvas.width = width;
    canvas.height = height;
  }

  context.lineWidth = 6;
  context.strokeStyle = 'black';
  context.lineCap = 'round';
  context.lineJoin = 'round';
  Object.assign(context, config);
  function clearhuabi () {
    bihua = '';
  }
  this.clearhuabi = clearhuabi
  function getX(obj) {
    let parObj = obj;
    let left = obj.offsetLeft;
    while (parObj = parObj.offsetParent) {
      left += parObj.offsetLeft;
    }
    return left;
  }

  function getY(obj) {
    let parObj = obj;
    let top = obj.offsetTop;
    while (parObj = parObj.offsetParent) {
      top += parObj.offsetTop;
    }
    return top;
  }
  const isMobile = /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent);
  // 移动端性能太弱, 去掉模糊以提高手写渲染速度
  if (!isMobile) {
    context.shadowBlur = 1;
    context.shadowColor = 'black';
  }
  let request;
  let lastX;
  let lastY;
  let drawing = false;
  const imagedataa = [];
  const bihuaa = [];
  const lga = [];
  const lg = 'zh-cn';
  
  function onTouchStart(event) {
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    imagedataa.push(imgData);
    bihuaa.push(bihua);
    lga.push(lg);
    event.preventDefault();
    lastX = event.touches[0].clientX;
    lastY = event.touches[0].clientY;
    let top, left, oDiv;
    oDiv = document.querySelector('canvas');
    top = getY(oDiv);
    left = getX(oDiv);
    lastX = lastX - left + document.body.scrollLeft;
    lastY = lastY - top + document.body.scrollTop;
    drawRound(lastX, lastY);
  }
  // 触摸结束
  function onTouchEnd() {
    bihua += 's';
    senddata();
  }

  // 触摸滑动事件
  function onTouchMove(event) {
    try {
      let top, left, oDiv;
      oDiv = document.querySelector('canvas');
      top = getY(oDiv);
      left = getX(oDiv);
      event.preventDefault();
      drawLine(lastX, lastY, event.touches[0].clientX - left + document.body.scrollLeft,
        event.touches[0].clientY -
        top + document.body.scrollTop);
      lastX = event.touches[0].clientX;
      lastY = event.touches[0].clientY;

      lastX = lastX - left + document.body.scrollLeft;
      lastY = lastY - top + document.body.scrollTop;
    } catch (err) {
      console.log(err.description);
    }
  }
  // 画圆
  function drawRound(x, y) {
    context.fillStyle = '#000000';
    context.beginPath();
    context.arc(x, y, 3, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    bihua = bihua + Math.round(x) + 'a' + Math.round(y) + 'a';
  }
  // 画线
  function drawLine(startX, startY, endX, endY) {
    context.beginPath();
    context.lineCap = 'round';
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
    bihua = bihua + Math.round(endX) + 'a' + Math.round(endY) + 'a';
  }

  function onMouseDown(event) {
    let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    imagedataa.push(imgData);
    bihuaa.push(bihua);
    lga.push(lg);
    // ev = event || window.event; 
    // let mousePos = mousePosition(event);
    drawing = true;
    lastX = event.clientX;
    lastY = event.clientY;
    let top, left, oDiv;
    oDiv = document.querySelector('canvas');
    top = getY(oDiv);
    left = getX(oDiv);
    lastX = lastX - left + document.body.scrollLeft;
    lastY = lastY - top + document.body.scrollTop;
    drawRound(lastX, lastY);
  }

  function onMouseMove(event) {
    // ev = event || window.event; 
    // let mousePos = mousePosition(event); 
    if (drawing) {
      // lastX=event.clientX;
      // lastY=event.clientY;
      // drawRound(lastX,lastY);
      try {
        // event.preventDefault();
        let top, left, oDiv;
        oDiv = document.querySelector('canvas');
        top = getY(oDiv);
        left = getX(oDiv);
        drawLine(lastX, lastY, event.clientX - left + document.body.scrollLeft,
          event.clientY - top + document.body.scrollTop);
        lastX = event.clientX;
        lastY = event.clientY;
        lastX = lastX - left + document.body.scrollLeft;
        lastY = lastY - top + document.body.scrollTop;
      } catch (err) {
        console.log(err.description);
      }
    }
  }

  function onMouseUp() {
    // ev = event || window.event; 
    // let mousePos = mousePosition(event);
    drawing = false;
    bihua += 's';
    senddata();
  }

  function senddata() {
    if (request != null) {
      request.abort();
    }
    /* eslint-disable no-undef */
    request = $.post('/api/one', 
      {
        bh: lg + bihua
      }, (data) => {
        console.log(data);
      });
  }
  if (isMobile) {
    canvas.addEventListener('touchstart', onTouchStart, false);
    canvas.addEventListener('touchmove', onTouchMove, false);
    canvas.addEventListener('touchend', onTouchEnd, false);
  } else {
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
  }

  // 重置画布坐标系
  if (typeof degree === 'number') {
    this.degree = degree;
    context.rotate((degree * Math.PI) / 180);
    switch (degree) {
      case -90:
        context.translate(-height, 0);
        break;
      case 90:
        context.translate(0, -width);
        break;
      case -180:
      case 180:
        context.translate(-width, -height);
        break;
      default:
    }
  }
}
Draw.prototype = {
  clear() {
    let width;
    let height;
    switch (this.degree) {
      case -90:
      case 90:
        width = this.height;
        height = this.width;
        break;
      default:
        width = this.width;
        height = this.height;
    }
    this.context.clearRect(0, 0, width, height);
    this.clearhuabi()
  }
};
export default Draw;
