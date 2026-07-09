const reviewers = [
  { initials: 'AK', name: 'Aarav K.', time: '2 weeks ago', text: 'Absolutely stunning design kit! Every component is pixel-perfect.' },
  { initials: 'RS', name: 'Riya S.', time: '1 month ago', text: 'Best purchase I have made for my design toolkit. Outstanding quality.' },
  { initials: 'MP', name: 'Mihir P.', time: '3 weeks ago', text: 'Great value for money. Well-thought-out and easy to customize.' },
  { initials: 'DJ', name: 'Divya J.', time: '5 days ago', text: 'Clean, modern, and incredibly detailed. Exceeded my expectations.' },
  { initials: 'AKh', name: 'Akash Kh.', time: '2 months ago', text: 'The file organization is superb. Saved me hours of work.' },
  { initials: 'PS', name: 'Priya S.', time: '1 week ago', text: 'Perfect for my client project. They loved the final result!' },
  { initials: 'RM', name: 'Rohit M.', time: '3 months ago', text: 'High quality and well documented. Highly recommend.' },
  { initials: 'SN', name: 'Sneha N.', time: '2 weeks ago', text: 'Beautiful design system. Everything just works out of the box.' },
  { initials: 'VK', name: 'Varun K.', time: '6 days ago', text: 'Incredible attention to detail. Worth every rupee.' },
  { initials: 'AP', name: 'Anika P.', time: '1 month ago', text: 'The best UI kit I have ever purchased. Five stars!' },
]

function pickReviewers(id, count = 3) {
  const start = ((id - 1) * 3) % reviewers.length
  return Array.from({ length: count }, (_, i) => reviewers[(start + i) % reviewers.length])
}

const productPalettes = [
  { bg: '#0066cc', accent: '#4d94ff' },
  { bg: '#1d1d1f', accent: '#6e6e73' },
  { bg: '#5856d6', accent: '#8e8aff' },
  { bg: '#007aff', accent: '#4da6ff' },
  { bg: '#34c759', accent: '#6ddf8a' },
  { bg: '#ff9500', accent: '#ffb84d' },
  { bg: '#ff3b30', accent: '#ff6b63' },
  { bg: '#af52de', accent: '#c977f0' },
]

