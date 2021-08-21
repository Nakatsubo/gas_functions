function getSentMail() {
  const THREADS = GmailApp.search('in:sent',0,100);

  THREADS.forEach((thread) => {
    let mails = thread.getMessages();

    mails.forEach((mail) => {
      let mail_date = mail.getDate();
      let mail_subject = mail.getSubject();
      let mail_plainBody = mail.getPlainBody();

      // get sheet
      const ACTIVE_SHEET = SpreadsheetApp.getActiveSheet();
      const LAST_ROW = ACTIVE_SHEET.getLastRow() + 1;

      // set value
      ACTIVE_SHEET.getRange(LAST_ROW, 1).setValue(mail_date);
      ACTIVE_SHEET.getRange(LAST_ROW, 2).setValue(mail_subject);
      ACTIVE_SHEET.getRange(LAST_ROW, 3).setValue(mail_plainBody);
    });

  });
}
