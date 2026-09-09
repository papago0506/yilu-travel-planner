const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const money = (value) => `¥${Math.round(value).toLocaleString("zh-CN")}`;

const destinationProfiles = {
  "东京": {
    route: ["浅草", "银座", "镰仓", "涩谷"],
    areas: ["浅草", "上野", "新宿", "银座", "涩谷", "日本桥"],
    stations: ["浅草站", "上野站", "新宿站", "东银座站", "涩谷站", "日本桥站"],
    highlights: [
      ["浅草寺", "隅田公园", "晴空塔"],
      ["明治神宫", "表参道", "涩谷 SKY"],
      ["镰仓高校前", "长谷寺", "江之岛"],
      ["筑地场外", "银座", "东京站"],
      ["上野公园", "秋叶原", "神保町"],
      ["代官山", "中目黑", "羽田机场"]
    ],
    shopping: ["表参道", "银座", "秋叶原", "代官山"],
    buys: [
      ["限定伴手礼", "东京香蕉 / NY 奶油夹心饼", "机场或东京站买，注意保质期"],
      ["药妆日用", "防晒、眼药水、面膜", "松本清与大国价差可顺路比"],
      ["文具手账", "Traveler's Notebook / 百乐", "银座伊东屋品类最集中"],
      ["生活器物", "中川政七商店 / 无印限定", "优先日本桥与银座门店"],
      ["动漫周边", "角色限定与扭蛋", "秋叶原先列清单再集中购买"],
      ["中古好物", "相机、腕表、设计师单品", "确认成色、保修与退税条件"]
    ]
  },
  "大阪": {
    route: ["大阪城", "梅田", "京都", "心斋桥"], areas: ["难波", "心斋桥", "梅田", "天王寺", "本町", "大阪城"], stations: ["难波站", "心斋桥站", "大阪站", "天王寺站", "本町站", "森之宫站"],
    highlights: [["大阪城", "中之岛", "梅田蓝天大厦"], ["清水寺", "二年坂", "祇园"], ["奈良公园", "东大寺", "春日大社"], ["黑门市场", "心斋桥", "道顿堀"], ["通天阁", "天王寺", "阿倍野"], ["中崎町", "梅田", "关西机场"]],
    shopping: ["梅田", "祇园", "心斋桥", "天王寺"], buys: [["关西点心", "呼吸巧克力 / 月化妆", "关西机场集中补货"], ["厨房用品", "堺刀 / 章鱼烧工具", "道具屋筋选择最多"], ["药妆日用", "防晒与家庭常备品", "心斋桥多店比价"], ["任天堂周边", "大阪限定商品", "大丸梅田店提前取号"], ["京都工艺", "清水烧与香具", "选择可随身携带的小件"], ["中古服饰", "美式复古与设计师品牌", "美国村按楼层慢慢逛"]]
  },
  "曼谷": {
    route: ["大皇宫", "暹罗", "水上市场", "通罗"], areas: ["暹罗", "素坤逸", "是隆", "通罗", "河畔", "阿索克"], stations: ["Siam 站", "Asok 站", "Sala Daeng 站", "Thong Lo 站", "Saphan Taksin 站", "Phrom Phong 站"],
    highlights: [["大皇宫", "卧佛寺", "郑王庙"], ["吉姆汤普森之家", "暹罗商圈", "四面佛"], ["美功铁道", "丹嫩沙多", "河畔夜市"], ["乍都乍", "阿里区", "胜利纪念碑"], ["通罗", "Emsphere", "素坤逸"], ["伦披尼公园", "ICONSIAM", "机场"]],
    shopping: ["暹罗", "河畔夜市", "乍都乍", "Emsphere"], buys: [["泰式零食", "小老板海苔 / 榴莲干", "商超采购更稳妥"], ["香氛护理", "本土香薰与精油", "确认液体托运限制"], ["手工织物", "泰丝包与小件家饰", "关注材质而非只看图案"], ["设计品牌", "本土服饰与首饰", "暹罗中心品牌最集中"], ["药妆好物", "青草膏与鼻通", "正规连锁药房购买"], ["料理食材", "咖喱酱与冬阴功料", "选择密封小包装"]]
  },
  "西班牙": {
    displayName: "西班牙 · 巴塞罗那",
    searchCity: "巴塞罗那",
    image: "assets/barcelona.jpg",
    imageAlt: "巴塞罗那圣家堂与城市街区",
    route: ["圣家堂", "格拉西亚", "哥特区", "蒙锥克"],
    areas: ["扩展区", "哥特区", "格拉西亚", "圣徒区", "博恩区", "加泰罗尼亚广场"],
    stations: ["Passeig de Gràcia", "Liceu", "Diagonal", "Sants Estació", "Jaume I", "Catalunya"],
    highlights: [
      ["圣家堂", "圣十字圣保罗医院", "格拉西亚"],
      ["古埃尔公园", "巴特罗之家", "米拉之家"],
      ["哥特区", "巴塞罗那主教座堂", "El Born"],
      ["蒙锥克山", "MNAC", "西班牙村"],
      ["巴塞罗内塔海滩", "Port Vell", "兰布拉大道"],
      ["博盖利亚市场", "格拉西亚大道", "BCN 机场"]
    ],
    shopping: ["格拉西亚", "El Born", "兰布拉大道", "博盖利亚市场", "格拉西亚大道"],
    buys: [
      ["橄榄油与罐头", "特级初榨橄榄油 / 海鲜罐头", "博盖利亚市场或大型超市购买，留意托运限制"],
      ["伊比利亚火腿", "真空包装火腿与腊肠", "确认入境检疫规则后再购买"],
      ["西班牙皮具", "皮鞋、钱包与小型皮件", "格拉西亚大道与本地品牌店款式更集中"],
      ["陶瓷手工艺", "加泰罗尼亚花砖与餐具", "哥特区选择多，易碎品建议随身携带"],
      ["本土香氛", "Carner Barcelona 等城市香氛", "先试香，再比较退税门槛"],
      ["城市纪念品", "巴萨 / 高迪建筑主题周边", "优先官方商店与博物馆商店" ]
    ],
    flightAirlines: ["东方航空", "中国国际航空", "阿联酋航空", "卡塔尔航空", "法国航空", "汉莎航空", "荷兰皇家航空", "土耳其航空", "瑞士国际航空", "英国航空", "国泰航空", "芬兰航空"],
    flightPlatforms: ["携程", "飞猪", "阿联酋航空官网", "卡塔尔航空官网", "法国航空官网", "汉莎航空官网", "荷兰皇家航空官网", "土耳其航空官网", "携程", "飞猪", "国泰航空官网", "芬兰航空官网"],
    flightBasePrice: 4680,
    flightDuration: 870
  }
};

const destinationAliases = { "巴塞罗那": "西班牙", "Barcelona": "西班牙", "barcelona": "西班牙", "Spain": "西班牙", "spain": "西班牙" };

const fallbackProfile = {
  route: ["老城", "城市地标", "近郊", "购物街区"],
  areas: ["市中心", "老城区", "中央车站", "商业区", "河畔", "文化街区"],
  stations: ["中心站", "老城站", "中央站", "商业街站", "河畔站", "博物馆站"],
  highlights: [["城市地标", "老城街区", "观景台"], ["城市公园", "美术馆", "主商业街"], ["近郊小镇", "自然景点", "特色街区"], ["中央市场", "历史建筑", "夜景街区"], ["当地博物馆", "书店街", "创意园区"], ["社区早餐", "伴手礼采购", "机场"]],
  shopping: ["主商业街", "特色街区", "中央市场", "伴手礼商店"],
  buys: [["地方点心", "当地限定口味", "留意保质期与入境限制"], ["设计纪念品", "博物馆与城市限定", "优先正版授权商店"], ["手工艺品", "本地材质小件", "易碎品建议随身携带"], ["生活用品", "本土口碑品牌", "先比价再集中购买"], ["咖啡茶饮", "当地烘焙与茶包", "选择密封小包装"], ["市集好物", "独立设计与古着", "确认退换规则"]]
};

const airlines = ["东方航空", "春秋航空", "吉祥航空", "全日空", "日本航空", "国航", "南方航空", "乐桃航空", "厦门航空", "海南航空", "东航", "全日空"];
const platforms = ["携程", "飞猪", "东方航空官网", "全日空官网", "日本航空官网", "携程", "飞猪", "乐桃航空官网", "携程", "飞猪", "航司官网", "携程"];
const hotelCatalogs = {
  "东京": [
    ["浅草格拉斯丽", "浅草", "浅草站"], ["上野诺加", "上野", "上野站"],
    ["新宿世纪南悦", "新宿", "新宿站"], ["银座索拉里亚", "银座", "东银座站"],
    ["涩谷东急卓越", "涩谷", "涩谷站"], ["日本桥三井花园", "日本桥", "日本桥站"],
    ["秋叶原华盛顿", "秋叶原", "秋叶原站"], ["御茶水龙名馆", "御茶水", "御茶水站"],
    ["赤坂日航城市", "赤坂", "赤坂站"], ["两国第一", "两国", "两国站"],
    ["六本木雷姆", "六本木", "六本木站"], ["池袋大都会", "池袋", "池袋站"]
  ],
  "西班牙": [
    ["Catalonia Passeig de Gràcia", "扩展区", "Passeig de Gràcia"],
    ["Room Mate Anna", "扩展区", "Passeig de Gràcia"],
    ["Praktik Bakery", "扩展区", "Diagonal"],
    ["Casa Gracia Barcelona", "格拉西亚", "Diagonal"],
    ["Hotel España Ramblas", "哥特区", "Liceu"],
    ["Hotel Barcelona Catedral", "哥特区", "Jaume I"],
    ["H10 Madison", "哥特区", "Jaume I"],
    ["Chic & Basic Born Boutique", "博恩区", "Jaume I"],
    ["Barceló Sants", "圣徒区", "Sants Estació"],
    ["Hotel Denit Barcelona", "加泰罗尼亚广场", "Catalunya"],
    ["Yurbban Passage Hotel & Spa", "加泰罗尼亚广场", "Catalunya"],
    ["Hotel Jazz", "加泰罗尼亚广场", "Catalunya"]
  ]
};
const airportCodes = { "上海": "sha", "东京": "tyo", "大阪": "osa", "曼谷": "bkk", "西班牙": "bcn", "巴塞罗那": "bcn", "北京": "bjs", "广州": "can", "深圳": "szx", "成都": "ctu", "杭州": "hgh", "重庆": "ckg", "西安": "sia", "香港": "hkg" };

