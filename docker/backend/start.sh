#!/bin/bash

mkdir -p logs

pip install --pre -U -r /app/src/.meta/packages.dev

gunicorn app:app -c gunicorn.conf.py --reload