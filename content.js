/*
IMPORTANT:
Replace placeholders only with verified content from the official Malaysian Year 1 Chinese textbook, Units 1–5.
Every visible learning record must include Simplified Chinese, Hanyu Pinyin and Bahasa Melayu.
*/
window.QUEST_HANYU_CONTENT = {
  worlds: [
    {unit:1, icon:"🏘️", hanzi:"熊猫村", pinyin:"Xióngmāo Cūn", malay:"Kampung Panda", crystal:"Hijau"},
    {unit:2, icon:"🎋", hanzi:"竹林", pinyin:"Zhúlín", malay:"Hutan Buluh", crystal:"Biru"},
    {unit:3, icon:"🌉", hanzi:"云桥", pinyin:"Yún Qiáo", malay:"Jambatan Awan", crystal:"Merah"},
    {unit:4, icon:"🏮", hanzi:"灯笼宫", pinyin:"Dēnglóng Gōng", malay:"Istana Tanglung", crystal:"Ungu"},
    {unit:5, icon:"🐉", hanzi:"龙山", pinyin:"Lóng Shān", malay:"Gunung Naga", crystal:"Emas"}
  ],
  units: {
    1: {
      story: [
        {image:"🐼🏘️", hanzi:"[故事句子 1]", pinyin:"[pīnyīn]", malay:"[Terjemahan Bahasa Melayu]", audio:""},
        {image:"🦉💎", hanzi:"[故事句子 2]", pinyin:"[pīnyīn]", malay:"[Terjemahan Bahasa Melayu]", audio:""}
      ],
      activities: [
        {
          id:"U01-V001", type:"choice", skill:"vocabulary",
          hanzi:"[汉字]", pinyin:"[pīnyīn]", malay:"[Maksud Bahasa Melayu]",
          options:["[Pilihan A]","[Pilihan B]","[Pilihan C]"], correct:0, hint:"[Petunjuk]", audio:""
        },
        {
          id:"U01-L001", type:"choice", skill:"listening",
          hanzi:"[听一听]", pinyin:"[tīng yī tīng]", malay:"[Dengar dan pilih]",
          options:["[Pilihan A]","[Pilihan B]","[Pilihan C]"], correct:1, hint:"[Petunjuk]", audio:""
        },
        {
          id:"U01-M001", type:"matching", skill:"reading",
          hanzi:"配一配", pinyin:"pèi yí pèi", malay:"Padankan",
          pairs:[
            {left:"[汉字 A]",right:"[Maksud A]"},
            {left:"[汉字 B]",right:"[Maksud B]"},
            {left:"[汉字 C]",right:"[Maksud C]"}
          ]
        },
        {
          id:"U01-S001", type:"sentence", skill:"writing",
          hanzi:"排一排", pinyin:"pái yì pái", malay:"Susun ayat",
          parts:["[Bahagian 1]","[Bahagian 2]","[Bahagian 3]"],
          correctOrder:[0,1,2],
          fullHanzi:"[完整句子]", fullPinyin:"[pīnyīn]", fullMalay:"[Terjemahan Bahasa Melayu]"
        }
      ],
      boss: [
        {
          id:"U01-B001", type:"choice", skill:"assessment",
          hanzi:"[挑战问题]", pinyin:"[pīnyīn]", malay:"[Soalan cabaran]",
          options:["[Pilihan A]","[Pilihan B]","[Pilihan C]"], correct:0, hint:"[Petunjuk]", audio:""
        }
      ]
    },
    2:{story:[],activities:[],boss:[]},
    3:{story:[],activities:[],boss:[]},
    4:{story:[],activities:[],boss:[]},
    5:{story:[],activities:[],boss:[]}
  }
};