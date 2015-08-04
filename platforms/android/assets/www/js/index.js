/*  Constants: */
var svgViewBoxWidth = 1.2e+006;    // The original width value of the viewBox attribute for the svg element.
var svgViewBoxHeight =352876;    // The original height value of the viewBox attribute for the svg element.
var leftArrow = 37;   // The numeric code for the left arrow key.
var upArrow = 38;
var rightArrow = 39;
var downArrow = 40;
var panRate = 10; // Number of pixels to pan per key press.    
var zoomRate = 1.1;   // Must be greater than 1. Increase this value for faster zooming (i.e., less granularity).
// var theSvgElement=Snap("#svgElement");//获取当前的画布
/* Globals: */
var theSvgElement;
  function processKeyPress(evt) {

              var viewBox = theSvgElement.getAttribute('viewBox');  // Grab the object representing the SVG element's viewBox attribute.
              var viewBoxValues = viewBox.split(' ');               // Create an array and insert each individual view box attribute value (assume they're seperated by a single whitespace character).
 
              viewBoxValues[0] = parseFloat(viewBoxValues[0]);      // Convert string "numeric" values to actual numeric values.
              viewBoxValues[1] = parseFloat(viewBoxValues[1]);

              switch (evt.keyCode) {
                  case leftArrow:
                      viewBoxValues[0] += panRate;  // Increase the x-coordinate value of the viewBox attribute to pan right.
                      break;
                  case rightArrow:
                      viewBoxValues[0] -= panRate;  // Decrease the x-coordinate value of the viewBox attribute to pan left.
                      break;
                  case upArrow:
                      viewBoxValues[1] += panRate;  // Increase the y-coordinate value of the viewBox attribute to pan down.
                      break;
                  case downArrow:
                      viewBoxValues[1] -= panRate;  // Decrease the y-coordinate value of the viewBox attribute to pan up.      
                      break;
              } // switch

              theSvgElement.setAttribute('viewBox', viewBoxValues.join(' '));   // Convert the viewBoxValues array into a string with a white space character between the given values.
          }

          function zoom(zoomType) {
              var viewBox = theSvgElement.getAttribute('viewBox');  // Grab the object representing the SVG element's viewBox attribute.
              var viewBoxValues = viewBox.split(' ');               // Create an array and insert each individual view box attribute value (assume they're seperated by a single whitespace character).

              viewBoxValues[2] = parseFloat(viewBoxValues[2]);      // Convert string "numeric" values to actual numeric values.
              viewBoxValues[3] = parseFloat(viewBoxValues[3]);

              if (zoomType == 'zoomIn') {
                  viewBoxValues[2] /= zoomRate; // Decrease the width and height attributes of the viewBox attribute to zoom in.
                  viewBoxValues[3] /= zoomRate;
              }
              else if (zoomType == 'zoomOut') {
                  viewBoxValues[2] *= zoomRate; // Increase the width and height attributes of the viewBox attribute to zoom out.
                  viewBoxValues[3] *= zoomRate;
              }
              else
                  alert("function zoom(zoomType) given invalid zoomType parameter.");

              theSvgElement.setAttribute('viewBox', viewBoxValues.join(' '));   // Convert the viewBoxValues array into a string with a white space character between the given values.
              console.log("svgViewBoxWidth",svgViewBoxWidth);
              var currentZoomFactor = svgViewBoxWidth / viewBoxValues[2];                                       // Calculates the current zoom factor, could have just as easily used svgViewBoxHeight.      
              var newText = document.createTextNode("Current zoom factor = " + currentZoomFactor.toFixed(3));   // Create a generic new text node object.
              var parentNode = document.getElementById('currentZoomFactorText');                                // Get the parent node of the text node we want to replace.

              // parentNode.replaceChild(newText, parentNode.firstChild);  // Replace the first child text node with the new text object.
          }

          function zoomViaMouseWheel(mouseWheelEvent) {
              if (mouseWheelEvent.wheelDelta > 0)
                  zoom('zoomIn');
              else
                  zoom('zoomOut');

              /* When the mouse is over the webpage, don't let the mouse wheel scroll the entire webpage: */
              mouseWheelEvent.cancelBubble = true;
              return false;
          }

          function initialize() {
              /* Add event listeners: */
              window.addEventListener('keydown', processKeyPress, true);        // OK to let the keydown event bubble.
              window.addEventListener('mousewheel', zoomViaMouseWheel, false);  // Don't let the mousewheel event bubble up to stop native browser window scrolling.

              /* Set a global variable and detect if the browser supports SVG: */
              theSvgElement = document.getElementById('svgElement');            // Best to only access the SVG element after the page has fully loaded.
              if (theSvgElement.namespaceURI != "http://www.w3.org/2000/svg")   // Alert the user if their browser does not support SVG.
                  alert("Inline SVG in HTML5 is not supported. This document requires a browser that supports HTML5 inline SVG.");

              /* For the svg element, specifically set the viewBox attribute's width and height values in that one of them will be used to calculate the current scaling factor. */
              theSvgElement.setAttribute('viewBox', "0 0 " + svgViewBoxWidth + " " + svgViewBoxHeight);
          }

