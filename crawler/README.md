# pluto-server

## AWS접속

1. cd /Users/koreanhole/Documents/appKeys
2. ssh -i awsKey.pem ubuntu@{AWS 퍼블릭 IPv4 DNS}

## Jupyter Notebook 백그라운드 실행

1. sudo jupyter-notebook --allow-root
2. [Ctrl] + Z 입력하여 실행 종료하기
3. bg
4. disown -h
5. 웹 브라우저에서 {AWS 퍼블릭 IPv4 DNS}:8888로 Jupyter Notebook 접속
