# ベースイメージとしてUbuntuを使用
FROM --platform=linux/amd64 ubuntu:22.04

# 必要なパッケージをインストール
RUN apt-get update && \
    apt-get install -y git curl build-essential libssl-dev zlib1g-dev libffi-dev libncurses5-dev libncursesw5-dev wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Miniforgeのインストール
RUN wget https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh -O ~/miniforge.sh &&\
    /bin/bash ~/miniforge.sh -b -p /root/miniforge

# Miniforgeをパスに追加
ENV PATH="/root/miniforge/bin:${PATH}"

# Conda仮想環境の作成
RUN conda create --name myenv python=3.10
SHELL ["conda", "run", "-n", "myenv", "/bin/bash", "-c"]

# 仮想環境内のpipを使ってopen-interpreterをインストール
RUN /root/miniforge/envs/myenv/bin/pip install open-interpreter

# Flask アプリケーションのセットアップ
WORKDIR /app/backend
COPY backend/requirements.txt ./
RUN /root/miniforge/envs/myenv/bin/pip install --no-cache-dir -r requirements.txt
COPY backend/ ./

# Node.jsのバージョンを16.xにアップデート
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# React アプリケーションのセットアップ
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./

EXPOSE 3000 5000
CMD ["sh", "-c", "cd /app/frontend && npm start & conda run -n myenv python /app/backend/app.py"]

