# إشعار GPS المباشر في FitBros

- عند بدء تسجيل الجري أو المشي، يطلب FitBros إذن الإشعارات إن كان متاحًا في Web To App.
- يحاول عرض إشعار باسم FitBros يحتوي المسافة والوقت والـ Pace، ويحدّثه كل عدة ثوانٍ أثناء عمل صفحة التطبيق.
- فعّل `Advanced Settings → Developer → Notification API Bridge` في Web To App ثم احفظ وأعد بناء/تحديث APK إذا كان البرنامج يتطلب ذلك.
- اسمح بإشعارات FitBros من إعدادات Android.

**مهم:** هذا تكامل ويب تجريبي يعتمد على أن Web To App يمرر Notification API للنظام. لا يمكن لشفرة الموقع وحدها ضمان استمرار GPS أو تحديث الإشعار بعد أن يوقف Android صفحة الويب في الخلفية/عند قفل الشاشة. إذا توقف الإشعار خارج التطبيق، يلزم دعم Foreground Service أصلي من Web To App أو إضافة Native Plugin؛ تفعيل Notification API Bridge وحده لا يضمن ذلك.
