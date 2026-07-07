# syntax=docker/dockerfile:1

# --- build: produce the localized Angular bundle (en-US + pl) ---
FROM node:22-bookworm-slim AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.8.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# --- runtime: tiny nginx serving the static bundle ---
FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/dist/restos-web/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=15s --timeout=5s --retries=6 \
  CMD wget -qO- http://127.0.0.1/en-US/ >/dev/null 2>&1 || exit 1
