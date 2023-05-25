#!/bin/bash -e
# 项目发布到服务器脚本
# 作者：webber
# 日期：2023-05-25
# 版本：v1.0.0

# 项目打包前端文件时间戳
file_prefix=$(date '+%y%m%d%H%M%S')
# 项目打包前端文件名称、
file_name=${file_prefix}-dist.tar.gz
# 远程服务器地址
remote=admin.webber.run
# 远程服务器项目路径
remote_project_path=/www/wwwroot/webber


echo '压缩打包开始....'
tar -zcvf './'$file_name ./docs >/dev/null
echo '压缩完成，复制文件到服务器'
scp './'$file_name root@$remote:$remote_project_path
echo '文件上传服务器成功'
echo '删除本地打包文件'$file_name
rm './'$file_name
echo '删除成功'

echo '删除服务器现有文件'
ssh root@$remote 'rm -rf '$remote_project_path'/docs'
echo '删除成功'
echo '解压新文件'
ssh root@$remote 'tar -xzvf '$remote_project_path'/'$file_name' -C '$remote_project_path' >/dev/null'
echo '解压新文件成功'
echo '删除本次上传服务器的文件'$file_name
ssh root@$remote 'rm -rf '$remote_project_path'/'$file_name
echo '删除成功'

# echo '重启Nginx'
# ssh root@$remote 'nginx -s reload'
# echo 'Nginx 重启完成'

