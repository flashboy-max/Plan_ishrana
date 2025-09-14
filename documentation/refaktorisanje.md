# 🚀 **REFAKTORISANJE PROJEKTA - Kompletna Reorganizacija**

*Content-First Arhitektura za Modularni, Skalabilni Sistem*

---

## 📋 **Pregled - Zašto Refaktorišemo?**

### **Trenutni Problemi:**
- ❌ **Hibridni sistem**: Stari monolitni kod + novi modularni = konflikti
- ❌ **CSS haos**: Stilovi se ne primjenjuju konzistentno
- ❌ **Podaci se učitavaju kasno**: Race condition problemi
- ❌ **main.js pretrpan**: 1000+ linija, sve u jednom fajlu
- ❌ **Nema jasne strukture**: Teško održavanje i dalji razvoj

### **Ciljevi Refaktorisanja:**
- ✅ **Modularna arhitektura**: 3 jasno odvojena sloja
- ✅ **Content-First pristup**: Podaci diktiraju kod
- ✅ **Čist CSS**: Bez konflikata, responzivan
- ✅ **Skalabilnost**: Lako dodavanje novih funkcionalnosti
- ✅ **Održivost**: Jednostavno---

## 🛡️ **BEZBEDNA STRATEGIJA IMPLEMENTACIJE**

### **PREPORUČENI PRISTUP: OPCIJA 1 - Git Branch (WIN-WIN!)**

**✅ Zašto Git Branch?**
- 🛡️ **Bezbedno kao backup** - main branch ostaje netaknut
- 👨‍💻 **Profesionalno kao development** - standardni workflow
- 🧪 **Fleksibilno za testiranje** - možeš se prebacivati između verzija
- 🚀 **Čisto za finalno deployovanje** - kontrolišeš kad spâjaš u main

### **🔧 Git Workflow za Refactoring:**

```bash
# 1. Kreiraj bezbedni branch za refactoring
git checkout -b refactor/modular-architecture
git push -u origin refactor/modular-architecture

# 2. Napravi checkpoint pre početka
git add .
git commit -m "📸 Pre-refactor checkpoint - current working state"
git push

# 3. Radi Dan 1 aktivnosti (documentation, data layer)
# ... refactoring activities ...

# 4. Commit posle svakog dana
git add .
git commit -m "✅ Dan 1 complete: Data Layer + Documentation"
git push

# 5. Na kraju - merge u main kad je sve testirano
git checkout main
git merge refactor/modular-architecture
git push
```

### **🔥 Checkpoint Strategy:**
```bash
# Pre svakog Dana - napravi safety checkpoint
git add .
git commit -m "📍 Pre Dan 2: Core Components"

# Ako nešto pođe po zlu - easy rollback
git reset --hard HEAD~1  # Vrati na početak Dana
```

---

### **Ready to Launch?** 🎯

**Da krenemo sa Dan 1 implementacijom ili imaš dodatna pitanja o planu?**

**Sledeći korak: Kreiranje `documentation/` foldera i početak Data Layer refactora! 🏗️**iranje i debugging

---

## 🏗️ **Nova Arhitektura - 3 Sloja**

### **1. Sloj Podataka (Data Layer)**
**Lokacija:** `assets/data/`
**Odgovornost:** Centralizovani podaci, učitavaju se prvi

```
assets/data/
├── supplementsData.js    # SVI suplementi (jedini izvor istine)
├── trainingData.js       # 28-dnevni trening plan
├── mealsData.js          # Keto obroci i alternative
├── planData.js           # Opšti podaci o danima
└── userData.js           # Korisnička podešavanja
```

### **2. Sloj Komponenti (Component Layer)**
**Lokacija:** `assets/js/components/`
**Odgovornost:** Nezavisne UI komponente

```
assets/js/components/
├── SupplementManager.js   # Glavni menadžer suplemenata
├── SupplementCard.js      # Kartica za jedan suplement
├── TrainingManager.js     # Menadžer treninga
├── TrainingCard.js        # Kartica za jedan trening
├── MealManager.js         # Menadžer obroka
├── MealCard.js            # Kartica za jedan obrok
├── Checklist.js           # Dnevni checklist
├── IFTimer.js             # IF timer komponenta
├── DataManager.js         # Upravljanje podacima
└── EventHandler.js        # Globalni event handler
```

