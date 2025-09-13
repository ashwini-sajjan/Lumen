#!/usr/bin/env python3
"""
Screenshot to Code Script
Takes a screenshot, sends to Gemini for analysis, and types the response
"""

import os
import time
import base64
from io import BytesIO
import pyautogui
import google.generativeai as genai
from PIL import Image
from dotenv import load_dotenv
import threading
from pynput import keyboard
from pynput.keyboard import Key, KeyCode, Listener

# Load environment variables from .env file
load_dotenv()

# Configure Gemini API
def setup_gemini():
    """Setup Gemini API with your API key"""
    api_key = 'AIzaSyCNC2MFW8gmNjGIQebj_HB36UAiM2Wgq4M'
    if not api_key:
        raise ValueError("Please set GEMINI_API_KEY environment variable")
    
    genai.configure(api_key=api_key)
    return genai.GenerativeModel('gemini-1.5-flash')

def take_screenshot():
    """Take a screenshot and return as PIL Image"""
    delay = float(os.getenv('SCREENSHOT_DELAY', 3))
    print(f"Taking screenshot in {delay} seconds...")
    time.sleep(delay)  # Give user time to position screen
    
    screenshot = pyautogui.screenshot()
    return screenshot

def analyze_with_gemini(model, image):
    """Send image to Gemini to solve coding problems optimally"""
    prompt = """
    You are a WORLD-CLASS competitive programmer and algorithm expert. Analyze this screenshot and provide the MOST OPTIMAL solution:

    ANALYSIS PROCESS:
    1. READ the problem statement carefully
    2. IDENTIFY all constraints (time limits, memory limits, input size)
    3. CONSIDER multiple approaches (brute force, optimized, advanced)
    4. CHOOSE the most efficient algorithm for the given constraints
    5. IMPLEMENT with best practices

    OPTIMIZATION PRIORITIES:
    - TIME COMPLEXITY: Always aim for the lowest possible Big O
    - SPACE COMPLEXITY: Minimize memory usage when possible
    - EDGE CASES: Handle all corner cases (empty input, single element, etc.)
    - SCALABILITY: Code should work for maximum constraints
    - READABILITY: Clean, professional code structure

    PROBLEM TYPES & OPTIMAL APPROACHES:

    🔹 ARRAY/STRING PROBLEMS:
    - Use two pointers, sliding window, or hash maps
    - Avoid nested loops when possible
    - Consider sorting if it helps reduce complexity

    🔹 DYNAMIC PROGRAMMING:
    - Identify overlapping subproblems
    - Use memoization or tabulation
    - Optimize space with rolling arrays if possible

    🔹 GRAPH/TREE PROBLEMS:
    - Choose BFS vs DFS based on requirements
    - Use appropriate data structures (adjacency list, etc.)
    - Consider topological sort, Union-Find, or shortest path algorithms

    🔹 SEARCHING/SORTING:
    - Binary search for sorted data
    - Use built-in sort when appropriate
    - Consider counting sort for limited ranges

    🔹 MATHEMATICAL PROBLEMS:
    - Look for patterns and formulas
    - Use modular arithmetic for large numbers
    - Consider number theory concepts

    CODING STANDARDS:
    - Use meaningful variable names
    - Proper indentation (4 spaces)
    - Handle integer overflow if applicable
    - Return correct data types
    - Follow the exact function signature if given

    CRITICAL: 
    - ALWAYS provide the MOST OPTIMAL solution (best time/space complexity)
    - If multiple solutions exist, choose the one with better time complexity
    - Code must be COMPLETE and READY TO RUN
    - NO explanations, comments, or markdown - ONLY the solution code
    - Test your logic mentally before providing the answer
    """
    
    try:
        response = model.generate_content([prompt, image])
        return clean_code_response(response.text.strip())
    except Exception as e:
        print(f"Error with Gemini API: {e}")
        return None

