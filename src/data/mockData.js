// Hardcoded walkthrough data for Lumina Dental & Aesthetics (product video)
// Restore Supabase hooks to switch back to live data.

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

function offsetDate(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

function offsetDateTime(days, hours = 10, minutes = 0) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  d.setHours(hours, minutes, 0, 0)
  return d.toISOString()
}

export const MOCK_CLINIC = {
  id: 'lumina-clinic',
  slug: 'lumina-dental',
  name: 'Lumina Dental & Aesthetics',
  doctor_name: 'Dr. Priya Nair',
  address: '2nd Floor, 12th Main Road, Indiranagar, Bangalore - 560038',
  hours: 'Mon-Sat 9:30 AM - 7:00 PM',
  phone: '+91 98450 12345',
  twilio_number: '+91 98450 12345',
  payment_methods: 'Cash, UPI, all debit/credit cards. 0% EMI on treatments above ₹10,000',
  parking: 'Basement parking available for patients',
  additional_info: 'First X-ray complimentary. Children age 3+. Wheelchair accessible.',
  services: [
    { id: 's1', name: 'Teeth Cleaning', price_range: '1,000 - 1,500', duration_minutes: 45 },
    { id: 's2', name: 'Root Canal', price_range: '8,000 - 12,000', duration_minutes: 60 },
    { id: 's3', name: 'Teeth Whitening', price_range: '5,000 - 8,000', duration_minutes: 60 },
    { id: 's4', name: 'Cavity Filling', price_range: '1,500 - 3,000', duration_minutes: 30 },
    { id: 's5', name: 'Tooth Extraction', price_range: '1,000 - 2,500', duration_minutes: 45 },
    { id: 's6', name: 'Braces Consultation', price_range: '500', duration_minutes: 30 },
    { id: 's7', name: 'Dental Implant Consultation', price_range: '500', duration_minutes: 30 },
  ],
}

export const MOCK_PATIENT_TOTAL = 38

export const MOCK_PATIENTS = [
  { id: 'p1', name: 'Ananya Iyer', phone: '+91 98765 43210', channel: 'whatsapp', first_contact: offsetDateTime(-42, 11, 20), created_at: offsetDateTime(-42, 11, 20), appointmentCount: 2, lastAppointment: offsetDate(-12) },
  { id: 'p2', name: 'Rohan Malhotra', phone: '+91 98123 45678', channel: 'whatsapp', first_contact: offsetDateTime(-38, 9, 45), created_at: offsetDateTime(-38, 9, 45), appointmentCount: 1, lastAppointment: offsetDate(-20) },
  { id: 'p3', name: 'Kavya Reddy', phone: '+91 97654 32109', channel: 'whatsapp', first_contact: offsetDateTime(-35, 14, 10), created_at: offsetDateTime(-35, 14, 10), appointmentCount: 2, lastAppointment: todayStr() },
  { id: 'p4', name: 'Arjun Menon', phone: '+91 98901 23456', channel: 'voice', first_contact: offsetDateTime(-33, 16, 30), created_at: offsetDateTime(-33, 16, 30), appointmentCount: 1, lastAppointment: todayStr() },
  { id: 'p5', name: 'Sneha Kulkarni', phone: '+91 98234 56789', channel: 'whatsapp', first_contact: offsetDateTime(-28, 10, 15), created_at: offsetDateTime(-28, 10, 15), appointmentCount: 3, lastAppointment: offsetDate(1) },
  { id: 'p6', name: 'Vikram Shetty', phone: '+91 99012 34567', channel: 'voice', first_contact: offsetDateTime(-25, 13, 0), created_at: offsetDateTime(-25, 13, 0), appointmentCount: 1, lastAppointment: offsetDate(2) },
  { id: 'p7', name: 'Divya Krishnan', phone: '+91 98456 78901', channel: 'whatsapp', first_contact: offsetDateTime(-22, 11, 50), created_at: offsetDateTime(-22, 11, 50), appointmentCount: 2, lastAppointment: offsetDate(3) },
  { id: 'p8', name: 'Aditya Rao', phone: '+91 97890 12345', channel: 'whatsapp', first_contact: offsetDateTime(-18, 15, 25), created_at: offsetDateTime(-18, 15, 25), appointmentCount: 1, lastAppointment: offsetDate(4) },
  { id: 'p9', name: 'Meera Pillai', phone: '+91 98345 67890', channel: 'voice', first_contact: offsetDateTime(-14, 9, 30), created_at: offsetDateTime(-14, 9, 30), appointmentCount: 2, lastAppointment: offsetDate(5) },
  { id: 'p10', name: 'Karthik Nambiar', phone: '+91 98678 90123', channel: 'whatsapp', first_contact: offsetDateTime(-10, 12, 40), created_at: offsetDateTime(-10, 12, 40), appointmentCount: 1, lastAppointment: offsetDate(6) },
  { id: 'p11', name: 'Ishita Sharma', phone: '+91 99123 45678', channel: 'voice', first_contact: offsetDateTime(-6, 17, 10), created_at: offsetDateTime(-6, 17, 10), appointmentCount: 1, lastAppointment: offsetDate(-8) },
  { id: 'p12', name: 'Nikhil Verma', phone: '+91 98567 89012', channel: 'whatsapp', first_contact: offsetDateTime(-3, 10, 5), created_at: offsetDateTime(-3, 10, 5), appointmentCount: 2, lastAppointment: offsetDate(-5) },
]

const patient = (id) => {
  const p = MOCK_PATIENTS.find((x) => x.id === id)
  return { name: p.name, phone: p.phone }
}

