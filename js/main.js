// header_top
const header = document.getElementById('header');
const spacer = document.getElementById('spacer');

window.addEventListener('scroll', () => {
  if (window.scrollY > 90) {
    header.classList.add('fixed');
    spacer.classList.add('active'); // 防止內容跳動
  } else {
    header.classList.remove('fixed');
    spacer.classList.remove('active');
  }
});

// ----------------------------------------------------------------------------------------

// menu 漢堡選單
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Close hamburger menu when clicking outside
window.addEventListener('click', (event) => {
  if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
    navMenu.classList.remove('show');
  }
});

// ----------------------------------------------------------------------------------------

// 錨點 scroll
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', (e) => {
    // 可自訂：GA 追蹤、動畫、console log 等
    console.log(`前往 ${link.getAttribute('href')}`);
  });
});

// ----------------------------------------------------------------------------------------

// 動態效果
const container = document.getElementById('carousel');
const totalImages = 96; // 更新為 36 張圖片
const boxHeight = 10;
const maxOffset = 20; // 最大偏移距離

// 固定圖片 ID 陣列，使用不同的圖片，現在有 36 張圖片
const imageIds = [
  1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039,
  1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059,
  1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079,
  1080, 1081, 1082, 1083, 1084, 1085, 1086, 1087, 1088, 1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099,
  1100, 1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112, 1113, 1114, 1115,
];

// 建立圖片與初始狀態
const imageData = [];

for (let i = 0; i < totalImages; i++) {
  const imgBox = document.createElement('div');
  imgBox.className = 'image_container_box';

  const img = document.createElement('img');
  img.src = `./images/dynamic_img/${imageIds[i]}.png`; // 使用本地圖片
  img.alt = `img${i + 1}`;

  imgBox.appendChild(img);
  container.appendChild(imgBox);

  imageData.push({
    el: img,
    offset: 0,
    direction: (i % 2 === 0) ? 1 : -1 // 偶數往下、奇數往上
  });
}

// 動畫主迴圈
function imageAnimate() {
  imageData.forEach(data => {
    data.offset += data.direction * 0.5; // 移動速度

    // 到達上下邊界就反轉方向
    if (data.offset > maxOffset) {
      data.offset = maxOffset;
      data.direction = -1;
    } else if (data.offset < -maxOffset) {
      data.offset = -maxOffset;
      data.direction = 1;
    }

    data.el.style.transform = `translateY(${data.offset}px)`;
  });

  requestAnimationFrame(imageAnimate);
}

imageAnimate(); // 啟動動畫

// ----------------------------------------------------------------------------------------

// language 語系
function toggleDropdown(event) {
  event.preventDefault();
  const menu = document.getElementById("dropdownMenu");
  menu.classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.closest('.dropdown-toggle')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("show");
    }
  }
}

