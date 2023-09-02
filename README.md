**Requirements**

- [Node <=v14](https://nodejs.org/)
- [Docker](https://www.docker.com/) or [Rancher Desktop](https://rancherdesktop.io/)

```bash
# Project setup steps
git clone https://github.com/LennonReid/panng-stack.git
cd panng-stack

# Make a copy of the .env file
cp .env.example .env

# Install node modules
yarn

# Start the PostgreSQL server
docker-compose up -d

# Run the initial Prisma migration
npm run prisma:apply

# Run the codegen.yml to generate the graphql.ts file
npm run sdk

```

---

```bash
# Start the both Nest API and Angular app
npm run start:dev
```
