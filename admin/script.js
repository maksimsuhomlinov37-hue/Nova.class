/* ==========================================================
   NovaClass
   main.js
   Часть 1
========================================================== */

"use strict";

/* ============================
   Элементы
============================ */

const sidebar =
document.querySelector(".sidebar");

const navLinks =
document.querySelectorAll(".nav a");

const sections =
document.querySelectorAll("main section");

const headerTitle =
document.querySelector(".header-left h1");

const headerText =
document.querySelector(".header-left p");

/* ============================
   Данные
============================ */

const DATA = {

    user:{

        name:"Имя Фамилия",

        class:"--",

        school:"Название школы"

    },

    lessons:[],

    homework:[],

    grades:[],

    news:[],

    messages:[]

};

/* ============================
   Сохранение
============================ */

function saveData(){

    localStorage.setItem(

        "NovaClass",

        JSON.stringify(DATA)

    );

}

function loadData(){

    const data =
    localStorage.getItem("NovaClass");

    if(data){

        Object.assign(

            DATA,

            JSON.parse(data)

        );

    }

}

loadData();

/* ============================
   Навигация
============================ */

function openSection(name){

    sections.forEach(section=>{

        section.style.display="none";

    });

    const target =
    document.querySelector("." + name);

    if(target){

        target.style.display="block";

    }

}

navLinks.forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        navLinks.forEach(a=>{

            a.classList.remove("active");

        });

        this.classList.add("active");

        const page =
        this.dataset.page;

        if(page){

            openSection(page);

        }

    });

});

/* ============================
   Первая загрузка
============================ */

sections.forEach((section,index)=>{

    if(index===0){

        section.style.display="block";

    }else{

        section.style.display="none";

    }

});

/* ============================
   Заголовок
============================ */

function updateHeader(text){

    if(headerTitle){

        headerTitle.textContent=text;

    }

}

updateHeader("Главная");

/* ============================
   Вспомогательные функции
============================ */

function createElement(tag,className){

    const element =
    document.createElement(tag);

    if(className){

        element.className=className;

    }

    return element;

}

function clear(element){

    while(element.firstChild){

        element.removeChild(

            element.firstChild

        );

    }

}
/* ==========================================================
   Расписание
========================================================== */

function renderSchedule() {

    const container = document.querySelector(".schedule-grid");

    if (!container) return;

    clear(container);

    DATA.lessons.forEach(function(lesson){

        const card = createElement("div","lesson-card");

        card.innerHTML = `
            <div class="lesson-number">${lesson.number}</div>
            <div class="lesson-name">${lesson.name}</div>
            <div class="lesson-time">${lesson.time}</div>
            <div class="lesson-room">${lesson.room}</div>
        `;

        container.appendChild(card);

    });

}

/* ==========================================================
   Новости
========================================================== */

function renderNews(){

    const container = document.querySelector(".news-grid");

    if(!container) return;

    clear(container);

    DATA.news.forEach(function(news){

        const card = createElement("article","news-card");

        card.innerHTML = `
            <div class="news-image">
                <img src="${news.image}" alt="">
            </div>

            <div class="news-content">

                <span class="news-date">
                    ${news.date}
                </span>

                <h3>${news.title}</h3>

                <p>${news.description}</p>

            </div>
        `;

        container.appendChild(card);

    });

}

/* ==========================================================
   Домашнее задание
========================================================== */

function renderHomework(){

    const container =
    document.querySelector(".homework-list");

    if(!container) return;

    clear(container);

    DATA.homework.forEach(function(hw){

        const card = createElement("div","homework-card");

        card.innerHTML = `
            <div class="lesson-name">
                ${hw.subject}
            </div>

            <div class="lesson-task">
                ${hw.task}
            </div>

            <div class="lesson-deadline">
                До ${hw.deadline}
            </div>
        `;

        container.appendChild(card);

    });

}

/* ==========================================================
   Добавление данных
========================================================== */

function addLesson(lesson){

    DATA.lessons.push(lesson);

    saveData();

    renderSchedule();

}

function addHomework(homework){

    DATA.homework.push(homework);

    saveData();

    renderHomework();

}

function addNews(news){

    DATA.news.push(news);

    saveData();

    renderNews();

}

/* ==========================================================
   Первая отрисовка
========================================================== */

renderSchedule();

renderHomework();

renderNews();
/* ======================================================
   NovaClass — script.js (Часть 3)
====================================================== */

// =========================
// Открытие окна урока
// =========================

const lessonModal = document.getElementById("lessonModal");
const modalTitle = document.getElementById("modalTitle");
const modalTeacher = document.getElementById("modalTeacher");
const modalRoom = document.getElementById("modalRoom");
const modalTime = document.getElementById("modalTime");

