<script setup lang="ts">
// Инвентаризация склада с автопагинацией
const categories = ['Электроника', 'Мебель', 'Одежда', 'Продукты', 'Инструменты', 'Канцтовары']
const warehouses = ['Склад-1 Москва', 'Склад-2 СПб', 'Склад-3 Казань', 'Склад-4 Новосибирск']

const items = Array.from({ length: 150 }, (_, i) => ({
  sku: `WH-${String(i + 1).padStart(6, '0')}`,
  name: ['Ноутбук', 'Стол', 'Куртка', 'Рис', 'Дрель', 'Бумага', 'Монитор', 'Стул', 'Джинсы', 'Гречка', 'Молоток', 'Ручки'][i % 12] + ` ${String.fromCharCode(65 + i % 26)}${Math.floor(i / 12) + 1}`,
  category: categories[i % categories.length],
  warehouse: warehouses[i % warehouses.length],
  quantity: Math.round(Math.random() * 500 + 10),
  unitPrice: Math.round(Math.random() * 50000 + 100),
  minStock: Math.round(Math.random() * 50 + 20),
  lastUpdated: new Date(Date.now() - i * 86400000).toLocaleDateString('ru-RU'),
}))

const totalValue = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
const lowStockItems = items.filter(item => item.quantity < item.minStock)
</script>

<template>
  <div>
    <h1 style="text-align: center; color: #1f2937; margin-bottom: 10px;">Инвентаризация склада</h1>
    <p style="text-align: center; color: #6b7280; margin-bottom: 30px;">{{ new Date().toLocaleDateString('ru-RU') }}</p>

    <div style="display: flex; gap: 15px; margin-bottom: 30px;">
      <div style="flex: 1; background: #fef3c7; padding: 15px; border-radius: 8px; text-align: center;">
        <div style="color: #f59e0b; font-size: 12px;">Всего позиций</div>
        <div style="color: #92400e; font-size: 24px; font-weight: 700;">{{ items.length }}</div>
      </div>
      <div style="flex: 1; background: #dbeafe; padding: 15px; border-radius: 8px; text-align: center;">
        <div style="color: #3b82f6; font-size: 12px;">Общая стоимость</div>
        <div style="color: #1e40af; font-size: 24px; font-weight: 700;">{{ totalValue.toLocaleString('ru-RU') }} ₽</div>
      </div>
      <div style="flex: 1; background: #fee2e2; padding: 15px; border-radius: 8px; text-align: center;">
        <div style="color: #dc2626; font-size: 12px;">Низкий остаток</div>
        <div style="color: #991b1b; font-size: 24px; font-weight: 700;">{{ lowStockItems.length }}</div>
      </div>
    </div>

    <h2 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">Детальный реестр товаров</h2>
    
    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
      <thead>
        <tr style="background: #f3f4f6;">
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Артикул</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Наименование</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Категория</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Склад</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">Кол-во</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">Мин. остаток</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">Цена</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">Сумма</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Обновлено</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in items" :key="i" :style="{ background: item.quantity < item.minStock ? '#fef2f2' : '' }">
          <td style="border: 1px solid #d1d5db; padding: 6px; font-family: monospace;">{{ item.sku }}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">{{ item.name }}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">{{ item.category }}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">{{ item.warehouse }}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;" :style="{ color: item.quantity < item.minStock ? '#dc2626' : '', fontWeight: item.quantity < item.minStock ? '700' : '400' }">{{ item.quantity }}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">{{ item.minStock }}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">{{ item.unitPrice.toLocaleString('ru-RU') }} ₽</td>
          <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right; font-weight: 500;">{{ (item.quantity * item.unitPrice).toLocaleString('ru-RU') }} ₽</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">{{ item.lastUpdated }}</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px;">
      <h3 style="color: #92400e; margin-bottom: 10px;">Рекомендации</h3>
      <ul style="color: #b45309; font-size: 14px; margin: 0; padding-left: 20px;">
        <li>Срочно заказать товары с низким остатком ({{ lowStockItems.length }} позиций)</li>
        <li>Провести проверку складских помещений</li>
        <li>Обновить данные по категориям товаров</li>
      </ul>
    </div>
  </div>
</template>
