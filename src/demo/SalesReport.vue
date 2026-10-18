<script setup lang="ts">
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

const regionStats = regions.map(region => {
  const clients = Math.round(Math.random() * 200 + 50)
  const deals = Math.round(clients * (Math.random() * 0.5 + 0.3))
  const revenue = Math.round(Math.random() * 15000 + 2000)
  const avgCheck = Math.round(revenue / deals)
  const growth = Math.round((Math.random() - 0.2) * 50)
  return { region, clients, deals, revenue, avgCheck, growth }
})

const productStats = products.map(product => {
  const q = [1, 2, 3, 4].map(() => Math.round(Math.random() * 8000 + 2000))
  const total = q.reduce((a, b) => a + b, 0)
  return { product, q, total, share: Math.round(total / 800) }
})

const managerStats = managers.map((manager, i) => {
  const deals = Math.round(Math.random() * 80 + 20)
  const revenue = Math.round(deals * (Math.random() * 100 + 50))
  const conversion = Math.round(Math.random() * 30 + 15)
  const rating = (5 - i * 0.15).toFixed(1)
  return { manager, deals, revenue, conversion, rating }
})
</script>

<template>
  <div>
    <div class="report-page">
      <div class="text-center py-12">
        <div class="icon-large">🛒</div>
        <h1>Отчёт по продажам</h1>
        <p class="text-xl text-gray-600 mb-8">ООО "ТоргСервис"</p>
        <div class="border-t border-b py-4 my-8">
          <p class="text-gray-500">Период: Январь — Декабрь 2025</p>
        </div>
      </div>
    </div>

    <div class="report-page">
      <h2>Продажи по регионам</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Регион</th>
            <th style="text-align: right">Клиенты</th>
            <th style="text-align: right">Сделки</th>
            <th style="text-align: right">Выручка (тыс.₽)</th>
            <th style="text-align: right">Ср. чек (тыс.₽)</th>
            <th style="text-align: right">Рост YoY</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in regionStats" :key="i">
            <td style="font-weight: 500">{{ row.region }}</td>
            <td style="text-align: right">{{ row.clients }}</td>
            <td style="text-align: right">{{ row.deals }}</td>
            <td style="text-align: right">{{ row.revenue.toLocaleString('ru-RU') }}</td>
            <td style="text-align: right">{{ row.avgCheck.toLocaleString('ru-RU') }}</td>
            <td style="text-align: right" :style="{ color: row.growth >= 0 ? '#059669' : '#dc2626' }">
              {{ row.growth >= 0 ? '+' : '' }}{{ row.growth }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-page">
      <h2>Продажи по продуктам</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Продукт</th>
            <th style="text-align: right">Q1</th>
            <th style="text-align: right">Q2</th>
            <th style="text-align: right">Q3</th>
            <th style="text-align: right">Q4</th>
            <th style="text-align: right">Итого</th>
            <th style="text-align: right">Доля (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in productStats" :key="i">
            <td style="font-weight: 500">{{ row.product }}</td>
            <td v-for="v in row.q" :key="v" style="text-align: right">{{ v.toLocaleString('ru-RU') }}</td>
            <td style="text-align: right; font-weight: 700">{{ row.total.toLocaleString('ru-RU') }}</td>
            <td style="text-align: right">{{ row.share }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-page">
      <h2>Детализация продаж (регион × продукт)</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Регион</th>
            <th style="text-align: left">Продукт</th>
            <th style="text-align: right">Ед.</th>
            <th style="text-align: right">Выручка</th>
            <th style="text-align: right">Маржа</th>
            <th style="text-align: right">Рост</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in salesData.slice(0, 40)" :key="i">
            <td>{{ row.region }}</td>
            <td>{{ row.product }}</td>
            <td style="text-align: right">{{ row.units }}</td>
            <td style="text-align: right">{{ row.revenue.toLocaleString('ru-RU') }}</td>
            <td style="text-align: right">{{ row.margin }}%</td>
            <td style="text-align: right" :style="{ color: row.growth >= 0 ? '#059669' : '#dc2626' }">
              {{ row.growth >= 0 ? '+' : '' }}{{ row.growth }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-page">
      <h2>Детализация продаж (продолжение)</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Регион</th>
            <th style="text-align: left">Продукт</th>
            <th style="text-align: right">Ед.</th>
            <th style="text-align: right">Выручка</th>
            <th style="text-align: right">Маржа</th>
            <th style="text-align: right">Рост</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in salesData.slice(40, 80)" :key="i">
            <td>{{ row.region }}</td>
            <td>{{ row.product }}</td>
            <td style="text-align: right">{{ row.units }}</td>
            <td style="text-align: right">{{ row.revenue.toLocaleString('ru-RU') }}</td>
            <td style="text-align: right">{{ row.margin }}%</td>
            <td style="text-align: right" :style="{ color: row.growth >= 0 ? '#059669' : '#dc2626' }">
              {{ row.growth >= 0 ? '+' : '' }}{{ row.growth }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-page">
      <h2>Рейтинг менеджеров по продажам</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">#</th>
            <th style="text-align: left">Менеджер</th>
            <th style="text-align: right">Сделки</th>
            <th style="text-align: right">Выручка (тыс.₽)</th>
            <th style="text-align: right">Конверсия</th>
            <th style="text-align: right">Рейтинг</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in managerStats" :key="i">
            <td style="text-align: center; font-weight: 700">{{ i + 1 }}</td>
            <td>{{ row.manager }}</td>
            <td style="text-align: right">{{ row.deals }}</td>
            <td style="text-align: right">{{ row.revenue.toLocaleString('ru-RU') }}</td>
            <td style="text-align: right">{{ row.conversion }}%</td>
            <td style="text-align: right">⭐ {{ row.rating }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
