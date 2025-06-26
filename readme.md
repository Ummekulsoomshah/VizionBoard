# VisionBoard

A modern web application for uploading, parsing, visualizing, and summarizing data files (CSV/XLSX) with AI-powered insights.

## Features

- User authentication (Signup, Login, JWT-based session)
- Upload CSV/XLSX files and preview data before upload
- Store uploaded files and parsed data in the backend
- List and select previously uploaded files
- Visualize data with interactive charts (Bar, Line, Area)
- AI Assistant for summarizing uploaded data or custom text
- Responsive, modern UI with dark mode

## Technologies Used

### Frontend

- React (with Vite)
- Tailwind CSS
- Axios (HTTP requests)
- [lucide-react](https://lucide.dev/) (icons)
- [papaparse](https://www.papaparse.com/) (CSV parsing)
- [xlsx](https://github.com/SheetJS/sheetjs) (Excel parsing)
- Recharts (data visualization)

### Backend

- Node.js
- Express.js
- MySQL (or compatible SQL database)
- JWT (authentication)
- Cloudinary (for avatar uploads)
- CORS, body-parser, express-fileupload

## API Endpoints

### User

- `POST /login` — User login
- `POST /signup` — User signup (with avatar upload)
- `GET /getUser` — Get current user info (JWT required)

### File

- `POST /uploadFile` — Upload and store a new file (CSV/XLSX data as JSON)
- `GET /get-all-files` — List all uploaded files
- `GET /get-all-files/:fileId` — Get a specific file's data

## How to Run

1. Clone the repository.
2. Install dependencies in both `client/vite-project` and `server`.
3. Set up your `.env` files for backend and frontend (API keys, DB credentials).
4. Start the backend server:  
   ```sh
   cd server
   npm install
   npm start
   ```
5. Start the frontend:  
   ```sh
   cd client/vite-project
   npm install
   npm run dev
   ```

## Notes

- The AI Assistant uses the Google Gemini API for summarization. You must provide your API key in the frontend `.env`.
- File uploads are parsed on the client and sent as JSON to the backend.

---

For more details, see the code in [src/components/UploadCSV.jsx](src/components/UploadCSV.jsx), [src/components/AIassistant.jsx](src/components/AIassistant.jsx), and [src/components/FileSelector.jsx](src/components/FileSelector.jsx)