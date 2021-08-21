// Google Analyticsのイベント数を取得して、スプレッドシートに書き込む
function getGoogleAnalyticsData() {
  // トラッキングIDを入力
  const GA_VIEW_ID = 'ga:' + 'xxxxxxxxxxxxxxxxxxxx';

  // sheet
  const ACTIVE_SHEET = SpreadsheetApp.getActiveSpreadsheet();
  const SETTING_SHEET = ACTIVE_SHEET.getSheetByName('setting');
  const RESULT_SHEET = ACTIVE_SHEET.getSheetByName('result');

  // get date
  // settingシートのA2セルに開始日／B2セルに終了日
  const STRAT_DATE = SETTING_SHEET.getRange('A2').getValue();
  const START = Utilities.formatDate(STRAT_DATE, 'Asia/Tokyo', 'yyyy-MM-dd');
  const END_DATE = SETTING_SHEET.getRange('B2').getValue();
  const END = Utilities.formatDate(END_DATE, 'Asia/Tokyo', 'yyyy-MM-dd');

  // get response
  const GA_RESPONSE = AnalyticsReporting.Reports.batchGet({
    reportRequests: [{
      viewId: GA_VIEW_ID,
      dateRanges: [{
        startDate: START,
        endDate: END
      }],
      metrics: [{ expression: 'ga:uniqueEvents' }],
      dimensions: [
        { 'name': 'ga:eventCategory' },
        { 'name': 'ga:eventAction' },
        { 'name': 'ga:eventLabel' }
      ],
      orderBys: [{
        fieldName: 'ga:uniqueEvents',
        sortOrder: 'DESCENDING'
      }],
      // イベントカテゴリをフィルタリング
      filtersExpression: 'ga:eventCategory==xxxxxxxxxxxxxxxxxxxx',
      samplingLevel: 'LARGE',
      pageSize: '100000'
    }]
  });
  // Logger.log(GA_RESPONSE);

  // touch data
  const GA_RESPONSE_JSON = JSON.parse(GA_RESPONSE)
  const GA_RESPONSE_DATA = GA_RESPONSE_JSON.reports[0].data
  // Logger.log(GA_RESPONSE_DATA);

  let dataset = [];
  let r = 2;
  GA_RESPONSE_DATA.rows.forEach((row) => {
    let url = row.dimensions[2].replace(/\&.*$/g, '');
    let value = row.metrics[0].values[0];

    if(r > 2) {
      let prevRow = dataset[dataset.length-1];
      let regUrl = url.replace(/\?.*$/g, '');
      let prevUrl = prevRow[0];
      if(prevUrl === regUrl) {
        r--;
        prevRow[1] = Number(prevRow[1]) + Number(value);
      } else {
        dataset.push([url, value]);
      }
    } else {
      dataset.push([url, value]);
    }
    r++;
  })

  // result
  RESULT_SHEET.getRange(2, 1, dataset.length, 2).setValues(dataset);
}
