import db from "../db";
import { Cart } from "interfaces/cart";

class CartModel implements Cart.Model {
  async getTotals(body): Promise<Cart.Item[]> {
    try {
      const result = [];
      const ids = body.items.map(({ id }) => id);

      const [rows, fields] = await db.query(
        "SELECT p.id, p.price, ( CEIL(p.price/100*ta.percentage*20)/20 + CEIL(p.price/100*tax.percentage*20)/20) AS taxes FROM products AS p INNER JOIN categories AS c ON p.category_id = c.id LEFT JOIN types AS ty ON p.type_id = ty.id LEFT JOIN taxes AS ta ON ty.tax_id = ta.id LEFT JOIN taxes AS tax ON c.tax_id = tax.id WHERE p.id IN (?)",
        [ids]
      );

      rows.forEach((row) => {
        body.items.forEach((item) => {
          if (row.id === item.id) {
            result.push({
              taxes: row.taxes * item.quantity,
              total: row.price * item.quantity + row.taxes * item.quantity
            });
          }
        });
      });

      return result;
    } catch (err) {
      throw err;
    }
  }
}

export default CartModel;
