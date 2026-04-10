import { useState } from "react";

const C = { us:"#00d4ff", e1:"#ff7a45", e2:"#c084fc", e3:"#34d399", e4:"#fbbf24", e5:"#f472b6" };

const mkBg = c => `linear-gradient(135deg, ${c}0a 0%, ${c}04 100%)`;
const mkBorder = c => `1px solid ${c}45`;

const LAYERS = [
  {
    id:"us", color:C.us, icon:"🇺🇸", cake:null,
    title:"美股 AI 龍頭驅動引擎",
    sub:"4大CSP 2026年資本支出逾4,500億美元，帶動全球供應鏈",
    companies:[
      {n:"NVIDIA",   t:"NVDA",  r:"GPU/AI晶片生態系王者",  f:"🔥", hot:true },
      {n:"Microsoft",t:"MSFT",  r:"Azure / OpenAI",        f:"☁️" },
      {n:"Google",   t:"GOOGL", r:"GCP / TPU / Gemini",    f:"🔍" },
      {n:"Amazon",   t:"AMZN",  r:"AWS / Trainium ASIC",   f:"📦" },
      {n:"Meta",     t:"META",  r:"LLaMA / AI研究",        f:"🌐" },
      {n:"AMD",      t:"AMD",   r:"GPU/CPU競爭者",         f:"⚡" },
      {n:"Oracle",   t:"ORCL",  r:"雲端資料中心擴張",     f:"🏛️" },
      {n:"Broadcom", t:"AVGO",  r:"ASIC / 網路晶片",      f:"🔧" },
    ],
    deep: null,
  },
  {
    id:"e1", color:C.e1, icon:"⚡", cake:"第一層",
    title:"能源 Energy",
    sub:"即時AI需要即時電力｜Rubin Ultra 功耗600kW，電力成第一性原理",
    desc:"每個Token都是電子流動的結果，能源是限制AI產生智慧的根本物理門檻",
    companies:[
      {n:"台達電",   t:"2308", r:"電源/UPS/BBU全端解決", f:"🔋", hot:true},
      {n:"光寶科",   t:"2301", r:"電源模組",             f:"💡"},
      {n:"順達",     t:"3211", r:"BBU/AWS.Google供應鏈", f:"🔌"},
      {n:"新盛力",   t:"4931", r:"BBU/Meta高壓認證",    f:"⚡"},
      {n:"中興電",   t:"1513", r:"重電/變壓器",          f:"🏭"},
      {n:"華城",     t:"1519", r:"重電設備/AI資料中心",  f:"🔧"},
      {n:"士林電機", t:"1503", r:"配電設備",             f:"⚙️"},
    ],
    deep:{
      groups:[
        { label:"🔌 銅線纜/導體", note:"AI資料中心用銅量是傳統DC的4-5倍，銅價屢創新高",
          items:[{n:"華新麗華",t:"1605",r:"電線電纜龍頭"},{n:"大亞電線",t:"1609",r:"電線電纜"},{n:"合機",t:"1618",r:"電機銅材"}]},
        { label:"🔋 UPS/BBU不斷電", note:"超大規模資料中心須備援電力，BBU取代傳統UPS直接在機架備援",
          items:[{n:"台達電",t:"2308",r:"UPS/BBU全端"},{n:"飛宏",t:"2457",r:"充電/電源模組"},{n:"碩天",t:"3617",r:"UPS不斷電系統"}]},
        { label:"⚡ HVDC高壓直流", note:"Rubin Ultra 600kW機架逼近HVDC架構，1MW Power Rack預計2026下半年出貨",
          items:[{n:"台達電",t:"2308",r:"HVDC Power Rack研發"},{n:"新盛力",t:"4931",r:"BBU+HVDC轉換"}]},
      ]
    }
  },
  {
    id:"e2", color:C.e2, icon:"💎", cake:"第二層",
    title:"晶片 Chips",
    sub:"電力→算力｜NVIDIA GPU面積每代+70%，2nm靶材需求是7nm的3倍以上",
    desc:"HBM高頻寬記憶體+高速互連技術，決定了智慧成本能降多少",
    companies:[
      {n:"台積電",   t:"2330", r:"3/5nm CoWoS封裝龍頭",   f:"👑", hot:true},
      {n:"聯發科",   t:"2454", r:"AI ASIC/IC設計",        f:"🧠"},
      {n:"世芯-KY",  t:"3661", r:"客製化ASIC設計",        f:"🎯"},
      {n:"創意電子", t:"3443", r:"ASIC/IP設計，千金股",   f:"✏️"},
      {n:"日月光",   t:"3711", r:"先進封裝SiP/CoWoS外包",f:"📦"},
      {n:"信驊",     t:"5274", r:"BMC 80%壟斷，股王萬元", f:"🔐", hot:true},
      {n:"京元電",   t:"2449", r:"AI晶片測試/封測",       f:"🔬"},
    ],
    deep:{
      groups:[
        { label:"🎯 靶材 Sputtering Target", note:"2nm需求量是7nm的3倍以上，光洋科擠下日/美商成台積電3nm主力供應商",
          items:[{n:"光洋科",t:"1785",r:"鈦/鉭/銅合金靶材，2nm供應商"},{n:"崇越",t:"5434",r:"半導體材料代理/靶材"},{n:"中砂",t:"1560",r:"CMP鑽石碟，台積電3nm主力"}]},
        { label:"🧴 特用化學品/光阻劑", note:"先進製程每奈米縮小一代，化學品規格跳升，長興為全球最大乾膜光阻商",
          items:[{n:"長興",t:"1717",r:"全球最大乾膜光阻/ABF絕緣樹脂"},{n:"崇越",t:"5434",r:"半導體耗材代理"},{n:"勝一",t:"1773",r:"半導體清洗化學品"}]},
        { label:"💧 CMP濕製程/清洗設備", note:"CoWoS增加多道CMP步驟，2026滿載至2027年，弘塑EPS預估63元",
          items:[{n:"辛耘",t:"3583",r:"濕製程設備，CoWoS核心，2026滿載"},{n:"弘塑",t:"3131",r:"電鍍/清洗，2026 EPS目標63元"}]},
        { label:"💎 製程氣體/機台環境", note:"ASML設備旁需惰性氣體環境防止干擾，竹陞2025年EPS達15元飆至千金",
          items:[{n:"華景電",t:"6788",r:"設備外加惰性氣體環境"},{n:"竹陞科技",t:"6739",r:"機台外加設備，2025天價千金"}]},
        { label:"🎞️ 先進封裝特用材料", note:"山太士工程膠帶解決CoWoS晶片翹曲，32元→1875元，漲幅5759%",
          items:[{n:"山太士",t:"3595",r:"CoWoS翹曲膠帶+FOPLP封裝材料，漲幅5759%",hot:true}]},
        { label:"🏭 晶圓廠建造工程（廠務五雄）", note:"台積電2026年資本支出560億美元新高，廠務工程訂單排到2026年後",
          items:[
            {n:"漢唐",t:"2404",r:"台積電統包，EPS 48元，訂單千億",hot:true},
            {n:"亞翔",t:"6139",r:"EPS 30.51元，訂單2,084億創新高",hot:true},
            {n:"洋基工程",t:"6691",r:"EPS 24.76元，訂單550億",hot:true},
            {n:"帆宣",t:"6196",r:"EPS 15.5元，獲利年增79.8%"},
            {n:"聖暉＊",t:"5536",r:"興櫃，EPS 28.42元，在手訂單600億",esb:true},
          ]},
        { label:"🔧 ABF載板製程設備", note:"長廣精機全球中高階真空壓膜機市占95%，竑騰CoWoS點膠AOI設備千金股",
          items:[
            {n:"長廣精機＊",t:"7795",r:"興櫃，ABF真空壓膜機全球市占95%",esb:true,hot:true},
            {n:"竑騰",t:"7751",r:"CoWoS點膠/AOI設備，千金股1565元",hot:true},
          ]},
        { label:"🔬 晶圓測試/探針卡", note:"漢測從100元飆至1135元，台灣唯一薄膜探針卡自製商，鴻勁天價3450元",
          items:[
            {n:"漢測＊",t:"7856",r:"興櫃，探針卡+矽光子測試，100→1135元",esb:true,hot:true},
            {n:"鴻勁",t:"7769",r:"半導體測試機台國產化，天價3450元",hot:true},
            {n:"精測",t:"6510",r:"先進封裝後段測試，千金股"},
            {n:"致茂",t:"2360",r:"測試機台"},
            {n:"昇陽半",t:"8028",r:"再生晶圓製造"},
          ]},
      ]
    }
  },
  {
    id:"e3", color:C.e3, icon:"🏭", cake:"第三層",
    title:"基礎設施 Infrastructure",
    sub:"AI工廠製造智慧，不是儲存資訊｜T-Glass玻纖布全球供應缺口是2026最大瓶頸",
    desc:"CoWoS 2026年底月產能7.5萬片年增100%，從土地到網路全面升級",
    subs:[
      { label:"🖥️ 伺服器 ODM 組裝",
        companies:[
          {n:"鴻海",  t:"2317",r:"AI機架GB300",    f:"🏢"},
          {n:"廣達",  t:"2382",r:"Google最大AI伺服器代工",f:"💻"},
          {n:"緯創",  t:"3231",r:"AI伺服器擴廠",  f:"🖥️"},
          {n:"緯穎",  t:"6669",r:"100%雲端ODM，千金股",f:"☁️",hot:true},
          {n:"英業達",t:"2356",r:"AI伺服器ODM",  f:"⚙️"},
          {n:"技嘉",  t:"2376",r:"GPU伺服器/主機板",f:"🎮"},
        ]},
      { label:"❄️ 散熱系統",
        companies:[
          {n:"奇鋐",  t:"3017",r:"液冷龍頭/MCCP共研NVIDIA",f:"🧊",hot:true},
          {n:"雙鴻",  t:"3324",r:"液冷訂單到2027年，千金股", f:"💧",hot:true},
          {n:"健策",  t:"3653",r:"均熱片/Vapor Chamber，千金股",f:"🌡️",hot:true},
          {n:"建準",  t:"2421",r:"散熱風扇",               f:"🌀"},
          {n:"元鈦科＊",t:"7892",r:"興櫃/緯創轉投資，液冷CDU，238→820元",f:"💦",esb:true,hot:true},
        ]},
      { label:"🌐 網路/光通訊",
        companies:[
          {n:"智邦",  t:"2345",r:"800G交換器，千金股",f:"🔗",hot:true},
          {n:"波若威",t:"3163",r:"NVIDIA GTC點名矽光子",f:"✨",hot:true},
          {n:"聯亞",  t:"3081",r:"CPO/磷化銦材料",    f:"🔦"},
          {n:"光聖",  t:"6442",r:"800G模組，CSP客戶，千金股",f:"💫",hot:true},
          {n:"華星光",t:"6550",r:"打入Google/AWS供應鏈",f:"🌟"},
          {n:"上詮",  t:"3363",r:"光纖連接器/CPO",    f:"🔌"},
        ]},
      { label:"🗄️ 機殼/機架/滑軌",
        companies:[
          {n:"勤誠",  t:"6210",r:"AI伺服器機殼，2025漲幅282%",f:"📦",hot:true},
          {n:"川湖",  t:"2059",r:"伺服器機架滑軌，千金股",    f:"🔩",hot:true},
        ]},
    ],
    deep:{
      groups:[
        { label:"🕸️ T-Glass 高階玻纖布（2026最大供應瓶頸）", note:"⚠️ ABF載板必備材料，全球產能極度吃緊，德宏2025年漲幅冠軍686%",
          items:[
            {n:"德宏",t:"5475",r:"T-Glass玻纖布，2025漲幅第一名686%",hot:true},
            {n:"富喬",t:"1815",r:"高階玻纖布，漲幅257%",hot:true},
            {n:"南亞",t:"1303",r:"CCL+玻纖布+南電ABF三重受惠"},
            {n:"台玻",t:"1802",r:"電子級玻璃/玻纖布"},
          ]},
        { label:"🟫 CCL 銅箔基板（M7-M9等級，訂單接不完）", note:"高階CCL全球極度緊俏，台光電創天價1695元，台燿漲幅204%",
          items:[
            {n:"台光電",t:"2383",r:"M7-M9高階CCL，天價1695元",hot:true},
            {n:"台燿",  t:"6274",r:"Google TPU/AWS ASIC訂單，漲204%",hot:true},
            {n:"南亞",  t:"1303",r:"CCL+銅箔垂直整合"},
            {n:"金居",  t:"8358",r:"電解銅箔，伺服器/網通高頻高速"},
          ]},
        { label:"🧪 高階樹脂/特用化學（上游的上游）", note:"國精化HC材2026產能衝3倍，毛利率15%→24%，CSP大廠追單追到門口",
          items:[
            {n:"國精化",t:"4722",r:"HC材/PSMA特用樹脂，2026產能3倍，漲幅312%",hot:true},
            {n:"長興",  t:"1717",r:"ABF絕緣膜樹脂/全球最大乾膜光阻"},
          ]},
        { label:"🪟 玻璃基板（次世代封裝革命）", note:"比ABF更平整低翹曲，欣興台廠第一，2026良率目標85%突破，2027後爆發",
          items:[
            {n:"欣興",t:"3037",r:"ABF全球一梯隊+玻璃基板研發台廠第一"},
            {n:"南電",t:"8046",r:"800G網通ABF，稼動率85-90%，玻璃基板研發"},
            {n:"辛耘",t:"3583",r:"玻璃基板濕製程設備，2026滿載至2027"},
          ]},
        { label:"📋 高階 ABF 載板（AI GPU面積+70%/代，層數16→20+層）", note:"2026供需缺口擴大，欣興/南電訂單能見度延伸至2027年",
          items:[
            {n:"欣興",    t:"3037",r:"ABF全球一梯隊，NVIDIA/Apple核心"},
            {n:"南電",    t:"8046",r:"800G ABF，ABF產能增長20-30%"},
            {n:"景碩",    t:"3189",r:"BT載板/ABF轉型，EV Zonal架構"},
            {n:"臻鼎-KY", t:"4958",r:"500億資本支出，10個廠動工"},
            {n:"華通",    t:"2313",r:"SpaceX最大PCB廠，AI+衛星雙題材"},
          ]},
      ]
    }
  },
  {
    id:"e4", color:C.e4, icon:"🤖", cake:"第四層",
    title:"模型 Models",
    sub:"語言/生物/化學/物理模擬/蛋白質AI｜語言模型只是冰山一角",
    desc:"開源模型廣泛流通，加速應用採用，反而拉升訓練算力、晶片、能源的整體需求",
    companies:[
      {n:"研華",  t:"2395", r:"工業AI/邊緣運算龍頭",f:"🏭"},
      {n:"宜鼎",  t:"5289", r:"工控記憶體/AI儲存，漲幅逾倍",f:"💾",hot:true},
      {n:"群聯",  t:"8299", r:"NAND Flash控制/SSD，千金股",f:"💿",hot:true},
      {n:"智原",  t:"3035", r:"FPGA/AI加速IP矽智財",f:"⚡"},
      {n:"南亞科",t:"2408", r:"DDR5/HBM記憶體，漲幅559%",f:"🧠",hot:true},
      {n:"華邦電",t:"2344", r:"Flash記憶體，漲幅458%",f:"📱",hot:true},
    ],
    deep:{
      groups:[
        { label:"🧠 HBM 高頻寬記憶體", note:"H100→B200 HBM從6顆增至12顆，每顆面積+50%，AI伺服器HBM用量暴增",
          items:[{n:"南亞科",t:"2408",r:"DDR5/HBM研發，台廠唯一"},{n:"欣興",t:"3037",r:"HBM載板，最高技術門檻"}]},
        { label:"⚙️ CoWoS 先進封裝設備（CAGR 50%）", note:"台積電CoWoS 2022-2026年CAGR達50%，設備商訂單能見度延伸兩年",
          items:[
            {n:"辛耘",t:"3583",r:"濕製程設備，2026產能滿載至2027"},
            {n:"弘塑",t:"3131",r:"電鍍清洗CoWoS核心，EPS目標63元",hot:true},
            {n:"萬潤",t:"6187",r:"CoWoS揀晶設備"},
            {n:"中砂",t:"1560",r:"CMP鑽石碟研磨工具"},
            {n:"家登",t:"3680",r:"EUV光罩盒/CoWoS關鍵零組件"},
          ]},
        { label:"🔭 晶圓測試/再生晶圓", note:"先進製程/CoWoS測試難度與門檻大幅提升，鴻勁天價3450元",
          items:[
            {n:"漢測＊",t:"7856",r:"興櫃，探針卡+矽光子測試一條龍",esb:true},
            {n:"鴻勁",  t:"7769",r:"測試機台國產化代表，天價股"},
            {n:"致茂",  t:"2360",r:"測試機台"},
            {n:"昇陽半",t:"8028",r:"再生晶圓製造"},
          ]},
      ]
    }
  },
  {
    id:"e5", color:C.e5, icon:"🚀", cake:"第五層",
    title:"應用 Applications",
    sub:"藥物研發/工業機器人/自動駕駛/AI PC｜技術轉化為真實經濟價值",
    desc:"黃仁勳：機器人將在5年內大規模量產，Physical AI是下一波最大爆發",
    companies:[
      {n:"上銀",  t:"2049", r:"工業機器人/精密模組",f:"🤖"},
      {n:"樺漢",  t:"6414", r:"邊緣AI控制器",      f:"📟"},
      {n:"華碩",  t:"2357", r:"AI PC/AI裝置",      f:"💻"},
      {n:"宏碁",  t:"2353", r:"AI PC消費端",        f:"🖥️"},
      {n:"所羅門",t:"2359", r:"工業視覺AI，漲幅3倍",f:"👁️",hot:true},
      {n:"研華",  t:"2395", r:"工業電腦/AIoT",      f:"🏭"},
    ],
    deep:{
      groups:[
        { label:"🦾 人形機器人零組件", note:"黃仁勳：5年內大規模量產，Physical AI帶動機器人週邊全面受惠",
          items:[
            {n:"上銀",  t:"2049",r:"線性滑軌/機器人關節"},
            {n:"台達電",t:"2308",r:"工業自動化/馬達驅動"},
            {n:"和椿",  t:"6215",r:"機器人傳動元件"},
            {n:"穎漢",  t:"4562",r:"機器人精密零件，漲幅3倍"},
            {n:"所羅門",t:"2359",r:"工業視覺AI系統"},
          ]},
        { label:"✨ 矽光子/CPO（2026商轉元年）", note:"NVIDIA定調2026矽光子商轉元年，CPO 2025-2029 CAGR 100%，波若威GTC點名",
          items:[
            {n:"波若威",  t:"3163",r:"NVIDIA GTC點名，矽光子模組",hot:true},
            {n:"聯亞",    t:"3081",r:"磷化銦/CPO材料"},
            {n:"光聖",    t:"6442",r:"800G光模組，CSP客戶，千金股",hot:true},
            {n:"華星光",  t:"6550",r:"Google/AWS供應鏈"},
            {n:"達發",    t:"6526",r:"聯發科子公司100G SerDes晶片"},
            {n:"環宇-KY", t:"4991",r:"800G PD全球市占第一"},
          ]},
        { label:"💻 AI PC / 端側推論", note:"AI推論從雲端→邊緣，端側NPU晶片需求起飛，AI PC換機潮啟動",
          items:[
            {n:"華碩",t:"2357",r:"AI PC硬體平台"},
            {n:"宏碁",t:"2353",r:"AI PC消費端"},
            {n:"緯創",t:"3231",r:"AI NB代工"},
            {n:"仁寶",t:"2324",r:"NB代工/AI終端"},
          ]},
      ]
    }
  },
];

