import db from "../db";
import { Products } from "types/products";

class ProductsModel implements Products.Model {
  getProducts(): Promise<Products.Item[]> {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT p.id, p.name, p.price, c.name AS category, ((p.price/100*ta.percentage) + (p.price/100*tax.percentage)) AS taxes, ty.name AS type FROM products AS p INNER JOIN categories AS c ON p.category_id = c.id LEFT JOIN types AS ty ON p.type_id = ty.id LEFT JOIN taxes AS ta ON ty.tax_id = ta.id LEFT JOIN taxes AS tax ON c.tax_id = tax.id",
        (err: string, data: Products.Item[]) => {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  }
}

export default ProductsModel;
