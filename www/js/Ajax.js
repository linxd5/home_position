		   //定义异步请求对象
           var httpRequest=false;
           
           //创建异步请求对象
           function createXMLHttp(){
           		
           		//判断为ie浏览器
                if(window.ActiveXObject){
                    try{
                       httpRequest=new ActiveXObject("msxml2.XMLHTTP");
                    }catch(e1){
                       try{
                       	httpRequest=new ActiveXObject("Microsoft.XMLHTTP");
                       }catch(e2){
                          httpRequest=false;
                          alert("在ie浏览器中创建异步请求对象失败！");
                       }
                    }
                    
                //判断为非ie浏览器
                }else if(window.XMLHTTPRequest){
                    try{
                       httpRequest=new XMLHTTPRequest();
                    }catch(e3){
                       httpRequest=false;
                       alert("在非ie浏览器中创建异步请求对象失败！");
                    }
                }
           }
           
           //准备并向服务器发送异步请求(请求路径：url,请求方式：get:null,post:提交数据;回调方法名称：method)
           function doCommandAjax(url,postData,mothed){
                
                //创建异步请求对象
                createXMLHttp();
                
                if(!postData){
                    //get方式提交
                    httpRequest.open("get",url,true);
                }else{
                    
                    //post方式提交
                    httpRequest.open("post",url,true);
                }
                
                //注册事件
                httpRequest.onreadystatechange=callBack(httpRequest,mothed);
                
                //不管是get还是post请求都要设置请求头
                httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                
                //发送请求
                httpRequest.send(postData);
           }
           
           //回调的启动方法
           function callBack(httpRequest,mothed){
               return function(){
                   //表示请求服务器完成
                   try{
	                   if(httpRequest.readyState==4){
	                       //alert(httpRequest.status);
	                       if(httpRequest.status==200){
	                          eval(mothed+"();");
	                       }
	                   }
                   }catch(e4){
                       //alert("请求失败");
                   }
               }
           }
           
           //获取post提交数据
		   function getData(element){
			       //encodeURIComponet()对表单数据进行编码
			       //有多个元素的时候
			       //alert("是否为数字："+isNaN(element.length));
			      
			       if(!isNaN(element.length)&&element.length>1){
			           for(var i=0;i<element.length;i++){
						   //alert("是否选择:"+element[i].checked);
						   if(element[i].checked){
						        getData(element[i]);
						        //break;
						   }
				 	   }
			       }
			       
			       if(isNaN(element.length)){
				       var sug=encodeURIComponent(element.name);
				           sug+="=";
				           sug+=encodeURIComponent(element.value);
				           sug+="&";
				       postData+=sug;
				       //alert(postData+"  :888");
				   }
		  }

//map使用函数
function Map() {     
    /** 存放键的数组(遍历用到) */    
    this.keys = new Array();     
    /** 存放数据 */    
    this.data = new Object();     
         
    /**   
     * 放入一个键值对   
     * @param {String} key   
     * @param {Object} value   
     */    
    this.put = function(key, value) {     
        if(this.data[key] == null){     
            this.keys.push(key);     
        }     
        this.data[key] = value;     
    };     
         
    /**   
     * 获取某键对应的值   
     * @param {String} key   
     * @return {Object} value   
     */    
    this.get = function(key) {     
        return this.data[key];     
    };     
         
    /**   
     * 删除一个键值对   
     * @param {String} key   
     */    
    this.remove = function(key) {     
        this.keys.remove(key);     
        this.data[key] = null;     
    };     

    this.isExists = function(key){
        var obj = this.data[key];
        alert("MapisExists="+obj);
        if(obj!=null && obj!=undefined){
            return true;
        }else{
            return false;
        }
    };

    /**   
     * 遍历Map,执行处理函数   
     *    
     * @param {Function} 回调函数 function(key,value,index){..}   
     */    
    this.each = function(fn){     
        if(typeof fn != 'function'){     
            return;     
        }     
        var len = this.keys.length;     
        for(var i=0;i<len;i++){     
            var k = this.keys[i];     
            fn(k,this.data[k],i);     
        }     
    };     
         
    /**   
     * 获取键值数组(类似Java的entrySet())   
     * @return 键值对象{key,value}的数组   
     */    
    this.entrys = function() {     
        var len = this.keys.length;     
        var entrys = new Array(len);     
        for (var i = 0; i < len; i++) {     
            entrys[i] = {     
                key : this.keys[i],     
                value : this.data[i]     
            };     
        }     
        return entrys;     
    };     
         
    /**   
     * 判断Map是否为空   
     */    
    this.isEmpty = function() {     
        return this.keys.length == 0;     
    };     
         
    /**   
     * 获取键值对数量   
     */    
    this.size = function(){     
        return this.keys.length;     
    };     
         
    /**   
     * 重写toString    
     */    
    this.toString = function(){     
        var s = "{";     
        for(var i=0;i<this.keys.length;i++,s+=','){     
            var k = this.keys[i];     
            s += k+"="+this.data[k];     
        }     
        s+="}";     
        return s;     
    };     
}     