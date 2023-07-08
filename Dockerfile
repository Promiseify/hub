# 基础镜像（Base Image）：使用FROM指令指定构建镜像所基于的基础镜像。基础镜像通常包含操作系统和一些预安装的软件。
FROM node:18

# 工作目录（Working Directory）：使用WORKDIR指令设置容器内部的工作目录，所有后续的指令都会在该目录下执行。
WORKDIR /app

# 复制文件（Copy Files）：使用COPY指令将本地文件复制到容器中的指定位置。
COPY package*.json ./
# 安装依赖（Install Dependencies）：使用RUN指令执行命令，通常用于安装应用程序的依赖项。
RUN npm install nodemon -g
RUN npm install

COPY . .
# 运行命令（Run Command）：使用CMD指令定义容器启动后要执行的命令。
CMD ["npm", "start"]