### **3. Aplikativni Sloj (App Layer)**
**Lokacija:** `assets/js/main.js`
**Odgovornost:** Orkestracija svega

```javascript
// main.js - samo 50-100 linija
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicijalizacija podataka
    // 2. Kreiranje komponenti
    // 3. Renderovanje u kontejnere
});
```

---

## 📅 **FAZA 1: Definicija Sadržaja (Content-First)**

*Počinjemo od podataka - oni diktiraju kod!*

### **1.1 Finalizacija .md Fajlova**

#### **✅ Već Gotovi:**
- `suplementi_simple.md` - 6 core suplemenata
- `suplementi_advanced.md` - 13 komplementnih suplemenata
- `Plan.md` - Trening plan sažetak

#### **🔄 Za Kreirati/Ažurirati:**

**`trening_detaljno.md`** - Kompletan trening vodič
```
# STRUKTURA PO DANIMA
## Dan 1: LOWER 1 (Noge + Core)

### 🎯 Fokus: Osnovna snaga nogu + stabilizacija

#### Vježbe:
1. **Leg Press**
   - Serije: 3
   - Ponavljanja: 12-15
   - RPE: 5-6
   - Odmor: 90-120s
   - Napomene: Fokus na formu

2. **RDL / Hip Hinge**
   - Serije: 3
   - Ponavljanja: 12
   - RPE: 5-6
   - Odmor: 90s
   - Napomene: Leđa ravna, kukovi nazad

#### Cardio:
- Treadmill: 8-12 min
- Nagib: 6-10%
- Puls: Lagani tempo

#### Rehab (obavezno):
- Band pull-apart: 2x15
- Face pulls: 3x15
- Biceps izometrije: 5x10s
```

**`obroci_keto.md`** - Keto obroci sažetak
```
# KETO OBROCI - 18/6 IF Protokol

## Obrok 1 (11:30) - ~800-900 kcal, P70-80g

### Varijanta 1: Jaja + Avokado
- 4 jaja (poželjno organska)
- ½ avokado (100g)
- Špinat 100g (kuvan)
- Maslinovo ulje 1 tbsp
- Začini: So, biber, kurkuma

**Makroi:** P 35g, M 60g, UH 8g

### Varijanta 2: Losos + Jaja
- 150g dimljeni losos
- 2 jaja
- Mješana salata 100g
- Limun ½ kom
- Maslinovo ulje 1 tbsp

**Makroi:** P 40g, M 45g, UH 6g
```

**`checklist_sistem.md`** - Sistem praćenja
```
# DNEVNI CHECKLIST SISTEM

## 📋 Jutarnji Protokol (07:00)
- [ ] Hidratacija (500ml vode + elektroliti)
- [ ] MCT Oil (15ml) ili Collagen (20g)
- [ ] Energija na buđenje (1-10): ____
- [ ] Kvalitet sna (1-10): ____

## 🏋️ Trening Blok
- [ ] Rehab urađen (DA/NE)
- [ ] Trening tip: ____
- [ ] RPE nivo: ____
- [ ] Bol rame (0-10): ____

## 🍽️ Ishrana Blok
- [ ] IF prozor (11-17h)
- [ ] Obrok 1 uzet
- [ ] Obrok 2 uzet
- [ ] Makroi u granicama

## 💊 Suplementi Blok
- [ ] CreGAAtine uzet
- [ ] Hydration+ uzet
- [ ] Ostali suplementi

## 📊 Večernji Review
- [ ] Ukupna energija dana: ____
- [ ] Motivacija za sutra: ____
- [ ] Napomene: ________________
```

### **1.2 Pretvaranje .md u JavaScript Objekte**

**`assets/data/trainingData.js`**
```javascript
export const TRAINING_DATA = {
    "dan1": {
        id: "dan1",
        title: "LOWER 1 (Noge + Core)",
        focus: "Osnovna snaga nogu + stabilizacija",
        type: "lower",
        exercises: [
            {
                name: "Leg Press",
                sets: 3,
                reps: "12-15",
                rpe: "5-6",
                rest: "90-120s",
                notes: "Fokus na formu",
                video: "leg-press.mp4"
            },
            {
                name: "RDL / Hip Hinge",
                sets: 3,
                reps: 12,
                rpe: "5-6",
                rest: "90s",
                notes: "Leđa ravna, kukovi nazad"
            }
        ],
        cardio: {
            type: "Treadmill",
            duration: "8-12 min",
            incline: "6-10%",
            notes: "Lagani puls"
        },
        rehab: [
            { name: "Band pull-apart", sets: 2, reps: 15 },
            { name: "Face pulls", sets: 3, reps: 15 },
            { name: "Biceps izometrije", sets: 5, reps: "10s" }
        ]
    }
    // ... svih 28 dana
};

window.TRAINING_DATA = TRAINING_DATA;
```

