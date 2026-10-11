# FitBros

## ربط Supabase
1. في SQL Editor شغّل ملف `SUPABASE_SETUP.sql` بعد أن تكون أضفت حسابي Amr وZiad إلى `profiles` و`run_group_members` بالاستعلام السابق.
2. ارفع كل محتويات هذا المجلد إلى جذر مستودع GitHub Pages، مع `index.html` و`app.js` و`style.css` و`foods.json` و`icon.png` و`supabase-config.js`.
3. افتح الموقع وسجّل الدخول بإيميل وكلمة مرور حساب Supabase. لا تستخدم كلمة مرور `12345` القديمة.

## مزامنة البيانات
- بيانات كل حساب الشخصية تحفظ في `fitbros_user_state` تحت `auth.uid()`.
- سجل الجري والمقارنة يحفظان في `fitbros_shared_state` ويشترط الوصول وجود عضوية في `run_group_members`.
- `supabase-config.js` يحتوي على publishable key فقط، وهو المفتاح المخصص للاستخدام بالمتصفح. لا تضع service_role/secret key في الموقع.

## ملاحظات
- تأكد من وجود صف في `profiles` لكل حساب، بحيث username يساوي `Amr` أو `Ziad`، وأن كليهما عضو في مجموعة الجري.
- إذا لم يتم إعداد `profiles` وعضوية المجموعة، تسجيل الدخول سيعرض رسالة واضحة بدلًا من فتح التطبيق.
