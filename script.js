document.body.classList.add('no-scroll');
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});
gsap.registerPlugin(ScrollTrigger);

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
  document.body.classList.remove('no-scroll');

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

const RSVP_API =
  "https://script.google.com/macros/s/AKfycbz4QCkbpVDpDyWhy58QFT3smepKIu-2ovcD2eCN6IkzGTKGHNharwIEGdvOchPF8AS0FA/exec";
const invitationId =
  new URLSearchParams(window.location.search).get("id") || "OmarMariamEngagement2026";

const form = document.getElementById("rsvpForm");

form.addEventListener("submit", async (e) => {
  debugger
  e.preventDefault();

  document.querySelectorAll(".err").forEach(err => err.textContent = "");

  const fullName = document.getElementById("guestName").value.trim();
  const guests = document.getElementById("guestCount").value;
  const song = document.getElementById("songRequest").value.trim();

  if (fullName.length < 2) {

    document.querySelector('[data-for="guestName"]').textContent =
      "Please enter your full name.";

    return;
  }

  const submitButton = document.getElementById("submitBtn");

  submitButton.disabled = true;
  submitButton.innerHTML = "Sending...";

  try {

    await fetch(RSVP_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "no-cors",
      body: JSON.stringify({
        invitationId,
        name: fullName,
        guests,
        message: song
      })
    });

    form.reset();

    document.getElementById("formSuccess").style.display = "block";

    submitButton.style.display = "none";

  } catch (error) {

    console.error(error);

    submitButton.disabled = false;
    submitButton.innerHTML = "Send RSVP Confirmation ✨";

    alert("Something went wrong.");
  }

});
gsap.utils.toArray(".timeline-item").forEach((item) => {

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: "top 82%",
      toggleActions: "play none none none"
    }
  });

  tl.from(item.querySelector(".timeline-dot"), {
    scale: 0,
    duration: 0.3,
    ease: "back.out(2)"
  })

    .from(item.querySelector(".timeline-time"), {
      x: -40,
      opacity: 0,
      duration: 0.4
    }, "-=0.15")

    .from(item.querySelector(".timeline-title"), {
      y: 20,
      opacity: 0,
      duration: 0.4
    }, "-=0.2")

    .from(item.querySelector("p"), {
      y: 20,
      opacity: 0,
      duration: 0.4
    }, "-=0.25");

});

gsap.utils.toArray("section").forEach((section) => {

  gsap.from(section, {

    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",

    scrollTrigger: {
      trigger: section,
      start: "top 82%",
      toggleActions: "play none none none"
    }

  });

});