// スプレッドシートの初期化
function deleteAllSheets() {
  const ACTIVE_SHEET = SpreadsheetApp.getActiveSpreadsheet();
  const ACTIVE_ALL_SHEET = ACTIVE_SHEET.getSheets();

  ACTIVE_SHEET.insertSheet();
  for (let i in ACTIVE_ALL_SHEET.length) {
    ACTIVE_SHEET.deleteSheet(ACTIVE_ALL_SHEET[i]);
  }
}
