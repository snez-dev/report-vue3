<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
    <!-- Header -->
    <header class="border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <span class="text-white text-lg">📄</span>
          </div>
          <div>
            <h1 class="text-white font-bold text-lg">Report Generator</h1>
            <p class="text-blue-300 text-xs">Vue 3 • PDF/HTML экспорт • Slot-контент • Многостраничность</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="showCode = !showCode"
            class="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm"
          >
            <span>💻</span> Vue код
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 py-6">
      <!-- Report Selector -->
      <div class="mb-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <h3 class="text-white font-semibold mb-3 flex items-center gap-2">
          <span>📑</span> Выберите пример отчёта
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <button
            v-for="(report, index) in reportExamples"
            :key="index"
            @click="selectedReport = index"
            class="p-3 rounded-lg border transition-all text-left"
            :class="selectedReport === index
              ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'"
          >
            <div class="text-2xl mb-1">{{ report.icon }}</div>
            <div class="font-medium text-sm">{{ report.name }}</div>
            <div class="text-xs opacity-70 mt-1">{{ report.desc }}</div>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Left Panel -->
        <div class="lg:col-span-1 space-y-4">
          <!-- Stats -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
            <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
              <span>📊</span> Статистика
            </h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Страниц</span>
                <span class="text-white font-medium">{{ currentReport.pages.length }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Таблиц</span>
                <span class="text-white font-medium">{{ currentReport.tablesCount }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Строк данных</span>
                <span class="text-white font-medium">{{ currentReport.rowsCount }}+</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Формат</span>
                <span class="text-white font-medium uppercase">{{ currentReport.format }}</span>
              </div>
            </div>
          </div>

          <!-- Features -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
            <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
              <span>✨</span> Возможности
            </h3>
            <ul class="space-y-2 text-sm text-gray-300">
              <li class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>Многостраничные документы</li>
              <li class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>Экспорт в PDF</li>
              <li class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>Экспорт в HTML</li>
              <li class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>Предпросмотр</li>
              <li class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>Slot-контент</li>
              <li class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>Навигация</li>
              <li class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>A4/Letter/Legal</li>
              <li class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>Тёмная тема</li>
            </ul>
          </div>

          <!-- Props -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
            <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
              <span>⚙️</span> Пропсы
            </h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between text-gray-300"><code class="text-blue-300">title</code><span class="text-gray-500">String</span></div>
              <div class="flex justify-between text-gray-300"><code class="text-blue-300">pageSize</code><span class="text-gray-500">a4|letter|legal</span></div>
              <div class="flex justify-between text-gray-300"><code class="text-blue-300">orientation</code><span class="text-gray-500">portrait|landscape</span></div>
              <div class="flex justify-between text-gray-300"><code class="text-blue-300">margin</code><span class="text-gray-500">Number (mm)</span></div>
              <div class="flex justify-between text-gray-300"><code class="text-blue-300">darkMode</code><span class="text-gray-500">Boolean</span></div>
            </div>
          </div>
        </div>

        <!-- Right Panel - Report -->
        <div class="lg:col-span-3">
          <ReportGenerator
            :key="selectedReport"
            :title="currentReport.title"
            :page-size="currentReport.format"
            orientation="portrait"
            :margin="15"
            @export-start="onExportStart"
            @export-end="onExportEnd"
          >
            <template #header="{ page, totalPages }">
              <div class="flex justify-between items-center text-sm">
                <span class="font-semibold text-gray-700">{{ currentReport.company }}</span>
                <span class="text-gray-500">Стр. {{ page + 1 }} / {{ totalPages }}</span>
              </div>
            </template>

            <!-- Dynamic pages based on selected report -->
            <component :is="currentReport.component" />

            <template #footer>
              <p>© 2025 {{ currentReport.company }} • Сформировано {{ currentDate }}</p>
            </template>
          </ReportGenerator>
        </div>
      </div>

      <!-- Code Section -->
      <div v-if="showCode" class="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div class="flex items-center justify-between p-4 border-b border-white/10">
          <h3 class="text-white font-semibold flex items-center gap-2">
            <span>💻</span> Пример использования
          </h3>
          <button
            @click="copyCode"
            class="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm"
          >
            <span>{{ copied ? '✅' : '📋' }}</span>
            {{ copied ? 'Скопировано!' : 'Копировать' }}
          </button>
        </div>
        <pre class="p-4 overflow-x-auto text-sm text-gray-300 max-h-[500px] overflow-y-auto"><code>{{ usageCode }}</code></pre>
      </div>

      <!-- Toast -->
      <Transition name="slide-up">
        <div v-if="toast" class="fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl p-4 flex items-center gap-3 z-50">
          <span class="text-2xl">{{ toast.icon }}</span>
          <div>
            <p class="font-semibold text-gray-800">{{ toast.title }}</p>
            <p class="text-sm text-gray-500">{{ toast.message }}</p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent, h, markRaw } from 'vue'
import ReportGenerator from './components/ReportGenerator.vue'

// ============ REPORT PAGE COMPONENTS ============

// --- 1. ФИНАНСОВЫЙ ОТЧЁТ ---
const FinancialReport = markRaw(defineComponent({
  name: 'FinancialReport',
  setup() {
    const quarters = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025']
    const categories = [
      'Выручка от реализации', 'Услуги консалтинга', 'Лицензии ПО', 'Подписки SaaS',
      'Себестоимость', 'Зарплаты', 'Аренда', 'Маркетинг', 'R&D', 'Админ. расходы',
      'Налоги', 'Амортизация', 'Проценты по кредитам', 'Курсовые разницы',
      'Прибыль от продаж', 'EBITDA', 'Чистая прибыль', 'Рентабельность (%)'
    ]

    const generateRow = (cat: string, base: number) => {
      return {
        category: cat,
        values: quarters.map((_, i) => {
          const variation = (Math.sin(i * 1.5 + base) * 0.2 + 1)
          return Math.round(base * variation * (1 + i * 0.03)).toLocaleString('ru-RU')
        })
      }
    }

    const tableData = categories.map((cat, i) => generateRow(cat, (i + 1) * 1200 + 5000))

    const balanceSheet = [
      { item: 'Основные средства', q1: '45 200', q2: '46 800', q3: '48 100', q4: '51 300' },
      { item: 'Нематериальные активы', q1: '12 500', q2: '14 200', q3: '15 800', q4: '18 400' },
      { item: 'Запасы и материалы', q1: '8 300', q2: '7 900', q3: '9 100', q4: '8 700' },
      { item: 'Дебиторская задолженность', q1: '22 100', q2: '24 500', q3: '21 800', q4: '26 300' },
      { item: 'Денежные средства', q1: '35 600', q2: '38 200', q3: '42 100', q4: '45 800' },
      { item: 'Финансовые вложения', q1: '15 000', q2: '16 500', q3: '18 200', q4: '20 100' },
      { item: 'Прочие активы', q1: '5 400', q2: '5 800', q3: '6 200', q4: '6 900' },
      { item: 'ИТОГО активы', q1: '144 100', q2: '153 900', q3: '161 300', q4: '177 500' },
      { item: 'Уставный капитал', q1: '10 000', q2: '10 000', q3: '10 000', q4: '10 000' },
      { item: 'Нераспределённая прибыль', q1: '52 300', q2: '58 400', q3: '65 200', q4: '74 800' },
      { item: 'Долгосрочные обязательства', q1: '35 000', q2: '33 500', q3: '31 000', q4: '28 500' },
      { item: 'Краткосрочные обязательства', q1: '28 400', q2: '30 200', q3: '32 500', q4: '35 100' },
      { item: 'Кредиты и займы', q1: '18 400', q2: '21 800', q3: '22 600', q4: '29 100' },
      { item: 'ИТОГО пассивы', q1: '144 100', q2: '153 900', q3: '161 300', q4: '177 500' },
    ]

    return () => h('div', [
      // Page 1 - Title
      h('div', { class: 'report-page' }, [
        h('div', { class: 'text-center py-12' }, [
          h('div', { class: 'text-6xl mb-6' }, '💰'),
          h('h1', { class: 'text-3xl font-bold text-gray-800 mb-4' }, 'Финансовый отчёт'),
          h('h2', { class: 'text-xl text-gray-600 mb-8' }, 'ООО "ФинТех Групп"'),
          h('div', { class: 'border-t border-b border-gray-200 py-4 my-8' }, [
            h('p', { class: 'text-gray-500' }, 'Период: 2024 — 2025'),
            h('p', { class: 'text-gray-500 mt-2' }, `Дата: ${new Date().toLocaleDateString('ru-RU')}`),
          ]),
        ]),
      ]),
      // Page 2 - P&L Summary
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Отчёт о прибылях и убытках'),
        h('div', { class: 'grid grid-cols-4 gap-3 mb-6' },
          ['Выручка: ₽ 248M', 'EBITDA: ₽ 67M', 'Чистая прибыль: ₽ 42M', 'Рент.: 17.2%'].map(t =>
            h('div', { class: 'bg-blue-50 rounded-lg p-3 text-center' }, [
              h('p', { class: 'text-lg font-bold text-blue-800' }, t),
            ])
          )
        ),
        h('table', { class: 'w-full border-collapse text-sm' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            h('th', { class: 'border border-gray-300 px-3 py-2 text-left' }, 'Показатель'),
            ...quarters.map(q => h('th', { class: 'border border-gray-300 px-3 py-2 text-right' }, q))
          ])]),
          h('tbody', tableData.slice(0, 10).map((row, i) =>
            h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-3 py-2 font-medium' }, row.category),
              ...row.values.map(v => h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, v))
            ])
          ))
        ]),
      ]),
      // Page 3 - P&L continued
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Отчёт о прибылях и убытках (продолжение)'),
        h('table', { class: 'w-full border-collapse text-sm' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            h('th', { class: 'border border-gray-300 px-3 py-2 text-left' }, 'Показатель'),
            ...quarters.map(q => h('th', { class: 'border border-gray-300 px-3 py-2 text-right' }, q))
          ])]),
          h('tbody', tableData.slice(10).map((row, i) =>
            h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-3 py-2 font-medium' }, row.category),
              ...row.values.map(v => h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, v))
            ])
          ))
        ]),
      ]),
      // Page 4 - Balance Sheet
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Баланс предприятия'),
        h('table', { class: 'w-full border-collapse text-sm' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            h('th', { class: 'border border-gray-300 px-3 py-2 text-left' }, 'Статья баланса'),
            h('th', { class: 'border border-gray-300 px-3 py-2 text-right' }, 'Q1 2025'),
            h('th', { class: 'border border-gray-300 px-3 py-2 text-right' }, 'Q2 2025'),
            h('th', { class: 'border border-gray-300 px-3 py-2 text-right' }, 'Q3 2025'),
            h('th', { class: 'border border-gray-300 px-3 py-2 text-right' }, 'Q4 2025'),
            h('th', { class: 'border border-gray-300 px-3 py-2 text-right' }, 'Изменение'),
          ])]),
          h('tbody', balanceSheet.map((row, i) =>
            h('tr', { class: `${i % 2 ? 'bg-gray-50' : ''} ${row.item.startsWith('ИТОГО') ? 'font-bold bg-blue-50' : ''}` }, [
              h('td', { class: 'border border-gray-300 px-3 py-2' }, row.item),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, row.q1),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, row.q2),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, row.q3),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, row.q4),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right text-green-600' },
                '+' + Math.round((parseInt(row.q4.replace(/\s/g, '')) - parseInt(row.q1.replace(/\s/g, ''))) / parseInt(row.q1.replace(/\s/g, '')) * 100) + '%'),
            ])
          ))
        ]),
      ]),
      // Page 5 - Cash Flow
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Отчёт о движении денежных средств'),
        h('table', { class: 'w-full border-collapse text-sm' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            h('th', { class: 'border border-gray-300 px-3 py-2 text-left' }, 'Операция'),
            ...quarters.map(q => h('th', { class: 'border border-gray-300 px-3 py-2 text-right' }, q))
          ])]),
          h('tbody', [
            'Поступления от покупателей', 'Поступления от услуг', 'Прочие поступления',
            'Итого поступлений', 'Выплаты поставщикам', 'Выплаты зарплат', 'Налоги и сборы',
            'Проценты по кредитам', 'Капитальные вложения', 'Прочие выплаты',
            'Итого выплат', 'Чистый денежный поток', 'Остаток на начало', 'Остаток на конец'
          ].map((item, i) =>
            h('tr', { class: `${i % 2 ? 'bg-gray-50' : ''} ${item.startsWith('Итого') || item === 'Чистый денежный поток' || item === 'Остаток на конец' ? 'font-bold bg-blue-50' : ''}` }, [
              h('td', { class: 'border border-gray-300 px-3 py-2' }, item),
              ...quarters.map((_, qi) =>
                h('td', { class: 'border border-gray-300 px-3 py-2 text-right' },
                  Math.round((i < 3 ? 15000 : i < 7 ? -8000 : i < 10 ? -3000 : 4000) * (1 + qi * 0.05 + Math.sin(qi) * 0.1)).toLocaleString('ru-RU'))
              )
            ])
          ))
        ]),
      ]),
    ])
  }
}))

