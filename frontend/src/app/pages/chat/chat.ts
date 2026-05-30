import { Component, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,     // <-- Activa *ngFor y [ngClass] en la vista
    FormsModule,      // <-- Activa [(ngModel)] en el input de texto
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent {

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    public chatService: ChatService 
  ) {}

  userMessage = '';
  loading = false;
  isMuted = false;

  sendMessage() {
    if (!this.userMessage.trim() || this.loading) {
      return;
    }

    const messageToSend = this.userMessage.trim();

    this.chatService.messages.push({
      sender: 'user',
      text: messageToSend
    });

    this.loading = true;
    this.userMessage = '';
    
    this.cdr.detectChanges(); 

    this.http.post<any>('http://localhost:8001/chat', {
      message: messageToSend
    })
    .subscribe({
      next: (response) => {
        const reply = response.reply || 'No pude generar respuesta.';

        this.chatService.messages.push({
          sender: 'ia',
          text: reply
        });

        this.loading = false;
        this.cdr.detectChanges();

        if (!this.isMuted) {
          this.speak(reply);
        }
      },
      error: (error) => {
        console.error(error);

        this.chatService.messages.push({
          sender: 'ia',
          text: 'Error conectando con MirrorAgent.'
        });

        this.loading = false;
        this.cdr.detectChanges(); 
      }
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      window.speechSynthesis.cancel();
    }
  }

  speak(text: string) {
    try {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'es-ES';
      speech.rate = 1;
      speech.pitch = 1;
      speech.volume = 1;
      window.speechSynthesis.speak(speech);
    } catch (e) {
      console.error("Error en síntesis de voz:", e);
    }
  }
}