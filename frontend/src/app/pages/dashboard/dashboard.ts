import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Necesario para usar *ngIf y pipes en standalone
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Para conectar con tu backend
import { SalesService } from '../../services/sales';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule], 
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  totalSales = 0;
  totalProducts = 0;
  aiRecommendation = 'Analizando tus métricas en tiempo real con Gemini... 🧠';
  loadingIA = true;

  constructor(
    private salesService: SalesService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 1. Intentamos cargar los datos iniciales registrados en el servicio
    this.totalSales = this.salesService.getTotalSales();
    this.totalProducts = this.salesService.getSales().length;
    
    this.cdr.detectChanges();

    // 2. Le damos 300ms de seguridad para garantizar consistencia de memoria antes de evaluar la IA
    setTimeout(() => {
      this.totalSales = this.salesService.getTotalSales();
      this.totalProducts = this.salesService.getSales().length;
      this.cdr.detectChanges();

      // Ejecutamos la petición inteligente de forma segura
      this.getRealRecommendation();
    }, 300);
  }

  getRealRecommendation() {
    // CONDICIÓN DE SEGURIDAD: Si el negocio está en 0, evitamos tumbar el backend (Error 500 por división por cero)
    if (this.totalSales === 0 && this.totalProducts === 0) {
      this.aiRecommendation = 'Registra tus primeras transacciones en la pestaña de "Ventas" para activar el análisis predictivo de MirrorAgent AI. 📈';
      this.loadingIA = false;
      this.cdr.detectChanges();
      return;
    }

    this.loadingIA = true;
    this.cdr.detectChanges();

    const promptDashboard = `
      Actúa como el analista financiero estratégico de MirrorAgent AI. 
      El negocio actual registra las siguientes métricas en tiempo real en su base de datos:
      - Ventas Totales Facturadas: $${this.totalSales} COP.
      - Cantidad de Clientes Únicos / Operaciones registradas: ${this.totalProducts}.
      
      Dame una recomendación de negocio muy corta, directa y profesional (máximo 3 líneas) analizando la relación entre estos dos números para optimizar o escalar la rentabilidad del negocio.
    `;

    this.http.post<any>('http://localhost:8001/chat', { message: promptDashboard })
    .subscribe({
      next: (response) => {
        this.aiRecommendation = response.reply || 'Métricas analizadas con éxito.';
        this.loadingIA = false;
        this.cdr.detectChanges();
      },
      error: (httpError) => {
        console.error('Error obteniendo recomendación del Dashboard:', httpError);
        
        // Si el backend envía un mensaje amigable dentro del objeto de error, lo pintamos
        if (httpError.error && httpError.error.reply) {
          this.aiRecommendation = httpError.error.reply;
        } else {
          // Contingencia local por si el servidor físico se apaga del todo
          this.aiRecommendation = 'Optimiza tus márgenes de contribución iniciales y asegura un presupuesto base estructurado antes de escalar operaciones.';
        }
        
        this.loadingIA = false;
        this.cdr.detectChanges(); 
      }
    });
  }
}