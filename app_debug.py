import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import json
import os
from datetime import datetime
import traceback

print("Starting SOP Generator...")
print("Attempting to import the sop_generator module...")

try:
    from sop_generator import generate_sop
    print("Successfully imported the sop_generator module")
except Exception as e:
    print(f"Error importing sop_generator: {e}")
    traceback.print_exc()

# A simple test function that will be used if the main app fails
def generate_dummy_sop(user_data):
    return f"This is a test SOP for {user_data.get('name', 'unnamed user')}"

print("Defining application class...")

try:
    class SOPGeneratorApp:
        def __init__(self, root):
            print("Initializing SOPGeneratorApp...")
            self.root = root
            self.root.title("Statement of Purpose Generator")
            self.root.geometry("900x700")
            self.root.resizable(True, True)
            
            # Create a test label
            tk.Label(root, text="SOP Generator Test", font=("Arial", 16)).pack(pady=20)
            
            # Create a test button
            tk.Button(root, text="Generate Test SOP", command=self.test_sop).pack(pady=10)
            
            print("Basic UI elements created")
            
        def test_sop(self):
            try:
                print("Testing SOP generation...")
                test_data = {"name": "Test User"}
                result = generate_dummy_sop(test_data)
                messagebox.showinfo("Test Result", result)
                print("Test completed successfully")
            except Exception as e:
                print(f"Error in test_sop: {e}")
                messagebox.showerror("Error", f"Test failed: {str(e)}")

    print("Application class defined successfully")

    def main():
        print("Starting main function...")
        try:
            root = tk.Tk()
            print("Tk root created")
            app = SOPGeneratorApp(root)
            print("App instance created, starting mainloop")
            root.mainloop()
        except Exception as e:
            print(f"Error in main function: {e}")
            traceback.print_exc()

    if __name__ == "__main__":
        print("Starting application from main block")
        main()
        
except Exception as e:
    print(f"Error defining application: {e}")
    traceback.print_exc() 