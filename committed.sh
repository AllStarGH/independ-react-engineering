#!/bin/sh

git config user.name "AllStarGH";
git config user.email "duernna@163.com";

git remote add origin https://github.com/AllStarGH/independ-react-engineering.git


git add .
git commit -m '艰难地完成了自定义首页及路由配置(对初学者),可以进行首次提交了.'
git pull origin master

git push origin master