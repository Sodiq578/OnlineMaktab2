// src/data/videos.js

// Boshlang'ich ma'lumotlar
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
        id: "yt_word3",
        title: "Word Darsi 1",
        type: "youtube",
        src: "mvPnHzSspG0",
        thumbnail: "https://img.youtube.com/vi/mvPnHzSspG0/maxresdefault.jpg",
        description: "Word dasturiga kirish va asosiy funksiyalar bilan tanishuv.",
      },
      {
        id: "yt_word4",
        title: "Word Darsi 2",
        type: "youtube",
        src: "jwzv0qnSjFg",
        thumbnail: "https://img.youtube.com/vi/jwzv0qnSjFg/maxresdefault.jpg",
        description: "Matn formatlash va paragraf sozlamalarini o'rganish.",
      },
      // ... qolgan Word videolari (qisqartirildi)
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
      // ... qolgan Matematika videolari (qisqartirildi)
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
      // ... qolgan Fizika videolari (qisqartirildi)
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
      // ... qolgan Excel videolari (qisqartirildi)
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
      // ... qolgan CSS videolari (qisqartirildi)
    ],
  }
];

// localStorage dan o'qish
const getVideoData = () => {
  try {
    const saved = localStorage.getItem('eduhub_videoData');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ma'lumotlarni yangilash: eski ma'lumotlarga yangi field'lar qo'shish
      if (parsed && parsed.length > 0) {
        return parsed.map(section => ({
          ...section,
          category: section.category || "web",
          price: section.price || 500000,
          rating: section.rating || 4.5,
          enrolled: section.enrolled || 1500,
          videoCount: section.videos ? section.videos.length : 0,
          totalDuration: section.totalDuration || (section.videos ? section.videos.length * 60 : 0),
          difficulty: section.difficulty || "beginner",
          thumbnail: section.thumbnail || (section.videos && section.videos[0] ? 
            `https://img.youtube.com/vi/${section.videos[0].src}/maxresdefault.jpg` : 
            "https://picsum.photos/400/250"),
          description: section.description || `${section.sectionName} kursi`,
          tags: section.tags || [section.sectionName.split(' ')[0]]
        }));
      }
    }
  } catch (e) {
    console.error('localStorage xato:', e);
  }
  
  // Agar localStorage bo'sh yoki xato bo'lsa, defaultData'ni saqlaymiz
  localStorage.setItem('eduhub_videoData', JSON.stringify(defaultData));
  return defaultData;
};

// Saqlash funksiyasi
const saveVideoData = (data) => {
  try {
    localStorage.setItem('eduhub_videoData', JSON.stringify(data));
  } catch (e) {
    console.error('Saqlashda xato:', e);
  }
};

// Ma'lumotlar obyekti
const videoData = getVideoData();

// Yangilash va saqlash funksiyasi
const updateAndSave = (newData) => {
  if (newData && Array.isArray(newData)) {
    videoData.length = 0;
    videoData.push(...newData);
    saveVideoData(newData);
  }
};

// Export qilish - MUXIM!
export { videoData, updateAndSave };
export default videoData;


