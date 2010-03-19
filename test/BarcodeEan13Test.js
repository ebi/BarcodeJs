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

BarcodeEan13Test.prototype.testStandardSettings = function () {
    var barcode = new BarcodeEan13(this.canvas, '123123232');
    assertEquals('20px monospace', this.context.font);
    assertEquals(100, this.canvas.height);
    assertEquals(230, this.canvas.width);
    verify(this.canvas).getContext('2d');
};

BarcodeEan13Test.prototype.testCustomSettings = function () {
    var barcode, options;
    options = {
        fontSize: '10',
        font: 'Verdana',
        line: 3
    };
    barcode = new BarcodeEan13(this.canvas, '123123232', options);
    assertEquals('10px Verdana', this.context.font);
    assertEquals(150, this.canvas.height);
    assertEquals(305, this.canvas.width);
    
    options = {
        width: 333,
        height: 444
    };
    barcode = new BarcodeEan13(this.canvas, '123123232', options);
    assertEquals(333, this.canvas.width);
    assertEquals(444, this.canvas.height);
};

BarcodeEan13Test.prototype.testValidation = function () {
    var barcode = new BarcodeEan13(this.canvas, '123123232');
    assertFalse(barcode.validate(1));
    assertFalse(barcode.validate(false));
    assertFalse(barcode.validate('0'));
    assertFalse(barcode.validate(12345678901));
    assertFalse(barcode.validate(123456789012));
    assertFalse(barcode.validate(1234567890123));
}