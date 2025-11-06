#!/bin/bash

URL="http://45.127.134.35:8888/index.php/input_absen_pkl"
SISWA=("AKS23240118" "AKS23240073")
KD_DUDI="08235003"
LOKASI="Dalam Area PKL"
LAT="-7.6517789"
LONG="111.530363"

DATE=$(date +%F)
JAM_ABSEN="17:00:00"
LOG_FILE="$HOME/absen_log.txt"

for FK_SISWA in "${SISWA[@]}"; do
  echo "[$(date)] Mengirim absen untuk $FK_SISWA ($JAM_ABSEN)" >> "$LOG_FILE"

  curl -s -X POST "$URL" \
    -H "Content-Type: application/json" \
    -d "{
      \"fk_siswa\": \"$FK_SISWA\",
      \"kd_dudi\": \"$KD_DUDI\",
      \"jam_absen\": \"$JAM_ABSEN\",
      \"tanggal_absen\": \"$DATE\",
      \"lokasi_absen\": \"$LOKASI\",
      \"lat\": \"$LAT\",
      \"long\": \"$LONG\"
    }" \
    >> "$LOG_FILE" 2>&1

  echo -e "\n---\n" >> "$LOG_FILE"
done

echo "Selesai absen pada $(date)" >> "$LOG_FILE"

if command -v notify-send &> /dev/null; then
  notify-send "Absen PKL" "Absen jam $JAM_ABSEN berhasil terkirim untuk semua siswa."
fi
