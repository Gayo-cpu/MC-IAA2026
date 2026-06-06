const LOCAL_STORAGE_LOCALE_KEY = 'mc_locale';
const LOCAL_STORAGE_THEME_KEY = 'mc_theme';

const TRANSLATIONS = {
    en: {
        direction: 'ltr',
        nav: {
            brand: 'MCIAA Association',
            home: 'Home',
            about: 'About Us',
            programs: 'Programs',
            askImam: 'Ask Imam',
            news: 'News',
            donate: 'Donate',
            contact: 'Contact Us',
            login: 'Login',
            join: 'Join Us'
        },
        footer: '© 2026 Muslim Youth Association. All Rights Reserved.',
        pageTitle: {
            'index.html': 'MCIAA Association | Home',
            'home.html': 'MCIAA Association | Home',
            'about.html': 'MCIAA Association | About Us',
            'hifz.html': 'MCIAA Association | Hifz Program',
            'ask_imam.html': 'MCIAA Association | Ask Imam',
            'news.html': 'MCIAA Association | News',
            'donate.html': 'MCIAA Association | Donate',
            'contact.html': 'MCIAA Association | Contact Us',
            'login.html': 'MCIAA Association | Login',
            'register.html': 'MCIAA Association | Join Us',
            'admin.html': 'MCIAA Administration Center'
        },
        status: {
            online: 'You are online.',
            offline: 'You are offline. Some features may be unavailable.',
            themeLight: 'Light mode enabled.',
            themeDark: 'Dark mode enabled.',
            languageChanged: 'Language changed to English.'
        }
    },
    sw: {
        direction: 'ltr',
        nav: {
            home: 'Nyumbani',
            about: 'Kuhusu',
            programs: 'Programu',
            askImam: 'Muulize Imam',
            news: 'Habari',
            donate: 'Toa',
            contact: 'Wasiliana',
            login: 'Ingia',
            join: 'Jiunge'
        },
        footer: '© 2026 Chama cha Vijana wa Kiislamu. Haki Zote Zilihakikishwa.',
        pageTitle: {
            'index.html': 'MCIAA | Nyumbani',
            'home.html': 'MCIAA | Nyumbani',
            'about.html': 'MCIAA | Kuhusu',
            'hifz.html': 'MCIAA | Programu ya Hifz',
            'ask_imam.html': 'MCIAA | Muulize Imam',
            'news.html': 'MCIAA | Habari',
            'donate.html': 'MCIAA | Toa',
            'contact.html': 'MCIAA | Wasiliana',
            'login.html': 'MCIAA | Ingia',
            'register.html': 'MCIAA | Jiunge',
            'admin.html': 'Kituo cha Utawala cha MCIAA'
        },
        status: {
            online: 'Uko mtandaoni.',
            offline: 'Uko offline. Sehemu baadhi zinaweza zisifanye kazi.',
            themeLight: 'Mode ya mwanga imewashwa.',
            themeDark: 'Mode ya giza imewashwa.',
            languageChanged: 'Lugha imebadilishwa kuwa Kiswahili.'
        }
    },
    ar: {
        direction: 'rtl',
        nav: {
            home: 'الرئيسية',
            about: 'من نحن',
            programs: 'البرامج',
            askImam: 'اسأل إمام',
            news: 'الأخبار',
            donate: 'تبرع',
            contact: 'اتصل بنا',
            login: 'تسجيل الدخول',
            join: 'انضم إلينا'
        },
        footer: '© 2026 جمعية الشباب المسلم. جميع الحقوق محفوظة.',
        pageTitle: {
            'index.html': 'MCIAA | الرئيسية',
            'home.html': 'MCIAA | الرئيسية',
            'about.html': 'MCIAA | من نحن',
            'hifz.html': 'MCIAA | برنامج الحفظ',
            'ask_imam.html': 'MCIAA | اسأل إمام',
            'news.html': 'MCIAA | الأخبار',
            'donate.html': 'MCIAA | تبرع',
            'contact.html': 'MCIAA | اتصل بنا',
            'login.html': 'MCIAA | تسجيل الدخول',
            'register.html': 'MCIAA | انضم إلينا',
            'admin.html': 'مركز إدارة MCIAA'
        },
        status: {
            online: 'أنت متصل بالإنترنت.',
            offline: 'أنت غير متصل. قد لا تعمل بعض الميزات.',
            themeLight: 'تم تفعيل الوضع الفاتح.',
            themeDark: 'تم تفعيل الوضع الداكن.',
            languageChanged: 'تم تغيير اللغة إلى العربية.'
        }
    }
};

