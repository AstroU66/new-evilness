# Captive Portal

## Setup
1. `git clone <repo> && cd captive-portal`
2. `npm install`
3. `npm run init-db`

## Frontend
- Dateien unter `public/`: `index.html`, `style.css`, `app.js`
- Vodafone-Style, drei Panels, Live-Password-Checks.

## Backend
- `server.js` (Express + sqlite3)
- API:
  - POST `/api/guests` → Guests
  - POST `/api/corp` → Corporate
  - POST `/api/private` → Privatkunden

## Deployment
- **PM2**: `pm2 start server.js`
- **Nginx**: Siehe `nginx/captive-portal.conf`
- **systemd**: Siehe `systemd/captive-portal.service`

## Lizenz
Nur für Schulungs-/PenTest-Zwecke. Kein Missbrauch!
