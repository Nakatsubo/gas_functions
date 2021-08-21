// Twitterのフォロワー数を取得し、スプレッドシートごとに管理する
function getFollowersFunc() {
  // sheet
  const ACTIVE_SHEET = SpreadsheetApp.getActive();
  const ALL_ACTIVE_SHEET = ACTIVE_SHEET.getSheets();

  // get follower count
  for (let index in ALL_ACTIVE_SHEET) {
    let sheet = ALL_ACTIVE_SHEET[index]
    try {
      let screenName = sheet.getName();
      let followUrl = "https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=" + screenName;
      let json = UrlFetchApp.fetch(followUrl);
      let object = JSON.parse(json.getContentText());
      let date = new Date();
      let today = date.toLocaleDateString();
      sheet.appendRow([today, object[0].followers_count]);
    } catch (e) {
      Logger.log(e);
    }
  }
}