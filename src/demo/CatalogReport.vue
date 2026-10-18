<script setup lang="ts">
// Каталог товаров с автопагинацией
const products = Array.from({ length: 80 }, (_, i) => ({
  sku: `SKU-${String(i + 1).padStart(5, '0')}`,
  name: ['Ноутбук Pro', 'Смартфон X', 'Планшет Air', 'Наушники', 'Клавиатура', 'Мышь', 'Монитор', 'Веб-камера', 'Диск SSD', 'USB-хаб'][i % 10] + ` ${Math.floor(i / 10) + 1}`,
  category: ['Электроника', 'Аксессуары', 'Хранение', 'Периферия'][i % 4],
  price: Math.round(Math.random() * 50000 + 1000),
  stock: Math.round(Math.random() * 200 + 10),
}))

const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
</script>

<template>
  <div style="padding: 20px;">
    <h1 style="text-align: center; color: #1f2937; margin-bottom: 10px;">Каталог товаров</h1>
    <p style="text-align: center; color: #6b7280; margin-bottom: 30px;">ООО "ТехноМаркет" • {{ new Date().toLocaleDateString('ru-RU') }}</p>

    <div style="display: flex; gap: 20px; margin-bottom: 30px;">
      <div style="flex: 1; background: #eff6ff; padding: 20px; border-radius: 8px; text-align: center;">
        <div style="color: #3b82f6; font-size: 14px;">Всего позиций</div>
        <div style="color: #1e40af; font-size: 28px; font-weight: 700;">{{ products.length }}</div>
      </div>
      <div style="flex: 1; background: #f0fdf4; padding: 20px; border-radius: 8px; text-align: center;">
        <div style="color: #10b981; font-size: 14px;">Общий остаток</div>
        <div style="color: #065f46; font-size: 28px; font-weight: 700;">{{ totalStock }}</div>
      </div>
      <div style="flex: 1; background: #fef3c7; padding: 20px; border-radius: 8px; text-align: center;">
        <div style="color: #f59e0b; font-size: 14px;">Общая стоимость</div>
        <div style="color: #92400e; font-size: 28px; font-weight: 700;">{{ totalValue.toLocaleString('ru-RU') }} ₽</div>
      </div>
    </div>

    <h2 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">Прайс-лист</h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: #f3f4f6;">
          <th style="border: 1px solid #d1d5db; padding: 10px; text-align: left;">Артикул</th>
          <th style="border: 1px solid #d1d5db; padding: 10px; text-align: left;">Наименование</th>
          <th style="border: 1px solid #d1d5db; padding: 10px; text-align: left;">Категория</th>
          <th style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">Цена</th>
          <th style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">Остаток</th>
          <th style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">Сумма</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, i) in products" :key="i">
          <td style="border: 1px solid #d1d5db; padding: 8px; font-family: monospace;">{{ p.sku }}</td>
          <td style="border: 1px solid #d1d5db; padding: 8px;">{{ p.name }}</td>
          <td style="border: 1px solid #d1d5db; padding: 8px;">{{ p.category }}</td>
          <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">{{ p.price.toLocaleString('ru-RU') }} ₽</td>
          <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">{{ p.stock }}</td>
          <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: 500;">{{ (p.price * p.stock).toLocaleString('ru-RU') }} ₽</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px;">
      <h3 style="color: #92400e; margin-bottom: 10px;">Примечание</h3>
      <p style="color: #b45309; font-size: 14px; margin: 0;">
        Цены указаны в рублях РФ с учётом НДС. Информация актуальна на дату формирования отчёта.
      </p>
    </div>
  </div>
</template>
