"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("item").del();
    // Inserts seed entries
    await knex("item").insert([
        {
            name: "特濃咖啡",
            item_photo: "https://www.thespruceeats.com/thmb/DIUuY3Fj_51rINr-vN4KQD2Js24=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/what-is-espresso-765702-hero-03_cropped-ffbc0c7cf45a46ff846843040c8f370c.jpg",
            size: null,
            price: 30,
            description: "一種透過迫使接近沸騰的高壓水流通過磨成細粉的咖啡製作而成的飲料。espresso一般比其他方法製作出來的咖啡更加濃厚。",
            is_enabled: true,
            shop_id: 1,
        },
        {
            name: "朱古力咖啡",
            item_photo: "https://www.thespruceeats.com/thmb/mouqNJc2-paHkBuRRuPU7ht_L4o=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SES-mocha-4797918-hero-01-1-f8fb7ebd74914895b61366f6fc1d4b05.jpg",
            size: "小杯",
            price: 25,
            description: "摩卡咖啡是義式拿鐵咖啡的變種。和經典的義式拿鐵咖啡一樣，它通常是由三分之一的義式濃縮咖啡和三分之二的奶沫配成，不過它還會加入少量巧克力。",
            is_enabled: true,
            shop_id: 1,
        },
        {
            name: "朱古力咖啡",
            item_photo: "https://www.thespruceeats.com/thmb/mouqNJc2-paHkBuRRuPU7ht_L4o=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SES-mocha-4797918-hero-01-1-f8fb7ebd74914895b61366f6fc1d4b05.jpg",
            size: "中杯",
            price: 35,
            description: "摩卡咖啡是義式拿鐵咖啡的變種。和經典的義式拿鐵咖啡一樣，它通常是由三分之一的義式濃縮咖啡和三分之二的奶沫配成，不過它還會加入少量巧克力。",
            is_enabled: true,
            shop_id: 1,
        },
        {
            name: "朱古力咖啡",
            item_photo: "https://www.thespruceeats.com/thmb/mouqNJc2-paHkBuRRuPU7ht_L4o=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SES-mocha-4797918-hero-01-1-f8fb7ebd74914895b61366f6fc1d4b05.jpg",
            size: "大杯",
            price: 50,
            description: "摩卡咖啡是義式拿鐵咖啡的變種。和經典的義式拿鐵咖啡一樣，它通常是由三分之一的義式濃縮咖啡和三分之二的奶沫配成，不過它還會加入少量巧克力。",
            is_enabled: true,
            shop_id: 1,
        }, //4
        {
            name: "湯力咖啡",
            item_photo: "http://www.coffeeiseverywhere.com/wp-content/uploads/2022/05/3CCA8C96-DA11-4FAC-B313-CFC86BB1BB6E-scaled-e1651484438778-1024x1024.jpeg",
            size: "小杯",
            price: 25,
            description: "口味較清新,除咖啡外,亦能夠品嘗到Tonic本身的味道",
            is_enabled: true,
            shop_id: 1,
        },
        {
            name: "湯力咖啡",
            item_photo: "http://www.coffeeiseverywhere.com/wp-content/uploads/2022/05/3CCA8C96-DA11-4FAC-B313-CFC86BB1BB6E-scaled-e1651484438778-1024x1024.jpeg",
            size: "中杯",
            price: 35,
            description: "口味較清新,除咖啡外,亦能夠品嘗到Tonic本身的味道",
            is_enabled: true,
            shop_id: 1,
        },
        {
            name: "湯力咖啡",
            item_photo: "http://www.coffeeiseverywhere.com/wp-content/uploads/2022/05/3CCA8C96-DA11-4FAC-B313-CFC86BB1BB6E-scaled-e1651484438778-1024x1024.jpeg",
            size: "大杯",
            price: 50,
            description: "口味較清新,除咖啡外,亦能夠品嘗到Tonic本身的味道",
            is_enabled: true,
            shop_id: 1,
        }, //7
        {
            name: "74%朱古力咖啡",
            item_photo: "https://www.zulaykitchen.com/cdn/shop/articles/creamy-iced-chocolate-drink-813258.jpg?v=1684869407&width=1400",
            size: null,
            price: 50,
            description: "將可可粉或融化後的巧克力與熱牛奶或水混合製成的熱飲，通常配以食糖等甜味劑，並在頂層鋪上鮮奶油或棉花糖。",
            is_enabled: true,
            shop_id: 1,
        }, //8
        {
            name: "伯爵茶牛奶",
            item_photo: "https://www.dessertfortwo.com/wp-content/uploads/2021/09/London-Fog-Drink-3.jpg",
            size: null,
            price: 45,
            description: "祁門紅茶或正山小種為基底，搭配錫蘭紅茶，並添加香檸檬精油的一種調味茶。有些以調味油襯托，有些燻香製成伯爵茶，也有直接加入乾燥果皮，風味各異，隨個人口味選擇。格雷伯爵茶是二十世紀流行的調味紅茶之一。",
            is_enabled: true,
            shop_id: 1,
        }, //9
        {
            name: "蘋果花茶",
            item_photo: "https://www.mostlyhomemademom.com/wp-content/uploads/2014/10/Apple-Tea.jpg",
            size: null,
            price: 40,
            description: "蘋果花、玫瑰花、橙花，三種花搭配泡茶，口感獨特，可補血活血、調理血氣，亦有緩解鬱悶、調節內分泌及滋養子宮之效",
            is_enabled: true,
            shop_id: 1,
        },
        {
            name: "牛角酥",
            item_photo: "https://shoplineimg.com/60ace1b2fdff280069b32992/6204da4ab66e8a002ff5c8e8/800x.webp?source_format=jpg",
            size: null,
            price: 20,
            description: "正宗的牛角酥就像您在法國的傳統麵包店中一樣。由布列塔尼（法國西北部）製成，採用純正的黃油和脫脂牛奶製成，內部質感豐富而濕潤。",
            is_enabled: true,
            shop_id: 1,
        }, //11
        {
            name: "原味曲奇",
            item_photo: "https://static7.orstatic.com/useritem_photo2/item_photo/1W/1I3L/0AOPIQE45CF54E5FB5DBC9px.jpg",
            size: null,
            price: 10,
            description: "100%手造原味曲奇，日本麵粉，法國牛油，全人手製造，無防腐劑。",
            is_enabled: true,
            shop_id: 1,
        }, //12
        {
            name: "特濃碎朱古力",
            item_photo: "https://www.starbucks.com.hk/media/catalog/product/d/9/d9d7ccfa-e2f9-48a1-b171-b2fc39b6f08c.jpg",
            size: "小杯",
            price: 30,
            is_enabled: true,
            shop_id: 2,
        },
        {
            name: "特濃碎朱古力",
            item_photo: "https://www.starbucks.com.hk/media/catalog/product/d/9/d9d7ccfa-e2f9-48a1-b171-b2fc39b6f08c.jpg",
            size: "中杯",
            price: 45,
            is_enabled: true,
            shop_id: 2,
        },
        {
            name: "特濃碎朱古力",
            item_photo: "https://www.starbucks.com.hk/media/catalog/product/d/9/d9d7ccfa-e2f9-48a1-b171-b2fc39b6f08c.jpg",
            size: "大杯",
            price: 60,
            is_enabled: true,
            shop_id: 2,
        }, //15
        {
            name: "焦糖咖啡",
            item_photo: "https://www.hkppltravel.com/wp-content/uploads/2017/10/22046968_10155871862168083_2089184384121644494_n.jpg",
            size: "小杯",
            price: 30,
            is_enabled: true,
            shop_id: 2,
        },
        {
            name: "焦糖咖啡",
            item_photo: "https://www.hkppltravel.com/wp-content/uploads/2017/10/22046968_10155871862168083_2089184384121644494_n.jpg",
            size: "中杯",
            price: 45,
            is_enabled: true,
            shop_id: 2,
        },
        {
            name: "焦糖咖啡",
            item_photo: "https://www.hkppltravel.com/wp-content/uploads/2017/10/22046968_10155871862168083_2089184384121644494_n.jpg",
            size: "大杯",
            price: 60,
            is_enabled: true,
            shop_id: 2,
        }, //18
        {
            name: "草莓香蕉",
            item_photo: "https://hips.hearstapps.com/hmg-prod/images/%E8%8D%89%E8%8E%93%E8%84%86%E7%89%87%E5%84%AA%E6%A0%BC%E6%98%9F%E5%86%B0%E6%A8%82-1596447052.jpg?crop=0.906xw:0.856xh;0,0.0690xh&resize=980:*",
            size: "小杯",
            price: 30,
            is_enabled: true,
            shop_id: 2,
        },
        {
            name: "草莓香蕉",
            item_photo: "https://hips.hearstapps.com/hmg-prod/images/%E8%8D%89%E8%8E%93%E8%84%86%E7%89%87%E5%84%AA%E6%A0%BC%E6%98%9F%E5%86%B0%E6%A8%82-1596447052.jpg?crop=0.906xw:0.856xh;0,0.0690xh&resize=980:*",
            size: "中杯",
            price: 45,
            is_enabled: true,
            shop_id: 2,
        },
        {
            name: "草莓香蕉",
            item_photo: "https://hips.hearstapps.com/hmg-prod/images/%E8%8D%89%E8%8E%93%E8%84%86%E7%89%87%E5%84%AA%E6%A0%BC%E6%98%9F%E5%86%B0%E6%A8%82-1596447052.jpg?crop=0.906xw:0.856xh;0,0.0690xh&resize=980:*",
            size: "大杯",
            price: 60,
            is_enabled: true,
            shop_id: 2,
        }, //21
        {
            name: "抹茶鮮奶",
            item_photo: "https://scontent.fhkg1-1.fna.fbcdn.net/v/t1.6435-9/169599768_4088979471148880_6015386424458508891_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=GzGTiPHAMJMAX8u1-yZ&_nc_ht=scontent.fhkg1-1.fna&oh=00_AfD-Xf06HCzmJ09EjcTjMdRmnPlBRZeA-Mima5RFJ6WF5Q&oe=65F1E446",
            size: null,
            price: 30,
            is_enabled: true,
            shop_id: 2,
        },
        {
            name: "英式奶茶",
            item_photo: "https://img.ltn.com.tw/Upload/food/page/2016/12/18/161218-5035-0-ZGAHx.jpg",
            size: null,
            price: 30,
            is_enabled: true,
            shop_id: 2,
        },
        {
            name: "希臘式雞肉烤卷",
            item_photo: "https://image.aigens.com/4ufLH8FyFl7zy7K17LuS-p_jPxUPBsGDtdacUQRJUBBbumwTTiy_3l9Brn5Etgk0GG68LHBnk7RVPpic_m1mUXopxUfrjCiuxOASiDohig=w500-rw",
            size: null,
            price: 50,
            is_enabled: true,
            shop_id: 2,
        },
    ]);
}
exports.seed = seed;
