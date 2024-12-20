# Drive - File Uploading & Downloading with Supabase

Drive is a file storage web application that allows users to upload and download files (e.g., .jpg, .pdf) using Supabase for storage and MongoDB for user authentication. Built with Node.js for the server-side logic and EJS for rendering HTML views, the application provides secure file uploads and temporary file downloads through Supabase's signed URLs.

## Features

- **User Authentication**: Register and log in using MongoDB to manage user accounts.
- **File Uploading**: Users can upload files such as images and documents to Supabase storage.
- **Temporary File Downloads**: Files uploaded to Supabase are accessible via temporary signed URLs, ensuring secure access for a limited time.

## Technologies Used

- **Node.js**: For the backend server.
- **EJS**: For dynamic HTML rendering.
- **Supabase**: Used for file storage and generating signed URLs for temporary access.
- **MongoDB**: For storing user data (registration and login).
- **Express.js**: Web framework for Node.js to handle routes and HTTP requests.

## Installation

To run the project locally, follow these steps:

### Prerequisites

- Node.js (LTS version recommended)
- npm (Node package manager)
- MongoDB account and setup (local or cloud)
- Supabase account for storage setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/drive.git
cd drive
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SECRET_KEY = your_jwt_secret_key
```

Replace the placeholders with your actual MongoDB and Supabase credentials.

### 4. Run the Project

```bash
npm start
```

This will start the server on [http://localhost:3000](http://localhost:3000).

## Usage

1. **Register**: Navigate to the registration page and create an account by entering your email and password.
2. **Login**: After registration, log in with your credentials.
3. **Upload Files**: Once logged in, you can upload files (.jpg, .pdf, etc.) through the interface. The files will be stored securely in Supabase storage.
4. **Download Files**: After uploading, you will receive a temporary signed URL that allows you to download your files for a limited time.

## Contributing

Contributions are welcome! To contribute to this project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add feature'`)
5. Push to your branch (`git push origin feature-branch`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Notes:
- **Customization**: Make sure to replace placeholders like `yourusername`, `your_mongodb_connection_string`, and `your_supabase_url` with actual values when you use this `README`.
- **Installation**: I’ve provided instructions for installing dependencies and setting up environment variables, assuming the user has a basic understanding of how to handle them.

Let me know if you need any further modifications or additions!
