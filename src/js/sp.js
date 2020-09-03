import $ from './lib/jquery.js'
import { cookie } from './lib/cookie.js'

(function() {
    let id = location.search.split('=')[1];
    $.ajax({
        type: "get",
        url: "../php/lib/sp.php",
        data: {
            id: id
        },
        dataType: "json",
        success: function(response) {
            let picture = JSON.parse(response.picture);
            let html = `  <div class="sp-xq">
                <div class="sp-xq-box">
                    <div class="sp-main">
                        <img src="..${picture[0].src}.jpg" alt="">
                    </div>
                    <div class="sp-main-yb">
                        <img src="..${picture[1].src}.jpg" alt="">
                        <img src="..${picture[2].src}.jpg" alt="">
                        <img src="..${picture[3].src}.jpg" alt="">
                        <img src="..${picture[4].src}.jpg" alt="">
                    </div>
                </div>
                <div class="sp-wz">
                    <div class="sp-wz-tilte">
                        <div class="good-name">
                            ${response.detail}
                        </div>
                        <div class="good-tag">
                            有品秒杀
                        </div>
                    </div>
                    <div class="summary">
                        <span class="staticWords">洗护开学焕新季</span>
                        <span class="staticWords hyperlinkWords">  ${response.brief}
                    </div>
                    <div class="promotion-wrap">
                        <span class="font-zc">促销：</span>
                        <span class="gift-type">有品秒杀</span>
                        <span class="d-gift-text">商品限购20件，超出限购数量不可购买</span>
                    </div>
                    <div class="card">
                        <div class="price-line">
                            <h5 class="sku-title">售价</h5>
                            <div class="price">
                                <span class="money-symbol">¥</span><span class="value">   ${response.price}</span><span class="market-price">¥299</span>
                            </div>
                        </div>
                        <div class="service-line">
                            <h5 class="sku-title">服务
                                <p class="icon">!</p>
                            </h5>
                            <div class="service">
                                <div class="service-item">
                                    <a href="#" class="service-a"></a>
                                    <span>满99包邮</span>
                                </div>
                                <div class="service-item">
                                    <a href="#" class="service-a"></a>
                                    <span>第三方店</span>
                                </div>
                                <br>
                                <div class="service-item">
                                    <a href="#" class="service-a"></a>
                                    <span>支持7天无理由退货 (拆封后不支持)</span>
                                </div>
                                <div class="service-item">
                                    <a href="#" class="service-a"></a>
                                    <span>有品配送</span>
                                </div>
                                <br>
                                <div class="service-item">
                                    <a href="#" class="service-a"></a>
                                    <span>由小米有品提供配送服务，杭州梦栖谷仓商贸有限公司提供售后<span class="service-item-qualification">(查看商家资质)</span></span>
                                </div>
                            </div>
    
                        </div>
                    </div>
                    <div class="address-line">
                        配送区域 北京 北京市 海淀区 有货 修改
                    </div>
                    <div class="lin-box">
                        <div class="size-line">
                            <h5 class="sku-title">颜色</h5>
                            <div class="size-container">
                                <div class="tag-item-onSelected">
                                    黑色
                                </div>
                            </div>
                        </div>
                        <div class="size-line">
                            <h5 class="sku-title">型号</h5>
                            <div class="size-container">
                                <div class="tag-item-onSelected">
                                    AS6
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="count-line">
                        <h5 class="sku-title">数量</h5>
                        <div class="minus-btn">
                            <a href="javascript:;" class="m-icons"></a>
                        </div>
                        <input type="text" class="count-input" value="1" min="1" max="${response.num}">
                        <div class="j-btn">
                            <a href="javascript:;" class="m-icons"></a>
                        </div>
                    </div>
                    <div class="btn-line">
                        <a href="javascript:;" class="ys jr">加入购物车</a>
                        <a href="javascript:;" class="gm ys">立即购买</a>
                        <div class="favor-btn ">
                            <a href="javascript:;"></a>
                            <p>收藏</p>
                        </div>
                        <div class="favor-btn ml">
                            <a href="javascript:;" class="a1"></a>
                            <p>客服</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bot">
            <div class="nav-title">
                <ul>
                    <li>产品详情</li>
                    <li>评论</li>
                    <li>常见问题</li>
                </ul>
                <img src="..${picture[5].src}.jpg"  alt="">
                <img src="..${picture[6].src}.jpg"  alt="">
                <img src="..${picture[7].src}.jpg"  alt="">
            </div>
        </div>
            `;
            $("#sp-box").append(html).find('.jr').on('click', function() {
                addItem(response.id, response.price, $('.count-input').val());
                console.log('cook')
            });
        }
    });

    function addItem(id, price, num) {
        let shop = cookie.get('shop')
        let prod = {
            id: id,
            price: price,
            num: num
        }
        if (shop) {
            shop = JSON.parse(shop);
            if (shop.some(elm => elm.id == id)) {
                shop.forEach(elm => elm.id == id ? elm.num = num : null)
            } else {
                shop.push(prod)
            }
        } else {
            shop = [];
            shop.push(prod)
        }
        cookie.set('shop', JSON.stringify(shop), 1)
    }
})();