**`assets/data/mealsData.js`**
```javascript
export const MEALS_DATA = {
    keto: {
        meal1: {
            time: "11:30",
            calories: "800-900",
            macros: { protein: "70-80g", fat: "55-65g", carbs: "≤30g" },
            variants: [
                {
                    name: "Jaja + Avokado",
                    ingredients: [
                        "4 jaja (organska)",
                        "½ avokado (100g)",
                        "100g špinat (kuvan)",
                        "1 tbsp maslinovo ulje",
                        "Začini: so, biber, kurkuma"
                    ],
                    prep: "Jaja na oko, avokado iseći, špinat skuvati",
                    macros: { p: 35, f: 60, c: 8 }
                },
                {
                    name: "Losos + Jaja",
                    ingredients: [
                        "150g dimljeni losos",
                        "2 jaja",
                        "100g mješana salata",
                        "½ limun",
                        "1 tbsp maslinovo ulje"
                    ],
                    prep: "Losos iseći, jaja skuvati, salata oprati",
                    macros: { p: 40, f: 45, c: 6 }
                }
            ]
        },
        meal2: {
            // ... slična struktura
        }
    }
};

window.MEALS_DATA = MEALS_DATA;
```

---

## 🛠️ **FAZA 2: Izgradnja Komponenti**

*Podaci su definisani - sada gradimo komponente*

### **2.1 Kreiranje Components Foldera**

```
assets/js/components/
├── TrainingManager.js      # Glavni menadžer treninga
├── TrainingCard.js         # Prikaz jednog dana treninga
├── MealManager.js          # Menadžer obroka
├── MealCard.js             # Prikaz obroka sa alternativama
├── SupplementManager.js    # ✓ Već postoji
├── SupplementCard.js       # ✓ Već postoji
├── ChecklistManager.js     # Refaktorisani checklist
├── IFTimer.js              # ✓ Već postoji
├── DataManager.js          # ✓ Već postoji
└── EventHandler.js         # ✓ Već postoji
```

### **2.2 Primjer Komponente - TrainingCard.js**

```javascript
export class TrainingCard {
    constructor(trainingData) {
        this.data = trainingData;
    }

    render() {
        return `
            <div class="training-card" data-day="${this.data.id}">
                <div class="training-header">
                    <h3 class="training-title">${this.data.title}</h3>
                    <span class="training-focus">${this.data.focus}</span>
                </div>

                <div class="exercises-section">
                    <h4>Vježbe:</h4>
                    ${this.renderExercises()}
                </div>

                ${this.data.cardio ? this.renderCardio() : ''}

                <div class="rehab-section">
                    <h4>Rehab (obavezno):</h4>
                    ${this.renderRehab()}
                </div>

                <div class="training-actions">
                    <button class="mark-completed-btn">Označi kao završeno</button>
                    <button class="show-details-btn">Detalji</button>
                </div>
            </div>
        `;
    }

    renderExercises() {
        return this.data.exercises.map(exercise => `
            <div class="exercise-item">
                <div class="exercise-name">${exercise.name}</div>
                <div class="exercise-details">
                    ${exercise.sets}x${exercise.reps} | RPE ${exercise.rpe} | Odmor ${exercise.rest}
                </div>
                ${exercise.notes ? `<div class="exercise-notes">${exercise.notes}</div>` : ''}
            </div>
        `).join('');
    }

    renderCardio() {
        return `
            <div class="cardio-section">
                <h4>Cardio:</h4>
                <div class="cardio-details">
                    ${this.data.cardio.type}: ${this.data.cardio.duration} | Nagib ${this.data.cardio.incline}
                </div>
            </div>
        `;
    }

    renderRehab() {
        return this.data.rehab.map(item => `
            <div class="rehab-item">${item.name}: ${item.sets}x${item.reps}</div>
        `).join('');
    }
}
```

