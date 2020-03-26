set -e

# Example:
# sh ./scripts/docker-build.sh nginx.conf 0.0.1 testing
# run docker run -d -p 3100:3100 -p 3200:3200 --restart always --name=jhkz-fe registry.cn-hangzhou.aliyuncs.com/agility_jin/jhkz_fe:0.0.1

docker_user=17621667884
docker_password=w8TzqkhrBkgMz6oGXkhECF
docker_image=jhkz_fe
docker_version=$2 || latest

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
if [[ $3 =~ ^production$ ]]; then
  yarn build
else
  yarn build
fi
cd ../../scripts

cd ../packages/official
rm -rf ./dist
if [[ $3 =~ ^production$ ]]; then
  yarn build
else
  yarn build
fi
cd ../../scripts

# clean files
rm -rf ../docker/admin/dist
rm -rf ../docker/official/dist
mkdir -p ../docker/admin/dist
mkdir -p ../docker/official/dist

# c建立压缩文件 z使用gzip f文件名 -C改变工作目录 . 指明压缩此处所有文件
tar -czf ../docker/official/dist/jhkz-official.tar.gz -C ../packages/official/dist/ .
tar -czf ../docker/admin/dist/jhkz-admin.tar.gz -C ../packages/admin/dist/ .

docker login -u $docker_user -p $docker_password registry.cn-hangzhou.aliyuncs.com
docker build -t "registry.cn-hangzhou.aliyuncs.com/agility_jin/$docker_image:$docker_version" --build-arg "NGINX_CONF_FILE=$1" ../docker
docker push "registry.cn-hangzhou.aliyuncs.com/agility_jin/$docker_image:$docker_version"
docker image rm "registry.cn-hangzhou.aliyuncs.com/agility_jin/$docker_image:$docker_version"
