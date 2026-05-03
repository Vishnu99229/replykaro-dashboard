import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function usePatients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchPatients() {
    setLoading(true)
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching patients:', error)
      setPatients([])
    } else {
      // Fetch appointment counts for each patient
      const patientIds = (data || []).map(p => p.id)
      let appointmentCounts = {}
      let lastAppointments = {}

      if (patientIds.length > 0) {
        const { data: appts } = await supabase
          .from('appointments')
          .select('patient_id, date')
          .in('patient_id', patientIds)
          .order('date', { ascending: false })

        if (appts) {
          for (const apt of appts) {
            appointmentCounts[apt.patient_id] = (appointmentCounts[apt.patient_id] || 0) + 1
            if (!lastAppointments[apt.patient_id]) {
              lastAppointments[apt.patient_id] = apt.date
            }
          }
        }
      }

      setPatients(
        (data || []).map(p => ({
          ...p,
          appointmentCount: appointmentCounts[p.id] || 0,
          lastAppointment: lastAppointments[p.id] || null,
        }))
      )
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  return { patients, loading, refetch: fetchPatients }
}
