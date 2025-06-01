#!/bin/bash

if [ -z "$1"]; then
  echo "Error: Debes proporcionar una carpeta para el archivo."
  exit 1
fi

if [ -z "$2" ]; then
  echo "Error: Debes proporcionar un nombre de archivo."
  echo "Uso: ./crear_test.sh nombre_archivo"
  exit 1
fi

if [ -f "src/tests/$1/$2" ]; then
  echo "El archivo src/tests/$1/$2 ya existe."
  exit 1
fi

mkdir -p "src/tests/$1"
touch "src/tests/$1/$2"
echo "Archivo src/test/$1/$2 creado."