document.querySelectorAll(".lesson").forEach(card => {

    card.addEventListener("click", () => {

        modalTitle.textContent =
            card.dataset.name || "Урок";

        modalTeacher.textContent =
            card.dataset.teacher || "Не указан";

        modalRoom.textContent =
            card.dataset.room || "—";

        modalTime.textContent =
            card.dataset.time || "—";

        lessonModal.classList.add("show");

    });

});

// =========================
// Закрытие окна
// =========================

document.querySelectorAll(".modal-close").forEach(btn => {

    btn.onclick = () => {

        lessonModal.classList.remove("show");

    };

});

lessonModal.addEventListener("click", e => {

    if (e.target === lessonModal) {

        lessonModal.classList.remove("show");

    }

});

// =========================
// Поиск
// =========================

const search = document.getElementById("search");

if (search) {

    search.addEventListener("input", () => {

        const value = search.value.toLowerCase();

        document.querySelectorAll(".lesson").forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(value)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}
/* ======================================================
   NovaClass — script.js (Часть 4)
====================================================== */

// =========================
// Переключение темы
// =========================

const themeButton = document.getElementById("themeToggle");

if (themeButton) {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

        } else {

            localStorage.setItem("theme", "light");

        }

    });

}

// =========================
// Боковое меню
// =========================

const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");

if (sidebar && menuButton) {

    menuButton.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });

}

// =========================
// Закрытие меню по клику
// =========================

document.addEventListener("click", (event) => {

    if (!sidebar || !menuButton) return;

    if (
        !sidebar.contains(event.target) &&
        !menuButton.contains(event.target)
    ) {

        sidebar.classList.remove("open");

    }

});

// =========================
// Плавная прокрутка
// =========================

document.querySelectorAll("a[href^='#']").forEach(link => {

    link.addEventListener("click", e => {

        e.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        }

    });

});
/* ======================================================
   NovaClass — script.js (Часть 5)
====================================================== */

// =========================
// Уведомления
// =========================

function showNotification(title, text) {

    const notification = document.createElement("div");
    notification.className = "notification";

    notification.innerHTML = `
        <div class="notification-title">${title}</div>
        <div class="notification-text">${text}</div>
    `;

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.classList.add("show");
    });

    setTimeout(() => {

        notification.classList.remove("show");

        setTimeout(() => {
            notification.remove();
        }, 300);

    }, 3500);

}

// =========================
// Приветствие
// =========================

window.addEventListener("load", () => {

    const hour = new Date().getHours();

    let greeting = "Здравствуйте";

    if (hour >= 5 && hour < 12) {
        greeting = "Доброе утро";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Добрый день";
    } else if (hour >= 18 && hour < 23) {
        greeting = "Добрый вечер";
    } else {
        greeting = "Доброй ночи";
    }

    showNotification(
        greeting,
        "Добро пожаловать в NovaClass!"
    );

});

// =========================
// Часы
// =========================

const clock = document.getElementById("clock");

function updateClock() {

    if (!clock) return;

    const now = new Date();

    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");

    clock.textContent = `${h}:${m}`;

}

updateClock();
setInterval(updateClock, 1000);

// =========================
// Дата
// =========================

const dateElement = document.getElementById("currentDate");

function updateDate() {

    if (!dateElement) return;

    const now = new Date();

    dateElement.textContent =
        now.toLocaleDateString("ru-RU", {

            weekday: "long",
            day: "numeric",
            month: "long"

        });

}

updateDate();
/* ======================================================
   NovaClass — script.js (Часть 6)
====================================================== */

// =========================
// Выбор дня недели
// =========================

const dayButtons = document.querySelectorAll(".day-button");
const dayPages = document.querySelectorAll(".day-page");

dayButtons.forEach(button => {

    button.addEventListener("click", () => {

        const day = button.dataset.day;

        dayButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        dayPages.forEach(page => {

            if (page.dataset.day === day) {

                page.classList.add("active");

            } else {

                page.classList.remove("active");

            }

        });

    });

});

// =========================
// Автовыбор сегодняшнего дня
// =========================

(function selectToday() {

    const today = new Date().getDay();

    const map = {
        1: "monday",
        2: "tuesday",
        3: "wednesday",
        4: "thursday",
        5: "friday",
        6: "saturday",
        0: "sunday"
    };

    const current = map[today];

    if (!current) return;

    const button = document.querySelector(
        `.day-button[data-day="${current}"]`
    );

    if (button) {

        button.click();

    }

})();

// =========================
// Подсветка текущего урока
// =========================