// --- 2. ОТЧЁТ ПО ПРОДАЖАМ ---
const SalesReport = markRaw(defineComponent({
  name: 'SalesReport',
  setup() {
    const regions = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Самара', 'Ростов-на-Дону', 'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград', 'Краснодар', 'Тюмень']
    const products = ['CRM Система', 'ERP Модуль', 'BI Аналитика', 'Мобильное приложение', 'Облачное хранилище', 'API Интеграция', 'Техподдержка', 'Обучение', 'Консалтинг', 'Аудит']
    const managers = Array.from({ length: 20 }, (_, i) => `Менеджер ${String.fromCharCode(1040 + i)}.`)

    const salesData = regions.flatMap(region =>
      products.map(product => ({
        region,
        product,
        units: Math.round(Math.random() * 50 + 10),
        revenue: Math.round(Math.random() * 5000 + 500),
        margin: Math.round(Math.random() * 30 + 15),
        growth: Math.round((Math.random() - 0.3) * 40),
      }))
    )

    return () => h('div', [
      h('div', { class: 'report-page' }, [
        h('div', { class: 'text-center py-12' }, [
          h('div', { class: 'text-6xl mb-6' }, '🛒'),
          h('h1', { class: 'text-3xl font-bold text-gray-800 mb-4' }, 'Отчёт по продажам'),
          h('h2', { class: 'text-xl text-gray-600 mb-8' }, 'ООО "ТоргСервис"'),
          h('div', { class: 'border-t border-b border-gray-200 py-4 my-8' }, [
            h('p', { class: 'text-gray-500' }, 'Период: Январь — Декабрь 2025'),
          ]),
        ]),
      ]),
      // Sales by region
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Продажи по регионам'),
        h('table', { class: 'w-full border-collapse text-sm' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'Регион', 'Клиенты', 'Сделки', 'Выручка (тыс.₽)', 'Ср. чек (тыс.₽)', 'Рост YoY'
          ].map(t => h('th', { class: 'border border-gray-300 px-3 py-2 text-left' }, t)))]),
          h('tbody', regions.map((region, i) => {
            const clients = Math.round(Math.random() * 200 + 50)
            const deals = Math.round(clients * (Math.random() * 0.5 + 0.3))
            const revenue = Math.round(Math.random() * 15000 + 2000)
            const avgCheck = Math.round(revenue / deals)
            const growth = Math.round((Math.random() - 0.2) * 50)
            return h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-3 py-2 font-medium' }, region),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, clients.toString()),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, deals.toString()),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, revenue.toLocaleString('ru-RU')),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, avgCheck.toLocaleString('ru-RU')),
              h('td', { class: `border border-gray-300 px-3 py-2 text-right ${growth >= 0 ? 'text-green-600' : 'text-red-600'}` }, (growth >= 0 ? '+' : '') + growth + '%'),
            ])
          }))
        ]),
      ]),
      // Products
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Продажи по продуктам'),
        h('table', { class: 'w-full border-collapse text-sm' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'Продукт', 'Q1', 'Q2', 'Q3', 'Q4', 'Итого', 'Доля (%)'
          ].map(t => h('th', { class: 'border border-gray-300 px-3 py-2 text-left' }, t)))]),
          h('tbody', products.map((product, i) => {
            const q = [1, 2, 3, 4].map(qi => Math.round(Math.random() * 8000 + 2000))
            const total = q.reduce((a, b) => a + b, 0)
            return h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-3 py-2 font-medium' }, product),
              ...q.map(v => h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, v.toLocaleString('ru-RU'))),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right font-bold' }, total.toLocaleString('ru-RU')),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, Math.round(total / 800).toString() + '%'),
            ])
          }))
        ]),
      ]),
      // Detailed sales table
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Детализация продаж (регион × продукт)'),
        h('table', { class: 'w-full border-collapse text-xs' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'Регион', 'Продукт', 'Ед.', 'Выручка', 'Маржа', 'Рост'
          ].map(t => h('th', { class: 'border border-gray-300 px-2 py-1.5 text-left' }, t)))]),
          h('tbody', salesData.slice(0, 40).map((row, i) =>
            h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-2 py-1' }, row.region),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, row.product),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, row.units.toString()),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, row.revenue.toLocaleString('ru-RU')),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, row.margin + '%'),
              h('td', { class: `border border-gray-300 px-2 py-1 text-right ${row.growth >= 0 ? 'text-green-600' : 'text-red-600'}` }, (row.growth >= 0 ? '+' : '') + row.growth + '%'),
            ])
          ))
        ]),
      ]),
      // Continued
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Детализация продаж (продолжение)'),
        h('table', { class: 'w-full border-collapse text-xs' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'Регион', 'Продукт', 'Ед.', 'Выручка', 'Маржа', 'Рост'
          ].map(t => h('th', { class: 'border border-gray-300 px-2 py-1.5 text-left' }, t)))]),
          h('tbody', salesData.slice(40, 80).map((row, i) =>
            h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-2 py-1' }, row.region),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, row.product),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, row.units.toString()),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, row.revenue.toLocaleString('ru-RU')),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, row.margin + '%'),
              h('td', { class: `border border-gray-300 px-2 py-1 text-right ${row.growth >= 0 ? 'text-green-600' : 'text-red-600'}` }, (row.growth >= 0 ? '+' : '') + row.growth + '%'),
            ])
          ))
        ]),
      ]),
      // Managers
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Рейтинг менеджеров по продажам'),
        h('table', { class: 'w-full border-collapse text-sm' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            '#', 'Менеджер', 'Сделки', 'Выручка (тыс.₽)', 'Конверсия', 'Рейтинг'
          ].map(t => h('th', { class: 'border border-gray-300 px-3 py-2 text-left' }, t)))]),
          h('tbody', managers.map((manager, i) => {
            const deals = Math.round(Math.random() * 80 + 20)
            const revenue = Math.round(deals * (Math.random() * 100 + 50))
            const conversion = Math.round(Math.random() * 30 + 15)
            const rating = (5 - i * 0.15).toFixed(1)
            return h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-3 py-2 text-center font-bold' }, (i + 1).toString()),
              h('td', { class: 'border border-gray-300 px-3 py-2' }, manager),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, deals.toString()),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, revenue.toLocaleString('ru-RU')),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, conversion + '%'),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, '⭐ ' + rating),
            ])
          }))
        ]),
      ]),
    ])
  }
}))