const knownOriginLocations = {
  "上海": { name: "上海", country: "中国", countryCode: "CN", lat: 31.2304, lon: 121.4737 },
  "北京": { name: "北京", country: "中国", countryCode: "CN", lat: 39.9042, lon: 116.4074 },
  "广州": { name: "广州", country: "中国", countryCode: "CN", lat: 23.1291, lon: 113.2644 },
  "深圳": { name: "深圳", country: "中国", countryCode: "CN", lat: 22.5431, lon: 114.0579 },
  "成都": { name: "成都", country: "中国", countryCode: "CN", lat: 30.5728, lon: 104.0668 },
  "杭州": { name: "杭州", country: "中国", countryCode: "CN", lat: 30.2741, lon: 120.1551 },
  "重庆": { name: "重庆", country: "中国", countryCode: "CN", lat: 29.4316, lon: 106.9123 },
  "西安": { name: "西安", country: "中国", countryCode: "CN", lat: 34.3416, lon: 108.9398 },
  "香港": { name: "香港", country: "中国", countryCode: "HK", lat: 22.3193, lon: 114.1694 }
};

const fullyCuratedDestinations = new Set(["东京", "西班牙"]);
const resourceCache = { airports: null, countries: null };
const dynamicFallbackLabels = {
  classic: ["城市历史中心", "代表性建筑区", "当地博物馆", "城市公园", "文化街区", "滨水或观景区", "历史街巷", "艺术文化区", "城市公共广场", "特色社区", "当地展馆", "城市地标区", "近郊风景区", "传统街区"],
  shopping: ["主要商业街", "本地市场", "设计品牌街区", "大型购物中心", "伴手礼集中区", "当地生活市集"],
  areas: ["市中心", "历史城区", "中央车站周边", "核心商圈", "文化区", "交通枢纽周边"]
};

