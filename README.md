# melih.pro 🌐  

This repository contains the source code for **melih.pro**, a static site built with **SvelteKit** and styled using **TailwindCSS**. The site is  build as static files (no SSR) and deployed to **Cloudflare Pages**.  

## Usage  
### Build and Deploy  
1. Run the build command to generate static files: `bun run build`  
2. Upload the contents of the `build/` directory to any online Hosting Platform or Cloud Bucket.  

### Local Development  
1. Start the development server: `bun run dev`  
2. Access the site at http://localhost:5173.  

## Setup Development Environment  
1. Install **Bun**: Visit https://bun.sh to install.  
2. Clone this repository.
3. Install dependencies: `bun install`.

## Tech Stack  
- **SvelteKit** as the framework
- **Typescript** for type safety
- **Drizzle** for easy sqlite db schemas and type integration
- **Prettier** for formatting
- **ESLint** for linting
- **Vitest** for unit testing
- **Playwright** for e2e testing
- **TailwindCSS** for styling
- **MDSvex** for easier markdown writing
- **Paraglide** for translations

## Hosting  
The site is hosted on **Cloudflare Pages** in combination with **Cloudflare D1**.

## Visit  
https://melih.pro  
