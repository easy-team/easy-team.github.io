
---
id: 1028464
space: blog
slug: vfhw62
url: /blog/vfhw62
title: Git 使用技巧
summary: 原文： https://hubcarl.github.io/blog/2017/09/23/git/Git保存用户名密码git config credential.helper storeGit分支批量清理本地分支git branch | grep -E feature\/(1\.|activi...
coverImage: null
createTime: 2019-10-18T09:24:35.000Z 
upateTime: 2019-10-18T09:24:35.000Z
wordCount: 983
layout: doc
---
> 原文： [https://hubcarl.github.io/blog/2017/09/23/git/](https://hubcarl.github.io/blog/2017/09/23/git/)



### Git保存用户名密码

```
git config credential.helper store
```


### Git分支批量清理


### 本地分支

```bash
git branch | grep -E feature\/(1\.|activity|btn_s|refresh|share|3\.1)|xargs git branch -D

git branch | grep -E develop\/(test|script_inline|egg3|3\.1)|xargs git branch -D

git branch | grep -E release\/|xargs git branch -D

// 删除除master的本地分支
git branch | grep -v 'master'|xargs git branch -D

// -v 取反
git branch | grep -v 'master\|feature\/benchmark\|feature\/async-component'

// 取反删除
git branch | grep -v 'master\|feature\/benchmark\|feature\/async-component'|xargs git branch -D
```


### 远程分支

```bash
// 查找取反显示
git branch -r| grep -v 'master\|feature\/benchmark\|feature\/async-component'


git branch -r | grep -v 'master\|feature\/benchmark\|feature\/async-component' | awk '{print $1}'

// 查找取反
git branch -r| grep -v 'master\|feature\/benchmark\|feature\/async-component\|develop\/stearmrender'

// 查找
git branch -r| grep -E 'master|feature\/benchmark|feature\/async-component|develop\/stearmrender'


// 筛选远程分支
git branch -r| awk -F '[/]' '/release|hotfix/ {printf "%s/%s\n",$2,$3}' 

// 删除远程分支
git branch -r| awk -F '[/]' '/release|hotfix/ {printf "%s/%s\n",$2,$3}'|xargs -i {} git push origin :{}

git branch -r |awk -F '[/]' '/(master|feature\/benchmark|feature\/async-component)/
{printf "%s/%s/%s\n", $2,$3,$4}' 

git branch -r |awk -F '[/]' '/(master|feature\/benchmark|feature\/async-component)/
{printf "%s/%s/%s\n", $2,$3,$4}' |xargs -I {} git push origin :{}

// 终极取反筛选查找
git branch -r| grep -v 'master\|feature\/benchmark\|feature\/develop\/stearmrender'|
awk -F '[/]' '/\// {printf "%s/%s\n", $2,$3}'

// 终极取反筛选查找删除
git branch -r| grep -v 'master\|feature\/benchmark\|feature\/|develop\/stearmrender'|
awk -F '[/]' '/\// {printf "%s/%s\n", $2,$3}' |xargs -I {} git push origin :{}


// 分支格式： feature/test，  删除远程除master的分支
git branch -r| grep -v 'master'|awk -F '[/]' '/\// {printf "%s/%s\n", $2,$3}' |
xargs -I {} git push origin :{}

// 分支格式： feature/test/test，  删除远程除master的分支
git branch -r| grep -v 'master'|awk -F '[/]' '/\// {printf "%s/%s/%s\n", $2,$3,$4}' | 
xargs -I {} git push origin :{}

// 分支格式： feature/test/test/test，  删除远程除master的分支
git branch -r| grep -v 'master'|awk -F '[/]' '/\// {printf "%s/%s/%s/%s\n", $2,$3,$4,$5}' |
xargs -I {} git push origin :{}



// 运行git fetch -p 同步最新远程分支
```


### curl

curl -Lo /dev/null -skw "time_connect: %{time_connect} 
s\ntime_namelookup: %{time_namelookup} 
s\ntime_pretransfer: %{time_pretransfer} 
s\ntime_starttransfer: %{time_starttransfer} 
s\ntime_redirect: %{time_redirect} 
s\nspeed_download: %{speed_download} B/s\ntime_total: %{time_total} s\n\n"


### git commit 规范

（1）type

提交 commit 的类型，包括以下几种

- feat: 新功能

- fix: 修复问题

- docs: 修改文档

- style: 修改代码格式，不影响代码逻辑

- refactor: 重构代码，理论上不影响现有功能

- perf: 提升性能

- test: 增加修改测试用例

- chore: 修改工具相关（包括但不限于文档、代码生成等）

- deps: 升级依赖


（2）scope<br />修改文件的范围（包括但不限于 doc, middleware, proxy, core, config, plugin）

（3）subject<br />用一句话清楚的描述这次提交做了什么


### changelog

- git-extras


```bash
brew install git-extras

git-extras 命令生成 changelog 和 release 自动打 tag & push & trigger hook

$ git changelog # 需要修改 
Histroy.md 和 package.json 的版本号，如需要发布 1.0.0 $ git release 1.0.0

提交规范实例：git commit -m  'fix($guild): solve bugs'
```

- conventional-changelog-cli


```json
{
 "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
  },
}
```



### 如果一个包发布在 NPM / TNPM 中，可以快速修改其package.json版本号。会自动触发一个 git 提交。

- 递增一个修订号 npm version patch

- 递增一个次版本号 npm version minor

- 递增一个主版本号 npm version major



### merge request

**合并commit message**

git rebase -i HEAD~3

- pick

- edit

- squash


[https://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E5%86%99%E5%8E%86%E5%8F%B2](https://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E5%86%99%E5%8E%86%E5%8F%B2)

**修复问题发布一个npm版本**

1. checkout new branch

2. 修改代码，提交 git commit -m  'fix($guild): solve bugs’

3. git changelog  需要修改 [Histroy.md](http://Histroy.md) 和 package.json 的版本号，如需要发布 1.0.0

4. npm version patch 升级一个小版本

5. git release 1.0.0  (自动打 tag & push & trigger hook)

6. npm publish 发布一个版本




##### 撤销commit

- git reset --soft HEAD^1  撤销 最新 1次 commit，代码保留
- git reset --hard HEAD^1 删除改动代码，撤销 commit 和 add ， 这样就恢复到了上一次的commit状态。


##### 修改 commit信息

- git commit --amend


  