### **2.3 Primjer Menadžera - TrainingManager.js**

```javascript
import { TrainingCard } from './TrainingCard.js';

export class TrainingManager {
    constructor(containerId, trainingData) {
        this.container = document.getElementById(containerId);
        this.data = trainingData;
        this.currentDay = this.getCurrentDay();
    }

    init() {
        this.renderCurrentDay();
        this.attachEventListeners();
    }

    renderCurrentDay() {
        const dayData = this.data[`dan${this.currentDay}`];
        if (!dayData) {
            this.container.innerHTML = '<p>Nema podataka za današnji trening</p>';
            return;
        }

        const card = new TrainingCard(dayData);
        this.container.innerHTML = card.render();
    }

    attachEventListeners() {
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('mark-completed-btn')) {
                this.markCompleted();
            }
            if (e.target.classList.contains('show-details-btn')) {
                this.showDetails();
            }
        });
    }

    markCompleted() {
        // Logika za označavanje treninga kao završenog
        localStorage.setItem(`training_day_${this.currentDay}`, 'completed');
        this.updateUI();
    }

    getCurrentDay() {
        // Izračunaj trenutni dan od startDate
        const startDate = new Date('2025-09-15');
        const today = new Date();
        const diffTime = today - startDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return Math.min(Math.max(diffDays, 1), 28); // Ograniči na 1-28
    }
}
```

---

## 🔧 **FAZA 3: Integracija i Čišćenje**

*Konačno spajanje u funkcionalnu cjelinu*

### **3.1 Čišćenje index.html**

**Prije (haotično):**
```html
<!-- Pomiješani kontejneri i inline stilovi -->
<div id="supplement-planner">...</div>
<div id="danasnji-plan-container">...</div>
<!-- Inline CSS i JS -->
```

**Posle (čisto):**
```html
<!-- Samo kontejneri za komponente -->
<div id="if-timer-container"></div>
<div id="training-container"></div>
<div id="meals-container"></div>
<div id="checklist-container"></div>
<div id="supplement-container"></div>

<!-- Sedmični pregledi -->
<div id="week-overview-container"></div>
```

### **3.2 Refaktorisani main.js**

```javascript
// assets/js/main.js - GLAVNI ORKESTRATOR
import { SupplementManager } from './components/SupplementManager.js';
import { TrainingManager } from './components/TrainingManager.js';
import { MealManager } from './components/MealManager.js';
import { ChecklistManager } from './components/ChecklistManager.js';
import { IFTimer } from './components/IFTimer.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Inicijalizacija aplikacije...');

    try {
        // 1. Sačekaj podatke (već učitani u <head>)
        await waitForData();

        // 2. Inicijalizacija komponenti
        const components = {
            ifTimer: new IFTimer('#if-timer-container'),
            training: new TrainingManager('#training-container', window.TRAINING_DATA),
            meals: new MealManager('#meals-container', window.MEALS_DATA),
            checklist: new ChecklistManager('#checklist-container', window.PLAN_DATA),
            supplements: new SupplementManager('#supplement-container')
        };

        // 3. Renderovanje komponenti
        Object.values(components).forEach(component => {
            if (component.init) component.init();
        });

        // 4. Globalni event handleri
        setupGlobalEventHandlers(components);

        console.log('✅ Aplikacija spremna za upotrebu');

    } catch (error) {
        console.error('❌ Greška pri inicijalizaciji:', error);
        showErrorState(error);
    }
});

// Helper funkcije
async function waitForData() {
    return new Promise((resolve) => {
        const checkData = () => {
            if (window.TRAINING_DATA && window.MEALS_DATA && window.SUPPLEMENTS_DATA) {
                resolve();
            } else {
                setTimeout(checkData, 50);
            }
        };
        checkData();
    });
}

function setupGlobalEventHandlers(components) {
    // Globalni event handleri za komunikaciju između komponenti
    window.addEventListener('trainingCompleted', (e) => {
        components.checklist.updateTrainingStatus(e.detail.day, true);
    });

    window.addEventListener('supplementTaken', (e) => {
        components.checklist.updateSupplementStatus(e.detail.supplementId, true);
    });
}
```

### **3.3 Čist CSS Sistem**

