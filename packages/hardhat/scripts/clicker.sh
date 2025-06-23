#!/bin/bash

# === Config ===
if [ -n "$INFURA_API_KEY" ]; then
  RPC_URL="https://sepolia.infura.io/v3/$INFURA_API_KEY"
elif [ -n "$ALCHEMY_API_KEY" ]; then
  RPC_URL="https://eth-sepolia.g.alchemy.com/v2/$ALCHEMY_API_KEY"
else
  echo "❌ Error: Please set either INFURA_API_KEY or ALCHEMY_API_KEY"
  exit 1
fi
CONTRACT="0xc6e28A99A04407BA45EdfA7E75dcE5E558eA845F"
PRIVATE_KEY="${PRIVATE_KEY:?You must set PRIVATE_KEY env var}"
FUNC=$1
USER=$2  # used for userClicks()

# === Check dependencies ===
if ! command -v cast &> /dev/null; then
  echo "cast not found. Install Foundry: https://book.getfoundry.sh/getting-started/installation"
  exit 1
fi

# === Functions ===

total_clicks() {
  echo "[*] Calling totalClicks()..."
  cast call --rpc-url "$RPC_URL" "$CONTRACT" "totalClicks()"
}

click() {
  echo "[*] Sending click()..."
  cast send --rpc-url "$RPC_URL" --private-key "$PRIVATE_KEY" "$CONTRACT" "click()"
}

get_user_clicks() {
  if [ -z "$USER" ]; then
    echo "Usage: $0 getUserClicks 0xYourAddress"
    exit 1
  fi
  echo "[*] Calling getUserClicks($USER)..."
  cast call --rpc-url "$RPC_URL" "$CONTRACT" "getUserClicks(address)" "$USER"
}

# === Dispatch ===

case "$FUNC" in
  totalClicks)
    total_clicks
    ;;
  click)
    click
    ;;
  getUserClicks)
    get_user_clicks
    ;;
  *)
    echo "Usage: $0 [totalClicks|click|getUserClicks] [optional address]"
    exit 1
    ;;
esac
