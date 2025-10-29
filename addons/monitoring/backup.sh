#!/usr/bin/env bash
set -euo pipefail
DATE=$(date +%Y%m%d-%H%M)
TARGET_DIR=${BACKUP_DIR:-./backups}
mkdir -p "$TARGET_DIR"

ARCHIVE="$TARGET_DIR/fermesurbaines-addons-$DATE.tar.gz"
tar -czf "$ARCHIVE" addons addons/admin/leads.csv

find "$TARGET_DIR" -type f -mtime +7 -delete
