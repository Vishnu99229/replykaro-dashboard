import { useState, useEffect } from 'react'
// import { supabase } from '../lib/supabase'
import { MOCK_CLINIC } from '../data/mockData'

export function useClinic(slug = 'lumina-dental') {
  const [clinic, setClinic] = useState(null)
  const [loading, setLoading] = useState(true)

  // --- Supabase (restore for production) ---
  // async function fetchClinic() {
  //   setLoading(true)
  //   const { data, error } = await supabase
  //     .from('clinics')
  //     .select('*, services(*)')
  //     .eq('slug', slug)
  //     .single()
  //   if (error) {
  //     console.error('Error fetching clinic:', error)
  //   } else {
  //     setClinic(data)
  //   }
  //   setLoading(false)
  // }

  async function fetchClinic() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 120))
    setClinic(MOCK_CLINIC)
    setLoading(false)
  }

  useEffect(() => {
    fetchClinic()
  }, [slug])

  return { clinic, loading, refetch: fetchClinic }
}
