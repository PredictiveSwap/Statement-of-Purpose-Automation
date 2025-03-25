# AI Statement of Purpose Generator

A modern, interactive web application that generates professional Statements of Purpose for university applications using AI. Built with Next.js and Ollama for local AI processing.

![SOP Generator Preview](https://i.imgur.com/placeholder.png)

## 🌟 Features

- **AI-Powered SOP Generation**: Creates tailored Statements of Purpose based on personal information
- **Modern User Interface**: Clean, responsive design with animations and intuitive user experience
- **Real-time Progress Updates**: Detailed progress tracking during SOP generation
- **Multiple Export Options**: Download as DOCX, PDF, or TXT formats
- **Copy to Clipboard**: One-click copying of generated content
- **Offline AI Processing**: Uses Ollama for local AI processing without sending data to external servers

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- [Ollama](https://ollama.ai/) installed and running locally with the LLaMA 3.1 model

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sop-generator.git
   cd sop-generator-next
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure Ollama is running with the required model:
   ```bash
   ollama run llama3.1:8b
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💻 Usage

1. Click on "Create Your SOP Now" button on the homepage
2. Fill in the form with your personal details, including:
   - Personal information
   - Academic background
   - Language proficiency
   - Financial information
   - Program details
   - Career goals
3. Click "Generate SOP" and wait for the AI to create your Statement of Purpose
4. Review the generated SOP
5. Download in your preferred format or copy to clipboard

## 🛠️ Tech Stack

- **Frontend**: Next.js, TypeScript, Bootstrap 5
- **Styling**: CSS with custom animations
- **AI Integration**: Ollama API (local inference)
- **Document Generation**: DOCX.js for document formatting

## 📝 API Endpoints

- `/api/check-ollama` - Checks connection to Ollama and available models
- `/api/generate` - Generates the SOP based on form data
- `/api/download-docx` - Creates and returns a DOCX file
- `/api/download-pdf` - Creates and returns a PDF file
- `/api/download-txt` - Creates and returns a TXT file

## 🔄 Migration from Flask

This project was migrated from a Flask backend to a Next.js application. The migration provides:

- Improved performance with client-side rendering
- Better developer experience with TypeScript
- Enhanced UI with modern React components
- Simplified deployment options

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Ollama](https://ollama.ai/) for the local LLM capabilities
- [Next.js](https://nextjs.org/) for the React framework
- [Bootstrap](https://getbootstrap.com/) for UI components
- [Font Awesome](https://fontawesome.com/) for icons

---

Made with ❤️ by Swapnil
