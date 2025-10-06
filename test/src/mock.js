export const contactInfo = {
  address: {
    clinic: "Sports Physiotherapy Center",
    street: "123 Medical Complex, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    country: "India"
  },
  phone: "+919592948779",
  email: "dr.siddharth@example.com",
  emergency: "+919592948779",
  hours: {
    weekday: '6:00 PM - 9:00 PM',
    saturday: '3:00 PM - 9:00 PM',
    sunday: 'Closed'
  }
};

export const services = [
  {
    id: 's1',
    title: 'Sports Injury Rehabilitation',
    // duration: '4-12 weeks',
    // price: '₹ 3,000 per session',
    description: 'Comprehensive rehabilitation programs focusing on safe return to sport.',
    features: ['Injury assessment and diagnosis','Customized rehabilitation protocol','Movement analysis and correction','Return-to-sport clearance']
  },
  {
    id: 's2',
    title: 'Manual Therapy',
    // duration: '45-60 minutes',
    // price: '₹ 2,500 per session',
    description: 'Hands-on treatment techniques including joint mobilization and soft tissue therapy.',
    features: ['Joint mobilization techniques','Soft tissue manipulation','Pain reduction strategies','Mobility improvement']
  },
  {
    id: 's3',
    title: 'Musculoskeletal Assessment',
    // duration: '60-90 minutes',
    // price: '₹ 4,000 per session',
    description: 'Detailed evaluation of movement patterns, muscle imbalances and biomechanical dysfunctions.',
    features: ['Comprehensive movement screen','Strength & flexibility testing','Personalised treatment plan']
  },
  {
    id: 's4',
    title: 'Performance Optimization',
    // duration: '6-8 weeks program',
    // price: '₹ 25,000 per program',
    description: 'Programs designed to enhance athletic performance through movement efficiency and injury prevention.',
    features: ['Performance baseline testing','Programmed progressive training','Return-to-play protocols']
  }
];

export const testimonials = [
  { id: 't1', name: 'Saina Nehwal', sport: 'Badminton - Olympic Medalist/World Championship', rating: 5, comment: "Siddharth is an expert, i enjoy his therapy.", achievement: 'Badminton Player' },
  { id: 't2', name: 'Kanika Kanwal', sport: 'Badminton - National Champion', rating: 5, comment: "Physiotherapist are an integral part of players journey and i am blessed to be associated with best in the field, Thanks Dr Siddharth Sakalle Sir", achievement: 'National Champion' },
  { id: 't3', name: 'Ajith Singh Yadav', sport: 'Javeline - Para Olympic Medalist', rating: 5, comment: "Gratitude to support team and Siddharth Sakalle for his unvavering.", achievement: 'Para Olympic Medalist' },
  { id: 't4', name: 'Sumukh GS', sport: 'Badminton - State Level', rating: 5, comment: "I have been traning with Dr Siddharth Sakalle, Its made a huge difference in my fitness", achievement: 'World Championship Medalist' }
];
