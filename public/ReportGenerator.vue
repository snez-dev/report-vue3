<template>
  <div class="report-generator" :class="{ 'dark-mode': darkMode }">
    <!-- Toolbar -->
    <div class="report-toolbar">
      <div class="toolbar-left">
        <button @click="exportPDF" class="btn btn-primary" :disabled="isExporting">
          📄 Экспорт PDF
        </button>
        <button @click="exportHTML" class="btn btn-secondary">
          🌐 Экспорт HTML
        </button>
        <button @click="togglePreview" class="btn btn-outline">
          {{ showPreview ? '✏️ Редактор' : '👁️ Предпросмотр' }}
        </button>
      </div>
      <div class="toolbar-right">
        <span class="page-indicator">
          Страница {{ currentPage + 1 }} из {{ totalPages }}
        </span>
        <button @click="prevPage" :disabled="currentPage === 0" class="btn btn-icon">
          ◀
        </button>
        <button @click="nextPage" :disabled="currentPage >= totalPages - 1" class="btn btn-icon">
          ▶
        </button>
      </div>
    </div>

    <!-- Report Content Area -->
    <div class="report-container" ref="reportContainer">
      <!-- Header Slot -->
      <div class="report-header" v-if="$slots.header">
        <slot name="header" :page="currentPage" :total-pages="totalPages" />
      </div>

      <!-- Main Content Slot -->
      <div class="report-content" ref="reportContent">
        <div
          v-for="(page, index) in pages"
          :key="index"
          class="report-page"
          :class="{ 'page-break': index > 0 }"
          :data-page="index + 1"
          ref="pageRefs"
        >
          <slot :page="index" :total-pages="totalPages">
            <p>Контент не предоставлен. Используйте slot для вставки содержимого.</p>
          </slot>
        </div>
      </div>

      <!-- Footer Slot -->
      <div class="report-footer" v-if="$slots.footer">
        <slot name="footer" :page="currentPage" :total-pages="totalPages" />
      </div>
    </div>

    <!-- Preview Overlay -->
    <Teleport to="body">
      <div v-if="showPreview" class="preview-overlay" @click.self="showPreview = false">
        <div class="preview-modal">
          <div class="preview-header">
            <h3>Предпросмотр документа</h3>
            <button @click="showPreview = false" class="btn-close">✕</button>
          </div>
          <div class="preview-body">
            <div class="preview-pages">
              <div
                v-for="(page, index) in pages"
                :key="index"
                class="preview-page"
              >
                <div class="preview-page-number">Страница {{ index + 1 }}</div>
                <div class="preview-page-content" v-html="pageHTML[index]"></div>
              </div>
            </div>
          </div>
          <div class="preview-footer">
            <button @click="exportPDF" class="btn btn-primary">📄 Скачать PDF</button>
            <button @click="exportHTML" class="btn btn-secondary">🌐 Скачать HTML</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Loading Overlay -->
    <div v-if="isExporting" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>Генерация документа...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick, useSlots } from 'vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Props
const props = defineProps({
  title: {
    type: String,
    default: 'Отчёт'
  },
  pageSize: {
    type: String,
    default: 'a4',
    validator: (val) => ['a4', 'letter', 'legal'].includes(val)
  },
  orientation: {
    type: String,
    default: 'portrait',
    validator: (val) => ['portrait', 'landscape'].includes(val)
  },
  margin: {
    type: Number,
    default: 20
  },
  darkMode: {
    type: Boolean,
    default: false
  },
  autoPagination: {
    type: Boolean,
    default: true
  },
  headerHeight: {
    type: String,
    default: '60px'
  },
  footerHeight: {
    type: String,
    default: '40px'
  }
});

// Emits
const emit = defineEmits(['export-start', 'export-end', 'page-change', 'error']);

// Refs
const reportContainer = ref(null);
const reportContent = ref(null);
const pageRefs = ref([]);
const slots = useSlots();

// State
const currentPage = ref(0);
const showPreview = ref(false);
const isExporting = ref(false);
const totalPages = ref(1);
const pageHTML = ref([]);

// Computed
const pageDimensions = computed(() => {
  const sizes = {
    a4: { width: 210, height: 297 },
    letter: { width: 216, height: 279 },
    legal: { width: 216, height: 356 }
  };
  const size = sizes[props.pageSize];
  if (props.orientation === 'landscape') {
    return { width: size.height, height: size.width };
  }
  return size;
});

// Methods
const calculatePages = async () => {
  if (!props.autoPagination || !reportContent.value) return;
  
  await nextTick();
  const content = reportContent.value;
  const pageHeight = pageDimensions.value.height * 3.78; // mm to px approx
  
  const totalHeight = content.scrollHeight;
  const pages = Math.ceil(totalHeight / pageHeight);
  totalPages.value = Math.max(1, pages);
};

const togglePreview = async () => {
  showPreview.value = !showPreview.value;
  if (showPreview.value) {
    await updatePreviewHTML();
  }
};

