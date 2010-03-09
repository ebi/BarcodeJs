"use strict";
/*
 * BarcodeEan13 JS
 * Author: Tobias 'ebi' Ebnöther <ebi@liip.ch>
 * Copyright (c) 2010, Liip AG. All rights reserved.
 * Code licensed under the BSD License:
 */
BarcodeEan13Test = new TestCase('BarcodeEan13Test');

BarcodeEan13Test.prototype.setUp = function () {
    JsMockito.Integration.JsTestDriver();
    this.context = mock(CanvasContextMock);
    this.canvas = mock(CanvasMock);
    when(this.canvas).getContext('2d').thenReturn(this.context);
};

BarcodeEan13Test.prototype.testBasicDrawing = function () {
    var barcode = new BarcodeEan13(this.canvas, '123123232', {});
    verify(this.canvas).getContext('2d');
};
