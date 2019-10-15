import { Cart } from "interfaces/cart";

const calculateTaxes = ({ price, type_taxes, category_taxes }, quantity) => {
  return (
    (Math.ceil((price / 100) * type_taxes * 20) / 20 +
      Math.ceil((price / 100) * category_taxes * 20) / 20) *
    quantity
  );
};

export const getTotals = (body: Cart.ResponseBody[], data: Cart.ResponseTotals[]): Cart.Item => {
  const totals = [];

  data.forEach((row) => {
    body.forEach((item) => {
      if (row.id === item.id) {
        totals.push({
          taxes: calculateTaxes(row, item.quantity),
          total: row.price * item.quantity + calculateTaxes(row, item.quantity)
        });
      }
    });
  });

  return {
    taxes: totals.reduce((acc, item) => acc + item.taxes, 0),
    total: totals.reduce((acc, item) => acc + item.total, 0)
  };
};
