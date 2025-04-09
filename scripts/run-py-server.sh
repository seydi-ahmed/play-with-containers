# play-with-containers/scripts/run-py-setup.sh

#!/bin/bash
set -e  # Stop on error

cd "${APP_PATH}" || { echo "ERROR: Directory ${APP_PATH} not found"; exit 1; }

# Setup virtual environment
python3 -m venv venv
source venv/bin/activate

# Install requirements if file exists
if [[ -f "requirements.txt" ]]; then
    pip install --no-cache-dir -r requirements.txt
else
    echo "WARNING: requirements.txt not found - skipping package installation"
fi

# Start server with PM2
pm2 start server.py --name "${APP_NAME:-python_app}" --interpreter venv/bin/python

# Save PM2 process list
pm2 save

echo "Python server started successfully."