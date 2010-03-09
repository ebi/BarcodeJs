var CanvasMock = function () {
    this.getContext = function (contextId) {};
    this.toDataURL = function () {};
};

var CanvasContextMock = function () {
    this.restore = function () {};
    this.save = function () {};

    this.rotate = function (angle) {};
    this.scale = function (x, y) {};
    this.setTransform = function (m11, m12, m21, m22, dx, dy) {};
    this.transform = function (m11, m12, m21, m22, dx, dy) {};
    this.translate = function () {};

    this.createLinerGradient = function (x0, y0, x1, y1) {};
    this.createRadialGradient = function (x0, y0, x1, y1, r1) {};
    this.createPattern = function (image, repetition) {};

    this.clearRect = function (x, y, w, h) {};
    this.fillRect = function (x, y, w, h) {};
    this.strokeRect = function (x, y, w, h) {};

    this.arc = function (x, y, radius, startAngle, endAngle, clockwise) {};
    this.arcTo = function (x1, y1, x2, y2, radius) {};
    this.beginPath = function () {};
    this.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {};
    this.clip = function () {};
    this.closePath = function () {};
    this.fill = function () {};
    this.lineTo = function (x, y) {};
    this.moveTo = function (x, y) {};
    this.quadraticCurveTo = function (cpx, cpy, x, y) {};
    this.rect = function (x, y) {};
    this.stroke = function () {};
    this.isPointInPath = function (x, y) {};

    this.fillText = function (text, x, y, maxWidth) {};
    this.measureText = function (text) {};
    this.strokeText = function (text, x, y, maxWidth) {};

    this.drawImage = function (image, dx, dy, dw, dh) {};

    this.createImageData = function (sw, sh) {};
    this.getImageData = function (sx, sy, sw, sh) {};
    this.putImageData = function (imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {};
};
