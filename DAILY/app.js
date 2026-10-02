/* ==========================================
   MORNING — PERSONAL DAILY BRIEF
========================================== */


/* ==========================================
   DATA
========================================== */

const quotes = [
  {
    text: "Small progress is still progress. Focus on what matters today.",
    author: "Daily reminder"
  },
  {
    text: "You don't need a perfect day. You just need a meaningful one.",
    author: "Morning thought"
  },
  {
    text: "Start where you are, use what you have, and take the next step.",
    author: "Daily reminder"
  },
  {
    text: "Make today useful, peaceful and a little better than yesterday.",
    author: "Morning thought"
  },
  {
    text: "Your future self will thank you for what you do today.",
    author: "Daily reminder"
  }
];


const workouts = [
  {
    name: "Full Body Strength",
    duration: "35 min",
    level: "Moderate"
  },
  {
    name: "Yoga & Mobility",
    duration: "25 min",
    level: "Easy"
  },
  {
    name: "Lower Body Workout",
    duration: "30 min",
    level: "Moderate"
  },
  {
    name: "Quick Cardio",
    duration: "20 min",
    level: "High"
  },
  {
    name: "Stretch & Recover",
    duration: "15 min",
    level: "Easy"
  }
];


const breakfasts = [
  {
    name: "Greek yoghurt bowl",
    description:
      "Greek yoghurt, berries, banana, granola and honey."
  },
  {
    name: "Avocado toast",
    description:
      "Sourdough toast with avocado, eggs and chilli flakes."
  },
  {
    name: "Peanut butter banana toast",
    description:
      "Wholegrain toast, peanut butter, banana and cinnamon."
  },
  {
    name: "Berry smoothie",
    description:
      "Mixed berries, banana, yoghurt and your choice of milk."
  }
];


const dinners = [
  {
    name: "Creamy tomato pasta",
    description:
      "Pasta with tomatoes, garlic, herbs and parmesan."
  },
  {
    name: "Chicken rice bowl",
    description:
      "Seasoned chicken, rice, vegetables and a simple yoghurt sauce."
  },
  {
    name: "Vegetable stir-fry",
    description:
      "Mixed vegetables, noodles and a light soy-garlic sauce."
  },
  {
    name: "Pesto pasta",
    description:
      "Pasta, basil pesto, cherry tomatoes and parmesan."
  }
];


const sampleEvents = {
  "2026-10-02": ["university"],
  "2026-10-05": ["personal"],
  "2026-10-07": ["university"],
  "2026-10-10": ["personal"],
  "2026-10-14": ["university"],
  "2026-10-18": ["personal"],
  "2026-10-21": ["university"],
  "2026-10-27": ["personal"]
};


/* ==========================================
   ELEMENTS
========================================== */

const body = document.body;

const lightModeBtn =
  document.getElementById("lightModeBtn");

const darkModeBtn =
  document.getElementById("darkModeBtn");

const modalLightBtn =
  document.getElementById("modalLightBtn");

const modalDarkBtn =
  document.getElementById("modalDarkBtn");

const sidebarDeliveryTime =
  document.getElementById("sidebarDeliveryTime");

const deliveryTime =
  document.getElementById("deliveryTime");

const modalDeliveryTime =
  document.getElementById("modalDeliveryTime");


/* ==========================================
   LUCIDE ICONS
========================================== */

function refreshIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}


/* ==========================================
   THEME
========================================== */

function updateThemeButtons(theme) {

  const isDark = theme === "dark";

  lightModeBtn?.classList.toggle(
    "active",
    !isDark
  );

  darkModeBtn?.classList.toggle(
    "active",
    isDark
  );

  modalLightBtn?.classList.toggle(
    "active",
    !isDark
  );

  modalDarkBtn?.classList.toggle(
    "active",
    isDark
  );
}


function setTheme(theme) {

  if (theme === "dark") {

    body.classList.add("dark");

    localStorage.setItem(
      "morning-theme",
      "dark"
    );

    updateThemeButtons("dark");

  } else {

    body.classList.remove("dark");

    localStorage.setItem(
      "morning-theme",
      "light"
    );

    updateThemeButtons("light");
  }
}