const transportGuides = {
  "东京": {
    hub: "浅草站",
    feeders: {
      "浅草站": [0, "从酒店步行至浅草站", "从浅草站步行返回酒店"],
      "上野站": [12, "上野站乘银座线直达浅草站", "浅草站乘银座线直达上野站"],
      "新宿站": [34, "新宿西口站乘大江户线至藏前，换都营浅草线至浅草站", "浅草站乘都营浅草线至藏前，换大江户线至新宿西口站"],
      "东银座站": [18, "东银座站乘都营浅草线直达浅草站", "浅草站乘都营浅草线直达东银座站"],
      "涩谷站": [38, "涩谷站乘银座线直达浅草站", "浅草站乘银座线直达涩谷站"],
      "日本桥站": [13, "日本桥站乘银座线直达浅草站", "浅草站乘银座线直达日本桥站"],
      "秋叶原站": [15, "秋叶原站乘日比谷线至上野，换银座线至浅草站", "浅草站乘银座线至上野，换日比谷线至秋叶原站"],
      "御茶水站": [22, "御茶水站乘 JR 总武线至浅草桥，换都营浅草线至浅草站", "浅草站乘都营浅草线至浅草桥，换 JR 总武线至御茶水站"],
      "赤坂站": [31, "赤坂站乘千代田线至表参道，换银座线至浅草站", "浅草站乘银座线至表参道，换千代田线至赤坂站"],
      "两国站": [18, "两国站乘都营大江户线至藏前，换都营浅草线至浅草站", "浅草站乘都营浅草线至藏前，换大江户线至两国站"],
      "六本木站": [35, "六本木站乘日比谷线至上野，换银座线至浅草站", "浅草站乘银座线至上野，换日比谷线至六本木站"],
      "池袋站": [38, "池袋站乘丸之内线至赤坂见附，换银座线至浅草站", "浅草站乘银座线至赤坂见附，换丸之内线至池袋站"]
    },
    days: [
      [
        ["步行", 8, "从浅草站 1 号口沿雷门通步行约 550 米", "雷门入口到达；上午 9 点前人流较少"],
        ["步行", 10, "从宝藏门向东，经二天门步行约 750 米", "由隅田公园西侧入口进入"],
        ["步行", 22, "沿隅田川向北，过言问桥后沿塔景通前往", "全程约 1.6 公里；雨天可改乘都营浅草线"],
        ["地铁", 16, "押上站乘都营浅草线，在浅草站下车", "2 站直达；A3 口出站后步行回酒店"]
      ],
      [
        ["地铁", 42, "浅草站乘银座线至表参道，换乘千代田线至明治神宫前", "表参道站站内换乘；2 号口出站"],
        ["步行", 14, "从原宿口沿神宫桥、表参道步行约 1 公里", "从表参道北端开始逛，顺路不折返"],
        ["地铁", 15, "表参道站乘银座线至涩谷站", "1 站；B6 口出站后步行约 6 分钟"],
        ["地铁", 38, "涩谷站乘银座线直达浅草站", "18 站无需换乘；1 号口出站"]
      ],
      [
        ["铁路", 95, "浅草站乘都营浅草线至新桥，换乘 JR 横须贺线至镰仓，再换江之电", "镰仓站换乘江之电，在镰仓高校前下车"],
        ["电车", 18, "镰仓高校前站乘江之电至长谷站", "5 站；出站步行约 6 分钟到长谷寺"],
        ["电车", 24, "长谷站乘江之电至江之岛站", "8 站；出站后沿商店街步行前往海边"],
        ["铁路", 105, "江之岛站乘江之电至藤泽，换 JR 东海道线至新桥，再换都营浅草线", "新桥站按 A 线标识换乘，浅草站 A3 口出"]
      ],
      [
        ["地铁", 31, "浅草站乘都营浅草线至东银座，换日比谷线至筑地", "东银座站同站换乘；1 号口出站"],
        ["步行", 13, "沿晴海通步行约 900 米前往银座四丁目", "经过歌舞伎座，可顺路停留"],
        ["地铁", 12, "银座站乘丸之内线至东京站", "2 站；M8 口连接丸之内地下通道"],
        ["地铁", 24, "东京站乘丸之内线至银座，换银座线直达浅草", "银座站换乘约步行 5 分钟；1 号口出"]
      ],
      [
        ["地铁", 12, "浅草站乘银座线至上野站", "3 站；公园口方向 7 号口出"],
        ["铁路", 12, "上野站乘 JR 山手线或京滨东北线至秋叶原", "2 站；电器街口出站"],
        ["地铁", 18, "步行至岩本町站，乘都营新宿线至神保町", "1 站；A7 口出站即到书店街"],
        ["地铁", 27, "神保町站乘半藏门线至三越前，换银座线至浅草", "三越前站换乘；浅草 1 号口出"]
      ],
      [
        ["地铁", 46, "浅草站乘银座线至涩谷，换东急东横线至代官山", "涩谷站按 TY 标识换乘；北口出站"],
        ["步行", 16, "沿旧山手通向南，经过西乡山公园前往中目黑", "约 1.2 公里，下坡路段较多"],
        ["地铁", 54, "中目黑站乘日比谷线至东银座，换都营浅草线机场快特至羽田机场", "确认列车终点为羽田方向；国际线按航站楼下车"]
      ]
    ]
  },
  "大阪": {
    hub: "难波站",
    feeders: {
      "难波站": [0, "从酒店步行至难波站", "从难波站步行返回酒店"],
      "心斋桥站": [5, "心斋桥站乘御堂筋线至难波站", "难波站乘御堂筋线至心斋桥站"],
      "大阪站": [16, "步行至梅田站，乘御堂筋线至难波站", "难波站乘御堂筋线至梅田站，步行至大阪站"],
      "天王寺站": [11, "天王寺站乘御堂筋线至难波站", "难波站乘御堂筋线至天王寺站"],
      "本町站": [8, "本町站乘御堂筋线至难波站", "难波站乘御堂筋线至本町站"],
      "森之宫站": [22, "森之宫站乘中央线至本町，换御堂筋线至难波站", "难波站乘御堂筋线至本町，换中央线至森之宫站"]
    },
    days: [
      [["地铁", 28, "难波站乘千日前线至谷町九丁目，换谷町线至谷町四丁目", "9 号口出站，步行约 12 分钟到大阪城"], ["地铁", 22, "谷町四丁目站乘谷町线至天满桥，再换京阪本线至北滨", "26 号口出站，沿河步行进入中之岛"], ["地铁", 18, "淀屋桥站乘御堂筋线至梅田站", "1 站；5 号口前往蓝天大厦方向"], ["地铁", 16, "梅田站乘御堂筋线直达难波站", "4 站；北东检票口出"]],
      [["地铁+铁路", 72, "难波站乘御堂筋线至淀屋桥，换京阪本线至清水五条", "4 号口出站后上坡步行约 20 分钟"], ["步行", 12, "从清水寺沿松原通下行至二年坂", "石板坡湿滑，雨天放慢速度"], ["步行", 22, "经宁宁之道、八坂神社步行至祇园", "约 1.6 公里，沿途可分段休息"], ["铁路+地铁", 65, "祇园四条站乘京阪本线至淀屋桥，换御堂筋线至难波", "淀屋桥站换乘步行约 7 分钟"]],
      [["铁路", 48, "大阪难波站乘近铁奈良线快速急行至近铁奈良", "东改札 2 号口出，步行前往奈良公园"], ["步行", 18, "沿登大路向东步行约 1.3 公里", "穿过奈良公园后抵达东大寺南大门"], ["步行", 20, "从东大寺沿林间参道向南步行", "经水谷茶屋后抵达春日大社"], ["铁路", 55, "步行回近铁奈良站，乘快速急行直达大阪难波", "晚高峰预留候车时间"]],
      [["步行", 10, "从难波站沿堺筋方向步行约 700 米", "黑门市场西口进入"], ["步行", 16, "从黑门市场沿千日前通向西，再向北进入心斋桥筋", "约 1.2 公里，沿途经过道具屋筋"], ["步行", 12, "沿心斋桥筋向南步行至戎桥", "戎桥即道顿堀主要拍照点"], ["步行", 9, "沿戎桥筋向南返回难波站", "地下街入口可避雨"]],
      [["地铁", 14, "难波站乘御堂筋线至动物园前", "5 号口出站，步行约 7 分钟"], ["地铁", 13, "动物园前站乘御堂筋线至天王寺", "1 站；从 10 号口进入天王寺公园"], ["步行", 9, "穿过天王寺公园步行至阿倍野 HARUKAS", "由近铁百货 B1 层入口进入"], ["地铁", 11, "天王寺站乘御堂筋线直达难波", "3 站；北东检票口出"]],
      [["地铁", 18, "难波站乘御堂筋线至梅田，步行至中崎町", "梅田站 5 号口出，步行约 12 分钟"], ["步行", 15, "从中崎町沿都岛通向西南返回梅田商圈", "以茶屋町为终点，沿途咖啡店集中"], ["铁路", 56, "大阪站乘 JR 关空快速直达关西机场", "坐前 4 节车厢；部分班次在日根野分离"]]
    ]
  },
  "曼谷": {
    hub: "Siam 站",
    feeders: {
      "Siam 站": [0, "从酒店步行至 Siam 站", "从 Siam 站步行返回酒店"],
      "Asok 站": [16, "Asok 站乘 BTS 素坤逸线至 Siam 站", "Siam 站乘 BTS 素坤逸线至 Asok 站"],
      "Sala Daeng 站": [8, "Sala Daeng 站乘 BTS 是隆线至 Siam 站", "Siam 站乘 BTS 是隆线至 Sala Daeng 站"],
      "Thong Lo 站": [20, "Thong Lo 站乘 BTS 素坤逸线至 Siam 站", "Siam 站乘 BTS 素坤逸线至 Thong Lo 站"],
      "Saphan Taksin 站": [20, "Saphan Taksin 站乘 BTS 是隆线至 Siam 站", "Siam 站乘 BTS 是隆线至 Saphan Taksin 站"],
      "Phrom Phong 站": [17, "Phrom Phong 站乘 BTS 素坤逸线至 Siam 站", "Siam 站乘 BTS 素坤逸线至 Phrom Phong 站"]
    },
    days: [
      [["轻轨+地铁", 36, "Siam 站乘 BTS 素坤逸线至 Asok，步行换乘 MRT Sukhumvit 至 Sanam Chai", "1 号口出站，步行约 12 分钟到大皇宫"], ["步行", 12, "沿 Maha Rat 路向南步行约 850 米", "卧佛寺北门进入"], ["轮渡", 14, "从 Tha Tien 码头乘跨河轮渡至 Wat Arun 码头", "船程约 5 分钟，含候船时间"], ["轮渡+轻轨", 42, "轮渡返回 Tha Tien，乘接驳船至 Sathorn，换 BTS 至 Siam", "Saphan Taksin 站换乘 BTS"]],
      [["轻轨", 9, "Siam 站乘 BTS 是隆线至 National Stadium", "1 站；1 号口出站步行约 6 分钟"], ["步行", 14, "沿 Rama I 路向东步行返回暹罗商圈", "从 Siam Discovery 开始顺路逛"], ["轻轨", 12, "Siam 站乘 BTS 素坤逸线至 Chit Lom", "1 站；8 号口通过空中连廊前往四面佛"], ["轻轨", 8, "Chit Lom 站乘 BTS 至 Siam", "1 站直达"]],
      [["小巴", 95, "从胜利纪念碑附近旅行站乘预约小巴前往美功铁道市场", "建议 07:00 前出发，含市区接驳"], ["包车", 35, "美功市场乘预约车辆前往丹嫩沙多水上市场", "该段无便捷轨道交通，拼车更省时"], ["包车", 95, "从水上市场返回市区河畔夜市 Asiatique", "下午易堵车，预留 20 分钟浮动"], ["船+轻轨", 35, "Asiatique 乘接驳船至 Sathorn，换 BTS 至 Siam", "末班船前完成返程"]],
      [["轻轨", 28, "Siam 站乘 BTS 素坤逸线至 Mo Chit", "1 号口出站，步行约 7 分钟到乍都乍"], ["轻轨", 13, "Mo Chit 站乘 BTS 至 Ari", "3 站；3 号口出站"], ["轻轨", 10, "Ari 站乘 BTS 至 Victory Monument", "2 站；4 号口出站"], ["轻轨", 12, "Victory Monument 站乘 BTS 直达 Siam", "3 站"]],
      [["轻轨", 20, "Siam 站乘 BTS 素坤逸线至 Thong Lo", "3 号口出站，转短程摩托出租或步行"], ["轻轨", 12, "Thong Lo 站乘 BTS 至 Phrom Phong", "2 站；6 号口连通 Emsphere"], ["轻轨", 17, "Phrom Phong 站乘 BTS 至 Nana 或 Asok，沿素坤逸街区步行", "晚间人流密集，保管好随身物品"], ["轻轨", 16, "Asok 站乘 BTS 至 Siam", "4 站直达"]],
      [["地铁", 18, "Siam 站乘 BTS 至 Sala Daeng，步行换 MRT Si Lom", "1 号口出站进入伦披尼公园"], ["地铁+轻轨", 32, "Si Lom 站乘 MRT 至 Hua Lamphong，再转出租车前往 ICONSIAM", "商场 G 层可寄存行李"], ["轻轨+机场线", 52, "乘接驳船至 Sathorn，BTS 到 Phaya Thai，换机场快线", "Suvarnabhumi 机场站下车；预留换乘步行"]]
    ]
  },
  "西班牙": {
    hub: "Passeig de Gràcia",
    feeders: {
      "Passeig de Gràcia": [0, "从酒店步行至 Passeig de Gràcia 站", "从 Passeig de Gràcia 站步行返回酒店"],
      "Liceu": [7, "Liceu 站乘 L3 线至 Passeig de Gràcia 站", "Passeig de Gràcia 站乘 L3 线至 Liceu 站"],
      "Diagonal": [5, "Diagonal 站乘 L3 线至 Passeig de Gràcia 站", "Passeig de Gràcia 站乘 L3 线至 Diagonal 站"],
      "Sants Estació": [14, "Sants Estació 站乘 L5 线至 Diagonal，换 L3 线至 Passeig de Gràcia", "Passeig de Gràcia 站乘 L3 线至 Diagonal，换 L5 线至 Sants Estació"],
      "Jaume I": [9, "Jaume I 站乘 L4 线直达 Passeig de Gràcia 站", "Passeig de Gràcia 站乘 L4 线直达 Jaume I 站"],
      "Catalunya": [5, "Catalunya 站乘 L3 线至 Passeig de Gràcia 站", "Passeig de Gràcia 站乘 L3 线至 Catalunya 站"]
    },
    days: [
      [
        ["地铁", 12, "Passeig de Gràcia 站乘 L2 线直达 Sagrada Família", "5 站；2 号口出站，步行约 3 分钟到圣家堂"],
        ["步行", 13, "沿 Carrer de la Marina 向北步行约 950 米", "从圣保罗医院主入口进入，沿途为缓坡"],
        ["公交", 22, "在 Av. Gaudí 乘 H8 路至 Pg. de Sant Joan，再步行进入格拉西亚", "工作日约 10 分钟一班；车上可刷交通卡"],
        ["地铁", 15, "从 Fontana 站乘 L3 线至 Passeig de Gràcia", "2 站直达；按 Aragó 出口标识出站"]
      ],
      [
        ["地铁 + 公交", 31, "Passeig de Gràcia 站乘 L3 线至 Lesseps，换 116 路社区巴士", "Lesseps 站 3 号口出；古埃尔公园建议预约入场时段"],
        ["公交", 28, "从 Park Güell 站乘 24 路至 Pg. de Gràcia - Aragó", "下车后步行约 4 分钟到巴特罗之家"],
        ["步行", 9, "沿格拉西亚大道向北步行约 650 米", "米拉之家位于 Provença 路口，途中商店集中"],
        ["步行", 12, "沿格拉西亚大道向南返回 Passeig de Gràcia 站", "约 850 米；晚间大道照明充足"]
      ],
      [
        ["地铁", 10, "Passeig de Gràcia 站乘 L4 线至 Jaume I", "2 站直达；4 号口出站进入哥特区"],
        ["步行", 6, "沿 Carrer de la Llibreteria 步行约 400 米", "穿过国王广场后抵达主教座堂东侧"],
        ["步行", 14, "经 Via Laietana 向东步行至 El Born", "约 1 公里；可从圣卡特琳娜市场顺路经过"],
        ["地铁", 12, "步行回 Jaume I 站，乘 L4 线至 Passeig de Gràcia", "2 站直达；出站后步行返回酒店"]
      ],
      [
        ["地铁 + 缆车", 27, "Passeig de Gràcia 站乘 L3 线至 Paral·lel，站内换蒙锥克缆车", "缆车使用地铁票；Parc de Montjuïc 站出站"],
        ["公交", 16, "乘 150 路公交至 Museu Nacional d'Art de Catalunya", "在 Palau Sant Jordi 方向站点候车"],
        ["步行", 12, "从 MNAC 沿 Av. dels Montanyans 步行约 850 米", "经阶梯和缓坡到西班牙村入口"],
        ["公交 + 地铁", 26, "乘 150 路至 Espanya 站，换 L3 线至 Passeig de Gràcia", "Espanya 站站内换乘；3 站直达"]
      ],
      [
        ["地铁", 16, "Passeig de Gràcia 站乘 L4 线至 Barceloneta", "4 站直达；1 号口出站后步行约 9 分钟到海滩"],
        ["步行", 18, "沿海滨步道向 Port Vell 步行约 1.3 公里", "经巴塞罗那塔码头，海风较大时备薄外套"],
        ["步行", 20, "穿过 Rambla de Mar，经哥伦布纪念碑进入兰布拉大道", "约 1.4 公里；人流密集区域留意随身物品"],
        ["地铁", 8, "从 Liceu 站乘 L3 线至 Passeig de Gràcia", "3 站直达；Passeig de Gràcia 出站"]
      ],
      [
        ["地铁", 9, "Passeig de Gràcia 站乘 L3 线至 Liceu", "3 站直达；博盖利亚市场从 La Rambla 侧入口进入"],
        ["地铁", 10, "Liceu 站乘 L3 线返回 Passeig de Gràcia", "3 站直达；从 Casa Batlló 方向出口开始购物"],
        ["机场铁路", 35, "Passeig de Gràcia 站乘 R2 Nord 线前往 BCN 机场 T2", "约 30 分钟一班；前往 T1 需在 T2 换免费接驳巴士"]
      ]
    ]
  }
};