export const MOCK_TODAY_APPOINTMENTS = [
  {
    id: 'a-today-1',
    date: todayStr(),
    time: '11:00',
    treatment: 'Teeth Whitening',
    status: 'booked',
    booked_via: 'whatsapp',
    duration_minutes: 60,
    patients: patient('p3'),
  },
  {
    id: 'a-today-2',
    date: todayStr(),
    time: '14:30',
    treatment: 'Root Canal',
    status: 'booked',
    booked_via: 'voice',
    duration_minutes: 60,
    patients: patient('p4'),
  },
]

const MOCK_FUTURE_APPOINTMENTS = [
  { id: 'a-f1', date: offsetDate(1), time: '10:00', treatment: 'Braces Consultation', status: 'booked', booked_via: 'whatsapp', patients: patient('p5') },
  { id: 'a-f2', date: offsetDate(2), time: '15:00', treatment: 'Teeth Cleaning', status: 'booked', booked_via: 'voice', patients: patient('p6') },
  { id: 'a-f3', date: offsetDate(3), time: '11:30', treatment: 'Cavity Filling', status: 'booked', booked_via: 'whatsapp', patients: patient('p7') },
  { id: 'a-f4', date: offsetDate(4), time: '16:00', treatment: 'Dental Implant Consultation', status: 'booked', booked_via: 'whatsapp', patients: patient('p8') },
  { id: 'a-f5', date: offsetDate(5), time: '14:30', treatment: 'Teeth Whitening', status: 'booked', booked_via: 'voice', patients: patient('p9') },
  { id: 'a-f6', date: offsetDate(6), time: '10:30', treatment: 'Root Canal', status: 'booked', booked_via: 'whatsapp', patients: patient('p10') },
]

export const MOCK_UPCOMING_APPOINTMENTS = [
  ...MOCK_TODAY_APPOINTMENTS,
  ...MOCK_FUTURE_APPOINTMENTS,
]

export const MOCK_WEEK_COUNT = 8

export const MOCK_CONVERSATION_TOTAL = 84

export const MOCK_MESSAGES = [
  {
    id: 'm1',
    role: 'assistant',
    content: 'Thank you, appointment confirmed for Saturday at 10:00 AM for Braces Consultation. See you then!',
    created_at: offsetDateTime(-0, 9, 12),
    patients: patient('p5'),
  },
  {
    id: 'm2',
    role: 'user',
    content: 'What is the cost for teeth whitening?',
    created_at: offsetDateTime(-0, 8, 45),
    patients: patient('p3'),
  },
  {
    id: 'm3',
    role: 'user',
    content: 'Hi, can I get an appointment tomorrow evening for root canal?',
    created_at: offsetDateTime(-1, 18, 30),
    patients: patient('p4'),
  },
  {
    id: 'm4',
    role: 'assistant',
    content: 'Teeth cleaning costs ₹1,000–1,500. I have a slot on Wednesday at 3 PM — shall I book it?',
    created_at: offsetDateTime(-1, 14, 20),
    patients: patient('p6'),
  },
  {
    id: 'm5',
    role: 'user',
    content: 'Yes please, book the cavity filling for Thursday morning.',
    created_at: offsetDateTime(-2, 11, 5),
    patients: patient('p7'),
  },
]

// 17 appointments in the last 30 days — drives analytics charts
// Channel: 12 whatsapp (71%), 5 voice (29%)
// Treatments: Cleaning 6, Root Canal 4, Whitening 3, Cavity 2, Braces 1, Implant 1
// Saturdays (-5, -12, -19, -26) weighted heavier for busiest-day chart
function buildAnalyticsAppointments() {
  const specs = [
    { day: -26, treatment: 'Teeth Cleaning', booked_via: 'whatsapp', status: 'completed' },
    { day: -26, treatment: 'Root Canal', booked_via: 'voice', status: 'completed' },
    { day: -24, treatment: 'Teeth Cleaning', booked_via: 'whatsapp', status: 'completed' },
    { day: -22, treatment: 'Cavity Filling', booked_via: 'whatsapp', status: 'completed' },
    { day: -19, treatment: 'Teeth Cleaning', booked_via: 'whatsapp', status: 'completed' },
    { day: -19, treatment: 'Braces Consultation', booked_via: 'whatsapp', status: 'completed' },
    { day: -16, treatment: 'Root Canal', booked_via: 'voice', status: 'completed' },
    { day: -12, treatment: 'Teeth Whitening', booked_via: 'whatsapp', status: 'completed' },
    { day: -12, treatment: 'Dental Implant Consultation', booked_via: 'whatsapp', status: 'completed' },
    { day: -10, treatment: 'Teeth Whitening', booked_via: 'whatsapp', status: 'completed' },
    { day: -9, treatment: 'Teeth Cleaning', booked_via: 'whatsapp', status: 'completed' },
    { day: -7, treatment: 'Root Canal', booked_via: 'whatsapp', status: 'completed' },
    { day: -5, treatment: 'Teeth Cleaning', booked_via: 'whatsapp', status: 'completed' },
    { day: -5, treatment: 'Teeth Whitening', booked_via: 'voice', status: 'completed' },
    { day: -5, treatment: 'Cavity Filling', booked_via: 'voice', status: 'cancelled' },
    { day: -2, treatment: 'Root Canal', booked_via: 'voice', status: 'completed' },
    { day: -1, treatment: 'Teeth Cleaning', booked_via: 'whatsapp', status: 'completed' },
  ]

  return specs.map((s, i) => ({
    id: `a-analytics-${i}`,
    date: offsetDate(s.day),
    treatment: s.treatment,
    booked_via: s.booked_via,
    status: s.status,
  }))
}

export const MOCK_ANALYTICS_APPOINTMENTS = buildAnalyticsAppointments()

export const MOCK_ANALYTICS_STATS = {
  monthTotal: 17,
  conversionRate: 43,
  avgPerDay: '1.2',
  busiestDay: 'Saturday',
}