const updatePreviewHTML = async () => {
  await nextTick();
  const pages = reportContent.value?.querySelectorAll('.report-page');
  if (pages) {
    pageHTML.value = Array.from(pages).map(page => page.innerHTML);
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    scrollToPage(currentPage.value);
    emit('page-change', currentPage.value);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
    scrollToPage(currentPage.value);
    emit('page-change', currentPage.value);
  }
};

const scrollToPage = (pageIndex) => {
  const pages = reportContent.value?.querySelectorAll('.report-page');
  if (pages && pages[pageIndex]) {
    pages[pageIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const exportPDF = async () => {
  try {
    isExporting.value = true;
    emit('export-start');

    const { width, height } = pageDimensions.value;
    const pdf = new jsPDF({
      orientation: props.orientation === 'landscape' ? 'l' : 'p',
      unit: 'mm',
      format: props.pageSize
    });

    const pages = reportContent.value?.querySelectorAll('.report-page');
    if (!pages || pages.length === 0) {
      throw new Error('Нет контента для экспорта');
    }

    for (let i = 0; i < pages.length; i++) {
      if (i > 0) pdf.addPage();

      const canvas = await html2canvas(pages[i], {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = width - props.margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', props.margin, props.margin, imgWidth, imgHeight);
    }

    pdf.save(`${props.title}.pdf`);
    emit('export-end', { format: 'pdf', pages: pages.length });
  } catch (error) {
    console.error('Ошибка экспорта PDF:', error);
    emit('error', error);
  } finally {
    isExporting.value = false;
  }
};

const exportHTML = async () => {
  try {
    isExporting.value = true;
    emit('export-start');

    const content = reportContent.value?.innerHTML;
    const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${props.title}</title>
  <style>
    @page {
      size: ${props.pageSize} ${props.orientation};
      margin: ${props.margin}mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 20px;
      color: #1a1a1a;
    }
    .report-page {
      page-break-after: always;
      padding: ${props.margin}mm;
      min-height: ${pageDimensions.value.height - props.margin * 2}mm;
    }
    .report-page:last-child {
      page-break-after: auto;
    }
    .page-break {
      page-break-before: always;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background-color: #f5f5f5;
      font-weight: 600;
    }
    h1, h2, h3 { color: #2c3e50; }
    @media print {
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <h1>${props.title}</h1>
  ${content}
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${props.title}.html`;
    a.click();
    URL.revokeObjectURL(url);

    emit('export-end', { format: 'html' });
  } catch (error) {
    console.error('Ошибка экспорта HTML:', error);
    emit('error', error);
  } finally {
    isExporting.value = false;
  }
};

// Watchers
watch(() => slots.default, () => {
  calculatePages();
}, { deep: true });

onMounted(() => {
  calculatePages();
  window.addEventListener('resize', calculatePages);
});

// Expose methods
defineExpose({
  exportPDF,
  exportHTML,
  togglePreview,
  currentPage,
  totalPages
});
</script>

<style scoped>
.report-generator {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
}

.report-generator.dark-mode {
  background: #1a1a2e;
  border-color: #333;
}

.report-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  flex-wrap: wrap;
  gap: 8px;
}

.dark-mode .report-toolbar {
  background: #16213e;
  border-color: #333;
}

.toolbar-left, .toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #4b5563;
}

.btn-outline {
  background: transparent;
  border: 1px solid #d1d5db;
  color: #374151;
}

.btn-outline:hover:not(:disabled) {
  background: #f3f4f6;
}

.btn-icon {
  padding: 8px 12px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}

.page-indicator {
  font-size: 13px;
  color: #6b7280;
  padding: 0 8px;
}

.report-container {
  background: white;
  min-height: 400px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.dark-mode .report-container {
  background: #0f3460;
  color: #e0e0e0;
}

.report-content {
  padding: 20px;
}

.report-page {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 40px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  min-height: 297mm;
  position: relative;
}

.page-break {
  page-break-before: always;
}

.report-header {
  padding: 16px 20px;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
}

.report-footer {
  padding: 12px 20px;
  background: #f8fafc;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  font-size: 12px;
  color: #6b7280;
}

/* Preview Modal */
.preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.preview-modal {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.preview-header h3 {
  margin: 0;
  font-size: 18px;
}

.btn-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}

.btn-close:hover {
  background: #f3f4f6;
}

.preview-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: #f3f4f6;
}

.preview-pages {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}

.preview-page {
  background: white;
  width: 100%;
  max-width: 700px;
  min-height: 400px;
  padding: 40px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.preview-page-number {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 11px;
  color: #9ca3af;
}

.preview-footer {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
}

/* Loading */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Print styles */
@media print {
  .report-toolbar { display: none !important; }
  .report-container { max-height: none; overflow: visible; }
  .report-page {
    border: none;
    box-shadow: none;
    margin: 0;
    padding: 0;
  }
}
</style>
