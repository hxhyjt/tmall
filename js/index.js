 //banner轮播图
 window.onload=function(){
        //一定要记住，获取的是一个集合，要通过下标进行获取
        var banner=getClass("banner")[0];
        var imgbox=getClass("imgbox")[0];
        var imgs=imgbox.getElementsByTagName("a");
        var btnbox=getClass("btnbox")[0];
        var btn=btnbox.getElementsByTagName("div");
        var container=getClass("container")[0];
        for (var i = 0; i < btn.length; i++) {
            btn[i].index=i;
            btn[i].onmouseover=function(){
            for (var j = 0; j < btn.length; j++) {
                btn[j].style.background="#ccc";
                imgs[j].style.display="none";
                            };
            this.style.background="#fff";
            imgs[this.index].style.display="block";
           };
       btn[i].onmouseout=function(){
             // imgs[num+1].style.display="block";
             num=this.index;
       }
        }
        //自动轮播
        var num=0;
        var t=setInterval(move,2000);
        function move(){
            num++;
            var arrcolor=["#e8e8e8","#e8e8e8","#e8e8e8","#ff574b","#e8e8e8"];
            if (num>4) {
                num=0;
            };
           for (var j = 0; j < btn.length; j++) {
                btn[j].style.background="#ccc";
                imgs[j].style.display="none";
                            };
                 btn[num].style.background="#fff";
                 imgs[num].style.display="block";
                 banner.style.background=arrcolor[num];
                    }
        
       container.onmouseover=function(){
        clearInterval(t);
       }
       container.onmouseout=function(){
        t=setInterval(move,2000);
       }
   
 //热门品牌小桃心
       var boxes=getClass("box");
       var hearts=getClass("heart");
       for (var i = 0; i < boxes.length; i++) {
        boxes[i].index=i;
        boxes[i].onmouseover=function(){
            hearts[this.index].style.display="block";
        }
        boxes[i].onmouseout=function(){
            hearts[this.index].style.display="none";
        }
       };
  //热门品牌选项卡切换
       var rmppbtns=getClass("rmppbuttonnbox");
      var rmppcons=getClass("rmpp-box-bottom-right");
      for (var i = 0; i < rmppbtns.length; i++) {
           rmppbtns[i].index=i;
        rmppbtns[i].onclick=function(){
                   for (var j = 0; j < rmppcons.length; j++) {
                    rmppcons[j].style.display="none";
                    rmppbtns[j].style.color="#666";
                    rmppbtns[j].style.textDecoration="none";
                   };
                   this.style.textDecoration="underline";
                   this.style.color="#000";
                   this.style.fontWeight="bold";
                    // this.style.borderBottom="2px solid #000";
                   rmppcons[this.index].style.display="block";
        }
      };
    
       //右边标签栏效果
         var rimgs=$(".right-img")[0];
         var jdright=$("div",rimgs);
         var fonts=$(".right-font")[0];
         var rightf=$("div",fonts);
         for (var i = 0; i < jdright.length; i++) {
           jdright[i].index=i;
           hover(jdright[i],function(){
             animate(rightf[this.index],{left: 35},500)
            rightf[this.index].style.display="block";
            // rightf[this.index].style.background="red";
            this.style.background="#DE3131";
            console.log(jdright.length);
         },function(){
             rightf[this.index].style.display="none";
            this.style.background="#000";
         });
         };

      //图片加载
       var obj;
       var wheight=document.documentElement.clientHeight;
       var allimgs=$("img");
       //当开始的时候小于窗口的高度，
       // 就把当前的图片加载出来
        for (var j = 0; j < allimgs.length; j++) {
          if(getPosition(allimgs[j]).y<wheight){
           allimgs[j].src=allimgs[j].getAttribute("data-src");
          }
        };
         window.onscroll=function(){
          obj=document.documentElement.scrollTop==0?document.body:document.documentElement;
          //加载图片
        for (var i = 0; i < allimgs.length; i++) {
        if((obj.scrollTop+wheight)>getPosition(allimgs[i]).y){
           allimgs[i].src=allimgs[i].getAttribute("data-src");
             }
          };
        }
        //返回顶部按钮的单击事件
      var totop=$(".totop")[0];
      totop.onclick=function(){
      var obj=document.body.scrollTop==0?document.documentElement:document.body;
      animate(obj,{scrollTop:0},1000);
      }

      //二级导航
     var first=$(".first");
      var second=$(".second");
      var nav=$(".top-box-right")[0];
      var links=$("a",nav);
      var t;

      //对应的导航的内容的变化动画
      for (var i = 0; i < first.length; i++){
        first[i].index=i;
        hover(first[i],function(){
          var that=this;
          t=setTimeout(function(){
          var hvalue=$("li",second[that.index]).length*50;  
          // console.log(hvalue);
          animate(second[that.index],{height:hvalue});
          second
              },200)
        },function(){
          clearTimeout(t);
          animate(second[this.index],{height:0})
            })
          };
        //所有链接的变化
      for (var i = 0; i < links.length; i++) {
        links[i].index=i;
        hover(links[i],function(){
          // this.style.background="#f2f2f2";
          this.style.color="#c50000";
        },function(){
          this.style.background="";
          this.style.color="#999";
        })
      };
      //最上边的搜索框
      var searchbox=$(".search-toppest-box")[0];
      addEvent(window,"scroll",function(){
         var objs=document.documentElement.scrollTop==0?document.body:document.documentElement;
          if(objs.scrollTop>=1000){
            searchbox.style.display="block";
          }else{
            searchbox.style.display="none";
          }
      });
      //滚动条出现的搜索框中的文字
      var input1=$("#searchword");
      input1.onfocus=function(){
        input1.value=""
      }
      input1.onblur=function(){
        input1.value="运动户外  引领新时尚";
      }
      //中间的搜索框的文字
      var input2=$("#searchtxt");
      input2.onfocus=function(){
        input2.value="";
      }
      input2.onblur=function(){
        input2.value="闭着眼睛都不会买错的化妆品"
      }

       //顶部banner二级导航选项卡
    var bannerbtns=$(".banner-list");
    var bannercons=$(".bannerboxcons");
    for (var i = 0; i < bannerbtns.length; i++) {
      bannerbtns[i].index=i;
      hover(bannerbtns[i],function(){
      this.style.background="#fff";
      bannercons[this.index].style.display="block";
      
      },function(){
       this.style.background="";
       bannercons[this.index].style.display="none";
      });
    };

    for (var i = 0; i < bannercons.length; i++) {
      bannercons[i].index=i;
      hover(bannercons[i],function(){
       bannercons[this.index].style.display="block";
      },function(){
      bannercons[this.index].style.display="none";
      });
    };
 }