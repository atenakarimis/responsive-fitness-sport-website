const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btn", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".header__stats", {
  ...scrollRevealOption,
  delay: 2000,
});

ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".about__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".about__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
  interval: 500,
});
ScrollReveal().reveal(".about__btn", {
  ...scrollRevealOption,
  delay: 2000,
});

ScrollReveal().reveal(".program__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".service__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".service__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".service__list li", {
  ...scrollRevealOption,
  delay: 1000,
  interval: 500,
});
ScrollReveal().reveal(".service__btn", {
  ...scrollRevealOption,
  delay: 2500,
});
ScrollReveal().reveal(".check-title", {
  ...scrollRevealOption,
  delay: 500,
});
const swiper = new Swiper(".swiper", {
  loop: true,
});
ScrollReveal().reveal(".fitness-title", {
  ...scrollRevealOption,
  delay: 500,
});

//questions 
 const checkQuestions = [
      "آیا در طول هفته حداقل ۳ روز به‌صورت منظم ورزش می‌کنید؟",
      "آیا می‌تونید بدون نفس‌نفس زدن، ۱۰ دقیقه پشت‌سر‌هم بدوید یا پیاده‌روی سریع انجام بدید؟",
      "آیا حرکاتی مثل اسکوات، پوش‌آپ یا پلانک رو بدون کمک می‌تونید انجام بدید؟",
      "آیا هدف مشخصی برای تناسب اندام یا کاهش/افزایش وزن دارید؟",
      "آیا تغذیه‌تون شامل وعده‌های سالم و منظم هست؟",
      "آیا سابقه تمرین مداوم بیش از یک ماه در چند سال اخیر دارید؟",
      'آیا پس از ورزش احساس انرژی بیشتر و حال بهتر پیدا می‌کنید؟',
      "آیا با اصول اولیه گرم‌کردن و سردکردن قبل و بعد تمرین آشنا هستید؟",
      "آیا حداقل ۶ ساعت خواب مفید در شبانه‌روز دارید؟",
      "آیا از وضعیت فعلی بدن، انرژی یا وزن‌تون رضایت دارید؟"
    ];

    let checkIndex = 0;
    let checkAnswers = Array(checkQuestions.length).fill(false);

    const $qBox = document.getElementById("check-question");
    const $progress = document.getElementById("check-progress");
    const $result = document.getElementById("check-result");

    window.onload = () => {
      const stored = JSON.parse(localStorage.getItem("checkListStorage"));
      if (stored?.answers) {
        checkAnswers = stored.answers;
        checkIndex = stored.current || 0;
        if (stored.completed) {
          showCheckResult();
        } else {
          updateCheckUI();
        }
      } else {
        updateCheckUI();
      }
    };

    function updateCheckUI() {
      $progress.textContent = `سوال ${checkIndex + 1} از ${checkQuestions.length}`;
      $qBox.innerHTML = `
        <label>
          <input type="checkbox" id="check-current" ${checkAnswers[checkIndex] ? 'checked' : ''}>
          ${checkQuestions[checkIndex]}
        </label>
      `;
    }

    function saveCheckStorage(completed = false) {
      localStorage.setItem("checkListStorage", JSON.stringify({
        answers: checkAnswers,
        current: checkIndex,
        completed
      }));
    }

    function checkNext() {
      const checkbox = document.getElementById("check-current");
      checkAnswers[checkIndex] = checkbox.checked;

      if (checkIndex < checkQuestions.length - 1) {
        checkIndex++;
        saveCheckStorage();
        animateCheck();
      } else {
        saveCheckStorage(true);
        showCheckResult();
      }
    }

    function checkPrev() {
      const checkbox = document.getElementById("check-current");
      checkAnswers[checkIndex] = checkbox.checked;

      if (checkIndex > 0) {
        checkIndex--;
        saveCheckStorage();
        animateCheck();
      }
    }

    function animateCheck() {
      $qBox.classList.add("fade-out");
      setTimeout(() => {
        updateCheckUI();
        $qBox.classList.remove("fade-out");
      }, 400);
    }

    function showCheckResult() {
      const total = checkAnswers.filter(a => a).length;
      let level = "";
      if (total <= 5) level = "شما در سطح مبتدی هستید. عالیه که شروع کردید — Fitnexia اینجاست تا کمکتون کنه از همین امروز قدم بردارید.";
      else if (total <= 7) level = "شما در سطح متوسط هستید. با کمی تلاش منظم، می‌تونید سریع پیشرفت کنید.";
      else level = "شما در سطح پیشرفته یا منظم قرار دارید. وقتشه تمرینات تخصصی‌تری رو شروع کنید!";

      document.querySelectorAll(".check-btn").forEach(btn => {
        if (!btn.classList.contains("check-btn-secondary")) btn.style.display = "none";
      });

      $qBox.style.display = "none";
      $progress.style.display = "none";
      $result.innerHTML = `✅ ${level}<br>(${total} از ${checkQuestions.length})`;
    }

    function checkReset() {
      if (!confirm("آیا مطمئن هستید که می‌خواهید چک‌لیست را ریست کنید؟")) return;
      checkAnswers = Array(checkQuestions.length).fill(false);
      checkIndex = 0;
      localStorage.removeItem("checkListStorage");

      document.querySelectorAll(".check-btn").forEach(btn => {
        btn.style.display = "inline-block";
      });

      $qBox.style.display = "block";
      $progress.style.display = "block";
      $result.innerHTML = "";
      updateCheckUI();
    }


    //BMI calculator
     let gender = "";

  function goToStep2() {
    const selected = document.querySelector('input[name="gender"]:checked');
    if (!selected) {
      alert("لطفاً جنسیت را انتخاب کنید.");
      return;
    }
    gender = selected.value;
    showStep(2);
  }

  function calculateBMI() {
    const weight = parseFloat(document.getElementById("weight").value);
    const heightCm = parseFloat(document.getElementById("height").value);

    if (!weight || !heightCm || weight < 40 || heightCm < 120) {
      alert("مقادیر وارد شده معتبر نیستند.");
      return;
    }

    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);

    let status = "";
    if (bmi < 18.5) status = "کم‌وزن";
    else if (bmi < 25) status = "نرمال (وزن مناسب)";
    else if (bmi < 30) status = "اضافه وزن";
    else if (bmi < 35) status = "چاق";
    else status = "چاقی خطرناک";

    document.getElementById("bmi-result").innerHTML = `
      ${gender === 'مرد' ? "آقا" : "خانم"} عزیز، شاخص BMI شما: <br>
      <strong>${bmi.toFixed(1)}</strong><br>
      وضعیت: <strong>${status}</strong>
    `;

    showStep(3);
  }

  function restartBMI() {
    document.querySelectorAll('input').forEach(i => i.value = "");
    document.querySelectorAll('input[name="gender"]').forEach(r => r.checked = false);
    showStep(1);
  }

  function showStep(step) {
    for (let i = 1; i <= 3; i++) {
      document.getElementById(`bmi-step${i}`).classList.remove("active");
    }
    document.getElementById(`bmi-step${step}`).classList.add("active");
  }
  /////////////
      function showLevel(levelId) {
      const boxes = document.querySelectorAll('.fitness-program-box');
      boxes.forEach(b => b.classList.remove('active'));
      document.getElementById(levelId).classList.add('active');

      const buttons = document.querySelectorAll('.fitness-tab-buttons button');
      buttons.forEach(btn => btn.classList.remove('active'));

      const clicked = Array.from(buttons).find(btn => btn.textContent.includes(
        levelId === 'beginner' ? 'مبتدی' :
        levelId === 'intermediate' ? 'متوسط' : 'پیشرفته'
      ));
      if (clicked) clicked.classList.add('active');
    }