// スプレッドシートから値を取得し、JSONフォーマットでダウンロードする
function convertToJson() {
  let dialog_html = HtmlService.createTemplateFromFile('dialog').evaluate();

  SpreadsheetApp.getUi().showModalDialog(dialog_html, 'JSONファイルをダウンロード');
}

// getData
function getData() {
  // get sheet
  const ACTIVE_SHEET = SpreadsheetApp.getActiveSheet();
  const MAX_LOW = ACTIVE_SHEET.getLastRow();
  const MAX_COLUMN = ACTIVE_SHEET.getLastColumn();

  // json key & data
  let keys = [];
  let data = [];

  for (let x = 1; x <= MAX_COLUMN; x++) {
    keys.push(ACTIVE_SHEET.getRange(1, x).getValue());
  }

  for (let y = 2; y <= MAX_LOW; y++) {
    let json = {};
    for (let x = 1; x <= MAX_COLUMN; x++) {
      json[keys[x-1]] = ACTIVE_SHEET.getRange(y, x).getValue();
    }
    data.push(json);
  }

  return JSON.stringify(data, null, '\t');
}

// add menu
// function onOpen() {
//   let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // let entries = [{
    // name : 'JSONで出力',
    // functionName : 'convertToJson'
  // }];
  // spreadsheet.addMenu('JSON', entries);
// };

