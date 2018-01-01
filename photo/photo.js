/*
* box   imgbox img  btnL  btnR
*
* listbox  changeL  changeR  son ul li img
*
*
* */
$(function(){
    let btnL =$('.btnL'),btnR = $('.btnR'),imgbox = $('.imgbox>img'),
        changeL = $('.changeL'),changeR = $('.changeR'),
        list = $('li'),ul = $('ul');
    let index = 0;
    let page = 0,
        maxt = 0;
    ul.outerWidth(list.outerWidth()*list.length)
    maxt = $('.son').width() - ul.outerWidth();

    btnL.click(function () {
        index--;
        if (index <  0){
            index = list.length-1;
            page = list.length/5;
        }
        list.removeClass('active').eq(index).addClass('active');
        let src = $('li').eq(index).find('img').attr('src');
        imgbox.attr('src',src);
        if(index%5 == 4){
            changeL.triggerHandler('click')
        };
    });
    btnR.click(function () {
        index++;
        if(index>=list.length){
            index = 0;
            page = -1;
        }
        list.removeClass('active').eq(index).addClass('active');
        let src = $('li').eq(index).find('img').attr('src');
        imgbox.attr('src',src);
        if(index%5 == 0){
            changeR.triggerHandler('click')
        };
    });
///////////////////换一批///////////////////////////////

    changeR.click(function(){
        let w = $('.son').width();
        if(-w*page < maxt){
            return ;
        }
        if(-w*page == maxt){
            page = -1;
        }
        page++;
        ul.css({transform:`translateX(-${w*page}px)`,transition: '1s'});

    });
    changeL.click(function(){
        let w = $('.son').width();
        if(-w*page  > 0){
            return
            /*page--;
            ul.css({transform:`translateX(-${w*page}px)`})*/
        }
        if(-w*page == 0){
            page = list.length/5;
        }
        page--;
        ul.css({transform:`translateX(-${w*page}px)`,transition: '1s'})
    });
    /////////////////////////////////////////////////
    list.on('click',function(){
        list.removeClass('active');
        $(this).addClass('active');
        let img = $('img',this);
        imgbox.attr('src',img.attr('src'));
        index = $(this).index();
        console.log(index)
    })
});
