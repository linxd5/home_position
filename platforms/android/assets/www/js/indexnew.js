
function load (){
 
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
    var singleFinger = 0;
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
                if (event.touches.length == 1) {
                    singleFinger = 1;
                    
                }
                if (event.touches.length == 2) {
	                x1_finger2 = event.touches[1].clientX;
	                y1_finger2 = event.touches[1].clientY;
            	}
                break;
            case "touchend":
                if (singleFinger == 1)
                    singleFinger = 0;
                    break;
            case "touchmove":
                // event.preventDefault();
                x2_finger1 = event.touches[0].clientX;
	            y2_finger1 = event.touches[0].clientY;
                if (event.touches.length == 2) {
	                //oInp.innerHTML = "<br>Touch moved (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
	                //oInp.innerHTML = "<br>Touch moved (" + event.touches[1].clientX + "," + event.touches[1].clientY + ")";
	                x2_finger2 = event.touches[1].clientX;
	                y2_finger2 = event.touches[1].clientY;
	                // alert("函数计算调用之前");
	                calculateTwoFingersChange();
	                // alert("函数计算调用结束");
	                x1_finger1 = x2_finger1;
	                y1_finger1 = y2_finger1;
	                x1_finger2 = x2_finger2;
	                y1_finger2 = y2_finger2;
                }
                else if (event.touches.length == 1 && singleFinger == 1) {
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
    	// xMove = xMove + (xMoveFinger1 + xMoveFinger2) / 2 * 3;
    	// yMove = yMove + (yMoveFinger1 + yMoveFinger2) / 2 * 3;
        xMove = xMove + (xMoveFinger1 + xMoveFinger2) / 2 ; 
        yMove = yMove + (yMoveFinger1 + yMoveFinger2) / 2 ;
        var rotationCX = (x1_finger1 + x1_finger2) / 2;
        var rotationCY = (y1_finger1 + y1_finger2) / 2;
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
            scaleValue = scaleValue * line2 / line1 ;
            // scaleValue = line2 / line1;
        else if (lineChange < 1) 
            scaleValue = scaleValue * line2 / line1 ;
            // scaleValue = line2 / line1;
    	// alert("scaleValue:"+scaleValue);
    	var rotationBegin = Math.atan( (y1_finger1 - y1_finger2) / (x1_finger1 - x1_finger2) )*180/Math.PI;
    	var rotationEnd = Math.atan( (y2_finger1 - y2_finger2) / (x2_finger1 - x2_finger2) )*180/Math.PI;
    	// alert("rotationBegin:"+rotationBegin+"rotationEnd:"+rotationEnd);

        var rotationChange = 0; 
        if ( (rotationEnd <= 0 && rotationBegin <= 0) || (rotationEnd >= 0 && rotationBegin >= 0) ) {
            if ( (x1_finger1 <= x1_finger2 && y1_finger1 <= y1_finger2 && x2_finger1 <=x2_finger2 && y2_finger1 <= y2_finger2) || 
              (x1_finger2 <= x1_finger1 && y1_finger2 <= y1_finger1 && x2_finger2 <=x2_finger1 && y2_finger2 <= y2_finger1) ||
              (x1_finger2 <= x1_finger1 && y1_finger1 <= y1_finger2 && x2_finger2 <=x2_finger1 && y2_finger1 <= y2_finger2) ||
              (x1_finger1 <= x1_finger2 && y1_finger2 <= y1_finger1 && x2_finger1 <=x2_finger2 && y2_finger2 <= y2_finger1) )
                  rotationChange = rotationEnd - rotationBegin;
            else if ( (x1_finger1 <= x1_finger2 && y1_finger1 <= y1_finger2 && x2_finger2 <=x2_finger1 && y2_finger2 <= y2_finger1) ||
              (x1_finger2 <= x1_finger1 && y1_finger2 <= y1_finger1 && x2_finger1 <=x2_finger2 && y2_finger1 <= y2_finger2) ||
              (x1_finger2 <= x1_finger1 && y1_finger1 <= y1_finger2 && x2_finger1 <=x2_finger2 && y2_finger2 <= y2_finger1) ||
              (x1_finger1 <= x1_finger2 && y1_finger2 <= y1_finger1 && x2_finger2 <=x2_finger1 && y2_finger1 <= y2_finger2) ) {
                rotationChange = rotationEnd - rotationBegin;
                if (rotationChange >= 0) 
                  rotationChange = rotationChange - 180;
                else 
                  rotationChange = 180 + rotationChange;
            }
            else 
                rotationChange = rotationEnd - rotationBegin;
        }
        else if (rotationBegin >= 0 && rotationEnd <= 0) {
            if ( (x1_finger1 <= x1_finger2 && y1_finger1 <= y1_finger2 && x2_finger2 <=x2_finger1 && y2_finger1 <= y2_finger2) || 
            (x1_finger2 <= x1_finger1 && y1_finger2 <= y1_finger1 && x2_finger1 <=x2_finger2 && y2_finger2 <= y2_finger1) ) {
                rotationChange = 180 + (rotationEnd - rotationBegin);
            }
            else if ( (x1_finger1 <= x1_finger2 && y1_finger1 <= y1_finger2 && x2_finger1 <=x2_finger2 && y2_finger2 <= y2_finger1) ||
            (x1_finger2 <= x1_finger1 && y1_finger2 <= y1_finger1 && x2_finger2 <=x2_finger1 && y2_finger1 <= y2_finger2) ) {
                rotationChange = rotationEnd - rotationBegin;
            }
            else 
                rotationChange = rotationEnd - rotationBegin;
        }
        else if (rotationBegin <= 0 && rotationEnd >= 0) {
            if ( (x1_finger2 <= x1_finger1 && y1_finger1 <= y1_finger2 && x2_finger2 <=x2_finger1 && y2_finger2 <= y2_finger1) || 
            (x1_finger1 <= x1_finger2 && y1_finger1 <= y1_finger2 && x2_finger2 <=x2_finger1 && y2_finger1 <= y2_finger2) ) {
                rotationChange = rotationEnd - rotationBegin;
            }
            else if ( (x1_finger2 <= x1_finger1 && y1_finger1 <= y1_finger2 && x2_finger1 <=x2_finger2 && y2_finger1 <= y2_finger2) ||
            (x1_finger1 <= x1_finger2 && y1_finger2 <= y1_finger1 && x2_finger2 <=x2_finger1 && y2_finger2 <= y2_finger1) ) {
                rotationChange = (rotationEnd - rotationBegin) - 180;
            }
            else 
                rotationChange = rotationEnd - rotationBegin;
        }

    	rotationValue = (rotationValue + rotationChange * 1.5) ;
        var scaleText = 1 / scaleValue;
        // var relativeRotation = rotationEnd - rotationBegin;
        
    	// alert("...T:"+xMove+","+yMove+",r:"+rotationValue+",s:"+scaleValue);
    	// rect.transform("t"+xMove+","+yMove+"r"+rotationValue+"s"+scaleValue);
    	// for (var key in SVGSet)
    	// SVGSet[key].transform("t"+xMove+","+yMove+"r"+rotationValue*1.5+"s"+scaleValue);
    	// groupShape.transform("t"+xMove+","+yMove+"r"+rotationValue+"s"+scaleValue);
        // groupShape.transform({rotation:rotationValue, x:xMove, y:yMove, scaleX: scaleValue, scaleY: scaleValue});
        
        // groupShape.transform({x:xMove, y:yMove});
        // groupShape.transform({scale: scaleValue, cx:rotationCX, cy: rotationCY});
        // groupShape.transform({rotation:rotationValue, cx:rotationCX, cy:rotationCY});
        groupShape.transform({x:xMove, y:yMove});
        // groupShape.transform({scale: scaleValue});
        // groupShape.transform({scale: scaleValue, cx:rotationCX, cy: rotationCY});
        // groupShape.transform({rotation:rotationValue});
        // groupShape.transform({rotation:rotationValue, cx:rotationCX, cy:rotationCY});
        groupShape.transform({scale: scaleValue, cx:rotationCX+xMove, cy: rotationCY+yMove});
        groupShape.transform({rotation:rotationValue, cx:rotationCX+xMove, cy: rotationCY+yMove});
        
        var rotationText = -1 * rotationValue;
        // layer2_text3.transform({rotation:rotationText});

        layer3.each(function(i, children) {
            this.transform({rotation:rotationText});
            // this.transform({scale:scaleText});
        });

         // alert(rotationValue+"======"+(rotationValue%360)+"---------"+rotationText);
        // layer1.transform({rotation:rotationValue});
        // layer3.transform({rotation:rotationValue});
        // layer4.transform({rotation:rotationValue});
  //   	}
  //   	else {
  //   		// for (var key in SVGSet)
  //   		// SVGSet[key].transform("...t"+xMove+","+yMove+"r"+rotationValue*1.5+"s"+scaleValue);
  //   		// rect.transform("...T"+xMove+","+yMove+"r"+rotationValue+"s"+scaleValue);
  //   		// groupShape.transform("...T"+xMove+","+yMove+"r"+rotationValue+"s"+scaleValue);
  //           groupShape.transform({rotation:rotationValue});
  //           groupShape.transform({x:xMove, y:yMove});
  //           groupShape.transform({scaleX: scaleValue, scaleY: scaleValue});
		// }
    }

    function calculateSingleFingerChange() {
    	//alert("函数计算调用");
    	// var xMove = 0;
     //    var yMove = 0;
        
        // alert("x1_finger1:"+x1_finger1+"   y1_finger1:"+y1_finger1+"   x2_finger1:"+x2_finger1+"   y2_finger1:"+y2_finger1+"  xMove:"+xMove+"  yMove:"+yMove );
    	
        xMove = xMove + (x2_finger1 - x1_finger1) * 1.5;
    	yMove = yMove + (y2_finger1 - y1_finger1) * 1.5;
        var rotationCX = (x2_finger1 + x1_finger1) / 2;
        var rotationCY = (y2_finger1 + y1_finger1) / 2;
    	
    	//alert("xMoveFinger1:"+xMoveFinger1+"   yMoveFinger1:"+yMoveFinger1+"   xMoveFinger2:"+xMoveFinger2+"   yMoveFinger2:"+yMoveFinger2 );
    	// if (firstTime == 1) {
    		// groupShape.transform("t"+xMove+","+yMove);
            // groupShape.transform({rotation:rotationValue, x:xMove, y:yMove, scaleX: scaleValue, scaleY: scaleValue});
            
        groupShape.transform({x:xMove, y:yMove});
        // groupShape.transform({scale: scaleValue});
        groupShape.transform({scale: scaleValue, cx:rotationCX+xMove, cy: rotationCY+yMove});
        groupShape.transform({rotation:rotationValue, cx:rotationCX+xMove, cy: rotationCY+yMove});
        // groupShape.transform({rotation:rotationValue, cx:rotationCX, cy:rotationCY});
        
        layer3.each(function(i, children) {
            this.transform({rotation:-1*rotationValue});
            // this.transform({scale:1/scaleValue});
        });
       
    }
}
window.addEventListener('load',load, false);