import Image from "next/image"
import { ShoppingBag, Star } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Gold Series Pomade",
    description: "Classic medium hold with a natural shine. Ideal for slick-backs and vintage styles.",
    price: 12.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Matte Clay",
    description: "Strong hold, zero shine. Perfect for textured crops, quiffs, and modern cuts.",
    price: 14.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Sea Salt Texture Spray",
    description: "Add effortless natural texture and beachy movement to any hair length.",
    price: 9.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1526045478516-99145907023c?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Men's Hydrating Shampoo",
    description: "Deep-cleansing formula that nourishes the scalp and strengthens every strand.",
    price: 11.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Repair Conditioner",
    description: "Intensive repair conditioner that smooths, softens, and rebuilds damaged hair.",
    price: 10.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1631390072765-1b81bb7c54eb?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Premium Beard Oil",
    description: "A luxury blend of argan and jojoba oils to condition, soften, and tame your beard.",
    price: 16.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Fiber Wax",
    description: "Pliable hold with a natural finish. Restyle throughout the day with ease.",
    price: 13.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    name: "Maximum Hold Gel",
    description: "Firm all-day hold with a high-gloss finish. Locks every style in place.",
    price: 8.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop",
  },
]

export function ProductsSection() {
  return (
    <section id="products" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <p className="text-yellow-500 font-semibold text-xs uppercase tracking-widest mb-3">
            Shop
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Premium Men&apos;s
            <span className="text-yellow-500"> Products</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The same professional products our barbers trust — now available to take home. Keep
            your look sharp between visits with our curated grooming range.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100"
            >
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold text-gray-600">{product.rating}</span>
                </div>

                <h3 className="font-bold text-gray-900 mb-1.5 leading-snug text-sm">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    £{product.price.toFixed(2)}
                  </span>
                  <button className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-3.5 py-2 rounded-full transition-all duration-200 hover:shadow-md text-xs">
                    <ShoppingBag className="h-3.5 w-3.5" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