// ─── 子組件 ──────────────────────────────────────────────────
function Chip({ item, color, compact }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{
        background: h ? `${color}18` : `${color}08`,
        border: `1px solid ${h ? color+"60" : color+"28"}`,
        borderRadius:8, padding: compact ? "4px 8px" : "7px 10px",
        cursor:"default", transition:"all 0.15s",
        transform: h ? "translateY(-1px)" : "none",
        position:"relative",
      }}>
      <div style={{display:"flex",alignItems:"center",gap:5}}>
        {item.f && <span style={{fontSize:13}}>{item.f}</span>}
        <div>
          <div style={{color:"#f0f0f0",fontWeight:700,fontSize:11,fontFamily:"'Courier New',monospace",letterSpacing:0.3,display:"flex",alignItems:"center",gap:4}}>
            {item.n}
            {item.hot && <span style={{color:"#fbbf24",fontSize:9}}>★</span>}
            {item.esb && <span style={{background:"#f59e0b",color:"#1a0a00",fontSize:8,padding:"1px 4px",borderRadius:3,fontWeight:800,letterSpacing:0.5}}>興</span>}
          </div>
          <div style={{color,fontSize:9,fontWeight:700,letterSpacing:0.5,fontFamily:"'Courier New',monospace"}}>{item.t}</div>
        </div>
      </div>
      {!compact && item.r && (
        <div style={{color:"#888",fontSize:9,marginTop:3,lineHeight:1.35}}>{item.r}</div>
      )}
    </div>
  );
}

