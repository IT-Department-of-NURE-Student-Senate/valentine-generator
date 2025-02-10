ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app/client

FROM base AS build

RUN npm i -g pnpm

COPY --link package.json .

RUN pnpm install

COPY --link . .

RUN pnpm build

FROM base

ENV NODE_ENV=production
ENV API_BASE_URL=${API_BASE_URL}
ENV WEBSITE_BASE_URL=${WEBSITE_BASE_URL}

COPY --from=build /app/client/.output /app/client/.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]