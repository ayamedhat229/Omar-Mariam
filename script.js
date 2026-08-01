document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer لظهور العناصر عند السكرول
  const reveals = document.querySelectorAll(".reveal");
  const observerOptions = { threshold: 0.15 };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  reveals.forEach((el) => revealObserver.observe(el));

  // العداد التنازلي
  const eventDate = new Date("August 21, 2026 18:00:00").getTime();
  function updateCountdown() {
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById("cd-days").innerText = days < 10 ? "0" + days : days;
      document.getElementById("cd-hours").innerText = hours < 10 ? "0" + hours : hours;
      document.getElementById("cd-minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
      document.getElementById("cd-seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    }
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // التحكم بزرار تشغيل/إيقاف الموسيقى يدويًا
  const musicToggle = document.getElementById("musicToggle");
  const audio = document.getElementById("bgMusic");

  if (musicToggle && audio) {
    musicToggle.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        musicToggle.classList.remove("paused");
      } else {
        audio.pause();
        musicToggle.classList.add("paused");
      }
    });
  }
});

// دالة فتح الظرف وتفعيل الأنيمشن والموسيقى
function openInvitation() {
  const envelopeScreen = document.getElementById("envelope-screen");
  const mainSite = document.getElementById("main-site");
  const audio = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");

  // 1. إضافة كلاس الفتح للظرف والموقع
  envelopeScreen.classList.add("opened");
  
  // 2. تأخير بسيط في ظهور الموقع ليعطي إحساس خروج الكارت ببطء ونعومة
  setTimeout(() => {
    mainSite.classList.add("active");
    createPetals(); // إنشاء تساقط الورد عند فتح الدعوة
  }, 600);

  // 3. تشغيل الموسيقى تلقائياً
  if (audio) {
    audio.play().then(() => {
      if (musicToggle) musicToggle.classList.remove("paused");
    }).catch(err => {
      console.log("Autoplay was prevented by browser:", err);
    });
  }
}

// دالة تساقط الورد الاحترافية
function createPetals() {
  const container = document.getElementById("petals");
  if (!container) return;

  const petalCount = 25; // زيادة عدد الورد لإعطاء منظر أجمل

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");

    const size = Math.random() * 14 + 10;
    const left = Math.random() * 100;
    const fallDuration = Math.random() * 6 + 7; // هبوط ناعم وبطيء
    const swayDuration = Math.random() * 3 + 2;
    const delay = Math.random() * 4;

    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.left = `${left}%`;
    petal.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
    petal.style.animationDelay = `${delay}s, ${delay}s`;

    container.appendChild(petal);
  }
}