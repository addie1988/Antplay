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
const totalImages = 36; // 更新為 36 張圖片
const boxHeight = 10;
const maxOffset = 20; // 最大偏移距離

// 固定圖片 ID 陣列，使用不同的圖片，現在有 36 張圖片
const imageIds = [
  1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039,
  1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055
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

function startCountAnimation() {
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
}

let isInView = false;

// Scroll event listener to trigger animation when scrolling past 600px
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  if (scrollPosition >= 300) {
    if (!isInView) {
      isInView = true;
      startCountAnimation();
    }
  } else {
    if (isInView) {
      isInView = false;
      // Reset the counter text to 0 when scrolling back up
      counters.forEach(counter => {
        counter.textContent = '0';
      });
    }
  }
});

// ----------------------------------------------------------------------------------------

// 一堆數字轉動 效果
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const blocks = document.querySelectorAll('.content-block');
const text = 'Antplay';
const focalLength = 500;

let W, H;
let particleCount = 800; // 減少粒子數量
let radius = 0;
let baseFontSize = 8;
let particles = [];

function resize() {
  const container = canvas.parentElement;
  W = canvas.width = container.clientWidth;
  H = canvas.height = container.clientHeight;

  const screenSize = Math.min(W, H);
  particleCount = Math.floor(screenSize / 3); // 減少粒子密度
  radius = screenSize * 0.4;
  baseFontSize = screenSize * 0.01;

  initParticles();
}

function initParticles() {
  particles = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < particleCount; i++) {
    const theta = 2 * Math.PI * i / goldenRatio;
    const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
    const x = Math.cos(theta) * Math.sin(phi);
    const y = Math.sin(theta) * Math.sin(phi);
    const z = Math.cos(phi);
    
    // 調整大小對比
    let sizeFactor;
    if (Math.random() < 0.2) { // 減少大文字的機率到 20%
      sizeFactor = 1.2 + Math.random() * 1.2; // 1.2-2.4 倍大小
    } else { // 80% 的機率生成小文字
      sizeFactor = 0.3 + Math.random() * 0.4; // 0.3-0.7 倍大小
    }
    
    particles.push({ 
      x, 
      y, 
      z, 
      text: text,
      sizeFactor: sizeFactor 
    });
  }
}

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 监听窗口大小变化
window.addEventListener('resize', debounce(resize, 250));

// 初始化
resize();

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
    const size = scale * baseFontSize * p.sizeFactor;
    const opacity = Math.min(Math.max((scale - 0.3) / 0.7, 0), 1);
    ctx.font = `${size}px Arial`;
    ctx.fillStyle = `rgba(215,215,215,${opacity.toFixed(2)})`;
    ctx.fillText(p.text, x2d, y2d);
  });

  requestAnimationFrame(animate);
}

animate();

// ----------------------------------------------------------------------------------------

// report_li_4 輪播
const boxes = document.querySelectorAll('.img-box');
let currentIndex = 0;
let intervalId;

