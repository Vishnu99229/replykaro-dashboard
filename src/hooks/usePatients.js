import { useState, useEffect } from 'react'
// import { supabase } from '../lib/supabase'
import { MOCK_PATIENTS, MOCK_PATIENT_TOTAL } from '../data/mockData'

export function usePatients() {
  const [patients, setPatients] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // --- Supabase (restore for production) ---
  // async function fetchPatients() {
  //   setLoading(true)
  //   const { data, error } = await supabase
  //     .from('patients')
  //     .select('*')
  //     .order('created_at', { ascending: false })
  //   ...
  // }

  async function fetchPatients() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 120))
    setPatients(MOCK_PATIENTS)
    setTotalCount(MOCK_PATIENT_TOTAL)
    setLoading(false)
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  return { patients, totalCount, loading, refetch: fetchPatients }
}