function generateProductImage(id) {
  const p = productPalettes[(id - 1) % productPalettes.length]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${p.bg}"/><stop offset="100%" style="stop-color:${p.accent}"/></linearGradient></defs>
    <rect width="600" height="400" fill="url(#g)"/>
    <circle cx="480" cy="80" r="140" fill="rgba(255,255,255,0.06)"/>
    <circle cx="120" cy="340" r="100" fill="rgba(255,255,255,0.04)"/>
    <text x="300" y="200" font-family="Inter,Helvetica,sans-serif" font-size="120" font-weight="600" fill="rgba(255,255,255,0.12)" text-anchor="middle">${'KINTOX'.charAt((id - 1) % 6)}</text>
  </svg>`
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

const products = [
  {
    id: 1,
    title: 'YouTube Thumbnail Design',
    category: 'YouTube Thumbnails',
    rating: 4.9,
    reviews: 203,
    badge: 'Trending Now',
    image: '/uploads/t1.jpeg',
    screenshots: ['/uploads/t1.jpeg', '/uploads/t2.jpeg', '/uploads/t3.jpeg', '/uploads/t4.jpeg'],
    desc: 'High-CTR custom YouTube thumbnail designs optimized for maximum audience retention.',
    software: 'Adobe Photoshop, Illustrator',
    longDesc: 'Professional YouTube thumbnail designs engineered for high click-through rates. Each thumbnail is crafted with data-driven color psychology, bold typography, and eye-catching compositions.',
    packages: [
      {
        tier: 'Basic',
        price: 499,
        features: ['5 Custom Thumbnails', '1920x1080 HD Resolution', 'Bold Typography', '2 Revisions', 'Delivery in 48 Hours', 'PNG + JPG Format'],
        recommend: 'New YouTubers',
      },
      {
        tier: 'Professional',
        price: 999,
        popular: true,
        features: ['15 Custom Thumbnails', 'HD + 4K Resolution', 'Bold Typography & Effects', 'Color Grading', 'Unlimited Revisions', 'Source File (PSD)', 'Priority Support'],
        recommend: 'Growing Creators',
      },
      {
        tier: 'Ultra',
        price: 1499,
        features: ['30 Custom Thumbnails', 'HD + 4K Resolution', 'Advanced Effects & Graphics', 'Color Grading + Retouching', 'Unlimited Revisions', 'Source Files (PSD + AI)', '24/7 Priority Support', 'After-Delivery Support'],
        recommend: 'Professional YouTubers',
      },
    ],
  },
  {
    id: 2,
    title: 'Poster Design',
    category: 'Posters',
    rating: 4.8,
    reviews: 156,
    image: null,
    screenshots: [],
    desc: 'Premium poster designs for events, promotions, and brand campaigns.',
    software: 'Adobe Photoshop, Illustrator, InDesign',
    longDesc: 'Eye-catching poster designs that demand attention. Perfect for events, product launches, promotional campaigns, and brand awareness. Print-ready with full source files.',
    packages: [
      {
        tier: 'Basic',
        price: 699,
        features: ['1 Poster Design', 'Custom Typography & Layout', '24x36 Inch Print Ready', '300 DPI | CMYK', '2 Revisions', 'Delivery in 48 Hours'],
        recommend: 'Small Businesses',
      },
      {
        tier: 'Professional',
        price: 1299,
        popular: true,
        features: ['3 Poster Designs', 'Custom Illustrations & Graphics', '24x36 Inch Print Ready', '300 DPI | CMYK + RGB', 'Unlimited Revisions', 'Source Files (PSD + AI)', 'Multi-Format Export'],
        recommend: 'Growing Brands',
      },
      {
        tier: 'Ultra',
        price: 2499,
        features: ['5 Poster Designs', 'Full Campaign Creative Suite', 'Custom 3D Elements', 'Unlimited Revisions', 'Source Files (PSD + AI + INDD)', 'Multi-Platform Adaptation', '7-Day After-Delivery Support'],
        recommend: 'Marketing Agencies',
      },
    ],
  },
  {
    id: 3,
    title: 'Business Card Design',
    category: 'Business Cards',
    rating: 4.7,
    reviews: 312,
    image: null,
    screenshots: [],
    desc: 'Professional business card designs that leave a lasting impression.',
    software: 'Adobe Illustrator, Photoshop',
    longDesc: 'Make a lasting impression with premium business card designs. Each design is tailored to your brand with clean layouts, modern typography, and print-ready specifications.',
    packages: [
      {
        tier: 'Basic',
        price: 299,
        features: ['Single Side Design', 'Standard 3.5x2 inch', '300 DPI Print Ready', 'CMYK Color Mode', '2 Revisions', 'PDF + JPG Format'],
        recommend: 'Freelancers',
      },
      {
        tier: 'Professional',
        price: 599,
        popular: true,
        features: ['Front & Back Design', 'Standard 3.5x2 inch', '300 DPI Print Ready', 'CMYK + Spot UV Setup', 'Unlimited Revisions', 'Source File (AI + PSD)', 'Bleed Marks Included'],
        recommend: 'Small Teams',
      },
      {
        tier: 'Ultra',
        price: 999,
        features: ['Front & Back + Foil Setup', 'Custom Shape Available', '300 DPI Print Ready', 'CMYK + Spot UV + Foil', 'Unlimited Revisions', 'Source Files (AI + PSD + PDF)', 'Die-Line Template Included', 'Priority Support'],
        recommend: 'Premium Brands',
      },
    ],
  },
  {
    id: 4,
    title: 'Wedding Card Design',
    category: 'Wedding Cards',
    rating: 4.9,
    reviews: 89,
    stock: 'Limited',
    image: null,
    screenshots: [],
    desc: 'Elegant wedding invitation card designs with traditional and modern aesthetics.',
    software: 'Adobe Illustrator, Photoshop, InDesign',
    longDesc: 'Elegant wedding invitation cards designed to capture the essence of your special day. Choose from traditional Indian themes to modern minimalist styles, all print-ready.',
    packages: [
      {
        tier: 'Basic',
        price: 999,
        features: ['1 Wedding Card Design', 'Front & Inside Layout', '5x7 Inch Standard Size', '300 DPI | CMYK', '3 Revisions', 'PDF + JPG Format'],
        recommend: 'Simple Weddings',
      },
      {
        tier: 'Professional',
        price: 1999,
        popular: true,
        features: ['2 Wedding Card Designs', 'Front & Inside + Envelope', '5x7 + 4x6 Inch Sizes', '300 DPI | CMYK + Gold Foil', 'Unlimited Revisions', 'Source Files (AI + PSD)', 'Envelope Template Included'],
        recommend: 'Traditional Weddings',
      },
      {
        tier: 'Ultra',
        price: 3499,
        features: ['3 Wedding Card Designs', 'Full Wedding Suite (Card + Envelope + Tags)', 'Custom Size & Shape', '300 DPI | CMYK + Gold/Silver Foil', 'Unlimited Revisions', 'Source Files (AI + PSD + INDD)', 'Digital Proof for Approval', 'Priority Support'],
        recommend: 'Destination & Luxury Weddings',
      },
    ],
  },
]

export const allProducts = products.map(p => ({
  ...p,
  image: p.image || generateProductImage(p.id),
  screenshots: p.screenshots.length ? p.screenshots : [generateProductImage(p.id + 100), generateProductImage(p.id + 200), generateProductImage(p.id + 300)],
}))

export const categories = ['All', 'YouTube Thumbnails', 'Posters', 'Business Cards', 'Wedding Cards']

export function getProductById(id) {
  const found = products.find((prod) => prod.id === Number(id) || prod.id === id)
  if (!found) return null
  return { ...found, image: found.image || generateProductImage(found.id), screenshots: found.screenshots.length ? found.screenshots : [generateProductImage(found.id + 100), generateProductImage(found.id + 200), generateProductImage(found.id + 300)] }
}

export function getRelatedProducts(product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit)
}

export function formatPrice(price) {
  return `₹${price}`
}

export function getProductReviewers(productId) {
  return pickReviewers(productId, 3)
}

const ratingDistributions = {
  1: { 5: 72, 4: 18, 3: 7, 2: 2, 1: 1 },
  2: { 5: 68, 4: 20, 3: 8, 2: 3, 1: 1 },
  3: { 5: 75, 4: 16, 3: 6, 2: 2, 1: 1 },
  4: { 5: 80, 4: 14, 3: 4, 2: 1, 1: 1 },
}

export function getRatingDistribution(productId) {
  return ratingDistributions[productId] || ratingDistributions[1]
}