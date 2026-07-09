import { useState, useEffect } from 'react'
// import { supabase } from '../lib/supabase'
import {
  MOCK_TODAY_APPOINTMENTS,
  MOCK_UPCOMING_APPOINTMENTS,
  MOCK_WEEK_COUNT,
  MOCK_ANALYTICS_APPOINTMENTS,
} from '../data/mockData'

export function useAppointments() {
  const [todayAppts, setTodayAppts] = useState([])
  const [upcomingAppts, setUpcomingAppts] = useState([])
  const [weekCount, setWeekCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // --- Supabase (restore for production) ---
  // async function fetchAppointments() {
  //   setLoading(true)
  //   const today = new Date().toISOString().split('T')[0]
  //   const { data: todayData } = await supabase
  //     .from('appointments')
  //     .select('*, patients(name, phone)')
  //     .eq('date', today)
  //     .order('time', { ascending: true })
  //   ...
  // }

  async function fetchAppointments() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 120))
    setTodayAppts(MOCK_TODAY_APPOINTMENTS)
    setUpcomingAppts(MOCK_UPCOMING_APPOINTMENTS)
    setWeekCount(MOCK_WEEK_COUNT)
    setLoading(false)
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  return { todayAppts, upcomingAppts, weekCount, loading, refetch: fetchAppointments }
}

export function useAnalyticsAppointments() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  // --- Supabase (restore for production) ---
  // async function fetchData() {
  //   setLoading(true)
  //   const thirtyDaysAgo = new Date()
  //   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  //   const { data: appts, error } = await supabase
  //     .from('appointments')
  //     .select('date, treatment, booked_via, status')
  //     .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
  //     .order('date', { ascending: true })
  //   ...
  // }

  async function fetchData() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 120))
    setData(MOCK_ANALYTICS_APPOINTMENTS)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, refetch: fetchData }
}