function highlightCurrentLesson() {

    const now = new Date();

    const current =
        now.getHours() * 60 +
        now.getMinutes();

    document.querySelectorAll(".lesson").forEach(card => {

        card.classList.remove("current");

        const time = card.dataset.time;

        if (!time) return;

        const parts = time.split("-");

        if (parts.length !== 2) return;

        const start = parts[0].trim().split(":");
        const end = parts[1].trim().split(":");

        const startMin =
            Number(start[0]) * 60 +
            Number(start[1]);

        const endMin =
            Number(end[0]) * 60 +
            Number(end[1]);

        if (current >= startMin &&
            current <= endMin) {

            card.classList.add("current");

        }

    });

}

highlightCurrentLesson();

setInterval(highlightCurrentLesson, 60000);
/* ======================================================
   NovaClass — script.js (Часть 7)
====================================================== */

// =========================
// LocalStorage
// =========================

const STORAGE_KEY = "novaclass_settings";

// Загрузка
function loadSettings() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return {};

    try {

        return JSON.parse(data);

    } catch (e) {

        return {};

    }

}

// Сохранение
function saveSettings(settings) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(settings)
    );

}

let settings = loadSettings();

// =========================
// Имя пользователя
// =========================

const profileName = document.getElementById("profileName");

if (profileName && settings.name) {

    profileName.textContent = settings.name;

}

const profileInput = document.getElementById("nameInput");

if (profileInput) {

    profileInput.value = settings.name || "";

    profileInput.addEventListener("input", () => {

        settings.name = profileInput.value;

        saveSettings(settings);

        if (profileName) {

            profileName.textContent = settings.name;

        }

    });

}

// =========================
// Аватар
// =========================

const avatarInput = document.getElementById("avatarInput");
const avatarImage = document.getElementById("avatar");

if (avatarInput && avatarImage) {

    if (settings.avatar) {

        avatarImage.src = settings.avatar;

    }

    avatarInput.addEventListener("change", e => {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = event => {

            settings.avatar = event.target.result;

            avatarImage.src = settings.avatar;

            saveSettings(settings);

            showNotification(
                "Готово",
                "Аватар успешно обновлён."
            );

        };

        reader.readAsDataURL(file);

    });

}

// =========================
// Сброс настроек
// =========================

const resetButton = document.getElementById("resetSettings");

if (resetButton) {

    resetButton.addEventListener("click", () => {

        if (!confirm("Сбросить все настройки?")) return;

        localStorage.removeItem(STORAGE_KEY);

        location.reload();

    });

}
/* ======================================================
   NovaClass — script.js (Часть 8)
====================================================== */

// =========================
// Анимация появления
// =========================

function animateCards() {

    const cards = document.querySelectorAll(
        ".card, .lesson, .widget"
    );

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";

        setTimeout(() => {

            card.style.transition =
                "all .45s ease";

            card.style.opacity = "1";
            card.style.transform =
                "translateY(0)";

        }, index * 70);

    });

}

window.addEventListener("load", animateCards);

// =========================
// Ripple эффект
// =========================

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", function(e) {

        const ripple =
            document.createElement("span");

        ripple.className = "ripple";

        const rect =
            this.getBoundingClientRect();

        ripple.style.left =
            (e.clientX - rect.left) + "px";

        ripple.style.top =
            (e.clientY - rect.top) + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

// =========================
// Кнопка вверх
// =========================

const topButton =
    document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (!topButton) return;

    if (window.scrollY > 250) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});

if (topButton) {

    topButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

// =========================
// Fade при смене страницы
// =========================

document.querySelectorAll(".page-link").forEach(link => {

    link.addEventListener("click", () => {

        document.body.classList.add("page-fade");

    });

});

// =========================
// Эффект наведения
// =========================

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.classList.add("hover");

    });

    card.addEventListener("mouseleave", () => {

        card.classList.remove("hover");

    });

});

// =========================
// Ленивая загрузка изображений
// =========================

const lazyImages =
    document.querySelectorAll("img[data-src]");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const img = entry.target;

        img.src = img.dataset.src;

        img.removeAttribute("data-src");

        observer.unobserve(img);

    });

});

lazyImages.forEach(img => observer.observe(img));
/* ======================================================
   NovaClass — script.js (Часть 9)
====================================================== */

// =========================
// Календарь
// =========================

const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("calendarMonth");

let currentDate = new Date();

function renderCalendar(date) {

    if (!calendarGrid || !monthTitle) return;

    calendarGrid.innerHTML = "";

    const year = date.getFullYear();
    const month = date.getMonth();

    monthTitle.textContent = date.toLocaleDateString("ru-RU", {
        month: "long",
        year: "numeric"
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const offset = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < offset; i++) {

        const empty = document.createElement("div");
        empty.className = "calendar-empty";

        calendarGrid.appendChild(empty);

    }

    const today = new Date();

    for (let day = 1; day <= daysInMonth; day++) {

        const cell = document.createElement("div");

        cell.className = "calendar-day";
        cell.textContent = day;

        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            cell.classList.add("today");
        }

        cell.addEventListener("click", () => {

            document
                .querySelectorAll(".calendar-day")
                .forEach(d => d.classList.remove("selected"));

            cell.classList.add("selected");

        });

        calendarGrid.appendChild(cell);

    }

}

