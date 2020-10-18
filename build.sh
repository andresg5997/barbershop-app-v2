SALON_ID=$1
API_URL=$2

# if 1 parameter then is SALON_URL

if [ -z "$SALON_ID" ]
then
  echo "SALON_ID or SALON_URL variable is required"
  exit 0
fi

if [ -z "$API_URL" ]
then
  sed -ie "1s/.*/const salonUrl = '$SALON_ID';/" ./imports.js
else
  sed -ie "2s/.*/const salonId = '$SALON_ID';/" ./imports.js
  sed -ie "3s/.*/const apiUrl = '$API_URL';/" ./imports.js
fi
