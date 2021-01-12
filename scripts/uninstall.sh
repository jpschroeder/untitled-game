#!/bin/bash

echo "Start ssh agent"
eval `ssh-agent`
ssh-add

### Nginx

echo "Remove nginx config"
ssh root@pipeto.me 'rm /etc/nginx/sites-enabled/untitled-game.nginx.conf'
ssh root@pipeto.me 'rm /etc/nginx/sites-available/untitled-game.nginx.conf'

echo "Restart nginx to pick up the changes"
ssh root@pipeto.me 'systemctl restart nginx'

### Deployment

ssh root@pipeto.me 'rm -rf /root/data/untitled-game'


echo "Stop ssh agent"
killall ssh-agent
