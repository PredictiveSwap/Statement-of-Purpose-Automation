#!/bin/bash
echo "Starting SOP Generator..."
python3 app.py

if [ $? -ne 0 ]; then
    echo
    echo "Error running the application."
    echo "Please make sure Python 3 is installed."
    echo "Also ensure all dependencies are installed with:"
    echo "    pip3 install -r requirements.txt"
    read -p "Press Enter to continue..."
fi 