<script setup lang="ts">
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
    <div class="report-page">
      <div class="text-center py-12">
        <div class="icon-large">📋</div>
        <h1>Отчёт по проектам</h1>
        <p class="text-xl text-gray-600 mb-8">ООО "ПроектМастер"</p>
        <div class="border-t border-b py-4 my-8">
          <p class="text-gray-500">Портфель проектов 2025</p>
        </div>
      </div>
    </div>

    <div class="report-page">
      <h2>Реестр проектов</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">ID</th>
            <th style="text-align: left">Название</th>
            <th style="text-align: left">Клиент</th>
            <th style="text-align: left">Статус</th>
            <th style="text-align: left">Приоритет</th>
            <th style="text-align: right">Бюджет</th>
            <th style="text-align: right">Потрачено</th>
            <th style="text-align: right">Прогресс</th>
            <th style="text-align: left">Дедлайн</th>
            <th style="text-align: center">Команда</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, i) in projects.slice(0, 15)" :key="i">
            <td style="font-family: monospace">{{ p.id }}</td>
            <td>{{ p.name }}</td>
            <td>{{ p.client }}</td>
            <td>{{ p.status }}</td>
            <td>{{ p.priority }}</td>
            <td style="text-align: right">{{ p.budget.toLocaleString('ru-RU') }}т₽</td>
            <td style="text-align: right">{{ p.spent.toLocaleString('ru-RU') }}т₽</td>
            <td style="text-align: right">{{ p.progress }}%</td>
            <td>{{ p.deadline }}</td>
            <td style="text-align: center">{{ p.team }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-page">
      <h2>Реестр проектов (продолжение)</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">ID</th>
            <th style="text-align: left">Название</th>
            <th style="text-align: left">Клиент</th>
            <th style="text-align: left">Статус</th>
            <th style="text-align: left">Приоритет</th>
            <th style="text-align: right">Бюджет</th>
            <th style="text-align: right">Потрачено</th>
            <th style="text-align: right">Прогресс</th>
            <th style="text-align: left">Дедлайн</th>
            <th style="text-align: center">Команда</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, i) in projects.slice(15)" :key="i">
            <td style="font-family: monospace">{{ p.id }}</td>
            <td>{{ p.name }}</td>
            <td>{{ p.client }}</td>
            <td>{{ p.status }}</td>
            <td>{{ p.priority }}</td>
            <td style="text-align: right">{{ p.budget.toLocaleString('ru-RU') }}т₽</td>
            <td style="text-align: right">{{ p.spent.toLocaleString('ru-RU') }}т₽</td>
            <td style="text-align: right">{{ p.progress }}%</td>
            <td>{{ p.deadline }}</td>
            <td style="text-align: center">{{ p.team }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-page">
      <h2>Задачи по проектам</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Проект</th>
            <th style="text-align: left">Задача</th>
            <th style="text-align: left">Исполнитель</th>
            <th style="text-align: left">Статус</th>
            <th style="text-align: right">Часы</th>
            <th style="text-align: left">Дедлайн</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, i) in tasks.slice(0, 40)" :key="i">
            <td style="font-family: monospace">{{ t.project }}</td>
            <td>{{ t.task }}</td>
            <td>{{ t.assignee }}</td>
            <td>{{ t.status }}</td>
            <td style="text-align: right">{{ t.hours }}</td>
            <td>{{ t.deadline }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-page">
      <h2>Задачи по проектам (продолжение)</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Проект</th>
            <th style="text-align: left">Задача</th>
            <th style="text-align: left">Исполнитель</th>
            <th style="text-align: left">Статус</th>
            <th style="text-align: right">Часы</th>
            <th style="text-align: left">Дедлайн</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, i) in tasks.slice(40, 80)" :key="i">
            <td style="font-family: monospace">{{ t.project }}</td>
            <td>{{ t.task }}</td>
            <td>{{ t.assignee }}</td>
            <td>{{ t.status }}</td>
            <td style="text-align: right">{{ t.hours }}</td>
            <td>{{ t.deadline }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-page">
      <h2>Сводка по проектам</h2>
      <table>
        <thead>
          <tr>
            <th style="text-align: left">Метрика</th>
            <th style="text-align: right">Значение</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="([metric, value], i) in summaryMetrics" :key="i">
            <td style="font-weight: 500">{{ metric }}</td>
            <td style="text-align: right; font-weight: 700">{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
