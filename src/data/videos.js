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
    videoCount: 29,
    totalDuration: 1740,
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
    ],
  },
  {
    sectionId: 2,
    sectionName: "Word Darslari",
    category: "office",
    price: 390000,
    rating: 4.8,
    enrolled: 1923,
    videoCount: 40,
    totalDuration: 2400,
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
    ],
  },
  {
    sectionId: 3,
    sectionName: "Matematika",
    category: "mathematics",
    price: 590000,
    rating: 4.9,
    enrolled: 3245,
    videoCount: 43,
    totalDuration: 2580,
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
    ],
  },
  {
    sectionId: 4,
    sectionName: "Fizika",
    category: "science",
    price: 590000,
    rating: 4.8,
    enrolled: 2156,
    videoCount: 68,
    totalDuration: 4080,
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
    ],
  },
  {
    sectionId: 5,
    sectionName: "Excel",
    category: "office",
    price: 450000,
    rating: 4.7,
    enrolled: 1854,
    videoCount: 37,
    totalDuration: 2220,
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
    ],
  },
  {
    sectionId: 6,
    sectionName: "CSS",
    category: "web",
    price: 550000,
    rating: 4.9,
    enrolled: 2678,
    videoCount: 63,
    totalDuration: 3780,
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
    ],
  },
  // YANGI KURSLAR QO'SHILDI
  {
    sectionId: 7,
    sectionName: "JavaScript Darslari",
    category: "web",
    price: 690000,
    rating: 4.9,
    enrolled: 3124,
    videoCount: 75,
    totalDuration: 4500,
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
    ],
  },
  {
    sectionId: 8,
    sectionName: "Python Dasturlash",
    category: "programming",
    price: 750000,
    rating: 4.9,
    enrolled: 2895,
    videoCount: 80,
    totalDuration: 4800,
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
    ],
  },
  {
    sectionId: 9,
    sectionName: "React JS",
    category: "web",
    price: 850000,
    rating: 4.8,
    enrolled: 2456,
    videoCount: 65,
    totalDuration: 3900,
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
    ],
  },
  {
    sectionId: 10,
    sectionName: "Ingliz Tili",
    category: "language",
    price: 350000,
    rating: 4.7,
    enrolled: 4125,
    videoCount: 120,
    totalDuration: 7200,
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
    ],
  },
  {
    sectionId: 11,
    sectionName: "Rus Tili",
    category: "language",
    price: 320000,
    rating: 4.6,
    enrolled: 2874,
    videoCount: 95,
    totalDuration: 5700,
    difficulty: "beginner",
    thumbnail: "https://img.youtube.com/vi/e5NR9pC1Qp0/maxresdefault.jpg",
    description: "Rus tilini boshlang'ich darajadan o'rganish",
    tags: ["Rus", "Language", "Russian", "Til"],
    videos: [
      {
        id: "russian1",
        title: "Rus alifbosi (Kirill)",
        type: "youtube",
        src: "e5NR9pC1Qp0",
        exercise: "Rus alifbosini (Kirill) yozib, har bir harfning to'g'ri talaffuzini o'rganing."
      },
      {
        id: "russian2",
        title: "Oddiy gaplar tuzish",
        type: "youtube",
        src: "V1q7U1UaR_c",
        exercise: "Rus tilida 10 ta oddiy gap tuzing va ularni o'qing."
      },
      {
        id: "russian3",
        title: "Suhbat boshlash",
        type: "youtube",
        src: "zL4vC2JBDHU",
        exercise: "Rus tilida suhbat boshlash uchun zarur bo'lgan asosiy iboralarni yozing."
      },
    ],
  },
  {
    sectionId: 12,
    sectionName: "Kimyo",
    category: "science",
    price: 520000,
    rating: 4.7,
    enrolled: 1987,
    videoCount: 55,
    totalDuration: 3300,
    difficulty: "intermediate",
    thumbnail: "https://img.youtube.com/vi/fd5t7C_ZC0w/maxresdefault.jpg",
    description: "Kimyo fanini tushunish va amaliyot",
    tags: ["Kimyo", "Science", "Chemistry"],
    videos: [
      {
        id: "kimyo1",
        title: "Kimyo faniga kirish",
        type: "youtube",
        src: "fd5t7C_ZC0w",
        exercise: "Kimyo nima va hayotimizda qanday ahamiyatga ega? 5 ta misol keltiring."
      },
      {
        id: "kimyo2",
        title: "Kimyoviy elementlar",
        type: "youtube",
        src: "LQj--Kjn0z8",
        exercise: "D.Mendeleyev davriy sistemasidan 20 ta elementni yozib, ularning xossalari haqida ma'lumot yozing."
      },
      {
        id: "kimyo3",
        title: "Molekula va atom",
        type: "youtube",
        src: "cnV2pYqyWpY",
        exercise: "Atom va molekula tushunchalarini tushuntiring va ularning o'rtasidagi farqni yozing."
      },
    ],
  },
  {
    sectionId: 13,
    sectionName: "Biologiya",
    category: "science",
    price: 480000,
    rating: 4.6,
    enrolled: 1745,
    videoCount: 60,
    totalDuration: 3600,
    difficulty: "beginner",
    thumbnail: "https://img.youtube.com/vi/9fmVqZ3hK6c/maxresdefault.jpg",
    description: "Tirik organizmlar va ularning hayot faoliyati",
    tags: ["Biologiya", "Science", "Biology"],
    videos: [
      {
        id: "biology1",
        title: "Biologiya faniga kirish",
        type: "youtube",
        src: "9fmVqZ3hK6c",
        exercise: "Biologiya nima va qanday bo'limlarga bo'linadi? Har bir bo'lim haqida qisqacha ma'lumot bering."
      },
      {
        id: "biology2",
        title: "Hujayra - hayotning asosiy birligi",
        type: "youtube",
        src: "URUJD5NEXC8",
        exercise: "Hujayra tuzilishini chizing va uning asosiy qismlarini nomlang."
      },
      {
        id: "biology3",
        title: "O'simliklar dunyosi",
        type: "youtube",
        src: "2JgBLc2WbQ4",
        exercise: "Atrofdagi 10 turdagi o'simliklarni yozing va ularning asosiy xususiyatlarini tushuntiring."
      },
    ],
  },
  {
    sectionId: 14,
    sectionName: "Grafik Dizayn",
    category: "design",
    price: 650000,
    rating: 4.8,
    enrolled: 2265,
    videoCount: 70,
    totalDuration: 4200,
    difficulty: "intermediate",
    thumbnail: "https://img.youtube.com/vi/IY9l6jF1Dss/maxresdefault.jpg",
    description: "Photoshop va Illustrator bilan grafik dizayn",
    tags: ["Design", "Grafika", "Photoshop", "Illustrator"],
    videos: [
      {
        id: "design1",
        title: "Photoshop bilan tanishuv",
        type: "youtube",
        src: "IY9l6jF1Dss",
        exercise: "Photoshop dasturini oching va asosiy tool'lar bilan tanishing. Oddiy rasm ochib ko'ring."
      },
      {
        id: "design2",
        title: "Ranglar va gradientlar",
        type: "youtube",
        src: "WX-aXv9_yzo",
        exercise: "Photoshop da yangi fayl ochib, turli ranglar va gradientlar yordamida oddiy kompozitsiya yarating."
      },
      {
        id: "design3",
        title: "Matn va effektlar",
        type: "youtube",
        src: "7T9Yl9hGX8Q",
        exercise: "Photoshop da matn tool'idan foydalanib, turli shriflarda matnlar yozing va ularga effektlar qo'shing."
      },
    ],
  },
  {
    sectionId: 15,
    sectionName: "3D Modellyash",
    category: "design",
    price: 780000,
    rating: 4.7,
    enrolled: 1678,
    videoCount: 85,
    totalDuration: 5100,
    difficulty: "advanced",
    thumbnail: "https://img.youtube.com/vi/WhWc3b3KhnY/maxresdefault.jpg",
    description: "Blender dasturi bilan 3D modellar yaratish",
    tags: ["3D", "Blender", "Modeling", "Design"],
    videos: [
      {
        id: "3d1",
        title: "Blender o'rnatish va interfeys",
        type: "youtube",
        src: "WhWc3b3KhnY",
        exercise: "Blender dasturini o'rnating va asosiy interfeys elementlari bilan tanishing."
      },
      {
        id: "3d2",
        title: "Oddiy shakllar yaratish",
        type: "youtube",
        src: "nyZG6vA6doI",
        exercise: "Blender da kub, sfera, silindr kabi oddiy 3D shakllar yarating."
      },
      {
        id: "3d3",
        title: "Modifikatorlar",
        type: "youtube",
        src: "w5wK9QswNRo",
        exercise: "Subdivision Surface, Bevel, Array kabi modifikatorlarni o'rganib, oddiy model yarating."
      },
    ],
  },
  {
    sectionId: 16,
    sectionName: "Mobile Dasturlash",
    category: "programming",
    price: 820000,
    rating: 4.9,
    enrolled: 2345,
    videoCount: 90,
    totalDuration: 5400,
    difficulty: "advanced",
    thumbnail: "https://img.youtube.com/vi/fis26HvvDII/maxresdefault.jpg",
    description: "Android va iOS uchun mobile ilovalar yaratish",
    tags: ["Mobile", "Android", "iOS", "Flutter", "React Native"],
    videos: [
      {
        id: "mobile1",
        title: "Mobile dasturlashga kirish",
        type: "youtube",
        src: "fis26HvvDII",
        exercise: "Mobile dasturlash turlari haqida ma'lumot to'plang va ularning afzalliklari/kamchiliklarini solishtiring."
      },
      {
        id: "mobile2",
        title: "Flutter bilan tanishuv",
        type: "youtube",
        src: "1gDhl4leEzA",
        exercise: "Flutter ni o'rnating va Hello World mobile ilovani yarating."
      },
      {
        id: "mobile3",
        title: "Widgetlar va UI",
        type: "youtube",
        src: "x0uinJZCn-A",
        exercise: "Flutter da turli widgetlar yordamida oddiy UI interfeys yarating."
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