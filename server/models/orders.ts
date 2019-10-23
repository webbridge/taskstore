import db from "../db";
import { Orders } from "interfaces/orders";
import { InsertAnswer } from "interfaces/index";

class OrdersModel implements Orders.Model {
  async getOrders(): Promise<Orders.Items[]> {
    try {
      const [rows] = await db.query(
        "SELECT o.id, o.status, o.total, o.taxes, o.created_at, SUM(oi.quantity) AS count FROM orders AS o LEFT JOIN order_items AS oi ON o.id = oi.order_id GROUP BY o.id"
      );
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async getOrderById(id): Promise<Orders.OrderProducts> {
    try {
      const [rows] = await db.query(
        "SELECT p.id, IF(t.name = 'imported', CONCAT(t.name, ' ', p.name), p.name ) AS name , (p.price* oi.quantity) as price, oi.quantity, o.total, o.taxes, o.status FROM orders AS o INNER JOIN order_items AS oi ON o.id = oi.order_id LEFT JOIN products as p ON p.id=oi.product_id LEFT JOIN types AS t ON p.type_id = t.id WHERE o.id=?",
        [id]
      );
      return {
        items: rows.map(({ id, name, price, quantity }) => {
          return {
            id,
            name,
            price,
            quantity
          };
        }),
        total: rows[0].total,
        taxes: rows[0].taxes,
        status: rows[0].status
      };
    } catch (err) {
      throw err;
    }
  }

  async addNewOrder({ items, total, taxes }): Promise<InsertAnswer> {
    const orderId = Number(
      new Date()
        .valueOf()
        .toString()
        .substr(5)
    );
    const values = items.map((item) => {
      return [orderId, item.product_id, item.quantity];
    });
    const connection = await db.getConnection();
    try {
      const data = await connection.beginTransaction();
      await connection.query(
        `INSERT INTO orders (id, total, taxes, status) VALUES (${orderId}, ${total}, ${taxes}, 'pending')`
      );
      await connection.query(`INSERT INTO order_items (order_id, product_id, quantity) VALUES ?`, [
        values
      ]);
      await connection.commit();
      return data;
    } catch (err) {
      throw err;
    }
  }

  async updateOrder(status: string, id: number): Promise<InsertAnswer> {
    try {
      const [rows] = await db.query(`UPDATE orders SET status='${status}' WHERE id=?`, [id]);
      return rows;
    } catch (err) {
      throw err;
    }
  }
}

export default OrdersModel;
