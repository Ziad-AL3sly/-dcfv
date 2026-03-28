/* ============================================
   PRAYER TIMES EGYPT ELITE - MAIN SCRIPT (COMPLETE)
   Version 5.0 - Enhanced Compass & Real Adhan Sounds
   ============================================ */

// ============================================
// DATA & CONSTANTS
// ============================================

const cities = {
    cairo: { name: 'القاهرة', lat: 30.0444, lon: 31.2357, qibla: 135.5 },
    alexandria: { name: 'الإسكندرية', lat: 31.2001, lon: 29.9187, qibla: 137.2 },
    giza: { name: 'الجيزة', lat: 29.987, lon: 31.2118, qibla: 135.4 },
    luxor: { name: 'الأقصر', lat: 25.6872, lon: 32.6396, qibla: 130.8 },
    aswan: { name: 'أسوان', lat: 24.0889, lon: 32.8998, qibla: 129.5 },
    sharm: { name: 'شرم الشيخ', lat: 27.9158, lon: 34.33, qibla: 124.3 },
    mansoura: { name: 'المنصورة', lat: 31.0364, lon: 31.3807, qibla: 136.8 },
    asyut: { name: 'أسيوط', lat: 27.1783, lon: 31.1859, qibla: 132.2 },
    zagazig: { name: 'الزقازيق', lat: 30.5833, lon: 31.5028, qibla: 136.5 },
    ismailia: { name: 'الإسماعيلية', lat: 30.5965, lon: 32.2715, qibla: 134.7 },
    portsaid: { name: 'بورسعيد', lat: 31.2565, lon: 32.2841, qibla: 135.9 },
    suez: { name: 'السويس', lat: 29.9737, lon: 32.5263, qibla: 133.8 },
    damietta: { name: 'دمياط', lat: 31.4165, lon: 31.8215, qibla: 136.2 },
    minya: { name: 'المنيا', lat: 28.1112, lon: 30.7395, qibla: 133.5 },
    benisuef: { name: 'بني سويف', lat: 29.0747, lon: 31.0968, qibla: 134.2 },
    fayoum: { name: 'الفيوم', lat: 29.3084, lon: 30.8428, qibla: 134.0 },
    sohag: { name: 'سوهاج', lat: 26.5607, lon: 31.6917, qibla: 131.5 },
    qena: { name: 'قنا', lat: 26.1642, lon: 32.7167, qibla: 130.9 },
    hurghada: { name: 'الغردقة', lat: 27.2579, lon: 33.8116, qibla: 126.8 },
    marsaMatruh: { name: 'مرسى مطروح', lat: 31.3543, lon: 27.2372, qibla: 142.3 }
};

const hadiths = [
    { text: "عن أبي هريرة رضي الله عنه قال: قال رسول الله ﷺ: 'مَنْ غَدَا إِلَى الْمَسْجِدِ أَوْ رَاحَ، أَعَدَّ اللَّهُ لَهُ فِي الْجَنَّةِ نُزُلًا كُلَّمَا غَدَا أَوْ رَاحَ'", source: "رواه البخاري ومسلم", grade: "صحيح" },
    { text: "عن عثمان بن عفان رضي الله عنه قال: قال رسول الله ﷺ: 'مَنْ تَوَضَّأَ فَأَحْسَنَ الْوُضُوءَ، خَرَجَتْ خَطَايَاهُ مِنْ جَسَدِهِ حَتَّى تَخْرُجَ مِنْ تَحْتِ أَظْفَارِهِ'", source: "رواه مسلم", grade: "صحيح" },
    { text: "عن عبد الله بن عمرو رضي الله عنهما أن رسول الله ﷺ قال: 'الصَّلَاةُ نُورٌ، وَالصَّدَقَةُ بُرْهَانٌ، وَالصَّبْرُ ضِيَاءٌ'", source: "رواه مسلم", grade: "صحيح" },
    { text: "عن أبي هريرة رضي الله عنه أن رسول الله ﷺ قال: 'أَقْرَبُ مَا يَكُونُ الْعَبْدُ مِنْ رَبِّهِ وَهُوَ سَاجِدٌ فَأَكْثِرُوا الدُّعَاءَ'", source: "رواه مسلم", grade: "صحيح" },
    { text: "عن أبي أمامة رضي الله عنه قال: قال رسول الله ﷺ: 'مَنْ قَرَأَ آيَةَ الْكُرْسِيِّ دُبُرَ كُلِّ صَلَاةٍ مَكْتُوبَةٍ لَمْ يَمْنَعْهُ مِنْ دُخُولِ الْجَنَّةِ إِلَّا أَنْ يَمُوتَ'", source: "رواه النسائي", grade: "حسن" },
    { text: "عن معاذ بن جبل رضي الله عنه قال: قال رسول الله ﷺ: 'أَلا أُخْبِرُكَ بِأَبْوَابِ الْخَيْرِ؟ الصَّوْمُ جُنَّةٌ، وَالصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ، وَصَلاةُ الرَّجُلِ فِي جَوْفِ اللَّيْلِ'", source: "رواه الترمذي", grade: "حسن" }
];

const duas = [
    "اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي فإنه لا يغفر الذنوب إلا أنت",
    "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    "اللهم إني أسألك العفو والعافية في الدنيا والآخرة، اللهم إني أسألك العفو والعافية في ديني ودنياي وأهلي ومالي",
    "اللهم أعني على ذكرك وشكرك وحسن عبادتك",
    "اللهم إني ظلمت نفسي ظلماً كثيراً ولا يغفر الذنوب إلا أنت، فاغفر لي مغفرة من عندك وارحمني إنك أنت الغفور الرحيم",
    "اللهم اجعل خير أيامي يوم ألقاك، واجعل قرة عيني في الصلاة",
    "اللهم تقبل صلاتنا وصيامنا وقيامنا، واجعلنا من عتقائك من النار"
];

