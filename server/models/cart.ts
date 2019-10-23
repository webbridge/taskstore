import db from "../db";
import { Cart } from "interfaces/cart";

class CartModel implements Cart.Model {
  async getTotals(ids): Promise<Cart.ResponseTotals[]> {
    try {
      const [rows] = await db.query(
        "SELECT p.id, p.price, tax_type.percentage AS type_taxes, tax_cat.percentage AS category_taxes FROM products AS p INNER JOIN categories AS c ON p.category_id = c.id LEFT JOIN types AS type ON p.type_id = type.id LEFT JOIN taxes AS tax_type ON type.tax_id = tax_type.id LEFT JOIN taxes AS tax_cat ON c.tax_id = tax_cat.id WHERE p.id IN (?)",
        [ids]
      );

      return rows;
    } catch (err) {
      throw err;
    }
  }
}

export default CartModel;
