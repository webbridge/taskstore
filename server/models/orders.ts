import db from "../db";
import { Orders } from "types/orders";
import { InsertAnswer } from "types/index";

class OrdersModel implements Orders.Model {
  getOrders(): Promise<Orders.Items[]> {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT o.id, o.status, o.total, o.taxes, o.created_at, SUM(oi.quantity) AS count FROM orders AS o LEFT JOIN order_items AS oi ON o.id = oi.order_id GROUP BY o.id",
        (err, data) => {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  }

  getOrderById(id): Promise<Orders.OrderProducts> {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT p.id, IF(t.name = 'imported', CONCAT(t.name, ' ', p.name), p.name ) AS name , (p.price* oi.quantity) as price, oi.quantity, o.total, o.taxes, o.status FROM orders AS o INNER JOIN order_items AS oi ON o.id = oi.order_id LEFT JOIN products as p ON p.id=oi.product_id LEFT JOIN types AS t ON p.type_id = t.id WHERE o.id=?",
        [id],
        (err, data) => {
          if (err) reject(err);
          resolve({
            items: data.map(({ id, name, price, quantity }) => {
              return {
                id,
                name,
                price,
                quantity
              };
            }),
            total: data[0].total,
            taxes: data[0].taxes,
            status: data[0].status
          });
        }
      );
    });
  }

  addNewOrder({ items, total, taxes }): Promise<InsertAnswer> {
    const orderId = Number(
      new Date()
        .valueOf()
        .toString()
        .substr(5)
    );

    const values = items.map((item) => {
      return [orderId, item.product_id, item.quantity];
    });
    // need convert to async await
    return new Promise((resolve, reject) => {
      db.beginTransaction((err) => {
        if (err) reject(err);
        db.query(
          `INSERT INTO orders (id, total, taxes, status) VALUES (${orderId}, ${total}, ${taxes}, 'pending')`,
          (err) => {
            if (err) {
              db.rollback(() => {
                throw err;
              });
            }
            db.query(
              `INSERT INTO order_items (order_id, product_id, quantity) VALUES ?`,
              [values],
              (err) => {
                if (err) {
                  db.rollback(() => {
                    throw err;
                  });
                }
                db.commit((err) => {
                  if (err) {
                    db.rollback(() => {
                      throw err;
                    });
                  }
                });
              }
            );
          }
        );
      });
    });
  }

  updateOrder(status: string, id: number): Promise<InsertAnswer> {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE orders SET status='${status}' WHERE id=?`, [id], (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}

export default OrdersModel;
