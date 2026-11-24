// วางใน Google Sheet > ส่วนขยาย > Apps Script แล้ว Deploy เป็น Web app (Execute as: Me, Access: Anyone)
const ADMIN_KEY = 'เปลี่ยนรหัสนี้ก่อนใช้งาน';
const PRICES = { 'BP-250': 189, 'KL-250': 219 };            // ต้องตรงกับ config.js
const NAMES  = { 'BP-250': 'แชมพูอัญชัน 250 มล.', 'KL-250': 'แชมพูมะกรูด 250 มล.' };
const SHIPPING = 40, FREE_OVER = 500;
const HEAD = ['OrderID','Timestamp','Name','Phone','Address','Subdistrict','District','Province','Zip',
  'Payment','Note','SKU','ProductName','Qty','UnitPrice','LineTotal','Shipping','OrderTotal','Status'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName('Orders');
  if (!s) { s = ss.insertSheet('Orders'); s.appendRow(HEAD); s.setFrozenRows(1);
    s.getRange('D:D').setNumberFormat('@'); s.getRange('I:I').setNumberFormat('@'); }
  return s;
}
const out_ = o => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
const clean_ = v => String(v || '').trim().replace(/^[=+\-@]/, "'$&").slice(0, 300); // กัน formula injection

function doPost(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(15000);
  try {
    const d = JSON.parse(e.postData.contents), s = sheet_();
    if (d.action === 'markPacked') {
      if (d.key !== ADMIN_KEY) return out_({ ok: false, error: 'รหัสแอดมินไม่ถูกต้อง' });
      const v = s.getDataRange().getValues();
      for (let i = 1; i < v.length; i++) if (d.orderIds.indexOf(v[i][0]) > -1) s.getRange(i + 1, HEAD.length).setValue('PACKED');
      return out_({ ok: true });
    }
    const c = d.customer || {};
    if (!/^0\d{9}$/.test(c.phone) || !/^\d{5}$/.test(c.zip) || !c.name || !c.address) return out_({ ok: false, error: 'ข้อมูลไม่ครบ' });
    const items = (d.items || []).filter(i => PRICES[i.sku] && i.qty > 0 && i.qty <= 20);
    if (!items.length) return out_({ ok: false, error: 'ไม่มีสินค้า' });
    const sub = items.reduce((a, i) => a + PRICES[i.sku] * i.qty, 0);
    const ship = sub >= FREE_OVER ? 0 : SHIPPING, total = sub + ship;
    const id = 'TH' + Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyMMdd') + '-' + Math.floor(1000 + Math.random() * 9000);
    const ts = Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyyy-MM-dd HH:mm:ss');
    items.forEach(i => s.appendRow([id, ts, clean_(c.name), clean_(c.phone), clean_(c.address), clean_(c.subdistrict),
      clean_(c.district), clean_(c.province), c.zip, c.payment === 'TRANSFER' ? 'TRANSFER' : 'COD', clean_(c.note),
      i.sku, NAMES[i.sku], i.qty, PRICES[i.sku], PRICES[i.sku] * i.qty, ship, total, 'NEW']));
    return out_({ ok: true, orderId: id, total: total });
  } catch (err) { return out_({ ok: false, error: String(err) }); }
  finally { lock.releaseLock(); }
}

function doGet(e) {
  if ((e.parameter || {}).key !== ADMIN_KEY) return out_({ ok: false, error: 'รหัสแอดมินไม่ถูกต้อง' });
  const v = sheet_().getDataRange().getValues(), h = v.shift();
  return out_({ ok: true, rows: v.map(r => Object.fromEntries(h.map((k, i) => [k, r[i]]))) });
}