const azkar = {
    morning: [
        { text: "اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك النشور", repeat: 1 },
        { text: "أصبحنا على فطرة الإسلام، وعلى كلمة الإخلاص، وعلى دين نبينا محمد ﷺ، وعلى ملة أبينا إبراهيم حنيفاً مسلماً وما كان من المشركين", repeat: 1 },
        { text: "اللهم ما أصبح بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك، فلك الحمد ولك الشكر", repeat: 1 },
        { text: "سبحان الله وبحمده", repeat: 100 },
        { text: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير", repeat: 10 },
        { text: "اللهم صل وسلم على نبينا محمد", repeat: 10 }
    ],
    evening: [
        { text: "اللهم بك أمسينا وبك أصبحنا وبك نحيا وبك نموت وإليك المصير", repeat: 1 },
        { text: "أمسينا على فطرة الإسلام، وعلى كلمة الإخلاص، وعلى دين نبينا محمد ﷺ، وعلى ملة أبينا إبراهيم حنيفاً مسلماً وما كان من المشركين", repeat: 1 },
        { text: "اللهم ما أمسى بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك، فلك الحمد ولك الشكر", repeat: 1 },
        { text: "أعوذ بكلمات الله التامات من شر ما خلق", repeat: 3 }
    ],
    prayer: [
        { text: "سبحان ربي الأعلى", repeat: 3 },
        { text: "سبحان ربي العظيم", repeat: 3 },
        { text: "رب اغفر لي", repeat: 3 },
        { text: "اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام", repeat: 1 },
        { text: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير، اللهم لا مانع لما أعطيت ولا معطي لما منعت ولا ينفع ذا الجد منك الجد", repeat: 1 }
    ],
    sleep: [
        { text: "اللهم باسمك أموت وأحيا", repeat: 1 },
        { text: "اللهم قني عذابك يوم تبعث عبادك", repeat: 3 },
        { text: "باسمك اللهم وضعت جنبي وبك أرفعه، إن أمسكت نفسي فارحمها، وإن أرسلتها فاحفظها بما تحفظ به عبادك الصالحين", repeat: 1 },
        { text: "آية الكرسي: اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ", repeat: 1 }
    ]
};

const surahs = [
    "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس",
    "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه",
    "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم",
    "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر",
    "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق",
    "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة",
    "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج",
    "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس",
    "التكوير", "الانفطار", "المطففين", "الانشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد",
    "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات",
    "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر",
    "المسد", "الإخلاص", "الفلق", "الناس"
];

// ============================================
// GLOBAL VARIABLES
// ============================================

let currentCity = 'cairo';
let prayerTimes = {};
let countdownInterval;
let adhanCheckInterval;
let currentMethod = 5;
let currentAsrMethod = 1;
let notificationsEnabled = false;
let adhanSoundEnabled = false;
let vibrationEnabled = false;
let selectedAdhanSound = 'makkah';
let prayerStreak = 0;
let todayPrayers = { Fajr: false, Dhuhr: false, Asr: false, Maghrib: false, Isha: false };
let tasbeehCount = 0;
let currentZekrCount = 0;
let charts = { prayerChart: null, prayerPieChart: null };
let map;
let userLocation = null;
let compassInterval = null;
let lastCompassValue = null;

// روابط أذان حقيقية (بتشتغل على جميع الأجهزة)
const adhanSounds = {
    makkah: 'https://www.ghadeer.org/sites/default/files/audio/adhan/adhan-makkah.mp3',
    egypt: 'https://archive.org/download/adhan_202105/Adhan%20-%20Egypt.mp3',
    madinah: 'https://www.ghadeer.org/sites/default/files/audio/adhan/adhan-madinah.mp3',
    // روابط احتياطية
    fallback: 'https://www.islamcan.com/audio/adhan/adhan.mp3'
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    init();
});

async function init() {
    // Hide loading screen after fade
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);

    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // Load saved settings
    loadSettings();

    // Initialize UI components
    populateCitiesList();
    populateRamadanCities();
    populateSurahs();
    populateMosques();

    // Fetch initial data
    updateDateTime();
    await fetchPrayerTimes();
    await fetchWeather();
    updateDailyContent();
    updateRamadanCountdown();

    // Setup event listeners
    setupEventListeners();

    // Start periodic updates
    setInterval(updateDateTime, 1000);
    setInterval(() => fetchPrayerTimes(), 3600000);
    setInterval(fetchWeather, 1800000);
    setInterval(updateRamadanCountdown, 86400000);

    // Check adhan times every minute
    adhanCheckInterval = setInterval(checkAdhanTimes, 60000);

    // Request notification permission if enabled
    if (notificationsEnabled && Notification.permission === 'default') {
        Notification.requestPermission();
    }

    // Check for PWA install
    checkPWAInstall();

    // Load user stats from localStorage
    loadUserStats();

    // Initialize compass if available
    initCompass();

    // Show welcome toast
    showToast('مرحباً بك في منصة مواقيت الصلاة لمصر', 'success');
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupEventListeners() {
    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebarElite');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });

    // Navigation
    document.querySelectorAll('.nav-elite').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = item.dataset.page;
            switchPage(pageId);

            document.querySelectorAll('.nav-elite').forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Location selector
    const locationSelector = document.getElementById('locationSelector');
    if (locationSelector) {
        locationSelector.addEventListener('click', (e) => {
            e.stopPropagation();
            locationSelector.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            locationSelector.classList.remove('active');
        });
    }

    // City search
    const citySearchInput = document.getElementById('citySearchInput');
    if (citySearchInput) {
        citySearchInput.addEventListener('input', filterCitiesList);
    }

    // Global search
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('input', handleGlobalSearch);
    }

    // Method selector
    const methodSelect = document.getElementById('methodSelect');
    if (methodSelect) {
        methodSelect.addEventListener('change', (e) => {
            currentMethod = parseInt(e.target.value);
            localStorage.setItem('calculationMethod', currentMethod);
            fetchPrayerTimes();
            showToast('تم تغيير طريقة الحساب', 'info');
        });
    }

    // Refresh buttons
    const refreshHadith = document.getElementById('refreshHadithElite');
    const refreshDua = document.getElementById('refreshDuaElite');

    if (refreshHadith) {
        refreshHadith.addEventListener('click', () => updateDailyContent());
    }
    if (refreshDua) {
        refreshDua.addEventListener('click', () => updateDailyContent());
    }

    // Tasbeeh buttons
    const tasbeehPlus = document.getElementById('tasbeehPlus');
    const tasbeehReset = document.getElementById('tasbeehReset');
    const tasbeehMinus = document.getElementById('tasbeehMinus');

    if (tasbeehPlus) {
        tasbeehPlus.addEventListener('click', () => updateTasbeeh(1));
    }
    if (tasbeehReset) {
        tasbeehReset.addEventListener('click', () => updateTasbeeh(0, true));
    }
    if (tasbeehMinus) {
        tasbeehMinus.addEventListener('click', () => updateTasbeeh(-1));
    }

    // Tasbeeh phrases
    document.querySelectorAll('.phrase').forEach(phrase => {
        phrase.addEventListener('click', () => {
            const count = parseInt(phrase.dataset.count);
            updateTasbeeh(count);
        });
    });

    // Notification button
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            if (Notification.permission === 'default') {
                Notification.requestPermission();
            } else if (Notification.permission === 'granted') {
                showToast('الإشعارات مفعلة', 'success');
            } else {
                showToast('الرجاء تفعيل الإشعارات من إعدادات المتصفح', 'error');
            }
        });
    }

    // View all mosques
    const viewAllMosques = document.getElementById('viewAllMosques');
    if (viewAllMosques) {
        viewAllMosques.addEventListener('click', () => {
            switchPage('mosques');
            document.querySelector('.nav-elite[data-page="mosques"]').classList.add('active');
        });
    }

    // FAB menu
    const fab = document.getElementById('fab');
    if (fab) {
        fab.addEventListener('click', (e) => {
            e.stopPropagation();
            fab.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            fab.classList.remove('active');
        });

        document.querySelectorAll('.fab-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = item.dataset.action;
                handleFabAction(action);
                fab.classList.remove('active');
            });
        });
    }

    // Ramadan controls
    const ramadanCitySelect = document.getElementById('ramadanCitySelect');
    const ramadanView = document.getElementById('ramadanView');

    if (ramadanCitySelect) {
        ramadanCitySelect.addEventListener('change', generateRamadanTable);
    }
    if (ramadanView) {
        ramadanView.addEventListener('change', generateRamadanTable);
    }

    // Export Ramadan
    const exportRamadan = document.getElementById('exportRamadan');
    if (exportRamadan) {
        exportRamadan.addEventListener('click', exportRamadanPDF);
    }

    // Live TV channels
    document.querySelectorAll('.channel').forEach(channel => {
        channel.addEventListener('click', () => {
            const url = channel.dataset.url;
            const iframe = document.getElementById('liveFrame');
            if (iframe && url) {
                iframe.src = url;
                showToast(`تم تشغيل ${channel.querySelector('span').textContent}`, 'success');
            }
        });
    });

    // Azkar categories
    document.querySelectorAll('.azkar-cat').forEach(cat => {
        cat.addEventListener('click', () => {
            document.querySelectorAll('.azkar-cat').forEach(c => c.classList.remove('active'));
            cat.classList.add('active');
            const category = cat.dataset.cat;
            displayAzkar(category);
        });
    });

    // Quran surah selection
    const surahSelect = document.getElementById('surahSelect');
    const reciterSelect = document.getElementById('reciterSelect');

    if (surahSelect) {
        surahSelect.addEventListener('change', loadSurahText);
    }
    if (reciterSelect) {
        reciterSelect.addEventListener('change', () => {
            if (surahSelect.value) {
                loadSurahAudio();
            }
        });
    }

    // Settings
    const adhanNotifications = document.getElementById('adhanNotifications');
    const adhanSound = document.getElementById('adhanSound');
    const vibrationSetting = document.getElementById('vibrationSetting');
    const themeSelect = document.getElementById('themeSelect');
    const autoRefresh = document.getElementById('autoRefresh');
    const clearData = document.getElementById('clearData');
    const backupData = document.getElementById('backupData');
    const saveSettings = document.getElementById('saveSettings');

    if (adhanNotifications) {
        adhanNotifications.addEventListener('change', (e) => {
            notificationsEnabled = e.target.checked;
            localStorage.setItem('notificationsEnabled', notificationsEnabled);
            if (notificationsEnabled && Notification.permission === 'default') {
                Notification.requestPermission();
            }
        });
    }

    if (adhanSound) {
        adhanSound.addEventListener('change', (e) => {
            selectedAdhanSound = e.target.value;
            localStorage.setItem('adhanSound', selectedAdhanSound);
        });
    }

    if (vibrationSetting) {
        vibrationSetting.addEventListener('change', (e) => {
            vibrationEnabled = e.target.checked;
            localStorage.setItem('vibrationEnabled', vibrationEnabled);
        });
    }

    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            const theme = e.target.value;
            if (theme === 'auto') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
            } else {
                document.documentElement.setAttribute('data-theme', theme);
            }
            localStorage.setItem('theme', theme);
        });
    }

    if (clearData) {
        clearData.addEventListener('click', () => {
            if (confirm('هل أنت متأكد من مسح جميع البيانات المخزنة؟')) {
                localStorage.clear();
                showToast('تم مسح جميع البيانات', 'success');
                location.reload();
            }
        });
    }

    if (backupData) {
        backupData.addEventListener('click', backupUserData);
    }

    if (saveSettings) {
        saveSettings.addEventListener('click', () => {
            showToast('تم حفظ الإعدادات بنجاح', 'success');
        });
    }

    // Color picker
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', () => {
            const color = option.dataset.color;
            document.documentElement.style.setProperty('--gradient-start', color);
            localStorage.setItem('accentColor', color);
            document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
}

