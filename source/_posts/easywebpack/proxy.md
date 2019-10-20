
---
id: 685568
space: easywebpack
slug: proxy
url: /easywebpack/proxy
title: 域名代理
summary: 本地开发域名代理构建支持前提：代理域名能够映射到本机ip地址的功能需要你自己在电脑上面配置。如果是实际的存在的域名，理论上面就不需要自己配置域名映射。该功能只在 Egg 应用构建本地开发使用。在 Egg SSR 应用开发时，Egg 应用的访问地址， 静态资源构建的地址， HMR 地址都是 ip...
coverImage: null
createTime: 2019-08-24T08:47:00.000Z 
upateTime: 2019-08-24T08:47:00.000Z
wordCount: 1729
layout: doc
---

## 本地开发域名代理


### 构建支持

**前提：**

- 代理域名能够映射到本机ip地址的功能需要你自己在电脑上面配置。如果是实际的存在的域名，理论上面就不需要自己配置域名映射。

- 该功能只在 Egg 应用构建本地开发使用。


在 Egg SSR 应用开发时，Egg 应用的访问地址， 静态资源构建的地址， HMR 地址都是 ip, 不方便进行环境模拟测试，比如 cookie和登陆场景。

```javascript
// webpack.config.js
module.exports = {
  host: 'http://app.debug.com' // 只在 env: dev 方式生效, 这里 host 改成你自己的实际有效的域名地址。
}
```

