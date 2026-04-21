# This Dockerfile is designed for production, not development. Use with Kamal or build'n'run by hand.
# docker build -t flowcast .
# docker run -d -p 80:80 -e RAILS_MASTER_KEY=<value> --name flowcast flowcast

ARG RUBY_VERSION=4.0.2
ARG NODE_VERSION=24.14.0

FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

WORKDIR /rails

# Install base packages
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    ca-certificates \
    curl \
    libjemalloc2 \
    postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Set environment vars
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development"

FROM base AS build

ARG NODE_VERSION
ARG VITE_PUBLIC_POSTHOG_HOST
ARG VITE_PUBLIC_POSTHOG_KEY

# Install build dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    ca-certificates \
    git \
    libffi-dev \
    libpq-dev \
    libssl-dev \
    libyaml-dev \
    pkg-config \
    ruby-dev \
    xz-utils && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install Node.js with node-build so the image tracks the repo's Node 24.x runtime.
RUN curl -sL https://github.com/nodenv/node-build/archive/master.tar.gz | tar xz -C /tmp/ && \
    cd /tmp/node-build-master && ./install.sh && \
    /tmp/node-build-master/bin/node-build "${NODE_VERSION}" /usr/local/node && \
    ln -s /usr/local/node/bin/* /usr/local/bin/ && \
    rm -rf /tmp/node-build-master

ENV VITE_PUBLIC_POSTHOG_HOST=$VITE_PUBLIC_POSTHOG_HOST \
    VITE_PUBLIC_POSTHOG_KEY=$VITE_PUBLIC_POSTHOG_KEY

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile -j 1 --gemfile

# Copy application code
COPY . .

# Precompile bootsnap for app
RUN bundle exec bootsnap precompile -j 1 app/ lib/

# Precompile assets without requiring production secrets or a live database at build time.
RUN SECRET_KEY_BASE_DUMMY=1 SKIP_EAGER_LOAD_DURING_ASSET_PRECOMPILE=1 ./bin/rails assets:precompile

FROM base

# Copy built app and gems
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# Create a non-root user and give ownership
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails db log tmp
USER 1000:1000

ENTRYPOINT ["/rails/bin/docker-entrypoint"]
EXPOSE 80
CMD ["./bin/thrust", "./bin/rails", "server"]
