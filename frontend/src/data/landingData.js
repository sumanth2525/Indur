import { MOCK_IMAGES } from './mockImages'
import { REVENUE_DIVISIONS, DISTRICT } from './nizamabadLocations'

const img = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=2`

const DISTRICT_IMAGES = [img(1571460), img(3584436), img(323705)]

/** Revenue divisions within Nizamabad district — used on landing & header */
export const SERVICE_DISTRICTS = REVENUE_DIVISIONS.map((div, index) => ({
  id: div.id,
  name: div.name,
  count: div.mandals.length * 48,
  mandals: div.mandals.length,
  image: DISTRICT_IMAGES[index] || img(1571460),
  localities: div.mandals.slice(0, 5).map((m) => m.name),
}))

export const ALL_LOCALITIES = SERVICE_DISTRICTS.flatMap((d) =>
  d.localities.map((loc) => ({ locality: loc, city: d.name })),
)

export const NAV_TABS = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'rent', label: 'Rent' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'projects', label: 'New Projects' },
]

export const CITIES = [
  { name: 'Mumbai', count: 12400, image: img(325185), localities: ['Andheri West', 'Bandra', 'Powai', 'Thane', 'Navi Mumbai'] },
  { name: 'Delhi NCR', count: 18200, image: img(372810), localities: ['Gurgaon', 'Noida', 'Dwarka', 'Saket', 'Greater Noida'] },
  { name: 'Bangalore', count: 15600, image: img(2675036), localities: ['Whitefield', 'Indiranagar', 'HSR Layout', 'Electronic City', 'Yelahanka'] },
  { name: 'Hyderabad', count: 9800, image: img(3584436), localities: ['Gachibowli', 'Kondapur', 'Madhapur', 'Nizamabad', 'Secunderabad'] },
  { name: 'Pune', count: 7600, image: img(2404843), localities: ['Hinjewadi', 'Baner', 'Kothrud', 'Wakad', 'Kharadi'] },
  { name: 'Chennai', count: 6400, image: img(2306281), localities: ['OMR', 'Adyar', 'Velachery', 'Anna Nagar', 'Tambaram'] },
  { name: 'Nizamabad', count: 420, image: img(1571460), localities: ['Kanteshwar', 'Armoor Road', 'Bodhan', 'Dichpally', 'Navipet'] },
  { name: 'Ahmedabad', count: 5100, image: img(323705), localities: ['Satellite', 'Bopal', 'SG Highway', 'Vastrapur', 'Maninagar'] },
]

export const TRUST_STATS = [
  { icon: 'home_work', value: '850+', label: 'Active listings' },
  { icon: 'verified', value: '27', label: 'Mandals covered' },
  { icon: 'landscape', value: '3', label: 'Revenue divisions' },
  { icon: 'location_city', value: '1', label: 'Nizamabad district' },
]

export const FEATURED_PROPERTIES = [
  {
    id: 'fp-1',
    title: '3 BHK Sea-Facing Apartment',
    city: 'Mumbai',
    locality: 'Andheri West',
    price: 28500000,
    rent: false,
    bhk: 3,
    sqft: 1450,
    rera: true,
    vastu: true,
    image: MOCK_IMAGES.bhk3[0],
  },
  {
    id: 'fp-2',
    title: '2 BHK Ready-to-Move Flat',
    city: 'Bangalore',
    locality: 'Whitefield',
    price: 11200000,
    rent: false,
    bhk: 2,
    sqft: 1180,
    rera: true,
    vastu: false,
    image: MOCK_IMAGES.bhk2[0],
  },
  {
    id: 'fp-3',
    title: '4 BHK Independent Villa',
    city: 'Hyderabad',
    locality: 'Gachibowli',
    price: 42000000,
    rent: false,
    bhk: 4,
    sqft: 3200,
    rera: true,
    vastu: true,
    image: MOCK_IMAGES.bhk3[2],
  },
  {
    id: 'fp-4',
    title: '2 BHK Furnished — For Rent',
    city: 'Pune',
    locality: 'Baner',
    price: 32000,
    rent: true,
    bhk: 2,
    sqft: 980,
    rera: false,
    vastu: true,
    image: MOCK_IMAGES.bhk2[1],
  },
  {
    id: 'fp-5',
    title: 'Residential Plot — 2400 sq.ft.',
    city: 'Nizamabad',
    locality: 'Dichpally',
    price: 4500000,
    rent: false,
    bhk: 0,
    sqft: 2400,
    rera: false,
    vastu: true,
    image: MOCK_IMAGES.land[0],
  },
  {
    id: 'fp-6',
    title: '3 BHK Premium Apartment',
    city: 'Delhi NCR',
    locality: 'Gurgaon',
    price: 18500000,
    rent: false,
    bhk: 3,
    sqft: 1680,
    rera: true,
    vastu: true,
    image: MOCK_IMAGES.bhk3[1],
  },
]

export const PROPERTY_TYPES = [
  { id: 'apartment', label: 'Apartments', icon: 'apartment', count: '84,000+' },
  { id: 'house', label: 'Independent Houses', icon: 'home', count: '22,000+' },
  { id: 'villa', label: 'Villas', icon: 'cottage', count: '8,400+' },
  { id: 'plot', label: 'Plots / Land', icon: 'landscape', count: '31,000+' },
  { id: 'commercial', label: 'Commercial', icon: 'store', count: '12,500+' },
  { id: 'pg', label: 'PG / Co-living', icon: 'bed', count: '6,200+' },
]

export const WHY_CHOOSE = [
  { icon: 'verified_user', title: 'Verified listings', desc: 'Every property is phone-verified and photo-checked before going live.' },
  { icon: 'savings', title: 'Zero brokerage option', desc: 'Connect directly with owners on select listings — no hidden agent fees.' },
  { icon: 'gavel', title: 'RERA compliance', desc: 'New projects display RERA registration numbers and builder credentials.' },
  { icon: 'description', title: 'Legal assistance', desc: 'Guided document checklists for sale deeds, encumbrance & title verification.' },
  { icon: 'account_balance', title: 'Home loan & EMI help', desc: 'Compare rates from partner banks and get pre-approved in minutes.' },
]

export const NEW_PROJECTS = [
  {
    name: 'Skyline Heights',
    builder: 'Prestige Group',
    city: 'Bangalore',
    possession: 'Dec 2027',
    priceFrom: 7800000,
    rera: 'PRM/KA/RERA/1251/446/PR/180621/004321',
    image: img(323780),
  },
  {
    name: 'Green Valley Residency',
    builder: 'Lodha Developers',
    city: 'Mumbai',
    possession: 'Mar 2028',
    priceFrom: 14200000,
    rera: 'P51800001234',
    image: img(1396122),
  },
  {
    name: 'Lakeview Enclave',
    builder: 'My Home Constructions',
    city: 'Hyderabad',
    possession: 'Jun 2026',
    priceFrom: 5900000,
    rera: 'P02400001256',
    image: img(1396132),
  },
]

export const TESTIMONIALS = [
  { quote: 'Found our first home in Whitefield without paying brokerage. The RERA badge gave us confidence.', name: 'Priya & Arjun M.', city: 'Bangalore', avatar: 'PM' },
  { quote: 'Sold my plot in Nizamabad within 3 weeks. Verified buyers only — no spam calls.', name: 'Ravi Kumar', city: 'Hyderabad', avatar: 'RK' },
  { quote: 'EMI calculator helped us decide our budget before visiting properties. Very transparent.', name: 'Sneha Desai', city: 'Mumbai', avatar: 'SD' },
]

export const FOOTER_CITIES = SERVICE_DISTRICTS.map((d) => d.name).concat([DISTRICT])

export const HERO_BG = img(1396122)