def clean_code_response(text):
    """Clean up the Gemini response to ensure proper formatting"""
    # Remove markdown code blocks if present
    if text.startswith('```'):
        lines = text.split('\n')
        # Remove first line (```language) and last line (```)
        if lines[-1].strip() == '```':
            lines = lines[1:-1]
        else:
            lines = lines[1:]  # Just remove first line
        text = '\n'.join(lines)
    
    # Remove any remaining backticks
    text = text.replace('```', '')
    
    # Ensure proper line endings
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    
    return text.strip()

def detect_language(text):
    """Detect programming language from code"""
    text_lower = text.lower()
    if 'int main' in text_lower or '#include' in text_lower or 'vector<' in text_lower:
        return 'cpp'
    elif 'def ' in text_lower or 'import ' in text_lower or 'print(' in text_lower:
        return 'python'
    elif 'function' in text_lower or 'const ' in text_lower or 'let ' in text_lower:
        return 'javascript'
    elif 'public class' in text_lower or 'System.out' in text_lower:
        return 'java'
    elif '<html' in text_lower or '<div' in text_lower:
        return 'html'
    return 'generic'

def calculate_typing_speed():
    """Calculate typing speed from WPM or use manual setting"""
    manual_speed = os.getenv('TYPING_SPEED', '').strip()
    if manual_speed:
        return float(manual_speed)
    
    # Calculate from WPM (Words Per Minute)
    # Average word length is 5 characters
    # WPM = characters per minute / 5
    # Speed = 60 seconds / (WPM * 5 characters)
    wpm = float(os.getenv('TYPING_WPM', 50))
    chars_per_minute = wpm * 5
    chars_per_second = chars_per_minute / 60
    return 1.0 / chars_per_second  # seconds per character

def type_like_ide(text: str):
    """Type code exactly like an IDE would - preserving indentation"""
    typing_delay = float(os.getenv("TYPING_DELAY", 5))
    typing_speed = calculate_typing_speed()

    wpm = float(os.getenv("TYPING_WPM", 50))
    print(f"Typing at {wpm} WPM (speed: {typing_speed:.3f}s per character)")
    print(f"Starting to type in {typing_delay} seconds... "
          "Click in your IDE where you want the code")

    time.sleep(typing_delay)

    language = detect_language(text)
    lines = text.split("\n")   # do not strip indentation

    for i, line in enumerate(lines):
        # --- Handle indentation properly ---
        leading_spaces = len(line) - len(line.lstrip(" "))

        # Type indentation first (without triggering IDE auto-indent)
        if leading_spaces > 0:
            pyautogui.write(" " * leading_spaces, interval=0.0)

        # --- Type the rest of the line ---
        for char in line.lstrip(" "):
            pyautogui.write(char, interval=typing_speed)

            # IDE auto-completion triggers
            if char in "({[":
                time.sleep(0.02)
            elif char == "." and language in ["cpp", "java", "javascript"]:
                time.sleep(0.05)
            elif char == ":" and language == "python":
                time.sleep(0.02)

        # --- End of line ---
        if i < len(lines) - 1:
            pyautogui.press("enter")
            time.sleep(0.05)

            # Allow IDE to auto-indent after `{` or `:`
            if line.rstrip().endswith("{") or line.rstrip().endswith(":"):
                time.sleep(0.1)
def type_response(text):
    """Main typing function that chooses the best method"""
    ide_mode = os.getenv('IDE_MODE', 'true').lower() == 'true'
    
    if ide_mode:
        type_like_ide(text)
    else:
        # Fallback to simple typing
        typing_delay = float(os.getenv('TYPING_DELAY', 5))
        typing_speed = calculate_typing_speed()
        
        wpm = float(os.getenv('TYPING_WPM', 50))
        print(f"Starting to type in {typing_delay} seconds at {wpm} WPM...")
        time.sleep(typing_delay)
        pyautogui.write(text, interval=typing_speed)

