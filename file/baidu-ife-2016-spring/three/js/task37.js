/**
 * Created by Administrator on 2016/8/29.
 */
$.fn.modal = (function(){

  function init(opts){
    var m = new Modal(opts);
    $ct = opts.src;
    //事件绑定
    if(!m.isBind){
      m.bind();
    }

    //初始化大小
    m.initSize();
    //绑定回调事件
    m.bindHandler();

    //显示摸态框
    $ct.click(function(event){
      //设置内容
      m.setContent();
      //设置主题
      m.setTheme();
      console.log($ct);
      $(".modal").show();
      event.stopPropagation();
    })
  }
  function Modal(opts){
    this.type = opts.type;
    this.width = opts.width;
    this.height = opts.height;
    this.confirmHandler = opts.confirm;
    this.cancelHandler = opts.cancel;
    this.title = opts.title;
    this.content = opts.content;
    this.allowDrag = opts.allowDrag;
    this.allowPageWheel = opts.allowPageWheel;
    this.allowResize =  opts.allowResize;
    this.down = false;//鼠标是否摁下
    this.isBind = false;//事件是否已经绑定
    this.offset = {};
    this.startPoint = {};
    this.action = undefined;
    this.resizeDirection = undefined;
    this.h = 0;
    this.w = 0;
    this.l = 0;
    this.t = 0;
  }
  Modal.prototype = {

    bind:function(){
      var self = this;
      //事件绑定
      if(this.allowDrag){
        $(".modal-header").css("cursor","move").mousedown(function(event){
          self.down = true;
          self.action = "drag"
          self.mouseDown(event);

        })
        $(document).mousemove(function(event){
          self.dragMove(event);
        });
        $(document).mouseup(function(){
          self.down = false;
          self.action = undefined;
        })
      }
      if(this.allowResize){

        $(".resizeT").css("cursor","n-resize").mousedown(function(event){
          self.action = "resize";
          self.down = true;
          self.resizeDirection = "n";
          self.mouseDown(event);
        });
        $(document).mousemove(function(event){
          self.resizeOneStart(event);
        });
        $(document).mouseup(function(){
          self.down = false;
        })
        $(".resizeB").css("cursor","s-resize").mousedown(function(event){
          self.action = "resize";
          self.down = true;
          self.resizeDirection = "s";
          self.mouseDown(event);
        });
        $(".resizeL").css("cursor","w-resize").mousedown(function(event){
          self.action = "resize";
          self.down = true;
          self.resizeDirection = "w";
          self.mouseDown(event);
        });

        $(".resizeR").css("cursor","e-resize").mousedown(function(event){
          self.action = "resize";
          self.down = true;
          self.resizeDirection = "e";
          self.mouseDown(event);
        });
        $(".resizeRT").css("cursor","ne-resize").mousedown(function(event){
          self.action = "resize";
          self.down = true;
          self.resizeDirection = "ne";
          self.mouseDown(event);
        });
        $(".resizeRB").css("cursor","se-resize").mousedown(function(event){
          self.action = "resize";
          self.down = true;
          self.resizeDirection = "se";
          self.mouseDown(event);
        });
        $(".resizeLT").css("cursor","nw-resize").mousedown(function(event){
          self.action = "resize";
          self.down = true;
          self.resizeDirection = "nw";
          self.mouseDown(event);
        });
        $(".resizeLB").css("cursor","sw-resize").mousedown(function(event){
          self.action = "resize";
          self.down = true;
          self.resizeDirection = "sw";
          self.mouseDown(event);
        });
      }
      if(!this.allowPageWheel){
        $(window).on("mousewheel",function(){
          self.stopScroll(event);
        })
      }
      //关闭Modal
      $(".close").click(function(event){
        self.closeModal(event);
      })
    },
    //禁止滚动
    stopScroll:function(event){
      event.preventDefault();
    },
    //鼠标摁下
    mouseDown:function(event){
      var md = $(".modal-dialog");
      this.offset.x = event.offsetX;
      this.offset.y = event.offsetY;
      this.startPoint.x = event.clientX;
      this.startPoint.y = event.clientY;

      this.t = parseInt(getComputedStyle(md.get(0)).top.replace("px",""));
      this.l = parseInt(getComputedStyle(md.get(0)).left.replace("px",""));
      this.w = parseInt(getComputedStyle(md.get(0)).width.replace("px",""));
      this.h = parseInt(getComputedStyle(md.get(0)).height.replace("px",""));
    },
    //拖拽进行
    dragMove:function(event){

      if(this.down && this.action == "drag"){
        var endPoint = {};
        endPoint.x = event.clientX;
        endPoint.y = event.clientY;
        $(".modal-dialog").css("left",endPoint.x-this.offset.x + "px");
        //保证modal在不越左边界
        if(endPoint.x <= this.offset.x) {
          $(".modal-dialog").css("left",0);
        }
        //保证modal不越右边界
        if(endPoint.x >= (this.offset.x + ($(window).width()-$(".modal-dialog").width() ))){
          $(".modal-dialog").css("left",$(window).width()-$(".modal-dialog").width()+"px");
        }
        $(".modal-dialog").css("top",endPoint.y-this.offset.y + "px");
        //保证modal不越下边界
        if(endPoint.y - this.offset.y + $(".modal-dialog").height() >= $(window).height() ) {
          $(".modal-dialog").css("top",$(window).height() - $(".modal-dialog").height() + "px");
        }
        //保证modal不越上边界
        if(endPoint.y<=this.offset.y){
          $(".modal-dialog").css("top",0);
        }
        $(".modal-dialog").css("margin-top",0);
        $(".modal-dialog").css("margin-left",0);
      }
    },
    //改变长或者宽
    resizeOneStart:function(event){
      //console.log(event.currentTarget);

      if(this.down && this.action == "resize"){
        var endPoint = {};
        endPoint.x = event.clientX;
        endPoint.y = event.clientY;
        var md = $(".modal-dialog");
        var disX = endPoint.x - this.startPoint.x;
        var disY = endPoint.y - this.startPoint.y;


        if(this.resizeDirection == "n"){
          console.log(this.t);
          md.css("top",this.t+disY + "px");
          md.css("height",this.h-disY + "px");
          console.log(disY);
        }
        if(this.resizeDirection  == "s"){
          console.log(endPoint);
          console.log(this.startPoint);
          md.css("height",this.h+disY + "px");

        }
        if(this.resizeDirection  == "w"){
          console.log(endPoint);
          md.css("left",this.l+disX + "px");
          md.css("width",this.w-disX + "px");

        }
        if(this.resizeDirection  == "e"){
          console.log(endPoint);
          md.css("width",this.w+disX + "px");

        }
        if(this.resizeDirection == "ne"){
          md.css("top",this.t+disY + "px");
          md.css("height",this.h-disY + "px");
          md.css("width",this.w+disX + "px");
        }
        if(this.resizeDirection == "se"){
          md.css("height",this.h+disY + "px");
          md.css("width",this.w+disX + "px");
        }
        if(this.resizeDirection == "nw"){
          md.css("top",this.t+disY + "px");
          md.css("height",this.h-disY + "px");
          md.css("left",this.l+disX + "px");
          md.css("width",this.w-disX + "px");
        }
        if(this.resizeDirection == "sw"){
          md.css("height",this.h+disY + "px");
          md.css("left",this.l+disX + "px");
          md.css("width",this.w-disX + "px");
        }
        //限制最小高宽
        if(md.width() <= 500){
          md.css("width","500px");
          md.css("left",this.l + "px");

        }
        if(md.height() <= 290){
          md.css("height","290px");

        }
      }
      console.log(this.down)
    },
    //初始化大小
    initSize:function(){
      var md = $(".modal-dialog");
      md.css({
        width:this.width+"px",
        height:this.height+"px",
        marginTop:-this.height/2+"px",
        marginLeft:-this.width/2+"px"
      })
    },
    //绑定回调事件
    bindHandler:function(){
      var self = this;
      $(".cancel").click(function(){
        self.cancelHandler && self.cancelHandler();
      })
      $(".confirm").click(function(){
        self.confirmHandler && self.confirmHandler();
      })
    },
    //关闭modal
    closeModal:function(event){
      var md = $(".modal");
      md.hide();
      event.stopPropagation();
    },
    //设置内容
    setContent:function(){
      $(".modal-header > p").innerHTML = this.title;
      $(".modal-body").text(this.content);
    },
    //设置主题
    setTheme:function(){
      $md = $(".modal-dialog");
      $md.removeClass();
      $md.addClass(this.type);
      $md.addClass("modal-dialog");
    },
  };
  return {
    init:init,
  }
})();