    var paper,XMLHttpReq,groupShape,originX,originY,targetX,targetY,id;
    var changeColor = 0;
    var count=0;
    var map = new Map();
    var a=[49.9069,45.9631];//(等候处)
    var b=[49.9069,17.6228];
    var c=[98.4244,17.6228];
    var d=[98.4244,32.9353];//（办公区域）
    var e=[172.139,17.6228];
    var f=[172.139,32.9353];//（会议室）
    var g=[240.811,17.6228];
    var h=[240.811,64.2025];//（财务室）
    var i=[251.581,27.4925];//（办公室）
    var j=[240.811,27.4925];
        map.put("a",a);
        map.put("b",b);
        map.put("c",c);
        map.put("d",d);
        map.put("e",e);
        map.put("f",f);
        map.put("g",g);
        map.put("h",h);
        map.put("i",i);
        map.put("j",j);
    // var nearby=$(nearby);
           // var  xhr = new xhrFactory();
           // xhr.post("test.ashx", null, function (data) {
           //      alert(data);
           //  });