function changeLanguage(langCode) {
  // 關閉下拉選單
  document.getElementById('dropdownMenu').classList.remove('show');

  // 更新頂部圖示
  const topIcon = document.querySelector('.dropdown-toggle img');
  const newIconSrc = `./images/icon_${langCode === 'en' ? '1' :
    langCode === 'zh-TW' ? '2' :
      langCode === 'ja' ? '3' :
        langCode === 'pt' ? '4' : '1'
    }.svg`;

  if (topIcon) {
    topIcon.src = newIconSrc;
    topIcon.alt = `icon_${langCode}`;
  }

  // 設置 cookie
  document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${window.location.host}`;
  document.cookie = `googtrans=/en/${langCode}; path=/`;

  // 重新加載翻譯
  location.reload();
}

// 檢查當前語言並設置對應圖示
function setLanguageIcon() {
  const topIcon = document.querySelector('.dropdown-toggle img');
  if (!topIcon) return;

  // 從 cookie 獲取當前語言
  const cookie = document.cookie.split(';').find(c => c.trim().startsWith('googtrans='));
  let currentLang = 'en'; // 默認英文

  if (cookie) {
    const langCode = cookie.split('/')[2];
    currentLang = langCode;
  }

  // 設置對應圖示
  const newIconSrc = `./images/icon_${currentLang === 'en' ? '1' :
    currentLang === 'zh-TW' ? '2' :
      currentLang === 'ja' ? '3' :
        currentLang === 'pt' ? '4' : '1'
    }.svg`;

  topIcon.src = newIconSrc;
  topIcon.alt = `icon_${currentLang}`;
}

// 頁面加載時執行
window.addEventListener('load', setLanguageIcon);

// ----------------------------------------------------------------------------------------

// 數據報告 倒數
const counters = document.querySelectorAll('.data_report_ul_content h1');
let hasAnimated = false;

function startCountAnimation() {
  if (hasAnimated) return;

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // Animation duration in milliseconds
    const steps = 50; // Number of steps in the animation
    const stepValue = target / steps;
    let current = 0;

    const updateCounter = () => {
      current += stepValue;
      if (current < target) {
        counter.textContent = Math.round(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });

  hasAnimated = true;
}

// Intersection Observer to trigger animation when element is in view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCountAnimation();
    }
  });
}, { threshold: 0.5 });

const counterSection = document.querySelector('.data_report_ul_content');
if (counterSection) {
  observer.observe(counterSection);
}

// ----------------------------------------------------------------------------------------

// 一堆數字轉動 效果
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const blocks = document.querySelectorAll('.content-block');

let W, H;
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const particleCount = 300;
const radius = 250;
const focalLength = 500;
const particles = [];

const goldenRatio = (1 + Math.sqrt(5)) / 2;
for (let i = 0; i < particleCount; i++) {
  const theta = 2 * Math.PI * i / goldenRatio;
  const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
  const x = Math.cos(theta) * Math.sin(phi);
  const y = Math.sin(theta) * Math.sin(phi);
  const z = Math.cos(phi);
  particles.push({ x, y, z, letter: letters[i % letters.length] });
}

let angleX = 0, angleY = 0;
let isDragging = false, lastX, lastY;

canvas.addEventListener('mousedown', e => {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});
window.addEventListener('mouseup', () => isDragging = false);
canvas.addEventListener('mousemove', e => {
  if (isDragging) {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    angleY += dx * 0.005;
    angleX += dy * 0.005;
    lastX = e.clientX;
    lastY = e.clientY;
  }
});

let currentSection = -1;
function updateBlockByAngle() {
  let deg = ((angleY * 180 / Math.PI) % 360 + 360) % 360;
  let section = Math.floor(deg / 60);
  if (section !== currentSection) {
    currentSection = section;
    blocks.forEach((b, i) => {
      b.classList.toggle('active', i === currentSection);
    });
  }
}

let autoSection = 0;
setInterval(() => {
  currentSection = autoSection % 6;
  blocks.forEach((b, i) => {
    b.classList.toggle('active', i === currentSection);
  });
  autoSection++;
}, 2000);

function rotateX(p, a) {
  const cos = Math.cos(a), sin = Math.sin(a);
  return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
}
function rotateY(p, a) {
  const cos = Math.cos(a), sin = Math.sin(a);
  return { x: p.z * sin + p.x * cos, y: p.y, z: p.z * cos - p.x * sin };
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  if (!isDragging) {
    angleX += 0.002;
    angleY += 0.003;
  }

  updateBlockByAngle();

  particles.forEach(p => {
    let rp = rotateX(p, angleX);
    rp = rotateY(rp, angleY);
    const scale = focalLength / (focalLength + rp.z * radius);
    const x2d = rp.x * radius * scale + W / 2;
    const y2d = rp.y * radius * scale + H / 2;
    const size = scale * 30;
    const opacity = Math.min(Math.max((scale - 0.3) / 0.7, 0), 1);
    ctx.font = `${size}px Arial`;
    ctx.fillStyle = `rgba(220,220,220,${opacity.toFixed(2)})`;
    ctx.fillText(p.letter, x2d, y2d);
  });

  requestAnimationFrame(animate);
}

animate();