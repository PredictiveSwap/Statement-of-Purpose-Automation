# Statement of Purpose (SOP) Generator

A web application that generates professional Statements of Purpose (SOPs) using the Llama 3.1 8B model via Ollama.

## Features

- Generates customized SOPs based on user input
- Uses the powerful Llama 3.1 8B model for high-quality text generation
- Creates structured SOPs with the following sections:
  - Introduction
  - Academic Background
  - Language Proficiency
  - Financial Background
  - Why I Choose this Country for my Studies
  - Career Opportunities in My Country After Completing the Program
  - My Family Ties and Return to Home Country
  - Conclusion
- Allows downloading the generated SOP as Word document or text file
- Simple and intuitive user interface

## Requirements

- Python 3.8 or higher
- Ollama installed on your system (see [Ollama installation instructions](https://ollama.ai/download))
- Llama 3.1 8B model pulled into Ollama

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/sop-generator.git
   cd sop-generator
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

4. Make sure Ollama is installed and running on your system.

5. Pull the Llama 3.1 8B model into Ollama:
   ```
   ollama pull llama3.1:8b
   ```

## Usage

1. Start the application:
   ```
   python app.py
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

3. Fill in the form with your personal details.

4. Click "Generate SOP" and wait for the generation to complete.

5. Review the generated SOP and download it in your preferred format.

## Customization

You can customize the application by:

- Modifying the SOP section prompts in `app.py`
- Adjusting the model parameters like temperature
- Changing the UI by editing the `templates/index.html` file

## Troubleshooting

### Common Issues

1. **Ollama not running**: Make sure Ollama is installed and running on your system.
2. **Model not found**: Ensure you've pulled the Llama 3.1 8B model by running `ollama pull llama3.1:8b`.
3. **Generation too slow**: The first generation might be slow as the model loads. Subsequent generations should be faster.
4. **Out of memory**: If you're running on a system with limited resources, you might encounter memory issues with larger models.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- This application uses the [Ollama](https://ollama.ai/) API to interface with the Llama 3.1 model.
- UI built with [Bootstrap](https://getbootstrap.com/). 