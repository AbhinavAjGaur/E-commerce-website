// Removed incorrect import of Container
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef (null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );

        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNewArrivals();
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => { };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    if (!scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -250 : 250;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const updateScrollButtons = (container) => {
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
      const handleScroll = (event) => {
        const target = event.target;
        updateScrollButtons(target);
      };
      container.addEventListener("scroll", handleScroll);
      updateScrollButtons(container);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [newArrivals]);

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
            className={`p-2 rounded border bg-white text-black ${canScrollLeft
                ? "bg-gray200 text-gray-400 curnot"
                : "bg-white text-black "
              }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border bg-white text-black ${canScrollRight
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
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"
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
                <p className="mt-1">${products.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