**`assets/css/styles.css`** - samo globalni stilovi
**`assets/css/components/_training.css`** - stilovi za trening komponente
**`assets/css/components/_meals.css`** - stilovi za obroke
**`assets/css/components/_supplements.css`** - stilovi za suplemente

### **3.4 Testiranje Modularnosti**

```javascript
// Test fajl - assets/js/test.js
import { TrainingManager } from './components/TrainingManager.js';

// Test da li komponenta radi nezavisno
const testTraining = new TrainingManager('test-container', window.TRAINING_DATA);
testTraining.init(); // Treba raditi bez main.js
```

---

## 📊 **Prednosti Nove Arhitekture**

### **✅ Tehničke Prednosti:**
- **Modularnost**: Svaka komponenta nezavisna
- **Testabilnost**: Lako testiranje pojedinačnih dijelova
- **Performanse**: Lazy loading komponenti
- **Održivost**: Jednostavne izmjene bez breaking changes

### **✅ Razvojne Prednosti:**
- **Paralelni razvoj**: Više developera na različitim komponentama
- **Feature flags**: Lako uključivanje/isključivanje funkcionalnosti
- **Versioning**: Nezavisno verzionisanje komponenti
- **Debugging**: Jasno odvajanje odgovornosti

### **✅ Korisničke Prednosti:**
- **Brže učitavanje**: Komponente se učitavaju po potrebi
- **Bolja UX**: Svaka komponenta optimizovana za svoju funkciju
- **Offline-first**: Podaci se keširaju lokalno
- **Responsive**: Svaka komponenta responzivna nezavisno

---

---

## 📦 **TRENUTNO STANJE PROJEKTA (Septembar 2025)**

### **✅ Već Imamo - Asset Inventory:**

#### **Dokumentacija (.md fajlovi):**
- ✅ `suplementi_simple.md` - Početni protokol (6 osnovnih)
- ✅ `suplementi_advanced.md` - Ekspertski protokol (13 suplemenata) 
- ✅ `Informacije.md` - Ažuriran sa supplement tracking
- ✅ `Plan.md` - Osnovni trening plan
- ✅ `refaktorisanje.md` - Ovaj fajl (master plan)

#### **JavaScript Komponente:**
- 🔄 `SupplementManager.js` - Funkcionalan ali treba refactor
- 🔄 `SupplementCard.js` - Kreiran ali treba polish  
- ✅ `DataManager.js` - Funkcionalan
- ✅ `PeriodManager.js` - Funkcionalan
- ✅ `EventHandler.js` - Funkcionalan
- 🔄 `main.js` - Pretrpan, treba cleanup

#### **Data Fajlovi:**
- ✅ `detailedSupplements.js` - Kompletni supplement podaci
- ✅ `planData.js` - 28-dnevni plan
- 🔄 `meals.js` - Postoji ali treba ekspanzija
- ❌ `trainingData.js` - Treba kreirati od nule

#### **CSS:**
- 🔄 `styles.css` - Funkcionalan ali treba reorganizacija
- ❌ Component-specific CSS - Treba kreirati

### **❌ Treba Kreirati - Missing Pieces:**

#### **Novi .md Fajlovi:**
- ❌ `trening_detaljno.md` - Kompletan trening vodič (28 dana)
- ❌ `obroci_keto.md` - Detaljni keto obroci sa makroima
- ❌ `checklist_sistem.md` - Sistem praćenja napretka

#### **Nove JS Komponente:**
- ❌ `TrainingManager.js` - Trening menadžer
- ❌ `TrainingCard.js` - Prikaz dnevnog treninga
- ❌ `MealManager.js` - Menadžer obroka
- ❌ `MealCard.js` - Prikaz obroka
- ❌ `ChecklistManager.js` - Refaktorisani checklist

#### **Novi Data Fajlovi:**
- ❌ `trainingData.js` - Strukturirani trening podaci
- ❌ `mealsData.js` - Ekspandovani obroci sa alternativama
- ❌ `configData.js` - App konfiguracija

---

## 📁 **FINALNA STRUKTURA FOLDERA (Target State)**

