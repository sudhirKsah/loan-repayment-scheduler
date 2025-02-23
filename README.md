# [Loan Repayment Schedule Generator](https://loan-repayment-scheduler.vercel.app/)

A full-stack web application to generate loan repayment schedules dynamically. Users can input loan details such as disbursement date, principal amount, tenure, EMI frequency, interest rate, and moratorium period. The app calculates the repayment schedule and allows users to export it as a CSV or PDF file.


### **Key Sections**

1. **[Features](#features)**: Highlights the key functionalities of the app.
2. **[Tech Stack](#tech-stack)**: Lists the technologies and libraries used.
3. **[Live Demo](#live-demo)**: Provides a link to the live demo.
4. **[Installation](#installation)**: Step-by-step instructions to set up the project locally.
5. **[Usage](#usage)**: Explains how to use the app.


## Features

- **Dynamic Schedule Generation**: Calculate loan repayment schedules based on user inputs.
- **Export Options**:
  - Export the schedule as a **CSV** file.
  - Export the schedule as a **PDF** file.
- **Summary Statistics**: View total interest paid and total amount paid.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **SEO-Friendly**: Optimized for search engines with proper meta tags and structured data.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Chart.js
- **Backend**: Node.js, Express
- **Libraries**:
  - `date-fns` for date manipulation.
  - `pdf-lib` for PDF generation.
  - `json2csv` for CSV generation.
- **Deployment**:
  - Frontend: Vercel
  - Backend: Render

## Live Demo

Check out the live demo of the application: [Loan Scheduler Demo](https://loan-repayment-scheduler.vercel.app/)

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sudhirKsah/loan-repayment-scheduler.git
   cd loan-repayment-scheduler
   ```
2. **Setup the Backend**:
    ```bash
    cd backend
    npm install
    ```
3. **Setup the Frontend**:
    ```bash
    cd ../frontend
    npm install
    ```
4. **Environment Variables**:

    Create a .env file in the backend folder:
    ```bash
    PORT=5000
    ```
    Create a .env file in the frontend folder:
    ```bash
    VITE_API_URL=http://localhost:5000
    ```
5. **Run the Backend**:
    ```bash
    cd ../backend
    npm start
    ```
    Run the Frontend:
    ```bash
    cd ../frontend
    npm run dev
    ```
6. **Access the Application**:

    Open your browser and navigate to http://localhost:5173.

## Usage
### Input Loan Details:
Enter the disbursement date, principal amount, tenure, EMI frequency, interest rate, and moratorium period.

### Generate Schedule:
Click the Calculate Schedule button to generate the repayment schedule.

### View Summary:
Check the summary section for total interest paid and total amount paid.

### Export Schedule:
Export the schedule as a CSV or PDF file using the respective buttons.