let state = {
  flights: [],
  hotels: [],
  selectedFlight: 0,
  selectedHotel: 0,
  showAllFlights: false,
  showAllHotels: false,
  sort: "price",
  nights: 5,
  days: 6,
  profile: destinationProfiles["东京"],
  origin: "上海",
  destination: "东京",
  displayDestination: "东京",
  searchCity: "东京",
  originAirportCode: "sha",
  destinationAirportCode: "tyo",
  dynamicGuide: null,
  sourceStatus: "东京精细城市方案",
  start: "2026-10-01",
  end: "2026-10-06"
};

function daysBetween(start, end) {
  return Math.max(1, Math.round((new Date(`${end}T12:00:00`) - new Date(`${start}T12:00:00`)) / 86400000) + 1);
}

function formatDateRange(start, end) {
  const a = new Date(`${start}T12:00:00`);
  const b = new Date(`${end}T12:00:00`);
  return `${a.getMonth() + 1}月${a.getDate()}日 - ${b.getMonth() + 1}月${b.getDate()}日`;
}

async function fetchJson(url, timeout = 9000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { headers: { Accept: "application/json" }, signal: controller.signal });
    if (!response.ok) throw new Error(`数据服务返回 ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function loadJsonAsset(name) {
  if (!resourceCache[name]) {
    resourceCache[name] = fetchJson(`assets/${name}.json`, 15000).catch(error => {
      resourceCache[name] = null;
      throw error;
    });
  }
  return resourceCache[name];
}

async function fetchGeocodeResults(name) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=10&language=zh&format=json`;
  const data = await fetchJson(url, 10000);
  return data.results || [];
}

function bestGeocodeResult(results) {
  const rank = code => code === "PPLC" ? 5 : /^PCL/.test(code || "") ? 4 : /^PPLA/.test(code || "") ? 3 : /^PPL/.test(code || "") ? 2 : 1;
  return [...results].sort((a, b) => rank(b.feature_code) - rank(a.feature_code) || (b.population || 0) - (a.population || 0))[0];
}

async function wikidataEnglishNames(name) {
  const searchUrl = `https://www.wikidata.org/w/api.php?origin=*&action=wbsearchentities&search=${encodeURIComponent(name)}&language=zh&uselang=zh&type=item&limit=6&format=json`;
  const search = await fetchJson(searchUrl, 10000);
  const ids = (search.search || []).map(item => item.id).filter(Boolean);
  if (!ids.length) return [];
  const entityUrl = `https://www.wikidata.org/w/api.php?origin=*&action=wbgetentities&ids=${ids.join("|")}&languages=en&languagefallback=1&props=labels&format=json`;
  const entities = (await fetchJson(entityUrl, 10000)).entities || {};
  return ids.map(id => entities[id]?.labels?.en?.value).filter(Boolean);
}

async function geocodePlace(name) {
  try {
    const direct = bestGeocodeResult(await fetchGeocodeResults(name));
    if (direct) return direct;
  } catch (error) {
    // Try the multilingual fallback below when the primary geocoder is unavailable.
  }
  try {
    const alternatives = await wikidataEnglishNames(name);
    for (const alternative of alternatives) {
      try {
        const result = bestGeocodeResult(await fetchGeocodeResults(alternative));
        if (result) return result;
      } catch (error) {
        // Continue with the next recognized place name.
      }
    }
  } catch (error) {
    // The final error below gives the user one consistent correction path.
  }
  throw new Error(`未识别到“${name}”，请填写城市、国家或地区全名`);
}

async function resolveLocation(input) {
  const result = await geocodePlace(input);
  const countryCode = result.country_code || "";
  if (/^PCL/.test(result.feature_code || "")) {
    const countries = await loadJsonAsset("countries");
    const country = countries.find(item => item.iso2 === countryCode);
    if (country?.capital) {
      const capital = await geocodePlace(country.capital);
      return {
        name: capital.name,
        country: result.country || country.zh || country.name,
        countryCode,
        lat: capital.latitude,
        lon: capital.longitude,
        elevation: capital.elevation || 0,
        timezone: capital.timezone,
        admin1: capital.admin1 || capital.name,
        inputType: "country"
      };
    }
  }
  return {
    name: result.name,
    country: result.country || result.name,
    countryCode,
    lat: result.latitude,
    lon: result.longitude,
    elevation: result.elevation || 0,
    timezone: result.timezone,
    admin1: result.admin1 || result.admin2 || result.name,
    inputType: "city"
  };
}

function haversineKm(from, to) {
  const toRad = value => value * Math.PI / 180;
  const dLat = toRad(to.lat - from.lat);
  const dLon = toRad(to.lon - from.lon);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function nearestAirport(location, airports) {
  const sameCountry = airports.filter(airport => !location.countryCode || airport.country === location.countryCode);
  const candidates = sameCountry.length ? sameCountry : airports;
  let best = null;
  let bestScore = Infinity;
  candidates.forEach(airport => {
    const distance = haversineKm(location, airport);
    if (distance > 650) return;
    const internationalBonus = /international|intl/i.test(airport.name) ? 120 : /charles de gaulle|heathrow/i.test(airport.name) ? 105 : 0;
    const cityBonus = airport.city.toLowerCase().includes(location.name.toLowerCase()) ? 24 : 0;
    const score = distance - internationalBonus - cityBonus;
    if (score < bestScore) {
      bestScore = score;
      best = { ...airport, distance: Math.round(distance) };
    }
  });
  return best;
}

async function resolveOrigin(input) {
  const known = knownOriginLocations[input];
  if (known && airportCodes[input]) return { location: known, airportCode: airportCodes[input] };
  const location = await resolveLocation(input);
  const airports = await loadJsonAsset("airports");
  const airport = nearestAirport(location, airports);
  return { location, airportCode: airport?.iata?.toLowerCase() || null };
}

async function fetchCityImage(location) {
  try {
    const url = `https://zh.wikipedia.org/w/api.php?origin=*&action=query&titles=${encodeURIComponent(location.name)}&prop=pageimages&pithumbsize=1600&format=json`;
    const data = await fetchJson(url, 8000);
    const page = Object.values(data.query?.pages || {}).find(item => item.thumbnail?.source);
    if (page) return page.thumbnail.source;
  } catch (error) {
    // The city plan remains usable when a remote image service is unavailable.
  }
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${location.lat},${location.lon}&zoom=12&size=1600x900&maptype=mapnik`;
}

function weatherLabel(code) {
  if ([0, 1].includes(code)) return ["☀", "晴朗"];
  if ([2, 3].includes(code)) return ["◒", "多云"];
  if ([45, 48].includes(code)) return ["≈", "有雾"];
  if (code >= 51 && code <= 67) return ["☂", "有雨"];
  if (code >= 71 && code <= 77) return ["✳", "有雪"];
  if (code >= 80 && code <= 82) return ["☂", "阵雨"];
  if (code >= 95) return ["ϟ", "雷雨"];
  return ["◒", "天气多变"];
}

function packingFor(low, high) {
  if (high <= 8) return { wear: "保暖外套 + 防风内层", items: ["保暖内衣 2 套", "厚针织 2 件", "防风外套", "围巾手套", "保湿用品", "防滑步行鞋"] };
  if (high <= 18) return { wear: "中等外套 + 分层穿搭", items: ["长袖上衣 3 件", "针织衫 1 件", "中等厚度外套", "折叠伞", "保湿用品", "舒适步行鞋"] };
  if (high <= 26) return { wear: "薄外套 + 长袖，早晚添一层", items: ["长袖上衣 3 件", "薄外套 1 件", "长裤 2 条", "折叠伞", "防晒用品", "舒适步行鞋"] };
  return { wear: "透气短袖 + 防晒防雨", items: ["速干短袖 4 件", "轻薄下装 3 件", "防晒外套", "晴雨伞", "高倍防晒", "舒适步行鞋"] };
}

function seasonalWeather(location, start, count) {
  const month = new Date(`${start}T12:00:00`).getMonth();
  const hemisphereMonth = location.lat < 0 ? (month + 6) % 12 : month;
  const zone = Math.abs(location.lat) < 23 ? "tropical" : Math.abs(location.lat) < 35 ? "warm" : Math.abs(location.lat) < 55 ? "temperate" : "cold";
  const climate = {
    tropical: { high: [30, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30], low: [23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 23, 23] },
    warm: { high: [14, 16, 20, 24, 28, 32, 34, 34, 30, 25, 19, 15], low: [6, 8, 11, 15, 19, 23, 25, 25, 21, 16, 11, 7] },
    temperate: { high: [7, 9, 13, 18, 23, 27, 30, 29, 25, 19, 13, 8], low: [0, 1, 4, 8, 13, 17, 20, 19, 15, 10, 5, 1] },
    cold: { high: [-2, -1, 2, 7, 13, 17, 20, 18, 13, 7, 2, -1], low: [-8, -7, -5, -1, 4, 8, 11, 9, 5, 0, -4, -7] }
  }[zone];
  const altitudeAdjustment = Math.min(12, Math.max(0, location.elevation || 0) / 220);
  const baseHigh = Math.round(climate.high[hemisphereMonth] - altitudeAdjustment);
  const baseLow = Math.round(climate.low[hemisphereMonth] - altitudeAdjustment);
  const dates = Array.from({ length: Math.min(6, count) }, (_, index) => {
    const date = new Date(`${start}T12:00:00`);
    date.setDate(date.getDate() + index);
    const high = baseHigh - index % 3;
    const low = baseLow - index % 2;
    const code = zone === "tropical" && index % 3 === 2 ? 61 : index % 4 === 2 ? 3 : 1;
    const [icon, label] = weatherLabel(code);
    return { date, high, low, icon, label };
  });
  const packing = packingFor(baseLow, baseHigh);
  return { days: dates, high: baseHigh, low: baseLow, label: weatherLabel(dates[0] ? (zone === "tropical" ? 61 : 1) : 1)[1], ...packing, source: "当地季节气候估算" };
}

async function fetchWeather(location, start, end, count) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  const maxForecast = new Date(today);
  maxForecast.setDate(maxForecast.getDate() + 15);
  if (startDate >= today && endDate <= maxForecast) {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&start_date=${start}&end_date=${end}`;
      const data = await fetchJson(url, 10000);
      const daily = data.daily;
      const days = daily.time.slice(0, 6).map((dateText, index) => {
        const [icon, label] = weatherLabel(daily.weather_code[index]);
        return { date: new Date(`${dateText}T12:00:00`), high: Math.round(daily.temperature_2m_max[index]), low: Math.round(daily.temperature_2m_min[index]), icon, label };
      });
      const high = Math.max(...days.map(day => day.high));
      const low = Math.min(...days.map(day => day.low));
      return { days, high, low, label: days[0]?.label || "天气多变", ...packingFor(low, high), source: "Open-Meteo 实时预报" };
    } catch (error) {
      // Fall through to a location-aware seasonal estimate.
    }
  }
  return seasonalWeather(location, start, count);
}

