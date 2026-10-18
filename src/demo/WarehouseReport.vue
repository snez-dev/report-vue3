<script setup lang="ts">
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

const warehouseStats = warehouses.map(wh => {
  const whItems = items.filter(it => it.warehouse === wh)
  const totalQty = whItems.reduce((a, b) => a + b.quantity, 0)
  const totalValue = whItems.reduce((a, b) => a + b.quantity * b.unitPrice, 0)
  const deficit = whItems.filter(it => it.quantity < it.minStock).length
  const catCount = new Set(whItems.map(it => it.category)).size
  return { warehouse: wh, skuCount: whItems.length, totalQty, totalValue, categories: catCount, deficit }
})

const categoryStats = categories.map(cat => {
  const catItems = items.filter(it => it.category === cat)
  const totalQty = catItems.reduce((a, b) => a + b.quantity, 0)
  const avgPrice = Math.round(catItems.reduce((a, b) => a + b.unitPrice, 0) / catItems.length)
  const totalValue = catItems.reduce((a, b) => a + b.quantity * b.unitPrice, 0)
  return { category: cat, skuCount: catItems.length, totalQty, avgPrice, totalValue }
})

const deficitItems = items.filter(it => it.quantity < it.minStock)
</script>

<template>
  <div>
    <div class="report-page">
      <div class="text-center py-12">
        <div class="icon-large">📦</div>
        <h1>Складской отчёт</h1>
        <p class="text-xl text-gray-600 mb-8">ООО "ЛогистикМакс"</p>
        <div class="border-t border-b py-4 my-8">
          <p class="text-gray-500">Инвентаризация на {{ new Date().toLocaleDateString('ru-RU') }}</p>
        </div>
      </div>
    </div>

    <div class="report-page">
      <h2>Сводка по складам</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Склад</th>
            <th style="text-align: right">SKU</th>
            <th style="text-align: right">Единиц</th>
            <th style="text-align: right">Стоимость</th>
            <th style="text-align: right">Категорий</th>
            <th style="text-align: right">Дефицит</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in warehouseStats" :key="i">
            <td style="font-weight: 500">{{ row.warehouse }}</td>
            <td style="text-align: right">{{ row.skuCount }}</td>
            <td style="text-align: right">{{ row.totalQty.toLocaleString('ru-RU') }}</td>
            <td style="text-align: right">{{ row.totalValue.toLocaleString('ru-RU') }} ₽</td>
            <td style="text-align: right">{{ row.categories }}</td>
            <td style="text-align: right" :style="row.deficit > 0 ? 'color: #dc2626; font-weight: 700' : 'color: #059669'">
              {{ row.deficit }}
            </td>
          </tr>
        </tbody>
      </table>

      <h3 style="margin-top: 1.5rem">По категориям</h3>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Категория</th>
            <th style="text-align: right">SKU</th>
            <th style="text-align: right">Единиц</th>
            <th style="text-align: right">Ср. цена</th>
            <th style="text-align: right">Общая стоимость</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in categoryStats" :key="i">
            <td style="font-weight: 500">{{ row.category }}</td>
            <td style="text-align: right">{{ row.skuCount }}</td>
            <td style="text-align: right">{{ row.totalQty.toLocaleString('ru-RU') }}</td>
            <td style="text-align: right">{{ row.avgPrice.toLocaleString('ru-RU') }} ₽</td>
            <td style="text-align: right; font-weight: 700">{{ row.totalValue.toLocaleString('ru-RU') }} ₽</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-page">
      <h2>Детальный реестр товаров (1-35)</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">SKU</th>
            <th style="text-align: left">Наименование</th>
            <th style="text-align: left">Категория</th>
            <th style="text-align: left">Склад</th>
            <th style="text-align: right">Кол-во</th>
            <th style="text-align: right">Цена</th>
            <th style="text-align: right">Мин.ост.</th>
            <th style="text-align: left">Поступление</th>
            <th style="text-align: left">Поставщик</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in items.slice(0, 35)" :key="i"
              :style="item.quantity < item.minStock ? 'background-color: #fef2f2' : ''">
            <td style="font-family: monospace">{{ item.sku }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.warehouse }}</td>
            <td style="text-align: right" :style="item.quantity < item.minStock ? 'color: #dc2626; font-weight: 700' : ''">
              {{ item.quantity }}
            </td>
            <td style="text-align: right">{{ item.unitPrice.toLocaleString('ru-RU') }}</td>
            <td style="text-align: right">{{ item.minStock }}</td>
            <td>{{ item.lastReceived }}</td>
            <td>{{ item.supplier }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-page">
      <h2>Детальный реестр товаров (36-70)</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">SKU</th>
            <th style="text-align: left">Наименование</th>
            <th style="text-align: left">Категория</th>
            <th style="text-align: left">Склад</th>
            <th style="text-align: right">Кол-во</th>
            <th style="text-align: right">Цена</th>
            <th style="text-align: right">Мин.ост.</th>
            <th style="text-align: left">Поступление</th>
            <th style="text-align: left">Поставщик</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in items.slice(35, 70)" :key="i"
              :style="item.quantity < item.minStock ? 'background-color: #fef2f2' : ''">
            <td style="font-family: monospace">{{ item.sku }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.warehouse }}</td>
            <td style="text-align: right" :style="item.quantity < item.minStock ? 'color: #dc2626; font-weight: 700' : ''">
              {{ item.quantity }}
            </td>
            <td style="text-align: right">{{ item.unitPrice.toLocaleString('ru-RU') }}</td>
            <td style="text-align: right">{{ item.minStock }}</td>
            <td>{{ item.lastReceived }}</td>
            <td>{{ item.supplier }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-page">
      <h2>Детальный реестр товаров (71-100)</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">SKU</th>
            <th style="text-align: left">Наименование</th>
            <th style="text-align: left">Категория</th>
            <th style="text-align: left">Склад</th>
            <th style="text-align: right">Кол-во</th>
            <th style="text-align: right">Цена</th>
            <th style="text-align: right">Мин.ост.</th>
            <th style="text-align: left">Поступление</th>
            <th style="text-align: left">Поставщик</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in items.slice(70)" :key="i"
              :style="item.quantity < item.minStock ? 'background-color: #fef2f2' : ''">
            <td style="font-family: monospace">{{ item.sku }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.warehouse }}</td>
            <td style="text-align: right" :style="item.quantity < item.minStock ? 'color: #dc2626; font-weight: 700' : ''">
              {{ item.quantity }}
            </td>
            <td style="text-align: right">{{ item.unitPrice.toLocaleString('ru-RU') }}</td>
            <td style="text-align: right">{{ item.minStock }}</td>
            <td>{{ item.lastReceived }}</td>
            <td>{{ item.supplier }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-page">
      <h2>Товары с дефицитом (ниже мин. остатка)</h2>
      <table>
        <thead>
          <tr style="background-color: #fef2f2">
            <th style="text-align: left">SKU</th>
            <th style="text-align: left">Наименование</th>
            <th style="text-align: left">Склад</th>
            <th style="text-align: right">Текущий остаток</th>
            <th style="text-align: right">Мин. остаток</th>
            <th style="text-align: right">Дефицит</th>
            <th style="text-align: left">Поставщик</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in deficitItems" :key="i">
            <td style="font-family: monospace; font-size: 0.75rem">{{ item.sku }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.warehouse }}</td>
            <td style="text-align: right; color: #dc2626; font-weight: 700">{{ item.quantity }}</td>
            <td style="text-align: right">{{ item.minStock }}</td>
            <td style="text-align: right; color: #dc2626; font-weight: 700">-{{ item.minStock - item.quantity }}</td>
            <td>{{ item.supplier }}</td>
          </tr>
        </tbody>
      </table>
      <div class="warning-box mt-6">
        <h3>⚠️ Рекомендации</h3>
        <ul>
          <li>Срочно заказать товары с критическим дефицитом</li>
          <li>Пересмотреть минимальные остатки для быстродвижущихся товаров</li>
          <li>Согласовать с поставщиками ускоренные поставки</li>
        </ul>
      </div>
    </div>
  </div>
</template>