renderCalendar(currentDate);

// =========================
// Переключение месяца
// =========================

const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

if (prevMonth) {

    prevMonth.addEventListener("click", () => {

        currentDate.setMonth(currentDate.getMonth() - 1);

        renderCalendar(currentDate);

    });

}

if (nextMonth) {

    nextMonth.addEventListener("click", () => {

        currentDate.setMonth(currentDate.getMonth() + 1);

        renderCalendar(currentDate);

    });

}

// =========================
// Счетчик уроков
// =========================

const lessonCounter =
    document.getElementById("lessonCounter");

function updateLessonCounter() {

    if (!lessonCounter) return;

    const lessons =
        document.querySelectorAll(".lesson");

    lessonCounter.textContent = lessons.length;

}

updateLessonCounter();

// =========================
// Обновление времени
// =========================

setInterval(() => {

    highlightCurrentLesson();

}, 60000);
/* ======================================================
   NovaClass — script.js (Часть 10)
====================================================== */

// =========================
// Статистика
// =========================

const stats = {
    lessons: document.querySelectorAll(".lesson").length,
    homework: document.querySelectorAll(".homework").length,
    notifications: document.querySelectorAll(".notification-item").length
};

const lessonsCount = document.getElementById("statsLessons");
const homeworkCount = document.getElementById("statsHomework");
const notificationsCount = document.getElementById("statsNotifications");

function updateStatistics() {

    if (lessonsCount) {
        lessonsCount.textContent = stats.lessons;
    }

    if (homeworkCount) {
        homeworkCount.textContent = stats.homework;
    }

    if (notificationsCount) {
        notificationsCount.textContent = stats.notifications;
    }

}

updateStatistics();

// =========================
// Прогресс дня
// =========================

const progressBar = document.getElementById("dayProgress");

function updateDayProgress() {

    if (!progressBar) return;

    const now = new Date();

    const minutes =
        now.getHours() * 60 +
        now.getMinutes();

    const percent =
        (minutes / 1440) * 100;

    progressBar.style.width =
        percent + "%";

}

updateDayProgress();

setInterval(updateDayProgress, 60000);

// =========================
// Обновление статистики
// =========================

function refreshStatistics() {

    stats.lessons =
        document.querySelectorAll(".lesson").length;

    stats.homework =
        document.querySelectorAll(".homework").length;

    stats.notifications =
        document.querySelectorAll(".notification-item").length;

    updateStatistics();

}

refreshStatistics();

// =========================
// Горячие клавиши
// =========================

document.addEventListener("keydown", e => {

    // Ctrl + K
    if (e.ctrlKey && e.key.toLowerCase() === "k") {

        e.preventDefault();

        const search =
            document.getElementById("search");

        if (search) {

            search.focus();

        }

    }

    // Escape
    if (e.key === "Escape") {

        const modal =
            document.getElementById("lessonModal");

        if (modal) {

            modal.classList.remove("show");

        }

    }

});

// =========================
// Автообновление
// =========================

setInterval(() => {

    updateClock();
    updateDate();
    refreshStatistics();

}, 30000);
/* ======================================================
   NovaClass — script.js (Часть 11)
   Финальная инициализация
====================================================== */

// =========================
// Проверка элементов
// =========================

function initNovaClass() {

    console.log("NovaClass успешно запущен.");

    updateClock?.();
    updateDate?.();
    updateLessonCounter?.();
    refreshStatistics?.();
    highlightCurrentLesson?.();

}

// =========================
// Загрузка страницы
// =========================

document.addEventListener("DOMContentLoaded", () => {

    initNovaClass();

    console.log("DOM загружен.");

});

// =========================
// Обработка изменения размера окна
// =========================

window.addEventListener("resize", () => {

    const width = window.innerWidth;

    if (width < 768) {

        document.body.classList.add("mobile");

    } else {

        document.body.classList.remove("mobile");

    }

});

// =========================
// Проверка подключения CSS
// =========================

if (document.styleSheets.length === 0) {

    console.warn("Файл style.css не найден.");

}

// =========================
// Проверка подключения JS
// =========================

console.log("script.js подключён.");

// =========================
// Версия проекта
// =========================

const NOVACLASS = {

    version: "1.0.0",

    author: "NovaClass",

    build: "Release"

};

console.table(NOVACLASS);

// =========================
// Конец файла
// =========================

console.log("NovaClass готов к работе.");