```
Plan_Ishrana/
├── 📄 index.html                    # ✅ Postojeći (treba cleanup)
├── 🚀 start-server.bat             # ✅ Postojeći development server
├── 
├── 📁 assets/
│   ├── 📁 css/
│   │   ├── 📄 main.css              # 🔄 Refactor styles.css → main.css
│   │   └── 📁 components/           # ❌ NOVO: Component-specific CSS
│   │       ├── _supplement-card.css
│   │       ├── _training-card.css
│   │       ├── _meal-card.css
│   │       └── _checklist.css
│   │
│   ├── 📁 data/                     # 🔄 Reorganizacija postojećih
│   │   ├── 📄 supplements.js        # 🔄 Rename detailedSupplements.js
│   │   ├── 📄 training.js           # ❌ NOVO: Od Plan.md → JS
│   │   ├── 📄 meals.js              # 🔄 Expand postojeći
│   │   ├── 📄 plan.js               # ✅ Postojeći planData.js
│   │   └── 📄 config.js             # ❌ NOVO: App konstante
│   │
│   └── 📁 js/
│       ├── 📄 main.js               # 🔄 CLEANUP: 500+ linija → 100 linija
│       ├── 📄 utils.js              # ❌ NOVO: Helper funkcije
│       └── 📁 components/           # 🔄 Reorganizacija postojećih + novi
│           ├── 📄 SupplementManager.js  # ✅ Postojeći (minor fixes)
│           ├── 📄 SupplementCard.js     # ✅ Postojeći (minor fixes)
│           ├── 📄 TrainingManager.js    # ❌ NOVO
│           ├── 📄 TrainingCard.js       # ❌ NOVO
│           ├── 📄 MealManager.js        # ❌ NOVO
│           ├── 📄 MealCard.js           # ❌ NOVO
│           ├── 📄 ChecklistManager.js   # 🔄 Refactor postojećeg
│           ├── 📄 IFTimer.js            # 🔄 Refactor postojećeg
│           ├── 📄 DataManager.js        # ✅ Postojeći
│           └── 📄 EventHandler.js       # ✅ Postojeći
│
├── 📁 documentation/                # ❌ NOVO: Premesti sve .md fajlove
│   ├── 📄 suplementi_simple.md         # ✅ Move postojeći
│   ├── 📄 suplementi_advanced.md       # ✅ Move postojeći  
│   ├── 📄 trening_detaljno.md          # ❌ NOVO: Kreiraj
│   ├── 📄 obroci_keto.md               # ❌ NOVO: Kreiraj
│   ├── 📄 checklist_sistem.md          # ❌ NOVO: Kreiraj
│   ├── 📄 Informacije.md               # ✅ Move postojeći
│   ├── 📄 Plan.md                      # ✅ Move postojeći
│   └── 📄 refaktorisanje.md            # ✅ Ovaj fajl (move)
│
└── 📁 Slike/                       # ✅ Postojeći (bez izmene)
    ├── 1.jpg → 7.jpg
    └── ...
```

**📊 Statistika:**
- **✅ Postojeći fajlovi:** 15 (mogu se koristiti)
- **🔄 Refactor potreban:** 8 fajlova  
- **❌ Kreirati od nule:** 12 novih fajlova
- **📁 Novi folderi:** 3 (components/css/, documentation/)

---

## 🗓️ **5-DNEVNI IMPLEMENTACIONI PLAN**

### **Dan 1: Data Layer + Documentation (3-4h)**
**Cilj:** Centralizovani podaci i dokumentacija

**Morning Block (2h):**
- [ ] Kreiranje `documentation/` foldera
- [ ] Move postojećih .md fajlova u documentation/
- [ ] Kreiranje `trening_detaljno.md` (28 dana treninga)
- [ ] Kreiranje `obroci_keto.md` (keto alternativy)

**Afternoon Block (1-2h):**  
- [ ] Refactor `detailedSupplements.js` → `supplements.js`
- [ ] Kreiranje `training.js` od Plan.md podataka
- [ ] Expand `meals.js` sa alternativama
- [ ] Kreiranje `config.js` sa app konstantama

**End-of-Day Checkpoint:**
✅ Svi podaci centralizovani i strukturirani
✅ Dokumentacija organizovana
✅ Ready za komponentnu izgradnju

### **Dan 2: Core Components (4-5h)**
**Cilj:** TrainingManager + MealManager komponente