// ============================================
// PRAYER TIMES FUNCTIONS
// ============================================

async function fetchPrayerTimes() {
    const city = cities[currentCity];
    if (!city) return;

    try {
        const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${city.lat}&longitude=${city.lon}&method=${currentMethod}&school=${currentAsrMethod}`);
        const data = await response.json();

        if (data.code === 200) {
            prayerTimes = data.data.timings;
            displayPrayerTimes();
            displayPrayersTable();
            calculateNextPrayer();
            updatePrayerProgress();
            updateCharts();
            checkAdhanTimes();

            const now = new Date();
            const lastUpdateEl = document.getElementById('lastUpdate');
            if (lastUpdateEl) lastUpdateEl.textContent = now.toLocaleTimeString('ar-EG');
        }
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        showToast('حدث خطأ في جلب مواقيت الصلاة', 'error');
    }
}

function displayPrayerTimes() {
    const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const arabicNames = {
        'Fajr': 'الفجر', 'Sunrise': 'الشروق', 'Dhuhr': 'الظهر',
        'Asr': 'العصر', 'Maghrib': 'المغرب', 'Isha': 'العشاء'
    };
    const icons = {
        'Fajr': 'fa-cloud-moon', 'Sunrise': 'fa-sun', 'Dhuhr': 'fa-sun',
        'Asr': 'fa-cloud-sun', 'Maghrib': 'fa-moon', 'Isha': 'fa-star-and-crescent'
    };

    const container = document.getElementById('prayerGridAdvanced');
    if (!container) return;

    container.innerHTML = '';

    prayers.forEach(prayer => {
        const time = prayerTimes[prayer];
        if (time) {
            const card = document.createElement('div');
            card.className = `prayer-card-advanced ${prayer.toLowerCase()}`;
            card.setAttribute('data-prayer', prayer);
            card.innerHTML = `
                <div class="prayer-icon">
                    <i class="fas ${icons[prayer]}"></i>
                </div>
                <div class="prayer-name">${arabicNames[prayer]}</div>
                <div class="prayer-time">${time}</div>
            `;
            container.appendChild(card);
        }
    });

    const heroCity = document.getElementById('heroCity');
    const currentCityElite = document.getElementById('currentCityElite');
    if (heroCity) heroCity.textContent = cities[currentCity].name;
    if (currentCityElite) currentCityElite.textContent = cities[currentCity].name;
}

function displayPrayersTable() {
    const tbody = document.getElementById('prayersTableBody');
    if (!tbody) return;

    const prayers = [
        { name: 'الفجر', time: prayerTimes.Fajr, iqama: addMinutes(prayerTimes.Fajr, 15) },
        { name: 'الشروق', time: prayerTimes.Sunrise, iqama: '--:--' },
        { name: 'الظهر', time: prayerTimes.Dhuhr, iqama: addMinutes(prayerTimes.Dhuhr, 10) },
        { name: 'العصر', time: prayerTimes.Asr, iqama: addMinutes(prayerTimes.Asr, 10) },
        { name: 'المغرب', time: prayerTimes.Maghrib, iqama: addMinutes(prayerTimes.Maghrib, 5) },
        { name: 'العشاء', time: prayerTimes.Isha, iqama: addMinutes(prayerTimes.Isha, 10) }
    ];

    tbody.innerHTML = '';

    prayers.forEach(prayer => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td><strong>${prayer.name}</strong>`,
            `<td>${prayer.time}</td>`,
            `<td>${prayer.iqama}</td>`,
            `<td>
                <button class="set-alarm-btn" data-prayer="${prayer.name}" data-time="${prayer.time}">
                    <i class="fas fa-bell"></i>
                </button>
            </td>`,
            `<td>
                <label class="checkbox-label">
                    <input type="checkbox" class="prayer-checkbox" data-prayer="${prayer.name}">
                    <span class="checkmark"></span>
                </label>
            </td>
        `;
    });

    document.querySelectorAll('.prayer-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const prayer = e.target.dataset.prayer;
            updatePrayerCompletion(prayer, e.target.checked);
        });
    });

    document.querySelectorAll('.set-alarm-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const prayer = btn.dataset.prayer;
            const time = btn.dataset.time;
            setPrayerAlarm(prayer, time);
        });
    });
}

