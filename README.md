# Report Generator - Vue 3 Компонент для генерации отчётов

Мощный Vue 3 компонент для создания многостраничных отчётов с экспортом в PDF и HTML.

![Vue 3](https://img.shields.io/badge/Vue-3.4+-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

## ✨ Возможности

- 📄 **Экспорт в PDF** - генерация PDF документов с колонтитулами
- 🌐 **Экспорт в HTML** - сохранение отчётов в HTML формат
- 👁️ **Предпросмотр** - просмотр PDF в iframe перед скачиванием
- 📑 **Многостраничность** - автоматическая и ручная пагинация
- 🔄 **Повторение заголовков таблиц** - заголовки таблиц на каждой странице
- 🎨 **Колонтитулы** - настраиваемые header и footer через слоты
- 📐 **Форматы страниц** - A4, Letter, Legal
- 🌓 **Тёмная тема** - переключение между светлой и тёмной темой
- 🧭 **Навигация** - переход между страницами
- 📊 **Демо-отчёты** - 5 готовых примеров отчётов

## 🚀 Быстрый старт

### Установка зависимостей

```bash
npm install jspdf html2canvas
```

### Базовое использование

```vue
<template>
  <ReportGenerator
    title="Мой отчёт"
    page-size="a4"
    :repeat-table-headers="true"
  >
    <template #header>
      <div>Моя компания</div>
    </template>

    <div>
      <h1>Название отчёта</h1>
      <table>
        <thead>
          <tr>
            <th>Колонка 1</th>
            <th>Колонка 2</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.col1 }}</td>
            <td>{{ item.col2 }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <template #footer>
      <div>Страница {{ currentPage + 1 }} из {{ totalPages }}</div>
    </template>
  </ReportGenerator>
</template>

<script setup>
import ReportGenerator from './components/ReportGenerator.vue'
</script>
```

## 📖 Документация

Полная документация доступна в файле [USAGE.md](./USAGE.md)

### Основные пропсы

| Пропс | Тип | По умолчанию | Описание |
|-------|-----|--------------|----------|
| `title` | `string` | `'Отчёт'` | Название документа |
| `pageSize` | `'a4' \| 'letter' \| 'legal'` | `'a4'` | Формат страницы |
| `orientation` | `'portrait' \| 'landscape'` | `'portrait'` | Ориентация |
| `margin` | `number` | `20` | Поля (мм) |
| `repeatTableHeaders` | `boolean` | `false` | Повторять заголовки таблиц |
| `autoPagination` | `boolean` | `true` | Автопагинация |

### События

- `@export-start` - начало экспорта
- `@export-end` - завершение экспорта
- `@page-change` - смена страницы
- `@error` - ошибка

### Методы

- `exportPDF()` - экспорт в PDF
- `exportHTML()` - экспорт в HTML
- `togglePreview()` - предпросмотр
- `prevPage()` / `nextPage()` - навигация

## 🎯 Примеры использования

### Автоматическая пагинация с повторением заголовков

```vue
<ReportGenerator
  title="Каталог товаров"
  :repeat-table-headers="true"
>
  <table>
    <thead>
      <tr>
        <th>Артикул</th>
        <th>Название</th>
        <th>Цена</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.sku }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.price }} ₽</td>
      </tr>
    </tbody>
  </table>
</ReportGenerator>
```

### Ручная пагинация

```vue
<ReportGenerator :auto-pagination="false">
  <div class="report-page">
    <h1>Страница 1</h1>
    <p>Содержимое первой страницы</p>
  </div>
  
  <div class="report-page">
    <h1>Страница 2</h1>
    <p>Содержимое второй страницы</p>
  </div>
</ReportGenerator>
```

## 📦 Демо-отчёты

В проекте доступны 5 готовых примеров отчётов:

1. **💰 Финансовый отчёт** - P&L, баланс, cash flow (ручная пагинация)
2. **📦 Каталог товаров** - 80 товаров с автопагинацией
3. **📊 Системные логи** - 200 записей логов
4. **👥 Список сотрудников** - 100 сотрудников с контактами
5. **🏭 Инвентаризация склада** - 150 позиций товаров

## 🛠️ Разработка

### Установка

```bash
npm install
```

### Запуск dev-сервера

```bash
npm run dev
```

### Сборка

```bash
npm run build
```

### Проверка типов

```bash
npm run typecheck
```

## 📝 Структура проекта

```
src/
├── components/
│   └── ReportGenerator.vue    # Основной компонент
├── demo/
│   ├── FinancialReport.vue    # Финансовый отчёт
│   ├── CatalogReport.vue      # Каталог товаров
│   ├── LogReport.vue          # Системные логи
│   ├── EmployeeReport.vue     # Список сотрудников
│   ├── InventoryReport.vue    # Инвентаризация
│   └── index.ts               # Экспорт демо-отчётов
├── App.vue                    # Демонстрационное приложение
├── main.ts                    # Точка входа
├── index.css                  # Глобальные стили
└── report-styles.css          # Стили для отчётов
```

## 🔧 Технологии

- **Vue 3.4+** - реактивный фреймворк
- **TypeScript 5.0+** - типизация
- **Vite** - сборщик
- **jsPDF** - генерация PDF
- **html2canvas** - рендеринг HTML в canvas
- **Tailwind CSS** - стилизация интерфейса

## 📄 Лицензия

MIT © 2025

## 🤝 Вклад

Приветствуется любой вклад в проект! Пожалуйста, создайте Issue или Pull Request.

## 📞 Поддержка

Если у вас возникли вопросы или проблемы:
1. Проверьте [документацию](./USAGE.md)
2. Посмотрите [историю изменений](./CHANGELOG.md)
3. Создайте Issue в репозитории

---

**Создано с ❤️ для удобной генерации отчётов**
