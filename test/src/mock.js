export const contactInfo = {
  address: {
    clinic: "Sports Physiotherapy Center",
    street: "123 Medical Complex, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    country: "India"
  },
  phone: "+91 98765 43210",
  email: "dr.siddharth@example.com",
  emergency: "+91 98765 43211",
  hours: {
    weekday: '9:00 AM - 6:00 PM',
    saturday: '9:00 AM - 2:00 PM',
    sunday: 'Closed'
  }
};

export const services = [
  {
    id: 's1',
    title: 'Sports Injury Rehabilitation',
    duration: '4-12 weeks',
    price: '₹ 3,000 per session',
    description: 'Comprehensive rehabilitation programs focusing on safe return to sport.',
    features: ['Injury assessment and diagnosis','Customized rehabilitation protocol','Movement analysis and correction','Return-to-sport clearance']
  },
  {
    id: 's2',
    title: 'Manual Therapy',
    duration: '45-60 minutes',
    price: '₹ 2,500 per session',
    description: 'Hands-on treatment techniques including joint mobilization and soft tissue therapy.',
    features: ['Joint mobilization techniques','Soft tissue manipulation','Pain reduction strategies','Mobility improvement']
  },
  {
    id: 's3',
    title: 'Musculoskeletal Assessment',
    duration: '60-90 minutes',
    price: '₹ 4,000 per session',
    description: 'Detailed evaluation of movement patterns, muscle imbalances and biomechanical dysfunctions.',
    features: ['Comprehensive movement screen','Strength & flexibility testing','Personalised treatment plan']
  },
  {
    id: 's4',
    title: 'Performance Optimization',
    duration: '6-8 weeks program',
    price: '₹ 25,000 per program',
    description: 'Programs designed to enhance athletic performance through movement efficiency and injury prevention.',
    features: ['Performance baseline testing','Programmed progressive training','Return-to-play protocols']
  }
];

export const testimonials = [
  { id: 't1', name: 'Rahul Sharma', sport: 'Cricket', rating: 5, comment: "The ergonomic consultation and movement analysis significantly improved my performance.", achievement: 'IPL Player' },
  { id: 't2', name: 'Priya Singh', sport: 'Tennis', rating: 5, comment: "Dr. Siddharth's post-surgical rehabilitation helped me return to tennis after my shoulder surgery.", achievement: 'National Champion' },
  { id: 't3', name: 'Saina Nehwal', sport: 'Badminton', rating: 5, comment: "His understanding of athlete needs is exceptional.", achievement: 'Olympic Bronze Medalist' },
  { id: 't4', name: 'Lakshya Sen', sport: 'Badminton', rating: 5, comment: "Highly recommend his services.", achievement: 'World Championship Medalist' }
];
