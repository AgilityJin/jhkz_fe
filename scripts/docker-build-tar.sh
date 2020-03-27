# Example:
# 第一步: 本地build tar文件
# sh ./scripts/docker-build-tar.sh testing
# 第二步: 容器云平台执行构建发布即可

set -e

# 获取当前脚本目录
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$DIR" || exit

yarn config set registry http://r.cnpmjs.org/
yarn install --network-timeout 1000000
echo "Current build system info: "
yarn -v
npm -v
node -v

# Build
cd ../packages/admin
rm -rf ./dist
if [[ $1 =~ ^production$ ]]; then
  yarn generate
else
  yarn generate
fi
cd ../../scripts

cd ../packages/official
rm -rf ./dist
if [[ $1 =~ ^production$ ]]; then
  yarn generate
else
  yarn generate
fi
cd ../../scripts

# clean files
rm -rf ../docker/admin
rm -rf ../docker/official
mkdir -p ../docker/admin
mkdir -p ../docker/official

# c建立压缩文件 z使用gzip f文件名 -C改变工作目录 . 指明压缩此处所有文件
tar -czf ../docker/official/jhkz-official.tar.gz -C ../packages/official/dist/ .
tar -czf ../docker/admin/jhkz-admin.tar.gz -C ../packages/admin/dist/ .
