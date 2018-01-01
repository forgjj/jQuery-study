/*
* 获取元素
*
*
* */
function $(seletor){
    return new aa(seletor);
}




function aa(seletor){
    if(typeof seletor == 'string'){
        if(/^[a-z][a-z1-6]{0,10}$/.test(seletor)){
            let element = document.getElementsByTagName(seletor);
            for (let i = 0; i < element.length; i++) {
                this[i] = element[i];
            }
            this.length = element.length;
        }else if(/^<[a-z][a-z1-6]{0,10}>$/){
            let element = document.createElement(seletor.slice(1, -1));
        }
    }else if(typeof seletor == 'function'){
        window.addEventListener('load',seletor,false);

    }else if(typeof seletor == 'object' &&  seletor.nodeType == 1){
        this[0] = seletor;
        this.length = 1;
    }
}
aa.prototype = {
    each: function (callback) {
        for (let i = 0; i < this.length; i++) {
            callback(i, this[i]);
        }
    },
    html: function (value) {
        this.each(function (index, obj) {
            obj.innerHTML = value;
        });
        return this;
    },
    css: function (attrobj) {
        this.each(function (index, obj) {
            for (i in attrobj) {
                obj.style[i] = attrobj[i];
            }
        });
        return this;
    },
    /*  css:function(attrobj){
          for(let i=0;i<this.length;i++){
              for(j in attrobj){
                  this[i].style[j]=attrobj[j];
              }
          }
      },*/
    click: function (fn) {
        this.each(function (index, obj) {
            obj.addEventListener('click', fn, false);
        });
        return this;
    },
    dblclick: function (fn) {
        this.each(function (index, obj) {
            obj.addEventListener('dblclick', fn, false);
        });
        return this;
    },
    mousedown: function (fn) {
        this.each(function (index, obj) {
            obj.addEventListener('mousedown', fn, false);
        });
        return this;
    },
//////////////////////////////////////////////
    /*调用时addClass('类名')*/
    addClass:function(className){
        this.each(function(index,obj){
            obj.classList.add(className);
        });
        return this;
    },
    removeClass:function(className){
        this.each(function(index,obj){
            obj.classList.remove(className);
        });
        return this;
    },
    /*属性*/
    attr:function(key,value){
        if(arguments.length == 1){
            return this[0].getAttribute(key);
            /* 后面不能跟链式调用  return返回的是一个值  不是this*/
        }else if(arguments.length == 2){
            this.each(function(index,obj){
                obj.setAttribute(key,value);
            });
            return this;
        }
    },
    append:function(str){
        for(let i=0;i<this.length;i++){
            let element = document.createElement(str,slice(1,-1));
            this[i].appendChild(element);
        };
        return this;
    },
    appendTo:function(select){
        let element = document.querySelectorAll(select);
        element.forEach(ele =>{
            let node = this[0].cloneNode(true);
            ele.appendChild(node);
        })
    },
    width:function(){
        return getComputedStyle(this[0],null).width;
    },
    height:function(){
        return getComputedStyle(this[0],null).height;
    },
    offsetWidth:function(){
        return this[0].offsetWidth;
    },
    offsetHeight:function(){
        return this[0].offsetHeight;
    },

}