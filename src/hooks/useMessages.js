import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useMessages(limit = 50) {
  const [messages, setMessages] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)

  async function fetchMessages() {
    setLoading(true)
    const { data, error } = await supabase
      .from('messages')
      .select('*, patients(name, phone)')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching messages:', error)
    } else {
      setMessages(data || [])
    }

    // Get total unique conversation count (unique patient_ids)
    const { data: convData } = await supabase
      .from('messages')
      .select('patient_id')

    if (convData) {
      const uniquePatients = new Set(convData.map(m => m.patient_id))
      setTotalCount(uniquePatients.size)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [limit])

  return { messages, totalCount, loading, refetch: fetchMessages }
}
