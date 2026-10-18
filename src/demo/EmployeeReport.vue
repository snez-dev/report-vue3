<script setup lang="ts">
// Список сотрудников с автопагинацией
const departments = ['Разработка', 'Дизайн', 'Маркетинг', 'Продажи', 'HR', 'Финансы', 'Поддержка']
const positions = ['Junior', 'Middle', 'Senior', 'Lead', 'Manager']
const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Удалённо']

const employees = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: ['Иванов', 'Петров', 'Сидоров', 'Козлов', 'Новиков', 'Морозов', 'Волков', 'Соколов', 'Лебедев', 'Попов'][i % 10] + ' ' + 
        ['Иван', 'Пётр', 'Сергей', 'Алексей', 'Дмитрий', 'Андрей', 'Михаил', 'Николай', 'Владимир', 'Артём'][i % 10] + ' ' +
        ['И.', 'П.', 'С.', 'А.', 'Д.', 'А.', 'М.', 'Н.', 'В.', 'А.'][i % 10],
  department: departments[i % departments.length],
  position: positions[i % positions.length],
  city: cities[i % cities.length],
  salary: Math.round((50 + Math.random() * 150) * 1000),
  hireDate: `${2018 + (i % 7)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
  email: `employee${i + 1}@company.ru`,
  phone: `+7 (9${Math.floor(Math.random() * 90 + 10)}) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 90 + 10)}-${Math.floor(Math.random() * 90 + 10)}`,
}))

const avgSalary = Math.round(employees.reduce((sum, e) => sum + e.salary, 0) / employees.length)
</script>

<template>
  <div>
    <h1 style="text-align: center; color: #1f2937; margin-bottom: 10px;">Список сотрудников</h1>
    <p style="text-align: center; color: #6b7280; margin-bottom: 30px;">ООО "Компания" • {{ new Date().toLocaleDateString('ru-RU') }}</p>

    <div style="display: flex; gap: 20px; margin-bottom: 30px;">
      <div style="flex: 1; background: #e0e7ff; padding: 20px; border-radius: 8px; text-align: center;">
        <div style="color: #4f46e5; font-size: 14px;">Всего сотрудников</div>
        <div style="color: #3730a3; font-size: 28px; font-weight: 700;">{{ employees.length }}</div>
      </div>
      <div style="flex: 1; background: #fce7f3; padding: 20px; border-radius: 8px; text-align: center;">
        <div style="color: #ec4899; font-size: 14px;">Средняя зарплата</div>
        <div style="color: #9d174d; font-size: 28px; font-weight: 700;">{{ avgSalary.toLocaleString('ru-RU') }} ₽</div>
      </div>
      <div style="flex: 1; background: #ccfbf1; padding: 20px; border-radius: 8px; text-align: center;">
        <div style="color: #14b8a6; font-size: 14px;">Отделов</div>
        <div style="color: #134e4a; font-size: 28px; font-weight: 700;">{{ departments.length }}</div>
      </div>
    </div>

    <h2 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">Детальная информация</h2>
    
    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
      <thead>
        <tr style="background: #f3f4f6;">
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">ID</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">ФИО</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Отдел</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Должность</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Город</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">Зарплата</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Дата найма</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Email</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Телефон</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(emp, i) in employees" :key="i">
          <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">{{ emp.id }}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">{{ emp.name }}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">{{ emp.department }}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">{{ emp.position }}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">{{ emp.city }}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">{{ emp.salary.toLocaleString('ru-RU') }} ₽</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">{{ emp.hireDate }}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px; font-size: 11px;">{{ emp.email }}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px; font-size: 11px;">{{ emp.phone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
