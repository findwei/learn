#!/bin/bash

# 执行 git add .
echo "Executing 'git add .'"
git add .

# 执行 git commit
echo "Executing 'git commit'"
git commit -m 'fix:更新'

# 执行 git push
echo "Executing 'git push'"
git push
git push github

# 完成
echo "All steps completed!"
