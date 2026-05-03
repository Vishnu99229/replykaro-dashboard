import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useAppointments() {
  const [todayAppts, setTodayAppts] = useState([])
  const [upcomingAppts, setUpcomingAppts] = useState([])
  const [weekCount, setWeekCount] = useState(0)
  const [loading, setLoading] = useState(true)

  async function fetchAppointments() {
    setLoading(true)
    const today = new Date().toISOString().split('T')[0]

    // Today's appointments
    const { data: todayData } = await supabase
      .from('appointments')
      .select('*, patients(name, phone)')
      .eq('date', today)
      .order('time', { ascending: true })

    setTodayAppts(todayData || [])

    // Upcoming appointments (future, including today)
    const { data: upcomingData } = await supabase
      .from('appointments')
      .select('*, patients(name, phone)')
      .gte('date', today)
      .order('date', { ascending: true })
      .order('time', { ascending: true })
      .limit(20)

    setUpcomingAppts(upcomingData || [])

    // This week count
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const { data: weekData } = await supabase
      .from('appointments')
      .select('id')
      .gte('date', weekAgo.toISOString().split('T')[0])

    setWeekCount(weekData?.length || 0)
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

  async function fetchData() {
    setLoading(true)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data: appts, error } = await supabase
      .from('appointments')
      .select('date, treatment, booked_via, status')
      .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
      .order('date', { ascending: true })

    if (error) {
      console.error('Error fetching analytics:', error)
    } else {
      setData(appts || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, refetch: fetchData }
}