function loadTheme() {

  const savedTheme =
    localStorage.getItem("morning-theme");

  if (savedTheme) {

    setTheme(savedTheme);

    return;
  }


  /* Use system preference for first visit */

  const systemDark =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;


  setTheme(
    systemDark ? "dark" : "light"
  );
}


lightModeBtn?.addEventListener(
  "click",
  () => setTheme("light")
);


darkModeBtn?.addEventListener(
  "click",
  () => setTheme("dark")
);


modalLightBtn?.addEventListener(
  "click",
  () => setTheme("light")
);


modalDarkBtn?.addEventListener(
  "click",
  () => setTheme("dark")
);


/* Load immediately */
loadTheme();


/* ==========================================
   LIVE CLOCK
========================================== */

function updateClock() {

  const now = new Date();

  const hours =
    now.getHours().toString().padStart(2, "0");

  const minutes =
    now.getMinutes().toString().padStart(2, "0");

  const seconds =
    now.getSeconds().toString().padStart(2, "0");


  let displayHours =
    now.getHours() % 12;

  displayHours =
    displayHours === 0 ? 12 : displayHours;


  const ampm =
    now.getHours() >= 12
      ? "PM"
      : "AM";


  const timeString =
    `${displayHours}:${minutes}:${seconds} ${ampm}`;


  const liveTime =
    document.getElementById("liveTime");

  if (liveTime) {
    liveTime.textContent = timeString;
  }
}


updateClock();

setInterval(updateClock, 1000);


/* ==========================================
   DATE + GREETING
========================================== */

function updateDate() {

  const now = new Date();

  const dateElement =
    document.getElementById("currentDate");

  const greetingElement =
    document.getElementById("greeting");


  const formattedDate =
    now.toLocaleDateString(
      "en-GB",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );


  if (dateElement) {
    dateElement.textContent =
      formattedDate;
  }


  const hour =
    now.getHours();

  let greeting =
    "Good morning";


  if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  }

  if (hour >= 18) {
    greeting = "Good evening";
  }


  if (greetingElement) {
    greetingElement.textContent =
      `${greeting}, Krutika.`;
  }
}


updateDate();


/* ==========================================
   QUOTE
========================================== */

const quoteText =
  document.getElementById("quoteText");

const quoteAuthor =
  document.getElementById("quoteAuthor");

const newQuoteBtn =
  document.getElementById("newQuoteBtn");


function randomItem(array) {

  return array[
    Math.floor(
      Math.random() * array.length
    )
  ];
}


function updateQuote() {

  const quote =
    randomItem(quotes);


  if (quoteText) {
    quoteText.textContent =
      quote.text;
  }


  if (quoteAuthor) {
    quoteAuthor.textContent =
      `— ${quote.author}`;
  }
}


newQuoteBtn?.addEventListener(
  "click",
  updateQuote
);


/* ==========================================
   WORKOUT
========================================== */

const workoutName =
  document.getElementById("workoutName");

const workoutDuration =
  document.getElementById("workoutDuration");

const workoutLevel =
  document.getElementById("workoutLevel");

const shuffleWorkout =
  document.getElementById("shuffleWorkout");


function updateWorkout() {

  const workout =
    randomItem(workouts);


  workoutName.textContent =
    workout.name;

  workoutDuration.textContent =
    workout.duration;

  workoutLevel.textContent =
    workout.level;
}


shuffleWorkout?.addEventListener(
  "click",
  updateWorkout
);


/* ==========================================
   MEALS
========================================== */

const breakfastName =
  document.getElementById("breakfastName");

const breakfastDescription =
  document.getElementById("breakfastDescription");

const dinnerName =
  document.getElementById("dinnerName");

const dinnerDescription =
  document.getElementById("dinnerDescription");

const shuffleMeals =
  document.getElementById("shuffleMeals");


function updateMeals() {

  const breakfast =
    randomItem(breakfasts);

  const dinner =
    randomItem(dinners);


  breakfastName.textContent =
    breakfast.name;

  breakfastDescription.textContent =
    breakfast.description;


  dinnerName.textContent =
    dinner.name;

  dinnerDescription.textContent =
    dinner.description;
}


