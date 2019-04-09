FROM registry.lierda.com/senthink/node:8
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/Shanghai" > /etc/timezone
WORKDIR /home/node/
ADD ./ /home/node/
RUN ["chown", "-R", "node:node", "/home/node/"]
RUN ["npm", "config", "set", "registry", "https://registry.npm.taobao.org"]
RUN ["npm", "install"]
CMD ["npm", "start"]
EXPOSE 8099