function getSavedLocale() {
    return localStorage.getItem(LOCAL_STORAGE_LOCALE_KEY) || getBrowserLocale();
}

function getBrowserLocale() {
    const language = navigator.language || navigator.userLanguage || 'en';
    if (language.startsWith('sw')) return 'sw';
    if (language.startsWith('ar')) return 'ar';
    return 'en';
}

function getSavedTheme() {
    return localStorage.getItem(LOCAL_STORAGE_THEME_KEY) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function translatePage(locale) {
    const translations = TRANSLATIONS[locale] || TRANSLATIONS.en;
    document.documentElement.lang = locale;
    document.documentElement.dir = translations.direction;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const lookup = key.split('.').reduce((obj, next) => obj?.[next], translations);
        if (lookup !== undefined) {
            element.textContent = lookup;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.dataset.i18nPlaceholder;
        const lookup = key.split('.').reduce((obj, next) => obj?.[next], translations);
        if (lookup !== undefined) {
            element.placeholder = lookup;
        }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.dataset.i18nTitle;
        const lookup = key.split('.').reduce((obj, next) => obj?.[next], translations);
        if (lookup !== undefined) {
            element.title = lookup;
        }
    });

    const footer = document.querySelector('.main-footer p');
    if (footer) {
        footer.textContent = translations.footer;
    }

    const pageFile = window.location.pathname.split('/').pop();
    const titleText = translations.pageTitle?.[pageFile];
    if (titleText) {
        document.title = titleText;
    }

    const navLogin = document.querySelector('.nav-auth .login-link');
    const navJoin = document.querySelector('.nav-auth .cta-btn');
    if (navLogin) navLogin.textContent = translations.nav.login;
    if (navJoin) navJoin.textContent = translations.nav.join;

    const localeSelect = document.getElementById('languageSelect');
    if (localeSelect) {
        localeSelect.value = locale;
    }

    announceStatus(translations.status.languageChanged);
}

function setLocale(locale) {
    const normalized = TRANSLATIONS[locale] ? locale : 'en';
    localStorage.setItem(LOCAL_STORAGE_LOCALE_KEY, normalized);
    translatePage(normalized);
}

function updateTheme(theme) {
    const body = document.body;
    const isDark = theme === 'dark';
    body.classList.toggle('dark-mode', isDark);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    const translations = TRANSLATIONS[getSavedLocale()];
    announceStatus(isDark ? translations.status.themeDark : translations.status.themeLight);
}

function initLanguageSwitcher() {
    const select = document.getElementById('languageSelect');
    if (!select) return;
    select.addEventListener('change', (event) => setLocale(event.target.value));
    setLocale(getSavedLocale());
}

function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        updateTheme(nextTheme);
    });
    updateTheme(getSavedTheme());
}

function initActiveNav() {
    const currentFile = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const target = href.split('/').pop();
        link.classList.toggle('active', target === currentFile || (currentFile === '' && target === 'index.html'));
    });
}

function initOfflineBanner() {
    const banner = document.createElement('div');
    banner.className = 'offline-banner';
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-atomic', 'true');
    document.body.appendChild(banner);

    const updateNetworkStatus = () => {
        const locale = getSavedLocale();
        const translation = TRANSLATIONS[locale];
        banner.textContent = navigator.onLine ? translation.status.online : translation.status.offline;
        banner.classList.toggle('offline', !navigator.onLine);
        banner.classList.toggle('online', navigator.onLine);
        banner.style.transform = 'translateY(0)';
        setTimeout(() => banner.style.transform = 'translateY(-110%)', 4500);
    };

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    updateNetworkStatus();
}

function initScrollTop() {
    const button = document.createElement('button');
    button.id = 'scrollTopBtn';
    button.className = 'scroll-top-btn';
    button.type = 'button';
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    button.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(button);

    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => {
        button.classList.toggle('visible', window.scrollY > 320);
    });
}

function announceStatus(message) {
    let live = document.getElementById('statusLiveRegion');
    if (!live) {
        live = document.createElement('div');
        live.id = 'statusLiveRegion';
        live.className = 'sr-only';
        live.setAttribute('aria-live', 'polite');
        live.setAttribute('aria-atomic', 'true');
        document.body.appendChild(live);
    }
    live.textContent = message;
}

function initCommonPage() {
    initLanguageSwitcher();
    initThemeToggle();
    initActiveNav();
    initOfflineBanner();
    initScrollTop();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommonPage);
} else {
    initCommonPage();
}