shuffleMeals?.addEventListener(
  "click",
  updateMeals
);


/* ==========================================
   PROGRESS
========================================== */

const progressNumber =
  document.getElementById("progressNumber");

const progressCenter =
  document.getElementById("progressCenter");

const progressCircle =
  document.getElementById("progressCircle");


function updateProgress() {

  const timelineChecks =
    document.querySelectorAll(
      ".timeline-check"
    );

  const habitChecks =
    document.querySelectorAll(
      ".habit-check"
    );


  const allChecks = [
    ...timelineChecks,
    ...habitChecks
  ];


  if (allChecks.length === 0) {
    return;
  }


  const completed =
    allChecks.filter(
      checkbox => checkbox.checked
    ).length;


  const percentage =
    Math.round(
      (completed / allChecks.length) * 100
    );


  progressNumber.textContent =
    `${percentage}%`;

  progressCenter.textContent =
    `${percentage}%`;


  const circumference = 314;

  const offset =
    circumference -
    (percentage / 100) *
    circumference;


  progressCircle.style.strokeDashoffset =
    offset;
}


document
  .querySelectorAll(
    ".timeline-check, .habit-check"
  )
  .forEach(check => {

    check.addEventListener(
      "change",
      updateProgress
    );

  });


updateProgress();


/* ==========================================
   WORKOUT BUTTON
========================================== */

const startWorkout =
  document.getElementById("startWorkout");


startWorkout?.addEventListener(
  "click",
  () => {

    showToast(
      "Workout started — you've got this!"
    );

  }
);


/* ==========================================
   TOAST
========================================== */

const toast =
  document.getElementById("toast");

const toastMessage =
  document.getElementById("toastMessage");


let toastTimeout;


function showToast(message) {

  if (!toast || !toastMessage) {
    return;
  }


  toastMessage.textContent =
    message;


  toast.classList.add("show");


  clearTimeout(toastTimeout);


  toastTimeout =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 2800);
}


/* ==========================================
   CALENDAR
========================================== */

const calendarGrid =
  document.getElementById("calendarGrid");

const calendarMonth =
  document.getElementById("calendarMonth");

const prevMonth =
  document.getElementById("prevMonth");

const nextMonth =
  document.getElementById("nextMonth");

const todayBtn =
  document.getElementById("todayBtn");


let calendarDate =
  new Date();


