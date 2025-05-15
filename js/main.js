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

// 自動輪播 經營
const descriptions = [
  "<p>We have a huge library of slot games covering all types of popular games, from classic three-axis slots to high quality 5-axis video games, catering to the diverse needs of players around the world.</p>",
  "<p>We offer a full range of marketing support, including free spins, reward systems, leaderboards and jackpot pools to help you generate interest, increase engagement and retention, and increase revenue on your platform.</p>",
  "<p>Our games meet regulatory requirements in multiple markets around the world, ensuring that your platform can operate legally, and support multiple language and currency options to help you easily access international markets. is legal and supports multiple language and currency options to help you easily access international markets.</p>",
  "<p>We provide easy API and platform integration to ensure your system is up and running quickly and seamlessly. Our technical team provides 7x24 hours support to ensure that all games run smoothly.</p>",
];

const boxes = document.querySelectorAll('.img-box');
const textBox = document.getElementById('textBox');
let currentIndex = 0;
let intervalId;

function showImage(index) {
  boxes.forEach((box, i) => {
    if (i === index) {
      box.classList.add('active');
      textBox.innerHTML = descriptions[i];  // Use innerHTML instead of textContent
      textBox.classList.add('visible');
    } else {
      box.classList.remove('active');
    }
  });
}


function startCarousel() {
  intervalId = setInterval(() => {
    currentIndex = (currentIndex + 1) % boxes.length;
    showImage(currentIndex);
  }, 3000);
}

function stopCarousel() {
  clearInterval(intervalId);
}

// 初始化第一張
showImage(currentIndex);
startCarousel();

// 滑鼠移入暫停輪播，並顯示對應文字
boxes.forEach((box, index) => {
  box.addEventListener('mouseenter', () => {
    stopCarousel();
    currentIndex = index;
    showImage(currentIndex);
  });

  box.addEventListener('mouseleave', () => {
    startCarousel();
  });

  // 如果想支援點擊切換，也可加入以下：
  // box.addEventListener('click', () => {
  //   stopCarousel();
  //   currentIndex = index;
  //   showImage(currentIndex);
  // });
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
function animate() {
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

  requestAnimationFrame(animate);
}

animate(); // 啟動動畫

// ----------------------------------------------------------------------------------------

// 自訂語言選單控制

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'zh-TW,ja,pt',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}


document.getElementById("custom_translate").addEventListener("change", function () {
  var lang = this.value;
  var googleCombo = document.querySelector(".goog-te-combo");
  if (googleCombo && lang) {
    googleCombo.value = lang;
    googleCombo.dispatchEvent(new Event("change"));
  }
});