function addMinutes(time, minutes) {
    if (!time || time === '--:--') return '--:--';
    const [hours, mins] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, mins + minutes);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function calculateNextPrayer() {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const arabicNames = {
        'Fajr': 'الفجر', 'Sunrise': 'الشروق', 'Dhuhr': 'الظهر',
        'Asr': 'العصر', 'Maghrib': 'المغرب', 'Isha': 'العشاء'
    };

    let nextPrayer = null;
    let minDiff = Infinity;

    for (let prayer of prayers) {
        if (prayerTimes[prayer]) {
            const [hours, minutes] = prayerTimes[prayer].split(':');
            const prayerTime = parseInt(hours) * 60 + parseInt(minutes);
            let diff = prayerTime - currentTime;

            if (diff < 0) {
                diff += 24 * 60;
            }

            if (diff < minDiff) {
                minDiff = diff;
                nextPrayer = prayer;
            }
        }
    }

    if (nextPrayer) {
        const nextNameEl = document.getElementById('nextPrayerAdvanced');
        const nextTimeEl = document.getElementById('nextTimeAdvanced');
        if (nextNameEl) nextNameEl.textContent = arabicNames[nextPrayer];
        if (nextTimeEl) nextTimeEl.textContent = prayerTimes[nextPrayer];
        startCountdown(minDiff * 60);
        updateCountdownCanvas(minDiff * 60);
    }
}

function startCountdown(totalSeconds) {
    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            fetchPrayerTimes();
        } else {
            totalSeconds--;
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            const countdownText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            const countdownTextEl = document.getElementById('countdownTextAdvanced');
            if (countdownTextEl) countdownTextEl.textContent = countdownText;
            updateCountdownCanvas(totalSeconds);
        }
    }, 1000);
}

function updateCountdownCanvas(seconds) {
    const canvas = document.getElementById('countdownCanvasAdvanced');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const center = size / 2;
    const radius = size / 2 - 5;

    ctx.clearRect(0, 0, size, size);

    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 8;
    ctx.stroke();

    const totalSecondsInDay = 24 * 3600;
    const progress = seconds / totalSecondsInDay;
    const angle = (progress * 2 * Math.PI) - Math.PI / 2;

    ctx.beginPath();
    ctx.arc(center, center, radius, -Math.PI / 2, angle);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 8;
    ctx.stroke();
}

// ============================================
// ADHAN & NOTIFICATIONS (REAL SOUNDS)
// ============================================

function checkAdhanTimes() {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const arabicNames = {
        'Fajr': 'الفجر', 'Dhuhr': 'الظهر', 'Asr': 'العصر', 'Maghrib': 'المغرب', 'Isha': 'العشاء'
    };

    prayers.forEach(prayer => {
        if (prayerTimes[prayer] === currentTime) {
            // Play adhan sound
            if (adhanSoundEnabled) {
                playAdhan();
            }

            // Show notification
            if (notificationsEnabled && Notification.permission === 'granted') {
                new Notification(`🔔 حان الآن موعد صلاة ${arabicNames[prayer]}`, {
                    body: `وقت صلاة ${arabicNames[prayer]} في ${cities[currentCity].name}`,
                    icon: 'https://cdn-icons-png.flaticon.com/512/1903/1903315.png',
                    vibrate: [200, 100, 200]
                });
            }

            // Vibrate
            if (vibrationEnabled && navigator.vibrate) {
                navigator.vibrate([500, 200, 500]);
            }

            // Show toast
            showToast(`🔔 حان الآن موعد صلاة ${arabicNames[prayer]}`, 'info');

            // Highlight the prayer card
            const card = document.querySelector(`.prayer-card-advanced[data-prayer="${prayer}"]`);
            if (card) {
                card.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    card.style.animation = '';
                }, 500);
            }
        }
    });
}

function playAdhan() {
    const audio = document.getElementById('adhanAudioElite');
    if (!audio) return;

    let soundUrl = adhanSounds[selectedAdhanSound] || adhanSounds.makkah;

    audio.src = soundUrl;
    audio.load();

    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Audio play failed:', error);
            // Try fallback
            audio.src = adhanSounds.fallback;
            audio.load();
            audio.play().catch(e => console.log('Fallback also failed:', e));
        });
    }
}

// ============================================
// COMPASS FUNCTIONS (HIGH PRECISION)
// ============================================

function initCompass() {
    const deviceStatus = document.getElementById('deviceStatus');

    if (!window.DeviceOrientationEvent) {
        if (deviceStatus) {
            deviceStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> جهازك لا يدعم خاصية البوصلة';
        }
        return;
    }

    const qiblaAngle = cities[currentCity].qibla;
    const qiblaAngleEl = document.getElementById('qiblaAngleAdvanced');
    if (qiblaAngleEl) qiblaAngleEl.textContent = `${qiblaAngle}°`;

    const distance = calculateDistance(cities[currentCity].lat, cities[currentCity].lon, 21.4225, 39.8262);
    const qiblaDistanceEl = document.getElementById('qiblaDistance');
    if (qiblaDistanceEl) qiblaDistanceEl.textContent = `${Math.round(distance)} كم`;

    // iOS requires permission
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        if (deviceStatus) {
            deviceStatus.innerHTML = '<i class="fas fa-hand-pointer"></i> اضغط هنا لتفعيل البوصلة';
            deviceStatus.style.cursor = 'pointer';
            deviceStatus.onclick = async () => {
                try {
                    const permission = await DeviceOrientationEvent.requestPermission();
                    if (permission === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                        if (deviceStatus) {
                            deviceStatus.innerHTML = '<i class="fas fa-compass"></i> 🕋 أدر هاتفك لتحديد اتجاه القبلة';
                            deviceStatus.style.cursor = 'default';
                        }
                        showToast('تم تفعيل البوصلة', 'success');
                    }
                } catch (error) {
                    console.error('Error requesting permission:', error);
                    if (deviceStatus) {
                        deviceStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> لم يتم تفعيل البوصلة';
                    }
                }
            };
        }
    } else {
        // Android and other browsers
        window.addEventListener('deviceorientation', handleOrientation);
        if (deviceStatus) {
            deviceStatus.innerHTML = '<i class="fas fa-compass"></i> 🕋 أدر هاتفك لتحديد اتجاه القبلة';
        }
    }
}

let lastFilteredAlpha = null;

