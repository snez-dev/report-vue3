import FinancialReport from './FinancialReport.vue'
import SalesReport from './SalesReport.vue'
import HRReport from './HRReport.vue'
import ProjectsReport from './ProjectsReport.vue'
import WarehouseReport from './WarehouseReport.vue'
import SimpleReport from './SimpleReport.vue'
import type { Component } from 'vue'

export interface ReportExample {
  icon: string
  name: string
  desc: string
  component: Component
  pages: number
  tablesCount: number
  rowsCount: number
  format: string
  title: string
  company: string
}

export const reportExamples: ReportExample[] = [
  {
    icon: '💰',
    name: 'Финансовый',
    desc: 'P&L, Баланс, Cash Flow',
    component: FinancialReport,
    pages: 5,
    tablesCount: 4,
    rowsCount: 50,
    format: 'a4',
    title: 'Финансовый отчёт',
    company: 'ООО "ФинТех Групп"',
  },
  {
    icon: '🛒',
    name: 'Продажи',
    desc: 'Регионы, продукты, менеджеры',
    component: SalesReport,
    pages: 5,
    tablesCount: 4,
    rowsCount: 170,
    format: 'a4',
    title: 'Отчёт по продажам',
    company: 'ООО "ТоргСервис"',
  },
  {
    icon: '👥',
    name: 'HR',
    desc: 'Сотрудники, зарплаты, отделы',
    component: HRReport,
    pages: 5,
    tablesCount: 4,
    rowsCount: 72,
    format: 'a4',
    title: 'HR Отчёт',
    company: 'ООО "КадрПро"',
  },
  {
    icon: '📋',
    name: 'Проекты',
    desc: 'Реестр, задачи, метрики',
    component: ProjectsReport,
    pages: 6,
    tablesCount: 5,
    rowsCount: 185,
    format: 'a4',
    title: 'Отчёт по проектам',
    company: 'ООО "ПроектМастер"',
  },
  {
    icon: '📦',
    name: 'Склад',
    desc: 'Инвентаризация, дефицит',
    component: WarehouseReport,
    pages: 6,
    tablesCount: 5,
    rowsCount: 130,
    format: 'a4',
    title: 'Складской отчёт',
    company: 'ООО "ЛогистикМакс"',
  },
  {
    icon: '📄',
    name: 'Простой',
    desc: 'Авто-пагинация',
    component: SimpleReport,
    pages: 0,
    tablesCount: 1,
    rowsCount: 20,
    format: 'a4',
    title: 'Каталог товаров',
    company: 'ООО "ТехноМаркет"',
  },
]