// --- 3. HR ОТЧЁТ ---
const HRReport = markRaw(defineComponent({
  name: 'HRReport',
  setup() {
    const departments = ['Разработка', 'Дизайн', 'QA', 'Менеджмент', 'Маркетинг', 'HR', 'Финансы', 'Продажи', 'Поддержка', 'Аналитика', 'DevOps', 'Безопасность']
    const positions = ['Junior', 'Middle', 'Senior', 'Lead', 'Principal', 'Manager', 'Director', 'VP']
    const cities = ['Москва', 'СПб', 'Новосибирск', 'Екатеринбург', 'Казань', 'Удалённо']
    const names = ['Иванов А.', 'Петров Б.', 'Сидоров В.', 'Козлов Г.', 'Новиков Д.', 'Морозов Е.', 'Волков Ж.', 'Соколов З.', 'Лебедев И.', 'Попов К.', 'Кузнецов Л.', 'Смирнов М.', 'Орлов Н.', 'Маслов О.', 'Белов П.', 'Романов Р.', 'Грибов С.', 'Титов Т.', 'Фёдоров У.', 'Баранов Ф.']

    const employees = Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      name: names[i % names.length] + ' ' + String.fromCharCode(1040 + (i % 32)),
      department: departments[i % departments.length],
      position: positions[i % positions.length],
      city: cities[i % cities.length],
      salary: Math.round((30 + i * 3 + Math.random() * 50) * 1000),
      hireDate: `${2018 + (i % 7)}.${String((i % 12) + 1).padStart(2, '0')}.${String((i % 28) + 1).padStart(2, '0')}`,
      performance: Math.round(Math.random() * 40 + 60),
    }))

    return () => h('div', [
      h('div', { class: 'report-page' }, [
        h('div', { class: 'text-center py-12' }, [
          h('div', { class: 'text-6xl mb-6' }, '👥'),
          h('h1', { class: 'text-3xl font-bold text-gray-800 mb-4' }, 'HR Отчёт'),
          h('h2', { class: 'text-xl text-gray-600 mb-8' }, 'ООО "КадрПро"'),
          h('div', { class: 'border-t border-b border-gray-200 py-4 my-8' }, [
            h('p', { class: 'text-gray-500' }, 'Данные за 2025 год'),
          ]),
        ]),
      ]),
      // Summary
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Сводка по персоналу'),
        h('div', { class: 'grid grid-cols-4 gap-3 mb-6' }, [
          ['Всего: 247', 'Новых: +38', 'Уволено: 12', 'Текучесть: 4.8%'].map(t =>
            h('div', { class: 'bg-indigo-50 rounded-lg p-3 text-center' }, [
              h('p', { class: 'text-lg font-bold text-indigo-800' }, t),
            ])
          )
        ]),
        h('h3', { class: 'font-semibold text-gray-700 mb-3' }, 'По отделам'),
        h('table', { class: 'w-full border-collapse text-sm' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'Отдел', 'Штат', 'Вакансии', 'Ср. зарплата', 'Оценка', 'Текучесть'
          ].map(t => h('th', { class: 'border border-gray-300 px-3 py-2 text-left' }, t)))]),
          h('tbody', departments.map((dept, i) =>
            h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-3 py-2 font-medium' }, dept),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, Math.round(Math.random() * 30 + 10).toString()),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, Math.round(Math.random() * 5).toString()),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, (Math.round(Math.random() * 100 + 80) * 1000).toLocaleString('ru-RU') + ' ₽'),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, (Math.random() * 2 + 3).toFixed(1)),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, Math.round(Math.random() * 8 + 2) + '%'),
            ])
          ))
        ]),
      ]),
      // Employees table page 1
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Список сотрудников'),
        h('table', { class: 'w-full border-collapse text-xs' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'ID', 'ФИО', 'Отдел', 'Должность', 'Город', 'Оклад', 'Дата найма', 'Оценка'
          ].map(t => h('th', { class: 'border border-gray-300 px-2 py-1.5 text-left' }, t)))]),
          h('tbody', employees.slice(0, 30).map((emp, i) =>
            h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-2 py-1 text-center' }, emp.id.toString()),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, emp.name),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, emp.department),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, emp.position),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, emp.city),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, emp.salary.toLocaleString('ru-RU')),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, emp.hireDate),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-center' }, emp.performance + '%'),
            ])
          ))
        ]),
      ]),
      // Employees continued
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Список сотрудников (продолжение)'),
        h('table', { class: 'w-full border-collapse text-xs' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'ID', 'ФИО', 'Отдел', 'Должность', 'Город', 'Оклад', 'Дата найма', 'Оценка'
          ].map(t => h('th', { class: 'border border-gray-300 px-2 py-1.5 text-left' }, t)))]),
          h('tbody', employees.slice(30, 60).map((emp, i) =>
            h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-2 py-1 text-center' }, emp.id.toString()),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, emp.name),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, emp.department),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, emp.position),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, emp.city),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, emp.salary.toLocaleString('ru-RU')),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, emp.hireDate),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-center' }, emp.performance + '%'),
            ])
          ))
        ]),
      ]),
      // Salary distribution
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Распределение зарплат по грейдам'),
        h('table', { class: 'w-full border-collapse text-sm' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'Грейд', 'Мин. оклад', 'Макс. оклад', 'Средний', 'Кол-во', 'Бонус (%)'
          ].map(t => h('th', { class: 'border border-gray-300 px-3 py-2 text-left' }, t)))]),
          h('tbody', positions.map((pos, i) =>
            h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-3 py-2 font-medium' }, pos),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, (60000 + i * 40000).toLocaleString('ru-RU') + ' ₽'),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, (100000 + i * 60000).toLocaleString('ru-RU') + ' ₽'),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, (80000 + i * 50000).toLocaleString('ru-RU') + ' ₽'),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, Math.round(Math.random() * 30 + 5).toString()),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, (10 + i * 3) + '%'),
            ])
          ))
        ]),
      ]),
    ])
  }
}))

