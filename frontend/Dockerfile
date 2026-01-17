# ---------------------------------------------------
# STAGE 1: Install Dependencies
# ---------------------------------------------------
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# ---------------------------------------------------
# STAGE 2: Build the App (MAGIC HAPPENS HERE)
# ---------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 👇 YE HAI MAIN KEY POINT (Variables Catch karna)
# Jenkins bhejega --build-arg, Docker yaha catch karega
ARG NEXT_PUBLIC_API_URL
# Phir Docker usse Environment variable bana dega taaki Next.js use kar sake
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Next.js Telemetry disable (Good for privacy)
ENV NEXT_TELEMETRY_DISABLED 1

# Ab Build chalega (Aur URL code ke andar "Bake" ho jayega)
RUN npm run build

# ---------------------------------------------------
# STAGE 3: Production Runner (Lightweight)
# ---------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]