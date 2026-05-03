# Elcsa

## What This Is

Elcsa — это веб-приложение криптообменника и некастодиального кошелька (hybrid модель: seed-фраза генерируется на стороне сервера и показывается пользователю при регистрации). Пользователи могут создать кошелёк, хранить и просматривать балансы по 5 монетам (BTC, ETH, TRX, SOL, ARB), обменивать криптовалюты между собой и пополнять кошелёк как криптой, так и фиатными деньгами через платёжный шлюз.

## Core Value

Пользователь может зарегистрироваться, получить кошелёк с seed-фразой, пополнить баланс и сделать своп — всё в одном интерфейсе без выхода на сторонние сервисы.

## Requirements

### Validated

- ✓ Страничная архитектура с маршрутизацией (Home, Wallet, Swap, Profile, Login, Register, SeedPhrase) — existing
- ✓ Дизайн-система: dark mode, CSS-переменные, CSS-модули, компоненты Button/FormField/TokenIcon/Title/Pill — existing
- ✓ UI-компонент формы свопа (SwapForm + useSwapForm) — existing
- ✓ UI-компонент конвертера валют (currency-converter + useConverter) — existing
- ✓ UI компонент таблицы токенов (token-table) — existing
- ✓ Конфигурация роутов (ROUTES) и переменных окружения (VITE_API_URL) — existing

### Active

- [ ] Регистрация пользователя через API (email/пароль) с показом seed-фразы
- [ ] Авторизация (login) и поддержание сессии (JWT/токен)
- [ ] Создание и привязка кошелька к аккаунту
- [ ] Отображение балансов по BTC, ETH, TRX, SOL, ARB из API
- [ ] История транзакций на странице кошелька
- [ ] Своп криптовалют через API (BTC, ETH, TRX, SOL, ARB)
- [ ] Пополнение кошелька криптой (показ адреса для депозита)
- [ ] Пополнение кошелька фиатом (интеграция с платёжным шлюзом)
- [ ] Калькулятор-конвертер фиат↔крипто с реальным курсом из API
- [ ] Страница профиля с данными аккаунта
- [ ] Защита приватных роутов (редирект на /login если не авторизован)
- [ ] Подключение Redux Toolkit + Axios к API (auth state, user state)

### Out of Scope

- Разработка бэкенда — готовый API уже существует
- Мобильное приложение (React Native) — только веб в v1
- Вывод средств на банковскую карту — только пополнение в v1
- Поддержка дополнительных сетей/токенов сверх BTC/ETH/TRX/SOL/ARB — фиксированный список в v1
- KYC/верификация личности — вне скоупа v1
- Реферальная система / бонусы — вне скоупа v1

## Context

**Тип проекта:** Фронтенд для реального криптосервиса. Бэкенд API готов, фронтенд подключается к нему через VITE_API_URL.

**Текущее состояние кодовой базы:**
- Архитектура: Feature-Layered (FSD-подобный подход): app → pages → widgets → shared
- UI-слой и роутинг готовы, бизнес-логика с API не подключена
- Redux Toolkit и Axios установлены, но не используются — ждут подключения
- Zod установлен — для валидации форм и ответов API
- Приложение собирается Vite, TypeScript strict mode

**Кошелёк (hybrid модель):**
- Seed-фраза генерируется и хранится на сервере (custodial)
- Пользователю показывается seed-фраза однократно при создании кошелька
- Пользователь обязан её сохранить — это точка входа для потенциального самостоятельного восстановления

**Платёжная интеграция:**
- Пополнение фиатом → реальная покупка через платёжный шлюз (конкретный провайдер уточняется)
- Пополнение криптой → отображение on-chain адреса кошелька для перевода

## Constraints

- **Tech Stack**: React 19 + TypeScript + Vite — не менять, инфраструктура настроена
- **API**: Только существующий бэкенд-API (VITE_API_URL), никаких новых блокчейн-зависимостей на фронте
- **Безопасность**: Никогда не хранить приватные ключи или seed-фразы в localStorage/sessionStorage — только серверная сторона
- **Совместимость**: Современные браузеры (ES2020 target согласно tsconfig)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Hybrid кошелёк (seed на сервере) | Упрощает UX при сохранении видимости seed-фразы для пользователя | — Pending |
| Redux Toolkit для глобального состояния | Уже установлен; нужен для auth state и user/wallet state | — Pending |
| Axios для HTTP | Уже установлен; interceptors для JWT-токена | — Pending |
| Zod для валидации | Установлен; схемы для форм регистрации/логина/свопа | — Pending |
| CSS Modules + design tokens | Уже применяется; не переходить на другой styling-подход | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-03 after initialization*
