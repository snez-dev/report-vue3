<script setup lang="ts">
const products = [
  { name: 'Ноутбук Pro 15', price: 89990, stock: 45, category: 'Электроника' },
  { name: 'Смартфон X12', price: 54990, stock: 128, category: 'Электроника' },
  { name: 'Планшет Air', price: 42990, stock: 67, category: 'Электроника' },
  { name: 'Наушники Wireless', price: 12990, stock: 234, category: 'Аксессуары' },
  { name: 'Клавиатура Mechanical', price: 8990, stock: 156, category: 'Аксессуары' },
  { name: 'Мышь Optical', price: 2490, stock: 312, category: 'Аксессуары' },
  { name: 'Монитор 27"', price: 34990, stock: 78, category: 'Электроника' },
  { name: 'Веб-камера HD', price: 5990, stock: 189, category: 'Аксессуары' },
  { name: 'Внешний диск 1TB', price: 4990, stock: 267, category: 'Хранение' },
  { name: 'SSD 500GB', price: 6990, stock: 145, category: 'Хранение' },
  { name: 'USB-хаб 7 портов', price: 1990, stock: 298, category: 'Аксессуары' },
  { name: 'Зарядное устройство', price: 2990, stock: 423, category: 'Аксессуары' },
  { name: 'Кабель USB-C', price: 990, stock: 567, category: 'Аксессуары' },
  { name: 'Чехол для ноутбука', price: 1990, stock: 178, category: 'Аксессуары' },
  { name: 'Подставка для ноутбука', price: 2990, stock: 134, category: 'Аксессуары' },
  { name: 'Очки VR', price: 29990, stock: 56, category: 'Электроника' },
  { name: 'Фитнес-браслет', price: 4990, stock: 289, category: 'Аксессуары' },
  { name: 'Умные часы', price: 19990, stock: 167, category: 'Электроника' },
  { name: 'Колонка Bluetooth', price: 3990, stock: 234, category: 'Аксессуары' },
  { name: 'Проектор Mini', price: 24990, stock: 45, category: 'Электроника' },
]

const totalRevenue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
const avgPrice = Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length)
</script>

<template>
  <div>
    <div style="text-align: center; padding: 40px 0;">
      <h1 style="font-size: 2rem; color: #1f2937; margin-bottom: 0.5rem;">Каталог товаров</h1>
      <p style="color: #6b7280;">ООО "ТехноМаркет"</p>
      <p style="color: #9ca3af; font-size: 0.875rem; margin-top: 1rem;">
        Дата формирования: {{ new Date().toLocaleDateString('ru-RU') }}
      </p>
    </div>

    <div style="margin-bottom: 2rem;">
      <h2 style="font-size: 1.5rem; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">
        Общая статистика
      </h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
        <div style="background: #eff6ff; padding: 1rem; border-radius: 0.5rem; text-align: center;">
          <div style="color: #3b82f6; font-size: 0.875rem;">Общая стоимость</div>
          <div style="color: #1e40af; font-size: 1.5rem; font-weight: 700;">
            {{ totalRevenue.toLocaleString('ru-RU') }} ₽
          </div>
        </div>
        <div style="background: #f0fdf4; padding: 1rem; border-radius: 0.5rem; text-align: center;">
          <div style="color: #10b981; font-size: 0.875rem;">Всего единиц</div>
          <div style="color: #065f46; font-size: 1.5rem; font-weight: 700;">
            {{ totalStock.toLocaleString('ru-RU') }}
          </div>
        </div>
        <div style="background: #fef3c7; padding: 1rem; border-radius: 0.5rem; text-align: center;">
          <div style="color: #f59e0b; font-size: 0.875rem;">Средняя цена</div>
          <div style="color: #92400e; font-size: 1.5rem; font-weight: 700;">
            {{ avgPrice.toLocaleString('ru-RU') }} ₽
          </div>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 2rem;">
      <h2 style="font-size: 1.5rem; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">
        Категории товаров
      </h2>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
        <div style="background: #f9fafb; padding: 1rem; border-left: 4px solid #3b82f6;">
          <div style="font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">Электроника</div>
          <div style="color: #6b7280; font-size: 0.875rem;">
            {{ products.filter(p => p.category === 'Электроника').length }} товаров
          </div>
        </div>
        <div style="background: #f9fafb; padding: 1rem; border-left: 4px solid #10b981;">
          <div style="font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">Аксессуары</div>
          <div style="color: #6b7280; font-size: 0.875rem;">
            {{ products.filter(p => p.category === 'Аксессуары').length }} товаров
          </div>
        </div>
        <div style="background: #f9fafb; padding: 1rem; border-left: 4px solid #f59e0b;">
          <div style="font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">Хранение</div>
          <div style="color: #6b7280; font-size: 0.875rem;">
            {{ products.filter(p => p.category === 'Хранение').length }} товаров
          </div>
        </div>
        <div style="background: #f9fafb; padding: 1rem; border-left: 4px solid #8b5cf6;">
          <div style="font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">Всего</div>
          <div style="color: #6b7280; font-size: 0.875rem;">
            {{ products.length }} позиций
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 style="font-size: 1.5rem; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">
        Прайс-лист
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f3f4f6;">
            <th style="border: 1px solid #d1d5db; padding: 0.5rem; text-align: left;">№</th>
            <th style="border: 1px solid #d1d5db; padding: 0.5rem; text-align: left;">Наименование</th>
            <th style="border: 1px solid #d1d5db; padding: 0.5rem; text-align: left;">Категория</th>
            <th style="border: 1px solid #d1d5db; padding: 0.5rem; text-align: right;">Цена</th>
            <th style="border: 1px solid #d1d5db; padding: 0.5rem; text-align: right;">Остаток</th>
            <th style="border: 1px solid #d1d5db; padding: 0.5rem; text-align: right;">Сумма</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td style="border: 1px solid #d1d5db; padding: 0.5rem;">{{ index + 1 }}</td>
            <td style="border: 1px solid #d1d5db; padding: 0.5rem;">{{ product.name }}</td>
            <td style="border: 1px solid #d1d5db; padding: 0.5rem;">{{ product.category }}</td>
            <td style="border: 1px solid #d1d5db; padding: 0.5rem; text-align: right;">
              {{ product.price.toLocaleString('ru-RU') }} ₽
            </td>
            <td style="border: 1px solid #d1d5db; padding: 0.5rem; text-align: right;">
              {{ product.stock }}
            </td>
            <td style="border: 1px solid #d1d5db; padding: 0.5rem; text-align: right; font-weight: 500;">
              {{ (product.price * product.stock).toLocaleString('ru-RU') }} ₽
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr style="background: #f9fafb; font-weight: 700;">
            <td colspan="5" style="border: 1px solid #d1d5db; padding: 0.5rem; text-align: right;">
              ИТОГО:
            </td>
            <td style="border: 1px solid #d1d5db; padding: 0.5rem; text-align: right;">
              {{ totalRevenue.toLocaleString('ru-RU') }} ₽
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div style="margin-top: 2rem; padding: 1rem; background: #fef3c7; border-radius: 0.5rem;">
      <h3 style="color: #92400e; margin-bottom: 0.5rem;">Примечание</h3>
      <p style="color: #b45309; font-size: 0.875rem; margin: 0;">
        Данный документ сформирован автоматически. Цены указаны в рублях РФ с учётом НДС.
        Информация актуальна на дату формирования отчёта.
      </p>
    </div>
  </div>
</template>
