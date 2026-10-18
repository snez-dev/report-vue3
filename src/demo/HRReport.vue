<script setup lang="ts">
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
    <div class="report-page">
      <div class="text-center py-12">
        <div class="icon-large">👥</div>
        <h1>HR Отчёт</h1>
        <p class="text-xl text-gray-600 mb-8">ООО "КадрПро"</p>
        <div class="border-t border-b py-4 my-8">
          <p class="text-gray-500">Данные за 2025 год</p>
        </div>
      </div>
    </div>

    <div class="report-page">
      <h2>Сводка по персоналу</h2>
      <div class="grid grid-cols-4 gap-3 mb-6">
        <div class="stat-card indigo">
          <p>Всего</p>
          <p>247</p>
        </div>
        <div class="stat-card green">
          <p>Новых</p>
          <p>+38</p>
        </div>
        <div class="stat-card rose">
          <p>Уволено</p>
          <p>12</p>
        </div>
        <div class="stat-card blue">
          <p>Текучесть</p>
          <p>4.8%</p>
        </div>
      </div>
      <h3>По отделам</h3>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Отдел</th>
            <th style="text-align: right">Штат</th>
            <th style="text-align: right">Вакансии</th>
            <th style="text-align: right">Ср. зарплата</th>
            <th style="text-align: right">Оценка</th>
            <th style="text-align: right">Текучесть</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in deptStats" :key="i">
            <td style="font-weight: 500">{{ row.dept }}</td>
            <td style="text-align: right">{{ row.count }}</td>
            <td style="text-align: right">{{ row.vacancies }}</td>
            <td style="text-align: right">{{ row.avgSalary.toLocaleString('ru-RU') }} ₽</td>
            <td style="text-align: right">{{ row.rating }}</td>
            <td style="text-align: right">{{ row.turnover }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-page">
      <h2>Список сотрудников</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: center">ID</th>
            <th style="text-align: left">ФИО</th>
            <th style="text-align: left">Отдел</th>
            <th style="text-align: left">Должность</th>
            <th style="text-align: left">Город</th>
            <th style="text-align: right">Оклад</th>
            <th style="text-align: left">Дата найма</th>
            <th style="text-align: center">Оценка</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(emp, i) in employees.slice(0, 30)" :key="i">
            <td style="text-align: center">{{ emp.id }}</td>
            <td>{{ emp.name }}</td>
            <td>{{ emp.department }}</td>
            <td>{{ emp.position }}</td>
            <td>{{ emp.city }}</td>
            <td style="text-align: right">{{ emp.salary.toLocaleString('ru-RU') }}</td>
            <td>{{ emp.hireDate }}</td>
            <td style="text-align: center">{{ emp.performance }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-page">
      <h2>Список сотрудников (продолжение)</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: center">ID</th>
            <th style="text-align: left">ФИО</th>
            <th style="text-align: left">Отдел</th>
            <th style="text-align: left">Должность</th>
            <th style="text-align: left">Город</th>
            <th style="text-align: right">Оклад</th>
            <th style="text-align: left">Дата найма</th>
            <th style="text-align: center">Оценка</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(emp, i) in employees.slice(30, 60)" :key="i">
            <td style="text-align: center">{{ emp.id }}</td>
            <td>{{ emp.name }}</td>
            <td>{{ emp.department }}</td>
            <td>{{ emp.position }}</td>
            <td>{{ emp.city }}</td>
            <td style="text-align: right">{{ emp.salary.toLocaleString('ru-RU') }}</td>
            <td>{{ emp.hireDate }}</td>
            <td style="text-align: center">{{ emp.performance }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-page">
      <h2>Распределение зарплат по грейдам</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Грейд</th>
            <th style="text-align: right">Мин. оклад</th>
            <th style="text-align: right">Макс. оклад</th>
            <th style="text-align: right">Средний</th>
            <th style="text-align: right">Кол-во</th>
            <th style="text-align: right">Бонус (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in gradeStats" :key="i">
            <td style="font-weight: 500">{{ row.position }}</td>
            <td style="text-align: right">{{ row.min.toLocaleString('ru-RU') }} ₽</td>
            <td style="text-align: right">{{ row.max.toLocaleString('ru-RU') }} ₽</td>
            <td style="text-align: right">{{ row.avg.toLocaleString('ru-RU') }} ₽</td>
            <td style="text-align: right">{{ row.count }}</td>
            <td style="text-align: right">{{ row.bonus }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
