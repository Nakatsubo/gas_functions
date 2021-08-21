// リストからGoogleDriveにフォルダを自動生成する
function createFolder() {
  // get active sheet
  const ACTIVE_SHEET = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // get active folder
  const ACTIVE_FOLDER_URL = ACTIVE_SHEET.getRange('A2').getValue();
  const ARY_FOLDER_URL = ACTIVE_FOLDER_URL.split('/');
  const ACTIVE_FOLDER_ID = ARY_FOLDER_URL[ARY_FOLDER_URL.length - 1];
  const LAST_ROW = ACTIVE_SHEET.getLastRow();
  const ACTIVE_FOLDER = DriveApp.getFolderById(ACTIVE_FOLDER_ID);
  let browserMsg;

  // create folders
  try {
    const FILE_RANGES = ACTIVE_SHEET.getRange(4, 1, LAST_ROW - 3).getValues();
    for (const FILE_RANGE of FILE_RANGES) {
      ACTIVE_FOLDER.createFolder(FILE_RANGE);
    }
    browserMsg = 'フォルダを作成しました'
    Browser.msgBox(browserMsg);
  } catch(e) {
    browserMsg = 'フォルダ名をシートに入力してください'
    Browser.msgBox(browserMsg);
    console.log(e);
  }
}
