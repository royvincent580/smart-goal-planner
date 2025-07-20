# SMART Goal Planner

A financial goal management dashboard built with React and Vite, allowing users to track their savings goals and progress.

## Features

- Create, read, update, and delete financial goals
- Track progress for each goal with visual progress bars
- Make deposits to any goal
- View overview statistics (total goals, total saved, completed goals)
- Deadline tracking with warnings for approaching deadlines
- Mark goals as overdue if deadline has passed without completion

## Technologies Used

- React
- Vite
- json-server (for REST API)
- Axios (for HTTP requests)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the json-server (API):
   ```
   npm run server
   ```

2. In a separate terminal, start the React application:
   ```
   npm run dev
   ```

3. Open your browser and navigate to http://localhost:5173

## Data Structure

The application uses a `db.json` file with the following structure:

```json
{
  "goals": [
    {
      "id": 1,
      "name": "Emergency Fund",
      "targetAmount": 10000,
      "savedAmount": 2500,
      "category": "Savings",
      "deadline": "2024-12-31",
      "createdAt": "2023-11-01"
    }
  ]
}
```

## License

MIT