async function resolveDestination(input, start, end, originInfo) {
  const key = destinationAliases[input] || input;
  const curated = destinationProfiles[key];
  if (curated && fullyCuratedDestinations.has(key)) {
    return {
      key,
      profile: curated,
      displayName: curated.displayName || input,
      searchCity: curated.searchCity || input,
      airportCode: airportCodes[key] || airportCodes[curated.searchCity],
      guide: null,
      sourceStatus: `${curated.displayName || input}精细城市方案`
    };
  }
  const location = await resolveLocation(input);
  const dynamic = await buildDynamicDestination(location, input, start, end, originInfo, curated);
  return { key: curated ? key : `dynamic:${location.countryCode}:${location.name}`, ...dynamic, airportCode: airportCodes[key] || dynamic.airportCode };
}

function ctripFlightUrl() {
  const from = state.originAirportCode || airportCodes[state.origin];
  const to = state.destinationAirportCode || airportCodes[state.destination] || airportCodes[state.searchCity];
  if (!from || !to) return "https://flights.ctrip.com/";
  return `https://flights.ctrip.com/online/list/round-${from}-${to}?depdate=${state.start}_${state.end}&cabin=y_s&adult=1&child=0&infant=0`;
}

function ctripHotelUrl(hotel) {
  const query = encodeURIComponent(`${state.searchCity} ${hotel.searchQuery || hotel.name}`);
  return `https://hotels.ctrip.com/hotels/list?cityName=${encodeURIComponent(state.searchCity)}&checkin=${state.start}&checkout=${state.end}&searchWord=${query}`;
}

function mapDirectionsUrl(from, to) {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${state.searchCity} ${from}`)}&destination=${encodeURIComponent(`${state.searchCity} ${to}`)}&travelmode=transit`;
}

function fallbackTransport(stops, index, hub) {
  const from = index === 0 ? hub : stops[index - 1];
  const to = stops[index] || hub;
  const isReturn = index === stops.length;
  return ["公共交通", 18 + index * 7, `${from}出发，按地图推荐乘当地轨道交通前往${isReturn ? hub : to}`, "通用目的地暂为估算路线；出发当天请用地图核对线路与运营调整"];
}

function weatherFor(month, destination) {
  if (destination === "西班牙") {
    if ([12, 1, 2].includes(month)) return { low: 8, high: 15, label: "温和偏凉", wear: "中等外套 + 针织内搭", items: ["长袖上衣 3 件", "针织衫 2 件", "中等厚度外套", "轻便雨具", "保湿用品", "舒适步行鞋"] };
    if ([3, 4, 5].includes(month)) return { low: 13, high: 21, label: "温暖偶雨", wear: "轻外套 + 分层穿搭", items: ["长袖上衣 3 件", "薄针织 1 件", "轻便外套", "折叠伞", "防晒用品", "舒适运动鞋"] };
    if ([6, 7, 8].includes(month)) return { low: 22, high: 29, label: "晴热少雨", wear: "透气短袖 + 防晒层", items: ["透气短袖 4 件", "轻薄下装 3 件", "防晒外套", "太阳镜", "高倍防晒", "舒适凉鞋"] };
    return { low: 17, high: 25, label: "晴朗温和", wear: "薄外套 + 长袖，海边防风", items: ["长袖上衣 3 件", "薄外套 1 件", "长裤 2 条", "折叠伞", "舒适步行鞋", "防晒用品"] };
  }
  const tropical = ["曼谷", "新加坡", "三亚"].includes(destination);
  if (tropical) return { low: 25, high: 32, label: "晴雨交替", wear: "透气短袖 + 防晒外套", items: ["轻薄短袖 4 件", "速干下装 2 件", "防晒外套", "折叠伞", "高倍防晒", "舒适凉鞋"] };
  if ([12, 1, 2].includes(month)) return { low: 3, high: 11, label: "晴冷干燥", wear: "厚外套 + 保暖内搭", items: ["保暖内衣 2 套", "羊毛衫 2 件", "防风外套", "围巾手套", "保湿用品", "防滑步行鞋"] };
  if ([3, 4, 5].includes(month)) return { low: 10, high: 21, label: "温和偶雨", wear: "轻外套 + 分层穿搭", items: ["长袖上衣 3 件", "薄针织 1 件", "轻便外套", "折叠伞", "防晒用品", "舒适运动鞋"] };
  if ([6, 7, 8].includes(month)) return { low: 23, high: 31, label: "炎热多雨", wear: "透气短袖 + 防晒防雨", items: ["速干短袖 4 件", "轻薄下装 3 件", "防晒外套", "晴雨伞", "防晒用品", "备用袜子"] };
  return { low: 18, high: 24, label: "晴间多云", wear: "薄外套 + 长袖，早晚添一层", items: ["长袖上衣 3 件", "薄外套 1 件", "长裤 2 条", "折叠伞", "舒适步行鞋", "小容量保温杯"] };
}

function boundsFor(location) {
  const latDelta = 0.16;
  const lonDelta = Math.min(0.3, 0.16 / Math.max(0.35, Math.cos(location.lat * Math.PI / 180)));
  return [location.lon - lonDelta, location.lat - latDelta, location.lon + lonDelta, location.lat + latDelta].map(value => value.toFixed(5)).join(",");
}

async function fetchPhoton(query, location, limit = 100) {
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=${limit}&lang=en&bbox=${boundsFor(location)}`;
  const data = await fetchJson(url, 9000);
  return data.features || [];
}

function pointFromFeature(feature, type) {
  const [lon, lat] = feature.geometry?.coordinates || [];
  const properties = feature.properties || {};
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || !properties.name) return null;
  return {
    name: properties.name,
    type,
    area: properties.district || properties.locality || properties.city || properties.state,
    countryCode: properties.countrycode,
    lat,
    lon,
    key: properties.osm_key,
    value: properties.osm_value
  };
}

function uniquePoints(points) {
  const seen = new Set();
  return points.filter(point => {
    if (!point?.name) return false;
    const key = point.name.trim().toLocaleLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchWikipediaPlaces(location) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&generator=geosearch&ggsprimary=all&ggsnamespace=0&ggsradius=10000&ggscoord=${location.lat}%7C${location.lon}&ggslimit=50&prop=coordinates&format=json`;
    const data = await fetchJson(url, 9000);
    const rejected = /^(list of|timeline of)|commune|siege|battle|republic|federation|authority|olympic|election|history of/i;
    return Object.values(data.query?.pages || {}).map(page => {
      const coordinate = page.coordinates?.[0];
      if (!coordinate || rejected.test(page.title) || page.title.toLocaleLowerCase() === location.name.toLocaleLowerCase()) return null;
      return { name: page.title, type: "classic", area: location.name, lat: coordinate.lat, lon: coordinate.lon };
    }).filter(Boolean);
  } catch (error) {
    return [];
  }
}

function fallbackPoint(location, label, index, type) {
  const angle = index * 1.37;
  const radius = 0.012 + index % 5 * 0.006;
  return { name: label, type, area: location.name, lat: location.lat + Math.sin(angle) * radius, lon: location.lon + Math.cos(angle) * radius };
}

function fillPoints(points, labels, location, count, type) {
  const result = uniquePoints(points).slice(0, count);
  let index = 0;
  while (result.length < count) {
    const label = labels[index % labels.length];
    const name = `${location.name} · ${label}`;
    if (!result.some(point => point.name === name)) result.push(fallbackPoint(location, name, index, type));
    index += 1;
  }
  return result;
}

async function fetchPlaceData(location) {
  const results = await Promise.allSettled([
    fetchPhoton("hotel", location),
    fetchPhoton("tourist attraction", location),
    fetchPhoton("museum", location),
    fetchPhoton("shopping", location),
    fetchPhoton("station", location)
  ]);
  const features = results.map(result => result.status === "fulfilled" ? result.value : []);
  const hotelPoints = uniquePoints(features[0].map(feature => {
    const properties = feature.properties || {};
    return properties.osm_key === "tourism" && properties.osm_value === "hotel" ? pointFromFeature(feature, "hotel") : null;
  }).filter(Boolean));
  let classicPoints = uniquePoints([...features[1], ...features[2]].map(feature => {
    const properties = feature.properties || {};
    const allowed = properties.osm_key === "tourism" || properties.osm_key === "historic" || properties.osm_value === "park" || properties.osm_value === "place_of_worship";
    return allowed ? pointFromFeature(feature, "classic") : null;
  }).filter(Boolean));
  if (classicPoints.length < 14) classicPoints = uniquePoints([...classicPoints, ...await fetchWikipediaPlaces(location)]);
  const shoppingPoints = uniquePoints(features[3].map(feature => pointFromFeature(feature, "shopping")).filter(point => point && (point.key === "shop" || point.value === "mall" || point.value === "marketplace" || point.value === "department_store")));
  const stationPoints = uniquePoints(features[4].map(feature => pointFromFeature(feature, "station")).filter(point => point && (point.key === "railway" || point.key === "public_transport" || /station|subway|tram/.test(point.value || ""))));
  return {
    hotels: hotelPoints,
    classics: classicPoints,
    shopping: shoppingPoints,
    stations: stationPoints,
    live: results.some(result => result.status === "fulfilled")
  };
}

function closestPoint(point, candidates) {
  if (!candidates.length) return null;
  return candidates.reduce((best, candidate) => haversineKm(point, candidate) < haversineKm(point, best) ? candidate : best, candidates[0]);
}

