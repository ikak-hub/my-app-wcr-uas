export type Product = {
  id: number;
  src: string;
  alt: string;
  name: string;
  func: string;
  fabric: string;
  price: number;
};

export const PRODUCTS: Product[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1621376225372-c86f16f47a09?w=600&q=80", alt: "Toga wisuda hitam", name: "Toga Wisuda Hitam", func: "Upacara wisuda", fabric: "Satin & beludru", price: 75000 },
  { id: 2, src: "https://images.unsplash.com/photo-1625061770820-514e6228f4ee?w=600&q=80", alt: "Toga wisuda biru", name: "Toga Wisuda Biru", func: "Wisuda sekolah / kampus", fabric: "Polyester satin", price: 70000 },
  { id: 3, src: "https://images.unsplash.com/photo-1591233378603-68642b2afb25?w=600&q=80", alt: "Toga wisuda pria", name: "Toga Wisuda Pria", func: "Wisuda formal", fabric: "Polyester tebal", price: 70000 },
  { id: 4, src: "https://images.unsplash.com/photo-1704452607333-f0e189d7e2cc?w=600&q=80", alt: "Toga wisuda formal", name: "Toga Akademik", func: "Wisuda & seremoni", fabric: "Satin doff", price: 80000 },
  { id: 5, src: "https://images.unsplash.com/photo-1634820491281-d928db1446af?w=600&q=80", alt: "Gaun pesta biru", name: "Gaun Pesta Biru", func: "Pesta / prom night", fabric: "Tulle & satin", price: 150000 },
  { id: 6, src: "https://images.unsplash.com/photo-1634820490993-9b953e6c8b2b?w=600&q=80", alt: "Gaun pesta hijau", name: "Gaun Pesta Hijau", func: "Pesta semi-formal", fabric: "Sifon & organza", price: 140000 },
  { id: 7, src: "https://images.unsplash.com/photo-1634820491066-772070f97134?w=600&q=80", alt: "Gaun pesta ungu", name: "Gaun Pesta Ungu", func: "Pesta malam", fabric: "Satin silk", price: 160000 },
  { id: 8, src: "https://images.unsplash.com/photo-1634820491076-1f5ea7cc3ca8?w=600&q=80", alt: "Gaun festival merah", name: "Gaun Festival Merah", func: "Festival & karnaval", fabric: "Katun bordir", price: 120000 },
  { id: 9, src: "https://images.unsplash.com/photo-1770386731788-81381581068c?w=600&q=80", alt: "Kostum karakter", name: "Kostum Karakter", func: "Cosplay / acara tema", fabric: "Katun & polyester", price: 100000 },
  { id: 10, src: "https://images.unsplash.com/photo-1634820491182-014e84a586b4?w=600&q=80", alt: "Gaun formal jalanan", name: "Gaun Formal Casual", func: "Acara semi-formal", fabric: "Linen blend", price: 110000 },
  { id: 11, src: "https://images.unsplash.com/photo-1551084804-4b60b3c10f9e?w=600&q=80", alt: "Gaun putih elegan", name: "Gaun Putih Elegan", func: "Pre-wedding / engagement", fabric: "Tulle & lace", price: 200000 },
  { id: 12, src: "https://images.unsplash.com/photo-1646004812243-f071fbe69766?w=600&q=80", alt: "Manekin gaun", name: "Gaun Klasik", func: "Photoshoot / fashion show", fabric: "Satin premium", price: 180000 },
  { id: 13, src: "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?w=600&q=80", alt: "Jas formal hitam", name: "Jas Formal Hitam", func: "Acara formal & kondangan", fabric: "Wol blend", price: 130000 },
  { id: 14, src: "https://images.unsplash.com/photo-1585412459272-762fb93357c3?w=600&q=80", alt: "Jas tuxedo", name: "Tuxedo Klasik", func: "Pesta black-tie", fabric: "Wol & satin", price: 175000 },
  { id: 15, src: "https://images.unsplash.com/photo-1761499101317-e32c4ed50b2f?w=600&q=80", alt: "Jas formal cerah", name: "Jas Krem", func: "Pernikahan outdoor", fabric: "Linen", price: 140000 },
  { id: 16, src: "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=600&q=80", alt: "Jas formal pria", name: "Setelan Jas Pria", func: "Acara kantor & formal", fabric: "Wol blend", price: 135000 },
  { id: 17, src: "https://images.unsplash.com/photo-1719408938150-f1a14ca4ca55?w=600&q=80", alt: "Toga wisuda", name: "Toga Wisuda Lengkap", func: "Wisuda + topi & selempang", fabric: "Polyester satin", price: 90000 },
  { id: 18, src: "https://images.unsplash.com/photo-1629905650427-bddf3b64e09a?w=600&q=80", alt: "Toga wisuda akademik", name: "Toga Akademik Premium", func: "Wisuda S2 / S3", fabric: "Satin & beludru", price: 95000 },
];

export const formatIDR = (n: number) => "Rp " + n.toLocaleString("id-ID");
