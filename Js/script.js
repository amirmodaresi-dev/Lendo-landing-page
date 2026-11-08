document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // ۰. تغییر تم (Dark / Light Mode) + بازیابی از LocalStorage
  // ==========================================
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("lendoTheme", theme);
  }

  // بازیابی تم ذخیره‌شده هنگام لود صفحه
  const savedTheme = localStorage.getItem("lendoTheme");
  if (savedTheme === "dark") {
    applyTheme("dark");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      applyTheme(isDark ? "light" : "dark");
    });
  }

  // سایه هدر هنگام اسکرول + منوی موبایل (Hamburger Drawer)
  const siteHeader = document.querySelector(".site-header");
  window.addEventListener(
    "scroll",
    () => {
      if (!siteHeader) return;
      if (window.scrollY > 12) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    },
    { passive: true },
  );

  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileNavDrawer = document.getElementById("mobileNavDrawer");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");
  const closeDrawerBtn = document.getElementById("closeDrawerBtn");

  function openMobileDrawer() {
    if (!mobileNavDrawer || !mobileNavOverlay) return;
    mobileNavDrawer.classList.add("active");
    mobileNavOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileDrawer() {
    if (!mobileNavDrawer || !mobileNavOverlay) return;
    mobileNavDrawer.classList.remove("active");
    mobileNavOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", openMobileDrawer);
  }
  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener("click", closeMobileDrawer);
  }
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener("click", closeMobileDrawer);
  }

  document.querySelectorAll(".mobile-drawer-links a").forEach((link) => {
    link.addEventListener("click", closeMobileDrawer);
  });

  // ==========================================
  // ۱. اسلایدر (Hero Slider با دات‌ها و قابلیت سوایپ موبایل)
  // ==========================================
  const slidesData = [
    {
      bgColor: "#2f34ce",
      badge: "بدون ضامن و چک برگشتی",
      textImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/loan-text.svg",
      mainImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/loan-cards-illustration.png",
      btnText: "درخواست وام",
      btnLink: "#calculator-section",
      lightSlide: false,
    },
    {
      bgColor: "#1e3a6e",
      badge: "طرح فوری حامی لندو",
      textImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/hami-text.svg",
      mainImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/hami-illustration.png",
      btnText: "مشاوره رایگان",
      btnLink: "#hami-section",
      lightSlide: false,
    },
    {
      bgColor: "#177b1d",
      badge: "جشنواره ویژه لندو",
      textImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/worldcup-text.png",
      mainImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/worldCup-illustration.png",
      btnText: "محاسبه اقساط",
      btnLink: "#calculator-section",
      lightSlide: false,
    },
    {
      bgColor: "#2d6a56",
      badge: "باشگاه مشتریان لندولند",
      textImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/lendoland-text.svg",
      mainImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/lendoland-illustration.png",
      btnText: "شرایط وام",
      btnLink: "#steps-section",
      lightSlide: false,
    },
    {
      bgColor: "#cfeaff",
      badge: "دعوت از دوستان",
      textImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/referral-text-3.svg",
      mainImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/referral-illustration.png",
      btnText: "ارتباط با پشتیبانی",
      btnLink: "#faq-section",
      lightSlide: true,
    },
  ];

  const container = document.getElementById("slidesContainer");
  const slider = document.querySelector(".lendo-slider");
  const sliderDotsContainer = document.getElementById("sliderDots");
  let currentIndex = 0;
  let slideInterval = null;

  if (container && slider) {
    slidesData.forEach((slide, index) => {
      const slideDiv = document.createElement("div");
      slideDiv.classList.add("slide");
      if (slide.lightSlide) slideDiv.classList.add("light-slide");
      if (index === 0) slideDiv.classList.add("active");

      slideDiv.innerHTML = `
        <div class="right-side">
          <span class="slide-badge">✨ ${slide.badge}</span>
          <img src="${slide.textImg}" alt="متن اسلاید ${index + 1}" class="content-img"/>
          <a href="${slide.btnLink}" class="action-btn">
            <span>${slide.btnText}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          </a>
        </div>
        <div class="left-side">
          <img src="${slide.mainImg}" alt="تصویر اسلاید ${index + 1}" class="main-img"/>
        </div>
      `;
      container.appendChild(slideDiv);

      if (sliderDotsContainer) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = `slider-dot ${index === 0 ? "active" : ""}`;
        dot.setAttribute("aria-label", `اسلاید ${index + 1}`);
        dot.addEventListener("click", () => {
          currentIndex = index;
          showSlide(currentIndex);
          resetAutoSlide();
        });
        sliderDotsContainer.appendChild(dot);
      }
    });

    slider.style.backgroundColor = slidesData[0].bgColor;

    const slides = document.querySelectorAll(".slide");
    const sliderDots = document.querySelectorAll(".slider-dot");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    function showSlide(index) {
      slides.forEach((s) => s.classList.remove("active"));
      sliderDots.forEach((d) => d.classList.remove("active"));
      slides[index].classList.add("active");
      if (sliderDots[index]) sliderDots[index].classList.add("active");
      slider.style.backgroundColor = slidesData[index].bgColor;
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    }

    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 5500);
    }

    function resetAutoSlide() {
      clearInterval(slideInterval);
      startAutoSlide();
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
      });

      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
      });
    }

    // پشتیبانی از سوایپ لمسی (Touch Swipe) برای موبایل
    let touchStartX = 0;
    slider.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );

    slider.addEventListener(
      "touchend",
      (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 45) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
          resetAutoSlide();
        }
      },
      { passive: true },
    );

    startAutoSlide();
  }

  // ==========================================
  // ۲. بخش مراحل و گام‌ها (Section 3)
  // ==========================================
  const stagesData = [
    {
      stepBadge: "گام اول از ۷",
      title: "اعتبارسنجی بانکی",
      description:
        "ابتدا لازم است با انجام اعتبارسنجی بانکی، رتبه اعتباری خود را بررسی کنید. این رتبه به شما نشان می‌دهد که شرایط دریافت وام لندو را دارید و با توجه به آن، مشخص می‌شود که کدام وام‌ها برای شما قابل دریافت هستند.",
      imgSrc: "https://s4.lendo.ir/lendo-static/lendo-v2/credit/step1-04.png",
      linkText: "شروع اعتبارسنجی",
      linkHref: "#calculator-section",
    },
    {
      stepBadge: "گام دوم از ۷",
      title: "ثبت درخواست وام",
      description:
        "مبلغ وام موردنیاز (از ۲۰ تا ۵۰ میلیون تومان) و مدت بازپرداخت دلخواه را انتخاب کرده و درخواست وام خود را به صورت کاملاً آنلاین ثبت کنید.",
      imgSrc: "https://s4.lendo.ir/lendo-static/lendo-v2/credit/step2-03.png",
      linkText: "مشاهده و انتخاب وام",
      linkHref: "#calculator-section",
    },
    {
      stepBadge: "گام سوم از ۷",
      title: "بارگذاری مدارک هویتی",
      description:
        "در این مرحله وارد حساب کاربری خود شوید و تصویر کارت ملی و مدارک لازم را بارگذاری کنید. پس از بارگذاری مدارک، وارد مرحله اعتبارسنجی اولیه بانک می‌شوید.",
      imgSrc: "https://s4.lendo.ir/lendo-static/lendo-v2/credit/step2-02.png",
      linkText: "بارگذاری مدارک",
      linkHref: "#calculator-section",
    },
    {
      stepBadge: "گام چهارم از ۷",
      title: "ثبت امضای الکترونیکی",
      description:
        "از طریق سامانه امضای دیجیتال، امضای الکترونیکی خود را ثبت کنید. با این امضا می‌توانید سفته الکترونیکی و قراردادهای لندو و بانک را بدون مراجعه حضوری امضا نمایید.",
      imgSrc: "https://s4.lendo.ir/lendo-static/lendo-v2/credit/step3-02.png",
      linkText: "راهنمای امضای دیجیتال",
      linkHref: "#faq-section",
    },
    {
      stepBadge: "گام پنجم از ۷",
      title: "صدور سفته الکترونیکی",
      description:
        "بدون نیاز به چک یا ضامن کارمند، سفته الکترونیکی را به صورت آنلاین از پنل کاربری لندو تهیه کرده و با امضای دیجیتال خود تایید کنید.",
      imgSrc: "https://s4.lendo.ir/lendo-static/lendo-v2/credit/step5-02.png",
      linkText: "آموزش خرید سفته",
      linkHref: "#faq-section",
    },
    {
      stepBadge: "گام ششم از ۷",
      title: "امضای آنلاین قراردادها",
      description:
        "بعد از اینکه سفته شما توسط لندو بررسی و تایید شد، نوبت به مرحله امضای قرارداد می‌رسد. قراردادهای لندو و بانک آینده را به صورت کاملاً آنلاین امضا کنید.",
      imgSrc: "https://s4.lendo.ir/lendo-static/lendo-v2/credit/step6-04.png",
      linkText: "فعال‌سازی وام کارت",
      linkHref: "#calculator-section",
    },
    {
      stepBadge: "گام هفتم از ۷",
      title: "تایید نهایی بانک و دریافت وام کارت",
      description:
        "در این مرحله درخواست وام شما توسط بانک نهایی می‌شود و وام لندو در قالب «وام کارت» عضو شتاب در اختیارتان قرار می‌گیرد تا از سراسر کشور خرید کنید.",
      imgSrc: "https://s4.lendo.ir/lendo-static/lendo-v2/credit/step7-04.png",
      linkText: "درخواست وام کارت",
      linkHref: "#calculator-section",
    },
  ];

  let currentStage = 0;
  const stageTitles = document.querySelectorAll(".sec3-lvl h5");
  const stageStepBadge = document.getElementById("stepCounterBadge");
  const stageTitle = document.querySelector(".sec3-des h3");
  const stageDescription = document.querySelector(".sec3-des h5");
  const stageLink = document.querySelector(".sec3-des a");
  const stageImage = document.querySelector(".sec3-img img");
  const dots = document.querySelectorAll(".sec3-dot");
  const prevArrow = document.querySelector(
    ".sec3-box-btn .lucide-chevron-right",
  );
  const nextArrow = document.querySelector(
    ".sec3-box-btn .lucide-chevron-left",
  );

  const arrowIconSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  `;

  function updateStage(index) {
    if (!stageTitle) return;

    stageTitles.forEach((t) => t.classList.remove("active"));
    dots.forEach((d) => d.classList.remove("active"));

    if (stageTitles[index]) stageTitles[index].classList.add("active");
    if (dots[index]) dots[index].classList.add("active");

    const data = stagesData[index];
    if (stageStepBadge) stageStepBadge.textContent = data.stepBadge;
    stageTitle.textContent = data.title;
    stageDescription.textContent = data.description;
    if (stageImage) stageImage.src = data.imgSrc;
    if (stageLink) {
      stageLink.innerHTML = `<span>${data.linkText}</span> ${arrowIconSVG}`;
      stageLink.href = data.linkHref;
    }
  }

  stageTitles.forEach((title, index) => {
    title.addEventListener("click", () => {
      currentStage = index;
      updateStage(currentStage);
    });
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentStage = index;
      updateStage(currentStage);
    });
  });

  if (prevArrow) {
    prevArrow.addEventListener("click", () => {
      currentStage = (currentStage - 1 + stagesData.length) % stagesData.length;
      updateStage(currentStage);
    });
  }

  if (nextArrow) {
    nextArrow.addEventListener("click", () => {
      currentStage = (currentStage + 1) % stagesData.length;
      updateStage(currentStage);
    });
  }

  if (stageTitles.length > 0) {
    updateStage(currentStage);
  }

  // ==========================================
  // ۳. محاسبه‌گر اقساط وام (Section 5) با انتخابگر مدت بازپرداخت (۶، ۹، ۱۲ ماه)
  // ==========================================
  const loanRange = document.getElementById("range3");
  const amountDisplay = document.getElementById("loanAmountDisplay");
  const repaymentPeriodDisplay = document.getElementById("repaymentPeriod");
  const monthlyDisplay = document.getElementById("monthlyInstallment");
  const totalDisplay = document.getElementById("totalRepayment");
  const increaseBtn = document.getElementById("increaseAmount");
  const decreaseBtn = document.getElementById("decreaseAmount");
  const durationPills = document.querySelectorAll(".duration-pill");

  let selectedMonths = 12;
  const interestRatesByMonth = {
    6: 0.068,
    9: 0.098,
    12: 0.1289,
  };

  function formatNumber(num) {
    return new Intl.NumberFormat("fa-IR").format(num);
  }

  function calculateLoan() {
    if (!loanRange) return;
    const min = parseInt(loanRange.min, 10) || 20000000;
    const max = parseInt(loanRange.max, 10) || 50000000;
    let amount = parseInt(loanRange.value, 10) || 50000000;
    amount = Math.max(min, Math.min(max, amount));

    if (amountDisplay) amountDisplay.textContent = formatNumber(amount);
    if (repaymentPeriodDisplay)
      repaymentPeriodDisplay.textContent = formatNumber(selectedMonths);

    const rate = interestRatesByMonth[selectedMonths] || 0.1289;
    const totalPayable = Math.round(amount * (1 + rate));
    const monthlyInstallment = Math.round(totalPayable / selectedMonths);

    if (monthlyDisplay)
      monthlyDisplay.textContent = formatNumber(monthlyInstallment);
    if (totalDisplay) totalDisplay.textContent = formatNumber(totalPayable);
  }

  durationPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      durationPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      selectedMonths = parseInt(pill.dataset.months, 10) || 12;
      calculateLoan();
    });
  });

  if (loanRange) {
    loanRange.addEventListener("input", calculateLoan);

    if (increaseBtn) {
      increaseBtn.addEventListener("click", () => {
        const max = parseInt(loanRange.max, 10) || 50000000;
        const nextVal = Math.min(max, parseInt(loanRange.value, 10) + 1000000);
        loanRange.value = nextVal;
        calculateLoan();
      });
    }

    if (decreaseBtn) {
      decreaseBtn.addEventListener("click", () => {
        const min = parseInt(loanRange.min, 10) || 20000000;
        const prevVal = Math.max(min, parseInt(loanRange.value, 10) - 1000000);
        loanRange.value = prevVal;
        calculateLoan();
      });
    }

    calculateLoan();
  }

  // ==========================================
  // ۴. آکاردئون سوالات متداول (Section 9)
  // ==========================================
  const faqItems = document.querySelectorAll(".sec9 .child");

  faqItems.forEach((item) => {
    item.addEventListener("click", function () {
      const isOpen = this.classList.contains("open");
      faqItems.forEach((c) => {
        c.classList.remove("open");
        c.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        this.classList.add("open");
        this.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.querySelectorAll('[role="button"][tabindex]').forEach((el) => {
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        el.click();
      }
    });
  });

  // ==========================================
  // ۵. سیستم ورودی کاربر و مدیریت Session
  // ==========================================
  const headerLoginBtn = document.getElementById("headerLoginBtn");
  const drawerLoginBtn = document.getElementById("drawerLoginBtn");
  const userProfileDropdown = document.getElementById("userProfileDropdown");
  const profileBtn = document.getElementById("profileBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const logoutBtn = document.getElementById("logoutBtn");
  const userNameDisplay = document.getElementById("userNameDisplay");
  const menuUsername = document.getElementById("menuUsername");

  const authModal = document.getElementById("authModal");
  const closeAuthModal = document.getElementById("closeAuthModal");
  const loginTabBtn = document.getElementById("loginTabBtn");
  const registerTabBtn = document.getElementById("registerTabBtn");
  const loginForm = document.getElementById("loginForm");
  const registerFormModal = document.getElementById("registerFormModal");
  const authAlert = document.getElementById("authAlert");

  function checkAuthStatus() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      if (headerLoginBtn) headerLoginBtn.style.display = "none";
      if (userProfileDropdown)
        userProfileDropdown.style.display = "inline-block";
      if (userNameDisplay) userNameDisplay.textContent = loggedInUser;
      if (menuUsername) menuUsername.textContent = loggedInUser;
    } else {
      if (headerLoginBtn) headerLoginBtn.style.display = "inline-flex";
      if (userProfileDropdown) userProfileDropdown.style.display = "none";
    }

    if (typeof updateRequestsBadge === "function") updateRequestsBadge();
  }

  if (profileBtn && dropdownMenu) {
    profileBtn.addEventListener("click", () => {
      dropdownMenu.classList.toggle("show");
      userProfileDropdown.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (userProfileDropdown && !userProfileDropdown.contains(e.target)) {
        dropdownMenu.classList.remove("show");
        userProfileDropdown.classList.remove("active");
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      checkAuthStatus();
      if (dropdownMenu) dropdownMenu.classList.remove("show");
      showToast("از حساب کاربری خارج شدید");
    });
  }

  function openAuthModalWindow(e) {
    if (e) e.preventDefault();
    closeMobileDrawer();
    if (authModal) {
      authModal.classList.add("active");
      hideAlert();
    }
  }

  if (headerLoginBtn) {
    headerLoginBtn.addEventListener("click", openAuthModalWindow);
  }
  if (drawerLoginBtn) {
    drawerLoginBtn.addEventListener("click", openAuthModalWindow);
  }

  if (closeAuthModal) {
    closeAuthModal.addEventListener("click", () => {
      authModal.classList.remove("active");
    });
  }

  if (authModal) {
    authModal.addEventListener("click", (e) => {
      if (e.target === authModal) {
        authModal.classList.remove("active");
      }
    });
  }

  if (loginTabBtn && registerTabBtn) {
    loginTabBtn.addEventListener("click", () => {
      loginTabBtn.classList.add("active");
      registerTabBtn.classList.remove("active");
      loginForm.classList.add("active");
      registerFormModal.classList.remove("active");
      hideAlert();
    });

    registerTabBtn.addEventListener("click", () => {
      registerTabBtn.classList.add("active");
      loginTabBtn.classList.remove("active");
      registerFormModal.classList.add("active");
      loginForm.classList.remove("active");
      hideAlert();
    });
  }

  function showAlert(message, type) {
    if (!authAlert) return;
    authAlert.textContent = message;
    authAlert.className = `auth-alert ${type}`;
    authAlert.style.display = "block";
  }

  function hideAlert() {
    if (!authAlert) return;
    authAlert.style.display = "none";
    authAlert.className = "auth-alert";
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      const registeredUsers = JSON.parse(
        localStorage.getItem("lendoRegisteredUsers") || "{}",
      );

      if (
        (username === "admin" && password === "admin") ||
        (registeredUsers[username] && registeredUsers[username] === password)
      ) {
        showAlert("با موفقیت وارد شدید!", "success");
        localStorage.setItem("loggedInUser", username);

        setTimeout(() => {
          authModal.classList.remove("active");
          loginForm.reset();
          hideAlert();
          checkAuthStatus();
          showToast(`خوش آمدید، ${username} عزیز! 👋`);
        }, 900);
      } else {
        showAlert(
          "نام کاربری یا رمز عبور اشتباه است. (دمو: admin / admin)",
          "error",
        );
      }
    });
  }

  if (registerFormModal) {
    registerFormModal.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("regUsername").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (username.length < 4) {
        showAlert("نام کاربری باید حداقل ۴ کاراکتر باشد.", "error");
        return;
      }

      if (!emailRegex.test(email)) {
        showAlert("لطفاً یک آدرس ایمیل معتبر وارد کنید.", "error");
        return;
      }

      if (password.length < 6) {
        showAlert("رمز عبور باید حداقل ۶ کاراکتر باشد.", "error");
        return;
      }

      const registeredUsers = JSON.parse(
        localStorage.getItem("lendoRegisteredUsers") || "{}",
      );
      registeredUsers[username] = password;
      localStorage.setItem(
        "lendoRegisteredUsers",
        JSON.stringify(registeredUsers),
      );

      showAlert("ثبت‌نام با موفقیت انجام شد!", "success");
      localStorage.setItem("loggedInUser", username);

      setTimeout(() => {
        authModal.classList.remove("active");
        registerFormModal.reset();
        hideAlert();
        checkAuthStatus();
        showToast(`حساب کاربری ${username} با موفقیت ساخته شد 🎉`);
      }, 900);
    });
  }

  // ==========================================
  // ۶. سیستم درخواست‌های وام (سبد وام)
  // ==========================================
  const loanRequestBtn = document.querySelector(".sec5-left-btn");
  const myRequestsBtn = document.getElementById("myRequestsBtn");
  const myRequestsModal = document.getElementById("myRequestsModal");
  const closeMyRequestsModal = document.getElementById("closeMyRequestsModal");
  const requestsList = document.getElementById("requestsList");
  const requestsEmpty = document.getElementById("requestsEmpty");
  const requestsBadge = document.getElementById("requestsBadge");
  const toastNotification = document.getElementById("toastNotification");

  function getCurrentUser() {
    return localStorage.getItem("loggedInUser");
  }

  function getRequestsStorageKey() {
    const user = getCurrentUser();
    return user ? `lendoLoanRequests_${user}` : null;
  }

  function getLoanRequests() {
    const key = getRequestsStorageKey();
    if (!key) return [];
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveLoanRequests(list) {
    const key = getRequestsStorageKey();
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(list));
  }

  let toastTimeout = null;
  function showToast(message, type = "success") {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.className = `toast-notification show ${type}`;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove("show");
    }, 3000);
  }

  function updateRequestsBadge() {
    if (!requestsBadge) return;
    const count = getLoanRequests().length;
    if (count > 0) {
      requestsBadge.textContent = formatNumber(count);
      requestsBadge.style.display = "inline-flex";
    } else {
      requestsBadge.style.display = "none";
    }
  }

  function buildRequestCardHTML(req) {
    return `
      <div class="request-card" data-id="${req.id}">
        <div class="request-card-top">
          <div class="request-amount">
            ${formatNumber(req.amount)}<span>تومان</span>
          </div>
          <span class="request-status">${req.status}</span>
        </div>
        <div class="request-card-details">
          <span>مدت بازپرداخت: <strong>${formatNumber(req.months)} ماه</strong></span>
          <span>قسط ماهیانه: <strong>${formatNumber(req.monthly)} تومان</strong></span>
        </div>
        <div class="request-card-footer">
          <span class="request-date">${req.date}</span>
          <button type="button" class="request-cancel-btn" data-id="${req.id}">
            انصراف از درخواست
          </button>
        </div>
      </div>
    `;
  }

  function renderRequestsList() {
    if (!requestsList || !requestsEmpty) return;
    const requests = getLoanRequests();

    if (requests.length === 0) {
      requestsList.innerHTML = "";
      requestsEmpty.style.display = "block";
      return;
    }

    requestsEmpty.style.display = "none";
    requestsList.innerHTML = requests
      .slice()
      .reverse()
      .map(buildRequestCardHTML)
      .join("");
  }

  function addLoanRequest() {
    if (!loanRange) return;

    const amount = parseInt(loanRange.value, 10) || 0;
    const rate = interestRatesByMonth[selectedMonths] || 0.1289;
    const totalPayable = Math.round(amount * (1 + rate));
    const monthly = Math.round(totalPayable / selectedMonths);

    const newRequest = {
      id: Date.now().toString(),
      amount,
      months: selectedMonths,
      monthly,
      status: "در انتظار بررسی مدارک",
      date: new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date()),
    };

    const requests = getLoanRequests();
    requests.push(newRequest);
    saveLoanRequests(requests);
    updateRequestsBadge();
    renderRequestsList();
    showToast("درخواست وام شما با موفقیت در سبد وام ثبت شد ✅");
  }

  function removeLoanRequest(id) {
    const requests = getLoanRequests().filter((r) => r.id !== id);
    saveLoanRequests(requests);
    updateRequestsBadge();
    renderRequestsList();
    showToast("درخواست موردنظر حذف شد", "error");
  }

  if (loanRequestBtn) {
    loanRequestBtn.addEventListener("click", () => {
      const currentUser = getCurrentUser();

      if (!currentUser) {
        showToast("برای ثبت درخواست، ابتدا وارد حساب کاربری خود شوید", "error");
        if (authModal) {
          authModal.classList.add("active");
          hideAlert();
        }
        return;
      }

      addLoanRequest();
    });
  }

  if (myRequestsBtn && myRequestsModal) {
    myRequestsBtn.addEventListener("click", () => {
      if (dropdownMenu) dropdownMenu.classList.remove("show");
      if (userProfileDropdown) userProfileDropdown.classList.remove("active");
      renderRequestsList();
      myRequestsModal.classList.add("active");
    });
  }

  if (closeMyRequestsModal && myRequestsModal) {
    closeMyRequestsModal.addEventListener("click", () => {
      myRequestsModal.classList.remove("active");
    });
  }

  if (myRequestsModal) {
    myRequestsModal.addEventListener("click", (e) => {
      if (e.target === myRequestsModal) {
        myRequestsModal.classList.remove("active");
      }
    });
  }

  if (requestsList) {
    requestsList.addEventListener("click", (e) => {
      const btn = e.target.closest(".request-cancel-btn");
      if (btn) {
        removeLoanRequest(btn.dataset.id);
      }
    });
  }
  checkAuthStatus();

  // ==========================================
  // ۷. ویجت چت پشتیبانی آنلاین (تعاملی)
  // ==========================================
  const chatToggleBtn = document.getElementById("chatToggleBtn");
  const chatWidget = document.getElementById("chatWidget");
  const chatCloseBtn = document.getElementById("chatCloseBtn");
  const chatBody = document.querySelector(".chat-body");

  const botReplies = {
    "راهنمایی وام حامی":
      "طرح حامی لندو وامی فوری و بدون سود است که بر اساس رتبه اعتباری شما در کمتر از چند دقیقه به کارت بانکی‌تان واریز می‌شود.",
    "اعتبارسنجی و مشاوره":
      "برای اعتبارسنجی کافیست کد ملی و شماره موبایل به نام خودتان را در بخش «شروع اعتبارسنجی» وارد کنید تا رتبه اعتباری بانکی شما استعلام شود.",
    "وام‌های بلند مدت":
      "سقف وام‌های خرید کالای لندو تا ۵۰ میلیون تومان با بازپرداخت ۶، ۹ یا ۱۲ ماهه و تنها با سفته الکترونیکی (بدون ضامن) است.",
    "ارتباط با کارشناس":
      "کارشناسان مرکز تماس لندو همه‌روزه از ساعت ۸ الی ۲۰ از طریق شماره ۰۲۱-۹۱۰۱۲۹۷۹ آماده پاسخگویی به شما هستند.",
  };

  if (chatToggleBtn && chatWidget && chatCloseBtn) {
    chatToggleBtn.addEventListener("click", () => {
      chatWidget.classList.toggle("active");
    });

    chatCloseBtn.addEventListener("click", () => {
      chatWidget.classList.remove("active");
    });

    document.querySelectorAll(".chat-options .option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const questionText = btn.textContent.trim();
        const replyText =
          botReplies[questionText] ||
          "پشتیبانان ما به‌زودی پاسخگوی شما خواهند بود.";

        if (chatBody) {
          const replyDiv = document.createElement("div");
          replyDiv.className = "chat-message with-avatar";
          replyDiv.innerHTML = `
            <div class="chat-bubble text-bubble">
              <p><strong>${questionText}:</strong></p>
              <p>${replyText}</p>
            </div>
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=3"
              alt="پشتیبان"
              class="message-avatar"
            />
            <span class="chat-time">هم‌اکنون</span>
          `;
          chatBody.appendChild(replyDiv);
          chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (!chatWidget.contains(e.target) && !chatToggleBtn.contains(e.target)) {
        chatWidget.classList.remove("active");
      }
    });
  }
});