function buildHotelCatalog(placeData, location) {
  const actual = placeData.hotels.filter(hotel => !hotel.countryCode || hotel.countryCode === location.countryCode).slice(0, 12).map(hotel => {
    const station = closestPoint(hotel, placeData.stations);
    const stationDistance = station ? haversineKm(hotel, station) : null;
    return {
      name: hotel.name,
      area: hotel.area || location.name,
      station: station?.name || `${location.name}中心交通站`,
      walk: stationDistance == null ? 8 : Math.max(2, Math.min(15, Math.round(stationDistance * 12))),
      lat: hotel.lat,
      lon: hotel.lon,
      live: true,
      searchQuery: hotel.name
    };
  });
  const actualAreas = uniquePoints(placeData.hotels.map((hotel, index) => hotel.area ? { name: hotel.area, lat: hotel.lat, lon: hotel.lon, index } : null).filter(Boolean)).map(point => point.name);
  const areas = [...actualAreas, ...dynamicFallbackLabels.areas].slice(0, 6);
  let index = 0;
  while (actual.length < 12) {
    const area = areas[index % areas.length];
    const point = fallbackPoint(location, area, index, "hotel");
    const station = closestPoint(point, placeData.stations);
    actual.push({
      name: `携程高分酒店 · ${area}`,
      area,
      station: station?.name || `${location.name}中心交通站`,
      walk: 5 + index % 5,
      lat: point.lat,
      lon: point.lon,
      live: true,
      searchOnly: true,
      searchQuery: `${area} 高分酒店`
    });
    index += 1;
  }
  return actual;
}

function dynamicAirlines(location) {
  const europe = new Set(["FR", "DE", "IT", "ES", "PT", "GB", "NL", "BE", "CH", "AT", "DK", "SE", "NO", "FI", "IS", "GR", "CZ", "HU", "PL"]);
  const americas = new Set(["US", "CA", "MX", "BR", "AR", "CL", "PE", "CO"]);
  if (europe.has(location.countryCode)) return ["中国国际航空", "东方航空", "阿联酋航空", "卡塔尔航空", "土耳其航空", "法国航空", "汉莎航空", "荷兰皇家航空", "芬兰航空", "瑞士国际航空", "英国航空", "国泰航空"];
  if (americas.has(location.countryCode)) return ["东方航空", "中国国际航空", "国泰航空", "全日空", "大韩航空", "新加坡航空", "联合航空", "达美航空", "美国航空", "加拿大航空", "阿联酋航空", "卡塔尔航空"];
  return ["东方航空", "中国国际航空", "南方航空", "国泰航空", "新加坡航空", "大韩航空", "全日空", "卡塔尔航空", "阿联酋航空", "土耳其航空", "海南航空", "厦门航空"];
}

function routeBetween(from, to, stations, isAirport = false) {
  const distance = haversineKm(from, to);
  if (distance <= 1.3) {
    const minutes = Math.max(6, Math.round(distance / 4.5 * 60));
    return ["步行", minutes, `从${from.name}步行约 ${(distance * 1000).toFixed(0)} 米前往${to.name}`, "按地图步行导航行进；路口与入口以现场标识为准"];
  }
  const fromStation = closestPoint(from, stations);
  const toStation = closestPoint(to, stations);
  if (fromStation && toStation) {
    const minutes = Math.max(15, Math.round(distance / (isAirport ? 38 : 22) * 60 + 10));
    return [isAirport ? "机场交通" : "公共交通", minutes, `从${from.name}步行至${fromStation.name}，乘当地轨道交通或公交前往${toStation.name}，再步行到${to.name}`, `距离约 ${distance.toFixed(1)} 公里；具体线路、换乘站和运营调整请点“地图核对”查看实时结果`];
  }
  const minutes = Math.max(12, Math.round(distance / (isAirport ? 42 : 24) * 60 + 8));
  return [isAirport ? "机场巴士 / 出租车" : "公交 / 出租车", minutes, `从${from.name}前往${to.name}，全程约 ${distance.toFixed(1)} 公里`, "当地轨道数据暂未返回；请用地图核对当天可用的公交、出租车或步行组合"];
}

function buildDynamicGuide(dayPoints, hotels, placeData, location) {
  const hubPoint = placeData.stations[0] || { name: `${location.name}中心交通站`, lat: location.lat, lon: location.lon };
  const feeders = {};
  hotels.forEach(hotel => {
    if (feeders[hotel.station]) return;
    const distance = haversineKm(hotel, hubPoint);
    if (distance < 0.6) feeders[hotel.station] = [0, `从酒店步行至${hubPoint.name}`, `从${hubPoint.name}步行返回酒店`];
    else {
      const minutes = Math.max(8, Math.round(distance / 22 * 60 + 8));
      feeders[hotel.station] = [minutes, `从${hotel.station}乘当地轨道交通或公交前往${hubPoint.name}`, `从${hubPoint.name}乘当地轨道交通或公交返回${hotel.station}`];
    }
  });
  const days = dayPoints.map((points, dayIndex) => {
    const routes = [];
    let previous = { ...hubPoint, name: hubPoint.name };
    points.forEach((point, pointIndex) => {
      routes.push(routeBetween(previous, point, placeData.stations, dayIndex === 5 && pointIndex === points.length - 1));
      previous = point;
    });
    if (dayIndex < 5) routes.push(routeBetween(previous, hubPoint, placeData.stations));
    return routes;
  });
  return { hub: hubPoint.name, feeders, days };
}

async function buildDynamicDestination(location, input, start, end, originInfo, curated) {
  const count = daysBetween(start, end);
  const [airports, weather, image, placeData] = await Promise.all([
    loadJsonAsset("airports"),
    fetchWeather(location, start, end, count),
    fetchCityImage(location),
    fetchPlaceData(location)
  ]);
  const airport = nearestAirport(location, airports);
  if (!airport) throw new Error(`暂时找不到${location.name}附近可用机场，请改填邻近大城市`);
  const classics = fillPoints(placeData.classics, dynamicFallbackLabels.classic, location, 14, "classic");
  const shopping = fillPoints(placeData.shopping, dynamicFallbackLabels.shopping, location, 6, "shopping");
  const airportPoint = { name: `${airport.city} ${airport.iata} 机场`, type: "airport", lat: airport.lat, lon: airport.lon };
  const dayPoints = [
    [classics[0], classics[1], classics[2]],
    [classics[3], shopping[0], classics[4]],
    [classics[5], classics[6], classics[7]],
    [classics[8], shopping[1], classics[9]],
    [classics[10], classics[11], shopping[2]],
    [shopping[3], classics[12], airportPoint]
  ];
  const hotels = buildHotelCatalog(placeData, location);
  const distance = haversineKm(originInfo.location, location);
  const duration = Math.max(90, Math.round((distance / 820 + 2) * 4) * 15);
  const basePrice = Math.max(900, Math.round((distance * 0.42 + 900) / 10) * 10);
  const displayName = location.inputType === "country" ? `${location.country} · ${location.name}` : location.country && location.country !== location.name ? `${location.name} · ${location.country}` : location.name;
  const dynamicProfile = {
    displayName,
    searchCity: location.name,
    image,
    fallbackImage: `https://staticmap.openstreetmap.de/staticmap.php?center=${location.lat},${location.lon}&zoom=12&size=1600x900&maptype=mapnik`,
    imageAlt: `${location.name}城市与地标风景`,
    route: [classics[0].name, shopping[0].name, classics[5].name, shopping[1].name],
    areas: [...new Set(hotels.map(hotel => hotel.area))].slice(0, 6),
    stations: [...new Set(hotels.map(hotel => hotel.station))],
    highlights: dayPoints.map(points => points.map(point => point.name)),
    shopping: shopping.map(point => point.name),
    buys: [
      ["当地食品", `${location.country}包装食品与地方风味`, `优先在${shopping[0].name}或正规商超购买，确认入境限制`],
      ["本地市场", `${shopping[1].name}特色商品`, "先比较价格与产地标签，再集中采购"],
      ["城市纪念品", `${location.name}建筑与文化主题周边`, "优先博物馆商店、景点官方商店与正版门店"],
      ["本地设计", `${shopping[2].name}独立品牌`, "保留购物小票并确认退税门槛"],
      ["手工艺品", `${location.country}传统工艺小件`, "易碎或液体商品提前确认托运规则"],
      ["文博限定", `${classics[0].name}相关文创`, "在官方商店购买，避免非授权仿品"]
    ],
    flightAirlines: dynamicAirlines(location),
    flightPlatforms: ["携程", "飞猪", "航司官网", "携程", "飞猪", "航司官网", "携程", "飞猪", "航司官网", "携程", "飞猪", "航司官网"],
    flightBasePrice: basePrice,
    flightDuration: duration,
    hasDirect: distance < 4600,
    hotelCatalog: hotels,
    weather,
    dynamicData: true
  };
  const profile = curated ? { ...dynamicProfile, route: curated.route, highlights: curated.highlights, shopping: curated.shopping, buys: curated.buys } : dynamicProfile;
  return {
    profile,
    displayName,
    searchCity: location.name,
    airportCode: airport.iata.toLowerCase(),
    guide: curated ? null : buildDynamicGuide(dayPoints, hotels, placeData, location),
    sourceStatus: placeData.live ? `已匹配 ${location.name} · 公开地图地点数据 + ${weather.source}` : `已匹配 ${location.name} · 地点服务暂时限流，使用城市筛选入口 + ${weather.source}`
  };
}

function generateFlights(origin, destination, profile = state.profile) {
  const base = destination.length * 37 + origin.length * 29;
  const departTimes = ["06:35", "07:20", "08:20", "09:10", "10:40", "11:55", "13:10", "14:25", "15:40", "17:15", "19:05", "20:30"];
  const destinationAirlines = profile.flightAirlines || airlines;
  const destinationPlatforms = profile.flightPlatforms || platforms;
  return destinationAirlines.map((airline, index) => {
    const duration = profile.flightDuration ? profile.flightDuration + (index % 4) * 45 : 150 + (index % 4) * 25;
    const departMinutes = Number(departTimes[index].slice(0, 2)) * 60 + Number(departTimes[index].slice(3));
    const arriveMinutes = (departMinutes + duration) % 1440;
    return {
      id: index,
      airline,
      platform: destinationPlatforms[index],
      depart: departTimes[index],
      arrive: `${String(Math.floor(arriveMinutes / 60)).padStart(2, "0")}:${String(arriveMinutes % 60).padStart(2, "0")}`,
      returnTime: ["11:20", "13:45", "15:10", "17:30", "19:05", "20:10"][index % 6],
      duration,
      stop: profile.flightDuration ? (profile.hasDirect && index % 4 === 0 ? "直飞" : index % 5 === 4 ? "经停 2 次" : "经停 1 次") : (index % 5 === 4 ? "经停 1 次" : "直飞"),
      baggage: index % 3 === 1 ? "手提 7kg" : "托运 20kg",
      price: (profile.flightBasePrice || 1988) + base + index * 117 + (index % 3) * 86
    };
  });
}