function DeepGroup({ g, color }) {
  return (
    <div style={{marginBottom:14}}>
      <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,marginBottom:7}}>
        <span style={{color:"#ddd",fontSize:11,fontWeight:700}}>{g.label}</span>
        {g.note && (
          <span style={{color:"#888",fontSize:9,fontStyle:"italic",background:"rgba(251,191,36,0.07)",border:"1px solid rgba(251,191,36,0.18)",borderRadius:4,padding:"1px 6px",maxWidth:420}}>
            💡 {g.note}
          </span>
        )}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {g.items.map((c,i)=>(
          <div key={i} style={{background:`${color}0c`,border:`1px solid ${color}30`,borderRadius:7,padding:"5px 9px",cursor:"default"}}>
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <span style={{color:"#eee",fontWeight:700,fontSize:11,fontFamily:"'Courier New',monospace"}}>{c.n}</span>
              <span style={{color,fontSize:9,fontWeight:700}}>{c.t}</span>
              {c.hot && <span style={{color:"#fbbf24",fontSize:9}}>★</span>}
              {c.esb && <span style={{background:"#f59e0b",color:"#1a0a00",fontSize:8,padding:"1px 4px",borderRadius:3,fontWeight:800}}>興</span>}
            </div>
            {c.r && <div style={{color:"#666",fontSize:9,marginTop:2,lineHeight:1.3}}>{c.r}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Arrow({ from, to }) {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",margin:"2px 0",gap:0}}>
      <div style={{width:2,height:16,background:`linear-gradient(to bottom,${from}70,${to})`}}/>
      <div style={{width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:`8px solid ${to}`}}/>
    </div>
  );
}

// ─── 主組件 ──────────────────────────────────────────────────
export default function App() {
  const [expanded, setExpanded]   = useState({e3:true,e2:true});
  const [deepOpen, setDeepOpen]   = useState({});

  return (
    <div style={{
      minHeight:"100vh",
      background:"#030c1a",
      color:"#fff",
      fontFamily:"Georgia,serif",
      padding:"24px 14px 48px",
      backgroundImage:`
        radial-gradient(ellipse at 10% 5%, rgba(0,212,255,0.07) 0%,transparent 40%),
        radial-gradient(ellipse at 90% 95%, rgba(196,132,252,0.07) 0%,transparent 40%),
        radial-gradient(ellipse at 50% 50%, rgba(52,211,153,0.03) 0%,transparent 60%),
        linear-gradient(rgba(0,212,255,0.02) 1px,transparent 1px),
        linear-gradient(90deg,rgba(0,212,255,0.02) 1px,transparent 1px)
      `,
      backgroundSize:"100% 100%,100% 100%,100% 100%,40px 40px,40px 40px",
    }}>
      <style>{`
        @keyframes fadeSlide{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
        @keyframes pulse{0%,100%{opacity:0.6}50%{opacity:1}}
        .deep-in{animation:fadeSlide 0.28s ease}
      `}</style>

      {/* ── Header ── */}
      <div style={{textAlign:"center",marginBottom:32}}>
        <div style={{fontSize:32,marginBottom:4}}>🎂</div>
        <div style={{color:"#00d4ff",fontSize:10,letterSpacing:7,fontFamily:"'Courier New',monospace",marginBottom:8,textTransform:"uppercase"}}>
          NVIDIA GTC 2025 ✦ Jensen Huang's Five-Layer Cake
        </div>
        <h1 style={{
          fontSize:"clamp(20px,4vw,34px)",fontWeight:900,margin:"0 0 8px",
          background:"linear-gradient(135deg,#00d4ff 0%,#c084fc 40%,#f472b6 70%,#fbbf24 100%)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
          letterSpacing:1,lineHeight:1.2,
        }}>
          AI 供應鏈超級大蛋糕 × 台股全景地圖
        </h1>
        <p style={{color:"#555",fontSize:12,fontFamily:"'Courier New',monospace",margin:0}}>
          美股驅動 → 五層蛋糕 → 台股受惠全覆蓋　｜　點 🔬深挖 展開上游原物料　｜　★ 高成長飆股　｜　<span style={{background:"#f59e0b",color:"#1a0a00",padding:"1px 5px",borderRadius:3,fontSize:10,fontWeight:800}}>興</span> 興櫃
        </p>
        <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:12,flexWrap:"wrap"}}>
          {Object.entries({能源:C.e1,晶片:C.e2,基礎設施:C.e3,模型:C.e4,應用:C.e5}).map(([k,c])=>(
            <span key={k} style={{fontSize:11,color:c,fontFamily:"'Courier New',monospace"}}>
              <span style={{width:8,height:8,background:c,borderRadius:2,display:"inline-block",marginRight:5}}/>
              {k}
            </span>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto"}}>
        {LAYERS.map((layer, idx) => {
          const open  = !!expanded[layer.id];
          const dOpen = !!deepOpen[layer.id];

          return (
            <div key={layer.id}>
              {idx > 0 && <Arrow from={LAYERS[idx-1].color} to={layer.color}/>}

              {/* ── 層卡片 ── */}
              <div style={{
                background: mkBg(layer.color),
                border: mkBorder(layer.color),
                borderRadius:16,
                padding:"16px 18px",
                position:"relative",
                overflow:"hidden",
              }}>
                {/* 裝飾光條 */}
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${layer.color}80,transparent)`}}/>

                {/* 頭部 */}
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10,marginBottom:12,flexWrap:"wrap"}}>
                  <div style={{flex:1,minWidth:200}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:3}}>
                      <h2 style={{margin:0,fontSize:"clamp(14px,3vw,18px)",fontWeight:900,color:layer.color,letterSpacing:0.5}}>
                        {layer.icon} {layer.title}
                      </h2>
                      {layer.cake && (
                        <span style={{
                          background:`${layer.color}18`,border:`1px solid ${layer.color}55`,
                          color:layer.color,fontSize:9,padding:"2px 8px",borderRadius:20,
                          letterSpacing:1.5,fontFamily:"'Courier New',monospace",fontWeight:700,
                        }}>🎂 蛋糕{layer.cake}</span>
                      )}
                    </div>
                    <div style={{color:"#888",fontSize:10,fontFamily:"'Courier New',monospace",marginBottom:2}}>{layer.sub}</div>
                    {layer.desc && <div style={{color:"#555",fontSize:10,fontStyle:"italic"}}>「{layer.desc}」</div>}
                  </div>

                  <div style={{display:"flex",gap:7,alignItems:"center",flexShrink:0}}>
                    {layer.deep && (
                      <button onClick={()=>setDeepOpen(p=>({...p,[layer.id]:!p[layer.id]}))}
                        style={{
                          background: dOpen ? `${layer.color}22` : "rgba(255,255,255,0.04)",
                          border:`1px solid ${layer.color}55`,color:layer.color,
                          fontSize:11,padding:"5px 12px",borderRadius:20,cursor:"pointer",
                          fontFamily:"'Courier New',monospace",transition:"all 0.2s",
                        }}>
                        🔬 深挖 {dOpen?"▲":"▼"}
                      </button>
                    )}
                    <button onClick={()=>setExpanded(p=>({...p,[layer.id]:!p[layer.id]}))}
                      style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.12)",
                        color:"#999",fontSize:11,padding:"5px 12px",borderRadius:20,cursor:"pointer"}}>
                      {open?"收合":"展開"}
                    </button>
                  </div>
                </div>

                {/* 公司列表 */}
                {layer.subs ? (
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    {layer.subs.map(s=>(
                      <div key={s.label}>
                        <div style={{color:layer.color,fontSize:9,letterSpacing:2,marginBottom:6,fontFamily:"'Courier New',monospace",opacity:0.9,textTransform:"uppercase"}}>{s.label}</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                          {s.companies.map(c=><Chip key={c.t+c.n} item={c} color={layer.color} compact={!open}/>)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {layer.companies.map(c=><Chip key={c.t+c.n} item={c} color={layer.color} compact={!open}/>)}
                  </div>
                )}

                {/* 深挖面板 */}
                {dOpen && layer.deep && (
                  <div className="deep-in" style={{
                    marginTop:14,padding:"14px 16px",
                    background:"rgba(0,0,0,0.35)",
                    border:`1px dashed ${layer.color}40`,
                    borderRadius:12,
                  }}>
                    <div style={{color:layer.color,fontSize:11,fontWeight:700,marginBottom:12,letterSpacing:1,fontFamily:"'Courier New',monospace"}}>
                      🔬 深挖：上游原物料 × 週邊設備產業
                    </div>
                    {layer.deep.groups.map((g,i)=><DeepGroup key={i} g={g} color={layer.color}/>)}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* 統計欄 */}
        <div style={{
          marginTop:28,padding:"16px 20px",
          background:"rgba(255,255,255,0.02)",
          border:"1px solid rgba(255,255,255,0.07)",
          borderRadius:14,
          display:"flex",flexWrap:"wrap",gap:20,
        }}>
          {[
            ["💰","美股龍頭","8 家","驅動端"],
            ["🏭","台股上市櫃","60+ 家","受惠端"],
            ["⭐","興櫃新星","5 家","成長端"],
            ["★","高成長飆股","30+ 家","已標注"],
          ].map(([icon,label,val,sub])=>(
            <div key={label} style={{textAlign:"center",flex:"1 1 100px"}}>
              <div style={{fontSize:18}}>{icon}</div>
              <div style={{color:"#888",fontSize:10,fontFamily:"'Courier New',monospace"}}>{label}</div>
              <div style={{color:"#fff",fontSize:18,fontWeight:900,lineHeight:1.2}}>{val}</div>
              <div style={{color:"#555",fontSize:9}}>{sub}</div>
            </div>
          ))}
          <div style={{flex:"2 1 300px",borderLeft:"1px solid rgba(255,255,255,0.07)",paddingLeft:20}}>
            <div style={{color:"#f59e0b",fontSize:11,marginBottom:4,fontFamily:"'Courier New',monospace"}}>⚠️ 免責聲明</div>
            <div style={{color:"#444",fontSize:10,lineHeight:1.6}}>本圖僅供教育研究參考，不構成任何投資建議。代號資訊以公開資訊觀測站為準，投資有風險，請自行評估。</div>
            <div style={{color:"#444",fontSize:10,marginTop:4}}>資料來源：國泰投信・玉山投顧・理財周刊・財報狗・數位時代・iThome・TechNews（2025–2026）</div>
          </div>
        </div>
      </div>
    </div>
  );
}
