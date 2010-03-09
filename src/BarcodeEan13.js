"use strict";
/*
 * BarcodeEan13
 * Author: Tobias 'ebi' Ebnöther <ebi@liip.ch>
 * Copyright (c) 2010, Liip AG. All rights reserved.
 * Code licensed under the Apache License Version 2.0:
 *     http://www.apache.org/licenses/LICENSE-2.0
 */
function BarcodeEan13(canvas, code, userOptions) {
    var ctx, options = {}, encoding, orientation, colors, barcode, //Properties
    getColor, generate, drawSeparation; //Functions
    
    userOptions = userOptions || {} ;
    options.line = userOptions.line || 2;
    options.fontSize = userOptions.fontSize || 10 * options.line;
    options.font = userOptions.font || 'monospace';
    options.height = userOptions.height || options.line * 50;
    // 12 digits a 7 lines + 11 for the separators + start & ending
    options.width = userOptions.width || 95 * options.line + 2 * options.fontSize;
    
    canvas.height = options.height;
    canvas.width = options.width;
    
    colors = userOptions.colors || [
        'white',
        'black'
    ];
    
    ctx = canvas.getContext('2d');
    ctx.font = options.fontSize + 'px ' + options.font;
    ctx.textBaseline = 'bottom';
    
    
    encoding = userOptions.encoding || [
        ['3211', '1123'],
        ['2221', '1222'],
        ['2122', '2212'],
        ['1411', '1141'],
        ['1132', '2311'],
        ['1231', '1321'],
        ['1114', '4111'],
        ['1312', '2131'],
        ['1213', '3121'],
        ['3112', '2113']
    ];
    
    orientation = userOptions.orientation || [
        '000000000000',
        '001011000000',
        '001101000000',
        '001110000000',
        '010011000000',
        '011001000000',
        '011100000000',
        '010101000000',
        '010110000000',
        '011010000000'
    ];
    
    /*
     * The first 6 start with a white line the following 6 numbers
     * start with a black line
     */
    getColor = function (codePosition, linePosition) {
        var color = 0;
        if (codePosition > 6) {
            color += 1;
        }
        color = (color + linePosition) % 2;
        return colors[color];
    };
    
    /*
     * One separator in the beginning and in the end black, white, black
     * one separator in the middle white, black, white, black, white
     */ 
    drawSeparation = function (position) {
        var i;
        
        if (1 === position) {
            // It's 3 lines black, white, black
            for (i = 1; i < 4 ;i += 1) {
                ctx.fillStyle = colors[(i % 2)];
                ctx.fillRect(0, 0, options.line, options.height);
                ctx.translate(options.line, 0);
            }
        } else if (7 === position) {
            // It's 5 lines white black white black white
            for (i = 0; i < 5 ;i += 1) {
                ctx.fillStyle = colors[(i % 2)];
                ctx.fillRect(0, 0, options.line, options.height);
                ctx.translate(options.line, 0);
            }
        }
    };
    
    /*
     * Clears the whole canvas and generates a new code from what
     * is currently in the barcode variable…
     */
    generate = function () {
        var i, j, count, sequence, seqCount, height;
        height = options.height - options.fontSize;
        sequence = orientation[barcode[0]];
        
        ctx.clearRect(0, 0, options.width, options.height);
        
        ctx.save();
        ctx.textAlign = 'right';
        ctx.fillText(barcode[0], options.fontSize, height + options.fontSize);
        ctx.restore();
        ctx.translate( options.fontSize, 0);
        
        for (i = 1, count = barcode.length; i < count ;i += 1) {
            sequence = encoding[barcode[i]][orientation[barcode[0]][i - 1]];
            drawSeparation(i);
            ctx.fillStyle = colors[1];
            ctx.fillText(barcode[i], 0, height + options.fontSize);
            for (j = 0, seqCount = sequence.length; j < seqCount ;j += 1) {
                ctx.fillStyle = getColor(i, j);
                ctx.fillRect(0, 0, sequence[j] * options.line, height);
                ctx.translate(sequence[j] * options.line, 0);
                
            }
        }
        //FIXME: Nicify
        //Finishing separator
        drawSeparation(1);
        
        ctx.fillStyle = colors[1];
        ctx.fillText('>', 2 * options.line, height + options.fontSize);
        //Reset to 0, 0
        ctx.translate( options.fontSize - options.width, 0);
    };
    
    /*
     * Checks if the barcode is in the right format so that we can
     * draw something.
     */
    this.validate = function(code) {
        if (code.length != 13) {
            return false;
        } else if (! code.match(/^\d*$/)) {
            return false;
        }
        
        return true;
    };
    
    /*
     * Set the barcode to a new value and regenerate if alright
     */
    this.set = function (code) {
        if (this.validate(code)) {
            barcode = code;
            generate();
            return true;
        }
        return false;
    };
    
    /*
     * Returns the current set barcode
     */
    this.get = function () {
        return barcode;
    };
    
    //FIXME: That should be nicer…
    if (this.validate(code)) {
        barcode = code;
        generate();
    }
}
