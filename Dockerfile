# Static web site compiler
FROM node:16 as builder

ARG COMMIT_SHA
ENV COMMIT_SHA=${COMMIT_SHA}
ARG NODE_ENV="development"
ENV NODE_ENV=${NODE_ENV}
ARG VOCDONI_ENVIRONMENT
ENV VOCDONI_ENVIRONMENT=${VOCDONI_ENVIRONMENT}
ARG ETH_NETWORK_ID
ENV ETH_NETWORK_ID=${ETH_NETWORK_ID}
ARG BLOCK_TIME
ENV BLOCK_TIME=${BLOCK_TIME}
ARG VERIFY_SINGLE_PAGE="false"
ENV VERIFY_SINGLE_PAGE=${VERIFY_SINGLE_PAGE}

WORKDIR /app
ADD package.json /app
ADD package-lock.json /app
RUN npm install --legacy-peer-deps

ADD . /app
RUN yarn export

FROM node:16

RUN apt update && apt install nginx -y && apt clean

COPY --from=builder /app /app

WORKDIR /app

ENTRYPOINT [ "/app/entrypoint.sh" ]
