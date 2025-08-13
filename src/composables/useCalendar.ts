import { ref, computed, watch } from 'vue'

export type CalendarEvent = {
  id: string
  title: string
  date: string // YYYY-MM-DD (local)
  startTime?: string // HH:mm
  endTime?: string // HH:mm
  allDay?: boolean
}

export type CalendarDay = {
  date: string
  isCurrentMonth?: boolean
  isToday?: boolean
  events?: CalendarEvent[]
}

export type CalendarMonth = {
  name: string
  days: CalendarDay[]
}

export type EventFetcher = (rangeStart: Date, rangeEnd: Date) => Promise<Map<string, CalendarEvent[]>>

export function useCalendar(fetchEvents?: EventFetcher) {
  // State: first visible month (left calendar)
  const today = new Date()
  const firstVisibleMonth = ref(startOfMonth(today))

  // Events indexed by local date (YYYY-MM-DD)
  const eventsByDate = ref<Map<string, CalendarEvent[]>>(new Map())

  // Build two months side-by-side from the current pivot
  const months = computed<CalendarMonth[]>(() => {
    const left = buildMonth(firstVisibleMonth.value, eventsByDate.value, today)
    const right = buildMonth(addMonths(firstVisibleMonth.value, 1), eventsByDate.value, today)
    return [left, right]
  })

  function prev() {
    firstVisibleMonth.value = addMonths(firstVisibleMonth.value, -1)
  }

  function next() {
    firstVisibleMonth.value = addMonths(firstVisibleMonth.value, 1)
  }

  function goToToday() {
    const now = new Date()
    firstVisibleMonth.value = startOfMonth(now)
  }

  const defaultFetcher: EventFetcher = async () => new Map()
  const loader = fetchEvents ?? defaultFetcher

  // Load events whenever the visible window changes (covers both months)
  watch(
    firstVisibleMonth,
    async (d) => {
      const rangeStart = startOfWeekMonday(startOfMonth(d))
      const rangeEnd = endOfWeekSunday(endOfMonth(addMonths(d, 1)))
      eventsByDate.value = await loader(rangeStart, rangeEnd)
    },
    { immediate: true }
  )

  return {
    months,
    prev,
    next,
  goToToday,
    firstVisibleMonth,
  }
}

// ---- Calendar builders ----
function buildMonth(monthDate: Date, events: Map<string, CalendarEvent[]>, today: Date): CalendarMonth {
  const year = monthDate.getFullYear()
  const monthIndex = monthDate.getMonth()
  const start = startOfWeekMonday(new Date(year, monthIndex, 1))
  let end = endOfWeekSunday(new Date(year, monthIndex + 1, 0))

  const days: CalendarDay[] = []
  for (let d = new Date(start); d <= end; d = addDays(d, 1)) {
    const iso = formatDateLocal(d)
    const isCurrentMonth = d.getMonth() === monthIndex
    const isToday = isSameDateLocal(d, today)
    days.push({
      date: iso,
      isCurrentMonth,
      isToday,
      events: events.get(iso),
    })
  }

  // Ensure a full 6-week grid (42 cells) for consistent layout
  if (days.length < 42) {
    const missing = 42 - days.length
    for (let i = 1; i <= missing; i++) {
      const d = addDays(end, i)
      const iso = formatDateLocal(d)
      days.push({
        date: iso,
        isCurrentMonth: false,
        isToday: isSameDateLocal(d, today),
        events: events.get(iso),
      })
    }
    end = addDays(end, missing)
  }

  const name = `${monthDate.toLocaleString(undefined, { month: 'long' })} ${year}`
  return { name, days }
}

// ---- Date utilities (local timezone) ----
function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}

function addMonths(d: Date, delta: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1)
}

function addDays(d: Date, delta: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + delta)
}

// Week starts on Monday
function startOfWeekMonday(d: Date): Date {
  const day = d.getDay() // 0 (Sun) - 6 (Sat)
  const mondayIndex = (day + 6) % 7 // 0 for Monday ... 6 for Sunday
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - mondayIndex)
}

function endOfWeekSunday(d: Date): Date {
  const day = d.getDay() // 0 (Sun) - 6 (Sat)
  const mondayIndex = (day + 6) % 7
  const daysToSunday = 6 - mondayIndex
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + daysToSunday)
}

function formatDateLocal(d: Date): string {
  const y = d.getFullYear()
  const m = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d.getDate().toString().padStart(2, '0')
  return `${y}-${m}-${day}`
}

function isSameDateLocal(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
