<script setup lang="ts">
import { ref } from 'vue'

const projectNames = ['AI Платформа', 'CRM v3', 'Мобильное приложение', 'Миграция облака', 'ERP интеграция', 'BI Дашборд', 'API Gateway', 'Микросервисы', 'DevOps CI/CD', 'Безопасность', 'Рефакторинг', 'Тестирование', 'Документация', 'Аналитика', 'Чат-бот']
const clients = ['ТехноПром', 'ФинБанк', 'МедиаГрупп', 'РитейлМакс', 'ЛогистикПро', 'ЭнергоСбыт', 'СтройИнвест']
const statuses = ['Активен', 'Завершён', 'На паузе', 'Планирование']
const priorities = ['Критический', 'Высокий', 'Средний', 'Низкий']

const projects = Array.from({ length: 25 }, (_, i) => ({
  id: `PRJ-${String(i + 1).padStart(3, '0')}`,
  name: projectNames[i % projectNames.length] + ` #${i + 1}`,
  client: clients[i % clients.length],
  status: statuses[i % statuses.length],
  priority: priorities[i % priorities.length],
  budget: Math.round(Math.random() * 5000 + 500),
  spent: Math.round(Math.random() * 4000),
  progress: Math.round(Math.random() * 100),
  deadline: `2025-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
  team: Math.round(Math.random() * 12 + 3),
}))

const taskTypes = ['Разработка', 'Тестирование', 'Дизайн', 'Документация', 'Деплой', 'Ревью', 'Аналитика', 'Оптимизация']
const assignees = ['Алексеев', 'Борисов', 'Васильев', 'Григорьев', 'Дмитриев']
const taskStatuses = ['Готово', 'В работе', 'На проверке', 'Заблокировано']

const tasks = Array.from({ length: 80 }, (_, i) => ({
  project: projects[i % projects.length].id,
  task: `Задача ${i + 1}: ${taskTypes[i % taskTypes.length]}`,
  assignee: assignees[i % assignees.length],
  status: taskStatuses[i % taskStatuses.length],
  hours: Math.round(Math.random() * 40 + 2),
  deadline: `2025-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
}))

// Сводные метрики
const summaryMetrics = [
  ['Всего проектов', projects.length.toString()],
  ['Активных', projects.filter(p => p.status === 'Активен').length.toString()],
  ['Завершённых', projects.filter(p => p.status === 'Завершён').length.toString()],
  ['Общий бюджет', projects.reduce((a, b) => a + b.budget, 0).toLocaleString('ru-RU') + ' т₽'],
  ['Освоено', projects.reduce((a, b) => a + b.spent, 0).toLocaleString('ru-RU') + ' т₽'],
  ['Средний прогресс', Math.round(projects.reduce((a, b) => a + b.progress, 0) / projects.length) + '%'],
  ['Всего задач', tasks.length.toString()],
  ['Выполнено задач', tasks.filter(t => t.status === 'Готово').length.toString()],
  ['Общие часы', tasks.reduce((a, b) => a + b.hours, 0).toLocaleString('ru-RU') + ' ч'],
  ['Средняя команда', (projects.reduce((a, b) => a + b.team, 0) / projects.length).toFixed(1) + ' чел.'],
]
</script>

<template>
  <div>
    <!-- Титульная страница -->
    <div class="report-page">
      <div class="text-center py-12">
        <div class="text-6xl mb-6">📋</div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Отчёт по проектам</h1>
        <h2 class="text-xl text-gray-600 mb-8">ООО "ПроектМастер"</h2>
        <div class="border-t border-b border-gray-200 py-4 my-8">
          <p class="text-gray-500">Портфель проектов 2025</p>
        </div>
      </div>
    </div>

    <!-- Реестр проектов (часть 1) -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Реестр проектов</h2>
      <table class="w-full border-collapse text-xs">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-2 py-1.5 text-left">ID</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Название</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Клиент</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Статус</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Приоритет</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Бюджет</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Потрачено</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Прогресс</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Дедлайн</th>
            <th class="border border-gray-300 px-2 py-1.5 text-center">Команда</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, i) in projects.slice(0, 15)" :key="i" :class="i % 2 ? 'bg-gray-50' : ''">
            <td class="border border-gray-300 px-2 py-1 font-mono">{{ p.id }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ p.name }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ p.client }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ p.status }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ p.priority }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ p.budget.toLocaleString('ru-RU') }}т₽</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ p.spent.toLocaleString('ru-RU') }}т₽</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ p.progress }}%</td>
            <td class="border border-gray-300 px-2 py-1">{{ p.deadline }}</td>
            <td class="border border-gray-300 px-2 py-1 text-center">{{ p.team }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Реестр проектов (часть 2) -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Реестр проектов (продолжение)</h2>
      <table class="w-full border-collapse text-xs">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-2 py-1.5 text-left">ID</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Название</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Клиент</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Статус</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Приоритет</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Бюджет</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Потрачено</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Прогресс</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Дедлайн</th>
            <th class="border border-gray-300 px-2 py-1.5 text-center">Команда</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, i) in projects.slice(15)" :key="i" :class="i % 2 ? 'bg-gray-50' : ''">
            <td class="border border-gray-300 px-2 py-1 font-mono">{{ p.id }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ p.name }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ p.client }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ p.status }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ p.priority }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ p.budget.toLocaleString('ru-RU') }}т₽</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ p.spent.toLocaleString('ru-RU') }}т₽</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ p.progress }}%</td>
            <td class="border border-gray-300 px-2 py-1">{{ p.deadline }}</td>
            <td class="border border-gray-300 px-2 py-1 text-center">{{ p.team }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Задачи (часть 1) -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Задачи по проектам</h2>
      <table class="w-full border-collapse text-xs">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-2 py-1.5 text-left">Проект</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Задача</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Исполнитель</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Статус</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Часы</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Дедлайн</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, i) in tasks.slice(0, 40)" :key="i" :class="i % 2 ? 'bg-gray-50' : ''">
            <td class="border border-gray-300 px-2 py-1 font-mono">{{ t.project }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ t.task }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ t.assignee }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ t.status }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ t.hours }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ t.deadline }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Задачи (часть 2) -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Задачи по проектам (продолжение)</h2>
      <table class="w-full border-collapse text-xs">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-2 py-1.5 text-left">Проект</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Задача</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Исполнитель</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Статус</th>
            <th class="border border-gray-300 px-2 py-1.5 text-right">Часы</th>
            <th class="border border-gray-300 px-2 py-1.5 text-left">Дедлайн</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, i) in tasks.slice(40, 80)" :key="i" :class="i % 2 ? 'bg-gray-50' : ''">
            <td class="border border-gray-300 px-2 py-1 font-mono">{{ t.project }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ t.task }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ t.assignee }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ t.status }}</td>
            <td class="border border-gray-300 px-2 py-1 text-right">{{ t.hours }}</td>
            <td class="border border-gray-300 px-2 py-1">{{ t.deadline }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Сводка по проектам -->
    <div class="report-page">
      <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Сводка по проектам</h2>
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-3 py-2 text-left">Метрика</th>
            <th class="border border-gray-300 px-3 py-2 text-right">Значение</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="([metric, value], i) in summaryMetrics" :key="i" :class="i % 2 ? 'bg-gray-50' : ''">
            <td class="border border-gray-300 px-3 py-2 font-medium">{{ metric }}</td>
            <td class="border border-gray-300 px-3 py-2 text-right font-bold">{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
