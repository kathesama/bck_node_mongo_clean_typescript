#!/bin/bash
mongorestore --db cleanCode ./data/dump-db/cleanCode --drop --authenticationDatabase admin -u root -p pass12345
