<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
    <!-- Header -->
    <header class="border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <span class="text-white text-lg">📄</span>
          </div>
          <div>
            <h1 class="text-white font-bold text-lg">Report Generator</h1>
            <p class="text-blue-300 text-xs">Vue 3 компонент • PDF/HTML экспорт • Slot-контент</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="showCode = !showCode"
            class="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm"
          >
            <span>💻</span> Vue код
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Panel -->
        <div class="lg:col-span-1 space-y-4">
          <!-- Features Card -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
            <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
              <span>✨</span> Возможности компонента
            </h3>
            <ul class="space-y-2 text-sm text-gray-300">
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                Многостраничные документы
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                Экспорт в PDF (jsPDF)
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                Экспорт в HTML
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                Предпросмотр документа
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                Slot-контент (header/footer/default)
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                Навигация по страницам
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                Форматы A4 / Letter / Legal
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                Тёмная тема
              </li>
            </ul>
          </div>

          <!-- Props Card -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
            <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
              <span>⚙️</span> Пропсы компонента
            </h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between text-gray-300">
                <code class="text-blue-300">title</code>
                <span class="text-gray-500">String</span>
              </div>
              <div class="flex justify-between text-gray-300">
                <code class="text-blue-300">pageSize</code>
                <span class="text-gray-500">a4 | letter | legal</span>
              </div>
              <div class="flex justify-between text-gray-300">
                <code class="text-blue-300">orientation</code>
                <span class="text-gray-500">portrait | landscape</span>
              </div>
              <div class="flex justify-between text-gray-300">
                <code class="text-blue-300">margin</code>
                <span class="text-gray-500">Number (mm)</span>
              </div>
              <div class="flex justify-between text-gray-300">
                <code class="text-blue-300">darkMode</code>
                <span class="text-gray-500">Boolean</span>
              </div>
            </div>
          </div>

          <!-- Events Card -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
            <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
              <span>📡</span> События (Emits)
            </h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between text-gray-300">
                <code class="text-emerald-300">@export-start</code>
                <span class="text-gray-500">Начало экспорта</span>
              </div>
              <div class="flex justify-between text-gray-300">
                <code class="text-emerald-300">@export-end</code>
                <span class="text-gray-500">Завершение</span>
              </div>
              <div class="flex justify-between text-gray-300">
                <code class="text-emerald-300">@page-change</code>
                <span class="text-gray-500">Смена страницы</span>
              </div>
              <div class="flex justify-between text-gray-300">
                <code class="text-emerald-300">@error</code>
                <span class="text-gray-500">Ошибка</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel - Report Generator Demo -->
        <div class="lg:col-span-2">
          <ReportGenerator
            title="Годовой отчёт 2025"
            page-size="a4"
            orientation="portrait"
            :margin="15"
            @export-start="onExportStart"
            @export-end="onExportEnd"
          >
            <!-- Header slot -->
            <template #header="{ page, totalPages }">
              <div class="flex justify-between items-center">
                <span class="font-semibold text-gray-700">ООО "Технологии Будущего"</span>
                <span class="text-sm text-gray-500">Стр. {{ page + 1 }} / {{ totalPages }}</span>
              </div>
            </template>

            <!-- Default slot content -->
            <div class="report-page">
              <div class="text-center py-12">
                <div class="text-6xl mb-6">📊</div>
                <h1 class="text-3xl font-bold text-gray-800 mb-4">Годовой отчёт</h1>
                <h2 class="text-xl text-gray-600 mb-8">ООО "Технологии Будущего"</h2>
                <div class="border-t border-b border-gray-200 py-4 my-8">
                  <p class="text-gray-500">Период: Январь — Декабрь 2025</p>
                  <p class="text-gray-500 mt-2">Дата формирования: {{ currentDate }}</p>
                </div>
                <p class="text-sm text-gray-400 mt-12">Конфиденциально</p>
              </div>
            </div>

            <div class="report-page">
              <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Финансовые показатели</h2>
              <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="bg-blue-50 rounded-lg p-4 text-center">
                  <p class="text-sm text-blue-600">Выручка</p>
                  <p class="text-2xl font-bold text-blue-800">₽ 125.4M</p>
                  <p class="text-xs text-green-600 mt-1">↑ 23%</p>
                </div>
                <div class="bg-green-50 rounded-lg p-4 text-center">
                  <p class="text-sm text-green-600">Прибыль</p>
                  <p class="text-2xl font-bold text-green-800">₽ 34.2M</p>
                  <p class="text-xs text-green-600 mt-1">↑ 18%</p>
                </div>
                <div class="bg-purple-50 rounded-lg p-4 text-center">
                  <p class="text-sm text-purple-600">ROI</p>
                  <p class="text-2xl font-bold text-purple-800">27.3%</p>
                  <p class="text-xs text-green-600 mt-1">↑ 5%</p>
                </div>
              </div>
              <table class="w-full border-collapse">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 px-4 py-2 text-left">Показатель</th>
                    <th class="border border-gray-300 px-4 py-2 text-right">Q1</th>
                    <th class="border border-gray-300 px-4 py-2 text-right">Q2</th>
                    <th class="border border-gray-300 px-4 py-2 text-right">Q3</th>
                    <th class="border border-gray-300 px-4 py-2 text-right">Q4</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 px-4 py-2">Выручка</td>
                    <td class="border border-gray-300 px-4 py-2 text-right">28.1M</td>
                    <td class="border border-gray-300 px-4 py-2 text-right">30.5M</td>
                    <td class="border border-gray-300 px-4 py-2 text-right">32.8M</td>
                    <td class="border border-gray-300 px-4 py-2 text-right">34.0M</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 px-4 py-2">Расходы</td>
                    <td class="border border-gray-300 px-4 py-2 text-right">20.2M</td>
                    <td class="border border-gray-300 px-4 py-2 text-right">21.8M</td>
                    <td class="border border-gray-300 px-4 py-2 text-right">23.1M</td>
                    <td class="border border-gray-300 px-4 py-2 text-right">24.3M</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 px-4 py-2 font-semibold">Прибыль</td>
                    <td class="border border-gray-300 px-4 py-2 text-right font-semibold">7.9M</td>
                    <td class="border border-gray-300 px-4 py-2 text-right font-semibold">8.7M</td>
                    <td class="border border-gray-300 px-4 py-2 text-right font-semibold">9.7M</td>
                    <td class="border border-gray-300 px-4 py-2 text-right font-semibold">9.7M</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="report-page">
              <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Ключевые проекты</h2>
              <div class="space-y-4">
                <div v-for="(project, i) in projects" :key="i" class="border border-gray-200 rounded-lg p-4">
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="font-semibold text-gray-800">{{ project.name }}</h3>
                    <span
                      class="text-xs px-2 py-1 rounded-full"
                      :class="statusClass(project.status)"
                    >
                      {{ project.status }}
                    </span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      class="h-2.5 rounded-full transition-all"
                      :class="progressClass(project.progress)"
                      :style="{ width: project.progress + '%' }"
                    ></div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">{{ project.progress }}% выполнено</p>
                </div>
              </div>
              <div class="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 class="font-semibold text-amber-800 mb-2">⚠️ Риски и проблемы</h3>
                <ul class="text-sm text-amber-700 space-y-1">
                  <li>• Задержка поставки оборудования (вероятность: средняя)</li>
                  <li>• Нехватка специалистов по ML (вероятность: высокая)</li>
                  <li>• Изменение требований заказчика по проекту CRM</li>
                </ul>
              </div>
            </div>

            <div class="report-page">
              <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Команда и HR</h2>
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-indigo-50 rounded-lg p-4">
                  <p class="text-sm text-indigo-600">Всего сотрудников</p>
                  <p class="text-3xl font-bold text-indigo-800">147</p>
                  <p class="text-xs text-green-600">+23 за год</p>
                </div>
                <div class="bg-rose-50 rounded-lg p-4">
                  <p class="text-sm text-rose-600">Текучесть</p>
                  <p class="text-3xl font-bold text-rose-800">8.2%</p>
                  <p class="text-xs text-green-600">↓ 3.1% к пред. году</p>
                </div>
              </div>
              <h3 class="font-semibold text-gray-700 mb-3">Распределение по отделам</h3>
              <table class="w-full border-collapse">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 px-4 py-2 text-left">Отдел</th>
                    <th class="border border-gray-300 px-4 py-2 text-right">Кол-во</th>
                    <th class="border border-gray-300 px-4 py-2 text-right">Доля</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in departments" :key="i" :class="i % 2 === 1 ? 'bg-gray-50' : ''">
                    <td class="border border-gray-300 px-4 py-2">{{ row.dept }}</td>
                    <td class="border border-gray-300 px-4 py-2 text-right">{{ row.count }}</td>
                    <td class="border border-gray-300 px-4 py-2 text-right">{{ row.share }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="report-page">
              <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">Заключение и планы</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                По итогам 2025 года компания продемонстрировала устойчивый рост по всем ключевым показателям.
                Выручка увеличилась на 23%, что значительно превышает среднеотраслевой показатель в 12%.
              </p>
              <p class="text-gray-700 leading-relaxed mb-2">Основные достижения года:</p>
              <ul class="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Успешный запуск платформы AI-аналитики</li>
                <li>Расширение команды на 23 специалиста</li>
                <li>Снижение текучести кадров до 8.2%</li>
                <li>Выход на 3 новых рынка</li>
                <li>Получение сертификата ISO 27001</li>
              </ul>
              <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 class="font-semibold text-blue-800 mb-3">📋 Планы на 2026 год</h3>
                <ol class="list-decimal list-inside text-sm text-blue-700 space-y-2">
                  <li>Запуск мобильной платформы v2.0 (Q1)</li>
                  <li>Интеграция с крупнейшими CRM-системами (Q2)</li>
                  <li>Открытие офиса в Дубае (Q3)</li>
                  <li>Увеличение штата до 200 человек (Q4)</li>
                  <li>Привлечение раунда Series B</li>
                </ol>
              </div>
            </div>

            <!-- Footer slot -->
            <template #footer>
              <p>© 2025 ООО "Технологии Будущего" • Документ сформирован автоматически</p>
            </template>
          </ReportGenerator>
        </div>
      </div>

      <!-- Code Section -->
      <div v-if="showCode" class="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div class="flex items-center justify-between p-4 border-b border-white/10">
          <h3 class="text-white font-semibold flex items-center gap-2">
            <span>💻</span> Пример использования компонента
          </h3>
          <button
            @click="copyCode"
            class="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm"
          >
            <span>{{ copied ? '✅' : '📋' }}</span>
            {{ copied ? 'Скопировано!' : 'Копировать' }}
          </button>
        </div>
        <pre class="p-4 overflow-x-auto text-sm text-gray-300 max-h-[500px] overflow-y-auto"><code>{{ usageCode }}</code></pre>
      </div>

      <!-- Toast Notification -->
      <Transition name="slide-up">
        <div v-if="toast" class="fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl p-4 flex items-center gap-3 z-50">
          <span class="text-2xl">{{ toast.icon }}</span>
          <div>
            <p class="font-semibold text-gray-800">{{ toast.title }}</p>
            <p class="text-sm text-gray-500">{{ toast.message }}</p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ReportGenerator from './components/ReportGenerator.vue'

const showCode = ref(false)
const copied = ref(false)
const toast = ref<{ icon: string; title: string; message: string } | null>(null)

const currentDate = computed(() => new Date().toLocaleDateString('ru-RU'))

const projects = ref([
  { name: 'Платформа AI-аналитики', status: 'Завершён', progress: 100 },
  { name: 'Мобильное приложение v2.0', status: 'В разработке', progress: 72 },
  { name: 'Интеграция с CRM', status: 'В разработке', progress: 45 },
  { name: 'Микросервисная архитектура', status: 'Планирование', progress: 15 },
])

const departments = ref([
  { dept: 'Разработка', count: 68, share: '46.3%' },
  { dept: 'Дизайн', count: 15, share: '10.2%' },
  { dept: 'Менеджмент', count: 22, share: '15.0%' },
  { dept: 'Маркетинг', count: 18, share: '12.2%' },
  { dept: 'HR и админ.', count: 24, share: '16.3%' },
])

const statusClass = (status: string) => {
  const classes: Record<string, string> = {
    'Завершён': 'bg-green-100 text-green-700',
    'В разработке': 'bg-blue-100 text-blue-700',
    'Планирование': 'bg-purple-100 text-purple-700',
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const progressClass = (progress: number) => {
  if (progress >= 80) return 'bg-green-500'
  if (progress >= 50) return 'bg-blue-500'
  if (progress >= 30) return 'bg-yellow-500'
  return 'bg-purple-500'
}

const showToast = (icon: string, title: string, message: string) => {
  toast.value = { icon, title, message }
  setTimeout(() => { toast.value = null }, 3000)
}

const onExportStart = () => {
  showToast('⏳', 'Экспорт начат', 'Генерация документа...')
}

const onExportEnd = (data: { format: string; pages?: number }) => {
  const icon = data.format === 'pdf' ? '📄' : '🌐'
  const title = data.format === 'pdf' ? 'PDF создан' : 'HTML создан'
  const message = data.pages ? `${data.pages} страниц` : 'Документ готов'
  showToast(icon, title, message)
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(usageCode.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (e) {
    console.error('Copy error:', e)
  }
}

const usageCode = `<template>
  <ReportGenerator
    title="Годовой отчёт"
    page-size="a4"
    orientation="portrait"
    :margin="15"
    @export-start="onExportStart"
    @export-end="onExportEnd"
  >
    <!-- Заголовок документа -->
    <template #header="{ page, totalPages }">
      <div class="doc-header">
        <span>ООО "Компания"</span>
        <span>Стр. {{ page + 1 }} / {{ totalPages }}</span>
      </div>
    </template>

    <!-- Контент — каждая страница в div.report-page -->
    <div class="report-page">
      <h1>Титульная страница</h1>
      <p>Содержимое первой страницы...</p>
    </div>

    <div class="report-page">
      <h2>Финансовые показатели</h2>
      <table>
        <tr><th>Показатель</th><th>Значение</th></tr>
        <tr><td>Выручка</td><td>₽ 125.4M</td></tr>
      </table>
    </div>

    <div class="report-page">
      <h2>Заключение</h2>
      <p>Итоги и планы...</p>
    </div>

    <!-- Подвал документа -->
    <template #footer>
      <p>© 2025 Конфиденциально</p>
    </template>
  </ReportGenerator>
</template>

<script setup>
import ReportGenerator from './components/ReportGenerator.vue'

const onExportStart = () => {
  console.log('Экспорт начат')
}

const onExportEnd = (data) => {
  console.log('Экспорт завершён:', data)
}
<\/script>`
</script>
