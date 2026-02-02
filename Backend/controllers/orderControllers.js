const Order = require("../models/OrderModel");
const Cart = require("../models/CartModel");

// Place order
exports.placeOrder = async (req, res) => {
  try {
    const { userId, items, address, paymentMethod } = req.body;

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Calculate total
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order
    const order = await Order.create({
      userId,
      items,
      totalAmount,
      address: address || "Not provided",
      paymentMethod: paymentMethod || "Cash on Delivery",
      status: "pending"
    });

    // Clear cart
    await Cart.destroy({ where: { userId } });

    res.status(201).json({
      message: "Order placed successfully",
      order: { id: order.id, totalAmount: order.totalAmount, status: order.status }
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.params.userId },
      order: [['id', 'DESC']]
    });
    res.json(orders);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};