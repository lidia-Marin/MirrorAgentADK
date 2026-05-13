import { FunctionTool } from '@google/adk';
import { z } from 'zod';

const FinancialSchema = z.object({
  investment: z.number(),
  monthlyBurnRate: z.number()
});

export const financialSimulator = new FunctionTool({
  name: 'generateFinancialScenarios',
  description: 'Genera realidades financieras: Optimista y Pesimista.',
  parameters: FinancialSchema,
  execute: async (args) => {
    const { investment, monthlyBurnRate } = args as z.infer<typeof FinancialSchema>;
    const survivalMonths = investment / (monthlyBurnRate || 1);
    
    return JSON.stringify({
      optimista: `Recuperas inversión en ${Math.round(survivalMonths * 0.6)} meses.`,
      pesimista: `Capital agotado en ${Math.round(survivalMonths)} meses.`,
      mas_probable: `Equilibrio en mes ${Math.round(survivalMonths * 1.2)}.`
    });
  }
});