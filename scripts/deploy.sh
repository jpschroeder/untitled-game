#!/bin/bash

echo "Start ssh agent"
eval `ssh-agent`
ssh-add

echo "Copying files"
scp -r ./public root@pipeto.me:/root/data/untitled-game

echo "Set file permissions"
ssh root@pipeto.me 'find /root/data/untitled-game/public -type d -exec chmod 755 {} +'
ssh root@pipeto.me 'find /root/data/untitled-game/public -type f -exec chmod 644 {} +'

echo "Stop ssh agent"
killall ssh-agent
