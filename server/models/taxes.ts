import db from "../db";
// import { Products } from "interfaces/products";

// "SELECT p.id, p.name, p.price, c.name AS category, ((p.price/100*ta.percentage) + (p.price/100*tax.percentage)) AS taxes, ty.name AS type FROM products AS p INNER JOIN categories AS c ON p.category_id = c.id LEFT JOIN types AS ty ON p.type_id = ty.id LEFT JOIN taxes AS ta ON ty.tax_id = ta.id LEFT JOIN taxes AS tax ON c.tax_id = tax.id"

class TaxesModel {
  async getTaxes(body): Promise<any> {
    try {
      const ids = body.items.map(({ id }) => id);

      const [rows, fields] = await db.query(
        "SELECT ( CEIL(p.price/100*ta.percentage*20)/20 + CEIL(p.price/100*tax.percentage*20)/20) AS taxes, ty.name AS type FROM products AS p INNER JOIN categories AS c ON p.category_id = c.id LEFT JOIN types AS ty ON p.type_id = ty.id LEFT JOIN taxes AS ta ON ty.tax_id = ta.id LEFT JOIN taxes AS tax ON c.tax_id = tax.id WHERE p.id IN (?)",
        [ids]
      );

      return rows;
    } catch (err) {
      throw err;
    }
  }
}

export default TaxesModel;