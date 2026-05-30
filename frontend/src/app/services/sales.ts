import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  sales: any[] = [];

  addSale(sale: any) {
    this.sales.push(sale);
  }

  getSales() {
    return this.sales;
  }

  getTotalSales() {
    return this.sales.reduce((acc, sale) => acc + sale.total, 0);
  }

}