function load (){
        initialize();
    var x1_finger1 = 0;
    var y1_finger1 = 0;
    var x2_finger1 = 0;
    var y2_finger1 = 0;
    var x1_finger2 = 0;
    var y1_finger2 = 0;
    var x2_finger2 = 0;
    var y2_finger2 = 0;
    var firstTime = 1;
    var xMove = 0;
    var yMove = 0;
    var rotationValue = 0;
    var scaleValue = 1;
    // var groupShape = rect.get('rect1');
    
    document.addEventListener('touchstart',touch, false);
    document.addEventListener('touchmove',touch, false);
    document.addEventListener('touchend',touch, false);
     
    function touch (event){
        var event = event || window.event;
         
        var oInp = document.getElementById("inp");
 
        switch(event.type){
            case "touchstart":
                //oInp.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
                x1_finger1 = event.touches[0].clientX;
                y1_finger1 = event.touches[0].clientY;
                if (event.touches.length >= 2) {
	                x1_finger2 = event.touches[1].clientX;
	                y1_finger2 = event.touches[1].clientY;
            	}
                break;
            case "touchend":
            //    document.removeEventListener("touchmove",touchMove, false);
        	   // document.removeEventListener("touchend",touchEnd,false);
            //     // oInp.innerHTML = "<br>Touch end (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";
            //     x2_finger1 = event.changedTouches[0].clientX;
	           //  y2_finger1 = event.changedTouches[0].clientY;
            //     if (event.touches.length >= 2) {
	           //      //oInp.innerHTML = "<br>Touch moved (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
	           //      //oInp.innerHTML = "<br>Touch moved (" + event.touches[1].clientX + "," + event.touches[1].clientY + ")";
	           //      x2_finger2 = event.changedTouches[1].clientX;
	           //      y2_finger2 = event.changedTouches[1].clientY;
	           //      // alert("函数计算调用之前");
	           //      calculateTwoFingersChange();
	           //      //alert("函数计算调用结束");
	           //      x1_finger1 = x2_finger1;
	           //      y1_finger1 = y2_finger1;
	           //      x1_finger2 = x2_finger2;
	           //      y1_finger2 = y2_finger2;
            //     }
            //     else if (event.touches.length == 1) {
            //     	calculateSingleFingerChange();
            //     	x1_finger1 = x2_finger1;
	           //      y1_finger1 = y2_finger1;
            //     }
            //     break;
            case "touchmove":
                // event.preventDefault();
              x2_finger1 = event.touches[0].clientX;
	            y2_finger1 = event.touches[0].clientY;
                if (event.touches.length >= 2) {
	                //oInp.innerHTML = "<br>Touch moved (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
	                //oInp.innerHTML = "<br>Touch moved (" + event.touches[1].clientX + "," + event.touches[1].clientY + ")";
	                x2_finger2 = event.touches[1].clientX;
	                y2_finger2 = event.touches[1].clientY;
	                // alert("函数计算调用之前");
	                calculateTwoFingersChange();
	                //alert("函数计算调用结束");
	                x1_finger1 = x2_finger1;
	                y1_finger1 = y2_finger1;
	                x1_finger2 = x2_finger2;
	                y1_finger2 = y2_finger2;
                }
                else if (event.touches.length == 1) {
                	calculateSingleFingerChange();
                	x1_finger1 = x2_finger1;
	                y1_finger1 = y2_finger1;
                }
                break;
        }
         
    }

    function calculateTwoFingersChange() {
    	// alert("函数计算调用");
    	// var xMove = 0;
     //    var yMove = 0;
     //    var rotationValue = 0;
     //    var scaleValue = 1;
        // alert("x1_finger1:"+x1_finger1+"   y1_finger1:"+y1_finger1+"   x1_finger2:"+y1_finger2+"   y1_finger2:"+y1_finger2 );
    	var xMoveFinger1 = x2_finger1 - x1_finger1;
    	var yMoveFinger1 = y2_finger1 - y1_finger1;
    	var xMoveFinger2 = x2_finger2 - x1_finger2;
    	var yMoveFinger2 = y2_finger2 - y1_finger2
    	 // alert("xMoveFinger1:"+xMoveFinger1+"   yMoveFinger1:"+yMoveFinger1+"   xMoveFinger2:"+xMoveFinger2+"   yMoveFinger2:"+yMoveFinger2 );
    	xMove = xMove + (xMoveFinger1 + xMoveFinger2) / 2 * 3;
    	yMove = yMove + (yMoveFinger1 + yMoveFinger2) / 2 * 3;
    	// if (xMove > 10) 
    	// 	xMove = 0;
    	// else if (xMove < -10) 
    	// 	xMove = 0;
    	// if (yMove > 10) 
    	// 	yMove = 0;
    	// else if (yMove < -10) 
    	// 	yMove = 0;
    	var line1 = Math.sqrt( (x1_finger1 - x1_finger2)*(x1_finger1 - x1_finger2) + (y1_finger1 - y1_finger2)*(y1_finger1 - y1_finger2) );
    	var line2 = Math.sqrt( (x2_finger1 - x2_finger2)*(x2_finger1 - x2_finger2) + (y2_finger1 - y2_finger2)*(y2_finger1 - y2_finger2) );
    	var lineChange = line2 / line1;
        if (lineChange > 1) 
            scaleValue = scaleValue * line2 / line1 * 1.2;
        else if (lineChange < 1) 
            scaleValue = scaleValue * line2 / line1 / 1.2;
    	// alert("scaleValue"+scaleValue);
    	var rotationBegin = Math.atan( (y1_finger1 - y1_finger2) / (x1_finger1 - x1_finger2) )*180/Math.PI;
    	var rotationEnd = Math.atan( (y2_finger1 - y2_finger2) / (x2_finger1 - x2_finger2) )*180/Math.PI;
    	// alert("rotationBegin"+rotationBegin+"rotationEnd"+rotationEnd);
    	rotationValue = rotationValue + (rotationEnd - rotationBegin) * 2;
        
    	// alert("...T"+xMove+","+yMove+"r"+rotationValue+"s"+scaleValue);
    	if (firstTime == 1) {
    		// rect.transform("t"+xMove+","+yMove+"r"+rotationValue+"s"+scaleValue);
    		// for (var key in SVGSet)
    		// SVGSet[key].transform("t"+xMove+","+yMove+"r"+rotationValue*1.5+"s"+scaleValue);
    		// groupShape.transform("t"+xMove+","+yMove+"r"+rotationValue+"s"+scaleValue);
            // groupShape.transform({rotation:rotationValue, x:xMove, y:yMove, scaleX: scaleValue, scaleY: scaleValue});
            // theSvgElement.transform({rotation:rotationValue});
            // theSvgElement.transform({x:xMove, y:yMove});
            // theSvgElement.transform({scaleX: scaleValue, scaleY: scaleValue});
            groupShape.transform({rotation:rotationValue});
            groupShape.transform({x:xMove, y:yMove});
            groupShape.transform({scaleX: scaleValue, scaleY: scaleValue});
    		firstTime = 0;
    	}
    	else {
    		// for (var key in SVGSet)
    		// SVGSet[key].transform("...t"+xMove+","+yMove+"r"+rotationValue*1.5+"s"+scaleValue);
    		// rect.transform("...T"+xMove+","+yMove+"r"+rotationValue+"s"+scaleValue);
    		// groupShape.transform("...T"+xMove+","+yMove+"r"+rotationValue+"s"+scaleValue);
            // theSvgElement.transform({rotation:rotationValue});
            // theSvgElement.transform({x:xMove, y:yMove});
            // theSvgElement.transform({scaleX: scaleValue, scaleY: scaleValue});

            groupShape.transform({rotation:rotationValue});
            groupShape.transform({x:xMove, y:yMove});
            groupShape.transform({scaleX: scaleValue, scaleY: scaleValue});
		}
    }

    function calculateSingleFingerChange() {
    	//alert("函数计算调用");
    	// var xMove = 0;
     //    var yMove = 0;
        
        //alert("x1_finger1:"+x1_finger1+"   y1_finger1:"+y1_finger1+"   x1_finger2:"+y1_finger2+"   y1_finger2:"+y1_finger2 );
    	xMove = xMove + (x2_finger1 - x1_finger1) * 3;
    	yMove = yMove + (y2_finger1 - y1_finger1) * 3;
    	
    	//alert("xMoveFinger1:"+xMoveFinger1+"   yMoveFinger1:"+yMoveFinger1+"   xMoveFinger2:"+xMoveFinger2+"   yMoveFinger2:"+yMoveFinger2 );
    	if (firstTime == 1) {
    		// groupShape.transform("t"+xMove+","+yMove);
            // groupShape.transform({rotation:rotationValue, x:xMove, y:yMove, scaleX: scaleValue, scaleY: scaleValue});
            // theSvgElement.transform({rotation:rotationValue});
            // theSvgElement.transform({x:xMove, y:yMove});
            // theSvgElement.transform({scaleX: scaleValue, scaleY: scaleValue});
            groupShape.transform({rotation:rotationValue});
            groupShape.transform({x:xMove, y:yMove});
            groupShape.transform({scaleX: scaleValue, scaleY: scaleValue});
    		firstTime = 0;
    	}
    	else {
    		// groupShape.transform("...T"+xMove+","+yMove);
            // groupShape.transform({rotation:rotationValue, x:xMove, y:yMove, scaleX: scaleValue, scaleY: scaleValue});
            // theSvgElement.transform({rotation:rotationValue});
            // theSvgElement.transform({x:xMove, y:yMove});
            // theSvgElement.transform({scaleX: scaleValue, scaleY: scaleValue});
            groupShape.transform({rotation:rotationValue});
            groupShape.transform({x:xMove, y:yMove});
            groupShape.transform({scaleX: scaleValue, scaleY: scaleValue});
		}
    }
}
window.addEventListener('load',load, false);