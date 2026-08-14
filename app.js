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
  }
};

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
  ]
};
const airportCodes = { "上海": "sha", "东京": "tyo", "大阪": "osa", "曼谷": "bkk", "北京": "bjs", "广州": "can", "深圳": "szx", "成都": "ctu", "杭州": "hgh", "重庆": "ckg", "西安": "sia", "香港": "hkg" };

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

function ctripFlightUrl() {
  const from = airportCodes[state.origin] || encodeURIComponent(state.origin);
  const to = airportCodes[state.destination] || encodeURIComponent(state.destination);
  return `https://flights.ctrip.com/online/list/round-${from}-${to}?depdate=${state.start}_${state.end}&cabin=y_s&adult=1&child=0&infant=0`;
}

function ctripHotelUrl(hotel) {
  const query = encodeURIComponent(`${state.destination} ${hotel.name}`);
  return `https://hotels.ctrip.com/hotels/list?cityName=${encodeURIComponent(state.destination)}&checkin=${state.start}&checkout=${state.end}&searchWord=${query}`;
}

function mapDirectionsUrl(from, to) {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${state.destination} ${from}`)}&destination=${encodeURIComponent(`${state.destination} ${to}`)}&travelmode=transit`;
}

function fallbackTransport(stops, index, hub) {
  const from = index === 0 ? hub : stops[index - 1];
  const to = stops[index] || hub;
  const isReturn = index === stops.length;
  return ["公共交通", 18 + index * 7, `${from}出发，按地图推荐乘当地轨道交通前往${isReturn ? hub : to}`, "通用目的地暂为估算路线；出发当天请用地图核对线路与运营调整"];
}

function weatherFor(month, destination) {
  const tropical = ["曼谷", "新加坡", "三亚"].includes(destination);
  if (tropical) return { low: 25, high: 32, label: "晴雨交替", wear: "透气短袖 + 防晒外套", items: ["轻薄短袖 4 件", "速干下装 2 件", "防晒外套", "折叠伞", "高倍防晒", "舒适凉鞋"] };
  if ([12, 1, 2].includes(month)) return { low: 3, high: 11, label: "晴冷干燥", wear: "厚外套 + 保暖内搭", items: ["保暖内衣 2 套", "羊毛衫 2 件", "防风外套", "围巾手套", "保湿用品", "防滑步行鞋"] };
  if ([3, 4, 5].includes(month)) return { low: 10, high: 21, label: "温和偶雨", wear: "轻外套 + 分层穿搭", items: ["长袖上衣 3 件", "薄针织 1 件", "轻便外套", "折叠伞", "防晒用品", "舒适运动鞋"] };
  if ([6, 7, 8].includes(month)) return { low: 23, high: 31, label: "炎热多雨", wear: "透气短袖 + 防晒防雨", items: ["速干短袖 4 件", "轻薄下装 3 件", "防晒外套", "晴雨伞", "防晒用品", "备用袜子"] };
  return { low: 18, high: 24, label: "晴间多云", wear: "薄外套 + 长袖，早晚添一层", items: ["长袖上衣 3 件", "薄外套 1 件", "长裤 2 条", "折叠伞", "舒适步行鞋", "小容量保温杯"] };
}

function generateFlights(origin, destination) {
  const base = destination.length * 37 + origin.length * 29;
  const departTimes = ["06:35", "07:20", "08:20", "09:10", "10:40", "11:55", "13:10", "14:25", "15:40", "17:15", "19:05", "20:30"];
  return airlines.map((airline, index) => {
    const departHour = Number(departTimes[index].slice(0, 2));
    const duration = 150 + (index % 4) * 25;
    return {
      id: index,
      airline,
      platform: platforms[index],
      depart: departTimes[index],
      arrive: `${String((departHour + Math.floor(duration / 60)) % 24).padStart(2, "0")}:${String((Number(departTimes[index].slice(3)) + duration % 60) % 60).padStart(2, "0")}`,
      returnTime: ["11:20", "13:45", "15:10", "17:30", "19:05", "20:10"][index % 6],
      duration,
      stop: index % 5 === 4 ? "经停 1 次" : "直飞",
      baggage: index % 3 === 1 ? "手提 7kg" : "托运 20kg",
      price: 1988 + base + index * 117 + (index % 3) * 86
    };
  });
}

function generateHotels(profile, budget, destination = state.destination) {
  const tierOffset = budget >= 1200 ? 8 : budget >= 900 ? 4 : 0;
  const catalog = hotelCatalogs[destination];
  return Array.from({ length: 12 }, (_, index) => {
    const sourceIndex = (index + tierOffset) % 12;
    const hotelData = catalog?.[sourceIndex];
    return {
    id: index,
    name: hotelData?.[0] || `${profile.areas[sourceIndex % profile.areas.length]}精选酒店 ${sourceIndex + 1}`,
    area: hotelData?.[1] || profile.areas[sourceIndex % profile.areas.length],
    station: hotelData?.[2] || profile.stations[sourceIndex % profile.stations.length],
    walk: 2 + (index * 3) % 7,
    rating: (4.9 - (index % 4) * .1).toFixed(1),
    reviews: 820 + sourceIndex * 463,
    price: Math.max(360, Math.round((budget * (.62 + (index % 6) * .09) + sourceIndex * 13) / 10) * 10),
    sources: ["携程", "飞猪", index % 2 ? "Booking" : "Agoda"],
    image: `assets/hotel-${sourceIndex % 4 + 1}.jpg`
    };
  });
}

