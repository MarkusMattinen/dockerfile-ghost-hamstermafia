# hamstermafia theme, ghost, node.js, nginx, etcd registration and supervisord on trusty
FROM markusma/nginx-etcd:trusty

RUN add-apt-repository -y ppa:chris-lea/node.js \
 && apt-get update \
 && apt-get install -y --no-install-recommends postgresql libpq-dev build-essential nodejs git imagemagick inotify-tools \
 && git clone -b stable https://github.com/TryGhost/Ghost.git /ghost \
 && cd /ghost/ \
 && npm install -g grunt-cli bower 2>&1 \
 && npm install 2>&1 >/dev/null \
 && npm install pg 2>&1 >/dev/null \
 && bower --allow-root install \
 && grunt init \
 && grunt prod \
 && apt-get purge -y postgresql build-essential git \
 && apt-get autoremove -y \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD config/ghost /ghost

RUN cd /ghost/content/themes/slimpost \
 && apt-get update \
 && apt-get install -y --no-install-recommends build-essential git \
 && npm install \
 && npm install -g bower-installer \
 && bower-installer \
 && grunt \
 && npm uninstall -g bower-installer \
 && apt-get purge -y build-essential git \
 && apt-get autoremove -y \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD config/etc/supervisor/conf.d /etc/supervisor/conf.d
ADD config/etc/confd /etc/confd
ADD config/usr/local/bin/wait-generate-thumbs /usr/local/bin/wait-generate-thumbs

ENV NODE_ENV production

WORKDIR /ghost
EXPOSE 5000
VOLUME [ "/ghost/content/images" ]
