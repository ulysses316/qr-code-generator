# Etapa para instalar Bun una vez
FROM node:22-alpine AS bun-install
RUN apk add --no-cache curl bash
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

# Etapa de desarrollo
FROM node:22-alpine AS development-dependencies-env
RUN apk add --no-cache bash
COPY --from=bun-install /root/.bun /root/.bun
ENV PATH="/root/.bun/bin:$PATH"
COPY . /app
WORKDIR /app
RUN bun install --frozen-lockfile

# Etapa de producción
FROM node:22-alpine AS production-dependencies-env
RUN apk add --no-cache bash
COPY --from=bun-install /root/.bun /root/.bun
ENV PATH="/root/.bun/bin:$PATH"
COPY ./package.json bun.lock /app/
WORKDIR /app
RUN bun install --frozen-lockfile --production

# Etapa de build
FROM node:22-alpine AS build-env
RUN apk add --no-cache bash
COPY --from=bun-install /root/.bun /root/.bun
ENV PATH="/root/.bun/bin:$PATH"
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN bun run build

# Imagen final
FROM node:22-alpine
RUN apk add --no-cache bash
COPY --from=bun-install /root/.bun /root/.bun
ENV PATH="/root/.bun/bin:$PATH"
COPY ./package.json bun.lock /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
EXPOSE 3000
CMD ["bun", "run", "start"]
