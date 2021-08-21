// グローバルメニューに追加
function onOpen() {
  const
    sheet = SpreadsheetApp.getActiveSpreadsheet(),
    entries = [
      {
        name : 'すべてのシートを削除する',
        functionName : 'deleteAllSheets'
      }
    ];
  sheet.addMenu('シート削除', entries);
}
