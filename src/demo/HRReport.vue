<script setup lang="ts">
import { ref } from 'vue'

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

const deptStats = departments.map(dept => ({
  dept,
  count: Math.round(Math.random() * 30 + 10),
  vacancies: Math.round(Math.random() * 5),
  avgSalary: Math.round(Math.random() * 100 + 80) * 1000,
  rating: (Math.random() * 2 + 3).toFixed(1),
  turnover: Math.round(Math.random() * 8 + 2),
}))

const gradeStats = positions.map((pos, i) => ({
  position: pos,
  min: 60000 + i * 40000,
  max: 100000 + i * 60000,
  avg: 80000 + i * 50000,
  count: Math.round(Math.random() * 30 + 5),
  bonus: 10 + i * 3,
}))
</script>

<template>
  <div>
    <!-- Титульная страница -->
    <div class="report-page">
      <div class="text-center py-12">
        <div class="text-6xl mb-6">👥</div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">HR Отчёт</h1>
        <h2 class="text-xl text-gray-600 mb-8">ООО "КадрПро"</h2>
        <div class="border-t border-b border-gray-200 py-4 my-8">
          <p class="text-gray-500">Данные за 2025 год</p>
        </div>
      </div>
    </div>

    <!-- Сводка по персоналу -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Сводка по персоналу</h2>
      <div class="grid grid-cols-4 gap-3 mb-6">
        <div v-for="t in ['Всего: 247', 'Новых: +38', 'Уволено: 12', 'Текучесть: 4.8%']" :key="t" class="bg-indigo-50 rounded-lg p-3 text-center">
          <p class="text-lg font-bold text-indigo-800">{{ t }}</p>
        </div>
      </div>
      <h3 class="font-semibold text-gray-700 mb-3">По отделам</h3>
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-3 py-2 text-left">Отдел</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Штат</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Вакансии</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Ср. зарплата</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Оценка</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Текучесть</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in deptStats" :key="i" :class="i % 2 ? 'bg-gray-50' : ''">
            <td class="border border-gray-300 px-3 py-2 font-medium">{{ row.dept }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.count }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.vacancies }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.avgSalary.toLocaleString('ru-RU') }} ₽</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.rating }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.turnover }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Список сотрудников (часть 1) -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Список сотрудников</h2>
      <table class="w-full border-collapse text-xs">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-2 py-1.5 text-left">ID</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">ФИО</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Отдел</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Должность</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Город</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Оклад</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Дата найма</th>
            <th class="border border-gray-300 px-2 py-1.5 text-center">Оценка</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(emp, i) in employees.slice(0, 30)" :key="i" :class="i % 2 ? 'bg-gray-50' : ''">
            <td class="border border-gray-300 px-2 py-1 text-center">{{ emp.id }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ emp.name }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ emp.department }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ emp.position }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ emp.city }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ emp.salary.toLocaleString('ru-RU') }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ emp.hireDate }}</td>
            <td class="border border-gray-300 px-2 py-1 text-center">{{ emp.performance }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Список сотрудников (часть 2) -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Список сотрудников (продолжение)</h2>
      <table class="w-full border-collapse text-xs">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-2 py-1.5 text-left">ID</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">ФИО</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Отдел</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Должность</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Город</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Оклад</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Дата найма</th>
            <th class="border border-gray-300 px-2 py-1.5 text-center">Оценка</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(emp, i) in employees.slice(30, 60)" :key="i" :class="i % 2 ? 'bg-gray-50' : ''">
            <td class="border border-gray-300 px-2 py-1 text-center">{{ emp.id }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ emp.name }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ emp.department }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ emp.position }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ emp.city }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ emp.salary.toLocaleString('ru-RU') }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ emp.hireDate }}</td>
            <td class="border border-gray-300 px-2 py-1 text-center">{{ emp.performance }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Распределение зарплат по грейдам -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Распределение зарплат по грейдам</h2>
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-3 py-2 text-left">Грейд</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Мин. оклад</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Макс. оклад</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Средний</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Кол-во</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Бонус (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in gradeStats" :key="i" :class="i % 2 ? 'bg-gray-50' : ''">
            <td class="border border-gray-300 px-3 py-2 font-medium">{{ row.position }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.min.toLocaleString('ru-RU') }} ₽</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.max.toLocaleString('ru-RU') }} ₽</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.avg.toLocaleString('ru-RU') }} ₽</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.count }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right">{{ row.bonus }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