// --- 4. ОТЧЁТ ПО ПРОЕКТАМ ---
const ProjectsReport = markRaw(defineComponent({
  name: 'ProjectsReport',
  setup() {
    const projects = Array.from({ length: 25 }, (_, i) => ({
      id: `PRJ-${String(i + 1).padStart(3, '0')}`,
      name: ['AI Платформа', 'CRM v3', 'Мобильное приложение', 'Миграция облака', 'ERP интеграция', 'BI Дашборд', 'API Gateway', 'Микросервисы', 'DevOps CI/CD', 'Безопасность', 'Рефакторинг', 'Тестирование', 'Документация', 'Аналитика', 'Чат-бот'][i % 15] + ` #${i + 1}`,
      client: ['ТехноПром', 'ФинБанк', 'МедиаГрупп', 'РитейлМакс', 'ЛогистикПро', 'ЭнергоСбыт', 'СтройИнвест'][i % 7],
      status: ['Активен', 'Завершён', 'На паузе', 'Планирование'][i % 4],
      priority: ['Критический', 'Высокий', 'Средний', 'Низкий'][i % 4],
      budget: Math.round(Math.random() * 5000 + 500),
      spent: Math.round(Math.random() * 4000),
      progress: Math.round(Math.random() * 100),
      deadline: `2025-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      team: Math.round(Math.random() * 12 + 3),
    }))

    const tasks = Array.from({ length: 80 }, (_, i) => ({
      project: projects[i % projects.length].id,
      task: `Задача ${i + 1}: ${['Разработка', 'Тестирование', 'Дизайн', 'Документация', 'Деплой', 'Ревью', 'Аналитика', 'Оптимизация'][i % 8]}`,
      assignee: ['Алексеев', 'Борисов', 'Васильев', 'Григорьев', 'Дмитриев'][i % 5],
      status: ['Готово', 'В работе', 'На проверке', 'Заблокировано'][i % 4],
      hours: Math.round(Math.random() * 40 + 2),
      deadline: `2025-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    }))

    return () => h('div', [
      h('div', { class: 'report-page' }, [
        h('div', { class: 'text-center py-12' }, [
          h('div', { class: 'text-6xl mb-6' }, '📋'),
          h('h1', { class: 'text-3xl font-bold text-gray-800 mb-4' }, 'Отчёт по проектам'),
          h('h2', { class: 'text-xl text-gray-600 mb-8' }, 'ООО "ПроектМастер"'),
          h('div', { class: 'border-t border-b border-gray-200 py-4 my-8' }, [
            h('p', { class: 'text-gray-500' }, 'Портфель проектов 2025'),
          ]),
        ]),
      ]),
      // Projects list
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Реестр проектов'),
        h('table', { class: 'w-full border-collapse text-xs' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'ID', 'Название', 'Клиент', 'Статус', 'Приоритет', 'Бюджет', 'Потрачено', 'Прогресс', 'Дедлайн', 'Команда'
          ].map(t => h('th', { class: 'border border-gray-300 px-2 py-1.5 text-left' }, t)))]),
          h('tbody', projects.slice(0, 15).map((p, i) =>
            h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-2 py-1 font-mono' }, p.id),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, p.name),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, p.client),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, p.status),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, p.priority),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, p.budget.toLocaleString('ru-RU') + 'т₽'),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, p.spent.toLocaleString('ru-RU') + 'т₽'),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, p.progress + '%'),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, p.deadline),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-center' }, p.team.toString()),
            ])
          ))
        ]),
      ]),
      // Projects continued
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Реестр проектов (продолжение)'),
        h('table', { class: 'w-full border-collapse text-xs' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'ID', 'Название', 'Клиент', 'Статус', 'Приоритет', 'Бюджет', 'Потрачено', 'Прогресс', 'Дедлайн', 'Команда'
          ].map(t => h('th', { class: 'border border-gray-300 px-2 py-1.5 text-left' }, t)))]),
          h('tbody', projects.slice(15).map((p, i) =>
            h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-2 py-1 font-mono' }, p.id),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, p.name),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, p.client),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, p.status),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, p.priority),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, p.budget.toLocaleString('ru-RU') + 'т₽'),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, p.spent.toLocaleString('ru-RU') + 'т₽'),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, p.progress + '%'),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, p.deadline),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-center' }, p.team.toString()),
            ])
          ))
        ]),
      ]),
      // Tasks
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Задачи по проектам'),
        h('table', { class: 'w-full border-collapse text-xs' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'Проект', 'Задача', 'Исполнитель', 'Статус', 'Часы', 'Дедлайн'
          ].map(t => h('th', { class: 'border border-gray-300 px-2 py-1.5 text-left' }, t)))]),
          h('tbody', tasks.slice(0, 40).map((t, i) =>
            h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-2 py-1 font-mono' }, t.project),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, t.task),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, t.assignee),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, t.status),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, t.hours.toString()),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, t.deadline),
            ])
          ))
        ]),
      ]),
      // Tasks continued
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Задачи по проектам (продолжение)'),
        h('table', { class: 'w-full border-collapse text-xs' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'Проект', 'Задача', 'Исполнитель', 'Статус', 'Часы', 'Дедлайн'
          ].map(t => h('th', { class: 'border border-gray-300 px-2 py-1.5 text-left' }, t)))]),
          h('tbody', tasks.slice(40, 80).map((t, i) =>
            h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-2 py-1 font-mono' }, t.project),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, t.task),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, t.assignee),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, t.status),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, t.hours.toString()),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, t.deadline),
            ])
          ))
        ]),
      ]),
      // Summary
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Сводка по проектам'),
        h('table', { class: 'w-full border-collapse text-sm' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'Метрика', 'Значение'
          ].map(t => h('th', { class: 'border border-gray-300 px-3 py-2 text-left' }, t)))]),
          h('tbody', [
            ['Всего проектов', projects.length.toString()],
            ['Активных', projects.filter(p => p.status === 'Активен').length.toString()],
            ['Завершённых', projects.filter(p => p.status === 'Завершён').length.toString()],
            ['Общий бюджет', projects.reduce((a, b) => a + b.budget, 0).toLocaleString('ru-RU') + ' т₽'],
            ['Освоено', projects.reduce((a, b) => a + b.spent, 0).toLocaleString('ru-RU') + ' т₽'],
            ['Средний прогресс', Math.round(projects.reduce((a, b) => a + b.progress, 0) / projects.length) + '%'],
            ['Всего задач', tasks.length.toString()],
            ['Выполнено задач', tasks.filter(t => t.status === 'Готово').length.toString()],
            ['Общие часы', tasks.reduce((a, b) => a + b.hours, 0).toLocaleString('ru-RU') + ' ч'],
            ['Средняя команда', (projects.reduce((a, b) => a + b.team, 0) / projects.length).toFixed(1) + ' чел.'],
          ].map(([metric, value], i) =>
            h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-3 py-2 font-medium' }, metric),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right font-bold' }, value),
            ])
          ))
        ]),
      ]),
    ])
  }
}))

