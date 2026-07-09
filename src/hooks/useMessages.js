import { useState, useEffect } from 'react'
// import { supabase } from '../lib/supabase'
import { MOCK_MESSAGES, MOCK_CONVERSATION_TOTAL } from '../data/mockData'

export function useMessages(limit = 50) {
  const [messages, setMessages] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // --- Supabase (restore for production) ---
  // async function fetchMessages() {
  //   setLoading(true)
  //   const { data, error } = await supabase
  //     .from('messages')
  //     .select('*, patients(name, phone)')
  //     .order('created_at', { ascending: false })
  //     .limit(limit)
  //   ...
  // }

  async function fetchMessages() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 120))
    setMessages(MOCK_MESSAGES.slice(0, limit))
    setTotalCount(MOCK_CONVERSATION_TOTAL)
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [limit])

  return { messages, totalCount, loading, refetch: fetchMessages }
}
