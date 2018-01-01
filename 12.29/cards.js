/*
* 获取牌 52 4色 13
*
* */

$(function(){
    let poke = [],
        colorArr = ['r','b','h','f'];
    let flag = {};
/*    for(let i = 0;i<52;i++){
        let obj = {};
        let color = colorArr[Math.floor(Math.random()*4)],
            num = Math.floor(Math.random()*13+1);
        do{
            color = colorArr[Math.floor(Math.random()*4)];
                num = Math.floor(Math.random()*13+1);
        }while (flag[color+'_'+num]);
        poke.push(color+'-'+num);
        flag[color+'_'+num] = true;
    }*/

    while(poke.length<52){
        let obj = {};
        let color = colorArr[Math.floor(Math.random()*4)],
            num = Math.floor(Math.random()*13+1);
        if(!flag[color+'_'+num]){
            while (flag[color+'_'+num]);
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
            let left = 450 - 50*i + 100*j,
                top = 50*i;
            index++;
            let divs = $('<div>');
            divs.addClass('poke').appendTo('.table').delay(index*100).animate({
                left,top,opacity:1
            })
        }

        console.log(index)
        for(let i = index;i<52-index;i++){
            let divs = $('<div>');
            let left = 50,
                top = 70;
            divs.addClass('poke').appendTo('.table').delay(index*100).animate({
                left,top,opacity:1
            })
    }


    }

});
