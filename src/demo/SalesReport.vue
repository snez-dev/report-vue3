<script setup lang="ts">
import { ref } from 'vue'

const regions = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Самара', 'Ростов-на-Дону', 'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград', 'Краснодар', 'Тюмень']
const products = ['CRM Система', 'ERP Модуль', 'BI Аналитика', 'Мобильное приложение', 'Облачное хранилище', 'API Интеграция', 'Техподдержка', 'Обучение', 'Консалтинг', 'Аудит']
const managers = Array.from({ length: 20 }, (_, i) => `Менеджер ${String.fromCharCode(1040 + i)}.`)

// Генерация данных
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

// Данные по регионам
const regionStats = regions.map(region => {
  const clients = Math.round(Math.random() * 200 + 50)
  const deals = Math.round(clients * (Math.random() * 0.5 + 0.3))
  const revenue = Math.round(Math.random() * 15000 + 2000)
  const avgCheck = Math.round(revenue / deals)
  const growth = Math.round((Math.random() - 0.2) * 50)
  return { region, clients, deals, revenue, avgCheck, growth }
})

// Данные по продуктам
const productStats = products.map(product => {
  const q = [1, 2, 3, 4].map(() => Math.round(Math.random() * 8000 + 2000))
  const total = q.reduce((a, b) => a + b, 0)
  return { product, q, total, share: Math.round(total / 800) }
})

// Данные менеджеров
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
    <!-- Титульная страница -->
    <div class="report-page">
      <div class="text-center py-12">
        <div class="text-6xl mb-6">🛒</div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Отчёт по продажам</h1>
        <h2 class="text-xl text-gray-600 mb-8">ООО "ТоргСервис"</h2>
        <div class="border-t border-b border-gray-200 py-4 my-8">
          <p class="text-gray-500">Период: Январь — Декабрь 2025</p>
        </div>
      </div>
    </div>

    <!-- Продажи по регионам -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Продажи по регионам</h2>
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-3 py-2 text-left">Регион</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Клиенты</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Сделки</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Выручка (тыс.₽)</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Ср. чек (тыс.₽)</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Рост YoY</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in regionStats" :key="i" :class="i % 2 ? 'bg-gray-50' : ''">
            <td class="border border-gray-300 px-3 py-2 font-medium">{{ row.region }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.clients }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.deals }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.revenue.toLocaleString('ru-RU') }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.avgCheck.toLocaleString('ru-RU') }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right" :class="row.growth >= 0 ? 'text-green-600' : 'text-red-600'">
              {{ row.growth >= 0 ? '+' : '' }}{{ row.growth }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Продажи по продуктам -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Продажи по продуктам</h2>
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-3 py-2 text-left">Продукт</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Q1</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Q2</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Q3</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Q4</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Итого</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Доля (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in productStats" :key="i" :class="i % 2 ? 'bg-gray-50' : ''">
            <td class="border border-gray-300 px-3 py-2 font-medium">{{ row.product }}</td>
            <td v-for="v in row.q" :key="v" class="border border-gray-300 px-3 py-2 text-right">{{ v.toLocaleString('ru-RU') }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right font-bold">{{ row.total.toLocaleString('ru-RU') }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.share }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Детализация продаж (часть 1) -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Детализация продаж (регион × продукт)</h2>
      <table class="w-full border-collapse text-xs">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-2 py-1.5 text-left">Регион</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Продукт</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Ед.</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Выручка</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Маржа</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Рост</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in salesData.slice(0, 40)" :key="i" :class="i % 2 ? 'bg-gray-50' : ''">
            <td class="border border-gray-300 px-2 py-1">{{ row.region }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ row.product }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ row.units }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ row.revenue.toLocaleString('ru-RU') }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ row.margin }}%</td>
            <td class="border border-gray-300 px-2 py-1 text-right" :class="row.growth >= 0 ? 'text-green-600' : 'text-red-600'">
              {{ row.growth >= 0 ? '+' : '' }}{{ row.growth }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Детализация продаж (часть 2) -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Детализация продаж (продолжение)</h2>
      <table class="w-full border-collapse text-xs">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-2 py-1.5 text-left">Регион</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Продукт</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Ед.</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Выручка</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Маржа</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Рост</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in salesData.slice(40, 80)" :key="i" :class="i % 2 ? 'bg-gray-50' : ''">
            <td class="border border-gray-300 px-2 py-1">{{ row.region }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ row.product }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ row.units }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ row.revenue.toLocaleString('ru-RU') }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ row.margin }}%</td>
            <td class="border border-gray-300 px-2 py-1 text-right" :class="row.growth >= 0 ? 'text-green-600' : 'text-red-600'">
              {{ row.growth >= 0 ? '+' : '' }}{{ row.growth }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Рейтинг менеджеров -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Рейтинг менеджеров по продажам</h2>
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-3 py-2 text-left">#</th>
            <th class="border border-gray-300 px-3 py-2 text-left">Менеджер</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Сделки</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Выручка (тыс.₽)</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Конверсия</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Рейтинг</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in managerStats" :key="i" :class="i % 2 ? 'bg-gray-50' : ''">
            <td class="border border-gray-300 px-3 py-2 text-center font-bold">{{ i + 1 }}</td>
            <td class="border border-gray-300 px-3 py-2">{{ row.manager }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.deals }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.revenue.toLocaleString('ru-RU') }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.conversion }}%</td>
            <td class="border border-gray-300 px-3 py-2 text-right">⭐ {{ row.rating }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
