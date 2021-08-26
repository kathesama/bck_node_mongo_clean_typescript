#!/bin/sh
# wait-for-mongo.sh

set -e

host="$1"
shift

until docker exec -it mongodb_dev mongo localhost:27017/test --quiet; do
  >&2 echo "Mongo is unavailable - sleeping"
  sleep 5
done

>&2 echo "Mongo is up - executing command"
exec "$@"
