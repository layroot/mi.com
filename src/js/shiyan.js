import $ from './lib/jquery.js';
import './lib/jquery.lazyload.js';
import {
    cookie
} from './lib/cookie.js'

(function() {
        //计算价格
        function js() {
            let jis = 0;
            let shop = cookie.get('shop')
            shop = JSON.parse(shop)
                //抓取所有XZ 遍历计算出价格
            $('.xz').each(function(i, elm) {
                // console.log(elm.parentNode.parentNode.lastElementChild.previousElementSibling.children)
                // console.log($(elm).parents('.cart-item').children('.subtotal').find('span').html());
                jis += parseInt($(elm).parents('.cart-item').children('.subtotal').find('span').text().slice(1))
            })
            $('.rt>.total').text(`￥${jis}`)
            $('.arealy-select').text(`已选${$('.xz').length}件`)

            //判断选择的长度大于0就把购买亮起来
            if ($('.xz').length > 0) {
                $('.cart-foot>.btn').css({ background: '#a9010d' })
            } else {
                $('.cart-foot>.btn').css({ background: '#e7e7e7' })
            }
            //对比cookie和选中的长度，长度一样就是全选
            if ($('.xz').length == shop.length) {
                $('.lf>.cheack').addClass('ysys')
            } else {
                $('.lf>.cheack').removeClass('ysys')
            }
        }

        let shop = cookie.get('shop');

        if (shop) {

            shop = JSON.parse(shop);
            let idList = shop.map(function(elm) {
                return elm.id
            }).join()
            console.log(idList)

            $.ajax({
                        type: "get",
                        url: "../php/cart.php",
                        data: {
                            idList: idList
                        },
                        dataType: "json",
                        success: function(res) {
                                console.log(res)
                                let temp = '';
                                res.forEach((elm, i) => {
                                    let arr = shop.filter(function(val) {
                                        return val.id == elm.id
                                    })
                                    console.log(arr)
                                    let picture = JSON.parse(elm.picture);
                                    console.log(picture)
                                    temp += `
                                        <div class="cart-item">
                                        <div class="select">
                                        <span class="cheack all"></span>
                                    </div>
                                    <div class="images">
                                        <img src="..${picture[1].src}.jpg" alt=""><span></span>
                                    </div>
                                    <div class="name">
                                        <p>${elm.title}</p>
                                    </div>
                                    <div class="price">
                                        <span class="t${elm.id}">￥${elm.price}.00</span>
                                    </div>
                                    <div class="num">
                                        <div class="edit">
                                            <a href="javascript:;" class='jq'></a>
                                            <span>
                                                <span class="text" id="${arr[0].id}">${arr[0].num}</span>
                                            </span>
                                            <a href="javascript:;" class="a1 jr"></a>
                                        </div>
                                    </div>
                                    <div class="subtotal">
                                        <span class="id${arr[0].id}">￥${(elm.price*arr[0].num).toFixed(2)}</span>
                                    </div>
                                    <div class="del">
                                        <a href="javascript:;" id="${arr[0].id}"></a>
                                    </div>
                                </div>
                                    `
                                })

                                $('.shangpin').append(temp);
                                //删除功能
                                $('.shangpin').on('click', '.del>a', function(ev) {
                                    console.log($(ev.target).attr('id'))
                                    let id = $(ev.target).attr('id');
                                    let shop = cookie.get('shop')
                                    shop = JSON.parse(shop)
                                    shop = shop.filter(function(val) {
                                        return val.id != id
                                    })
                                    cookie.set('shop', JSON.stringify(shop), 1);
                                    console.log(ev.target.parentNode.parentNode)
                                        // $('.shangpin')[0].removeChild(ev.target.parentNode.parentNode)
                                    ev.target.parentNode.parentNode.remove()
                                })



                                $('.shangpin').on('click', '.jq', function(ev) {
                                    let shop = cookie.get('shop')
                                    shop = JSON.parse(shop)
                                    let id = $(this).next().children().attr('id')
                                    let a = parseInt($(this).next().children().text());
                                    let b = $('.t' + id + '').text().slice(1, 5)
                                    if (a > 0) {
                                        $(this).next().children().text(a - 1)
                                        if (shop.some(elm => elm.id == id)) {
                                            // 修改数量
                                            shop.forEach(elm => {
                                                elm.id === id ? elm.num = a - 1 : null;
                                            });
                                            cookie.set('shop', JSON.stringify(shop), 1);
                                        }
                                        $('.id' + id + '').text(`￥${parseInt($(this).next().children().text())*b}.00`)
                                        console.log($(this).next().children().text())
                                        js()
                                    }
                                })


                                $('.shangpin').on('click', '.jr', function(ev) {
                                    let shop = cookie.get('shop')
                                    shop = JSON.parse(shop)
                                    let id = $(this).prev().children().attr('id')
                                    let a = parseInt($(this).prev().children().text());
                                    let b = $('.t' + id + '').text().slice(1, 5)
                                    if (a < 20) {
                                        $(this).prev().children().text(a + 1)
                                        if (shop.some(elm => elm.id == id)) {
                                            // 修改数量
                                            shop.forEach(elm => {
                                                elm.id === id ? elm.num = a + 1 : null;
                                            });
                                            cookie.set('shop', JSON.stringify(shop), 1);
                                        }
                                        $('.id' + id + '').text(`￥${parseInt($(this).prev().children().text())*b}.00`)
                                        js()

                                    }
                                })



                                $('.shangpin').on('click', '.cheack', function(ev) {
                                    // let jis = 0;
                                    $(this).toggleClass('xz');
                                    // $('.xz').each(function(i, elm) {
                                    //     console.log(elm.parentNode.parentNode.lastElementChild.previousElementSibling.children)
                                    //     console.log($(elm).parents('.cart-item').children('.subtotal').find('span').html());
                                    //     jis += parseInt($(elm).parents('.cart-item').children('.subtotal').find('span').text().slice(1))
                                    // })
                                    // $('.rt>.total').text(`￥${jis}`)
                                    js()
                                })


                                //全选
                                $('.lf>.cheack').on('click', function() {
                                            let a = $('.lf>.cheack').attr('class').slice(7)