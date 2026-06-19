# Multi-Tier Web Application (MERN Stack on AWS)

A robust, secure, and fully automated production-ready 3-Tier MERN web application deployed globally utilizing AWS Infrastructure and managed via GitHub Actions CI/CD.

---

## 🏗️ Architecture Overview

This application separates frontend presentation, API orchestration, and data storage into distinct layers to guarantee scalability and isolated security perimeters:

[Browser] ──(HTTPS)──> [CloudFront CDN] ──> [S3 Bucket (Static Client Assets)]│└──(POST/GET Requests to /record*)│└──> [CloudFront Proxy Layer] ──(HTTP)──> [EC2 Instance (Node.js API)] ──> [MongoDB Database]
* **Frontend Presentation Layer:** Built with React/Vite, stored inside an **AWS S3 Bucket** (`multitier-frontend`) entirely locked down to the public. 
* **Global Delivery Network:** **AWS CloudFront** serves the client over HTTPS (`d32xesta47t9m3.cloudfront.net`), optimizing asset delivery via global edge caches and managing client-side URL routing rules.
* **Backend API Routing:** An **AWS EC2 Instance** hosting the Node.js/Express server. CloudFront acts as a secure reverse proxy, forwarding any `/record*` endpoints safely from the client directly to the backend process.
* **Database Layer:** Fully managed, decoupled cloud database storing operational schemas securely.

---

## 🛠️ Repository Layout

```text
mulititier-web-application/
├── .github/workflows/
│   └── deploy.yml       # GitHub Actions Automated CI/CD Pipeline
├── client/              # React/Vite Frontend Application Module
│   ├── dist/            # Compiled static distribution build artifacts
│   ├── src/             # Application layout, views, and UI assets
│   └── package.json     
└── server/              # Node.js / Express Backend API Module
    ├── db/              # Persistent database connection modules
    ├── routes/          # Express route definitions (e.g., /record)
    ├── server.js        # Core API entry point
    └── package.json
🚀 Continuous Integration & Deployment (CI/CD)The project implements automated infrastructure pipelines using GitHub Actions. Every single push to the main branch safely triggers two parallel deployment cycles:1. Frontend PipelineInstalls dependencies and builds the production-minified assets inside /client/dist.Syncs the directory to AWS S3 with tracking deletion (--delete) to remove old components.Executes an automated CloudFront Cache Invalidation (/*) across edge networks to serve updates instantly.2. Backend PipelineEstablishes a secure connection to the remote EC2 Instance over SSH.Resets local modifications, pulls the latest repository updates directly from GitHub, and reinstalls production dependencies.Gracefully reloads the live application layer via PM2 Process Manager ensuring zero-downtime execution.🔒 Necessary Deployment SecretsTo maintain environment security, the following environment variables must be registered under Repository Settings > Secrets and variables > Actions:Secret Configuration KeyTarget Destination ValueAWS_ACCESS_KEY_IDIAM User access identifier with programmatic S3/CloudFront rights.AWS_SECRET_ACCESS_KEYEncrypted private token belonging to the AWS IAM deployment identity.EC2_HOSTThe public IPv4 address of your live backend virtual server instance.EC2_SSH_KEYPrivate SSH key (.pem format) authorized to connect to the EC2 host.💻 Local Development SetupTo test code configurations locally on your computer prior to pushing live to production:1. Setup Backend ServerBashcd server
npm install
npm start
The API will initialize locally, running at http://localhost:5000.2. Setup Client UIBashcd client
npm install
npm run dev
Open your browser and navigate to the default local address returned by Vite.
---

### Step 3: Push to GitHub
Save the file (`Ctrl + O`, then `Enter`, then `Ctrl + X` to exit nano) and run these commands to push your updated documentation to your personal repository:

```bash
git add README.md
git commit -m "docs: add comprehensive production architecture documentation"
git push origin main