def analyze_solution_complexity(code):
    """Analyze the complexity of the generated solution"""
    code_lower = code.lower()
    
    # Simple heuristic analysis
    complexity_indicators = {
        'O(1)': ['return', 'math.', 'constant'],
        'O(log n)': ['binary', 'bisect', '// 2', 'log'],
        'O(n)': ['for', 'while', 'in range'],
        'O(n log n)': ['sort', 'sorted', 'heapq'],
        'O(n²)': ['for.*for', 'nested.*loop'],
        'O(2^n)': ['recursive', 'fibonacci', 'subset'],
    }
    
    detected_complexity = "O(n)"  # Default assumption
    
    if 'sort' in code_lower or 'sorted' in code_lower:
        detected_complexity = "O(n log n)"
    elif code_lower.count('for') >= 2 or 'while.*while' in code_lower:
        detected_complexity = "O(n²)"
    elif 'binary' in code_lower or '// 2' in code_lower:
        detected_complexity = "O(log n)"
    elif len([line for line in code.split('\n') if 'for' in line or 'while' in line]) <= 1:
        detected_complexity = "O(n)"
    
    return detected_complexity

def process_screenshot():
    """Main screenshot processing function"""
    try:
        print("\n🔥 Screenshot-to-Code triggered!")
        
        # Setup
        model = setup_gemini()
        
        # Take screenshot
        screenshot = take_screenshot()
        
        # Analyze with Gemini
        print("🧠 Analyzing problem and generating OPTIMAL solution...")
        code_response = analyze_with_gemini(model, screenshot)
        
        if code_response:
            # Analyze complexity
            complexity = analyze_solution_complexity(code_response)
            
            print("✅ OPTIMAL Solution generated!")
            print(f"⚡ Estimated Time Complexity: {complexity}")
            print("📝 Code to be typed:")
            print("-" * 50)
            print(code_response)
            print("-" * 50)
            
            # Type the response
            print("⌨️  Starting to type optimal solution...")
            type_response(code_response)
            print("🎉 Optimal solution typed successfully! ✅")
        else:
            print("❌ Failed to generate solution")
            
    except Exception as e:
        print(f"💥 Error: {e}")

def run_with_hotkey():
    """Run the script with keyboard shortcut support using pynput"""
    print(f"🚀 Screenshot-to-Code is running!")
    print(f"📸 Press CMD+SHIFT+J to take screenshot and generate code")
    print("🛑 Press ESC to quit")
    print("-" * 60)
    
    try:
        # Setup model once
        model = setup_gemini()
        print("✅ Gemini API connected successfully")
        print("⏳ Listening for CMD+SHIFT+J... (script is running in background)")
        
        # Track pressed keys
        pressed_keys = set()
        
        def on_press(key):
            """Handle key press"""
            pressed_keys.add(key)
            
            # Check for CMD+SHIFT+J combination
            if (Key.cmd in pressed_keys and 
                Key.shift in pressed_keys and 
                (key == KeyCode.from_char('k') or key == KeyCode.from_char('K'))):
                
                print(f"\n🔥 CMD+SHIFT+J pressed! Starting screenshot process...")
                threading.Thread(target=process_screenshot, daemon=True).start()
        
        def on_release(key):
            """Handle key release"""
            try:
                pressed_keys.discard(key)
            except KeyError:
                pass
            
            # Exit on ESC
            if key == Key.esc:
                print("\n👋 Screenshot-to-Code stopped")
                return False
        
        # Start the listener
        with Listener(on_press=on_press, on_release=on_release) as listener:
            listener.join()
        
    except KeyboardInterrupt:
        print("\n👋 Screenshot-to-Code stopped")
    except Exception as e:
        print(f"❌ Error: {e}")
        print("💡 Try running with: python3 screenshot_to_code.py --once")

def main():
    """Main function - choose between hotkey mode or single run"""
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == '--once':
        # Single run mode
        process_screenshot()
    else:
        # Hotkey mode (default)
        run_with_hotkey()

if __name__ == "__main__":
    main()