- 应用访问的地址是： [http://app.debug.com](http://app.debug.com)

- HMR访问地址是：[http://app.debug.com:9000/__webpack_hmr](http://app.debug.com:9000/__webpack_hmr)



## nginx 和 dnsmasq 配合使用

在日常本地开发时,我们经常会遇到以下情况:

- 在H5本地开发页面, 经常遇到白名单(APP里面, 外部平台)和cookie问题

- 同样的包线上环境有问题,本地OK, 需要模拟线上环境


在这样的情况下,我们可以通过nginx和dnsmasq搭建本地搭建代理服务器, 把线上的域名请求映射到本机解决以上两个问题.


#### nginx域名代理转发

    如果mac系统,默认时安装了nginx, 可以通过 http://127.0.0.1 检查 nginx是否正常, 如果正常会显示 Welcome to nginx 信息<br />

#### 通过brew安装nginx

- brew 搜索软件


```bash
brew search nginx
```

- brew 安装软件

```bash
brew install nginx
```

- brew 卸载软件<br />

```bash
brew uninstall nginx
```

- brew 升级<br />

```bash
sudo brew update
```

- 查看安装信息(经常用到, 比如查看安装目录等)<br />

```bash
sudo brew info nginx
```

- 查看已经安装的软件<br />

```
brew list
```




#### nginx常用操作

- 启动nginx服务<br />

```bash
sudo brew services start nginx
```

- 查看nginx版本<br />

```bash
nginx -v
```

- 关闭nginx服务<br />

```bash
sudo brew services stop nginx
```

- 重新加载nginx


```bash
nginx -s reload
```

- 停止nginx<br />

```bash
nginx -s stop
```



#### nginx域名代理转发

- 进入nginx安装目录 `/usr/local/etc/nginx` , 我们看到servers目录下面有个 `default.conf`  配置80端口映射, 访问http://127.0.0.1时,会自动打开root对应目录的index.html文件<br />

- nginx启动时,会自动读取 `/usr/local/etc/nginx/server`  目录所有的server配置文件,文件名可以自由定义（**在 nginx.conf 里面include servers/***）

```makefile
server {
    listen 80 default_server;
    index index.html;
    root /usr/local/var/www;
    server_name 127.0.0.1;
}
```

- 自定义配置, [比如我想把](http://xn--proxy-gv5ip85bm9bf5al43d.test.cn) local.sky.com转发到本机的 `http://127.0.0.1:5000`  地址, 只需要在server目录下面增加文件5000.conf(文件名可自定义),然后增加一下配置:

- ```
server {
    listen 80;
    server_name  local.sky.com local.sky.cn;
    location / {
      proxy_redirect off;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_pass http://127.0.0.1:5000;
   }
   access_log /Users/caoli/dev/log/proxy.log;
}
```



- 打开 **/private/etc/hosts** 文件，添加如下内容：

```
127.0.0.1       localhost
::1             localhost
127.0.0.1       local.sky.com
127.0.0.1       local.sky.cn
```

最后通过 `nginx -s reload`  命令重启nginx, [然后在浏览器地址栏就可以通过](http://xn--proxy-ok2h341acho7q34btc6in64dgg3b5pqvioir2hwtwabnb.test.cn/) local.sky.com 访问 http://127.0.0.1:5000了. 通过以上配置就可以解决电脑端域名映射和cookie等问题.  如果不配置 nginx，可以通过 http://proxy.test.cn:5000 访问， 配置 nginx 后，可以直接 local.sky.com  访问。



### nginx https 配置

- cd /usr/local/etc/nginx/
- openssl genrsa -des3 -out server.key 1024     （输入密码 123456）
- openssl req -new -key server.key -out server.csr     
- 填写证书注册信息
  - Country Name(国家：中国填写CN) 
  - State or Province Name(区域或是省份：GuangDong) 
  - Locality Name(地区局部名字：GuangZhou) 
  - Organization Name(机构名称：sky.com) 
  - Organizational Unit Name(组织单位名称:部门名称) 
  - Email Address(邮箱地址) 
  - A challenge password(密码  123456 ) 
- 生成server.crt文件
  - cp server.key server.key.org
  - openssl rsa -in server.key.org -out server.key
  - openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
- 点击 /usr/local/etc/nginx/server.crt，注册系统证书目录
- nginx 开启 ssl

```bash
server {
   listen 80;
   server_name  local.sky.com  local.sky.cn;
   location / {
      proxy_redirect off;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_pass http://127.0.0.1:7001;
   }
   access_log /usr/local/etc/nginx/logs/local-7001.log;
}
 # HTTPS server
    
server {
   listen       443 ssl;
   server_name  local.sky.com  local.sky.cn;

   ssl_certificate      /usr/local/etc/nginx/server.crt;
   ssl_certificate_key  /usr/local/etc/nginx/server.key;

   ssl_session_cache    shared:SSL:1m;
   ssl_session_timeout  5m;

   ssl_ciphers  HIGH:!aNULL:!MD5;
   ssl_prefer_server_ciphers  on;

   location / {
      proxy_redirect off;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_pass http://127.0.0.1:7001;
   }
}
```

- nginx -s reload


## dnsmasq 搭建 DNS 服务

- 安装dnsmasq


```bash
brew install dnsmasq
```

- 重启 dnsmasq


```bash
sudo brew services restart dnsmasq
```

- dnsmasq的设置


**拷贝并重命名/usr/local/opt/dnsmasq/dnsmasq.conf.example -> /usr/local/etc/dnsmasq.conf。**

```bash
cp /usr/local/opt/dnsmasq/dnsmasq.conf.example /usr/local/etc/dnsmasq.conf
```

- 新建resolv.dnsmasq.conf文件用来指定域名解析服务器地址的<br />

```bash
cd /usr/local/etc
vim resolv.dnsmasq.conf
```

- 把常用的DNS服务器的地址保存到resolv.dnsmasq.conf<br />

```bash
nameserver 8.8.8.8
nameserver 8.8.4.4
```

修改 `/usr/local/etc/dnsmasq.conf` 的 `resolv-file` , `address` , `listen-address` , `strict-order` , `no-hosts`  配置项, 如果没有请添加, 如果是#注释,请取消注释

```bash
#no-hosts
no-hosts

#strict-order
strict-order

#resolv-file
resolv-file=/usr/local/etc/resolv.dnsmasq.conf

# web-server
address=/local.sky.com/192.168.1.1
address=/local.sky.cn/192.168.1.1

# listen-address 192.168.1.1 为本机ip
listen-address=127.0.0.1,192.168.1.1
```


#### DNS服务的启用


##### 开机启动dns服务
```bash
sudo cp -fv /usr/local/opt/dnsmasq/*.plist /Library/LaunchDaemons
sudo lauchctl load /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist

sudo launchctl stop homebrew.mxcl.dnsmasq
sudo launchctl start homebrew.mxcl.dnsmasq
sudo killall -HUP mDNSResponder
```

#### 启动
```bash
sudo brew services start dnsmasq
```


##### 检查域名映射和DNS配置

##### 启动本机服务127.0.0.1:5000服务后, 检查host映射

```bash
curl 127.0.0.1 -H "Host:proxy.test.com"
```


##### 检查域名映射是否解析到本机ip

```bash
dig proxy.test.com @0.0.0.0
```


#### 手机代理设置

Android 手机使用DNS服务, 请安装Fast DNS Change APK, 把自己的本机IP添加到DNS列表中,如果需要用本机DNS,请双击会显示已Connnected到本机DNS, 再次点击Disconnnected<br />[https://apkpure.com/cn/fast-dns-changer-no-root/com.mustafademir.fastdnschanger](https://apkpure.com/cn/fast-dns-changer-no-root/com.mustafademir.fastdnschanger)

iOS 手机使用DNS服务, 把自己本机的ip填写到 DNS列表中, DNS的地址之间要用逗号间隔一下.<br />[http://jingyan.baidu.com/article/dca1fa6f44c664f1a5405244.html](http://jingyan.baidu.com/article/dca1fa6f44c664f1a5405244.html)

如果你愿意付费,可以安装个IOS APP: DNS Override，可以一键开启 dns 设置.

PC访问<br />[http://jingyan.baidu.com/article/fc07f9891f626712ffe519cf.html](http://jingyan.baidu.com/article/fc07f9891f626712ffe519cf.html)

DNS配置以后, 就可以在手机上面通过域名([http://proxy.test.com:5000](http://proxy.test.com:5000) 和 [http://proxy.test1.com:5000](http://proxy.test1.com:5000)) 访问, 然后映射到本机服务 [http://127.0.0.1:5000](http://127.0.0.1:5000).


### 接口代理

easywebpack 4 版本支持了本地接口代理转发的功能, 主要解决本地开发跨域问题. 具体见：[https://easy-team.github.io/easywebpack/ed847g](https://easy-team.github.io/easywebpack/ed847g)



  