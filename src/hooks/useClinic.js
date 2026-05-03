import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useClinic(slug = 'demo-clinic') {
  const [clinic, setClinic] = useState(null)
  const [loading, setLoading] = useState(true)

  async function fetchClinic() {
    setLoading(true)
    const { data, error } = await supabase
      .from('clinics')
      .select('*, services(*)')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching clinic:', error)
    } else {
      setClinic(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchClinic()
  }, [slug])

  return { clinic, loading, refetch: fetchClinic }
}