function generateHotels(profile, budget, destination = state.destination) {
  const tierOffset = budget >= 1200 ? 8 : budget >= 900 ? 4 : 0;
  const catalog = profile.hotelCatalog || hotelCatalogs[destination];
  return Array.from({ length: 12 }, (_, index) => {
    const sourceIndex = (index + tierOffset) % 12;
    const hotelData = catalog?.[sourceIndex % catalog.length];
    const dynamicHotel = hotelData && !Array.isArray(hotelData) ? hotelData : null;
    return {
    id: index,
    name: dynamicHotel?.name || hotelData?.[0] || `${profile.areas[sourceIndex % profile.areas.length]}精选酒店 ${sourceIndex + 1}`,
    area: dynamicHotel?.area || hotelData?.[1] || profile.areas[sourceIndex % profile.areas.length],
    station: dynamicHotel?.station || hotelData?.[2] || profile.stations[sourceIndex % profile.stations.length],
    walk: dynamicHotel?.walk || 2 + (index * 3) % 7,
    rating: dynamicHotel?.live ? null : (4.9 - (index % 4) * .1).toFixed(1),
    reviews: dynamicHotel?.live ? null : 820 + sourceIndex * 463,
    price: Math.max(360, Math.round((budget * (.62 + (index % 6) * .09) + sourceIndex * 13) / 10) * 10),
    sources: dynamicHotel?.live ? ["携程实时页"] : ["携程", "飞猪", index % 2 ? "Booking" : "Agoda"],
    image: `assets/hotel-${sourceIndex % 4 + 1}.jpg`,
    live: Boolean(dynamicHotel?.live),
    searchOnly: Boolean(dynamicHotel?.searchOnly),
    searchQuery: dynamicHotel?.searchQuery,
    lat: dynamicHotel?.lat,
    lon: dynamicHotel?.lon
    };
  });
}

function renderWeather(start, destination) {
  const date = new Date(`${start}T12:00:00`);
  const staticWeather = weatherFor(date.getMonth() + 1, destination);
  const weather = state.profile.weather || staticWeather;
  const icons = ["☀", "◒", "☁", "☀", "☂", "◒"];
  const labels = ["晴", "晴间多云", "多云", "晴", "短时雨", "晴间多云"];
  const days = weather.days || Array.from({ length: Math.min(6, state.days) }, (_, i) => {
    const day = new Date(date);
    day.setDate(day.getDate() + i);
    const high = weather.high - (i % 3);
    const low = weather.low - (i % 2);
    return { date: day, high, low, icon: icons[i], label: labels[i] };
  });
  $("#weather-days").innerHTML = days.slice(0, 6).map(day => `<article class="weather-day"><p>${day.date.getMonth() + 1}/${day.date.getDate()} · 周${"日一二三四五六"[day.date.getDay()]}</p><span class="weather-icon" aria-hidden="true">${day.icon}</span><strong>${day.low}–${day.high}°</strong><span>${day.label}</span></article>`).join("");
  $("#packing-list").innerHTML = weather.items.map(item => `<li>${item}</li>`).join("");
  $("#overview-temp").textContent = `${weather.low}–${weather.high}°`;
  $("#overview-weather").textContent = weather.label;
  $("#overview-wear").textContent = weather.wear;
  $("#weather .source-note").textContent = weather.source || "季节气候估算 · 非实时预报";
}

function renderFlights() {
  const list = [...state.flights].sort((a, b) => state.sort === "price" ? a.price - b.price : state.sort === "time" ? a.depart.localeCompare(b.depart) : a.duration - b.duration);
  const visible = state.showAllFlights ? list : list.slice(0, 6);
  $("#flight-list").innerHTML = visible.map(flight => `
    <article class="flight-row ${flight.id === state.selectedFlight ? "selected" : ""}">
      <div class="carrier"><span class="carrier-mark">${flight.airline[0]}</span><div><strong>${flight.airline}</strong><span>${flight.platform}</span></div></div>
      <div class="flight-time"><strong>${flight.depart} → ${flight.arrive}</strong><span>去程 · 当地时间</span></div>
      <div class="flight-time"><strong>${flight.returnTime}</strong><span>返程起飞</span></div>
      <div class="flight-info"><b>${Math.floor(flight.duration / 60)}小时${flight.duration % 60}分 · ${flight.stop}</b><span>${flight.baggage}</span></div>
      <div class="flight-price"><strong>${money(flight.price)}</strong><span>往返含税</span></div>
      <div class="row-actions"><button class="select-button" type="button" data-flight="${flight.id}">${flight.id === state.selectedFlight ? "已选" : "选择"}</button><a class="ctrip-link" href="${ctripFlightUrl()}" target="_blank" rel="noopener noreferrer" aria-label="前往携程查看 ${flight.airline} 航班">携程查看 <span aria-hidden="true">↗</span></a></div>
    </article>`).join("");
  $("#more-flights").innerHTML = `${state.showAllFlights ? "收起航班" : "展开全部 12 个航班"} <span>${state.showAllFlights ? "↑" : "↓"}</span>`;
}

function renderHotels() {
  const budget = Number($("#budget-range").value);
  const visible = state.showAllHotels ? state.hotels : state.hotels.slice(0, 6);
  $("#hotel-grid").innerHTML = visible.map(hotel => `
    <article class="hotel-card ${hotel.id === state.selectedHotel ? "selected" : ""} ${hotel.price > budget ? "over-budget" : ""}">
      <div class="hotel-image"><img src="${hotel.image}" alt="${hotel.live ? `${state.searchCity}酒店空间示意图` : `${hotel.name}客房与公共空间`}" loading="lazy" /><span class="hotel-score">${hotel.rating || "实时"}</span></div>
      <div class="hotel-copy"><h3>${hotel.name}</h3><p class="hotel-location">${hotel.area} · ${hotel.station}步行约 ${hotel.walk} 分钟</p><div class="hotel-tags"><span>${hotel.searchOnly ? "携程筛选入口" : "市区住宿"}</span><span>${hotel.live ? "评价以携程实时页为准" : `${hotel.sources.length} 平台高评`}</span></div><div class="hotel-bottom"><span>${hotel.live ? "进入携程查看评分与库存" : `${hotel.reviews.toLocaleString("zh-CN")} 条评价`}</span><strong>${hotel.live ? "参考 " : ""}${money(hotel.price)}<small> / 晚</small></strong></div><div class="hotel-actions"><button class="hotel-select" type="button" data-hotel-select="${hotel.id}">${hotel.id === state.selectedHotel ? "已选住宿" : "选为住宿"}</button><a class="ctrip-link" href="${ctripHotelUrl(hotel)}" target="_blank" rel="noopener noreferrer" aria-label="前往携程查看 ${state.searchCity} ${hotel.name}">携程查看 <span aria-hidden="true">↗</span></a></div></div>
    </article>`).join("");
  $("#more-hotels").innerHTML = `${state.showAllHotels ? "收起酒店" : "展开全部 12 家酒店"} <span>${state.showAllHotels ? "↑" : "↓"}</span>`;
}

function renderItinerary(start, destination) {
  const startDate = new Date(`${start}T12:00:00`);
  const count = Math.min(state.days, 6);
  $("#itinerary-list").innerHTML = Array.from({ length: count }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + index);
    const stops = state.profile.highlights[index % state.profile.highlights.length];
    const guide = transportGuides[destination] || state.dynamicGuide;
    const hub = guide?.hub || state.profile.stations[0];
    const selectedHotel = state.hotels.find(hotel => hotel.id === state.selectedHotel) || state.hotels[0];
    const hotelStation = selectedHotel?.station || hub;
    const feeder = guide?.feeders?.[hotelStation] || [0, `从酒店前往${hub}`, `从${hub}返回酒店`];
    const routes = (guide?.days[index % guide.days.length] || Array.from({ length: stops.length + (index === count - 1 ? 0 : 1) }, (_, routeIndex) => fallbackTransport(stops, routeIndex, hub))).map(route => [...route]);
    if (feeder[0] > 0) {
      routes[0][1] += feeder[0];
      routes[0][0] = routes[0][0] === "步行" ? "地铁 + 步行" : `地铁 + ${routes[0][0]}`;
      routes[0][2] = `${feeder[1]}；到达交通基点后，${routes[0][2]}`;
      routes[0][3] = `酒店最近车站为${hotelStation}；${routes[0][3]}`;
      if (routes.length > stops.length) {
        const last = routes[routes.length - 1];
        last[1] += feeder[0];
        last[0] = last[0].includes("地铁") ? last[0] : `${last[0]} + 地铁`;
        last[2] = `${last[2]}；到达${hub}后，${feeder[2]}`;
        last[3] = `${last[3]}；从${hotelStation}步行返回酒店`;
      }
    }
    const totalMinutes = routes.reduce((sum, route) => sum + route[1], 0);
    const routeHtml = routes.map((route, routeIndex) => {
      const from = routeIndex === 0 ? `酒店 · ${hotelStation}` : stops[routeIndex - 1];
      const to = routeIndex < stops.length ? stops[routeIndex] : `酒店 · ${hotelStation}`;
      const place = routeIndex < stops.length ? `<div class="place-node ${state.profile.shopping.includes(to) || routeIndex === 1 && index % 2 ? "shopping" : "classic"}"><span>${routeIndex + 1}</span><div><strong>${to}</strong><p>${routeIndex === 0 ? "建议停留 1.5–2 小时" : routeIndex === 1 ? "建议停留 1–1.5 小时" : "建议停留 1.5 小时"}</p></div></div>` : `<div class="place-node hotel-return"><span>✓</span><div><strong>返回酒店</strong><p>当天行程结束</p></div></div>`;
      return `<div class="route-leg"><div class="route-rail"><span class="transport-icon" aria-hidden="true">${route[0] === "步行" ? "步" : route[0].includes("轮渡") ? "船" : "乘"}</span><i></i></div><div class="route-detail"><div class="route-topline"><span>${from} → ${to}</span><strong>${route[0]} · 约 ${route[1]} 分钟</strong></div><p>${route[2]}</p><div class="route-foot"><small>${route[3]}</small><a href="${mapDirectionsUrl(from, to)}" target="_blank" rel="noopener noreferrer" aria-label="在地图中核对 ${from} 到 ${to} 的路线">地图核对 <span aria-hidden="true">↗</span></a></div></div></div>${place}`;
    }).join("");
    return `<article class="day-row"><div class="day-number"><span>DAY ${String(index + 1).padStart(2, "0")}</span><strong>${date.getMonth() + 1}.${String(date.getDate()).padStart(2, "0")}</strong><small>交通约 ${totalMinutes} 分钟</small></div><div class="day-content"><div class="day-title"><div><h3>${index === 0 ? "初见" : index === count - 1 ? "收尾于" : "漫游"}${stops[0]}${index === 2 ? " · 一日小出走" : ""}</h3><p>建议 ${index === 2 ? "07:00" : "08:30"} 从酒店出发 · 以 ${hotelStation} 为起点</p></div><span>${stops.length} 个停留点</span></div><div class="transport-timeline"><div class="place-node hotel-start"><span>H</span><div><strong>${selectedHotel?.name || "已选酒店"}</strong><p>${hotelStation}附近 · 早餐后出发</p></div></div>${routeHtml}</div><p class="day-tip">${index === 0 ? "落地先把节奏放慢；首段与返程已按当前所选酒店最近车站补充接驳时间。" : index === 2 ? "近郊日尽量避开周末高峰，提前查好回程末班车，穿适合长距离步行的鞋。" : index === count - 1 ? "最后一天把采购集中在交通枢纽附近，国际航班至少提前 3 小时到达机场。" : "路线按少折返编排；高峰期建议在页面标注时间基础上额外预留 10–15 分钟。"}</p></div></article>`;
  }).join("");
  $("#buy-grid").innerHTML = state.profile.buys.map(([type, name, tip]) => `<article class="buy-item"><span>${type}</span><strong>${name}</strong><p>${tip}</p></article>`).join("");
  $("#buy-destination").textContent = state.displayDestination;
}

