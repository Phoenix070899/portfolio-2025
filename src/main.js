const scrollTopBtn = document.getElementById("btnScrollUp");
const openMenuBtn = document.getElementById("openMenuBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const mobileMenu = document.getElementById("mobile-menu");
openMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.replace("translate-x-full", "translate-x-0");
});
closeMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.replace("translate-x-0", "translate-x-full");
});

// function handleClickWorkHeader() {
//   const tabHeaders = document.querySelectorAll("#works-tab .header");
//   const tabContents = document.querySelectorAll("#works-tab .content");

//   if (tabHeaders && tabContents) {
//     tabHeaders.forEach((header, index) => {
//       header.addEventListener("click", () => {
//         tabHeaders.forEach((header) => header.classList.remove("active"));
//         header.classList.add("active");

//         tabContents.forEach((content) => {
//           content.classList.remove("block");
//           content.classList.add("hidden");
//         });

//         tabContents[index].classList.replace("hidden", "block");
//       });
//     });
//   }
// }

const SCROLL_TOP_THRESHOLD = 20;

const handleManipulateSwiper = () => {
  const tabHeaders = document.querySelectorAll("#works-tab .header");
  const swiper = document.querySelector(".works-swiper").swiper;

  if (tabHeaders) {
    tabHeaders.forEach((header, index) => {
      header.addEventListener("click", () => {
        tabHeaders.forEach((header) => header.classList.remove("active"));
        header.classList.add("active");
        swiper.slideTo(index);
      });
    });
  }

  swiper.on("slideChange", (swiper) => {
    tabHeaders.forEach((header) => header.classList.remove("active"));
    tabHeaders[swiper.activeIndex].classList.add("active");
  });
};

const handleScrollBtns = () => {
  const scrollBtns = document.querySelectorAll(".header-button");

  scrollBtns.forEach((el) => {
    const id = el.getAttribute("data-id");
    const target = document.getElementById(id);

    el.addEventListener("click", () => {
      target?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      mobileMenu.classList.replace("translate-x-0", "translate-x-full");
    });
  });
};

const handleScrollToTop = () => {
  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

const handleToggleScrollBtn = () => {
  if (window.scrollY > SCROLL_TOP_THRESHOLD) {
    // scrollTopBtn?.classList.remove("animate__fadeOutDown");
    scrollTopBtn?.classList.remove("hidden");
    // scrollTopBtn?.classList.add("animate__fadeInUp");
  } else {
    scrollTopBtn?.classList.add("hidden");
  }
};

// Get the progress path element
const progressPath = document.querySelector(".progress-circle path");
const pathLength = progressPath?.getTotalLength() || 308; // Use your stroke-dasharray value as fallback

// Set initial state
if (progressPath) {
  progressPath.style.strokeDasharray = pathLength;
  progressPath.style.strokeDashoffset = pathLength; // Start with no progress
}

let isAnimating = false;

window.addEventListener("scroll", function () {
  // Calculate scroll progress (0 to 1)
  const scrollTop = window.scrollY;
  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = Math.min(scrollTop / documentHeight, 1);

  // Update progress circle
  if (progressPath) {
    const offset = pathLength - pathLength * scrollProgress;
    progressPath.style.strokeDashoffset = offset;
  }

  // Handle button visibility (your existing logic with improvements)
  if (scrollTop > SCROLL_TOP_THRESHOLD) {
    if (scrollTopBtn?.classList.contains("hidden")) {
      // isAnimating = true;
      scrollTopBtn.classList.remove("hidden");
      // scrollTopBtn.dataset["data-aos"] = "fade-down";
      // scrollTopBtn.classList.add("animate__fadeInUp");

      // scrollTopBtn.addEventListener("animationend", function resetShow() {
      //   isAnimating = false;
      //   scrollTopBtn.removeEventListener("animationend", resetShow);
      // });
    }
  } else {
    if (!scrollTopBtn?.classList.contains("hidden")) {
      // isAnimating = true;
      // scrollTopBtn.classList.remove("animate__fadeInUp");
      // scrollTopBtn.classList.add("animate__fadeOutDown");

      scrollTopBtn.classList.add("hidden");
      // scrollTopBtn.addEventListener("animationend", function resetHide() {
      //   isAnimating = false;
      //   scrollTopBtn.classList.remove("animate__fadeOutDown");
      //   scrollTopBtn.removeEventListener("animationend", resetHide);
      // });
    }
  }
});

const handleSendMail = () => {
  const emailInput = document.getElementById("mailAddress"); // Adjust selector as needed
  const messageTextarea = document.getElementById("mailBody"); // Adjust selector as needed

  const userEmail = emailInput?.value.trim() || "";
  const userMessage = messageTextarea?.value.trim() || "";

  if (!userEmail || !userMessage) {
    // alert("Please fill in both email and message fields.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userEmail)) {
    // alert("Please enter a valid email address.");
    return;
  }

  // Create mailto URL
  const subject = encodeURIComponent("New Contact Form Message");
  const body = encodeURIComponent(`${userMessage}`);

  const mailtoUrl = `mailto:nguyentrungdung61@gmail.com?subject=${subject}&body=${body}`;

  // Open mail app
  try {
    // window.location.href = mailtoUrl;
    window.open("mailto:test@example.com?subject=subject&body=body");

    // Optional: Show success message
  } catch (error) {
    console.error("Error opening mail app:", error);
    // alert("Unable to open mail app. Please try again or contact us directly.");
  }
};

const sendButton = document.getElementById("mailSubmit"); // Adjust selector as needed
sendButton.addEventListener("click", () => {
  handleSendMail();
});

handleScrollBtns();
handleScrollToTop();
handleToggleScrollBtn();
handleManipulateSwiper();
