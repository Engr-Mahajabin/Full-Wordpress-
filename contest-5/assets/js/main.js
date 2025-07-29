document.addEventListener('DOMContentLoaded', function() {
    console.log('dom ready');

    function counter() {
        const counters = document.querySelectorAll('.counter');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = +el.getAttribute('data-count');
                    const suffix = el.getAttribute('data-suffix') || '';

                    const countUp = new window.countUp.CountUp(el, target, {
                        suffix: suffix
                    });

                    if (!countUp.error) {
                        countUp.start();
                    } else {
                        console.error(countUp.error);
                    }

                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.1
        });

        counters.forEach(el => observer.observe(el));
    }

    function loadCircleProgress() {
        const bars = document.querySelectorAll('.dextheme-progress');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const value = parseFloat(el.getAttribute('data-value')) || 0;

                    const bar = new ProgressBar.Circle(el, {
                        strokeWidth: 4,
                        trailWidth: 3,
                        trailColor: '#643e02',
                        easing: 'easeInOut',
                        duration: 1400,
                        text: {
                            autoStyleContainer: false
                        },
                        from: {
                            color: '#FF9C00',
                            width: 4
                        },
                        to: {
                            color: '#FF9C00',
                            width: 4
                        },
                        // Set default step function for all animate calls
                        step: function(state, circle) {
                            circle.path.setAttribute('stroke', state.color);
                            circle.path.setAttribute('stroke-width', state.width);

                            var value = Math.round(circle.value() * 100);
                            if (value === 0) {
                                circle.setText('');
                            } else {
                                circle.setText(value + '%');
                            }

                        }
                    });

                    bar.animate(value); // Number from 0.0 to 1.0

                    observer.unobserve(el)
                }
            });
        }, {
            threshold: 0.5
        });

        bars.forEach(bar => observer.observe(bar));
    }

    function loadLineProgress() {
        const containers = document.querySelectorAll('.progress-container');

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const container = entry.target;
                    const lineEl = container.querySelector('.progress-line');
                    const labelEl = container.querySelector('.progress-label');
                    const value = parseFloat(lineEl.getAttribute('data-value')) || 0;
                    const color = lineEl.getAttribute('data-color') || '#3498db';

                    const bar = new ProgressBar.Line(lineEl, {
                        strokeWidth: 2,
                        easing: 'easeInOut',
                        duration: 1400,
                        color: color,
                        trailColor: '#eee',
                        trailWidth: 2,
                        svgStyle: {
                            width: '100%',
                            height: '100%'
                        },
                        step: (state, bar) => {
                            const val = Math.round(bar.value() * 100) + '%';
                            labelEl.textContent = val;

                            const percent = bar.value();
                            const containerWidth = lineEl.offsetWidth;
                            const labelWidth = labelEl.offsetWidth;
                            let left = percent * containerWidth - labelWidth / 2;

                            if (left < 0) left = 0;
                            if (left + labelWidth > containerWidth) left = containerWidth - labelWidth;

                            labelEl.style.left = `${left}px`;
                        }
                    });

                    bar.animate(value);
                    obs.unobserve(container); // hanya jalankan sekali
                }
            });
        }, {
            threshold: 0.5
        }); // animasi dimulai saat 50% container terlihat

        containers.forEach(container => observer.observe(container));
    }

    function loadBackground() {
        const elements = document.querySelectorAll('[data-bg]');

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, observerInstance) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const bg = el.dataset.bg;
                        if (bg) {
                            el.style.backgroundImage = `url(${bg})`;
                            el.style.backgroundSize = 'cover'; // optional
                            el.style.backgroundPosition = 'center center'; // optional
                            el.style.backgroundRepeat = 'no-repeat';
                            observerInstance.unobserve(el); // stop observing setelah load
                        }
                    }
                });
            }, {
                rootMargin: '0px 0px 200px 0px', // mulai load sedikit sebelum elemen muncul
                threshold: 0.1
            });

            elements.forEach(el => observer.observe(el));
        } else {
            // Fallback untuk browser lama tanpa IntersectionObserver
            elements.forEach(el => {
                const bg = el.dataset.bg;
                if (bg) {
                    el.style.backgroundImage = `url(${bg})`;
                    el.style.backgroundSize = 'cover';
                    el.style.backgroundPosition = 'center center';
                    el.style.backgroundRepeat = 'no-repeat';
                }
            });
        }
    }

    function dexthemeAnimate() {
        const animateElements = document.querySelectorAll('.dextheme-animation');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const step = el.dataset.delayStep ? parseInt(el.dataset.delayStep) : 200;

                    setTimeout(() => {
                        const animationClass = entry.target.dataset.animate;
                        el.classList.add('animate__animated', animationClass, 'animated-visible');
                        observer.unobserve(el); // Optional, kalau animasi hanya mau sekali
                    }, index * step);
                }
            });
        }, {
            threshold: 0.1
        });

        animateElements.forEach(el => observer.observe(el));
    }

    function loadSwiperSlide() {
        const swipers = document.querySelectorAll("[data-swiper-active]");
        swipers.forEach(container => {
            const swiperElement = container.querySelector(".swiper");
            const options = container.getAttribute("data-swiper-options");

            // Parse JSON from data attribute or use default
            const swiperOptions = options ? JSON.parse(options) : {};

            // Set default options if not provided
            const defaultOptions = {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                navigation: {
                    nextEl: container.querySelector(".swiper-button-next"),
                    prevEl: container.querySelector(".swiper-button-prev"),
                },
                pagination: {
                    el: container.querySelector(".swiper-pagination"),
                    clickable: true,
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
            };

            // Merge custom options with defaults
            const finalOptions = {
                ...defaultOptions,
                ...swiperOptions,
            };

            // If navigation is disabled, remove buttons
            if (swiperOptions.navigation === false) {
                delete finalOptions.navigation;
            }

            // Initialize Swiper
            new Swiper(swiperElement, finalOptions);
        });
    }

    try {
        const swiper = new Swiper('.swiper', {
            effect: 'fade',
            loop: true,
            speed: 1500,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false,
            },
            fadeEffect: {
                crossFade: true,
            },
            on: {
                init: () => triggerKenBurns(),
                slideChangeTransitionStart: () => triggerKenBurns()
            }
        });

        const swiper2 = new Swiper('.swiper-anim', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            speed: 1500,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true, // memungkinkan klik pada dot untuk pindah slide
            },
            breakpoints: {
                320: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 3
                }
            }
        });
    } catch (error) {
        console.log(error)
    }

    function triggerKenBurns() {
        const activeSlide = document.querySelector('.swiper-slide-active .kenburns-slide');
        if (!activeSlide) return;
        activeSlide.classList.remove('animate');
        void activeSlide.offsetWidth;
        activeSlide.classList.add('animate');
    }

    function startCountdown(targetDate) {
        try {
            const updateCountdown = () => {
                const now = new Date().getTime();
                const distance = targetDate - now;

                if (distance <= 0) {
                    clearInterval(interval);
                    document.querySelectorAll('.countdown-item span').forEach(el => el.textContent = '00');
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById("days").textContent = days.toString().padStart(4, '0');
                document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
                document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
                document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
            };

            updateCountdown(); // initial call
            const interval = setInterval(updateCountdown, 1000);
        } catch (error) {
            console.log(error)
        }
    }

    function loadDrawerToggle() {
        try {
            const drawerToggle = document.querySelector('.navbar-toggler');
            const drawerMenu = document.querySelector('.dextheme-menu-drawer');
            const drawerBackdrop = document.getElementById('drawerBackdrop');

            function closeDrawer() {
                drawerMenu.classList.remove('active');
                drawerBackdrop.classList.remove('active');
            }

            drawerToggle.addEventListener('click', (e) => {
                e.stopPropagation(); // Mencegah menutup saat tombol diklik
                drawerMenu.classList.toggle('active');
                drawerBackdrop.classList.toggle('active');
            });

            drawerBackdrop.addEventListener('click', closeDrawer);

            // Menutup drawer saat klik di luar area drawer
            document.addEventListener('click', (e) => {
                if (!drawerMenu.contains(e.target) && !drawerToggle.contains(e.target)) {
                    closeDrawer();
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    function loadSwiperSlideBulk() {
        try {
            const swipers = document.querySelectorAll("[data-swiper-active]");
            swipers.forEach(container => {
                const swiperElement = container.querySelector(".dextheme-swiper");
                const options = {
                    slidesPerView: parseInt(container.getAttribute("data-swiper-slides-per-view")) || 1,
                    spaceBetween: parseInt(container.getAttribute("data-swiper-space-between")) || 20,
                    loop: container.getAttribute("data-swiper-loop") === "true",
                    autoplay: container.getAttribute("data-swiper-autoplay-delay") ?
                        {
                            delay: parseInt(container.getAttribute("data-swiper-autoplay-delay")),
                            disableOnInteraction: false,
                        } :
                        false,
                    navigation: container.getAttribute("data-swiper-navigation") === "false" ? false : {
                        nextEl: container.querySelector(".swiper-button-next"),
                        prevEl: container.querySelector(".swiper-button-prev"),
                    },
                    pagination: {
                        el: container.querySelector(".swiper-pagination"),
                        clickable: true,
                    },
                    breakpoints: JSON.parse(container.getAttribute("data-swiper-breakpoints") ||
                        '{"320": {"slidesPerView": 1}, "768": {"slidesPerView": 2}}'),
                };

                // Initialize Swiper
                new Swiper(swiperElement, options);
            });
        } catch (error) {
            console.log(error)
        }
    }

    counter();
    loadBackground();
    loadCircleProgress();
    loadLineProgress();
    dexthemeAnimate();
    loadSwiperSlide();
    loadSwiperSlideBulk()
    loadDrawerToggle();

    const countdownTargetDate = new Date("2040-01-01T00:00:00").getTime();
    startCountdown(countdownTargetDate);
});