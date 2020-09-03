import $ from './lib/jquery.js'
import { cookie } from './lib/cookie.js'


(function() {
    ////////////////////总价函数////////////////////
    function sum() {
        let zj = 0
        $('.cheackred').each(function(i, elm) {
            zj += parseInt($(elm).parents('.cart-item').children('.subtotal').children().text().slice(1))
        })
        $('.cart-foot').children('.rt').children('.total').text('￥' + zj + '')

    }
    //////////////结算函数/////////////////////////
    function jiesuan() {
        if ($('.cheackred').length > 0) {
            $('.btn').addClass('red')
        } else {
            $('.btn').removeClass('red')
        }
    }
    //////////////////全选函数////////////////
    function qx() {
        let quan = $('.cheackred').length
        let cooklength = JSON.parse(cookie.get('shop')).length
        if (quan == cooklength) {
            $('.all').addClass('allc');
            // console.log(true)
        } else {
            $('.all').removeClass('allc');
        }
    }

    /////////////////已选数量//////////////////////
    function already() {
        let shu = 0
        $('.cheackred').each(function(i, elm) {
            shu += parseInt($(elm).parents('.cart-item').children('.num').children('.edit').children('input').val())
        })
        $('.cart-foot').children('.lf').children('.arealy-select').text('已选' + shu + '件')
    }


    let shop = cookie.get('shop');
    if (shop) {
        shop = JSON.parse(shop)
        let idList = shop.map(elm => elm.id).join();
        $.ajax({
            type: "get",
            url: "../php/lib/cart.php",
            data: {
                idList: idList
            },
            dataType: "json",
            success: function(response) {

                let html = ``
                response.forEach(function(elm) {
                    let idz = shop.filter(val => val.id == elm.id)
                    let picture = JSON.parse(elm.picture)
                    html += ` <div class="cart-item">
                    <div class="select">
                        <span class="cheack"></span>
                    </div>
                    <div class="images">
                        <img src="..${picture[0].src}.jpg " alt=""><span></span>
                    </div>
                    <div class="name">
                        <p>${elm.title}</p>
                    </div>
                    <div class="price">
                        <span class="p${elm.id}">￥${elm.price}</span>
                    </div>
                    <div class="num">
                    <div class="edit">
                    <a href="javascript:;" class="reduce"></a>
                    <input type="text" value="${idz[0].num}" min="1" max="${elm.num}" readonly class="numid${elm.id}">
                    <a href="javascript:;" class="add"></a>
                 </div>
                    </div>
                    <div class="subtotal">
                        <span>￥${(elm.price*idz[0].num).toFixed(2)}</span>
                    </div>
                    <div class="del">
                         <a href="javascript:;"class="T${elm.id}"></a>
                    </div>
                </div>`
                })
                $('.shangpin').append(html);
                //////////////删除功能///////////////
                $('.shangpin').on('click', '.del', function(ev) {
                        this.parentNode.parentNode.removeChild(this.parentNode)
                        shop = cookie.get("shop");
                        shop = JSON.parse(shop);
                        let did = $(ev.target).attr('class').slice(1)
                        if (shop.some(elm => elm.id == did)) {
                            shop = shop.filter(elm => elm.id != did);
                            cookie.set('shop', JSON.stringify(shop), 1)
                        }
                        already()
                    })
                    //////////////增加数量////////////////
                $('.shangpin').on('click', '.add', function(ev) {
                        let shop = cookie.get('shop');
                        shop = JSON.parse(shop)
                        let nid = $(ev.target).prev().attr('class').slice(5);
                        let num = parseInt($(ev.target).prev().val())
                        let price = parseInt($('.p' + nid + '').text().slice(1))
                        if (num < 50) {
                            $(ev.target).prev()[0].value = parseInt(num) + 1
                            $(ev.target).parents('.num').next().children().text('￥' + (num + 1) * price + '.00')
                            if (shop.some(elm => elm.id == nid)) {
                                shop.forEach(function(elm) {
                                    elm.id == nid ? elm.num++ : null
                                })
                                cookie.set('shop', JSON.stringify(shop), 1)
                            }
                        }
                        sum()
                        jiesuan()
                        already()

                    })
                    //////////////减去数量////////////////////
                $('.shangpin').on('click', '.reduce', function(ev) {
                        let shop = cookie.get('shop');
                        shop = JSON.parse(shop)
                        let nid = $(ev.target).next().attr('class').slice(5);

                        let num = parseInt($(ev.target).next().val())
                        let price = parseInt($('.p' + nid + '').text().slice(1))
                        if (num > 1) {

                            $(ev.target).next()[0].value = parseInt(num) - 1
                            $(ev.target).parents('.num').next().children().text('￥' + (num - 1) * price + '.00')
                            if (shop.some(elm => elm.id == nid)) {
                                shop.forEach(function(elm) {
                                    elm.id == nid ? elm.num-- : null
                                })
                                cookie.set('shop', JSON.stringify(shop), 1)
                            }
                        }
                        sum()
                        jiesuan()
                        already()
                    })
                    ///////////////选择//////////////////////
                $('.shangpin').on('click', '.cheack', function(ev) {
                        $(ev.target).toggleClass('cheackred')
                        sum()
                        jiesuan()
                        qx()
                        already()
                    })
                    ///////////////////全选//////////////////////////////
                $('.lf>.all').on('click', function(ev) {
                    let qx = $(ev.target).attr('class').slice(6)
                    if (qx) {
                        $(ev.target).removeClass('allc');
                        $('.cheack').removeClass('cheackred')
                    } else {
                        $(ev.target).addClass('allc');
                        $('.cheack').addClass('cheackred')
                    }
                    already()
                })


            }
        });

    }




})()