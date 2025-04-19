import { useEffect, useState } from "react";

const MyOrdersPage = () => {
  interface Order {
    _id: string;
    createdAt: Date;
    shippingAdress: { city: string; country: string };
    orderItems: {
      name: string;
      image: string;
      price: number;
      quantity: number;
      size: string;
      color: string;
    }[];
    totalPrice: number;
    isPaid: boolean;
  }

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "1",
          createdAt: new Date(),
          shippingAdress: { city: "new york", country: "USA" },
          orderItems: [
            {
              name: "product 1",
              image: "https://picsum.photos/500/600?random=1",
              price: 100,
              quantity: 1,
              size: "large",
              color: "red",
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },
        {
          _id: "2",
          createdAt: new Date(),
          shippingAdress: { city: "washington dc", country: "USA" },
          orderItems: [
            {
              name: "product 2",
              image: "https://picsum.photos/500/600?random=2",
              price: 1000,
              quantity: 10,
              size: "large",
              color: "red",
            },
          ],
          totalPrice: 1000,
          isPaid: false,
        },
      ];

      setOrders(mockOrders);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <th className="py-2 px-4 sm:py-3">Image</th>
            <th className="py-2 px-4 sm:py-3">Order Id</th>
            <th className="py-2 px-4 sm:py-3">Created</th>
            <th className="py-2 px-4 sm:py-3">Shipped Address</th>
            <th className="py-2 px-4 sm:py-3">Items</th>
            <th className="py-2 px-4 sm:py-3">Price</th>
            <th className="py-2 px-4 sm:py-3">Status</th>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:border-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-2 sm:py-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.shippingAdress.city
                      ? `${order.shippingAdress.city}, ${order.shippingAdress.country}`
                      : "Not provided"}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.orderItems.length}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    ${order.totalPrice}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span
                      className={`${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                    >
                      {order.isPaid ? "Paid" : "Not Paid"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