function showImage(index) {
  boxes.forEach((box, i) => {
    if (i === index) {
      box.classList.add('active');
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

// 滑鼠移入暫停輪播
boxes.forEach((box, index) => {
  box.addEventListener('mouseenter', () => {
    stopCarousel();
    currentIndex = index;
    showImage(currentIndex);
  });

  box.addEventListener('mouseleave', () => {
    startCarousel();
  });

  // 如需支援點擊切換，也可加入以下：
  // box.addEventListener('click', () => {
  //   stopCarousel();
  //   currentIndex = index;
  //   showImage(currentIndex);
  // });
});

// ----------------------------------------------------------------------------------------

// report_li_5 硬幣輪播
const coinImages = [
  './images/coin_1.svg',
  './images/coin_2.svg',
  './images/coin_3.svg'
];

const track = document.getElementById('carouselTrack');

// 複製三組圖片做無縫輪播 (前中後)
[...coinImages, ...coinImages, ...coinImages].forEach((src, i) => {
  const item = document.createElement('div');
  item.className = 'carousel-item';
  item.innerHTML = `<img src="${src}" alt="carousel image" />`;
  item.style.opacity = '0.3';
  item.style.flex = '0 0 33.33%';
  item.style.padding = '0';
  item.style.margin = '0';
  track.appendChild(item);
});

const items = track.children;
const total = coinImages.length;
let index = total - 1;

// 設置 track 的樣式
track.style.display = 'flex';
track.style.width = '300%';
track.style.gap = '0';
track.style.padding = '0';
track.style.margin = '0';
track.style.justifyContent = 'flex-start';
track.style.transition = 'transform 0.5s ease';

// 設置每個輪播項的樣式
Array.from(items).forEach(item => {
  item.style.margin = '0';
  item.style.padding = '0';
  item.style.width = '33.33%';
  item.style.flex = '0 0 33.33%';
  item.style.transition = 'all 0.5s ease';
});

function updateCarousel() {
  // 重置所有項目的透明度和active狀態
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove('active');
    items[i].style.opacity = '0.3';
    items[i].style.transform = 'scale(0.8)';
  }

  // 設置當前項目及其相鄰項目
  const prevIndex = (index - 1 + items.length) % items.length;
  const nextIndex = (index + 1) % items.length;

  // 設置三個可見項目的狀態
  items[prevIndex].style.opacity = '0.3';
  items[prevIndex].classList.add('active');
  items[prevIndex].style.transform = 'scale(0.8)';

  items[index].style.opacity = '1';
  items[index].classList.add('active');
  items[index].style.transform = 'scale(1)';

  items[nextIndex].style.opacity = '0.3';
  items[nextIndex].classList.add('active');
  items[nextIndex].style.transform = 'scale(0.8)';

  const itemWidth = items[0].offsetWidth;
  const offset = itemWidth * (index - Math.floor(total / 2));
  track.style.transform = `translateX(${-offset}px)`;

  // 當滑到最後一組的最後一張時，瞬間跳回中間組的最後一張
  if (index >= total * 2) {
    setTimeout(() => {
      track.style.transition = 'none';
      index = total;
      const resetOffset = itemWidth * (index - Math.floor(total / 2));
      track.style.transform = `translateX(${-resetOffset}px)`;
      track.offsetHeight; // 強制重繪
      track.style.transition = 'transform 0.5s ease';
      updateCarousel();
    }, 500);
  }
  // 當滑到第一組的第一張時，瞬間跳回中間組的第一張
  else if (index < total) {
    setTimeout(() => {
      track.style.transition = 'none';
      index = total * 2 - 1;
      const resetOffset = itemWidth * (index - Math.floor(total / 2));
      track.style.transform = `translateX(${-resetOffset}px)`;
      track.offsetHeight; // 強制重繪
      track.style.transition = 'transform 0.5s ease';
      updateCarousel();
    }, 500);
  }
}

function autoSlide() {
  index++;
  updateCarousel();
}

// 初始化
track.style.transition = 'transform 0.5s ease';
updateCarousel();
setInterval(autoSlide, 2500);

window.addEventListener('resize', updateCarousel);

// ----------------------------------------------------------------------------------------

// report_li_6_title 內容輪播
const slides = document.querySelectorAll(".report_li_6_text_carousel .slide");
const controls = document.querySelector(".controls");
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
}

// Create navigation dots
const dots = Array.from(slides).map((_, i) => {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => {
    current = i;
    showSlide(current);
    clearInterval(interval);
    interval = setInterval(nextSlide, 3000);
  });
  controls.appendChild(dot);
  return dot;
});

// Initialize first dot as active
dots[0].classList.add("active");

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

// Start automatic slideshow
let interval = setInterval(nextSlide, 3000);

// Pause slideshow on hover
const carousel = document.querySelector(".report_li_6_text_carousel");
carousel.addEventListener("mouseenter", () => clearInterval(interval));
carousel.addEventListener("mouseleave", () => {
  interval = setInterval(nextSlide, 3000);
});

// ----------------------------------------------------------------------------------------

// report_li_7_ul 系統
const imageList = [
  './images/data_img/android.webp',
  './images/data_img/html-5.webp',
  './images/data_img/mac-os-logo.webp',
  './images/data_img/macos.webp',
  './images/data_img/windows.webp',
];

const sliderTrack = document.getElementById('sliderTrack');

const repeatedImages = [...imageList, ...imageList, ...imageList];

repeatedImages.forEach(src => {
  const slide = document.createElement('div');
  slide.className = 'slideItem';
  slide.innerHTML = `<img src="${src}" alt="coin" />`;
  sliderTrack.appendChild(slide);
});

const slideItems = sliderTrack.children;
const slideCount = imageList.length;
let currentSlide = slideCount;

function updateSlides() {
  Array.from(slideItems).forEach(item => item.classList.remove('active'));

  const prev = (currentSlide - 1 + slideItems.length) % slideItems.length;
  const next = (currentSlide + 1) % slideItems.length;

  slideItems[prev].classList.add('active');
  slideItems[currentSlide].classList.add('active');
  slideItems[next].classList.add('active');
}

function moveToSlide() {
  const slideWidth = slideItems[0].offsetWidth;
  const offset = slideWidth * (currentSlide - Math.floor(slideCount / 2));
  sliderTrack.style.transform = `translateX(${-offset}px)`;
  updateSlides();
}

function slideNext() {
  currentSlide++;
  moveToSlide();
}

sliderTrack.addEventListener('transitionend', () => {
  try {
    const slideWidth = slideItems[0].offsetWidth;

    if (currentSlide >= slideCount * 2) {
      sliderTrack.style.transition = 'none';
      currentSlide = slideCount;
      const resetOffset = slideWidth * (currentSlide - Math.floor(slideCount / 2));
      sliderTrack.style.transform = `translateX(${-resetOffset}px)`;
      sliderTrack.offsetHeight;
      sliderTrack.style.transition = 'transform 0.5s ease';
      updateSlides();
    } else if (currentSlide < slideCount) {
      sliderTrack.style.transition = 'none';
      currentSlide = slideCount * 2 - 1;
      const resetOffset = slideWidth * (currentSlide - Math.floor(slideCount / 2));
      sliderTrack.style.transform = `translateX(${-resetOffset}px)`;
      sliderTrack.offsetHeight;
      sliderTrack.style.transition = 'transform 0.5s ease';
      updateSlides();
    }
  } catch (error) {
    showErrorMessage(`輪播圖切換時發生錯誤: ${error.message}`);
    console.error('Carousel error:', error);
  }
});

window.onload = () => {
  moveToSlide();
  setInterval(slideNext, 2500);
};

window.addEventListener('resize', moveToSlide);

// ----------------------------------------------------------------------------------------

// report_li_8_t 國旗輪播
const iconTrack = document.getElementById("iconTrack");
const iconItems = document.querySelectorAll(".icon-item");
const itemHeight = iconItems[0].offsetHeight;
const totalItems = iconItems.length;

let activeSlideIndex = 0;

setInterval(() => {
  activeSlideIndex++;
  if (activeSlideIndex > totalItems - 3) {
    iconTrack.style.transition = "none";
    iconTrack.style.transform = "translateY(0)";
    activeSlideIndex = 1;

      setTimeout(() => {
        iconTrack.style.transition = "transform 0.5s ease-in-out";
        iconTrack.style.transform = `translateY(-${itemHeight * activeSlideIndex}px)`;
      }, 50);
    } else {
      iconTrack.style.transform = `translateY(-${itemHeight * activeSlideIndex}px)`;
    }
  }, 2000);

// ----------------------------------------------------------------------------------------

// 錯誤訊息顯示函數
function showErrorMessage(message, type = 'error') {
  const errorDiv = document.createElement('div');
  errorDiv.className = `error-message ${type}`;
  errorDiv.textContent = message;
  
  // 設置樣式
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '20px';
  errorDiv.style.right = '20px';
  errorDiv.style.padding = '15px 20px';
  errorDiv.style.borderRadius = '5px';
  errorDiv.style.zIndex = '9999';
  errorDiv.style.color = '#fff';
  errorDiv.style.backgroundColor = type === 'error' ? '#ff4444' : '#2196F3';
  errorDiv.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
  errorDiv.style.transition = 'all 0.3s ease';
  
  document.body.appendChild(errorDiv);
  
  // 3秒後自動消失
  setTimeout(() => {
    errorDiv.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(errorDiv);
    }, 300);
  }, 3000);
}

