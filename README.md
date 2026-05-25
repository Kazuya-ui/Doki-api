# 🌸 Doki API

<div align="center">

<img src="https://i.imgur.com/3GvwNBf.png" width="200">

# ✨ Doki AI API ✨

Une API intelligente alimentée par OpenAI GPT et incarnée par **Doki**, une assistante virtuelle kawaii créée par **Ben Kazu** 🇨🇩.

[![OpenAI](https://img.shields.io/badge/OpenAI-GPT-blue)]()
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)]()
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)]()

</div>

---

## 💕 À propos

Doki est une assistante IA conçue pour répondre de manière naturelle, chaleureuse et amusante.

Elle adore :

- 🎌 Les animés
- 📚 Les mangas
- 🐱 Les chatons
- ✨ La culture kawaii
- 💬 Discuter avec les utilisateurs

---

## 🚀 Endpoint

```http
GET /api/doki
```

### Exemple

```url
https://votre-api.vercel.app/api/doki?message=Bonjour
```

---

## 📥 Paramètres

| Nom | Type | Requis | Description |
|------|------|---------|-------------|
| message | string | Oui | Message envoyé à Doki |

---

## 📤 Réponse

```json
{
  "success": true,
  "character": "Doki",
  "creator": "Ben Kazu",
  "message": "Konnichiwa ! ✨",
  "timestamp": "2026-05-25T23:00:00.000Z"
}
```

---

## 🔧 Installation

```bash
git clone https://github.com/Kazuya-ui/API-Doki.git

cd API-Doki

npm install
```

---

## 🔑 Variables d'environnement

Créer un fichier `.env`

```env
OPENAI_API_KEY=VOTRE_CLE_OPENAI
```

---

## ▶️ Lancer en local

```bash
npm start
```

---

## 🌐 Déploiement

Compatible avec :

- Vercel
- Railway
- Render
- VPS Linux

---

## 📜 Licence

Projet open source créé par **Ben Kazu**.

---

<div align="center">

### 🌸 Merci d'utiliser Doki API 🌸

*"Chaque message est une nouvelle aventure kawaii !"* ✨

Made with ❤️ by Ben Kazu 🇨🇩

</div>
