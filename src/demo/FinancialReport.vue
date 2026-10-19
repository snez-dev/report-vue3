<script setup lang="ts">
const quarters = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025']
const categories = [
  'Выручка от реализации', 'Услуги консалтинга', 'Лицензии ПО', 'Подписки SaaS',
  'Себестоимость', 'Зарплаты', 'Аренда', 'Маркетинг', 'R&D', 'Админ. расходы',
  'Налоги', 'Амортизация', 'Проценты по кредитам', 'Курсовые разницы',
  'Прибыль от продаж', 'EBITDA', 'Чистая прибыль', 'Рентабельность (%)'
]

const generateRow = (cat: string, base: number) => ({
  category: cat,
  values: quarters.map((_, i) => {
    const variation = (Math.sin(i * 1.5 + base) * 0.2 + 1)
    return Math.round(base * variation * (1 + i * 0.03)).toLocaleString('ru-RU')
  })
})

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

const cashFlowItems = [
  'Поступления от покупателей', 'Поступления от услуг', 'Прочие поступления',
  'Итого поступлений', 'Выплаты поставщикам', 'Выплаты зарплат', 'Налоги и сборы',
  'Проценты по кредитам', 'Капитальные вложения', 'Прочие выплаты',
  'Итого выплат', 'Чистый денежный поток', 'Остаток на начало', 'Остаток на конец'
]
</script>

<template>
  <div>
    <!-- Page 1 - Title -->
    <div class="report-page">
      <div class="text-center py-12">
        <div class="icon-large">💰</div>
        <h1>Финансовый отчёт</h1>
        <p class="text-xl text-gray-600 mb-8">ООО "ФинТех Групп"</p>
        <div class="border-t border-b py-4 my-8">
          <p class="text-gray-500">Период: 2024 — 2025</p>
          <p class="text-gray-500 mt-2">Дата: {{ new Date().toLocaleDateString('ru-RU') }}</p>
        </div>
      </div>
    </div>

    <!-- Page 2 - P&L Summary -->
    <div class="report-page">
      <h2>Отчёт о прибылях и убытках</h2>
      <div class="grid grid-cols-4 gap-3 mb-6">
        <div class="stat-card blue">
          <p>Выручка</p>
          <p>₽ 248M</p>
        </div>
        <div class="stat-card green">
          <p>EBITDA</p>
          <p>₽ 67M</p>
        </div>
        <div class="stat-card purple">
          <p>Чистая прибыль</p>
          <p>₽ 42M</p>
        </div>
        <div class="stat-card blue">
          <p>Рентабельность</p>
          <p>17.2%</p>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Показатель</th>
            <th v-for="q in quarters" :key="q" style="text-align: right">{{ q }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in tableData.slice(0, 10)" :key="i">
            <td style="font-weight: 500">{{ row.category }}</td>
            <td v-for="v in row.values" :key="v" style="text-align: right">{{ v }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Page 3 - P&L continued -->
    <div class="report-page">
      <h2>Отчёт о прибылях и убытках (продолжение)</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Показатель</th>
            <th v-for="q in quarters" :key="q" style="text-align: right">{{ q }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in tableData.slice(10)" :key="i">
            <td style="font-weight: 500">{{ row.category }}</td>
            <td v-for="v in row.values" :key="v" style="text-align: right">{{ v }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Page 4 - Balance Sheet -->
    <div class="report-page">
      <h2>Баланс предприятия</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Статья баланса</th>
            <th style="text-align: right">Q1 2025</th>
            <th style="text-align: right">Q2 2025</th>
            <th style="text-align: right">Q3 2025</th>
            <th style="text-align: right">Q4 2025</th>
            <th style="text-align: right">Изменение</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in balanceSheet" :key="i" :style="row.item.startsWith('ИТОГО') ? 'font-weight: bold; background-color: #eff6ff' : ''">
            <td>{{ row.item }}</td>
            <td style="text-align: right">{{ row.q1 }}</td>
            <td style="text-align: right">{{ row.q2 }}</td>
            <td style="text-align: right">{{ row.q3 }}</td>
            <td style="text-align: right">{{ row.q4 }}</td>
            <td style="text-align: right; color: #059669">
              +{{ Math.round((parseInt(row.q4.replace(/\s/g, '')) - parseInt(row.q1.replace(/\s/g, ''))) / parseInt(row.q1.replace(/\s/g, '')) * 100) }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Page 5 - Cash Flow -->
    <div class="report-page">
      <h2>Отчёт о движении денежных средств</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Операция</th>
            <th v-for="q in quarters" :key="q" style="text-align: right">{{ q }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in cashFlowItems" :key="i"
              :style="(item.startsWith('Итого') || item === 'Чистый денежный поток' || item === 'Остаток на конец') ? 'font-weight: bold; background-color: #eff6ff' : ''">
            <td>{{ item }}</td>
            <td v-for="(_, qi) in quarters" :key="qi" style="text-align: right">
              {{ Math.round((i < 3 ? 15000 : i < 7 ? -8000 : i < 10 ? -3000 : 4000) * (1 + qi * 0.05 + Math.sin(qi) * 0.1)).toLocaleString('ru-RU') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
