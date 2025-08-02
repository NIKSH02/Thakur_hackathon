import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  StarHalf, 
  Heart, 
  Share2, 
  ShoppingCart,
  Phone,
  ChevronLeft,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  CreditCard,
  Check,
  X,
  ThumbsUp,
  ChevronUp
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  // Order form state
  const [orderData, setOrderData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    quantity: 1
  });

  // Static reviews data - no submission functionality
  const reviews = [
    {
      id: 1,
      user: 'Rajesh Kumar',
      rating: 5,
      comment: 'Excellent phone! Amazing camera quality and smooth performance.',
      date: '2024-01-15',
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      user: 'Priya Sharma',
      rating: 4,
      comment: 'Good value for money. Battery life could be better.',
      date: '2024-01-10',
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      user: 'Amit Singh',
      rating: 5,
      comment: 'Perfect phone for gaming. No lag at all!',
      date: '2024-01-05',
      verified: false,
      helpful: 15
    }
  ];

  const heroRef = useRef(null);
  const specsRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const specsInView = useInView(specsRef, { once: true, amount: 0.2 });

  // Static product data - no loading needed
  const product = {
    _id: id || '507f1f77bcf86cd799439011',
    name: "iPhone 15 Pro",
    brand: "Apple",
    model: "A3102",
    description: "The latest iPhone 15 Pro features a titanium design, A17 Pro chip, and advanced camera system. Experience the power of pro-level photography and lightning-fast performance in a device built to last.",
    price: 134900,
    originalPrice: 144900,
    discount: 7,
    mainImage: "/images/mob1.jpg",
    images: [
      "/images/mob1.jpg",
      "/images/mob2.jpg",
      "/images/mob3.jpg",
      "/images/mob5.jpg",
      "/images/mob6.jpg"
    ],
    specifications: {
      display: {
        size: "6.1 inches",
        resolution: "2556 x 1179",
        type: "Super Retina XDR OLED",
        refreshRate: "120Hz"
      },
      processor: {
        chipset: "Apple A17 Pro",
        cpu: "Hexa-core",
        gpu: "Apple GPU"
      },
      memory: {
        ram: "8GB",
        storage: "256GB",
        expandable: false
      },
      camera: {
        rear: {
          primary: "48MP",
          secondary: "12MP Ultra Wide",
          tertiary: "12MP Telephoto"
        },
        front: {
          primary: "12MP"
        },
        videoRecording: "4K at 60fps"
      },
      battery: {
        capacity: "3274mAh",
        type: "Li-Ion",
        fastCharging: "20W",
        wirelessCharging: true
      },
      build: {
        dimensions: "146.6 x 70.6 x 8.25 mm",
        weight: "187g",
        material: "Titanium frame, Glass back"
      },
      connectivity: {
        network: ["5G", "4G LTE"],
        wifi: "Wi-Fi 6E",
        bluetooth: "5.3",
        nfc: true,
        usb: "USB-C"
      },
      os: {
        name: "iOS",
        version: "17"
      },
      waterResistance: "IP68"
    },
    stock: 25,
    inStock: true,
    rating: {
      average: 4.7,
      count: 1250
    },
    isActive: true,
    isFeatured: true,
    category: "Mobile Phone",
    subCategory: "Smartphone",
    tags: ["5G", "Pro Camera", "Titanium", "iOS"]
  };

  const handleImageChange = (index) => {
    setSelectedImageIndex(index);
  };

  const nextImage = () => {
    if (product?.images?.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images?.length > 0) {
      setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to API
    alert('Order placed successfully! We will contact you soon.');
    setShowOrderForm(false);
    setOrderData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      quantity: 1
    });
  };

  // Remove review submission - only display reviews
  // const handleReviewSubmit = removed as users cannot submit reviews

  const renderStars = (rating, size = 20) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={size} className="fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={size} className="fill-yellow-400 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={size} className="text-gray-400" />);
    }

    return stars;
  };

  const renderSpecification = (spec, value, icon = null) => {
    if (!value) return null;
    
    return (
      <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          {icon && <span className="text-blue-400">{icon}</span>}
          <span className="text-gray-300 font-medium">{spec}</span>
        </div>
        <span className="text-white font-semibold">{value}</span>
      </div>
    );
  };

  const currentImage = product.images && product.images.length > 0 
    ? product.images[selectedImageIndex] 
    : product.mainImage || "/images/mob1.jpg";

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen">
      <Navbar />
      
      {/* Back Button */}
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Products</span>
          </button>
        </div>
      </div>

      {/* Product Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 50 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="px-4 pb-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative bg-gray-800/50 rounded-2xl overflow-hidden aspect-square">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-contain bg-gray-900"
                  style={{ minHeight: '400px' }}
                  onError={(e) => {
                    e.target.src = "/images/mob.jpg"; // Fallback image
                  }}
                />
                
                {/* Image Navigation */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-300"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-300"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Wishlist & Share */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isWishlisted ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageChange(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImageIndex === index
                          ? 'border-blue-400'
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-contain bg-gray-800"
                        onError={(e) => {
                          e.target.src = "/images/mob.jpg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Product Title & Rating */}
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
                <p className="text-xl text-gray-300 mb-4">{product.brand} - {product.model}</p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating?.average || 0)}
                  </div>
                  <span className="text-gray-300">
                    ({product.rating?.count || 0} reviews)
                  </span>
                  <button
                    onClick={() => setShowReviews(!showReviews)}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                  >
                    View Reviews
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-green-400">
                  ₹{product.price?.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                {product.inStock ? (
                  <>
                    <Check size={20} className="text-green-400" />
                    <span className="text-green-400 font-semibold">In Stock ({product.stock} available)</span>
                  </>
                ) : (
                  <>
                    <X size={20} className="text-red-400" />
                    <span className="text-red-400 font-semibold">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Key Features */}
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.specifications?.display?.size && (
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-sm">Display</span>
                      <span className="text-white font-medium">{product.specifications.display.size}</span>
                    </div>
                  )}
                  {product.specifications?.memory?.ram && (
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-sm">RAM</span>
                      <span className="text-white font-medium">{product.specifications.memory.ram}</span>
                    </div>
                  )}
                  {product.specifications?.memory?.storage && (
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-sm">Storage</span>
                      <span className="text-white font-medium">{product.specifications.memory.storage}</span>
                    </div>
                  )}
                  {product.specifications?.camera?.rear?.primary && (
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-sm">Camera</span>
                      <span className="text-white font-medium">{product.specifications.camera.rear.primary}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => setShowOrderForm(true)}
                  disabled={!product.inStock}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <ShoppingCart size={20} />
                    <span>{product.inStock ? 'Buy Now' : 'Out of Stock'}</span>
                  </div>
                </button>
                
                <div className="flex justify-center">
                  <button className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl transition-colors duration-300 w-full max-w-xs">
                    <Phone size={20} />
                    <span>Call Us</span>
                  </button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-center space-x-3">
                  <Truck size={24} className="text-blue-400" />
                  <div>
                    <p className="text-white font-medium">Free Delivery</p>
                    <p className="text-gray-400 text-sm">2-3 business days</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield size={24} className="text-green-400" />
                  <div>
                    <p className="text-white font-medium">1 Year Warranty</p>
                    <p className="text-gray-400 text-sm">Official warranty</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw size={24} className="text-yellow-400" />
                  <div>
                    <p className="text-white font-medium">7 Day Return</p>
                    <p className="text-gray-400 text-sm">Easy returns</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard size={24} className="text-purple-400" />
                  <div>
                    <p className="text-white font-medium">Secure Payment</p>
                    <p className="text-gray-400 text-sm">100% safe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Product Description */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="px-4 pb-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">About This Product</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Detailed Specifications */}
      <motion.section
        ref={specsRef}
        initial={{ opacity: 0, y: 50 }}
        animate={specsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="px-4 pb-12"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Detailed Specifications</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Display Specifications */}
            {product.specifications?.display && (
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Display</h3>
                <div className="space-y-1">
                  {renderSpecification('Size', product.specifications.display.size)}
                  {renderSpecification('Resolution', product.specifications.display.resolution)}
                  {renderSpecification('Type', product.specifications.display.type)}
                  {renderSpecification('Refresh Rate', product.specifications.display.refreshRate)}
                </div>
              </div>
            )}

            {/* Performance Specifications */}
            {product.specifications?.processor && (
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Performance</h3>
                <div className="space-y-1">
                  {renderSpecification('Chipset', product.specifications.processor.chipset)}
                  {renderSpecification('CPU', product.specifications.processor.cpu)}
                  {renderSpecification('GPU', product.specifications.processor.gpu)}
                </div>
              </div>
            )}

            {/* Memory Specifications */}
            {product.specifications?.memory && (
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Memory & Storage</h3>
                <div className="space-y-1">
                  {renderSpecification('RAM', product.specifications.memory.ram)}
                  {renderSpecification('Storage', product.specifications.memory.storage)}
                  {renderSpecification('Expandable', product.specifications.memory.expandable ? 'Yes' : 'No')}
                  {renderSpecification('Max Expandable', product.specifications.memory.maxExpandable)}
                </div>
              </div>
            )}

            {/* Camera Specifications */}
            {product.specifications?.camera && (
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Camera</h3>
                <div className="space-y-1">
                  {renderSpecification('Rear Primary', product.specifications.camera.rear?.primary)}
                  {renderSpecification('Rear Secondary', product.specifications.camera.rear?.secondary)}
                  {renderSpecification('Front Camera', product.specifications.camera.front?.primary)}
                  {renderSpecification('Video Recording', product.specifications.camera.videoRecording)}
                </div>
              </div>
            )}

            {/* Battery Specifications */}
            {product.specifications?.battery && (
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Battery</h3>
                <div className="space-y-1">
                  {renderSpecification('Capacity', product.specifications.battery.capacity)}
                  {renderSpecification('Type', product.specifications.battery.type)}
                  {renderSpecification('Fast Charging', product.specifications.battery.fastCharging)}
                  {renderSpecification('Wireless Charging', product.specifications.battery.wirelessCharging ? 'Yes' : 'No')}
                </div>
              </div>
            )}

            {/* Build Specifications */}
            {product.specifications?.build && (
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Build & Design</h3>
                <div className="space-y-1">
                  {renderSpecification('Dimensions', product.specifications.build.dimensions)}
                  {renderSpecification('Weight', product.specifications.build.weight)}
                  {renderSpecification('Material', product.specifications.build.material)}
                  {renderSpecification('Water Resistance', product.specifications.waterResistance)}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Reviews Section */}
      <AnimatePresence>
        {showReviews && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="px-4 pb-12"
          >
            <div className="max-w-7xl mx-auto">
              <div className="bg-gray-800/30 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-white">Customer Reviews</h2>
                  <button
                    onClick={() => setShowReviews(false)}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <ChevronUp size={24} />
                  </button>
                </div>

                {/* Review Summary */}
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      {product.rating?.average?.toFixed(1) || '0.0'}
                    </div>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      {renderStars(product.rating?.average || 0, 24)}
                    </div>
                    <p className="text-gray-400">Based on {product.rating?.count || 0} reviews</p>
                  </div>
                  
                  <div className="col-span-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center space-x-4 mb-2">
                        <span className="text-gray-300 w-8">{star}★</span>
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${Math.random() * 80 + 10}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-400 w-8 text-sm">{Math.floor(Math.random() * 50)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-700/30 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-white font-semibold">{review.user}</h4>
                            {review.verified && (
                              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 mb-2">
                            {renderStars(review.rating, 16)}
                          </div>
                          <p className="text-gray-400 text-sm">{review.date}</p>
                        </div>
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors duration-300">
                          <ThumbsUp size={16} />
                          <span className="text-sm">{review.helpful}</span>
                        </button>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Order Form Modal */}
      <AnimatePresence>
        {showOrderForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowOrderForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Complete Your Order</h2>
                <button
                  onClick={() => setShowOrderForm(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleOrderSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderData.fullName}
                      onChange={(e) => setOrderData({...orderData, fullName: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={orderData.email}
                      onChange={(e) => setOrderData({...orderData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={orderData.phone}
                      onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Quantity
                    </label>
                    <select
                      value={orderData.quantity}
                      onChange={(e) => setOrderData({...orderData, quantity: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Address *
                  </label>
                  <textarea
                    required
                    value={orderData.address}
                    onChange={(e) => setOrderData({...orderData, address: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your complete address"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderData.city}
                      onChange={(e) => setOrderData({...orderData, city: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderData.state}
                      onChange={(e) => setOrderData({...orderData, state: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="State"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderData.pincode}
                      onChange={(e) => setOrderData({...orderData, pincode: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="PIN Code"
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={product.mainImage || "/images/mob1.jpg"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{product.name}</h4>
                      <p className="text-gray-400">{product.brand} - {product.model}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">Qty: {orderData.quantity}</p>
                      <p className="text-green-400 font-bold">
                        ₹{(product.price * orderData.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span className="text-white">Total:</span>
                      <span className="text-green-400">
                        ₹{(product.price * orderData.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300"
                >
                  Confirm Order
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
