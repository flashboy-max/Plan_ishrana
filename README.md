# 🥑 28-Dnevni Keto Transformacijski Plan

> **Interaktivni dashboard za kompletnu keto transformaciju sa IF 18/6 protokolom**

## 🌟 **Live Demo**
📱 **[Posetite aplikaciju ovde](https://flashboy-max.github.io/Plan_ishrana/)**

---

## 📋 **Šta je ovo?**

Kompletan **28-dnevni ketogenski plan ishrane** sa integrisanim **Intermittent Fasting 18/6 protokolom**, predstavljen kroz moderan, interaktivni web dashboard. 

### ✨ **Ključne karakteristike:**

🎯 **Kompletno rešenje:**
- 28 dana strukturiranog keto plana
- Detaljni recepti sa macro kalkulacijama
- Strategija suplementacije
- Trening smernice
- Progres tracking

⚡ **Interaktivne funkcionalnosti:**
- **Real-time IF timer** - praćenje 18/6 ciklusa
- **Progress bar** - vizuelni prikaz napretka kroz plan  
- **Dnevni checklist** - sa localStorage persistensom
- **Modal obroci** - detaljni prikaz recepta
- **Tooltip suplemeneti** - informacije o dozama i timing-u
- **Accordion navigacija** - lako prebacivanje između sedmica

🎨 **Moderan UI/UX:**
- Responzivni dizajn (Tailwind CSS)
- Dark theme optimizovan
- Smooth animacije i transitions
- Intuitivna navigacija

---

## 🏗️ **Tehnička arhitektura**

### 📁 **Struktura projekta:**
```
Plan_Ishrana/
├── index.html              # Glavni dashboard (382 linije)
├── assets/
│   ├── css/
│   │   └── styles.css       # Kompletni stilovi
│   ├── data/
│   │   ├── supplements.js   # Podaci o suplementima
│   │   ├── meals.js         # Recepti i obroci  
│   │   └── planData.js      # Plan struktura
│   └── js/
│       ├── main.js         # Glavna logika
│       ├── tooltip.js      # Tooltip sistem
│       ├── modal.js        # Modal funkcionalnost
│       ├── progress.js     # Progress tracking
│       ├── checklist.js    # Checklist sa localStorage
│       └── ifTimer.js      # IF timer funkcionalnost
└── Slike/                  # Progress foto assets
```

### 💻 **Tech Stack:**
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Tailwind CSS, Custom CSS
- **Icons**: Font Awesome 6
- **Data**: JSON strukture, localStorage API
- **Architecture**: Modular ES6+ JavaScript

### 🔧 **Principi koda:**
- **Modularnost**: Razdvojeni concerns u logičke celine
- **Event Delegation**: Optimizovano event handling
- **Null Safety**: Defensive programming protiv undefined
- **Clean Code**: Čitljiv, maintainable kod
- **Performance**: Optimizovane DOM manipulacije

---

## 🚀 **Deployment**

Aplikacija je deployed na **GitHub Pages** i dostupna na:  
**https://flashboy-max.github.io/Plan_ishrana/**

### 🔄 **Development workflow:**
```bash
# Clone repository
git clone https://github.com/flashboy-max/Plan_ishrana.git

# Navigate to project
cd Plan_ishrana

# Open in browser
start index.html  # Windows
open index.html   # macOS
```

---

## 📊 **Funkcionalnosti u detaljу**

### ⏰ **IF Timer (18/6 Protocol)**
- Real-time countdown do sledećeg obroka
- Vizuelni prikaz eating/fasting window-a  
- Automatsko resetovanje na dnevnom nivou
- Notifikacije za početak/kraj periode

### ✅ **Dnevni Checklist**
- Personalizovani zadaci za svaki dan
- localStorage persistenst - progres se čuva
- One-click complete/undo funkcionalnost
- Visual feedback sa checkmark animacijama

### 🍽️ **Modal Obroci**
- Detaljni recepti sa ingredijentima
- Macro breakdown (proteini, masti, ketoni)
- Cooking instructions korak-po-korak
- Nutritivne informacije i tips

### 💊 **Tooltip Suplemenati**
- Hover informacije za svaki suplement
- Doziranje, timing, i benefit objašnjenja
- Prioritet označavanje (esencijalni vs opciono)
- Quick reference bez napuštanja stranice

### 📈 **Progress Tracking**
- Visual progress bar kroz 28 dana
- Trenutni dan highlighting
- Sedmična organizacija sa accordion-om
- Motivacijski milestones

---

## 🎯 **Plan Overview**

### 📅 **28-dnevni timeline:**
- **Sedmica 1**: Keto adaptacija i detox
- **Sedmica 2**: Stabilizacija ketoze
- **Sedmica 3**: Optimizacija i fine-tuning
- **Sedmica 4**: Konsolidacija navika

### 🥘 **Nutritivni fokus:**
- **Macro ratio**: 75% masti, 20% proteini, 5% ugljeni hidrati
- **IF protokol**: 18 sati fast, 6 sati eating window
- **Hidratacija**: 3L+ vode dnevno sa elektrolitima
- **Suplementacija**: Targeted support za ketosis

### 💪 **Fitness integracija:**
- Strength training protokol
- Cardio timing optimizovan za fat burn
- Recovery strategije
- Progress foto guidelines

---

## 🔮 **Roadmap (FAZA 2)**

### 🎯 **Planirane funkcionalnosti:**
- [ ] **Meal Planning Calendar** - drag & drop meal scheduling
- [ ] **Macro Calculator** - custom meal creation
- [ ] **Photo Progress Gallery** - before/after tracking
- [ ] **Export/Share** - PDF izveštaji
- [ ] **Mobile App** - PWA conversion
- [ ] **Community Features** - korisničke grupe
- [ ] **Analytics Dashboard** - advanced metrics

---

## 👨‍💻 **Autor**

**flashboy-max** - *Full-stack developer & Health optimization enthusiast*

- GitHub: [@flashboy-max](https://github.com/flashboy-max)
- Project: [Plan_ishrana](https://github.com/flashboy-max/Plan_ishrana)

---

## 📄 **Licenca**

Ovaj projekat je open-source i dostupan za edukacijske svrhe.

---

## 💖 **Podrška**

Ako vam je ovaj plan bio koristan:
- ⭐ **Star** ovaj repo
- 🍴 **Fork** za svoje potrebe  
- 📤 **Share** sa prijateljima
- 🐛 **Report** issues ili bugs

---

*Created with ❤️ for keto transformation community*
