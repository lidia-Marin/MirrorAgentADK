import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesService } from '../../services/sales';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sales.html',
  styleUrls: ['./sales.css']
})
export class SalesComponent implements OnInit {

  constructor(private salesService: SalesService) {}

  customer = '';
  product = '';
  category = '';

  price: number | null = null;
  quantity: number | null = null;

  sales: any[] = [];

  ngOnInit(): void {
    this.sales = this.salesService.getSales();
  }

  addSale() {

    if (
      !this.customer ||
      !this.product ||
      !this.category ||
      this.price === null ||
      this.quantity === null ||
      this.price <= 0 ||
      this.quantity <= 0
    ) {
      return;
    }

    const total = this.price * this.quantity;

    // GUARDAR EN EL SERVICIO
    this.salesService.addSale({
      customer: this.customer,
      product: this.product,
      category: this.category,
      price: this.price,
      quantity: this.quantity,
      total: total,
      date: new Date()
    });

    // ACTUALIZAR LISTA
    this.sales = this.salesService.getSales();

    // LIMPIAR FORMULARIO
    this.customer = '';
    this.product = '';
    this.category = '';

    this.price = null;
    this.quantity = null;
  }

  getTotalSales(): number {
    return this.salesService.getTotalSales();
  }

  getTotalProducts(): number {
    return this.sales.length;
  }

}