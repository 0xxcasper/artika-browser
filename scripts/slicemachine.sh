#!/bin/bash

# Slice Machine Helper Script
# Usage: ./scripts/slicemachine.sh [start|stop|restart|status]

set -e

# Configuration
REPO_NAME="artika-sapa"
PORT=9999

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
check_port() {
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

stop_slicemachine() {
    echo -e "${YELLOW}Stopping Slice Machine...${NC}"
    pkill -f "start-slicemachine" || true
    sleep 2
    if check_port; then
        echo -e "${RED}Failed to stop Slice Machine${NC}"
        return 1
    else
        echo -e "${GREEN}Slice Machine stopped successfully${NC}"
        return 0
    fi
}

start_slicemachine() {
    echo -e "${YELLOW}Starting Slice Machine...${NC}"
    if check_port; then
        echo -e "${RED}Port $PORT is already in use${NC}"
        return 1
    fi
    
    node scripts/slicemachine-wrapper.js &
    sleep 5
    
    if check_port; then
        echo -e "${GREEN}Slice Machine started successfully on http://localhost:$PORT${NC}"
        return 0
    else
        echo -e "${RED}Failed to start Slice Machine${NC}"
        return 1
    fi
}

show_status() {
    if check_port; then
        echo -e "${GREEN}Slice Machine is running on http://localhost:$PORT${NC}"
        lsof -i :$PORT
    else
        echo -e "${RED}Slice Machine is not running${NC}"
    fi
}

# Main script
case "${1:-start}" in
    start)
        start_slicemachine
        ;;
    stop)
        stop_slicemachine
        ;;
    restart)
        stop_slicemachine
        sleep 2
        start_slicemachine
        ;;
    status)
        show_status
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        echo "  start   - Start Slice Machine"
        echo "  stop    - Stop Slice Machine"
        echo "  restart - Restart Slice Machine"
        echo "  status  - Show Slice Machine status"
        exit 1
        ;;
esac 