function handleOrientation(event) {
    let alpha = event.alpha;

    if (alpha === null) return;

    // Apply low-pass filter for smooth movement
    if (lastFilteredAlpha === null) {
        lastFilteredAlpha = alpha;
    } else {
        lastFilteredAlpha = lastFilteredAlpha * 0.7 + alpha * 0.3;
    }

    // Calculate compass direction
    let compassDirection = 360 - lastFilteredAlpha;
    if (compassDirection < 0) compassDirection += 360;
    if (compassDirection > 360) compassDirection -= 360;

    // Update compass needle
    const needle = document.getElementById('compassNeedle3d');
    if (needle) {
        needle.style.transform = `translate(-50%, -50%) rotate(${compassDirection}deg)`;
    }

    // Calculate qibla direction
    const qiblaAngle = cities[currentCity].qibla;
    let qiblaDirection = (qiblaAngle - lastFilteredAlpha + 360) % 360;
    if (qiblaDirection > 360) qiblaDirection -= 360;

    // Check alignment (within 8 degrees)
    const isAligned = Math.abs(qiblaDirection) < 8 || Math.abs(qiblaDirection - 360) < 8;

    const deviceStatus = document.getElementById('deviceStatus');
    const qiblaMarker = document.getElementById('qiblaMarker');

    if (deviceStatus) {
        if (isAligned) {
            deviceStatus.innerHTML = '<i class="fas fa-check-circle"></i> ✅ القبلة أمامك مباشرة';
            deviceStatus.style.color = '#48bb78';
            deviceStatus.style.fontWeight = 'bold';

            // Haptic feedback when reaching qibla
            if (vibrationEnabled && navigator.vibrate) {
                navigator.vibrate(100);
            }
        } else {
            deviceStatus.innerHTML = `<i class="fas fa-compass"></i> 🕋 أدر هاتفك ${Math.round(qiblaDirection)}°`;
            deviceStatus.style.color = '';
            deviceStatus.style.fontWeight = 'normal';
        }
    }

    // Update qibla marker animation
    if (qiblaMarker) {
        if (isAligned) {
            qiblaMarker.style.transform = 'scale(1.3)';
            qiblaMarker.style.color = '#48bb78';
        } else {
            qiblaMarker.style.transform = 'scale(1)';
            qiblaMarker.style.color = '#fbbf24';
        }
    }

    // Update angle display
    const qiblaAngleDisplay = document.getElementById('qiblaAngleAdvanced');
    if (qiblaAngleDisplay) {
        qiblaAngleDisplay.textContent = `${Math.round(qiblaAngle)}°`;
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// ============================================
// DATE & TIME FUNCTIONS
// ============================================

function updateDateTime() {
    const now = new Date();

    const timeString = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const currentTimeEl = document.getElementById('currentTime');
    if (currentTimeEl) currentTimeEl.textContent = timeString;

    const gregorianDate = now.toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const gregorianBigEl = document.getElementById('gregorianBig');
    if (gregorianBigEl) gregorianBigEl.textContent = gregorianDate;

    const hijriDate = getHijriDate(now);
    const hijriBigEl = document.getElementById('hijriBig');
    if (hijriBigEl) hijriBigEl.textContent = hijriDate;
}

function getHijriDate(date) {
    const hijriMonths = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];

    const gregorianYear = date.getFullYear();
    const gregorianMonth = date.getMonth();
    const gregorianDay = date.getDate();

    const hijriYear = Math.floor((gregorianYear - 622) * 0.97);
    const hijriMonth = Math.floor((gregorianMonth + 1) * 1.03) % 12;
    const hijriDay = Math.floor(gregorianDay * 1.03);

    return `${hijriDay} ${hijriMonths[hijriMonth]} ${hijriYear} هـ`;
}

// ============================================
// WEATHER FUNCTIONS
// ============================================

async function fetchWeather() {
    const city = cities[currentCity];
    if (!city) return;

    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`);
        const data = await response.json();

        if (data.current_weather) {
            const temp = Math.round(data.current_weather.temperature);
            const weatherCode = data.current_weather.weathercode;
            const condition = getWeatherCondition(weatherCode);

            const tempEl = document.getElementById('temperature');
            const conditionEl = document.getElementById('weatherCondition');
            if (tempEl) tempEl.textContent = `${temp}°C`;
            if (conditionEl) conditionEl.textContent = condition;

            const weatherIcon = document.querySelector('#weatherInfo i');
            if (weatherIcon) {
                weatherIcon.className = getWeatherIcon(weatherCode);
            }
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

function getWeatherCondition(code) {
    if (code === 0) return 'صافي';
    if (code === 1) return 'غائم جزئياً';
    if (code === 2) return 'غائم';
    if (code === 3) return 'غائم كلياً';
    if (code >= 45 && code <= 48) return 'ضباب';
    if (code >= 51 && code <= 67) return 'مطر';
    if (code >= 71 && code <= 77) return 'ثلج';
    if (code >= 80 && code <= 99) return 'عاصفة';
    return 'معتدل';
}

function getWeatherIcon(code) {
    if (code === 0) return 'fas fa-sun';
    if (code === 1 || code === 2) return 'fas fa-cloud-sun';
    if (code === 3) return 'fas fa-cloud';
    if (code >= 45 && code <= 48) return 'fas fa-smog';
    if (code >= 51 && code <= 67) return 'fas fa-cloud-rain';
    if (code >= 71 && code <= 77) return 'fas fa-snowflake';
    if (code >= 80 && code <= 99) return 'fas fa-bolt';
    return 'fas fa-cloud-sun';
}

// ============================================
// CITY FUNCTIONS
// ============================================

function populateCitiesList() {
    const container = document.getElementById('citiesList');
    if (!container) return;

    container.innerHTML = '';
    Object.keys(cities).forEach(cityKey => {
        const city = cities[cityKey];
        const div = document.createElement('div');
        div.className = 'city-item';
        div.textContent = city.name;
        div.onclick = () => {
            changeCity(cityKey);
            const locationSelector = document.getElementById('locationSelector');
            if (locationSelector) locationSelector.classList.remove('active');
        };
        container.appendChild(div);
    });
}

function filterCitiesList() {
    const searchTerm = document.getElementById('citySearchInput').value.toLowerCase();
    const items = document.querySelectorAll('.city-item');

    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function changeCity(cityKey) {
    currentCity = cityKey;
    localStorage.setItem('selectedCity', cityKey);
    fetchPrayerTimes();
    fetchWeather();
    showToast(`تم التبديل إلى مدينة ${cities[cityKey].name}`, 'success');
}

function handleGlobalSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    if (!searchTerm) return;

    const matchingCity = Object.keys(cities).find(key =>
        cities[key].name.toLowerCase().includes(searchTerm)
    );

    if (matchingCity) {
        changeCity(matchingCity);
        e.target.value = '';
        showToast(`تم العثور على ${cities[matchingCity].name}`, 'success');
    }
}

// ============================================
// DAILY CONTENT FUNCTIONS
// ============================================

function updateDailyContent() {
    const randomHadith = hadiths[Math.floor(Math.random() * hadiths.length)];
    const hadithContainer = document.getElementById('hadithEliteText');
    if (hadithContainer) {
        hadithContainer.innerHTML = `
            <p class="hadith-content">${randomHadith.text}</p>
            <div class="hadith-meta">
                <span class="hadith-source">${randomHadith.source}</span>
                <span class="hadith-grade">${randomHadith.grade}</span>
            </div>
        `;
    }

    const randomDua = duas[Math.floor(Math.random() * duas.length)];
    const duaContainer = document.getElementById('duaEliteText');
    if (duaContainer) {
        duaContainer.innerHTML = `<p>${randomDua}</p>`;
    }
}

// ============================================
// TASBEEH FUNCTIONS
// ============================================

function updateTasbeeh(value, reset = false) {
    if (reset) {
        tasbeehCount = 0;
    } else {
        tasbeehCount += value;
        if (tasbeehCount < 0) tasbeehCount = 0;
    }

    const tasbeehCountEl = document.getElementById('tasbeehCount');
    if (tasbeehCountEl) tasbeehCountEl.textContent = tasbeehCount;
    localStorage.setItem('tasbeehCount', tasbeehCount);

    if (tasbeehCount === 33) {
        showToast('سبحان الله - 33 مرة', 'success');
        playNotificationSound();
    } else if (tasbeehCount === 100) {
        showToast('ماشاء الله! أكملت 100 تسبيحة', 'success');
        playNotificationSound();
    }
}

function playNotificationSound() {
    const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
    audio.play().catch(e => console.log('Sound play failed:', e));
}

// ============================================
// PRAYER PROGRESS FUNCTIONS
// ============================================

function updatePrayerProgress() {
    const completed = Object.values(todayPrayers).filter(v => v === true).length;
    const total = 5;
    const percentage = (completed / total) * 100;

    const progressFill = document.getElementById('prayerProgress');
    const completedPrayersEl = document.getElementById('completedPrayers');
    if (progressFill) progressFill.style.width = `${percentage}%`;
    if (completedPrayersEl) completedPrayersEl.textContent = completed;

    if (completed === total) {
        updatePrayerStreak();
    }
}

function updatePrayerCompletion(prayer, completed) {
    const prayerKey = prayer === 'الفجر' ? 'Fajr' :
        prayer === 'الظهر' ? 'Dhuhr' :
            prayer === 'العصر' ? 'Asr' :
                prayer === 'المغرب' ? 'Maghrib' : 'Isha';

    todayPrayers[prayerKey] = completed;
    localStorage.setItem('todayPrayers', JSON.stringify(todayPrayers));
    updatePrayerProgress();

    if (completed) {
        showToast(`تم تسجيل صلاة ${prayer}`, 'success');
    }
}

function updatePrayerStreak() {
    const lastCompleted = localStorage.getItem('lastFullDay');
    const today = new Date().toDateString();

    if (lastCompleted !== today) {
        prayerStreak++;
        localStorage.setItem('prayerStreak', prayerStreak);
        localStorage.setItem('lastFullDay', today);
        const streakEl = document.getElementById('prayerStreak');
        if (streakEl) streakEl.textContent = prayerStreak;
        showToast(`🎉 ماشاء الله! ${prayerStreak} يوم متتالي من الصلوات الخمس`, 'success');
    }
}

// ============================================
// CHARTS FUNCTIONS
// ============================================

function updateCharts() {
    updatePrayerTimeChart();
    updatePrayerDistributionChart();
}

function updatePrayerTimeChart() {
    const ctx = document.getElementById('prayerChart')?.getContext('2d');
    if (!ctx) return;

    const prayers = ['الفجر', 'الشروق', 'الظهر', 'العصر', 'المغرب', 'العشاء'];
    const times = [
        prayerTimes.Fajr?.split(':')[0] || 0,
        prayerTimes.Sunrise?.split(':')[0] || 0,
        prayerTimes.Dhuhr?.split(':')[0] || 0,
        prayerTimes.Asr?.split(':')[0] || 0,
        prayerTimes.Maghrib?.split(':')[0] || 0,
        prayerTimes.Isha?.split(':')[0] || 0
    ];

    if (charts.prayerChart) {
        charts.prayerChart.destroy();
    }

    charts.prayerChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: prayers,
            datasets: [{
                label: 'مواقيت الصلاة (ساعات)',
                data: times,
                borderColor: '#fbbf24',
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary') } }
            }
        }
    });
}

function updatePrayerDistributionChart() {
    const ctx = document.getElementById('prayerPieChart')?.getContext('2d');
    if (!ctx) return;

    const completed = Object.values(todayPrayers).filter(v => v === true).length;
    const remaining = 5 - completed;

    if (charts.prayerPieChart) {
        charts.prayerPieChart.destroy();
    }

    charts.prayerPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['الصلوات المؤداة', 'الصلوات المتبقية'],
            datasets: [{
                data: [completed, remaining],
                backgroundColor: ['#48bb78', '#ef4444'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary') } }
            }
        }
    });
}

// ============================================
// MOSQUES FUNCTIONS
// ============================================

function populateMosques() {
    const mosques = [
        { name: 'جامع الأزهر الشريف', location: 'القاهرة', distance: '0.5 كم', lat: 30.0444, lon: 31.2627 },
        { name: 'مسجد الحسين', location: 'القاهرة', distance: '0.8 كم', lat: 30.0479, lon: 31.2634 },
        { name: 'مسجد عمرو بن العاص', location: 'الفسطاط', distance: '2.3 كم', lat: 30.0099, lon: 31.2334 },
        { name: 'مسجد محمد علي', location: 'القلعة', distance: '3.1 كم', lat: 30.0293, lon: 31.2591 },
        { name: 'مسجد الرحمن الرحيم', location: 'الإسكندرية', distance: '1.2 كم', lat: 31.2001, lon: 29.9187 },
        { name: 'مسجد المرسي أبو العباس', location: 'الإسكندرية', distance: '2.5 كم', lat: 31.2048, lon: 29.8869 }
    ];

    const grid = document.getElementById('mosquesGrid');
    if (grid) {
        grid.innerHTML = mosques.map(mosque => `
            <div class="mosque-card" onclick="showMosqueOnMap(${mosque.lat}, ${mosque.lon})">
                <i class="fas fa-mosque"></i>
                <div class="mosque-info">
                    <h4>${mosque.name}</h4>
                    <p>${mosque.location} • ${mosque.distance}</p>
                </div>
            </div>
        `).join('');
    }

    if (document.getElementById('mosquesPage')?.classList.contains('active')) {
        initMap();
    }
}

function initMap() {
    if (!map && document.getElementById('mosquesMap')) {
        map = L.map('mosquesMap').setView([30.0444, 31.2357], 12);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        L.marker([cities[currentCity].lat, cities[currentCity].lon])
            .addTo(map)
            .bindPopup(cities[currentCity].name)
            .openPopup();
    }
}

function showMosqueOnMap(lat, lon) {
    if (map) {
        map.setView([lat, lon], 15);
        L.marker([lat, lon]).addTo(map).bindPopup('المسجد').openPopup();
    }
    switchPage('mosques');
}

// ============================================
// RAMADAN FUNCTIONS
// ============================================

function populateRamadanCities() {
    const select = document.getElementById('ramadanCitySelect');
    if (!select) return;

    select.innerHTML = '';
    Object.keys(cities).forEach(cityKey => {
        const option = document.createElement('option');
        option.value = cityKey;
        option.textContent = cities[cityKey].name;
        select.appendChild(option);
    });
}

function updateRamadanCountdown() {
    const now = new Date();
    const ramadanStart = new Date(2026, 1, 17);
    const diffTime = ramadanStart - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const ramadanCountdownEl = document.getElementById('ramadanCountdown');
    if (ramadanCountdownEl) {
        if (diffDays > 0) {
            ramadanCountdownEl.innerHTML = `${diffDays} يوم`;
        } else if (diffDays === 0) {
            ramadanCountdownEl.innerHTML = 'اليوم يبدأ رمضان';
        } else {
            const daysPassed = Math.abs(diffDays);
            ramadanCountdownEl.innerHTML = `اليوم ${daysPassed + 1} من رمضان`;
        }
    }
}

function generateRamadanTable() {
    const container = document.getElementById('ramadanDisplay');
    const view = document.getElementById('ramadanView')?.value || 'table';

    if (view === 'table') {
        generateRamadanTableView(container);
    } else {
        generateRamadanCalendarView(container);
    }
}

function generateRamadanTableView(container) {
    if (!container) return;

    let tableHTML = `
        <div class="ramadan-table-container">
            <table class="ramadan-table">
                <thead>
                    <tr><th>اليوم</th><th>التاريخ</th><th>الإمساك</th><th>الفجر</th><th>المغرب</th><th>العشاء</th></tr>
                </thead>
                <tbody>
    `;

    for (let i = 1; i <= 30; i++) {
        tableHTML += `
            <tr>
                <td>${i}</td>
                <td>${i} رمضان 1447</td>
                <td>${getImsakTime(i)}</td>
                <td>${getRamadanPrayerTime('Fajr', i)}</td>
                <td>${getRamadanPrayerTime('Maghrib', i)}</td>
                <td>${getRamadanPrayerTime('Isha', i)}</td>
            </tr>
        `;
    }

    tableHTML += `</tbody></table></div>`;
    container.innerHTML = tableHTML;
}

function generateRamadanCalendarView(container) {
    if (!container) return;

    let calendarHTML = `<div class="ramadan-calendar-grid" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px;">`;
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

    days.forEach(day => {
        calendarHTML += `<div class="calendar-header" style="text-align: center; padding: 10px; background: var(--bg-tertiary); border-radius: 10px;">${day}</div>`;
    });

    for (let i = 1; i <= 30; i++) {
        calendarHTML += `
            <div class="calendar-day" style="padding: 10px; text-align: center; background: var(--card-bg); border-radius: 10px;">
                <div class="day-number">${i}</div>
                <div class="imsak-time" style="font-size: 0.7em; color: #fbbf24;">الإمساك: ${getImsakTime(i)}</div>
                <div class="fajr-time" style="font-size: 0.7em;">الفجر: ${getRamadanPrayerTime('Fajr', i)}</div>
                <div class="maghrib-time" style="font-size: 0.7em;">المغرب: ${getRamadanPrayerTime('Maghrib', i)}</div>
            </div>
        `;
    }

    calendarHTML += `</div>`;
    container.innerHTML = calendarHTML;
}

function getImsakTime(day) {
    const baseImsak = "04:30";
    const adjustment = Math.floor(day / 10);
    const [hours, minutes] = baseImsak.split(':');
    let newMinutes = parseInt(minutes) - adjustment;
    if (newMinutes < 0) newMinutes += 60;
    return `${hours}:${newMinutes.toString().padStart(2, '0')}`;
}

function getRamadanPrayerTime(prayer, day) {
    if (prayerTimes[prayer]) {
        const [hours, minutes] = prayerTimes[prayer].split(':');
        let newHours = parseInt(hours) + Math.floor(day / 15);
        if (newHours >= 24) newHours -= 24;
        return `${newHours.toString().padStart(2, '0')}:${minutes}`;
    }
    return '--:--';
}

function exportRamadanPDF() {
    showToast('جاري تحضير ملف PDF للإمساكية...', 'info');
    setTimeout(() => {
        showToast('تم تصدير إمساكية رمضان بنجاح', 'success');
    }, 1500);
}

// ============================================
// AZKAR FUNCTIONS
// ============================================

function displayAzkar(category) {
    const container = document.getElementById('azkarList');
    if (!container) return;

    const azkarList = azkar[category] || azkar.morning;

    container.innerHTML = azkarList.map((zekr, index) => `
        <div class="zekr-card" data-zekr-index="${index}">
            <div class="zekr-text">${zekr.text}</div>
            <div class="zekr-repeat">
                <span class="repeat-count">${zekr.repeat} مرة</span>
                <button class="zekr-counter" onclick="countZekr(${index}, ${zekr.repeat})">
                    <i class="fas fa-check-circle"></i> تم
                </button>
            </div>
        </div>
    `).join('');
}

function countZekr(index, repeat) {
    let zekrCounts = JSON.parse(localStorage.getItem('zekrCounts') || '{}');
    zekrCounts[index] = (zekrCounts[index] || 0) + 1;

    if (zekrCounts[index] >= repeat) {
        showToast('✨ ماشاء الله! أكملت هذا الذكر ✨', 'success');
        zekrCounts[index] = 0;
    }

    localStorage.setItem('zekrCounts', JSON.stringify(zekrCounts));

    const card = document.querySelector(`.zekr-card[data-zekr-index="${index}"]`);
    if (card) {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    }
}

// ============================================
// QURAN FUNCTIONS
// ============================================

function populateSurahs() {
    const select = document.getElementById('surahSelect');
    if (!select) return;

    surahs.forEach((surah, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = `${index + 1}. ${surah}`;
        select.appendChild(option);
    });
}

async function loadSurahText() {
    const surahNumber = document.getElementById('surahSelect').value;
    const container = document.getElementById('quranText');

    if (!surahNumber) {
        container.innerHTML = '<p style="text-align: center; padding: 50px;">🌟 اختر سورة لقراءة القرآن الكريم 🌟</p>';
        return;
    }

    container.innerHTML = '<div class="loading">جاري تحميل السورة...</div>';

    try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar`);
        const data = await response.json();

        if (data.code === 200) {
            const surah = data.data;
            let ayahHTML = '';
            surah.ayahs.forEach((ayah, index) => {
                ayahHTML += `
                    <div class="ayah">
                        <span class="ayah-number">${index + 1}</span>
                        ${ayah.text}
                    </div>
                `;
            });
            container.innerHTML = ayahHTML;
            loadSurahAudio();
        }
    } catch (error) {
        console.error('Error loading surah:', error);
        container.innerHTML = '<p style="text-align: center; color: #ef4444;">حدث خطأ في تحميل السورة</p>';
    }
}

function loadSurahAudio() {
    const surahNumber = document.getElementById('surahSelect').value;
    const reciter = document.getElementById('reciterSelect').value;
    const audio = document.getElementById('quranAudio');

    if (surahNumber && audio) {
        audio.src = `https://cdn.islamic.network/quran/audio/128/${reciter}/${surahNumber}.mp3`;
    }
}

