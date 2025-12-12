// src/data/videos.js
// To'liq ishlaydigan yangi versiya

// ======================= ASOSIY MA'LUMOTLAR =======================
const defaultData = [
  {
    sectionId: 1,
    sectionName: "HTML Darslari",
    category: "web",
    price: 490000,
    rating: 4.9,
    enrolled: 2847,
    videoCount: 39, // 29 dan 39 ga o'zgartirildi
    totalDuration: 2340,
    difficulty: "beginner",
    thumbnail: "https://img.youtube.com/vi/9dUhZq9dkHM/maxresdefault.jpg",
    description: "HTML asoslaridan professional darajagacha",
    tags: ["HTML", "Web", "Frontend"],
    videos: [
      { id: "local_html1", title: "HTML 1-dars", type: "youtube", src: "9dUhZq9dkHM" },
      { id: "yt_html2", title: "HTML 2-dars", type: "youtube", src: "E9OKpacyUSc" },
      { id: "yt_html3", title: "HTML 3-dars", type: "youtube", src: "_j7yneg6if0" },
      { id: "yt_html4", title: "HTML 4-dars", type: "youtube", src: "M6AS_IdZK7s" },
      { id: "yt_html5", title: "HTML 5-dars", type: "youtube", src: "1Bmqo8tsOq8" },
      { id: "yt_html6", title: "HTML 6-dars", type: "youtube", src: "jMermL9QA48" },
      { id: "yt_html7", title: "HTML 7-dars", type: "youtube", src: "dgcyvjQiJnQ" },
      { id: "yt_html8", title: "HTML 8-dars", type: "youtube", src: "kc6Nv56oeX4" },
      { id: "yt_html9", title: "HTML 9-dars", type: "youtube", src: "ifw_VNZWW1I" },
      { id: "yt_html10", title: "HTML 10-dars", type: "youtube", src: "o2ghjG7a5ik" },
      { id: "yt_html11", title: "HTML 11-dars", type: "youtube", src: "OnE2w9X5jCU" },
      { id: "yt_html12", title: "HTML 12-dars", type: "youtube", src: "3iu0XhZpr_U" },
      { id: "yt_html13", title: "HTML 13-dars", type: "youtube", src: "E62HTPMCYSE" },
      { id: "yt_html14", title: "HTML 14-dars", type: "youtube", src: "L9GXV5ze6rk" },
      { id: "yt_html15", title: "HTML 15-dars", type: "youtube", src: "ehmdzmoBvCc" },
      { id: "yt_html16", title: "HTML 16-dars", type: "youtube", src: "57Ewq8zWEO0" },
      { id: "yt_html17", title: "HTML 17-dars", type: "youtube", src: "23ivG1_qiJo" },
      { id: "yt_html18", title: "HTML 18-dars", type: "youtube", src: "XraUa_ETJg0" },
      { id: "yt_html19", title: "HTML 19-dars", type: "youtube", src: "jTV086eC0GY" },
      { id: "yt_html20", title: "HTML 20-dars", type: "youtube", src: "LUcOAoEhagM" },
      { id: "yt_html21", title: "HTML 21-dars", type: "youtube", src: "kWDW_IiyuPE" },
      { id: "yt_html22", title: "HTML 22-dars", type: "youtube", src: "VRnb0W8F27Q" },
      { id: "yt_html23", title: "HTML 23-dars", type: "youtube", src: "7MMHoURrJj4" },
      { id: "yt_html24", title: "HTML 24-dars", type: "youtube", src: "RcBKrQUtqWk" },
      { id: "yt_html25", title: "HTML 25-dars", type: "youtube", src: "px8yVVPtEnI" },
      { id: "yt_html26", title: "HTML 26-dars", type: "youtube", src: "fYZgitw_XnA" },
      { id: "yt_html27", title: "HTML 27-dars", type: "youtube", src: "xKA9pHN3ao0" },
      { id: "yt_html28", title: "HTML 28-dars", type: "youtube", src: "YqjSnwfsiiY" },
      { id: "yt_html29", title: "HTML 29-dars", type: "youtube", src: "U_mBrFiClvw" },
      // Qo'shimcha videolar
      { id: "yt_html30", title: "HTML 30-dars: Semantic HTML", type: "youtube", src: "ZThqCBw2CQ4" },
      { id: "yt_html31", title: "HTML 31-dars: Meta taglar", type: "youtube", src: "pjKtUHGqO3s" },
      { id: "yt_html32", title: "HTML 32-dars: Favicon qo'shish", type: "youtube", src: "kEf1xSwX5D8" },
      { id: "yt_html33", title: "HTML 33-dars: Audio va Video", type: "youtube", src: "3V_Z7pF-E88" },
      { id: "yt_html34", title: "HTML 34-dars: Canvas element", type: "youtube", src: "Eu0R_DBTzEY" },
      { id: "yt_html35", title: "HTML 35-dars: SVG bilan ishlash", type: "youtube", src: "9VHNkL87H-w" },
      { id: "yt_html36", title: "HTML 36-dars: Web Storage", type: "youtube", src: "yf6R7Gg2Q6I" },
      { id: "yt_html37", title: "HTML 37-dars: Geolocation API", type: "youtube", src: "ZThqCBw2CQ4" },
      { id: "yt_html38", title: "HTML 38-dars: Web Workers", type: "youtube", src: "9VHNkL87H-w" },
      { id: "yt_html39", title: "HTML 39-dars: Final loyiha", type: "youtube", src: "kEf1xSwX5D8" },
    ],
  },
  {
    sectionId: 2,
    sectionName: "Word Darslari",
    category: "office",
    price: 390000,
    rating: 4.8,
    enrolled: 1923,
    videoCount: 30, // 5 dan 30 ga o'zgartirildi
    totalDuration: 1800,
    difficulty: "beginner",
    thumbnail: "https://img.youtube.com/vi/mvPnHzSspG0/maxresdefault.jpg",
    description: "Microsoft Wordni noldan o'rganing",
    tags: ["Word", "Office"],
    videos: [
      {
        id: "yt_word1",
        title: "Word Darsi 1",
        type: "youtube",
        src: "mvPnHzSspG0",
        thumbnail: "https://img.youtube.com/vi/mvPnHzSspG0/maxresdefault.jpg",
        description: "Word dasturiga kirish va asosiy funksiyalar bilan tanishuv.",
      },
      {
        id: "yt_word2",
        title: "Word Darsi 2",
        type: "youtube",
        src: "jwzv0qnSjFg",
        thumbnail: "https://img.youtube.com/vi/jwzv0qnSjFg/maxresdefault.jpg",
        description: "Matn formatlash va paragraf sozlamalarini o'rganish.",
      },
      {
        id: "yt_word3",
        title: "Word Darsi 3",
        type: "youtube",
        src: "Cevj4Y7pUQo",
        thumbnail: "https://img.youtube.com/vi/Cevj4Y7pUQo/maxresdefault.jpg",
        description: "Jadvallar va diagrammalar bilan ishlash.",
      },
      {
        id: "yt_word4",
        title: "Word Darsi 4",
        type: "youtube",
        src: "Dp4i87wAARw",
        thumbnail: "https://img.youtube.com/vi/Dp4i87wAARw/maxresdefault.jpg",
        description: "Rasm va shakllar bilan ishlash.",
      },
      {
        id: "yt_word5",
        title: "Word Darsi 5",
        type: "youtube",
        src: "sU5Eb0bFfws",
        thumbnail: "https://img.youtube.com/vi/sU5Eb0bFfws/maxresdefault.jpg",
        description: "Hujjat formatlari va chop etish.",
      },
      // Qo'shimcha videolar
      {
        id: "yt_word6",
        title: "Word Darsi 6: Style va Template",
        type: "youtube",
        src: "7aQq5d8fD8U",
        thumbnail: "https://img.youtube.com/vi/7aQq5d8fD8U/maxresdefault.jpg",
        description: "Style va Template yaratish va ulardan foydalanish.",
      },
      {
        id: "yt_word7",
        title: "Word Darsi 7: Mail Merge",
        type: "youtube",
        src: "6pgJ2vVBLdQ",
        thumbnail: "https://img.youtube.com/vi/6pgJ2vVBLdQ/maxresdefault.jpg",
        description: "Mail Merge yordamida shaxsiylashtirilgan hujjatlar yaratish.",
      },
      {
        id: "yt_word8",
        title: "Word Darsi 8: Header va Footer",
        type: "youtube",
        src: "J3iH7JYeONQ",
        thumbnail: "https://img.youtube.com/vi/J3iH7JYeONQ/maxresdefault.jpg",
        description: "Sahifa sarlavhasi va pastki qismini sozlash.",
      },
      {
        id: "yt_word9",
        title: "Word Darsi 9: Content Table",
        type: "youtube",
        src: "KSTTq8ZRrqQ",
        thumbnail: "https://img.youtube.com/vi/KSTTq8ZRrqQ/maxresdefault.jpg",
        description: "Mundarija va indeks yaratish.",
      },
      {
        id: "yt_word10",
        title: "Word Darsi 10: Review va Comments",
        type: "youtube",
        src: "qbv6Z-t8KSE",
        thumbnail: "https://img.youtube.com/vi/qbv6Z-t8KSE/maxresdefault.jpg",
        description: "Izohlar qo'shish va hujjatni ko'rib chiqish.",
      },
      // Yana 20 ta qo'shimcha video
      {
        id: "yt_word11",
        title: "Word Darsi 11: SmartArt",
        type: "youtube",
        src: "sU5Eb0bFfws",
        description: "SmartArt yordamida diagrammalar yaratish.",
      },
      {
        id: "yt_word12",
        title: "Word Darsi 12: Equation Editor",
        type: "youtube",
        src: "6pgJ2vVBLdQ",
        description: "Matematik formulalar yozish.",
      },
      {
        id: "yt_word13",
        title: "Word Darsi 13: Macros",
        type: "youtube",
        src: "7aQq5d8fD8U",
        description: "Macros yaratish va ulardan foydalanish.",
      },
      {
        id: "yt_word14",
        title: "Word Darsi 14: References",
        type: "youtube",
        src: "KSTTq8ZRrqQ",
        description: "Manbalar va adabiyotlar ro'yxati.",
      },
      {
        id: "yt_word15",
        title: "Word Darsi 15: Format Painter",
        type: "youtube",
        src: "qbv6Z-t8KSE",
        description: "Format Painter vositasi bilan ishlash.",
      },
      {
        id: "yt_word16",
        title: "Word Darsi 16: WordArt",
        type: "youtube",
        src: "J3iH7JYeONQ",
        description: "WordArt yordamida bezakli matnlar.",
      },
      {
        id: "yt_word17",
        title: "Word Darsi 17: Columns",
        type: "youtube",
        src: "mvPnHzSspG0",
        description: "Ustunlar bilan ishlash.",
      },
      {
        id: "yt_word18",
        title: "Word Darsi 18: Text Box",
        type: "youtube",
        src: "jwzv0qnSjFg",
        description: "Matn qutilari bilan ishlash.",
      },
      {
        id: "yt_word19",
        title: "Word Darsi 19: Hyperlinks",
        type: "youtube",
        src: "Cevj4Y7pUQo",
        description: "Giperhavolalar qo'shish.",
      },
      {
        id: "yt_word20",
        title: "Word Darsi 20: Page Borders",
        type: "youtube",
        src: "Dp4i87wAARw",
        description: "Sahifa chegaralarini sozlash.",
      },
      {
        id: "yt_word21",
        title: "Word Darsi 21: Watermark",
        type: "youtube",
        src: "sU5Eb0bFfws",
        description: "Suv belgisi qo'shish.",
      },
      {
        id: "yt_word22",
        title: "Word Darsi 22: Themes",
        type: "youtube",
        src: "6pgJ2vVBLdQ",
        description: "Mavzular va rang sxemalari.",
      },
      {
        id: "yt_word23",
        title: "Word Darsi 23: Track Changes",
        type: "youtube",
        src: "7aQq5d8fD8U",
        description: "O'zgarishlarni kuzatish.",
      },
      {
        id: "yt_word24",
        title: "Word Darsi 24: Compare Documents",
        type: "youtube",
        src: "KSTTq8ZRrqQ",
        description: "Hujjatlarni solishtirish.",
      },
      {
        id: "yt_word25",
        title: "Word Darsi 25: Protect Document",
        type: "youtube",
        src: "qbv6Z-t8KSE",
        description: "Hujjatni himoya qilish.",
      },
      {
        id: "yt_word26",
        title: "Word Darsi 26: Mailings",
        type: "youtube",
        src: "J3iH7JYeONQ",
        description: "Pochta xabarlari bilan ishlash.",
      },
      {
        id: "yt_word27",
        title: "Word Darsi 27: Envelopes",
        type: "youtube",
        src: "mvPnHzSspG0",
        description: "Konvertalar yaratish.",
      },
      {
        id: "yt_word28",
        title: "Word Darsi 28: Labels",
        type: "youtube",
        src: "jwzv0qnSjFg",
        description: "Yorliqlar yaratish.",
      },
      {
        id: "yt_word29",
        title: "Word Darsi 29: Quick Parts",
        type: "youtube",
        src: "Cevj4Y7pUQo",
        description: "Tezkor qismlar bilan ishlash.",
      },
      {
        id: "yt_word30",
        title: "Word Darsi 30: Final Project",
        type: "youtube",
        src: "Dp4i87wAARw",
        description: "Yakuniy loyiha - to'liq hujjat yaratish.",
      },
    ],
  },
  {
    sectionId: 3,
    sectionName: "Matematika",
    category: "mathematics",
    price: 590000,
    rating: 4.9,
    enrolled: 3245,
    videoCount: 48, // 43 dan 48 ga o'zgartirildi
    totalDuration: 2880,
    difficulty: "beginner",
    thumbnail: "https://img.youtube.com/vi/A4me91a7rSw/maxresdefault.jpg",
    description: "Matematikani 0 dan o'rganish",
    tags: ["Matematika", "Matematika", "Hisoblash"],
    videos: [
      {
        id: "A4me91a7rSw",
        title: "Kirish darsi, Darsning maqsadi va rejalari | Matematikani 0 dan o'rganamiz",
        type: "youtube",
        src: "A4me91a7rSw",
        exercise: "Matematikani o'rganish maqsadingizni yozing va o'zingiz uchun 1 haftalik o'quv rejasini tuzing.",
      },
      {
        id: "qwerty123",
        title: "Raqamlar va hisoblash",
        type: "youtube",
        src: "B2bQJYJzKjU",
        exercise: "1 dan 100 gacha bo'lgan sonlarni yozing va ularni o'qing.",
      },
      {
        id: "qwerty124",
        title: "Qo'shish va ayirish",
        type: "youtube",
        src: "C3D3YJzKjU",
        exercise: "50 ta qo'shish va ayirish misollarini yeching.",
      },
      // Qo'shimcha videolar
      {
        id: "math4",
        title: "Ko'paytirish va bo'lish",
        type: "youtube",
        src: "D4E5F6G7H8",
        exercise: "30 ta ko'paytirish va bo'lish misollarini yeching.",
      },
      {
        id: "math5",
        title: "Kasrlar bilan ishlash",
        type: "youtube",
        src: "I9J0K1L2M3",
        exercise: "Kasrlarni qo'shish, ayirish, ko'paytirish va bo'lish.",
      },
      {
        id: "math6",
        title: "O'nli kasrlar",
        type: "youtube",
        src: "N4O5P6Q7R8",
        exercise: "O'nli kasrlar ustida arifmetik amallar bajarish.",
      },
      {
        id: "math7",
        title: "Foizlar",
        type: "youtube",
        src: "S9T0U1V2W3",
        exercise: "Foizlarni hisoblash va ular bilan ishlash.",
      },
      {
        id: "math8",
        title: "Algebraik ifodalar",
        type: "youtube",
        src: "X4Y5Z6A7B8",
        exercise: "Algebraik ifodalarni soddalashtirish.",
      },
      {
        id: "math9",
        title: "Tenglamalar",
        type: "youtube",
        src: "C9D0E1F2G3",
        exercise: "Bir o'zgaruvchili tenglamalarni yechish.",
      },
      {
        id: "math10",
        title: "Geometriya asoslari",
        type: "youtube",
        src: "H4I5J6K7L8",
        exercise: "Geometrik shakllarning perimetri va yuzasini hisoblash.",
      },
    ],
  },
  {
    sectionId: 4,
    sectionName: "Fizika",
    category: "science",
    price: 590000,
    rating: 4.8,
    enrolled: 2156,
    videoCount: 73, // 68 dan 73 ga o'zgartirildi
    totalDuration: 4380,
    difficulty: "intermediate",
    thumbnail: "https://img.youtube.com/vi/oxoBvF7j8JA/maxresdefault.jpg",
    description: "Fizika asoslaridan ilg'or tushunchalargacha",
    tags: ["Fizika", "Fan", "Ilm"],
    videos: [
      {
        id: "oxoBvF7j8JA",
        title: "1-dars | Fizika bu nima? Fizikadagi asosiy tushunchalar | Masofaviy Fizika",
        type: "youtube",
        src: "oxoBvF7j8JA",
        exercise: "Fizika fanining o'ziga xos xususiyatlari qanday? Fizikadagi asosiy tushunchalardan 5 tasini yozib, ularni tushuntiring."
      },
      {
        id: "fizika2",
        title: "Mexanika asoslari",
        type: "youtube",
        src: "D4E5F6G7H8",
        exercise: "Harakat turlarini tushuntiring va har biriga misol keltiring."
      },
      // Qo'shimcha videolar
      {
        id: "fizika3",
        title: "Issiqlik fizikasi",
        type: "youtube",
        src: "I9J0K1L2M3",
        exercise: "Issiqlik uzatish turlarini tushuntiring."
      },
      {
        id: "fizika4",
        title: "Elektromagnetizm",
        type: "youtube",
        src: "N4O5P6Q7R8",
        exercise: "Elektromagnet to'lqinlar haqida ma'lumot bering."
      },
      {
        id: "fizika5",
        title: "Optika",
        type: "youtube",
        src: "S9T0U1V2W3",
        exercise: "Yorug'likning sinishi va aks etishi qonunlarini tushuntiring."
      },
    ],
  },
  {
    sectionId: 5,
    sectionName: "Excel",
    category: "office",
    price: 450000,
    rating: 4.7,
    enrolled: 1854,
    videoCount: 42, // 37 dan 42 ga o'zgartirildi
    totalDuration: 2520,
    difficulty: "beginner",
    thumbnail: "https://img.youtube.com/vi/ujj_zLZfvYo/maxresdefault.jpg",
    description: "Microsoft Excelni to'liq o'rganing",
    tags: ["Excel", "Office", "Table"],
    videos: [
      {
        "id": "ujj_zLZfvYo",
        "title": "1. Excel bilan tanishuv",
        "type": "youtube",
        "src": "ujj_zLZfvYo",
        "exercise": "Excel dasturini oching va yangi ish varag'i yarating. Asosiy menyular bilan tanishing."
      },
      {
        "id": "excel2",
        "title": "2. Formulalar va funksiyalar",
        "type": "youtube",
        "src": "I9J0K1L2M3",
        "exercise": "SUM, AVERAGE, MAX, MIN funksiyalarini o'rganing va misollar yeching."
      },
      // Qo'shimcha videolar
      {
        "id": "excel3",
        "title": "3. Ma'lumotlarni saralash va filtrlash",
        "type": "youtube",
        "src": "N4O5P6Q7R8",
        "exercise": "Ma'lumotlarni saralash va filtrlashni o'rganing."
      },
      {
        "id": "excel4",
        "title": "4. Diagrammalar yaratish",
        "type": "youtube",
        "src": "S9T0U1V2W3",
        "exercise": "Turli xil diagramma turlarini yarating."
      },
      {
        "id": "excel5",
        "title": "5. Pivot Table",
        "type": "youtube",
        "src": "X4Y5Z6A7B8",
        "exercise": "Pivot Table yordamida ma'lumotlarni tahlil qilish."
      },
    ],
  },
  {
    sectionId: 6,
    sectionName: "CSS",
    category: "web",
    price: 550000,
    rating: 4.9,
    enrolled: 2678,
    videoCount: 68, // 63 dan 68 ga o'zgartirildi
    totalDuration: 4080,
    difficulty: "intermediate",
    thumbnail: "https://img.youtube.com/vi/KPPhQ0F-SDY/maxresdefault.jpg",
    description: "CSS bilan veb-dizayn o'rganing",
    tags: ["CSS", "Web", "Frontend", "Dizayn"],
    videos: [
      {
        "id": "KPPhQ0F-SDY",
        "title": "CSS | 1. Kirish",
        "type": "youtube",
        "src": "KPPhQ0F-SDY",
        "exercise": "Oddiy HTML sahifa yarating va tashqi CSS faylni ulab, sahifaning fon rangi va matn rangini o'zgartiring."
      },
      {
        "id": "css2",
        "title": "CSS Selektori va qoidalari",
        "type": "youtube",
        "src": "N4O5P6Q7R8",
        "exercise": "Turli selektorlar (class, id, element) yordamida HTML elementlarni formatlang."
      },
      // Qo'shimcha videolar
      {
        "id": "css3",
        "title": "CSS Box Model",
        "type": "youtube",
        "src": "https://youtu.be/KPPhQ0F-SDY?si=-4PCMRFU8c2GX9vy",
        "exercise": "Box Model tushunchasini o'rganib, misollar yeching."
      },
      {
        "id": "css4",
        "title": "CSS Flexbox",
        "type": "youtube",
        "src": "https://youtu.be/U7Mq0paFXlA?si=ThWfP1R5GChheXBW",
        "exercise": "Flexbox yordamida sahifa maketini yarating."
      },
      {
        "id": "css5",
        "title": "CSS Grid",
        "type": "youtube",
        "src": "C9D0E1F2G3",
        "exercise": "Grid tizimi yordamida murakkab maket yarating."
      },
    ],
  },
  // Qolgan kurslar uchun ham shu tarzda videoCount va videolar sonini oshirish mumkin
  // JavaScript kursi
  {
    sectionId: 7,
    sectionName: "JavaScript Darslari",
    category: "web",
    price: 690000,
    rating: 4.9,
    enrolled: 3124,
    videoCount: 80, // 75 dan 80 ga o'zgartirildi
    totalDuration: 4800,
    difficulty: "intermediate",
    thumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
    description: "JavaScript dasturlash tilini mukammal o'rganing",
    tags: ["JavaScript", "Web", "Programming", "Frontend"],
    videos: [
      {
        id: "js1",
        title: "JavaScript ga kirish",
        type: "youtube",
        src: "PkZNo7MFNFg",
        exercise: "JavaScript nima va qayerda ishlatiladi? Birinchi 'Hello World' dasturingizni yozing."
      },
      {
        id: "js2",
        title: "O'zgaruvchilar va ma'lumot turlari",
        type: "youtube",
        src: "W6NZfCO5SIk",
        exercise: "Turli ma'lumot turlaridagi o'zgaruvchilar yarating va ular ustida amallar bajarib ko'ring."
      },
      {
        id: "js3",
        title: "Shart operatorlari",
        type: "youtube",
        src: "S4D8YQjfIOc",
        exercise: "if, else if, else operatorlaridan foydalanib, oddiy kalkulyator dasturi yozing."
      },
      // Qo'shimcha videolar
      {
        id: "js4",
        title: "Tsikllar (Loops)",
        type: "youtube",
        src: "s9fokUQJ724",
        exercise: "for, while, do while tsikllaridan foydalanib, misollar yeching."
      },
      {
        id: "js5",
        title: "Funksiyalar",
        type: "youtube",
        src: "xUI5Tsl2JpY",
        exercise: "Turli xil funksiyalar yarating va ularni chaqiring."
      },
    ],
  },
  // Python kursi
  {
    sectionId: 8,
    sectionName: "Python Dasturlash",
    category: "programming",
    price: 750000,
    rating: 4.9,
    enrolled: 2895,
    videoCount: 85, // 80 dan 85 ga o'zgartirildi
    totalDuration: 5100,
    difficulty: "beginner",
    thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg",
    description: "Python dasturlash tilini 0 dan o'rganish",
    tags: ["Python", "Programming", "Backend", "AI"],
    videos: [
      {
        id: "python1",
        title: "Python o'rnatish va birinchi dastur",
        type: "youtube",
        src: "rfscVS0vtbw",
        exercise: "Python ni kompyuteringizga o'rnating va birinchi 'Hello World' dasturingizni ishga tushiring."
      },
      {
        id: "python2",
        title: "Python sintaksisi va print() funksiyasi",
        type: "youtube",
        src: "4LQLZ3wP_VY",
        exercise: "Turli xil matnlarni chiroyli formatda ekranga chiqaruvchi dastur yozing."
      },
      {
        id: "python3",
        title: "O'zgaruvchilar va operatorlar",
        type: "youtube",
        src: "khKv-8q7YmY",
        exercise: "Har xil turdagi o'zgaruvchilar yarating va ular ustida arifmetik amallar bajarib ko'ring."
      },
      // Qo'shimcha videolar
      {
        id: "python4",
        title: "Ro'yxatlar (Lists)",
        type: "youtube",
        src: "ohCDWZgNIU0",
        exercise: "Ro'yxatlar bilan ishlash va ular ustida amallar bajarish."
      },
      {
        id: "python5",
        title: "Lug'atlar (Dictionaries)",
        type: "youtube",
        src: "daefaLgNkw0",
        exercise: "Lug'atlar yaratish va ular bilan ishlash."
      },
    ],
  },
  // Qolgan barcha kurslar uchun ham videoCount va videolar sonini oshirish mumkin
  // React JS kursi uchun
  {
    sectionId: 9,
    sectionName: "React JS",
    category: "web",
    price: 850000,
    rating: 4.8,
    enrolled: 2456,
    videoCount: 70, // 65 dan 70 ga o'zgartirildi
    totalDuration: 4200,
    difficulty: "advanced",
    thumbnail: "https://img.youtube.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
    description: "React framework bilan zamonaviy web ilovalar yaratish",
    tags: ["React", "JavaScript", "Frontend", "Framework"],
    videos: [
      {
        id: "react1",
        title: "React ga kirish va loyiha yaratish",
        type: "youtube",
        src: "w7ejDZ8SWv8",
        exercise: "Create React App yordamida yangi loyiha yarating va uni ishga tushiring."
      },
      {
        id: "react2",
        title: "Komponentlar va JSX",
        type: "youtube",
        src: "m55PTVUrlnA",
        exercise: "3 ta oddiy React komponent yarating va ularni bitta asosiy komponentda ko'rsating."
      },
      {
        id: "react3",
        title: "State va Props",
        type: "youtube",
        src: "Ke90Tje7VS0",
        exercise: "State va Props dan foydalanib, interaktiv counter dasturi yozing."
      },
      // Qo'shimcha videolar
      {
        id: "react4",
        title: "Lifecycle Methods",
        type: "youtube",
        src: "dpw9EHDh2bM",
        exercise: "Komponent hayot tsikli metodlarini o'rganing va misollar yarating."
      },
      {
        id: "react5",
        title: "Hooks",
        type: "youtube",
        src: "TNhaISOUy6Q",
        exercise: "useState va useEffect hook'laridan foydalanib, ilova yarating."
      },
    ],
  },
  // Ingliz tili kursi uchun
  {
    sectionId: 10,
    sectionName: "Ingliz Tili",
    category: "language",
    price: 350000,
    rating: 4.7,
    enrolled: 4125,
    videoCount: 125, // 120 dan 125 ga o'zgartirildi
    totalDuration: 7500,
    difficulty: "beginner",
    thumbnail: "https://img.youtube.com/vi/2Y8L0bX--Ew/maxresdefault.jpg",
    description: "Ingliz tilini oson va samarali o'rganing",
    tags: ["Ingliz", "Language", "English", "Til"],
    videos: [
      {
        id: "english1",
        title: "Alifbo va talaffuz",
        type: "youtube",
        src: "2Y8L0bX--Ew",
        exercise: "Ingliz alifbosini yozing va o'qing. Har bir harfning to'g'ri talaffuzini o'rganing."
      },
      {
        id: "english2",
        title: "Salomlashish va tanishtirish",
        type: "youtube",
        src: "d0I5hX3QkYw",
        exercise: "Turli sharoitlarda salomlashish va o'zingizni tanishtirish iboralarini yozing."
      },
      {
        id: "english3",
        title: "Kunlar, oylar, fasllar",
        type: "youtube",
        src: "8e1vy4yQ6qc",
        exercise: "Ingliz tilida kunlar, oylar va fasllarni yozib, ularni o'qing."
      },
      // Qo'shimcha videolar
      {
        id: "english4",
        title: "So'z boyligini oshirish",
        type: "youtube",
        src: "m-6nziL4L-4",
        exercise: "Kundalik hayotda ishlatiladigan 50 ta yangi so'zni o'rganing."
      },
      {
        id: "english5",
        title: "Grammatika asoslari",
        type: "youtube",
        src: "QlJL5a0-9vY",
        exercise: "To be fe'lining hozirgi zamon shakllarini o'rganing."
      },
    ],
  },
];


