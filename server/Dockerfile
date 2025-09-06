# 1. Build stage
FROM node:18-bullseye AS build

WORKDIR /app

# Copy package files and prisma schema first
COPY package*.json ./
COPY prisma ./prisma

RUN npm ci
RUN npx prisma generate

# 3. Copy the rest of the app
COPY . .

# 4. Generate Prisma client (important)
RUN npx prisma generate

# 5. Build TS to JS
RUN npm run build

# 6. Runtime stage
FROM node:18-bullseye AS runtime

WORKDIR /app

# 7. Copy package files & installed modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

# 8. Copy compiled JS
COPY --from=build /app/dist ./dist

# 9. If you have migrations, copy prisma folder too
COPY --from=build /app/prisma ./prisma

EXPOSE 3001

CMD ["node", "dist/index.js"]
