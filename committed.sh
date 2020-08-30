#!/bin/sh

# git config user.name "AllStarGH";
# git config user.email "duernna@163.com";

# git remote add origin https://github.com/AllStarGH/independ-react-engineering.git


git add .
git commit -m 'add The user controller base on typescript.'

# error: 无法推送一些引用到 'https://github.com/AllStarGH/independ-react-engineering.git'
# 提示：更新被拒绝，因为您当前分支的最新提交落后于其对应的远程分支。
# resolved:
# git pull origin master --allow-unrelated-histories

git pull origin master

git push origin master
