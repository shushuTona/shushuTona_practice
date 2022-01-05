# ts_sandbox

軽いかんじでTypeScriptを試す環境

## 公式ドキュメント
[https://www.typescriptlang.org/](https://www.typescriptlang.org/)

## 環境準備

### 1. ホストPCでプロジェクトルートに移動

> cd ts_sandbox

### 2. docker imageをビルドする

> docker-compose build

### 3. dockerコンテナ起動

> docker-compose up -d

### 4. npmパッケージインストール

3で起動したコンテナに入って、下記実行

> cd /var/ts_sandbox/ts_practice

> npm i

### 5. ローカルサーバー起動

> npm run dev
