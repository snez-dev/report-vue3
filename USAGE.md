# Руководство по использованию Report Generator

## Обзор

Report Generator - это Vue 3 компонент для создания многостраничных отчётов с возможностью экспорта в PDF и HTML.

## Основные возможности

- ✅ Многостраничные документы
- ✅ Экспорт в PDF (с колонтитулами)
- ✅ Экспорт в HTML
- ✅ Предпросмотр в iframe
- ✅ Slot-контент (header/footer/default)
- ✅ Навигация по страницам
- ✅ Поддержка форматов A4/Letter/Legal
- ✅ Повторение заголовков таблиц
- ✅ Автоматическая и ручная пагинация

## Установка

```bash
npm install jspdf html2canvas
```

## Базовое использование

```vue
<template>
  <ReportGenerator
    title="Мой отчёт"
    page-size="a4"
    orientation="portrait"
    :margin="15"
    :repeat-table-headers="true"
    @export-start="onExportStart"
    @export-end="onExportEnd"
  >
    <!-- Заголовок документа -->
    <template #header>
      <div style="display: flex; justify-content: space-between;">
        <span>Моя компания</span>
        <span>Отчёт №123</span>
      </div>
    </template>

    <!-- Контент отчёта -->
    <div>
      <h1>Название отчёта</h1>
      <p>Содержимое отчёта...</p>
      
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

    <!-- Подвал документа -->
    <template #footer>
      <div style="text-align: center;">
        Страница {{ currentPage + 1 }} из {{ totalPages }}
      </div>
    </template>
  </ReportGenerator>
</template>

<script setup>
import ReportGenerator from './components/ReportGenerator.vue'

const onExportStart = () => {
  console.log('Экспорт начат')
}

const onExportEnd = (data) => {
  console.log('Экспорт завершён:', data)
}
</script>
```

## Пропсы компонента

| Пропс | Тип | По умолчанию | Описание |
|-------|-----|--------------|----------|
| `title` | `string` | `'Отчёт'` | Название документа |
| `pageSize` | `'a4' \| 'letter' \| 'legal'` | `'a4'` | Формат страницы |
| `orientation` | `'portrait' \| 'landscape'` | `'portrait'` | Ориентация страницы |
| `margin` | `number` | `20` | Поля страницы (мм) |
| `darkMode` | `boolean` | `false` | Тёмная тема интерфейса |
| `autoPagination` | `boolean` | `true` | Автоматическая пагинация |
| `repeatTableHeaders` | `boolean` | `false` | Повторять заголовки таблиц |

## События (Emits)

| Событие | Параметры | Описание |
|---------|-----------|----------|
| `export-start` | - | Начало экспорта |
| `export-end` | `{ format: string, pages: number }` | Завершение экспорта |
| `page-change` | `page: number` | Смена страницы |
| `error` | `error: Error` | Ошибка |

## Слоты

### `#header`
Верхний колонтитул документа. Отображается на каждой странице.

```vue
<template #header="{ page, totalPages }">
  <div>Страница {{ page + 1 }} из {{ totalPages }}</div>
</template>
```

### `#footer`
Нижний колонтитул документа. Отображается на каждой странице.

```vue
<template #footer>
  <div>© 2025 Моя компания</div>
</template>
```

### `default`
Основной контент документа.

## Режимы пагинации

### Автоматическая пагинация (по умолчанию)

Контент автоматически разбивается на страницы по высоте:

```vue
<ReportGenerator :auto-pagination="true">
  <div>
    <h1>Большая таблица</h1>
    <table>
      <!-- Много строк -->
    </table>
  </div>
</ReportGenerator>
```

### Ручная пагинация

Используйте класс `report-page` для ручного разделения:

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

## Повторение заголовков таблиц

Для повторения заголовков таблиц на каждой странице:

1. Установите пропс `repeat-table-headers="true"`
2. Убедитесь, что таблицы имеют структуру с `<thead>` и `<tbody>`

```vue
<ReportGenerator :repeat-table-headers="true">
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Название</th>
        <th>Цена</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in largeDataset" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
      </tr>
    </tbody>
  </table>
</ReportGenerator>
```

**Как это работает:**
- Компонент автоматически определяет количество строк, помещающихся на странице
- Клонирует `<thead>` и вставляет его перед каждой новой порцией строк
- Заголовки таблиц повторяются на каждой странице, где есть данные таблицы

## Предпросмотр PDF

Нажмите кнопку "Предпросмотр" для открытия PDF в iframe:

```vue
<ReportGenerator ref="reportRef">
  <!-- контент -->
</ReportGenerator>

<button @click="$refs.reportRef.togglePreview()">
  Предпросмотр
</button>
```

## Экспорт в PDF

```vue
<ReportGenerator ref="reportRef">
  <!-- контент -->
</ReportGenerator>

<button @click="$refs.reportRef.exportPDF()">
  Скачать PDF
</button>
```

## Экспорт в HTML

```vue
<ReportGenerator ref="reportRef">
  <!-- контент -->
</ReportGenerator>

<button @click="$refs.reportRef.exportHTML()">
  Скачать HTML
</button>
```

## Методы компонента

| Метод | Описание |
|-------|----------|
| `exportPDF()` | Экспорт в PDF |
| `exportHTML()` | Экспорт в HTML |
| `togglePreview()` | Переключение предпросмотра |
| `prevPage()` | Предыдущая страница |
| `nextPage()` | Следующая страница |

## Стили для отчётов

Используйте файл `src/report-styles.css` для стилизации контента отчётов:

```css
/* Заголовки */
.report-page h1 { /* ... */ }
.report-page h2 { /* ... */ }

/* Таблицы */
.report-page table { /* ... */ }
.report-page th { /* ... */ }
.report-page td { /* ... */ }

/* Предотвращение разрыва */
.report-page .no-break {
  break-inside: avoid;
  page-break-inside: avoid;
}
```

## Примеры

### Финансовый отчёт с таблицами

```vue
<ReportGenerator
  title="Финансовый отчёт"
  :repeat-table-headers="true"
>
  <template #header>
    <div>ООО "Компания" • Финансовый отчёт</div>
  </template>

  <div>
    <h1>Отчёт о прибылях и убытках</h1>
    <table>
      <thead>
        <tr>
          <th>Показатель</th>
          <th>Q1</th>
          <th>Q2</th>
          <th>Q3</th>
          <th>Q4</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in financialData" :key="row.id">
          <td>{{ row.name }}</td>
          <td>{{ row.q1 }}</td>
          <td>{{ row.q2 }}</td>
          <td>{{ row.q3 }}</td>
          <td>{{ row.q4 }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <template #footer>
    <div>© 2025 ООО "Компания"</div>
  </template>
</ReportGenerator>
```

### Каталог товаров с автопагинацией

```vue
<ReportGenerator
  title="Каталог товаров"
  :auto-pagination="true"
  :repeat-table-headers="true"
>
  <div>
    <h1>Каталог товаров</h1>
    <table>
      <thead>
        <tr>
          <th>Артикул</th>
          <th>Название</th>
          <th>Цена</th>
          <th>Остаток</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.sku }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }} ₽</td>
          <td>{{ product.stock }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</ReportGenerator>
```

## Известные ограничения

- `html2canvas` не поддерживает все CSS-свойства
- Для корректного отображения русских символов используется рендеринг через canvas
- Большие документы (>100 страниц) могут требовать больше времени для генерации

## Лицензия

MIT