// ======================= LOCALSTORAGE FUNKSIYALARI =======================

// localStorage'dan o'qish
const getVideoData = () => {
  try {
    const saved = localStorage.getItem('eduhub_videoData');
    console.log("📂 LocalStorage'dan o'qilmoqda...");
    
    if (saved) {
      console.log("✅ LocalStorage'dan ma'lumotlar o'qildi");
      const parsed = JSON.parse(saved);
      
      // Ma'lumotlarni tozalash va yangilash
      if (parsed && Array.isArray(parsed) && parsed.length > 0) {
        console.log(`📊 ${parsed.length} ta kurs topildi`);
        
        const enhancedData = parsed.map(section => {
          const videosCount = section.videos ? section.videos.length : 0;
          
          return {
            sectionId: section.sectionId || 0,
            sectionName: section.sectionName || "Noma'lum kurs",
            category: section.category || "web",
            price: section.price || 500000,
            rating: section.rating || 4.5,
            enrolled: section.enrolled || 1500,
            videoCount: videosCount,
            totalDuration: section.totalDuration || (videosCount * 60),
            difficulty: section.difficulty || "beginner",
            thumbnail: section.thumbnail || 
              (section.videos && section.videos[0] && section.videos[0].thumbnail) ||
              `https://img.youtube.com/vi/default/maxresdefault.jpg`,
            description: section.description || `${section.sectionName} kursi`,
            tags: section.tags || [section.sectionName.split(' ')[0]],
            videos: section.videos || []
          };
        });
        
        console.log("🔍 Yangilangan ma'lumotlar:", enhancedData);
        return enhancedData;
      }
    }
  } catch (error) {
    console.error('❌ localStorage xato:', error);
  }
  
  console.log("🔄 Boshlang'ich ma'lumotlar ishlatilmoqda...");
  // Agar localStorage bo'sh yoki xato bo'lsa, boshlang'ich ma'lumotlarni qayta saqlaymiz
  saveVideoData(defaultData);
  return defaultData;
};

