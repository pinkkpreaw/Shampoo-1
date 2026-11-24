// ===== แก้ค่าตรงนี้ที่เดียว (ใช้ทั้งหน้าลูกค้าและหน้าแอดมิน) =====
window.CONFIG = {
  API_URL: "PASTE_APPS_SCRIPT_WEB_APP_URL_HERE",
  SHOP: { name: "ใบไม้ไทย", phone: "081-234-5678",
          address: "123 ซ.ตัวอย่าง ถ.สุขุมวิท เขตวัฒนา กรุงเทพฯ 10110" },
  SHIPPING: 40, FREE_SHIP_OVER: 500,
  // ราคาต้องตรงกับ PRICES ใน apps-script/Code.gs (ฝั่งเซิร์ฟเวอร์ใช้คิดเงินจริง)
  PRODUCTS: [
    { sku: "BP-250", name: "แชมพูอัญชัน บำรุงผมนุ่ม", size: "250 มล.", price: 189,
      img: "images/shampoo-butterfly-pea.svg",
      desc: "สกัดดอกอัญชันเข้มข้น ลดผมพันกัน เงางาม สูตรอ่อนโยนใช้ได้ทุกวัน" },
    { sku: "KL-250", name: "แชมพูมะกรูด ลดผมมัน", size: "250 มล.", price: 219,
      img: "images/shampoo-kaffir-lime.svg",
      desc: "น้ำมันมะกรูดบริสุทธิ์ ลดความมันและรังแค หนังศีรษะสะอาดสดชื่น" }
  ]
};
