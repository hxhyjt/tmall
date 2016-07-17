//兼容性的通过类名获取元
// 素，在IE8以下都可以正常运行
function getClass(className,obj){
	//判断为真，返回
    obj=obj||document;
    if (obj.getElementsByClassName) {
         return obj.getElementsByClassName(className);
    }else{
    	var all=obj.getElementsByTagName("*");
    	var newArr=[];
    	for (var i = 0; i < all.length; i++) {
    		if(checkClass(className,all[i].className)){
    			newArr.push(all[i]);
    		}
    	};
    	return newArr;
    }

}
//他们之间是用空格隔开的
function checkClass(str,lstr){
     var arr=lstr.split(" ");
     for (var i = 0; i < arr.length; i++) {
     	if(arr[i]==str){
     		return true;
     	}
     };
     return false;
}
//兼容性的获取或者修改文本内容，
// 就是innerText和textContent在浏览器中的兼容问题
//textContent这个属性在现代浏览器支持，innerText只能在IE浏览器中支持
//element就是对象中的文本内容       text是要替换的文本
function getText(element,text){
      if (text!=undefined) {
          if (element.getElementsByClassName) {
              element.textContent=text;
          }else{
              element.innerText=text;
          }
      }else{
         if (element.getElementsByClassName) {
              return element.textContent;
          }else{
              return element.innerText;
          }
      }
}
//兼容性的获取样式信息 element指的是元素，attr是属性
function getStyle(element,attr){
      if(window.getComputedStyle){
       return  window.getComputedStyle(element,null)[attr];
      }else{
        return element.currentStyle[attr];
      }
 }
//通过多种方式获取元素的函数selector为选择器eleObj为一个元素对象
function $(selector,eleObj){
    if(typeof selector=="string"){
    eleObj=eleObj||document;
    selector=selector.replace(/^\s*|\s*$/g,"");
   if (selector.charAt(0)==".") {
      return getClass(selector.slice(1),eleObj);
   }else if(selector.charAt(0)=="#"){
       return document.getElementById(selector.slice(1));
   }else if(/^[a-z|A-Z][a-z|A-Z|1-6]*$/g.test(selector)){
       return eleObj.getElementsByTagName(selector);
   }else if(/^<[a-z|A-Z][a-z|A-Z|1-6]*>$/g.test(selector)){
       return document.createElement(selector.slice(1,-1));
   }
  }else if(typeof selector=="function"){
       addEvent(window,"load",selector);
       /*window.onload=function(){
        selector();
       }*/
  }
}
//只获取某个元素对象子节点
function getChildren(obj){
  var arr=obj.childNodes;
  var newArr=[];
  for (var i = 0; i < arr.length; i++) {
      if(arr[i].nodeType==1){
          newArr.push(arr[i]);
      }
  };
   return  newArr;
}

//获取第一个元素子节点
function getFirstChild(obj){
     return getChildren(obj)[0];
}
//获取最后一个元素子节点
function getLastChild(obj){
  var arr=getChildren(obj);
     return arr[arr.length-1];
}
//获取下一个元素兄弟节点
function getNext(obj){
    var next=obj.nextSibling;
    if (next==null) {
      return null;
    };
    while(next.nodeType!=1){
       next=next.nextSibling;
       if (next==null) {
        return null;
       };
    }
}
//获取元素上一个兄弟节点
function getPrevious(obj){
    var pre=obj.previousSibling;
    if (pre==null) {
      return null;
    };
    while(pre.nodeType!=1){
       pre=pre.previousSibling;
       if (pre==null) {
        return null;
       };
    }
}
//将一个元素插入到一个元素的后面 selector要加入的元素obj 加入这个元素的前面
function insertAfter(selector,obj){
    var fatherNode=obj.parentNode;
    if(selector==fatherNode.lastChild){
      fatherNode.appendChild(selector);
    }else{
     fatherNode.insertBefore(selector,getNext(obj));
    }  
}
//获取任意一个元素的文档坐标,如果父元素有定位属性的话，
// 就是该元素的offsetTop值+父元素的offsetTop值+父元素本身的边框,
// 需要判断父元素是否有定位属性，和有几个父元素
function getPosition(element){
      var eleleft=element.offsetLeft;
      var eletop=element.offsetTop;
      var parent=element.parentNode;
     //重复的判断
     while(parent.nodeName!="BODY"){
       if(getStyle(parent,"position")=="absolute"
        ||getStyle(parent,"position")=="relative"){
         eleleft+=parent.offsetLeft+parseInt(getStyle(parent,"borderLeftWidth"));
         eletop+=parent.offsetTop+parseInt(getStyle(parent,"borderTopWidth"));
         }
       parent=parent.parentNode;
     }
     return {x:eleleft,y:eletop};
}
//兼容的绑定多个事件的函数
function addEvent(obj,event,fun){
     if(obj.addEventListener){
       obj.addEventListener(event,fun,false);
     }else{
       obj.attachEvent("on"+event,fun);
     }
}
//兼容的删除多个事件的函数
function removeEvent(obj,event,fun){
     if(obj.addEventListener){
       obj.removeEventListener(event,fun,false);
     }else{
      obj.detachEvent("on"+event,fun);
     }
}
//添加滚轮事件的函数
function mousewheel(obj,upfun,downfun){
    if(obj.attachEvent){
      obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
     }else if(obj.addEventListener){
     obj.addEventListener("mousewheel",scrollFn,false);
     //chrome,safari -webkitdocument.
     obj.addEventListener("DOMMouseScroll",scrollFn,false);
     //firefox -moz-
     }
    function scrollFn(e){
      var ev=e||window.event;
      //阻止浏览器的默认行为的方法
      if (ev.preventDefault )
        ev.preventDefault(); 
        //阻止默认浏览器动作(W3C)
      else{
        ev.returnValue = false;
        //IE中阻止函数器默认动作的方
      }
      var dir=ev.wheelDelta||ev.detail;
      if(dir==-3||dir==120){
        upfun.call(obj);
        //当前调用的时候this就是obj，不是window对象
      }else{
        downfun.call(obj);
      }
    }
}


//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

 //判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }


//鼠标移入移除事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,e);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,e);
        }
      }
    }
}
 
  function getEvent(e){
    return e||window.event;
  } 
