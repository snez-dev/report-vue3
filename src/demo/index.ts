import FinancialReport from './FinancialReport.vue'
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
]
