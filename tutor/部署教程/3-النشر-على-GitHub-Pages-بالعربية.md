# نشر الموقع على GitHub Pages (مجانًا)

الموقع تطبيق React + Vite داخل المجلد `web/`. لا يمكن نشر الكود المصدري مباشرة؛ يجب **بناؤه** أولًا (`npm run build`) ثم نشر المجلد `web/dist`.
هذا يتم تلقائيًا عبر الملف [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml): عند كل دفع (push) إلى الفرع `main` يبني الموقع وينشره.

## الخطوة 1: فعّل GitHub Pages

1. افتح المستودع على GitHub ← **Settings**.
2. من القائمة الجانبية اختر **Pages**.
3. في **Build and deployment ← Source** اختر **GitHub Actions** (وليس *Deploy from a branch*).

> المستودع يجب أن يكون **عامًا (Public)** في الحساب المجاني.

## الخطوة 2: ادمج التعديلات في `main`

الـ workflow يعمل فقط على الفرع `main`. ادمج فرع العمل (Pull Request ← **Merge**)، أو ادفع مباشرة إلى `main`.

## الخطوة 3: تابع النشر

1. افتح تبويب **Actions** ← **Deploy to GitHub Pages**.
2. انتظر حتى تظهر علامة ✅ (دقيقتان تقريبًا). يمكنك أيضًا الضغط على **Run workflow** لتشغيله يدويًا.
3. ستجد الرابط في **Settings ← Pages**، وهو بالشكل:

```
https://<اسم-المستخدم>.github.io/sen-3d-resume/
```

## التشغيل محليًا على جهازك

```bash
cd web
npm install
npm run dev      # افتح http://localhost:5173
npm run build    # بناء نسخة النشر في web/dist
npm run preview  # معاينة نسخة النشر
```

## مشاكل شائعة

- **صفحة بيضاء:** تأكد أن Source هو **GitHub Actions**، وأنه لا يوجد workflow آخر ينشر المستودع كما هو بدون بناء.
- **فشل الـ workflow:** افتح الخطوة الحمراء في Actions واقرأ الخطأ؛ جرّب `npm run build` محليًا داخل `web/`.
- **تغيير اللغة:** الموقع يفتح بالعربية افتراضيًا، والزر أعلى اليمين يبدّل بين العربية / English / 中文. النصوص موجودة في `web/src/App.tsx` (`COPY`) و`web/src/ui/Resume.tsx` و`web/src/data/works.ts`.