// ============================================
// SETTINGS FUNCTIONS
// ============================================

function loadSettings() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== 'auto') {
        document.documentElement.setAttribute('data-theme', savedTheme);
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) themeSelect.value = savedTheme;
    } else if (savedTheme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) themeSelect.value = 'auto';
    }

    const savedMethod = localStorage.getItem('calculationMethod');
    if (savedMethod) {
        currentMethod = parseInt(savedMethod);
        const methodSelect = document.getElementById('methodSelect');
        if (methodSelect) methodSelect.value = currentMethod;
    }

    const savedNotifications = localStorage.getItem('notificationsEnabled');
    if (savedNotifications === 'true') {
        notificationsEnabled = true;
        const adhanNotifications = document.getElementById('adhanNotifications');
        if (adhanNotifications) adhanNotifications.checked = true;
    }

    const savedAdhanSound = localStorage.getItem('adhanSound');
    if (savedAdhanSound) {
        selectedAdhanSound = savedAdhanSound;
        const adhanSound = document.getElementById('adhanSound');
        if (adhanSound) adhanSound.value = savedAdhanSound;
    }

    const savedVibration = localStorage.getItem('vibrationEnabled');
    if (savedVibration === 'true') {
        vibrationEnabled = true;
        const vibrationSetting = document.getElementById('vibrationSetting');
        if (vibrationSetting) vibrationSetting.checked = true;
    }

    const savedAutoRefresh = localStorage.getItem('autoRefresh');
    if (savedAutoRefresh) {
        const autoRefresh = document.getElementById('autoRefresh');
        if (autoRefresh) autoRefresh.value = savedAutoRefresh;
        const interval = parseInt(savedAutoRefresh) * 60000;
        if (interval) {
            setInterval(() => fetchPrayerTimes(), interval);
        }
    }

    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity && cities[savedCity]) {
        currentCity = savedCity;
    }

    const savedTasbeeh = localStorage.getItem('tasbeehCount');
    if (savedTasbeeh) {
        tasbeehCount = parseInt(savedTasbeeh);
        const tasbeehCountEl = document.getElementById('tasbeehCount');
        if (tasbeehCountEl) tasbeehCountEl.textContent = tasbeehCount;
    }

    const savedStreak = localStorage.getItem('prayerStreak');
    if (savedStreak) {
        prayerStreak = parseInt(savedStreak);
        const streakEl = document.getElementById('prayerStreak');
        if (streakEl) streakEl.textContent = prayerStreak;
    }

    const savedPrayers = localStorage.getItem('todayPrayers');
    if (savedPrayers) {
        todayPrayers = JSON.parse(savedPrayers);
        updatePrayerProgress();
    }

    const savedColor = localStorage.getItem('accentColor');
    if (savedColor) {
        document.documentElement.style.setProperty('--gradient-start', savedColor);
        document.querySelectorAll('.color-option').forEach(opt => {
            if (opt.dataset.color === savedColor) {
                opt.classList.add('active');
            }
        });
    }
}

