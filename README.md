# WithImpact: Open Source for Social Good Showcase Platform

## Backend Setup

1. Create virtual environment (`python -m venv myenv`)
2. Active your virtual environment (`source myenv/Scripts/activate`)
3. Install any dependencies (pip install -r requirements.txt)
4. Create a folder in "backend/backend" called 'security' and add client-cert.pem, client-key.pem and server-ca.pem (from google cloud platform to setup database)
5. In command line, cd to backend and type `python manage.py runserver`

# Frontend Setup

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Step 1

First, fill out the following environment variables in your /frontend/.env file (The image below is the .env-example file that you can copy and paste into your .env file):
1. For the NextAuth variables you can get your key values by following this tutorial:
https://next-auth.js.org/getting-started/example#backend---api-route

2. For the GitHub variables you can get them by setting up an OAuth Provider with GitHub. You can follow this tutorial to see how:
https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app

![image](https://github.com/Hunter23h/WithImpact/assets/76442800/c001ac82-110e-487b-a02c-65da5d204808)

## Step 2
In the root directory of the project, cd into the frontend folder and do npm install:

```bash
1. cd frontend/
2. npm install
```

After the installation is complete run the project by doing the following:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

