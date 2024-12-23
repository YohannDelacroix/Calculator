# **React Calculator**

## Description

A simple and elegant calculator built with React. This project demonstrates the use of React components, stack techniques for calculations, and modern UI features. The app supports basic arithmetic operations (addition, subtraction, multiplication, division) with both integer and decimal numbers, as well as more advanced functions such as square roots, powers, and calculations involving parentheses. It also includes additional features like undo and history clearing.

**Main Features**:
- Basic arithmetic operations: addition, subtraction, multiplication, division.
- Complex operations: Square roots, powers, calculations involving parentheses, PI number or modulos.
- Additional buttons: `AC` for reset, `<-` for undo.
- Modern design with shadows and animations.

## Demo

You can try the calculator online by clicking the following link:  
[Live Calculator](https://your-calculator.netlify.app)

## Technologies Used

This project was developed using the following technologies:
- **React** (version 18.2.0)
- **Typescript** (version 4.9.5)
- **CSS** (for styling, animations and responsive design)
- **Netlify** (for deployment)

## Installation

### Prerequisites

Make sure you have **Node.js** and **npm** installed on your machine. If not, you can download them from [Node.js](https://nodejs.org/).

### Steps to Run the App Locally

1. Clone this repository:
    git clone https://github.com/YohannDelacroix/Calculator.git

2. Navigate to the project directory:
    cd Calculator

3. Install the dependencies:
    npm install

4. Start the development server:
    npm start

### Usage
    Main Interface:
        The top section displays the screen where calculation results are shown.
        The keyboard section contains all the necessary buttons for performing basic calculations.
        The AC button resets the calculator.
        The <- button undoes the last action.
    How it works:
        Click the number buttons and operators to build a mathematical expression.
        Click the equal (=) button to get the calculation result.

### Project Structure

Here’s an overview of the project structure with a description of each important file/folder:

    /src
        /Calc                          # Typescript function for the calculations
        /components
            /Button/Button.tsx         # Component for each button on the calculator
            /Screen/Screen.tsx         # Component for displaying the calculation screen
        /Stack                         # Typescript functions and testing for stack gestion
            StackMethods.tsx
            StackReducer.tsx            
        App.css                        # Main styling for the app
        App.tsx                        # Main component that contains the app's logic
        index.tsx               #  Entry point of the app
    /public                     # React Build of the application


### Authors

    Yohann Delacroix – Full-Stack Developer