// 修改滾動事件處理器
const scrollHandler = debounce(() => {
  const scrollPosition = window.scrollY;
  const elements = {
    'report_li_3_title': { top: '-900px', left: '0' },
    'report_li_2_title': { top: '-570px', left: '0' },
    'report_li_4_title': { top: '-1100px', left: '-570px' },
    'report_li_1_title': { top: '-730px', left: '-80px' }
  };

  Object.entries(elements).forEach(([id, positions]) => {
    const element = document.getElementById(id);
    if (element) {
      try {
        if (scrollPosition < 1500) {
          element.style.position = 'absolute';
          element.style.top = positions.top;
          element.style.left = positions.left;
        } else {
          element.style.position = 'relative';
          element.style.top = '0px';
          element.style.left = '0px';
        }
        element.style.transition = 'all 1s ease-in-out';
      } catch (error) {
        showErrorMessage(`更新元素 ${id} 時發生錯誤: ${error.message}`);
        console.warn(`Error updating element ${id}:`, error);
      }
    }
  });
}, 100);

window.addEventListener('scroll', scrollHandler);

// ----------------------------------------------------------------------------------------

// Close dropdown menus when clicking outside
document.addEventListener('click', (event) => {
    // Close language dropdown
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if (dropdownMenu && !dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('show');
    }

    // Close hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu && !hamburger.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('show');
    }
});

