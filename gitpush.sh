#!/bin/bash

commitmsg=$1

if [ -z "$commitmsg" ]; then
	echo "Provide a commit message."
	exit 1
fi

git pull
git add .
git commit -m "$commitmsg"
git push
