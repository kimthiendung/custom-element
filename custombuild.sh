#!/bin/sh
npm run build && cp -vr dist/img preview/img && find dist/ -name '*.js' -exec cat {} \; > preview/dist.js
