// Removed incorrect import of Container
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(true);

  const newArrivals = [
    {
      _id: "1",
      name: "Stylish Shirt",
      price: 29.99,
      images: [
        {
          url: "https://picsum.photos/500/500/?random=1",
          altText: "Stylish Shirt",
        },
      ],
    },
    {
      _id: "2",
      name: "Stylish Jacket",
      price: 29.99,
      images: [
        {
          url: "https://picsum.photos/500/500/?random=2",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "3",
      name: "Stylish Pants",
      price: 29.99,
      images: [
        {
          url: "https://picsum.photos/500/500/?random=3",
          altText: "Stylish Pants",
        },
      ],
    },
    {
      _id: "4",
      name: "Stylish Shoes",
      price: 29.99,
      images: [
        {
          url: "https://picsum.photos/500/500/?random=4",
          altText: "Stylish Shoes",
        },
      ],
    },
    {
      _id: "5",
      name: "Stylish Jeans",
      price: 29.99,
      images: [
        {
          url: "https://picsum.photos/500/500/?random=5",
          altText: "Stylish Jeans",
        },
      ],
    },
    {
      _id: "6",
      name: "Stylish Sweater",
      price: 29.99,
      images: [
        {
          url: "https://picsum.photos/500/500/?random=6",
          altText: "Stylish Sweater",
        },
      ],
    },
    {
      _id: "7",
      name: "Stylish Hat",
      price: 29.99,
      images: [
        {
          url: "https://picsum.photos/500/500/?random=7",
          altText: "Stylish Hat",
        },
      ],
    },
    {
      _id: "8",
      name: "Stylish Scarf",
      price: 29.99,
      images: [
        {
          url: "https://picsum.photos/500/500/?random=8",
          altText: "Stylish Scarf",
        },
      ],
    },
  ];

  const updateScrollButtons = (container: HTMLDivElement) => {
    console.log({
      scrollLeft: container.scrollLeft || 0,
      clientWidth: container.clientWidth,
      containerScrollWidth: container.scrollWidth,
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      const handleScroll = () => updateScrollButtons(container);
      container.addEventListener("scroll", handleScroll);
      updateScrollButtons(container);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <section>
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles and trends in our new arrivals collection.
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2 ">
          <button className="p-2 rounded border bg-white text-black">
            <FiChevronLeft className="text-2xl" />
          </button>
          <button className="p-2 rounded border bg-white text-black">
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div ref={scrollRef} className="container mx-auto overflow-x-scroll flex space-x-6 relative">
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="md:w-full w-3/4 md:h-[400px] h-[300px] object-cover rounded-lg"
            />
            <div className=" md:w-full w-3/4 absolute bg-black/40 bottom-0 left-0 right-0 backdrop:blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