**Morning Block (2-3h):**
- [ ] Kreiranje `TrainingManager.js` klase
- [ ] Kreiranje `TrainingCard.js` komponente
- [ ] CSS za trening komponente (`_training-card.css`)
- [ ] Testiranje training sistema

**Afternoon Block (2h):**
- [ ] Kreiranje `MealManager.js` klase  
- [ ] Kreiranje `MealCard.js` komponente
- [ ] CSS za meal komponente (`_meal-card.css`)
- [ ] Integration testiranje

**End-of-Day Checkpoint:**
✅ Trening i obroci imaju svoje komponente
✅ CSS organizovan po komponentama
✅ Testovi prolaze independently

### **Dan 3: Refactor Existing + Checklist (3-4h)**
**Cilj:** Poboljšaj postojeće komponente

**Morning Block (2h):**
- [ ] Refactor `ChecklistManager.js` 
- [ ] Refactor `IFTimer.js` komponente
- [ ] CSS cleanup i organizacija
- [ ] Testing postojećeg supplement sistema

**Afternoon Block (1-2h):**
- [ ] Minor fixes na `SupplementManager.js`
- [ ] Polish `SupplementCard.js` 
- [ ] Integration sa novim komponentama
- [ ] Cross-component communication testing

**End-of-Day Checkpoint:**
✅ Sve komponente rade nezavisno
✅ CSS konzistentan kroz aplikaciju
✅ Existing funkcionalnost preserved

### **Dan 4: Main App Integration (3-4h)**
**Cilj:** Orkestracija kroz main.js

**Morning Block (2h):**
- [ ] Cleanup `main.js` (500+ → ~100 linija)
- [ ] Kreiranje `utils.js` za helper funkcije
- [ ] App initialization system
- [ ] Component lifecycle management

**Afternoon Block (1-2h):**
- [ ] Global event handlers
- [ ] Error handling i fallbacks  
- [ ] Performance optimizations
- [ ] Full app integration testing

**End-of-Day Checkpoint:**
✅ Clean main.js orchestrator
✅ All components working together
✅ Error handling in place

### **Dan 5: Testing + Polish + Documentation (2-3h)**
**Cilj:** Finalno testiranje i dokumentacija

**Morning Block (1-2h):**
- [ ] Comprehensive testing svih komponenti
- [ ] Browser compatibility testing
- [ ] Mobile responsiveness check
- [ ] Performance profiling

**Afternoon Block (1h):**
- [ ] Code documentation update
- [ ] README.md update sa novom strukturom  
- [ ] Final cleanup i optimization
- [ ] Deploy testing

**End-of-Day Checkpoint:**
✅ Kompletan, testiran, dokumentovan sistem
✅ Ready for production use
✅ Skalabilna arhitektura za budućnost

---

## 🎯 **Success Metrics & Validation**

### **Tehnički KPI-jevi:**
- **Performanse:** Učitavanje < 2s (vs trenutni ~5s)
- **Kod kvalitet:** Main.js < 150 linija (vs trenutni 500+)  
- **Modularnost:** Svaka komponenta radi nezavisno
- **CSS:** Zero konflikata, konzistentno na svim uređajima

### **Funkcionalni KPI-jevi:**
- **Features:** Svi postojeći features preserved + poboljšani
- **UX:** Smooth interakcije, instant feedback
- **Data:** Konzistentni podaci kroz sve komponente
- **Mobile:** Full responsiveness na svim screen sizes

### **Razvojni KPI-jevi:**
- **Maintainability:** Bug fixes < 30min po komponenti
- **Extensibility:** Nove features < 2h implementacije  
- **Testing:** 100% komponenti testabilno nezavisno
- **Documentation:** Kompletan development guide

---

## 🚀 **Zaključak: Od Haosa do Harmony**

**Ovaj refactoring plan transformiše projekat iz "hibridnog haosa" u "modularnu simfoniju".**

### **Key Transformation:**
- **Kod:** Monolitan → Modularan
- **Podaci:** Razbacani → Centralizovani  
- **Stilovi:** Konfliktni → Konzistentni
- **Razvoj:** Težak → Streamlined
- **Skalabilnost:** Ograničena → Neograničena

### **Ready to Launch?** 🎯

**Da krenemo sa Dan 1 implementacijom ili imaš dodatna pitanja o planu?**

**Sledeći korak: Kreiranje `documentation/` foldera i početak Data Layer refactora! 🏗️**