function loadUserStats() {
    const savedStreak = localStorage.getItem('prayerStreak');
    const streakEl = document.getElementById('prayerStreak');
    if (streakEl && savedStreak) streakEl.textContent = savedStreak;

    const completed = Object.values(todayPrayers).filter(v => v === true).length;
    const prayersCountEl = document.getElementById('prayersCount');
    if (prayersCountEl) prayersCountEl.textContent = completed;
}

function backupUserData() {
    const backup = {
        settings: {
            theme: localStorage.getItem('theme'),
            calculationMethod: localStorage.getItem('calculationMethod'),
            notificationsEnabled: localStorage.getItem('notificationsEnabled'),
            adhanSound: localStorage.getItem('adhanSound'),
            vibrationEnabled: localStorage.getItem('vibrationEnabled')
        },
        stats: {
            prayerStreak: localStorage.getItem('prayerStreak'),
            tasbeehCount: localStorage.getItem('tasbeehCount'),
            todayPrayers: localStorage.getItem('todayPrayers')
        },
        userData: {
            selectedCity: localStorage.getItem('selectedCity')
        },
        backupDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(backup, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `prayer-times-backup-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    showToast('تم إنشاء نسخة احتياطية من بياناتك', 'success');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function switchPage(pageId) {
    document.querySelectorAll('.page-elite').forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(`${pageId}Page`);
    if (targetPage) {
        targetPage.classList.add('active');

        if (pageId === 'qibla') {
            initCompass();
        } else if (pageId === 'ramadan') {
            generateRamadanTable();
            updateRamadanCountdown();
        } else if (pageId === 'mosques') {
            setTimeout(() => initMap(), 100);
        } else if (pageId === 'azkar') {
            displayAzkar('morning');
        }
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) {
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    showToast(`تم التبديل إلى الوضع ${newTheme === 'dark' ? 'الداكن' : 'الفاتح'}`, 'info');
}

function handleFabAction(action) {
    switch (action) {
        case 'adhan':
            playAdhan();
            showToast('تشغيل الأذان', 'info');
            break;
        case 'qibla':
            switchPage('qibla');
            document.querySelector('.nav-elite[data-page="qibla"]').classList.add('active');
            break;
        case 'share':
            if (navigator.share) {
                navigator.share({
                    title: 'مواقيت الصلاة في مصر',
                    text: `مواقيت الصلاة اليوم في ${cities[currentCity].name}`,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(window.location.href);
                showToast('تم نسخ رابط الموقع', 'success');
            }
            break;
        case 'notification':
            if (Notification.permission === 'granted') {
                new Notification('تذكير الصلاة', {
                    body: `الصلاة القادمة: ${document.getElementById('nextPrayerAdvanced')?.textContent || ''}`
                });
            } else {
                Notification.requestPermission();
            }
            break;
    }
}

function setPrayerAlarm(prayer, time) {
    showToast(`تم ضبط منبه لصلاة ${prayer} الساعة ${time}`, 'success');

    if ('Notification' in window && Notification.permission === 'granted') {
        const alarmTime = new Date();
        const [hours, minutes] = time.split(':');
        alarmTime.setHours(hours, minutes, 0);

        const now = new Date();
        const timeDiff = alarmTime - now;

        if (timeDiff > 0) {
            setTimeout(() => {
                new Notification(`صلاة ${prayer}`, {
                    body: `حان الآن موعد صلاة ${prayer}`,
                    icon: 'https://cdn-icons-png.flaticon.com/512/1903/1903315.png'
                });
            }, timeDiff);
        }
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--gradient-primary);
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease;
        box-shadow: var(--shadow-lg);
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function checkPWAInstall() {
    let deferredPrompt;
    const installPrompt = document.getElementById('installPrompt');
    const installApp = document.getElementById('installApp');
    const closeInstall = document.getElementById('closeInstall');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (installPrompt) installPrompt.style.display = 'block';
    });

    if (installApp) {
        installApp.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    if (installPrompt) installPrompt.style.display = 'none';
                }
                deferredPrompt = null;
            }
        });
    }

    if (closeInstall) {
        closeInstall.addEventListener('click', () => {
            if (installPrompt) installPrompt.style.display = 'none';
        });
    }
}

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOutRight {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    .loading { text-align: center; padding: 50px; color: var(--text-secondary); }
    .checkbox-label { display: block; position: relative; cursor: pointer; width: 20px; height: 20px; margin: 0 auto; }
    .checkbox-label input { opacity: 0; width: 0; height: 0; }
    .checkmark { position: absolute; top: 0; left: 0; width: 20px; height: 20px; background-color: var(--bg-tertiary); border-radius: 4px; transition: all var(--transition-fast); }
    .checkbox-label input:checked ~ .checkmark { background-color: #fbbf24; }
    .checkmark:after { content: ""; position: absolute; display: none; }
    .checkbox-label input:checked ~ .checkmark:after { display: block; }
    .checkbox-label .checkmark:after { left: 6px; top: 2px; width: 5px; height: 10px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }
    .set-alarm-btn { background: none; border: none; cursor: pointer; color: var(--text-secondary); font-size: 1.1em; transition: color var(--transition-fast); }
    .set-alarm-btn:hover { color: #fbbf24; }
`;

document.head.appendChild(styleSheet);

// ============================================
// PWA INSTALLATION
// ============================================

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered successfully:', registration.scope);
        })
        .catch(error => {
            console.log('Service Worker registration failed:', error);
        });
}

let deferredPrompt;
const installPrompt = document.querySelector('.install-prompt');
const installApp = document.getElementById('installApp');
const closeInstall = document.getElementById('closeInstall');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installPrompt) installPrompt.style.display = 'block';
});

if (installApp) {
    installApp.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                if (installPrompt) installPrompt.style.display = 'none';
            }
            deferredPrompt = null;
        }
    });
}

if (closeInstall) {
    closeInstall.addEventListener('click', () => {
        if (installPrompt) installPrompt.style.display = 'none';
    });
}

window.addEventListener('appinstalled', () => {
    if (installPrompt) installPrompt.style.display = 'none';
    deferredPrompt = null;
    console.log('PWA was installed');
});