function renderWeather(start, destination) {
  const date = new Date(`${start}T12:00:00`);
  const weather = weatherFor(date.getMonth() + 1, destination);
  const icons = ["☀", "◒", "☁", "☀", "☂", "◒"];
  const labels = ["晴", "晴间多云", "多云", "晴", "短时雨", "晴间多云"];
  $("#weather-days").innerHTML = Array.from({ length: Math.min(6, state.days) }, (_, i) => {
    const day = new Date(date);
    day.setDate(day.getDate() + i);
    const high = weather.high - (i % 3);
    const low = weather.low - (i % 2);
    return `<article class="weather-day"><p>${day.getMonth() + 1}/${day.getDate()} · 周${"日一二三四五六"[day.getDay()]}</p><span class="weather-icon" aria-hidden="true">${icons[i]}</span><strong>${low}–${high}°</strong><span>${labels[i]}</span></article>`;
  }).join("");
  $("#packing-list").innerHTML = weather.items.map(item => `<li>${item}</li>`).join("");
  $("#overview-temp").textContent = `${weather.low}–${weather.high}°`;
  $("#overview-weather").textContent = weather.label;
  $("#overview-wear").textContent = weather.wear;
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
      <div class="hotel-image"><img src="${hotel.image}" alt="${hotel.name}客房与公共空间" loading="lazy" /><span class="hotel-score">${hotel.rating}</span></div>
      <div class="hotel-copy"><h3>${hotel.name}</h3><p class="hotel-location">${hotel.area} · ${hotel.station}步行 ${hotel.walk} 分钟</p><div class="hotel-tags"><span>市中心</span><span>${hotel.sources.length} 平台高评</span></div><div class="hotel-bottom"><span>${hotel.reviews.toLocaleString("zh-CN")} 条评价</span><strong>${money(hotel.price)}<small> / 晚</small></strong></div><div class="hotel-actions"><button class="hotel-select" type="button" data-hotel-select="${hotel.id}">${hotel.id === state.selectedHotel ? "已选住宿" : "选为住宿"}</button><a class="ctrip-link" href="${ctripHotelUrl(hotel)}" target="_blank" rel="noopener noreferrer" aria-label="前往携程查看 ${hotel.name}">携程查看 <span aria-hidden="true">↗</span></a></div></div>
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
    const guide = transportGuides[destination];
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
  $("#buy-destination").textContent = destination;
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
  $("#overview-hotel-rating").textContent = `${hotel.rating} 分`;
  $("#overview-hotel-price").textContent = `${state.nights} 晚 ${money(hotelTotal)}`;
  $("#cost-flight").textContent = money(flight.price);
  $("#cost-hotel").textContent = money(hotelTotal);
  $("#cost-local").textContent = money(local);
  $("#cost-total").textContent = money(total);
  $("#sidebar-total").textContent = money(total);
}

function generatePlan() {
  const origin = $("#origin").value.trim();
  const destination = $("#destination").value.trim();
  const start = $("#start-date").value;
  const end = $("#end-date").value;
  const budget = Number($("#hotel-budget").value);
  if (new Date(end) < new Date(start)) {
    showToast("返程日期需要晚于出发日期");
    return;
  }
  state.days = daysBetween(start, end);
  state.nights = Math.max(1, state.days - 1);
  state.profile = destinationProfiles[destination] || fallbackProfile;
  state.origin = origin;
  state.destination = destination;
  state.start = start;
  state.end = end;
  state.flights = generateFlights(origin, destination);
  state.hotels = generateHotels(state.profile, budget);
  state.selectedFlight = [...state.flights].sort((a, b) => a.price - b.price)[1].id;
  state.selectedHotel = state.hotels.find(hotel => hotel.price <= budget)?.id ?? 0;
  $("#budget-range").value = Math.min(1600, Math.max(400, budget));
  $("#budget-output").value = Math.min(1600, Math.max(400, budget));
  $("#sidebar-destination").textContent = destination;
  $("#greeting-destination").textContent = destination;
  $("#sidebar-date").textContent = `${formatDateRange(start, end)} · ${state.days}天${state.nights}晚`;
  $("#visual-route").textContent = `${origin} → ${destination}`;
  $("#visual-meta").textContent = `${state.days} 天 · 城市漫游 · 经典与购物`;
  $("#final-summary").textContent = `${formatDateRange(start, start).split(" - ")[0]}从${origin}出发，入住市区交通便利酒店，用 ${state.days} 天走过${destination}的经典地标、生活街区与重点购物地。`;
  $$(".route-strip b").forEach((item, index) => { item.textContent = state.profile.route[index]; });
  renderWeather(start, destination);
  renderFlights();
  renderHotels();
  renderItinerary(start, destination);
  updateCosts();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

$("#trip-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const button = $("#generate-button");
  document.body.classList.add("is-loading");
  button.disabled = true;
  setTimeout(() => {
    generatePlan();
    document.body.classList.remove("is-loading");
    button.disabled = false;
    $("#results").scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("攻略已按你的条件重新生成");
  }, 650);
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
  const destination = $("#destination").value.trim();
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

generatePlan();
