#!/bin/sh
set -e

printf "\n\n***** Environment Variables ---> debug level: ${DEBUG_LEVEL}, name: ${TASK_SERVICE_NAME}, port: ${TASK_SERVICE_PORT} *****\n\n"

sed -e "s/\${TASK_SERVICE_NAME}/${TASK_SERVICE_NAME}/" -e "s/\${TASK_SERVICE_PORT}/${TASK_SERVICE_PORT}/" /config/envoy.yaml > /etc/envoy.yaml

printf "\n\n***** Dumping source config file /config/envoy.yaml *****\n\n"
cat /config/envoy.yaml

printf "\n\n***** Dumping final config file /etc/envoy.yaml *****\n\n"
cat /etc/envoy.yaml

/usr/local/bin/envoy -c /etc/envoy.yaml -l ${DEBUG_LEVEL}
