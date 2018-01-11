$(function () {
    let poke = [],
        colorArr = ['r','b','h','f'];
    let flag = {};
    let table = $('.table');
    let first=null;
    while (poke.length < 52) {
        let obj = {};
        let color = colorArr[Math.floor(Math.random() * 4)],
            num = Math.floor(Math.random() * 13 + 1);
        if (!flag[color + '_' + num]) {
            poke.push({color, num});
            flag[color + '_' + num] = true;
        }
    }
    let index = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j <= i; j++) {
            let left = 740 - 60 * i + 120 * j,
                top = 60 * i;
            let divs = $('<div>');
            divs
                .addClass('poke')
                .data('num',poke[index].num)
                .attr('id', `${i}_${j}`)
                .css({backgroundImage: `url('img/${poke[index]['color']}_${poke[index]['num']}.jpg')`})
                .appendTo('.table')
                .delay(index * 80)
                .animate({
                    left, top, opacity: 1
                });
            index++;
        }
    }
    // console.log(color);
    for (; index < poke.length; index++) {
        let divs = $('<div>');
        divs
            .attr('id',-2+'_'+-2)
            .data('num',poke[index].num)
            .css({backgroundImage: `url('img/${poke[index]['color']}_${poke[index]['num']}.jpg')`})
            .addClass('poke').appendTo('.table')
            .delay(index * 80)
            .animate({
                left:20, bottom: 10, opacity: 1
            });
    }

    // 游戏
    table.on('click', '.poke', function () {
        let coords = $(this).attr('id').split('_');
        if ($(`#${coords[0] * 1 + 1}_${coords[1] * 1 + 1}`).length || $(`#${coords[0] * 1 + 1}_${coords[1] * 1}`).length) {
            return;
        }

        if ($(this).hasClass('active')) {
            $(this).animate({top: '+=30'});
        } else {
            $(this).animate({top: '-=30'});
        }
        $(this).toggleClass('active');

        if (!first){
            first=$(this);
        }else {
            if (first.data('num')+$(this).data('num')==14){
                $('.active').animate({
                    top:0,left:1600-120
                },function () {
                    $(this).remove()
                });

            }else {
                $('.active').animate({top:'+=30'},function () {
                    $(this).removeClass('active')
                });
            }
            first=null;
        }
    });
});