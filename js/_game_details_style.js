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

// teaching 遊戲教學
const buttons = document.querySelectorAll(".teaching_title button");
const contents = document.querySelectorAll(".content");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-target");
        contents.forEach(c => c.classList.remove("active"));
        document.getElementById(id).classList.add("active");
    });
});