# ใบไม้ไทย – แลนดิ้งเพจแชมพู + ระบบหยิบ/แพ็ค/ใบปะหน้า

โครงสร้าง: `index.html` (หน้าลูกค้า) · `admin.html` (หยิบ-แพ็ค-พิมพ์ใบปะหน้า) · `config.js` · `images/` (รูปสินค้า) · `apps-script/Code.gs` (ตัวรับออเดอร์ลง Google Sheet)

## 1) Google Sheet + Apps Script
1. สร้าง Google Sheet ใหม่ → ส่วนขยาย → Apps Script → วางโค้ดจาก `apps-script/Code.gs`
2. เปลี่ยน `ADMIN_KEY` เป็นรหัสของคุณ
3. Deploy → New deployment → Web app → Execute as: **Me**, Who has access: **Anyone** → คัดลอก URL (ลงท้าย `/exec`)
4. ชีตแท็บ `Orders` จะถูกสร้างอัตโนมัติเมื่อมีออเดอร์แรก (1 แถวต่อ 1 รายการสินค้า)

## 2) ตั้งค่า
แก้ `config.js`: ใส่ `API_URL`, ข้อมูลร้าน (ผู้ส่งในใบปะหน้า), สินค้า/ราคา/ชื่อไฟล์รูป
(ราคาและชื่อสินค้าใน `Code.gs` ต้องตรงกัน เพราะเซิร์ฟเวอร์เป็นผู้คิดเงินจริง)

## 3) GitHub
```
git init && git add . && git commit -m "init"
git branch -M main && git remote add origin https://github.com/<user>/<repo>.git && git push -u origin main
```
เพิ่ม/เปลี่ยนรูปสินค้าโดยใส่ไฟล์ในโฟลเดอร์ `images/` แล้ว push

## 4) Vercel
vercel.com → Add New Project → Import repo นี้ → Framework: **Other** (static, ไม่ต้อง build) → Deploy
ตั้งโดเมนที่ Settings → Domains (ได้ `xxx.vercel.app` ทันที)

## 5) วิธีใช้งานประจำวัน
เปิด `https://โดเมนของคุณ/admin.html` → ใส่รหัสแอดมิน → ดูใบหยิบรวม → หยิบของ → ติ๊กตรวจแต่ละออเดอร์ → **พิมพ์ใบปะหน้า** (กระดาษสติกเกอร์ 100x150 มม.) → **ยืนยันแพ็คเสร็จ**

หมายเหตุ: `ADMIN_KEY` เป็นการป้องกันระดับพื้นฐาน เหมาะกับร้านขนาดเล็ก
