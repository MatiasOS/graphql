#!/usr/bin/env bash

cd server01 && npm run build && docker build -t matiasos/server01:0.0.1 . && cd ..
cd server02 && npm run build && docker build -t matiasos/server02:0.0.1 . && cd ..