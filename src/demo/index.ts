import FinancialReport from './FinancialReport.vue'
import CatalogReport from './CatalogReport.vue'
import LogReport from './LogReport.vue'
import EmployeeReport from './EmployeeReport.vue'
import InventoryReport from './InventoryReport.vue'
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
  autoPagination: boolean
}

export const reportExamples: ReportExample[] = [
  {
    icon: '💰',
    name: 'Финансовый',
    desc: 'P&L, Баланс, Cash Flow (ручное деление)',
    component: FinancialReport,
    pages: 5,
    tablesCount: 4,
    rowsCount: 50,
    format: 'a4',
    title: 'Финансовый отчёт',
    company: 'ООО "ФинТех Групп"',
    autoPagination: false,
  },
  {
    icon: '📦',
    name: 'Каталог',
    desc: '80 товаров с автопагинацией',
    component: CatalogReport,
    pages: 0,
    tablesCount: 1,
    rowsCount: 80,
    format: 'a4',
    title: 'Каталог товаров',
    company: 'ООО "ТехноМаркет"',
    autoPagination: true,
  },
  {
    icon: '📊',
    name: 'Логи',
    desc: '200 записей системных логов',
    component: LogReport,
    pages: 0,
    tablesCount: 1,
    rowsCount: 200,
    format: 'a4',
    title: 'Системные логи',
    company: 'IT Отдел',
    autoPagination: true,
  },
  {
    icon: '👥',
    name: 'Сотрудники',
    desc: '100 сотрудников с контактами',
    component: EmployeeReport,
    pages: 0,
    tablesCount: 1,
    rowsCount: 100,
    format: 'a4',
    title: 'Список сотрудников',
    company: 'ООО "Компания"',
    autoPagination: true,
  },
  {
    icon: '🏭',
    name: 'Склад',
    desc: '150 позиций инвентаризации',
    component: InventoryReport,
    pages: 0,
    tablesCount: 1,
    rowsCount: 150,
    format: 'a4',
    title: 'Инвентаризация',
    company: 'Складской отдел',
    autoPagination: true,
  },
]
