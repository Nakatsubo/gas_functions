// GoogleDriveに保管されているファイルを、スプレッドシートに書き込む
function createFileList() {
  // get sheet
  const ACTIVE_SHEET = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const ACTIVE_SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
  const ACTIVE_SHEET_NAME = ACTIVE_SHEET.getName();

  // get folder
  const FOLDER_URL = ACTIVE_SHEET.getRange('A2').getValue();
  const ARY_FOLDER_URL = FOLDER_URL.split('/');
  const ACTIVE_FOLDER_ID = ARY_FOLDER_URL[ARY_FOLDER_URL.length - 1];
  const ACTIVE_FOLDER = DriveApp.getFolderById(ACTIVE_FOLDER_ID);
  let browserMsg;

  appendLog(['種類', '名前', 'URL', '最終更新日時'], ACTIVE_SHEET_ID, ACTIVE_SHEET_NAME);

  // get folders
  function getAllFolders(f) {
    const FOLDERS = f.getFolders();
    while (FOLDERS.hasNext()) {
      const SUB_FOLDER = FOLDERS.next();
      const LAST_UPDATED_DATE = Utilities.formatDate(SUB_FOLDER.getLastUpdated(), 'JST', 'yyyy年MM月dd日 HH:mm:ss');
      appendLog(['フォルダ', SUB_FOLDER.getName(), SUB_FOLDER.getUrl(), LAST_UPDATED_DATE], ACTIVE_SHEET_ID, ACTIVE_SHEET_NAME);

      // get subfolder & flies
      try {
        getAllFiles(SUB_FOLDER);
        getAllFolders(SUB_FOLDER);
      } catch (e) {
        browserMsg = 'エラーが発生しました'
        Browser.msgBox(browserMsg);
      }
    }
  }

  // get files
  function getAllFiles(f) {
    const FILES = f.getFiles();
    while (FILES.hasNext()) {
      const FILE = FILES.next();
      const LAST_UPDATED_DATE = Utilities.formatDate(FILE.getLastUpdated(), 'JST', 'yyyy年MM月dd日 HH:mm:ss');
      appendLog(['└ ファイル', FILE.getName(), FILE.getUrl(), LAST_UPDATED_DATE], ACTIVE_SHEET_ID, ACTIVE_SHEET_NAME)
    }
  }

  try {
    getAllFiles(ACTIVE_FOLDER);
    getAllFolders(ACTIVE_FOLDER);
    browserMsg = 'ファイルを自動取得しました'
    Browser.msgBox(browserMsg);
  } catch (e) {
    browserMsg = 'エラーが発生しました'
    Browser.msgBox(browserMsg);
  }

}

// add row
function appendLog(log, id, name) {
  if (name === void 0) { name = ACTIVE_SHEET_NAME; }
  const SPREAD_SHEET = SpreadsheetApp.openById(id);
  SPREAD_SHEET.getSheetByName(name).appendRow([log[0], log[1], log[2], log[3]]);
}
