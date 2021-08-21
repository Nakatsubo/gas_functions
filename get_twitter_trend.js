// Twitterのトレンドを取得して、スプレッドシートに書き込む
// API KEY
const TWITTER_API_KEY = '';
// API SECRET KEY
const TWITTER_APT_SECRET = '';

// BEARER トークンを取得
function searchTwitterApp() {
  let blob = Utilities.newBlob(TWITTER_API_KEY + ':' + TWITTER_APT_SECRET);
  let credential = Utilities.base64Encode(blob.getBytes());

  let formData = {
    'grant_type': 'client_credentials'
  };

  let basic_auth_header = {
    'Authorization': 'Basic ' + credential
  };

  let options = {
    'method': 'post',
    'contentType': 'application/x-www-form-urlencoded;charset=UTF-8',
    'headers':  basic_auth_header,
    'payload': formData,
  };

  let oauth2_response = UrlFetchApp.fetch('https://api.twitter.com/oauth2/token', options);
  let bearer_token = JSON.parse(oauth2_response).access_token;

  return bearer_token;
}

// トレンドデータを取得
function getTwitterTrend() {
  let bearer_token = searchTwitterApp();
  // jp
  let areaId = '2345896';
  let bearer_auth_header = {
    'Authorization': 'Bearer ' + bearer_token
  };
  let response = UrlFetchApp.fetch('https://api.twitter.com/1.1/trends/place.json?id=' + areaId + '&count=10', { 'headers': bearer_auth_header });
  data = JSON.parse(response);
  return data;
}

// スプレッドシートに書き込み
function addSpreadSheet() {
  let data = getTwitterTrend();

  // date
  let date = new Date();
  let now = date.toLocaleString('ja');

  let dataset = [now];
  data[0].trends.forEach((trend) => {
    let name = trend.name;
    dataset.push(name);
  })

  // sheet
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let lastRow = sheet.getLastRow();
  let range = sheet.getRange(lastRow + 1, 1, 1, dataset.length)

  range.setValues([dataset]);
}
