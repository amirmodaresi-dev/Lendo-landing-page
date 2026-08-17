document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // ۰. تغییر تم (Dark / Light Mode)
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

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      applyTheme(isDark ? "light" : "dark");
    });
  }

  // ==========================================
  // ۱. اسلایدر (Hero Slider)
  // ==========================================

  const slidesData = [
    {
      bgColor: "#2f34ce",
      textImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/loan-text.svg",
      mainImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/loan-cards-illustration.png",
      btnText: "درخواست وام",
      btnLink: "#",
    },
    {
      bgColor: "#1e3a6e",
      textImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/hami-text.svg",
      mainImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/hami-illustration.png",
      btnText: "مشاوره رایگان",
      btnLink: "#",
    },
    {
      bgColor: "#177b1d",
      textImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/worldcup-text.png",
      mainImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/worldCup-illustration.png",
      btnText: "محاسبه اقساط",
      btnLink: "#",
    },
    {
      bgColor: "#3a7a62",
      textImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/lendoland-text.svg",
      mainImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/lendoland-illustration.png",
      btnText: "شرایط وام",
      btnLink: "#",
    },
    {
      bgColor: "#cfeaff",
      textImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/referral-text-3.svg",
      mainImg:
        "https://s4.lendo.ir/lendo-static/lendo-v2/home/slider/v3/referral-illustration.png",
      btnText: "تماس با ما",
      btnLink: "#",
    },
  ];

  const container = document.getElementById("slidesContainer");
  const slider = document.querySelector(".lendo-slider");
  let currentIndex = 0;
  let slideInterval = null;

  if (container && slider) {
    slidesData.forEach((slide, index) => {
      const slideDiv = document.createElement("div");
      slideDiv.classList.add("slide");
      if (index === 0) slideDiv.classList.add("active");

      slideDiv.innerHTML = `
        <div class="right-side">
          <img src="${slide.textImg}" alt="متن اسلاید" class="content-img"/>
          <a href="${slide.btnLink}" class="action-btn">${slide.btnText}</a>
        </div>
        <div class="left-side">
          <img src="${slide.mainImg}" alt="تصویر اسلاید" class="main-img"/>
        </div>
      `;
      container.appendChild(slideDiv);
    });

    slider.style.backgroundColor = slidesData[0].bgColor;

    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    function showSlide(index) {
      slides.forEach((s) => s.classList.remove("active"));
      slides[index].classList.add("active");
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
      slideInterval = setInterval(nextSlide, 5000);
    }

    // ریست کردن تایمر هنگام کلیک کاربر
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

    startAutoSlide();
  }
  // ==========================================
  // ۲. بخش مراحل و گام‌ها (Section 3)
  // ==========================================
  const stagesData = [
    {
      title: "اعتبارسنجی",
      description:
        "ابتدا لازم است با انجام اعتبارسنجی بانکی، رتبه اعتباری خود را بررسی کنید. این رتبه به شما نشان می‌دهد که شرایط دریافت وام لندو را دارید و با توجه به آن، مشخص می‌شود که کدام وام‌ها برای شما قابل دریافت هستند.",
      imgSrc: "https://s4.lendo.ir/lendo-static/lendo-v2/credit/step1-04.png",
      linkText: "اعتبارسنجی",
      linkHref: "#",
    },
    {
      title: "درخواست وام",
      description:
        "مبلغ وام و مدت بازپرداخت را انتخاب و درخواست وام خود را ثبت کنید.",
      imgSrc: "https://s4.lendo.ir/lendo-static/lendo-v2/credit/step2-03.png",
      linkText: "مشاهده وام‌ها",
      linkHref: "#",
    },
    {
      title: "بارگزاری مدارک",
      description:
        "در این مرحله باید وارد حساب کاربری خود شوید و مدارک لازم را بارگزاری کنید. بعد از بارگزاری مدارک، وارد مرحله اعتبارسنجی اولیه بانک می‌شوید.",
      imgSrc: "https://s4.lendo.ir/lendo-static/lendo-v2/credit/step2-02.png",
      linkText: "بارگذاری مدارک",
      linkHref: "#",
    },
    {
      title: "ثبت امضای الکترونیکی",
      description:
        "از طریق نرم افزار آینده ساین، امضای الکترونیکی خود را ثبت کنید. با این امضا می‌توانید سفته الکترونیکی و قراردادهای لندو و بانک را به صورت آنلاین امضا کنید.",
      imgSrc: "https://s4.lendo.ir/lendo-static/lendo-v2/credit/step3-02.png",
      linkText: "پیگیری وضعیت",
      linkHref: "#",
    },
    {
      title: "صدور سفته الکترونیکی",
      description:
        "حالا باید از لندو سفته الکترونیکی تهیه کرده و آن را امضا کنید. پس از تهیه سفته از لندو، آن را در آینده ساین امضا کنید.",
      imgSrc: "https://s4.lendo.ir/lendo-static/lendo-v2/credit/step5-02.png",
      linkText: "امضای دیجیتال",
      linkHref: "#",
    },
    {
      title: "امضای قراردادها",
      description:
        "بعد از اینکه سفته شما توسط لندو بررسی و تایید شد، نوبت به مرحله امضای قرارداد می‌رسد. شما باید با امضای الکترونیکی خود، قراردادهای لندو و بانک را به صورت آنلاین امضا کنید.",
      imgSrc: "https://s4.lendo.ir/lendo-static/lendo-v2/credit/step6-04.png",
      linkText: "فعال‌سازی کارت",
      linkHref: "#",
    },
    {
      title: "تایید نهایی بانک و دریافت وام",
      description:
        "در این مرحله درخواست وام شما توسط بانک نهایی می‌شود و وام لندو در قالب «وام کارت» در اختیارتان قرار می‌گیرد. حالا می‌توانید با وام خود خرید انواع کالا را از فروشگاه‌های طرف قرارداد انجام دهید و سپس اقساط آن را به لندو پرداخت کنید.",
      imgSrc: "https://s4.lendo.ir/lendo-static/lendo-v2/credit/step7-04.png",
      linkText: "پرداخت قسط",
      linkHref: "#",
    },
  ];

  let currentStage = 0;
  const stageTitles = document.querySelectorAll(".sec3-lvl h5");
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

  function updateStage(index) {
    if (!stageTitle) return;

    stageTitles.forEach((t) => t.classList.remove("active"));
    dots.forEach((d) => d.classList.remove("active"));

    if (stageTitles[index]) stageTitles[index].classList.add("active");
    if (dots[index]) dots[index].classList.add("active");

    const data = stagesData[index];
    stageTitle.textContent = data.title;
    stageDescription.textContent = data.description;
    if (stageImage) stageImage.src = data.imgSrc;
    if (stageLink) {
      stageLink.textContent = data.linkText;
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
  // ۳. محاسبه‌گر اقساط وام (Section 5)
  // ==========================================
  const loanRange = document.getElementById("range3");
  const amountDisplay = document.getElementById("loanAmountDisplay");
  const monthlyDisplay = document.getElementById("monthlyInstallment");
  const totalDisplay = document.getElementById("totalRepayment");
  const increaseBtn = document.getElementById("increaseAmount");
  const decreaseBtn = document.getElementById("decreaseAmount");

  const interestRate = 0.1289;
  const months = 12;

  function formatNumber(num) {
    return new Intl.NumberFormat("fa-IR").format(num);
  }

  function calculateLoan() {
    if (!loanRange) return;
    const amount = parseInt(loanRange.value, 10) || 0;

    if (amountDisplay) amountDisplay.textContent = formatNumber(amount);

    const totalPayable = Math.round(amount * (1 + interestRate));
    const monthlyInstallment = Math.round(totalPayable / months);

    if (monthlyDisplay)
      monthlyDisplay.textContent = formatNumber(monthlyInstallment);
    if (totalDisplay) totalDisplay.textContent = formatNumber(totalPayable);
  }

  if (loanRange) {
    loanRange.addEventListener("input", calculateLoan);

    if (increaseBtn) {
      increaseBtn.addEventListener("click", () => {
        loanRange.value = parseInt(loanRange.value, 10) + 1000000;
        calculateLoan();
      });
    }

    if (decreaseBtn) {
      decreaseBtn.addEventListener("click", () => {
        loanRange.value = parseInt(loanRange.value, 10) - 1000000;
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
      faqItems.forEach((c) => c.classList.remove("open"));
      if (!isOpen) {
        this.classList.add("open");
      }
    });
  });

  // ==========================================
  // ۵. سیستم ورودی کاربر و مدیریت Session
  // ==========================================
  const headerLoginBtn = document.getElementById("headerLoginBtn");
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

  // بررسی وضعیت لاگین از LocalStorage هنگام بارگذاری صفحه
  function checkAuthStatus() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      if (headerLoginBtn) headerLoginBtn.style.display = "none";
      if (userProfileDropdown)
        userProfileDropdown.style.display = "inline-block";
      if (userNameDisplay) userNameDisplay.textContent = loggedInUser;
      if (menuUsername) menuUsername.textContent = loggedInUser;
    } else {
      if (headerLoginBtn) headerLoginBtn.style.display = "inline-block";
      if (userProfileDropdown) userProfileDropdown.style.display = "none";
    }

    if (typeof updateRequestsBadge === "function") updateRequestsBadge();
  }

  // باز/بسته کردن منوی دراپ‌داون پروفایل
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

  // خروج از حساب کاربری
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      checkAuthStatus();
      if (dropdownMenu) dropdownMenu.classList.remove("show");
    });
  }

  // باز کردن مودال با کلیک روی دکمه ورود هدر
  if (headerLoginBtn) {
    headerLoginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (authModal) {
        authModal.classList.add("active");
        hideAlert();
      }
    });
  }

  // بستن مودال
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

  // سوئیچ تب‌های ورود/ثبت‌نام
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

  // --- بررسی فرم ورود ---
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      if (username === "admin" && password === "admin") {
        showAlert("با موفقیت وارد شدید!", "success");
        localStorage.setItem("loggedInUser", username);

        setTimeout(() => {
          authModal.classList.remove("active");
          loginForm.reset();
          hideAlert();
          checkAuthStatus();
        }, 1200);
      } else {
        showAlert("نام کاربری یا رمز عبور اشتباه است.", "error");
      }
    });
  }

  // --- بررسی فرم ثبت‌نام ---
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

      showAlert("ثبت‌نام با موفقیت انجام شد!", "success");
      localStorage.setItem("loggedInUser", username);

      setTimeout(() => {
        authModal.classList.remove("active");
        registerFormModal.reset();
        hideAlert();
        checkAuthStatus();
      }, 1200);
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

  // گرفتن نام کاربر لاگین‌شده
  function getCurrentUser() {
    return localStorage.getItem("loggedInUser");
  }

  //هر کاربر، سبد درخواست‌های جداگانه خودش رو داره
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

  // نمایش نوتیف
  let toastTimeout = null;
  function showToast(message, type = "success") {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.className = `toast-notification show ${type}`;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove("show");
    }, 2800);
  }

  // به‌روزرسانی شمارنده کنار «درخواست‌های من»
  function updateRequestsBadge() {
    if (!requestsBadge) return;
    const count = getLoanRequests().length;
    if (count > 0) {
      requestsBadge.textContent = count;
      requestsBadge.style.display = "inline-flex";
    } else {
      requestsBadge.style.display = "none";
    }
  }

  // ساخت HTML یک کارت درخواست
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
          <span>مدت بازپرداخت: <strong>${req.months} ماه</strong></span>
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

  // رندر کردن لیست درخواست‌ها داخل مودال
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

  // افزودن یک درخواست جدید وام
  function addLoanRequest() {
    const amount = parseInt(loanRange.value, 10) || 0;
    const monthly = parseInt(
      (monthlyDisplay.textContent || "0").replace(/,/g, ""),
      10,
    );

    const newRequest = {
      id: Date.now().toString(),
      amount,
      months,
      monthly,
      status: "در حال بررسی",
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
    showToast("درخواست وام شما با موفقیت ثبت شد ✅");
  }

  // حذف یک درخواست از سبد
  function removeLoanRequest(id) {
    const requests = getLoanRequests().filter((r) => r.id !== id);
    saveLoanRequests(requests);
    updateRequestsBadge();
    renderRequestsList();
    showToast("درخواست موردنظر حذف شد", "error");
  }

  // کلیک روی دکمه «درخواست وام» در سکشن ۵
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

  // باز کردن مودال «درخواست‌های من»
  if (myRequestsBtn && myRequestsModal) {
    myRequestsBtn.addEventListener("click", () => {
      if (dropdownMenu) dropdownMenu.classList.remove("show");
      if (userProfileDropdown) userProfileDropdown.classList.remove("active");
      renderRequestsList();
      myRequestsModal.classList.add("active");
    });
  }

  // بستن مودال «درخواست‌های من»
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

  // حذف درخواست با کلیک روی دکمه «انصراف»
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
  // ۷. ویجت چت پشتیبانی آنلاین
  // ==========================================
  const chatToggleBtn = document.getElementById("chatToggleBtn");
  const chatWidget = document.getElementById("chatWidget");
  const chatCloseBtn = document.getElementById("chatCloseBtn");

  if (chatToggleBtn && chatWidget && chatCloseBtn) {
    chatToggleBtn.addEventListener("click", () => {
      chatWidget.classList.toggle("active");
    });

    chatCloseBtn.addEventListener("click", () => {
      chatWidget.classList.remove("active");
    });

    document.addEventListener("click", (e) => {
      if (!chatWidget.contains(e.target) && !chatToggleBtn.contains(e.target)) {
        chatWidget.classList.remove("active");
      }
    });
  }
});
