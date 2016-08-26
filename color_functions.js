// Used https://github.com/imathis/hsl-picker/blob/master/assets/javascripts/modules/color.coffee to figure out HSL Stuff.
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var diff = max - min;
    var add = max + min;

    var hue =   max === min ? 0 : 
                r === max   ? ((60 * (g - b) / diff) + 360) % 360 :
                g === max   ? (60 * (b - r) / diff) + 120 :
                (60 * (r - g) / diff) + 240;

    var lum = 0.5*add;

    var sat =   lum === 0  ? 0 :
                lum === 1  ? 1 : 
                lum <= 0.5 ? diff/add :
                diff / (2 - add);

    var h = Math.round(hue),
        s = Math.round(sat*100),
        l = Math.round(lum*100);
    return[h,s + "%", l+"%"];
}

/**
 * function hexToRGB    : transforms a hex number to an rgb array, object, or string.
 *
 *@Param hexStr     : the hex string to be transformed. '#' at beginning doesn't matter.
 *@Param type       : the return type we want. "array","object", or "string".
 *
**/

function hexToRGB(hexStr,type){
    if(hexStr[0]==="#"){
        hexStr = hexStr.slice(1);
    }
    var r = parseInt(hexStr.slice(0,2),16);
    var g = parseInt(hexStr.slice(2,4),16);
    var b = parseInt(hexStr.slice(4,6),16);
    if(type.toLowerCase() === "string"){
        return rgbToString(r,g,b);
    }else if(type.toLowerCase() === "object"){
        return {
            "r":r,
            "g":g,
            "b":b
        };
    }else{
        return [r,g,b];
    }

}

/**
 * function rgbToHex : converts an rgb string or a hex string to hex.
 *
 *@Param rgbstr : the rgb string of format "rgb(12,45,230)" to be converted to hex
 *
**/

function rgbToHex(rgbstr){
    if(rgbstr[0]==="#" || !isNaN(Number(rgbstr[0]))){
        var prepended = "";
        if(rgbstr[0] !== "#"){
            prepended = "#";
        }
        return prepended + rgbstr;
    }
    var arr = rgbFromString(rgbstr);
    var str = "";
    arr.forEach(function(elem){
        var newStr = (elem).toString(16);
        newStr = newStr.length === 2 ? newStr : "0"+newStr;
        str+=newStr;
    });
    return "#"+(str).toUpperCase();
}