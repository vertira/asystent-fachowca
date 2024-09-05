# <img src="/public/logo/small-logo.png" width="32"/> Asystent Fachowca

<div align="center">
<img src="https://utfs.io/f/375a974f-7bee-43bb-9c82-a9209ca44a34-pvpaoa.png" width="600"/>
</div>

Asystent fachowca is an application that supports professionals in their daily work, offering quick access to essential tools and information.

## Access the demo version:

Click the "Wypróbuj demo aplikacji!" button on the main page.

You will be automatically logged in as either a guest user or a staff member
This allows you to quickly explore the app's features without creating an account

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [Installation](#installation)
- [License](#license)

## Technologies

The project uses the following technologies:

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![NeonDB](https://img.shields.io/badge/NeonDB-00FFFF?style=for-the-badge&logo=neon&logoColor=black)

Additionally:

- <img src="https://www.aceternity.com/_next/image?url=%2Flogo.png&w=64&q=75" width="18"/> Aceternity Components
- <img src="https://next-auth.js.org/img/logo/logo-sm.png" width="18"/> NextAuth
- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/HERE_logo.svg/1024px-HERE_logo.svg.png" width="18"/> HERE Autocomplete API
- <img src="https://raw.githubusercontent.com/konfig-sdks/openapi-examples/HEAD/uploadthing/logo.png" width="18"/> UploadThing API
- <img src="https://serwist.pages.dev/_app/immutable/assets/logo-200x50-transparent.Cb8j0JMI.avif" width="18"/> Serwist (PWA)

## Features

- 📊 Project management
- 🧰 Warehouse Management
- 📅 Work Schedule Management
- 👥 Employee Management

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/vertira/asystent-fachowca.git
   ```

2. Navigate to the project directory:

   ```
   cd asystent-fachowca
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Configure environment variables:
   Copy the `.env.example` file to `.env.local` and fill in the required values.

5. Run database migrations:

   ```
   npx prisma migrate dev
   ```

6. Start the application:
   ```
   npm run dev
   ```

## License

This project is released under the MIT License. For more details, see the [LICENSE.md](LICENSE.md) file.

---

Created with ❤️ by [Vertira](https://github.com/vertira)
