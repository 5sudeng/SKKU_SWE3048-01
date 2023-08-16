const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('C:/HOME/TeamProject', { origin: true }));


app.get('/mypage', (req, res) => {
  try {
      const fileContent = fs.readFileSync('MyPage.json', 'utf-8');
      const existingData = JSON.parse(fileContent);
      res.json(existingData);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


let existingData = [];
try {
    const fileContent = fs.readFileSync('MyPage.json', 'utf-8');
    existingData = JSON.parse(fileContent);
    } catch (error) {
    // 파일이 존재하지 않거나 읽을 수 없는 경우, 초기 데이터로 시작
    existingData = [];
    }

app.post('/save-notice', (req, res) => {
  const notice = req.body.notice;
  existingData.push(notice);
  const jsonData = JSON.stringify(existingData, null, 2);

  fs.writeFile('MyPage.json', jsonData, (err) => {
    if (err) {
      console.error('MyPage.json에 쓰는 중 오류 발생:', err);
      res.sendStatus(500);
    } else {
      console.log('공지가 MyPage.json에 저장되었습니다.');
      res.sendStatus(200);
    }
  });
});


app.listen(3000, () => {
  console.log('서버가 포트 3000에서 실행 중입니다.');
});
