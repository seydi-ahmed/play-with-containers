# play-with-containers/scripts/py-setup.sh

#!/bin/bash
set -e  # Stop on error

# Install Python and Node.js
apt-get update && apt-get install -y \
    python3.10 \
    python3-pip \
    python3.10-venv \
    nodejs \
    npm

# Install PM2 globally
npm install pm2 -g

# Verify installations
python3 --version
node --version
pm2 --version

echo "Python/Node.js environment setup completed successfully."