function formatDateKey(
  year,
  month,
  day
) {

  return `${year}-${String(
    month + 1
  ).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
}


function renderCalendar() {

  if (!calendarGrid) {
    return;
  }


  calendarGrid.innerHTML = "";


  const year =
    calendarDate.getFullYear();

  const month =
    calendarDate.getMonth();


  const monthName =
    calendarDate.toLocaleDateString(
      "en-GB",
      {
        month: "long",
        year: "numeric"
      }
    );


  calendarMonth.textContent =
    monthName;


  const firstDay =
    new Date(
      year,
      month,
      1
    );


  let startingDay =
    firstDay.getDay();


  /*
    JS Sunday = 0.
    Convert to Monday = 0.
  */

  startingDay =
    startingDay === 0
      ? 6
      : startingDay - 1;


  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();


  const previousMonthDays =
    new Date(
      year,
      month,
      0
    ).getDate();


  const totalCells =
    42;


  const today =
    new Date();


  for (
    let i = 0;
    i < totalCells;
    i++
  ) {

    const dayElement =
      document.createElement("div");

    dayElement.className =
      "calendar-day";


    let dayNumber;

    let actualYear = year;

    let actualMonth = month;

    let isOtherMonth = false;


    if (i < startingDay) {

      dayNumber =
        previousMonthDays -
        startingDay +
        i +
        1;

      actualMonth =
        month - 1;

      if (actualMonth < 0) {
        actualMonth = 11;
        actualYear--;
      }

      isOtherMonth = true;

    } else if (
      i >= startingDay + daysInMonth
    ) {

      dayNumber =
        i -
        startingDay -
        daysInMonth +
        1;

      actualMonth =
        month + 1;

      if (actualMonth > 11) {
        actualMonth = 0;
        actualYear++;
      }

      isOtherMonth = true;

    } else {

      dayNumber =
        i -
        startingDay +
        1;
    }


    if (isOtherMonth) {
      dayElement.classList.add(
        "other-month"
      );
    }


    const number =
      document.createElement("div");

    number.className =
      "calendar-day-number";

    number.textContent =
      dayNumber;


    dayElement.appendChild(number);


    /* Today */

    if (
      actualYear === today.getFullYear() &&
      actualMonth === today.getMonth() &&
      dayNumber === today.getDate()
    ) {

      dayElement.classList.add(
        "today"
      );
    }


    /* Events */

    const key =
      formatDateKey(
        actualYear,
        actualMonth,
        dayNumber
      );


    const events =
      sampleEvents[key];


    if (events) {

      const eventContainer =
        document.createElement("div");

      eventContainer.className =
        "calendar-events";


      events.forEach(event => {

        const dot =
          document.createElement("span");

        dot.className =
          `calendar-event-dot ${event}`;

        eventContainer.appendChild(dot);

      });


      dayElement.appendChild(
        eventContainer
      );
    }


    calendarGrid.appendChild(
      dayElement
    );
  }
}


prevMonth?.addEventListener(
  "click",
  () => {

    calendarDate.setMonth(
      calendarDate.getMonth() - 1
    );

    renderCalendar();

  }
);


nextMonth?.addEventListener(
  "click",
  () => {

    calendarDate.setMonth(
      calendarDate.getMonth() + 1
    );

    renderCalendar();

  }
);


todayBtn?.addEventListener(
  "click",
  () => {

    calendarDate =
      new Date();

    renderCalendar();

  }
);


renderCalendar();


/* ==========================================
   ADD EVENT
========================================== */

const addEventBtn =
  document.getElementById("addEventBtn");


addEventBtn?.addEventListener(
  "click",
  () => {

    const title =
      prompt(
        "Enter the name of your event:"
      );


    if (!title || !title.trim()) {
      return;
    }


    const time =
      prompt(
        "Enter the time (for example 16:00):"
      );


    if (!time || !time.trim()) {
      return;
    }


    const timeline =
      document.getElementById("timeline");


    const item =
      document.createElement("div");

    item.className =
      "timeline-item";


    item.innerHTML = `

      <div class="timeline-time">
        ${escapeHTML(time)}
      </div>

      <div class="timeline-dot"></div>

      <div class="timeline-content">

        <div>

          <span class="event-category personal">
            PERSONAL
          </span>

          <h3>
            ${escapeHTML(title)}
          </h3>

          <p>
            Added to your morning dashboard.
          </p>

        </div>

        <label class="check-wrapper">

          <input
            type="checkbox"
            class="timeline-check"
          >

          <span class="custom-check">
            <i data-lucide="check"></i>
          </span>

        </label>

      </div>

    `;


    timeline.appendChild(item);


    const newCheck =
      item.querySelector(
        ".timeline-check"
      );


    newCheck.addEventListener(
      "change",
      updateProgress
    );


    refreshIcons();

    updateProgress();

    showToast(
      "Event added to your schedule."
    );
  }
);


/* ==========================================
   HTML ESCAPE
========================================== */

function escapeHTML(value) {

  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* ==========================================
   SETTINGS MODAL
========================================== */

const settingsModal =
  document.getElementById("settingsModal");

const settingsBtn =
  document.getElementById("settingsBtn");

const mobileSettingsBtn =
  document.getElementById(
    "mobileSettingsBtn"
  );

const closeModal =
  document.getElementById("closeModal");

const cancelModal =
  document.getElementById("cancelModal");

const saveSettings =
  document.getElementById("saveSettings");


function openSettings() {

  if (!settingsModal) {
    return;
  }


  modalDeliveryTime.value =
    deliveryTime.value;


  settingsModal.classList.add(
    "show"
  );
}


function closeSettings() {

  settingsModal.classList.remove(
    "show"
  );
}


settingsBtn?.addEventListener(
  "click",
  openSettings
);


mobileSettingsBtn?.addEventListener(
  "click",
  openSettings
);


closeModal?.addEventListener(
  "click",
  closeSettings
);


cancelModal?.addEventListener(
  "click",
  closeSettings
);


settingsModal?.addEventListener(
  "click",
  event => {

    if (
      event.target === settingsModal
    ) {
      closeSettings();
    }

  }
);


saveSettings?.addEventListener(
  "click",
  () => {

    const newTime =
      modalDeliveryTime.value;


    if (newTime) {

      deliveryTime.value =
        newTime;

      localStorage.setItem(
        "morning-delivery-time",
        newTime
      );

      updateDeliveryDisplay(
        newTime
      );
    }


    closeSettings();

    showToast(
      "Your morning settings were saved."
    );

  }
);


/* ==========================================
   DELIVERY TIME
========================================== */

function formatTime(time) {

  if (!time) {
    return "07:30 AM";
  }


  const [
    hours,
    minutes
  ] = time.split(":");


  const hour =
    parseInt(hours, 10);


  const displayHour =
    hour % 12 || 12;


  const ampm =
    hour >= 12
      ? "PM"
      : "AM";


  return `${displayHour}:${minutes} ${ampm}`;
}


function updateDeliveryDisplay(time) {

  const formatted =
    formatTime(time);


  if (sidebarDeliveryTime) {
    sidebarDeliveryTime.textContent =
      formatted;
  }
}


function loadDeliveryTime() {

  const saved =
    localStorage.getItem(
      "morning-delivery-time"
    );


  const time =
    saved || "07:30";


  if (deliveryTime) {
    deliveryTime.value = time;
  }


  if (modalDeliveryTime) {
    modalDeliveryTime.value = time;
  }


  updateDeliveryDisplay(time);
}


deliveryTime?.addEventListener(
  "change",
  event => {

    const value =
      event.target.value;


    localStorage.setItem(
      "morning-delivery-time",
      value
    );


    updateDeliveryDisplay(
      value
    );


    showToast(
      `Morning delivery set for ${formatTime(value)}.`
    );
  }
);


loadDeliveryTime();


/* ==========================================
   REFRESH BRIEF
========================================== */

const refreshBrief =
  document.getElementById(
    "refreshBrief"
  );


refreshBrief?.addEventListener(
  "click",
  () => {

    updateQuote();

    updateWorkout();

    updateMeals();

    refreshBrief.animate(
      [
        {
          transform: "rotate(0deg)"
        },
        {
          transform: "rotate(360deg)"
        }
      ],
      {
        duration: 500
      }
    );


    showToast(
      "Your morning brief has been refreshed."
    );
  }
);


/* ==========================================
   MOBILE MENU
========================================== */

const mobileMenuBtn =
  document.getElementById(
    "mobileMenuBtn"
  );


mobileMenuBtn?.addEventListener(
  "click",
  () => {

    document
      .getElementById("sidebar")
      ?.classList.toggle(
        "open"
      );

  }
);


/* Close mobile menu after navigation */

document
  .querySelectorAll(".nav-item")
  .forEach(item => {

    item.addEventListener(
      "click",
      () => {

        document
          .getElementById("sidebar")
          ?.classList.remove(
            "open"
          );

      }
    );

  });


/* ==========================================
   NAVIGATION ACTIVE STATE
========================================== */

const navItems =
  document.querySelectorAll(
    ".nav-item"
  );


const sections =
  document.querySelectorAll(
    "section[id]"
  );


window.addEventListener(
  "scroll",
  () => {

    let currentSection = "";


    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 180;


      if (
        window.scrollY >=
        sectionTop
      ) {

        currentSection =
          section.getAttribute(
            "id"
          );

      }

    });


    navItems.forEach(item => {

      item.classList.remove(
        "active"
      );


      if (
        item.getAttribute("href") ===
        `#${currentSection}`
      ) {

        item.classList.add(
          "active"
        );

      }

    });

  }
);


/* ==========================================
   INITIALIZE
========================================== */

refreshIcons();

updateQuote();

updateWorkout();

updateMeals();

updateProgress();