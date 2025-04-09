# play-with-containers/scripts/rabbitmq-setup.sh

#!/bin/bash
set -e  # Stop on error

# Install RabbitMQ
apt-get update && apt-get install -y rabbitmq-server
rabbitmq-plugins enable rabbitmq_management
systemctl start rabbitmq-server

# Create admin user if not exists
if ! rabbitmqctl list_users | grep -q "${RABBITMQ_USER}"; then
    rabbitmqctl add_user "${RABBITMQ_USER}" "${RABBITMQ_PASSWORD}"
    rabbitmqctl set_user_tags "${RABBITMQ_USER}" administrator
    rabbitmqctl set_permissions -p / "${RABBITMQ_USER}" ".*" ".*" ".*"
    echo "User ${RABBITMQ_USER} created."
else
    echo "User ${RABBITMQ_USER} already exists - updating password."
    rabbitmqctl change_password "${RABBITMQ_USER}" "${RABBITMQ_PASSWORD}"
fi

# Enable management UI
rabbitmq-plugins enable rabbitmq_management
systemctl restart rabbitmq-server

echo "RabbitMQ setup completed successfully."