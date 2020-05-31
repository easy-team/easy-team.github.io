
---
id: 1034985
space: blog
slug: gayu0o
url: /blog/gayu0o
title: Docker 随记
summary: 
coverImage: null
createTime: 2018-12-07T02:10:36.000Z 
upateTime: 2019-06-15T16:43:26.000Z
wordCount: 852
layout: doc
---

# 安装docker: 
- Docker：[https://download.docker.com/mac/stable/Docker.dmg](https://download.docker.com/mac/stable/Docker.dmg)

- Docker GUI： [https://github.com/docker/kitematic/releases](https://github.com/docker/kitematic/releases)




## Docker 服务管理

```bash
docker run -d --name gitlab-runner 
--restart always 
-v /Users/sky/dev/docker/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner:latest
docker exec -it gitlab-runner gitlab-runner register
```

- Pull the latest version:


```bash
docker pull gitlab/gitlab-runner:latest
```

- Stop and remove the existing container:


```bash
docker stop gitlab-runner && docker rm gitlab-runner
```

- 要从 Docker Hub 取得最新的稳定版 CentOS 官方映像：


```bash
sudo docker pull centos:latest
sudo docker pull centos:centos6
```

- 测试centos是否可以运行成功：


```bash
sudo docker images centos
```

- 要查看已下载至本地的映像：


```bash
sudo docker images centos
```

- 要通过 docker 执行基本的 cat 指令：


```bash
sudo docker run centos:latest cat /etc/centos-release
sudo docker run -i -t centos7 /bin/bash
```

一切正常的话，你会看到一个终端提示符，然后你就可以像操作任何CentOS机器一样进行你的体验。


## Run a Hello world

- docker run runs a container.


> centos:centos7 is the image you run, for example the centos operating system image. 
When you specify an image, Docker looks first for the image on your Docker host. 
If the image does not exist locally, then the image is pulled from the public image 
registry Docker Hub. /bin/echo is the command to run inside the new container.


```bash
docker run centos:centos7  /bin/echo 'Hello world’
```

- docker ps


> The docker ps command queries the Docker daemon for information about all the 
containers it knows about.


```bash
docker ps
```

- docker logs


```bash
docker logs CONTAINERID
```

- Running a web application in Docker


```bash
docker run -d -P centos:centos7 python app.py
```


## 查找docker images

> [https://hub.docker.com/explore/](https://hub.docker.com/explore/)


$ docker search


## 更新ubuntu image

```bash
docker run -t -i ubuntu  /bin/bash
```

```bash
root@00ee3e6b6450:/# apt-get install -g nodejs

root@00ee3e6b6450:/# apt-get update

root@00ee3e6b6450:/# apt-get install -y nodejs npm git

root@00ee3e6b6450:/# exit
```

```bash
docker commit -m "apt-get node install" -a "sky"
```


## Building an image from a Dockerfile

$ mkdir docker-sky-dev<br />$ cd docker-sky-dev

```bash
docker run -t -i centos:centos7  /bin/bash

// 编译docker image
docker build --rm -t  docker-sky-centos .


gitlab-ci-multi-runner unregister --url http://gitlab.xxxx.com/ci --token xxxxxxx
```


## docker强制批量删除none的image镜像

```bash
docker ps -a | grep "Exited" | awk '{print $1 }'|xargs docker stop
docker ps -a | grep "Exited" | awk '{print $1 }'|xargs docker rm
docker images|grep none|awk '{print $3 }'|xargs docker rmi -f
```


## install node.js


```bash
wget http://nodejs.org/dist/v6.7.0/node-v6.7.0-linux-x64.tar.gz

tar --strip-components 1 -xzvf node-v* -C /usr/local

node --version
```


## install nvm

```bash
wget https://github.com/cnpm/nvm/archive/v0.23.0.tar.gz  -P /opt/download

tar --strip-components 1 -xzvf /opt/download/v0.23.0.tar.gz -C /opt/download

cd /opt/download

./install.sh

source ~/.nvm/nvm.sh

nvm install 8.13.0

nvm alias default 8.13.0


## install electron


yum install clang dbus-devel gtk2-devel libnotify-devel libgnome-keyring-devel \
                   xorg-x11-server-utils libcap-devel cups-devel libXtst-devel \
                   alsa-lib-devel libXrandr-devel GConf2-devel nss-devel libgtk-x11-2.0.so.0 libXss.so

npm install electron -g


## yum

> http://repository.it4i.cz/mirrors/repoforge/redhat/el6/en/x86_64/
rpmforge/RPMS/rpmforge-release-0.5.3-1.el6.rf.x86_64.rpm

yum whatprovides

// 安装 example.rpm 包并在安装过程中显示正在安装的文件信息及安装进度；
rpm -ivh example.rpm 

yum groupinstall "Development Tools"
dnf groupinstall "Development Tools"
```

[https://www.centos.org/forums/viewtopic.php?t=52129](https://www.centos.org/forums/viewtopic.php?t=52129)


## 安装 bzip2

```bash
wget http://www.bzip.org/1.0.6/bzip2-1.0.6.tar.gz
tar xf bzip2-1.0.6.tar.gz
cd bzip2-1.0.6
make
make install

yum install rpm-devel
yum install libxml2 libxslt
```


## DockerFile

```bash
# 设置基础镜像
FROM ubuntu:latest

# 如果上个步骤已经更新软件源，这步可以忽略
RUN apt-get update

# 安装 NodeJS 和 npm
RUN apt-get install -y nodejs npm

# 将目录中的文件添加至镜像的 /srv/hello 目录中
ADD . /srv/hello

# 设置工作目录
WORKDIR /srv/hello

# 安装 Node 依赖库
RUN npm install

# 暴露 3001 端口，便于访问
EXPOSE 3001

# 设置启动时默认运行命令
CMD ["nodejs”, “/srv/hello/index.js"]
```


  