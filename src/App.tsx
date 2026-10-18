import { useState, useRef, useCallback, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FileText, Download, Eye, EyeOff, ChevronLeft, ChevronRight, Code, Printer, Copy, Check } from 'lucide-react';

// Types
interface ReportPage {
  id: string;
  title: string;
  content: React.ReactNode;
}

// Sample Report Content
function createSamplePages(): ReportPage[] {
  return [
    {
      id: '1',
      title: 'Титульная страница',
      content: (
        <div className="text-center py-16">
          <div className="text-6xl mb-6">📊</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Годовой отчёт</h1>
          <h2 className="text-xl text-gray-600 mb-8">ООО "Технологии Будущего"</h2>
          <div className="border-t border-b border-gray-200 py-4 my-8">
            <p className="text-gray-500">Период: Январь — Декабрь 2025</p>
            <p className="text-gray-500 mt-2">Дата формирования: {new Date().toLocaleDateString('ru-RU')}</p>
          </div>
          <p className="text-sm text-gray-400 mt-12">Конфиденциально</p>
        </div>
      )
    },
    {
      id: '2',
      title: 'Финансовые показатели',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Финансовые показатели</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-600">Выручка</p>
              <p className="text-2xl font-bold text-blue-800">₽ 125.4M</p>
              <p className="text-xs text-green-600 mt-1">↑ 23% к пред. году</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-sm text-green-600">Прибыль</p>
              <p className="text-2xl font-bold text-green-800">₽ 34.2M</p>
              <p className="text-xs text-green-600 mt-1">↑ 18% к пред. году</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-sm text-purple-600">ROI</p>
              <p className="text-2xl font-bold text-purple-800">27.3%</p>
              <p className="text-xs text-green-600 mt-1">↑ 5% к пред. году</p>
            </div>
          </div>
          <table className="w-full border-collapse mt-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Показатель</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Q1</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Q2</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Q3</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Q4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Выручка</td>
                <td className="border border-gray-300 px-4 py-2 text-right">28.1M</td>
                <td className="border border-gray-300 px-4 py-2 text-right">30.5M</td>
                <td className="border border-gray-300 px-4 py-2 text-right">32.8M</td>
                <td className="border border-gray-300 px-4 py-2 text-right">34.0M</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Расходы</td>
                <td className="border border-gray-300 px-4 py-2 text-right">20.2M</td>
                <td className="border border-gray-300 px-4 py-2 text-right">21.8M</td>
                <td className="border border-gray-300 px-4 py-2 text-right">23.1M</td>
                <td className="border border-gray-300 px-4 py-2 text-right">24.3M</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold">Прибыль</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-semibold">7.9M</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-semibold">8.7M</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-semibold">9.7M</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-semibold">9.7M</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: '3',
      title: 'Ключевые проекты',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Ключевые проекты</h2>
          <div className="space-y-4">
            {[
              { name: 'Платформа AI-аналитики', status: 'Завершён', progress: 100, color: 'green' },
              { name: 'Мобильное приложение v2.0', status: 'В разработке', progress: 72, color: 'blue' },
              { name: 'Интеграция с CRM', status: 'В разработке', progress: 45, color: 'yellow' },
              { name: 'Микросервисная архитектура', status: 'Планирование', progress: 15, color: 'purple' },
            ].map((project, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">{project.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full bg-${project.color}-100 text-${project.color}-700`}>
                    {project.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-${project.color}-500`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{project.progress}% выполнено</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="font-semibold text-amber-800 mb-2">⚠️ Риски и проблемы</h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Задержка поставки оборудования (вероятность: средняя)</li>
              <li>• Нехватка специалистов по ML (вероятность: высокая)</li>
              <li>• Изменение требований заказчика по проекту CRM</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: '4',
      title: 'Команда и HR',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Команда и HR</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="text-sm text-indigo-600">Всего сотрудников</p>
              <p className="text-3xl font-bold text-indigo-800">147</p>
              <p className="text-xs text-green-600">+23 за год</p>
            </div>
            <div className="bg-rose-50 rounded-lg p-4">
              <p className="text-sm text-rose-600">Текучесть</p>
              <p className="text-3xl font-bold text-rose-800">8.2%</p>
              <p className="text-xs text-green-600">↓ 3.1% к пред. году</p>
            </div>
          </div>
          <h3 className="font-semibold text-gray-700 mt-6">Распределение по отделам</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Отдел</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Кол-во</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Доля</th>
              </tr>
            </thead>
            <tbody>
              {[
                { dept: 'Разработка', count: 68, share: '46.3%' },
                { dept: 'Дизайн', count: 15, share: '10.2%' },
                { dept: 'Менеджмент', count: 22, share: '15.0%' },
                { dept: 'Маркетинг', count: 18, share: '12.2%' },
                { dept: 'HR и админ.', count: 24, share: '16.3%' },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                  <td className="border border-gray-300 px-4 py-2">{row.dept}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{row.count}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{row.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: '5',
      title: 'Заключение',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Заключение и планы</h2>
          <div className="prose">
            <p className="text-gray-700 leading-relaxed">
              По итогам 2025 года компания продемонстрировала устойчивый рост по всем ключевым показателям.
              Выручка увеличилась на 23%, что значительно превышает среднеотраслевой показатель в 12%.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Основные достижения года:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li>Успешный запуск платформы AI-аналитики</li>
              <li>Расширение команды на 23 специалиста</li>
              <li>Снижение текучести кадров до 8.2%</li>
              <li>Выход на 3 новых рынка</li>
              <li>Получение сертификата ISO 27001</li>
            </ul>
          </div>
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-3">📋 Планы на 2026 год</h3>
            <ol className="list-decimal list-inside text-sm text-blue-700 space-y-2">
              <li>Запуск мобильной платформы v2.0 (Q1)</li>
              <li>Интеграция с крупнейшими CRM-системами (Q2)</li>
              <li>Открытие офиса в Дубае (Q3)</li>
              <li>Увеличение штата до 200 человек (Q4)</li>
              <li>Привлечение раунда Series B</li>
            </ol>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm border-t pt-6">
            <p>© 2025 ООО "Технологии Будущего"</p>
            <p className="mt-1">Документ сформирован автоматически</p>
          </div>
        </div>
      )
    }
  ];
}

export default function App() {
  const [pages] = useState<ReportPage[]>(createSamplePages);
  const [currentPage, setCurrentPage] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const totalPages = pages.length;

  const exportPDF = useCallback(async () => {
    if (!contentRef.current) return;
    setIsExporting(true);

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageElements = contentRef.current.querySelectorAll('.report-page-export');
      
      for (let i = 0; i < pageElements.length; i++) {
        if (i > 0) pdf.addPage();

        const canvas = await html2canvas(pageElements[i] as HTMLElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = 190;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, Math.min(pdfHeight, 277));
      }

      pdf.save('report.pdf');
    } catch (error) {
      console.error('PDF export error:', error);
    } finally {
      setIsExporting(false);
    }
  }, []);

  const exportHTML = useCallback(() => {
    if (!contentRef.current) return;
    setIsExporting(true);

    try {
      const content = contentRef.current.innerHTML;
      const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Годовой отчёт</title>
  <style>
    @page { size: A4; margin: 15mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; color: #1a1a1a; }
    .report-page-export { page-break-after: always; padding: 30px; border: 1px solid #eee; margin-bottom: 20px; border-radius: 8px; }
    .report-page-export:last-child { page-break-after: auto; }
    table { width: 100%; border-collapse: collapse; margin: 10px 0; }
    th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
    th { background-color: #f5f5f5; }
    @media print { body { padding: 0; } .report-page-export { border: none; } }
  </style>
</head>
<body>
  <h1 style="text-align:center; margin-bottom: 30px;">Годовой отчёт 2025</h1>
  ${content}
</body>
</html>`;

      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.html';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('HTML export error:', error);
    } finally {
      setIsExporting(false);
    }
  }, []);

  const copyVueCode = async () => {
    try {
      const response = await fetch('/ReportGenerator.vue');
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Copy error:', e);
    }
  };

  const scrollToPage = (index: number) => {
    const pages = contentRef.current?.querySelectorAll('.report-page-export');
    if (pages && pages[index]) {
      pages[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setCurrentPage(index);
  };

  // Track scroll position
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleScroll = () => {
      const pages = container.querySelectorAll('.report-page-export');
      const containerTop = container.scrollTop;
      
      pages.forEach((page, index) => {
        const el = page as HTMLElement;
        if (el.offsetTop <= containerTop + 100 && el.offsetTop + el.offsetHeight > containerTop + 100) {
          setCurrentPage(index);
        }
      });
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const vueCode = `<template>
  <ReportGenerator
    title="Годовой отчёт"
    page-size="a4"
    orientation="portrait"
  >
    <!-- Заголовок документа -->
    <template #header="{ page, totalPages }">
      <div class="doc-header">
        <span>ООО "Компания"</span>
        <span>Стр. {{ page + 1 }} / {{ totalPages }}</span>
      </div>
    </template>

    <!-- Контент (автоматическая пагинация) -->
    <div class="report-content">
      <h1>Финансовый отчёт</h1>
      <table>
        <tr><th>Показатель</th><th>Значение</th></tr>
        <tr><td>Выручка</td><td>₽ 125.4M</td></tr>
        <tr><td>Прибыль</td><td>₽ 34.2M</td></tr>
      </table>
      <!-- Контент автоматически разбивается на страницы -->
    </div>

    <!-- Подвал документа -->
    <template #footer>
      <p>Конфиденциально © 2025</p>
    </template>
  </ReportGenerator>
</template>

<script setup>
import ReportGenerator from './ReportGenerator.vue'
<\/script>`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Report Generator</h1>
              <p className="text-blue-300 text-xs">Vue 3 компонент с PDF/HTML экспортом</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm"
            >
              <Code className="w-4 h-4" />
              Vue код
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Export Controls */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Download className="w-4 h-4 text-blue-400" />
                Экспорт документа
              </h3>
              <div className="space-y-3">
                <button
                  onClick={exportPDF}
                  disabled={isExporting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg transition-all font-medium"
                >
                  <FileText className="w-4 h-4" />
                  {isExporting ? 'Генерация...' : 'Экспорт PDF'}
                </button>
                <button
                  onClick={exportHTML}
                  disabled={isExporting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white rounded-lg transition-all font-medium"
                >
                  <Printer className="w-4 h-4" />
                  Экспорт HTML
                </button>
              </div>
            </div>

            {/* Page Navigation */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Навигация по страницам</h3>
              <div className="space-y-2">
                {pages.map((page, index) => (
                  <button
                    key={page.id}
                    onClick={() => scrollToPage(index)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                      currentPage === index
                        ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xs text-gray-500 mr-2">{index + 1}.</span>
                    {page.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">Возможности</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Многостраничные документы
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Экспорт в PDF
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Экспорт в HTML
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Предпросмотр документа
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Slot-контент (header/footer/default)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Навигация по страницам
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Адаптивные размеры (A4/Letter/Legal)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Тёмная тема
                </li>
              </ul>
            </div>
          </div>

          {/* Right Panel - Report Preview */}
          <div className="lg:col-span-2">
            {/* Toolbar */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-t-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-white text-sm px-3">
                  Страница {currentPage + 1} из {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage >= totalPages - 1}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? 'Скрыть' : 'Предпросмотр'}
              </button>
            </div>

            {/* Report Content */}
            <div
              ref={contentRef}
              className="bg-gray-100 rounded-b-xl overflow-y-auto p-6 space-y-6"
              style={{ maxHeight: '70vh' }}
            >
              {pages.map((page, index) => (
                <div
                  key={page.id}
                  className="report-page-export bg-white rounded-lg shadow-lg p-8 min-h-[500px] relative"
                  id={`page-${index}`}
                >
                  <div className="absolute top-3 right-3 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    Стр. {index + 1}
                  </div>
                  {page.content}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vue Code Section */}
        {showCode && (
          <div className="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-400" />
                ReportGenerator.vue — Vue 3 компонент
              </h3>
              <button
                onClick={copyVueCode}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Скопировано!' : 'Копировать'}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-gray-300 max-h-[500px] overflow-y-auto">
              <code>{vueCode}</code>
            </pre>
          </div>
        )}

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold text-gray-800 text-lg">Предпросмотр документа</h3>
                <div className="flex items-center gap-2">
                  <button onClick={exportPDF} className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-all">
                    PDF
                  </button>
                  <button onClick={exportHTML} className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600 transition-all">
                    HTML
                  </button>
                  <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                    ✕
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 bg-gray-100 space-y-6">
                {pages.map((page, index) => (
                  <div key={page.id} className="bg-white rounded-lg shadow-md p-8 min-h-[400px] relative">
                    <div className="absolute top-2 right-3 text-xs text-gray-400">
                      Страница {index + 1}
                    </div>
                    {page.content}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isExporting && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-700 font-medium">Генерация документа...</p>
              <p className="text-gray-400 text-sm mt-1">Пожалуйста, подождите</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
