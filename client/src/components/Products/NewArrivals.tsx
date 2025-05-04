// Removed incorrect import of Container
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {};

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    if (!scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction: string) => {
    const scrollAmount = direction === "left" ? -250 : 250;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const updateScrollButtons = (container: HTMLDivElement) => {
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      const handleScroll = (event: Event) => {
        const target = event.target as HTMLDivElement;
        updateScrollButtons(target);
      };
      container.addEventListener("scroll", handleScroll);
      updateScrollButtons(container);
      container.removeEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("scroll", (event) => {
          const target = event.target as HTMLDivElement;
          updateScrollButtons(target);
        });
      };
    }
  }, []);

  return (
    <section className="py-16 px-4 lg:px-5">
      <div className="container mx-auto text-center mb-10 mt-0 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles and trends in our new arrivals collection.
        </p>

        {/* Scroll Buttons */}
        <div className="relative right-0 bottom-[-30px] flex space-x-2 ">
          <button
            onClick={() => scroll("left")}
            disabled={canScrollLeft}
            className={`p-2 rounded border bg-white text-black ${
              canScrollLeft
                ? "bg-gray200 text-gray-400 curnot"
                : "bg-white text-black "
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border bg-white text-black ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } `}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {newArrivals.map((products) => (
          <div
            key={products._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative "
          >
            <img
              src={products.images[0]?.url}
              alt={products.images[0]?.altText || products.name}
              className="md:w-full w-3/4 md:h-[400px] h-[300px] object-cover rounded-lg"
              draggable="false"
            />
            <div className=" md:w-full w-3/4 absolute bg-black/40 bottom-0 left-0 right-0 backdrop:blur-md text-white p-4 rounded-b-lg">
              <Link to={`/products/${products._id}`} className="block">
                <h4 className="font-medium">{products.name}</h4>
                <p className="mt-1">₹{products.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
