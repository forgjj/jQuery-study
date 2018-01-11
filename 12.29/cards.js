/*
* 获取牌 52 4色 13
*
* */

$(function(){
    let poke = [],
        colorArr = ['r','b','h','f'];
    let flag = {};
    let table = $('.table');
    let first = null;
    let leftbtn = $('.leftbtn');
    let rightbtn = $('.rightbtn');
/*    for(let i = 0;i<52;i++){
        let obj = {};
        let color = colorArr[Math.floor(Math.random()*4)],
            num = Math.floor(Math.random()*13+1);
        do{
            color = colorArr[Math.floor(Math.random()*4)];
            num = Math.floor(Math.random()*13+1);
        }while (flag[color+'_'+num]);
        poke.push(color,num);
        flag[color+'_'+num] = true;
    }*/

   while(poke.length<52){
        let obj = {};
        let color = colorArr[Math.floor(Math.random()*4)],
            num = Math.floor(Math.random()*13+1);
        if(!flag[color+'_'+num]){
            poke.push({color,num});
            /*  放入为对象 */
            flag[color+'_'+num] = true;
        }
   }
    /*
    * 双遍历
    * 1000  500 (90 140)
    *  500 - 50*i + 100*j
    * */
    let index = 0;
    for(let i = 0;i<7;i++){
        for(let j = 0;j<=i;j++){
            let left = 550 - 50*i + 100*j,
                top = 50*i;
            let divs = $('<div>');
            index++;
            divs
                .addClass('poke')
                .data('num',poke[index].num)
                /* data 在元素上存放或读取数据 */
                .css({backgroundImage:`url("img/${poke[index]['color']}_${poke[index]['num']}.png")`,backgroundSize:'cover',zIndex:index})
                .appendTo('.table')
                .attr('id',`${i}_${j}`)
                .delay(index*60)
                .animate({
                left,top,opacity:1
            });

        }
   }
   for(;index < poke.length;index++){
        let divs = $('<div>');
        divs
            .attr('id',-2+'_'+-2)
            /* 添加属性 */
            .addClass('poke')
            .addClass('left')
            .data('num',poke[index].num)
            .appendTo('.table')
            .css({backgroundImage:`url("img/${poke[index]['color']}_${poke[index]['num']}.png")`,backgroundSize:'cover',zIndex:index})
            .delay(index*60)
            .animate({
            left:50,top:500,opacity:1
        });

    }

    ///////////////// 游戏 //////////////////////////////////
   table.on('click','.poke',function(){
        /*  .poke 事件委派 */
        let coords = $(this).attr('id').split('_');

        /*
        *           (x,y)
        *      (x+1,y)(x+1,y+1)
        * */
        if($(`#${coords[0]*1+1}_${coords[1]*1}`).length||$(`#${coords[0]*1+1}_${coords[1]*1+1}`).length){
            return ;
        }
        if($(this).hasClass('active')){
            $(this).animate({top:'+=20'});
        }else{
            $(this).animate({top:'-=20'});
        }
        $(this).toggleClass('active');
        if(!first){
            first = $(this);
        }else{
            if(first.data('num')+$(this).data('num') == 14){
                $('.active').animate({
                    top:0,
                    left:900
                },function () {
                    $(this).remove();
                });

            }else{
                $('.active').animate({top:'+=20'},function(){
                    $(this).removeClass('active')
                });
            }
            first = null;
        }

    });
    //////////////////////////////////////////////////
    // let zIndex = 0;
   rightbtn.on('click',function(){
        if(!$('.left').length){
            return ;
        }
        // zIndex++;
        // $('.left').last().removeClass('left').addClass('right').css({zIndex}).animate({left:'+=1000'})
        $('.left').last().css({zIndex:function(){
           return $('.right:first').css('zIndex')*1+1;

       }}).removeClass('left').addClass('right').animate({left:'+=1000'})
   });

    leftbtn.on('click',function(){
        if(!$('.right').length){
            return ;
        }
        // $('.right').first().animate({left:'-=1000'},function(){
        //     $(this).removeClass('right').addClass('left');
        // })
        $('.right').each(function(index,obj){
            let zIndex = $('.right').eq(-1).css('zIndex')*1+1;
            $(this).removeClass('right').addClass('left').delay(index*40).animate({left:'-=1000',zIndex:51})
        })
    })

});
