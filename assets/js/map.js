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
        review: "University life at HKU. The city is a blend of East and West, tradition and modernity. Hate the crowds, but love the energy."
    },
    {
        name: "Singapore",
        lat: 1.3521,
        lng: 103.8198,
        emoji: "🌴",
        review: "Exchange semester at NUS. The campus is beautiful, and the city-state is a model of efficiency and cleanliness. Boring at times."
    },
    {
        name: "Beijing",
        lat: 39.9042,
        lng: 116.4074,
        emoji: "🏯",
        review: "Capital of China. A city of layers — ancient and futuristic."
    },
    {
        name: "London",
        lat: 51.5074,
        lng: -0.1278,
        emoji: "☕",
        review: "UK study tour with HKU Innovation Academy. Visited Imperial, UCL, and King's. Ancient but elegant. Special London taste in the air."
    },
    {
        name: "Tengger Desert, Inner Mongolia",
        lat: 38.5000,
        lng: 105.0000,
        emoji: "🏜️",
        review: "Service trip with HKU Cedars and YMCA. Sleeping in a yurt, planting trees in sand. That's nature and life."
    },
    {
        name: "Tokyo",
        lat: 35.6762,
        lng: 139.6503,
        emoji: "🗼",
        review: "Visited for a short trip. The city is a mix of tradition and cutting-edge technology. A place of Mono no aware. Inspiring sunshine."
    },
    {
        name: "Seoul",
        lat: 37.5665,
        lng: 126.9780,
        emoji: "🍲",
        review: "Visited for a short trip. Delecated to K-pop and Korean culture. Small streets and vibrant nightlife."
    },
    {
        name: "Taipei",
        lat: 25.0330,
        lng: 121.5654,
        emoji: "🛵",
        review: "A trip to Taiwan. The city is lively, with night markets and street food. Warm accents and friendly people that I miss."
    },
    {
        name: "Shenzheng",
        lat: 22.5431,
        lng: 114.0579,
        emoji: "🏢",
        review: "A third home. Fill me with food and cheap goods. A place of innovation and to escape from the crowds of Hong Kong."
    },
    {
        name: "Guangzhou",
        lat: 23.1291,
        lng: 113.2644,
        emoji: "🍜",
        review: "Cantonese culture that cultivates my taste buds and growth."
    },
    {
        name: "Foshan",
        lat: 23.0215,
        lng: 113.1214,
        emoji: "🏯",
        review: "Hometown"
    },
    {
        name: "Nanjing",
        lat: 32.0603,
        lng: 118.7969,
        emoji: "🏯",
        review: "LOVE"
    },
    {
        name: "Bangkok",
        lat: 13.7563,
        lng: 100.5018,
        emoji: "🌴",
        review: "A short trip to Thailand. Special places and food. A chaotic city."
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