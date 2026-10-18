<script setup lang="ts">
import { ref } from 'vue'

const categories = ['Электроника', 'Мебель', 'Одежда', 'Продукты', 'Инструменты', 'Канцтовары', 'Бытовая химия', 'Спорт', 'Книги', 'Игрушки']
const warehouses = ['Склад-1 Москва', 'Склад-2 СПб', 'Склад-3 Казань', 'Склад-4 Новосибирск', 'Склад-5 Екатеринбург']
const itemNames = ['Ноутбук', 'Стол офисный', 'Куртка', 'Рис', 'Дрель', 'Бумага А4', 'Мыло', 'Мяч', 'Книга', 'Конструктор']
const suppliers = ['Поставщик А', 'Поставщик Б', 'Поставщик В', 'Поставщик Г', 'Поставщик Д']

const items = Array.from({ length: 100 }, (_, i) => ({
  sku: `SKU-${String(i + 1).padStart(5, '0')}`,
  name: itemNames[i % itemNames.length] + ` ${String.fromCharCode(65 + i % 26)}-${Math.floor(i / 10) + 1}`,
  category: categories[i % categories.length],
  warehouse: warehouses[i % warehouses.length],
  quantity: Math.round(Math.random() * 500 + 10),
  unitPrice: Math.round(Math.random() * 10000 + 100),
  minStock: Math.round(Math.random() * 50 + 10),
  lastReceived: `2025-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
  supplier: suppliers[i % suppliers.length],
}))

// Сводка по складам
const warehouseStats = warehouses.map(wh => {
  const whItems = items.filter(it => it.warehouse === wh)
  const totalQty = whItems.reduce((a, b) => a + b.quantity, 0)
  const totalValue = whItems.reduce((a, b) => a + b.quantity * b.unitPrice, 0)
  const deficit = whItems.filter(it => it.quantity < it.minStock).length
  const catCount = new Set(whItems.map(it => it.category)).size
  return { warehouse: wh, skuCount: whItems.length, totalQty, totalValue, categories: catCount, deficit }
})

// Сводка по категориям
const categoryStats = categories.map(cat => {
  const catItems = items.filter(it => it.category === cat)
  const totalQty = catItems.reduce((a, b) => a + b.quantity, 0)
  const avgPrice = Math.round(catItems.reduce((a, b) => a + b.unitPrice, 0) / catItems.length)
  const totalValue = catItems.reduce((a, b) => a + b.quantity * b.unitPrice, 0)
  return { category: cat, skuCount: catItems.length, totalQty, avgPrice, totalValue }
})

// Товары с дефицитом
const deficitItems = items.filter(it => it.quantity < it.minStock)
</script>

<template>
  <div>
    <!-- Титульная страница -->
    <div class="report-page">
      <div class="text-center py-12">
        <div class="text-6xl mb-6">📦</div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Складской отчёт</h1>
        <h2 class="text-xl text-gray-600 mb-8">ООО "ЛогистикМакс"</h2>
        <div class="border-t border-b border-gray-200 py-4 my-8">
          <p class="text-gray-500">Инвентаризация на {{ new Date().toLocaleDateString('ru-RU') }}</p>
        </div>
      </div>
    </div>

    <!-- Сводка по складам и категориям -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Сводка по складам</h2>
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-3 py-2 text-left">Склад</th>
            <th class="border border-gray-300 px-3 py-2 text-right">SKU</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Единиц</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Стоимость</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Категорий</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Дефицит</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in warehouseStats" :key="i" :class="i % 2 ? 'bg-gray-50' : ''">
            <td class="border border-gray-300 px-3 py-2 font-medium">{{ row.warehouse }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.skuCount }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.totalQty.toLocaleString('ru-RU') }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.totalValue.toLocaleString('ru-RU') }} ₽</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.categories }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right" :class="row.deficit > 0 ? 'text-red-600 font-bold' : 'text-green-600'">
              {{ row.deficit }}
            </td>
          </tr>
        </tbody>
      </table>

      <h3 class="font-semibold text-gray-700 mt-6 mb-3">По категориям</h3>
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-3 py-2 text-left">Категория</th>
            <th class="border border-gray-300 px-3 py-2 text-right">SKU</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Единиц</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Ср. цена</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Общая стоимость</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in categoryStats" :key="i" :class="i % 2 ? 'bg-gray-50' : ''">
            <td class="border border-gray-300 px-3 py-2 font-medium">{{ row.category }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.skuCount }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.totalQty.toLocaleString('ru-RU') }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.avgPrice.toLocaleString('ru-RU') }} ₽</td>
            <td class="border border-gray-300 px-3 py-2 text-right font-bold">{{ row.totalValue.toLocaleString('ru-RU') }} ₽</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Детальный реестр (1-35) -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Детальный реестр товаров (1-35)</h2>
      <table class="w-full border-collapse text-xs">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-2 py-1.5 text-left">SKU</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Наименование</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Категория</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Склад</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Кол-во</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Цена</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Мин.ост.</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Поступление</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Поставщик</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in items.slice(0, 35)" :key="i"
              :class="`${i % 2 ? 'bg-gray-50' : ''} ${item.quantity < item.minStock ? 'bg-red-50' : ''}`">
            <td class="border border-gray-300 px-2 py-1 font-mono">{{ item.sku }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ item.name }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ item.category }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ item.warehouse }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right" :class="item.quantity < item.minStock ? 'text-red-600 font-bold' : ''">
              {{ item.quantity }}
            </td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ item.unitPrice.toLocaleString('ru-RU') }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ item.minStock }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ item.lastReceived }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ item.supplier }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Детальный реестр (36-70) -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Детальный реестр товаров (36-70)</h2>
      <table class="w-full border-collapse text-xs">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-2 py-1.5 text-left">SKU</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Наименование</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Категория</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Склад</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Кол-во</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Цена</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Мин.ост.</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Поступление</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Поставщик</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in items.slice(35, 70)" :key="i"
              :class="`${i % 2 ? 'bg-gray-50' : ''} ${item.quantity < item.minStock ? 'bg-red-50' : ''}`">
            <td class="border border-gray-300 px-2 py-1 font-mono">{{ item.sku }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ item.name }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ item.category }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ item.warehouse }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right" :class="item.quantity < item.minStock ? 'text-red-600 font-bold' : ''">
              {{ item.quantity }}
            </td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ item.unitPrice.toLocaleString('ru-RU') }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ item.minStock }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ item.lastReceived }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ item.supplier }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Детальный реестр (71-100) -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Детальный реестр товаров (71-100)</h2>
      <table class="w-full border-collapse text-xs">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-2 py-1.5 text-left">SKU</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Наименование</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Категория</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Склад</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Кол-во</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Цена</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Мин.ост.</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Поступление</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Поставщик</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in items.slice(70)" :key="i"
              :class="`${i % 2 ? 'bg-gray-50' : ''} ${item.quantity < item.minStock ? 'bg-red-50' : ''}`">
            <td class="border border-gray-300 px-2 py-1 font-mono">{{ item.sku }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ item.name }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ item.category }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ item.warehouse }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right" :class="item.quantity < item.minStock ? 'text-red-600 font-bold' : ''">
              {{ item.quantity }}
            </td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ item.unitPrice.toLocaleString('ru-RU') }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ item.minStock }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ item.lastReceived }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ item.supplier }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Товары с дефицитом -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Товары с дефицитом (ниже мин. остатка)</h2>
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-red-50">
            <th class="border border-gray-300 px-3 py-2 text-left">SKU</th>
            <th class="border border-gray-300 px-3 py-2 text-left">Наименование</th>
            <th class="border border-gray-300 px-3 py-2 text-left">Склад</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Текущий остаток</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Мин. остаток</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Дефицит</th>
            <th class="border border-gray-300 px-3 py-2 text-left">Поставщик</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in deficitItems" :key="i" :class="i % 2 ? 'bg-red-50/50' : ''">
            <td class="border border-gray-300 px-3 py-2 font-mono text-xs">{{ item.sku }}</td>
            <td class="border border-gray-300 px-3 py-2">{{ item.name }}</td>
            <td class="border border-gray-300 px-3 py-2">{{ item.warehouse }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right text-red-600 font-bold">{{ item.quantity }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ item.minStock }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right text-red-600 font-bold">-{{ item.minStock - item.quantity }}</td>
            <td class="border border-gray-300 px-3 py-2">{{ item.supplier }}</td>
          </tr>
        </tbody>
      </table>
      <div class="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <h3 class="font-semibold text-amber-800 mb-2">⚠️ Рекомендации</h3>
        <ul class="text-sm text-amber-700 space-y-1">
          <li>Срочно заказать товары с критическим дефицитом</li>
          <li>Пересмотреть минимальные остатки для быстродвижущихся товаров</li>
          <li>Согласовать с поставщиками ускоренные поставки</li>
        </ul>
      </div>
    </div>
  </div>
</template>