// --- 5. СКЛАДСКОЙ ОТЧЁТ ---
const WarehouseReport = markRaw(defineComponent({
  name: 'WarehouseReport',
  setup() {
    const categories = ['Электроника', 'Мебель', 'Одежда', 'Продукты', 'Инструменты', 'Канцтовары', 'Бытовая химия', 'Спорт', 'Книги', 'Игрушки']
    const warehouses = ['Склад-1 Москва', 'Склад-2 СПб', 'Склад-3 Казань', 'Склад-4 Новосибирск', 'Склад-5 Екатеринбург']

    const items = Array.from({ length: 100 }, (_, i) => ({
      sku: `SKU-${String(i + 1).padStart(5, '0')}`,
      name: ['Ноутбук', 'Стол офисный', 'Куртка', 'Рис', 'Дрель', 'Бумага А4', 'Мыло', 'Мяч', 'Книга', 'Конструктор'][i % 10] + ` ${String.fromCharCode(65 + i % 26)}-${Math.floor(i / 10) + 1}`,
      category: categories[i % categories.length],
      warehouse: warehouses[i % warehouses.length],
      quantity: Math.round(Math.random() * 500 + 10),
      unitPrice: Math.round(Math.random() * 10000 + 100),
      minStock: Math.round(Math.random() * 50 + 10),
      lastReceived: `2025-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      supplier: ['Поставщик А', 'Поставщик Б', 'Поставщик В', 'Поставщик Г', 'Поставщик Д'][i % 5],
    }))

    return () => h('div', [
      h('div', { class: 'report-page' }, [
        h('div', { class: 'text-center py-12' }, [
          h('div', { class: 'text-6xl mb-6' }, '📦'),
          h('h1', { class: 'text-3xl font-bold text-gray-800 mb-4' }, 'Складской отчёт'),
          h('h2', { class: 'text-xl text-gray-600 mb-8' }, 'ООО "ЛогистикМакс"'),
          h('div', { class: 'border-t border-b border-gray-200 py-4 my-8' }, [
            h('p', { class: 'text-gray-500' }, 'Инвентаризация на ' + new Date().toLocaleDateString('ru-RU')),
          ]),
        ]),
      ]),
      // Summary by warehouse
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Сводка по складам'),
        h('table', { class: 'w-full border-collapse text-sm' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'Склад', 'SKU', 'Единиц', 'Стоимость', 'Категорий', 'Дефицит'
          ].map(t => h('th', { class: 'border border-gray-300 px-3 py-2 text-left' }, t)))]),
          h('tbody', warehouses.map((wh, i) => {
            const whItems = items.filter(it => it.warehouse === wh)
            const totalQty = whItems.reduce((a, b) => a + b.quantity, 0)
            const totalValue = whItems.reduce((a, b) => a + b.quantity * b.unitPrice, 0)
            const deficit = whItems.filter(it => it.quantity < it.minStock).length
            return h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-3 py-2 font-medium' }, wh),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, whItems.length.toString()),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, totalQty.toLocaleString('ru-RU')),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, totalValue.toLocaleString('ru-RU') + ' ₽'),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, new Set(whItems.map(it => it.category)).size.toString()),
              h('td', { class: `border border-gray-300 px-3 py-2 text-right ${deficit > 0 ? 'text-red-600 font-bold' : 'text-green-600'}` }, deficit.toString()),
            ])
          }))
        ]),
        h('h3', { class: 'font-semibold text-gray-700 mt-6 mb-3' }, 'По категориям'),
        h('table', { class: 'w-full border-collapse text-sm' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'Категория', 'SKU', 'Единиц', 'Ср. цена', 'Общая стоимость'
          ].map(t => h('th', { class: 'border border-gray-300 px-3 py-2 text-left' }, t)))]),
          h('tbody', categories.map((cat, i) => {
            const catItems = items.filter(it => it.category === cat)
            const totalQty = catItems.reduce((a, b) => a + b.quantity, 0)
            const avgPrice = Math.round(catItems.reduce((a, b) => a + b.unitPrice, 0) / catItems.length)
            const totalValue = catItems.reduce((a, b) => a + b.quantity * b.unitPrice, 0)
            return h('tr', { class: i % 2 ? 'bg-gray-50' : '' }, [
              h('td', { class: 'border border-gray-300 px-3 py-2 font-medium' }, cat),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, catItems.length.toString()),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, totalQty.toLocaleString('ru-RU')),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, avgPrice.toLocaleString('ru-RU') + ' ₽'),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right font-bold' }, totalValue.toLocaleString('ru-RU') + ' ₽'),
            ])
          }))
        ]),
      ]),
      // Items page 1
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Детальный реестр товаров (1-35)'),
        h('table', { class: 'w-full border-collapse text-xs' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'SKU', 'Наименование', 'Категория', 'Склад', 'Кол-во', 'Цена', 'Мин.ост.', 'Поступление', 'Поставщик'
          ].map(t => h('th', { class: 'border border-gray-300 px-2 py-1.5 text-left' }, t)))]),
          h('tbody', items.slice(0, 35).map((item, i) =>
            h('tr', { class: `${i % 2 ? 'bg-gray-50' : ''} ${item.quantity < item.minStock ? 'bg-red-50' : ''}` }, [
              h('td', { class: 'border border-gray-300 px-2 py-1 font-mono' }, item.sku),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, item.name),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, item.category),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, item.warehouse),
              h('td', { class: `border border-gray-300 px-2 py-1 text-right ${item.quantity < item.minStock ? 'text-red-600 font-bold' : ''}` }, item.quantity.toString()),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, item.unitPrice.toLocaleString('ru-RU')),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, item.minStock.toString()),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, item.lastReceived),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, item.supplier),
            ])
          ))
        ]),
      ]),
      // Items page 2
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Детальный реестр товаров (36-70)'),
        h('table', { class: 'w-full border-collapse text-xs' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'SKU', 'Наименование', 'Категория', 'Склад', 'Кол-во', 'Цена', 'Мин.ост.', 'Поступление', 'Поставщик'
          ].map(t => h('th', { class: 'border border-gray-300 px-2 py-1.5 text-left' }, t)))]),
          h('tbody', items.slice(35, 70).map((item, i) =>
            h('tr', { class: `${i % 2 ? 'bg-gray-50' : ''} ${item.quantity < item.minStock ? 'bg-red-50' : ''}` }, [
              h('td', { class: 'border border-gray-300 px-2 py-1 font-mono' }, item.sku),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, item.name),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, item.category),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, item.warehouse),
              h('td', { class: `border border-gray-300 px-2 py-1 text-right ${item.quantity < item.minStock ? 'text-red-600 font-bold' : ''}` }, item.quantity.toString()),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, item.unitPrice.toLocaleString('ru-RU')),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, item.minStock.toString()),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, item.lastReceived),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, item.supplier),
            ])
          ))
        ]),
      ]),
      // Items page 3
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Детальный реестр товаров (71-100)'),
        h('table', { class: 'w-full border-collapse text-xs' }, [
          h('thead', [h('tr', { class: 'bg-gray-100' }, [
            'SKU', 'Наименование', 'Категория', 'Склад', 'Кол-во', 'Цена', 'Мин.ост.', 'Поступление', 'Поставщик'
          ].map(t => h('th', { class: 'border border-gray-300 px-2 py-1.5 text-left' }, t)))]),
          h('tbody', items.slice(70).map((item, i) =>
            h('tr', { class: `${i % 2 ? 'bg-gray-50' : ''} ${item.quantity < item.minStock ? 'bg-red-50' : ''}` }, [
              h('td', { class: 'border border-gray-300 px-2 py-1 font-mono' }, item.sku),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, item.name),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, item.category),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, item.warehouse),
              h('td', { class: `border border-gray-300 px-2 py-1 text-right ${item.quantity < item.minStock ? 'text-red-600 font-bold' : ''}` }, item.quantity.toString()),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, item.unitPrice.toLocaleString('ru-RU')),
              h('td', { class: 'border border-gray-300 px-2 py-1 text-right' }, item.minStock.toString()),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, item.lastReceived),
              h('td', { class: 'border border-gray-300 px-2 py-1' }, item.supplier),
            ])
          ))
        ]),
      ]),
      // Deficit items
      h('div', { class: 'report-page' }, [
        h('h2', { class: 'text-2xl font-bold text-gray-800 border-b pb-2 mb-6' }, 'Товары с дефицитом (ниже мин. остатка)'),
        h('table', { class: 'w-full border-collapse text-sm' }, [
          h('thead', [h('tr', { class: 'bg-red-50' }, [
            'SKU', 'Наименование', 'Склад', 'Текущий остаток', 'Мин. остаток', 'Дефицит', 'Поставщик'
          ].map(t => h('th', { class: 'border border-gray-300 px-3 py-2 text-left' }, t)))]),
          h('tbody', items.filter(it => it.quantity < it.minStock).map((item, i) =>
            h('tr', { class: i % 2 ? 'bg-red-50/50' : '' }, [
              h('td', { class: 'border border-gray-300 px-3 py-2 font-mono text-xs' }, item.sku),
              h('td', { class: 'border border-gray-300 px-3 py-2' }, item.name),
              h('td', { class: 'border border-gray-300 px-3 py-2' }, item.warehouse),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right text-red-600 font-bold' }, item.quantity.toString()),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right' }, item.minStock.toString()),
              h('td', { class: 'border border-gray-300 px-3 py-2 text-right text-red-600 font-bold' }, '-' + (item.minStock - item.quantity).toString()),
              h('td', { class: 'border border-gray-300 px-3 py-2' }, item.supplier),
            ])
          ))
        ]),
        h('div', { class: 'mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg' }, [
          h('h3', { class: 'font-semibold text-amber-800 mb-2' }, '⚠️ Рекомендации'),
          h('ul', { class: 'text-sm text-amber-700 space-y-1' }, [
            h('li', 'Срочно заказать товары с критическим дефицитом'),
            h('li', 'Пересмотреть минимальные остатки для быстродвижущихся товаров'),
            h('li', 'Согласовать с поставщиками ускоренные поставки'),
          ]),
        ]),
      ]),
    ])
  }
}))

// ============ MAIN APP ============

const reportExamples = [
  { icon: '💰', name: 'Финансовый', desc: 'P&L, Баланс, Cash Flow', component: FinancialReport, pages: 5, tablesCount: 4, rowsCount: 50, format: 'a4', title: 'Финансовый отчёт', company: 'ООО "ФинТех Групп"' },
  { icon: '🛒', name: 'Продажи', desc: 'Регионы, продукты, менеджеры', component: SalesReport, pages: 5, tablesCount: 4, rowsCount: 170, format: 'a4', title: 'Отчёт по продажам', company: 'ООО "ТоргСервис"' },
  { icon: '👥', name: 'HR', desc: 'Сотрудники, зарплаты, отделы', component: HRReport, pages: 5, tablesCount: 4, rowsCount: 72, format: 'a4', title: 'HR Отчёт', company: 'ООО "КадрПро"' },
  { icon: '📋', name: 'Проекты', desc: 'Реестр, задачи, метрики', component: ProjectsReport, pages: 6, tablesCount: 5, rowsCount: 185, format: 'a4', title: 'Отчёт по проектам', company: 'ООО "ПроектМастер"' },
  { icon: '📦', name: 'Склад', desc: 'Инвентаризация, дефицит', component: WarehouseReport, pages: 6, tablesCount: 5, rowsCount: 130, format: 'a4', title: 'Складской отчёт', company: 'ООО "ЛогистикМакс"' },
]

const selectedReport = ref(0)
const showCode = ref(false)
const copied = ref(false)
const toast = ref<{ icon: string; title: string; message: string } | null>(null)

const currentDate = new Date().toLocaleDateString('ru-RU')
const currentReport = computed(() => reportExamples[selectedReport.value])

const showToast = (icon: string, title: string, message: string) => {
  toast.value = { icon, title, message }
  setTimeout(() => { toast.value = null }, 3000)
}

const onExportStart = () => {
  showToast('⏳', 'Экспорт начат', 'Генерация документа...')
}

const onExportEnd = (data: { format: string; pages?: number }) => {
  const icon = data.format === 'pdf' ? '📄' : '🌐'
  const title = data.format === 'pdf' ? 'PDF создан!' : 'HTML создан!'
  const message = data.pages ? `${data.pages} страниц экспортировано` : 'Документ готов'
  showToast(icon, title, message)
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(usageCode)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (e) {
    console.error('Copy error:', e)
  }
}

const usageCode = `<template>
  <ReportGenerator
    title="Годовой отчёт"
    page-size="a4"
    orientation="portrait"
    :margin="15"
    @export-start="onExportStart"
    @export-end="onExportEnd"
  >
    <!-- Заголовок -->
    <template #header="{ page, totalPages }">
      <div class="doc-header">
        <span>ООО "Компания"</span>
        <span>Стр. {{ page + 1 }} / {{ totalPages }}</span>
      </div>
    </template>

    <!-- Каждая страница в div.report-page -->
    <div class="report-page">
      <h1>Титульная страница</h1>
    </div>

    <div class="report-page">
      <h2>Большая таблица</h2>
      <table>
        <thead>
          <tr><th>Колонка 1</th><th>Колонка 2</th><th>Колонка 3</th></tr>
        </thead>
        <tbody>
          <tr v-for="row in data" :key="row.id">
            <td>{{ row.col1 }}</td>
            <td>{{ row.col2 }}</td>
            <td>{{ row.col3 }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Подвал -->
    <template #footer>
      <p>© 2025 Конфиденциально</p>
    </template>
  </ReportGenerator>
</template>

<script setup>
import ReportGenerator from './components/ReportGenerator.vue'

const data = ref([
  /* ваши данные */
])
<\/script>`
</script>
