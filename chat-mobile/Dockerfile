# 第一阶段：构建阶段
FROM node:18 AS builder

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . .

# 安装依赖并构建静态文件
RUN yarn install
RUN yarn build

# 第二阶段：最终镜像
FROM nginx:1.27.3-alpine


# 复制构建完成的静态文件到 Nginx 的公共目录
# 这个地方需要根据package.json的配置去更改最终静态的文件夹名称,因为部分脚手架无法通过环境变量去修改打包的静态文件夹名称
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露 Nginx 的默认端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
