#!/bin/bash

echo "Start ssh agent"
eval `ssh-agent`
ssh-add

## Deployment

echo "Create destination folder"
ssh root@pipeto.me 'mkdir /root/data/untitled-game'

echo "Copying files"
scp -r ./public root@pipeto.me:/root/data/untitled-game

echo "Set file permissions"
ssh root@pipeto.me 'find /root/data/untitled-game/public -type d -exec chmod 755 {} +'
ssh root@pipeto.me 'find /root/data/untitled-game/public -type f -exec chmod 644 {} +'

### Nginx

# echo "Make sure that nginx is installed"
# ssh root@pipeto.me 'apt-get install -y nginx'

echo "Copy nginx config"
scp ./scripts/untitled-game.nginx.conf root@pipeto.me:/etc/nginx/sites-available/untitled-game.nginx.conf

echo "Enable the nginx"
ssh root@pipeto.me 'ln -s /etc/nginx/sites-available/untitled-game.nginx.conf /etc/nginx/sites-enabled/untitled-game.nginx.conf'

echo "Restart nginx to pick up the changes"
ssh root@pipeto.me 'systemctl restart nginx'

### Nginx Https

# echo "Install letsencrypt client"
# ssh root@pipeto.me 'add-apt-repository ppa:certbot/certbot'
# ssh root@pipeto.me 'apt-get install python-certbot-nginx'

echo "Generate and install certificate"
ssh root@pipeto.me 'certbot --nginx -d game.pipeto.me'


echo "Stop ssh agent"
killall ssh-agent
