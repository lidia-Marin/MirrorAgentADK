import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // El historial se guarda aquí en memoria global y no se destruye
  messages: any[] = [
    {
      sender: 'ia',
      text: 'Hola 👋 Soy MirrorAgent AI. Estoy lista para analizar tu negocio.'
    }
  ];
}