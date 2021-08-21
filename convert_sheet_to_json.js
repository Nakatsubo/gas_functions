// スプレッドシートから値を取得して、JSONを返す
function doGet() {
  // sheet
  const ACTIVE_SHEET = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // get title row
  const SHEET_LAST_COLUMN = ACTIVE_SHEET.getLastColumn();
  const SHEET_FIRST_RANGE = ACTIVE_SHEET.getRange(1, 1, 1, SHEET_LAST_COLUMN);
  const SHEET_FIRST_ROW_VALUES = SHEET_FIRST_RANGE.getValues();
  const SHEET_TITLE_COLUMNS = SHEET_FIRST_ROW_VALUES[0];

  // date
  const DATE = new Date();
  const DATE_TODAY = DATE.toLocaleDateString('ja');

  const SHEET_DATASET = ACTIVE_SHEET.getRange('A2:A').getValues();
  // 一次元配列に変換
  const SHEET_DATASET_LIST = SHEET_DATASET.reduce((result, current) => {
    result.push(...current);
    return result
  }, []);

  // index for文の書き方が汚い
  let index = [];
  for (let i = 0; i < SHEET_DATASET_LIST.length; i++) {
    let judgeDate = SHEET_DATASET_LIST[i].toLocaleString('ja');
    if (judgeDate.includes(DATE_TODAY)) {
      index.push(i);
    }
  }

  // data for文の書き方が汚い
  let dataset = [];
  for (let i = 0; i < index.length; i++) {
    let range = ACTIVE_SHEET.getRange(index[i], 2, 1, SHEET_LAST_COLUMN);
    let value = range.getValues();
    dataset.push(value[0]);
  }

  // json for文の書き方が汚い
  let jsonAry = [];
  for(var i = 0; i < dataset.length; i++) {
    let line = dataset[i];
    let json = new Object();
    for(let j = 1; j <= SHEET_TITLE_COLUMNS.length; j++) {
      json[SHEET_TITLE_COLUMNS[j]] = line[j];
    }
    jsonAry.push(json);
  }

  //create json
  let json = jsonAry;
  let params =  ContentService.createTextOutput(JSON.stringify(json))
    .setMimeType(ContentService.MimeType.JSON);
  // Logger.log(params);
  return params

}
