<script setup lang="ts">
import { ref, computed } from 'vue'
import ReportGenerator from './components/ReportGenerator.vue'
import { reportExamples } from './demo'

const selectedReport = ref(0)
const showCode = ref(false)
const copied = ref(false)
const repeatTableHeaders = ref(false)
const toast = ref<{ icon: string; title: string; message: string } | null>(null)

const currentDate = new Date().toLocaleDateString('ru-RU')
const currentReport = computed(() => reportExamples[selectedReport.value])

const showToast = (icon: string, title: string, message: string) => {
  toast.value = { icon, title, message }
  setTimeout(() => { toast.value = null }, 3000)
}

const onExportStart = () => {
  showToast('⏳', 'Экспорт начат', 'Генерация документа...')
}

const onExportEnd = ( { format, pages }: { format: string; pages?: number }) => {
  const icon = format === 'pdf' ? '📄' : '🌐'
  const title = format === 'pdf' ? 'PDF создан!' : 'HTML создан!'
  const message = pages ? `${pages} страниц экспортировано` : 'Документ готов'
  showToast(icon, title, message)
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(usageCode)
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
    <!-- Заголовок -->
    <template #header="{ page, totalPages }">
      <div class="doc-header">
        <span>ООО "Компания"</span>
        <span>Стр. {{ page + 1 }} / {{ totalPages }}</span>
      </div>
    </template>

    <!-- Каждая страница в div.report-page -->
    <div class="report-page">
      <h1>Титульная страница</h1>
    </div>

    <div class="report-page">
      <h2>Большая таблица</h2>
      <table>
        <thead>
          <tr><th>Колонка 1</th><th>Колонка 2</th><th>Колонка 3</th></tr>
        </thead>
        <tbody>
          <tr v-for="row in data" :key="row.id">
            <td>{{ row.col1 }}</td>
            <td>{{ row.col2 }}</td>
            <td>{{ row.col3 }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Подвал -->
    <template #footer>
      <p>© 2025 Конфиденциально</p>
    </template>
  </ReportGenerator>
</template>

<script setup>
import ReportGenerator from './components/ReportGenerator.vue'

const data = ref([
  /* ваши данные */
])
<\/script>`
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
    <!-- Header -->
    <header class="border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <span class="text-white text-lg">📄</span>
          </div>
          <div>
            <h1 class="text-white font-bold text-lg">Report Generator</h1>
            <p class="text-blue-300 text-xs">Vue 3 • PDF/HTML экспорт • Slot-контент • Многостраничность</p>
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
          <!-- Report Selector -->
          <div class="mb-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <h3 class="text-white font-semibold mb-3 flex items-center gap-2">
              <span>📑</span> Выберите пример отчёта
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <button
                v-for="(report, index) in reportExamples"
                :key="index"
                @click="selectedReport = index"
                class="p-3 rounded-lg border transition-all text-left"
                :class="selectedReport === index
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'"
              >
                <div class="text-2xl mb-1">{{ report.icon }}</div>
                <div class="font-medium text-sm">{{ report.name }}</div>
                <div class="text-xs opacity-70 mt-1">{{ report.desc }}</div>
              </button>
            </div>
            
            <!-- Repeat Table Headers Toggle -->
            <div class="mt-4 pt-4 border-t border-white/10">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="repeatTableHeaders"
                  class="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                />
                <span class="text-white text-sm">Повторять заголовки таблиц на каждой странице</span>
              </label>
            </div>
          </div>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Left Panel -->
        <div class="lg:col-span-1 space-y-4">
          <!-- Stats -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
            <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
              <span>📊</span> Статистика
            </h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Страниц</span>
                <span class="text-white font-medium">
                  {{ currentReport.pages > 0 ? currentReport.pages : 'Авто' }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Таблиц</span>
                <span class="text-white font-medium">{{ currentReport.tablesCount }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Строк данных</span>
                <span class="text-white font-medium">{{ currentReport.rowsCount }}+</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Формат</span>
                <span class="text-white font-medium uppercase">{{ currentReport.format }}</span>
              </div>
            </div>
          </div>

          <!-- Features -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
            <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
              <span>✨</span> Возможности
            </h3>
            <ul class="space-y-2 text-sm text-gray-300">
              <li class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>Многостраничные документы</li>
              <li class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>Экспорт в PDF</li>
              <li class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>Экспорт в HTML</li>
              <li class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>Предпросмотр</li>
              <li class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>Slot-контент</li>
              <li class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>Навигация</li>
              <li class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>A4/Letter/Legal</li>
              <li class="flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full"></span>Тёмная тема</li>
            </ul>
          </div>

          <!-- Props -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
            <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
              <span>⚙️</span> Пропсы
            </h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between text-gray-300"><code class="text-blue-300">title</code><span class="text-gray-500">String</span></div>
              <div class="flex justify-between text-gray-300"><code class="text-blue-300">pageSize</code><span class="text-gray-500">a4|letter|legal</span></div>
              <div class="flex justify-between text-gray-300"><code class="text-blue-300">orientation</code><span class="text-gray-500">portrait|landscape</span></div>
              <div class="flex justify-between text-gray-300"><code class="text-blue-300">margin</code><span class="text-gray-500">Number (mm)</span></div>
              <div class="flex justify-between text-gray-300"><code class="text-blue-300">darkMode</code><span class="text-gray-500">Boolean</span></div>
            </div>
          </div>
        </div>

        <!-- Right Panel - Report -->
        <div class="lg:col-span-3">
          <ReportGenerator
            :key="selectedReport"
            :title="currentReport.title"
            :page-size="currentReport.format"
            orientation="portrait"
            :margin="15"
            :repeat-table-headers="repeatTableHeaders"
            @export-start="onExportStart"
            @export-end="onExportEnd"
          >
            <template #header="{ page, totalPages }">
              <div class="flex justify-between items-center text-sm">
                <span class="font-semibold text-gray-700">{{ currentReport.company }}</span>
                <span class="text-gray-500">Стр. {{ page + 1 }} / {{ totalPages }}</span>
              </div>
            </template>

            <!-- Dynamic pages based on selected report -->
            <component :is="currentReport.component" />

            <template #footer>
              <p>© 2025 {{ currentReport.company }} • Сформировано {{ currentDate }}</p>
            </template>
          </ReportGenerator>
        </div>
      </div>

      <!-- Code Section -->
      <div v-if="showCode" class="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div class="flex items-center justify-between p-4 border-b border-white/10">
          <h3 class="text-white font-semibold flex items-center gap-2">
            <span>💻</span> Пример использования
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

      <!-- Toast -->
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
