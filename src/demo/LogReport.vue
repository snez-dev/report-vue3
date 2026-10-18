<script setup lang="ts">
// Логи событий с автопагинацией
const logTypes = ['INFO', 'WARNING', 'ERROR', 'DEBUG', 'SUCCESS']
const modules = ['Auth', 'Database', 'API', 'Cache', 'Queue', 'Scheduler', 'Mailer', 'Storage']
const messages = [
  'Пользователь авторизован',
  'Запрос выполнен успешно',
  'Превышен лимит запросов',
  'Ошибка подключения к БД',
  'Кэш очищен',
  'Задача выполнена',
  'Письмо отправлено',
  'Файл загружен',
  'Сессия истекла',
  'Резервная копия создана',
]

const logs = Array.from({ length: 200 }, (_, i) => ({
  timestamp: new Date(Date.now() - i * 60000).toLocaleString('ru-RU'),
  level: logTypes[i % logTypes.length],
  module: modules[i % modules.length],
  message: messages[i % messages.length],
  userId: Math.floor(Math.random() * 1000),
}))

const stats = {
  total: logs.length,
  errors: logs.filter(l => l.level === 'ERROR').length,
  warnings: logs.filter(l => l.level === 'WARNING').length,
  success: logs.filter(l => l.level === 'SUCCESS').length,
}
</script>

<template>
  <div style="padding: 20px;">
    <h1 style="text-align: center; color: #1f2937; margin-bottom: 10px;">Системные логи</h1>
    <p style="text-align: center; color: #6b7280; margin-bottom: 30px;">Отчёт за последние 24 часа</p>

    <div style="display: flex; gap: 15px; margin-bottom: 30px;">
      <div style="flex: 1; background: #dbeafe; padding: 15px; border-radius: 8px; text-align: center;">
        <div style="color: #1e40af; font-size: 12px;">Всего записей</div>
        <div style="color: #1e3a8a; font-size: 24px; font-weight: 700;">{{ stats.total }}</div>
      </div>
      <div style="flex: 1; background: #fee2e2; padding: 15px; border-radius: 8px; text-align: center;">
        <div style="color: #dc2626; font-size: 12px;">Ошибки</div>
        <div style="color: #991b1b; font-size: 24px; font-weight: 700;">{{ stats.errors }}</div>
      </div>
      <div style="flex: 1; background: #fef3c7; padding: 15px; border-radius: 8px; text-align: center;">
        <div style="color: #f59e0b; font-size: 12px;">Предупреждения</div>
        <div style="color: #92400e; font-size: 24px; font-weight: 700;">{{ stats.warnings }}</div>
      </div>
      <div style="flex: 1; background: #d1fae5; padding: 15px; border-radius: 8px; text-align: center;">
        <div style="color: #10b981; font-size: 12px;">Успешные</div>
        <div style="color: #065f46; font-size: 24px; font-weight: 700;">{{ stats.success }}</div>
      </div>
    </div>

    <h2 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">Детальные логи</h2>
    
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      <thead>
        <tr style="background: #f3f4f6;">
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Время</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">Уровень</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Модуль</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Сообщение</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">User ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(log, i) in logs" :key="i" :style="{ background: log.level === 'ERROR' ? '#fef2f2' : log.level === 'WARNING' ? '#fffbeb' : '' }">
          <td style="border: 1px solid #d1d5db; padding: 6px; font-family: monospace; font-size: 11px;">{{ log.timestamp }}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">
            <span :style="{ 
              background: log.level === 'ERROR' ? '#dc2626' : log.level === 'WARNING' ? '#f59e0b' : log.level === 'SUCCESS' ? '#10b981' : '#6b7280',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '11px'
            }">{{ log.level }}</span>
          </td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">{{ log.module }}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px;">{{ log.message }}</td>
          <td style="border: 1px solid #d1d5db; padding: 6px; text-align: right;">{{ log.userId }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
