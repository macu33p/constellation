#!/bin/zsh
cd -- "${0:A:h}"
print 'Constellation: http://127.0.0.1:4173'
print 'Keep this window open while using the dashboard. Press Control-C to stop.'
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
