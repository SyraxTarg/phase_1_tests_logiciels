# 🧢 Poké Center — Plateforme de troc de cartes Pokémon

Bienvenue sur **Poké Center**, un centre de troc moderne dédié aux passionnés de cartes Pokémon. L’objectif est simple : permettre aux collectionneurs d’échanger facilement leurs cartes, compléter leur collection et interagir avec une communauté active.

---

## ✨ Fonctionnalités

* 🔄 **Système de troc** : proposez et acceptez des échanges de cartes
* 👥 **Profils utilisateurs** : consultez les collections des autres dresseurs
* 📩 **Demandes d’échange** : système de propositions et de validation
* 📢 **Transactions avec messagerie** : communiquez par messages avec d'autres utilisateurs pour les échanges
* 🧪 **Tests end-to-end** pour garantir la fiabilité de l’application
* 🧪 **Tests unitaires** pour garantir la fiabilité de la logique métier
* 🧪 **Tests d'intégration** pour garantir la fiabilité des modules d'un service
* 🧪 **Tests de charge** pour garantir que l'application peut supporter suffisament de charge

---

## 🏗️ Stack technique

### Frontend

* ⚛️ **Next.js**

### Backend

* 🟨 **JavaScript ExpressJs (Node.js)**
* 🗄️ **SQLite**

### Tests

* 🧪 **Playwright** - Tests E2E (Typescript)
* 🧪 **Jest** - Tests Unitaires et d'integration

---

## 📁 Structure du projet

```
poke-center/
│
├── frontend/        # Application Next.js
├── backend/         # API Node.js
└── README.md
```

---

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/SyraxTarg/phase_1_tests_logiciels.git
cd phase_1_tests_logiciels
```

### 2. Installer les dépendances

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd ../backend
npm install
```

---

## ▶️ Lancer le projet

### Backend

```bash
cd backend
nodemon index.js
```

### Frontend

```bash
cd frontend
npm run build
npm run start
```

L’application sera accessible sur :
👉 <http://localhost:3000>

---

## 🧪 Lancer les tests

```bash
cd frontend
npx playwright test
ou
npm run tests
```

```bash
cd back
npm run tests
```

```bash
cd back
./scripts/use_locust.ps1
```