function updateCosts() {
  const flight = state.flights.find(item => item.id === state.selectedFlight) || state.flights[0];
  const hotel = state.hotels.find(item => item.id === state.selectedHotel) || state.hotels[0];
  const hotelTotal = hotel.price * state.nights;
  const local = state.days * 236 + 200;
  const total = flight.price + hotelTotal + local;
  $("#overview-flight-time").textContent = flight.depart;
  $("#overview-flight-name").textContent = `${flight.airline} · ${flight.stop}`;
  $("#overview-flight-price").textContent = `往返 ${money(flight.price)}`;
  $("#overview-hotel-name").textContent = hotel.name;
  $("#overview-hotel-rating").textContent = hotel.rating ? `${hotel.rating} 分` : "评价实时查看";
  $("#overview-hotel-price").textContent = `${state.nights} 晚 ${money(hotelTotal)}`;
  $("#cost-flight").textContent = money(flight.price);
  $("#cost-hotel").textContent = money(hotelTotal);
  $("#cost-local").textContent = money(local);
  $("#cost-total").textContent = money(total);
  $("#sidebar-total").textContent = money(total);
}

async function generatePlan() {
  const origin = $("#origin").value.trim();
  const destinationInput = $("#destination").value.trim();
  const start = $("#start-date").value;
  const end = $("#end-date").value;
  const budget = Number($("#hotel-budget").value);
  if (!origin || !destinationInput) {
    showToast("请填写出发地和目的地");
    return false;
  }
  if (origin.length > 80 || destinationInput.length > 80) {
    showToast("地点名称请控制在 80 个字符以内");
    return false;
  }
  if (new Date(end) < new Date(start)) {
    showToast("返程日期需要晚于出发日期");
    return false;
  }
  const originInfo = await resolveOrigin(origin);
  const destination = await resolveDestination(destinationInput, start, end, originInfo);
  state.days = daysBetween(start, end);
  state.nights = Math.max(1, state.days - 1);
  state.profile = destination.profile;
  state.origin = origin;
  state.destination = destination.key;
  state.displayDestination = destination.displayName;
  state.searchCity = destination.searchCity;
  state.originAirportCode = originInfo.airportCode;
  state.destinationAirportCode = destination.airportCode;
  state.dynamicGuide = destination.guide;
  state.sourceStatus = destination.sourceStatus;
  state.start = start;
  state.end = end;
  state.flights = generateFlights(origin, state.searchCity, state.profile);
  state.hotels = generateHotels(state.profile, budget);
  state.selectedFlight = [...state.flights].sort((a, b) => a.price - b.price)[1].id;
  state.selectedHotel = state.hotels.find(hotel => hotel.price <= budget)?.id ?? 0;
  $("#budget-range").value = Math.min(1600, Math.max(400, budget));
  $("#budget-output").value = Math.min(1600, Math.max(400, budget));
  $("#sidebar-destination").textContent = state.displayDestination;
  $("#greeting-destination").textContent = state.displayDestination;
  $("#sidebar-date").textContent = `${formatDateRange(start, end)} · ${state.days}天${state.nights}晚`;
  $("#visual-route").textContent = `${origin} → ${state.displayDestination}`;
  $("#visual-meta").textContent = `${state.days} 天 · 城市漫游 · 经典与购物`;
  $("#plan-source-status").textContent = state.sourceStatus;
  $("#final-summary").textContent = `${formatDateRange(start, start).split(" - ")[0]}从${origin}出发，入住市区交通便利酒店，用 ${state.days} 天走过${state.displayDestination}的经典地标、生活街区与重点购物地。`;
  const destinationImage = state.profile.image || "assets/tokyo-street.jpg";
  $("#planner").style.setProperty("--hero-image", `url("${destinationImage}")`);
  const visualImage = $(".trip-visual img");
  visualImage.onerror = () => {
    visualImage.onerror = null;
    const fallbackImage = state.profile.fallbackImage || "assets/tokyo-street.jpg";
    visualImage.src = fallbackImage;
    $("#planner").style.setProperty("--hero-image", `url("${fallbackImage}")`);
  };
  visualImage.src = destinationImage;
  visualImage.alt = state.profile.imageAlt || `${state.displayDestination}城市风景`;
  $$(".route-strip b").forEach((item, index) => { item.textContent = state.profile.route[index]; });
  renderWeather(start, state.destination);
  renderFlights();
  renderHotels();
  renderItinerary(start, state.destination);
  updateCosts();
  return true;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

$("#trip-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = $("#generate-button");
  document.body.classList.add("is-loading");
  button.disabled = true;
  try {
    const generated = await generatePlan();
    if (generated) {
      $("#results").scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("攻略已按你的条件重新生成");
    }
  } catch (error) {
    const message = error.name === "AbortError" ? "目的地数据加载超时，请稍后重试" : error.message || "暂时无法生成该目的地，请稍后重试";
    showToast(message);
  } finally {
    document.body.classList.remove("is-loading");
    button.disabled = false;
  }
});

$("#swap-button").addEventListener("click", () => {
  const origin = $("#origin");
  const destination = $("#destination");
  [origin.value, destination.value] = [destination.value, origin.value];
});

$("#flight-sort").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  state.sort = button.dataset.sort;
  $$("button", event.currentTarget).forEach(item => item.classList.toggle("active", item === button));
  renderFlights();
});

$("#flight-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-flight]");
  if (!button) return;
  state.selectedFlight = Number(button.dataset.flight);
  renderFlights();
  updateCosts();
  showToast("航班方案已更新");
});

function chooseHotel(id) {
  state.selectedHotel = Number(id);
  renderHotels();
  renderItinerary(state.start, state.destination);
  updateCosts();
  showToast("酒店方案已更新");
}

function refreshHotelsForBudget(budget) {
  state.hotels = generateHotels(state.profile, budget);
  state.selectedHotel = state.hotels.find(hotel => hotel.price <= budget)?.id ?? state.hotels[0].id;
  renderHotels();
  renderItinerary(state.start, state.destination);
  updateCosts();
  showToast(`已按每晚 ${money(budget)} 刷新 12 家酒店`);
}

$("#hotel-grid").addEventListener("click", event => {
  const button = event.target.closest("[data-hotel-select]");
  if (button) chooseHotel(button.dataset.hotelSelect);
});

$("#budget-range").addEventListener("input", event => {
  const budget = Number(event.target.value);
  $("#budget-output").value = budget;
  $("#hotel-budget").value = budget;
  clearTimeout(refreshHotelsForBudget.timer);
  refreshHotelsForBudget.timer = setTimeout(() => refreshHotelsForBudget(budget), 120);
});

$("#budget-range").addEventListener("change", event => {
  const budget = Number(event.target.value);
  clearTimeout(refreshHotelsForBudget.timer);
  refreshHotelsForBudget(budget);
});

$("#more-flights").addEventListener("click", () => { state.showAllFlights = !state.showAllFlights; renderFlights(); });
$("#more-hotels").addEventListener("click", () => { state.showAllHotels = !state.showAllHotels; renderHotels(); });

$("#save-plan").addEventListener("click", event => {
  event.currentTarget.classList.toggle("saved");
  event.currentTarget.textContent = event.currentTarget.classList.contains("saved") ? "♥ 已收藏" : "♡ 收藏方案";
  showToast(event.currentTarget.classList.contains("saved") ? "已收藏当前方案" : "已取消收藏");
});

$("#export-plan").addEventListener("click", () => {
  const destination = state.displayDestination;
  const summary = `${destination}旅行规划\n${$("#sidebar-date").textContent}\n${$("#overview-flight-name").textContent} ${$("#overview-flight-price").textContent}\n${$("#overview-hotel-name").textContent} ${$("#overview-hotel-price").textContent}\n预计基础花费 ${$("#cost-total").textContent}\n\n注：当前为产品演示模拟数据。`;
  const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${destination}-旅行规划.txt`;
  link.click();
  URL.revokeObjectURL(link.href);
  showToast("行程摘要已导出");
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    $$("#section-nav a").forEach(link => link.classList.toggle("active", link.dataset.section === entry.target.id));
  });
}, { rootMargin: "-25% 0px -65%", threshold: 0 });

$$('.content-section').forEach(section => observer.observe(section));

generatePlan().catch(error => showToast(error.message || "初始行程加载失败"));