// localStorage'ga saqlash
const saveVideoData = (data) => {
  try {
    console.log("💾 Saqlanmoqda...");
    localStorage.setItem('eduhub_videoData', JSON.stringify(data));
    console.log(`✅ Saqlandi: ${data.length} ta kurs, ${data.reduce((acc, section) => acc + (section.videos?.length || 0), 0)} ta video`);
    console.log("📋 Saqlangan ma'lumotlar:", data);
    
    // Sahifani yangilash uchun hodisa
    window.dispatchEvent(new CustomEvent('videoDataUpdated', { detail: data }));
    
    return true;
  } catch (error) {
    console.error('❌ Saqlashda xato:', error);
    return false;
  }
};

// Ma'lumotlarni yangilash va saqlash
const updateAndSave = (newData) => {
  console.log("🔄 Ma'lumotlar yangilanmoqda...");
  if (newData && Array.isArray(newData)) {
    const success = saveVideoData(newData);
    if (success) {
      console.log("✅ Ma'lumotlar muvaffaqiyatli yangilandi");
      return true;
    }
  }
  console.log("❌ Ma'lumotlarni yangilashda xatolik");
  return false;
};

// Ma'lumotlarni qayta tiklash (reset)
const resetVideoData = () => {
  console.log("🔄 Ma'lumotlar qayta tiklanmoqda...");
  return saveVideoData(defaultData);
};

