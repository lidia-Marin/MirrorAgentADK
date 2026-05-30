# MirrorAgent AI 🚀🤖

MirrorAgent AI es un ecosistema multiagente inteligente diseñado para la auditoría financiera, mitigación de riesgos y contención estratégica de emprendedores en tiempo real. Construido con una arquitectura desacoplada, utiliza **Angular** en el frontend y el **Google Agent Development Kit (ADK)** en el backend para orquestar modelos de lenguaje avanzados (**Gemini 2.5 Flash**).

---

## 🏗️ Arquitectura del Sistema

El ecosistema está fragmentado en microagentes especializados que se comunican de forma asíncrona a través de endpoints locales expuestos con Express:

* **Frontend (Angular Standalone):** Interfaz fluida e interactiva que incluye un Dashboard analítico con cálculo en tiempo real de métricas críticas y un Chat Inteligente con síntesis de voz y control de accesibilidad.
* **🧠 Agente Empático (Puerto 8003):** Microagente encargado de dar soporte contextual, mitigar la fricción cognitiva del usuario y validar las emociones del emprendedor.
* **👿 Agente Crítico Financiero (Puerto 8002):** Microagente experto en auditoría de riesgos, encargado de evaluar el *burn rate*, costos fijos, márgenes de contribución y concentración de ingresos. Incluye una simulación de herramientas analíticas (`financialSimulator`).

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** Angular (v17+ / Standalone Components), TypeScript, RxJS, Tailwind CSS / Custom CSS.
* **Backend:** Node.js, TypeScript, Express, `dotenv`.
* **IA Framework:** Google Agent Development Kit (@google/adk), Google Gen AI (Gemini 2.5 Flash).

---

## 🚀 Instalación y Configuración

Siga estos pasos en orden para inicializar y ejecutar todo el ecosistema de MirrorAgent AI en su entorno local:

### 1. Clonar el repositorio
```bash
git clone <URL_DE_TU_REPOSITORIO>
cd MirrorAgentADK

### 2. Configurar Variables de Entorno
Cree un archivo `.env` en la raíz del proyecto para habilitar la autenticación de los modelos de Google:
```env
GEMINI_API_KEY=tu_clave_secreta_de_gemini

### 3. Levantar los Microagentes (Backend)
Abra dos terminales independientes en la raíz del proyecto para encender los servidores de los agentes:

* **Terminal 1 - Servidor del Agente Empático:**
```bash
  npx tsx empathy_agent/server.ts

* **Terminal 2 - Servidor del Agente Crítico:**

Bash
npx tsx critic_agent/server.ts
4. Levantar la Interfaz Gráfica (Frontend)
Abra una tercera terminal para compilar e iniciar la aplicación cliente en Angular:

Bash
npm install
ng serve

---

### 📤 Súbelo rápido con estos comandos:
Guarda el archivo, abre tu terminal y ejecuta esto para dejar tu repositorio al día en GitHub:
```bash
git add README.md
git commit -m "docs: Completar guías de instalación y despliegue en README"
git push origin main