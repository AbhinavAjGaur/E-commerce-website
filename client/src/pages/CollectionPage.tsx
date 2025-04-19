import { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
  interface Product {
    _id: string;
    name: string;
    price: number;
    images: { url: string; alText: string }[];
  }

  const [products, setProducts] = useState<Product[]>([]);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e: MouseEvent) => {
    //close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    //Add event listner for clicks
    document.addEventListener("mousedown", handleClickOutside);
    //clean event listner
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
        {
          _id: "1",
          name: "product 1",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/600?random=1",
              alText: "Product 1",
            },
          ],
        },
        {
          _id: "2",
          name: "product 2",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/600?random=2",
              alText: "Product 2",
            },
          ],
        },
        {
          _id: "3",
          name: "product 3",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/600?random=3",
              alText: "Product 3",
            },
          ],
        },
        {
          _id: "4",
          name: "product 4",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/600?random=4",
              alText: "Product 4",
            },
          ],
        },
        {
          _id: "5",
          name: "product 5",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/600?random=5",
              alText: "Product 1",
            },
          ],
        },
        {
          _id: "6",
          name: "product 6",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/600?random=6",
              alText: "Product 2",
            },
          ],
        },
        {
          _id: "7",
          name: "product 7",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/600?random=7",
              alText: "Product 3",
            },
          ],
        },
        {
          _id: "8",
          name: "product 8",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/600?random=8",
              alText: "Product 4",
            },
          ],
        },
      ];
      setProducts(fetchProducts);
    }, 1000);
  }, []);
  return (
    <div className="flex flex-col lg:flex-row">
      {/* mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
      </button>

      {/* Filter Sidebar */}

      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        {/* Sort options*/}
        <SortOptions />

        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
