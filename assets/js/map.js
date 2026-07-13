// ========================================
// 互动地图数据
// ========================================

function getPinColor() {
    var computed = getComputedStyle(document.documentElement);
    var color = computed.getPropertyValue('--link-color').trim();
    return color || '#b8860b';
}

var locations = [
    {
        name: "Hong Kong",
        lat: 22.3193,
        lng: 114.1694,
        emoji: "🏙️",
        review: "Home base. A city that never stops teaching me something new — from Cantonese to the density of ideas in a tiny apartment."
    },
    {
        name: "Singapore",
        lat: 1.3521,
        lng: 103.8198,
        emoji: "🌴",
        review: "Spent time at NUS working on LLM editing. The humidity matches the intensity of the research culture. Loved the hawker centers."
    },
    {
        name: "Beijing",
        lat: 39.9042,
        lng: 116.4074,
        emoji: "🏯",
        review: "A city of layers — ancient and futuristic. The mathematics community here is vibrant and deeply connected."
    },
    {
        name: "London",
        lat: 51.5074,
        lng: -0.1278,
        emoji: "☕",
        review: "UK study tour with HKU Innovation Academy. Visited Imperial, UCL, and King's. The conversations on AI policy were unforgettable."
    },
    {
        name: "Tengger Desert, Inner Mongolia",
        lat: 38.5000,
        lng: 105.0000,
        emoji: "🏜️",
        review: "Service trip with HKU Cedars and YMCA. Sleeping in a yurt, planting trees in sand, and realizing how fragile ecosystems really are."
    }
];

// 初始化地图
var map = L.map('travel-map').setView([30, 110], 5);

// 加载底图 (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(map);

// 自定义图钉 (只使用 SVG 圆点 + 小针，无图标)
function createMarkerPin(color) {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="
            width: 14px;
            height: 14px;
            background: ${color};
            border: 2px solid #ffffff;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.25);
            position: relative;
            cursor: pointer;
        ">
        <div style="
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 6px solid ${color};
        "></div>
        </div>`,
        iconSize: [14, 20],
        iconAnchor: [7, 20],
        popupAnchor: [0, -24]
    });
}

// 主题色变量 (跟随网站主题)
var pinColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--link-color').trim() || '#b8860b';

// 添加图钉
locations.forEach(function(loc) {
    var marker = L.marker([loc.lat, loc.lng], {
        icon: createMarkerPin(pinColor)
    }).addTo(map);
    
    // Popup 内容: 名称 + emoji + 评价
    marker.bindPopup(`
        <div style="
            font-family: 'Palatino Linotype', Georgia, serif;
            max-width: 240px;
            padding: 2px 0;
        ">
            <div style="
                font-weight: 700;
                font-size: 1.05rem;
                color: #2d2d2d;
                margin-bottom: 2px;
            ">
                ${loc.emoji} ${loc.name}
            </div>
            <div style="
                font-size: 0.85rem;
                color: #4a4a4a;
                line-height: 1.5;
                font-style: italic;
            ">
                "${loc.review}"
            </div>
        </div>
    `, {
        maxWidth: 260,
        className: 'travel-popup'
    });
});

// 窗口自适应
setTimeout(function() {
    map.invalidateSize();
}, 500);