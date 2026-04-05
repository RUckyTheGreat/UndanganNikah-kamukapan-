# Undangan Nikah — Digital Wedding Invitation

A digital wedding invitation built with **Laravel 12** (API + Blade shell) and a **React 19** front end styled with **Tailwind CSS 4** and **Vite 7**. Guests can view event details, RSVP, leave messages, and see donation (bank) information.

## Features

- **Hero & countdown** — Loads event info from the API (`/api/event`).
- **Gallery** — Uses static images under `public/images/`; optionally tries `/api/gallery` and falls back if that route is not implemented.
- **Location** — Map link from the event record.
- **RSVP** — `POST /api/rsvp` with Indonesian status values `hadir` / `tidak_hadir`.
- **Guestbook** — List and submit messages via `/api/messages`.
- **Donation** — Bank details from `/api/donations`.

## Tech stack

| Layer | Technology |
|--------|------------|
| Backend | PHP 8.2+, Laravel 12 |
| Frontend | React 19, Vite 7, Tailwind CSS 4 |
| Database | SQLite by default (MySQL/PostgreSQL supported via `.env`) |

## Requirements

- PHP **8.2+** with extensions Laravel needs (`openssl`, `pdo`, `mbstring`, `tokenizer`, `xml`, `ctype`, `json`, `fileinfo`, etc.)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) **18+** (20 LTS recommended) and npm

## Quick setup (recommended)

From the project root:

```bash
composer run setup
```

This runs `composer install`, ensures `.env` exists, generates `APP_KEY`, runs migrations, installs npm packages, and builds front-end assets for production.

Then start the app:

```bash
php artisan serve
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000).

## Manual setup

### 1. Clone and install PHP dependencies

```bash
git clone https://github.com/RUckyTheGreat/UndanganNikah-kamukapan-
cd UndanganNikah-kamukapan--main
composer install
```

### 2. Environment

```bash
copy .env.example .env   # Windows PowerShell/CMD
# or: cp .env.example .env  (macOS/Linux)

php artisan key:generate
```

Edit `.env` as needed. Defaults in `.env.example` use **SQLite**.

**SQLite file:** ensure the database file exists:

```bash
# macOS/Linux
touch database/database.sqlite

# Windows PowerShell
New-Item -ItemType File -Path database\database.sqlite -Force
```

### 3. Database migrations

```bash
php artisan migrate
```

This creates tables: `events`, `rsvps`, `messages`, `donations`.

### 4. Session, cache, and queue (important)

`.env.example` sets `SESSION_DRIVER=database`, `CACHE_STORE=database`, and `QUEUE_CONNECTION=database`. Those drivers expect extra tables that are **not** included in this repo’s migrations.

**Easiest local setup** — use file/array drivers so you can run without extra migrations:

```env
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync
```

**If you keep database drivers**, create and run the standard Laravel migrations for sessions, cache, and jobs (see [Laravel docs: session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache)), then `php artisan migrate` again.

### 5. Front-end assets

```bash
npm install
npm run dev          # development, with hot reload
# or
npm run build        # production build
```

**Vite dev server:** `vite.config.js` sets a fixed `server.host` (LAN IP). Change it to your machine’s IP, or use `host: true` / `'0.0.0.0'` if you access the dev server from another device on the network.

### 6. Development: Laravel + Vite together

```bash
composer run dev
```

Runs `php artisan serve`, queue listener, `pail` logs, and `npm run dev` via `concurrently` (see `composer.json`).

## Seed data and content

### Event & donation records (required for full UI)

There is **no** seeder for `events` or `donations`. Add at least one event (and optional donation rows) so Hero, Countdown, Location, and Donation sections show real data.

Example with [Tinker](https://laravel.com/docs/artisan#tinker):

```bash
php artisan tinker
```

```php
\App\Models\Event::create([
    'title' => 'The Wedding of A & B',
    'groom_name' => 'Nama Mempelai Pria',
    'bride_name' => 'Nama Mempelai Wanita',
    'event_date' => '2026-06-01',
    'event_time' => '10:00:00',
    'location_name' => 'Gedung / Alamat Acara',
    'location_map_url' => 'https://maps.google.com/?q=...',
]);

\App\Models\Donation::create([
    'bank_name' => 'Bank ABC',
    'account_number' => '1234567890',
    'account_holder' => 'Nama Pemilik Rekening',
    'logo_url' => null,
]);
```

### Default user seeder

`DatabaseSeeder` creates a demo user with `User::factory()`. This project does **not** ship a `users` table migration. If `php artisan db:seed` fails, either add the default Laravel user migrations or comment out the user creation in `database/seeders/DatabaseSeeder.php` until you need authentication.

### Gallery images

Place images in `public/images/` (see `resources/js/components/Gallery.jsx` for expected paths). The optional `/api/gallery` endpoint is not defined in `routes/api.php`; the UI falls back to the built-in default list.

## API reference

Base URL: same origin as the app, with the `/api` prefix (Laravel default).

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/test` | Simple health string (`API OK`). |
| GET | `/api/event` | First `events` row (JSON). |
| POST | `/api/rsvp` | Create RSVP. Body: `name` (optional), `status` (`hadir` \| `tidak_hadir`), `guest_count` (optional, 1–10). |
| GET | `/api/messages` | Latest 50 messages. |
| POST | `/api/messages` | Create message. Body: `name` (optional), `message` (required), `send_to_whatsapp` (optional boolean). |
| GET | `/api/donations` | All donation records. |

### Example: RSVP (JSON)

```bash
curl -X POST http://127.0.0.1:8000/api/rsvp ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Budi\",\"status\":\"hadir\",\"guest_count\":2}"
```

(On macOS/Linux, use `\` for line continuation and single-line `-d` if you prefer.)

## Project layout (high level)

```
app/Http/Controllers/Api/   # RSVP, Message controllers; inline routes for event/donations
resources/js/               # React app (app.jsx, components/)
resources/views/welcome.blade.php  # Mounts #app and loads Vite bundle
routes/api.php              # API routes
routes/web.php              # Serves welcome view on /
public/images/              # Static gallery assets
database/migrations/        # events, rsvps, messages, donations
```

## Logging (production)

`config/logging.php` uses environment-aware defaults: for example, when `APP_ENV=production` and `LOG_STACK` is unset, the stack may include `daily` and `slack`. Set `LOG_SLACK_WEBHOOK_URL` (and optionally `LOG_SLACK_LEVEL`) if you use Slack alerts; otherwise set `LOG_STACK` explicitly (e.g. `daily` only).

## Tests

```bash
composer run test
# or
php artisan test
```

## Production checklist

- Set `APP_ENV=production`, `APP_DEBUG=false`, and a strong `APP_KEY`.
- Run `php artisan config:cache` and `php artisan route:cache` when appropriate.
- Run `npm run build` and ensure the server serves `public/` as the document root.
- Configure real mail (`MAIL_*`) if you send email.
- Align `SESSION_DRIVER`, `CACHE_STORE`, and `QUEUE_CONNECTION` with migrations and infrastructure.

## License

This project inherits the **MIT** license from the Laravel application skeleton (see `composer.json`). Add or adjust a `LICENSE` file if you publish a fork with different terms.

---