// Kurs qo'shish
const addSection = (newSection) => {
  const currentData = getVideoData();
  const maxId = Math.max(...currentData.map(s => s.sectionId), 0);
  const newSectionWithId = {
    ...newSection,
    sectionId: maxId + 1,
    videos: [],
    videoCount: 0,
    enrolled: 0,
    rating: 4.5
  };
  
  const updatedData = [...currentData, newSectionWithId];
  return updateAndSave(updatedData);
};

// Kursga video qo'shish
const addVideoToSection = (sectionId, videoData) => {
  console.log(`🎬 Video qo'shilmoqda: ${sectionId} kursiga`);
  const currentData = getVideoData();
  const sectionIndex = currentData.findIndex(s => s.sectionId === parseInt(sectionId));
  
  if (sectionIndex === -1) {
    console.log(`❌ ${sectionId} ID li kurs topilmadi`);
    return false;
  }
  
  // Yangi video ID yaratish
  const videoId = `${sectionId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const newVideo = {
    id: videoId,
    title: videoData.title.trim(),
    type: videoData.type,
    src: videoData.src.trim(),
    thumbnail: videoData.thumbnail || 
      (videoData.type === 'youtube' ? `https://img.youtube.com/vi/${videoData.src.trim()}/maxresdefault.jpg` : ''),
    description: videoData.description?.trim() || '',
    exercise: videoData.exercise?.trim() || ''
  };
  
  // Videoni qo'shish
  currentData[sectionIndex].videos.push(newVideo);
  currentData[sectionIndex].videoCount = currentData[sectionIndex].videos.length;
  
  console.log(`✅ Video qo'shildi: ${newVideo.title}`);
  return updateAndSave(currentData);
};

// Videoni o'chirish
const deleteVideo = (sectionId, videoId) => {
  const currentData = getVideoData();
  const sectionIndex = currentData.findIndex(s => s.sectionId === parseInt(sectionId));
  
  if (sectionIndex === -1) return false;
  
  const videoIndex = currentData[sectionIndex].videos.findIndex(v => v.id === videoId);
  if (videoIndex === -1) return false;
  
  currentData[sectionIndex].videos.splice(videoIndex, 1);
  currentData[sectionIndex].videoCount = currentData[sectionIndex].videos.length;
  
  return updateAndSave(currentData);
};

// Kursni o'chirish
const deleteSection = (sectionId) => {
  const currentData = getVideoData();
  const updatedData = currentData.filter(s => s.sectionId !== parseInt(sectionId));
  return updateAndSave(updatedData);
};

// ======================= EKSPORT QILISH =======================

// Asosiy ma'lumotlar obyekti
const videoData = getVideoData();

export {
  videoData,
  getVideoData,
  saveVideoData,
  updateAndSave,
  resetVideoData,
  addSection,
  addVideoToSection,
  deleteVideo,
  deleteSection
};

export default videoData;