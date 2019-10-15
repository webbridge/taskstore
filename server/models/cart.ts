import db from "../db";
import { Cart } from "interfaces/cart";
import { getTotals } from "../services/cart";

class CartModel implements Cart.Model {
  async getTotals(body): Promise<Cart.Item> {
    try {
      const result = [
        {
          total: 1,
          taxes: 0.1
        }
      ];
      const ids = body.items.map(({ id }) => id);

      const [rows, fields] = await db.query(
        "SELECT p.id, p.price, tax_type.percentage AS type_taxes, tax_cat.percentage AS category_taxes FROM products AS p INNER JOIN categories AS c ON p.category_id = c.id LEFT JOIN types AS type ON p.type_id = type.id LEFT JOIN taxes AS tax_type ON type.tax_id = tax_type.id LEFT JOIN taxes AS tax_cat ON c.tax_id = tax_cat.id WHERE p.id IN (?)",
        [ids]
      );

      return getTotals(body.items, rows);
    } catch (err) {
      throw err;
    }
  }
}

export default CartModel;
