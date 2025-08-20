import React, { useState } from 'react';
import { FaGlobe } from 'react-icons/fa'; // أيقونة اللغة من react-icons

const PrivacyPolicy = () => {
  const [language, setLanguage] = useState('en');
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleLanguage = (lang) => {
    if ((lang === 'ar' && language !== 'ar') || (lang === 'en' && language === 'ar')) {
      setLanguage(lang);
    }
    setShowDropdown(false);
  };

  return (
    <div className="container my-5">
      <div style={{ height: '100px' }}></div>

      {/* أيقونة اللغة + القائمة */}
      <div className="d-flex justify-content-end mb-3 position-relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="btn btn-light"
          style={{ fontSize: '1.5rem' }}
        >
          <FaGlobe />
        </button>

        {showDropdown && (
          <div
            className="language-dropdown"
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              background: 'white',
              border: '1px solid #ccc',
              borderRadius: '6px',
              minWidth: '120px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
              zIndex: 10,
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => toggleLanguage('en')}
              style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                background: 'none',
                textAlign: 'left',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => (e.target.style.background = '#f0f0f0')}
              onMouseLeave={(e) => (e.target.style.background = 'none')}
            >
              English
            </button>
            <button
              onClick={() => toggleLanguage('ar')}
              style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                background: 'none',
                textAlign: 'left',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => (e.target.style.background = '#f0f0f0')}
              onMouseLeave={(e) => (e.target.style.background = 'none')}
            >
              العربية
            </button>
          </div>
        )}
      </div>

      {language === 'ar' ? (
        <div dir="rtl" className="text-end">
          <h1 className="h3 fw-bold">سياسة الخصوصية – تطبيق Clinic Hub</h1>
          <p>آخر تحديث: 2025/7/8</p>
          <p>نحن في Clinic Hub نولي أهمية كبيرة لخصوصية المستخدمين، ونلتزم بحماية بياناتك الشخصية وضمان استخدامها بطريقة آمنة وشفافة. توضح هذه السياسة كيف نقوم بجمع واستخدام ومشاركة وحماية معلوماتك عند استخدام التطبيق.</p>

          <h2 className="h5 fw-semibold mt-4">1. المعلومات التي نقوم بجمعها</h2>
          <p>عند استخدامك للتطبيق، قد نقوم بجمع الأنواع التالية من البيانات:</p>

          <p>📌 المعلومات التي تقدمها مباشرة:</p>
          <ul>
            <li>الاسم الكامل</li>
            <li>رقم الهاتف</li>
            <li>البريد الإلكتروني (إن وُجد)</li>
            <li>تاريخ الميلاد</li>
            <li>الجنس</li>
            <li>الرقم الوطني</li>
            <li>المعلومات الطبية (مثل التاريخ المرضي، الوصفات، المواعيد)</li>
          </ul>

          <p>🔧 البيانات التقنية:</p>
          <ul>
            <li>نوع الجهاز ونظام التشغيل</li>
            <li>عنوان IP</li>
            <li>سجلات الاستخدام (مثل تاريخ الحجز وتوقيت الدخول)</li>
          </ul>

          <h2 className="h5 fw-semibold mt-4">2. كيف نستخدم معلوماتك؟</h2>
          <p>نستخدم بياناتك للأغراض التالية:</p>
          <ul>
            <li>إدارة المواعيد الطبية وتنظيمها</li>
            <li>إرسال التذكيرات والإشعارات (مثل مواعيد الأدوية أو زيارات الطبيب)</li>
            <li>تحسين تجربة المستخدم داخل التطبيق</li>
            <li>تأمين معلوماتك وتقديم دعم فني عند الحاجة</li>
            <li>إعداد تقارير داخلية لتطوير النظام وتحسين الأداء</li>
          </ul>

          <h2 className="h5 fw-semibold mt-4">3. مشاركة المعلومات</h2>
          <p>نحن لا نبيع أو نؤجر بياناتك لأي طرف ثالث. ومع ذلك، قد نشارك بعض البيانات مع:</p>
          <ul>
            <li>الأطباء أو مزودي الخدمة الصحيّة المرتبطين بحسابك</li>
            <li>موظفي العيادة المخولين بإدارة المواعيد</li>
            <li>مزودي خدمات الطرف الثالث (مثل Firebase وUltraMsg) لأغراض الإشعارات والاتصال، مع التزامهم بالحفاظ على خصوصيتك</li>
          </ul>

          <h2 className="h5 fw-semibold mt-4">4. أمن المعلومات</h2>
          <p>نستخدم إجراءات أمان متقدمة، منها:</p>
          <ul>
            <li>تشفير البيانات عند النقل والتخزين</li>
            <li>آليات تسجيل دخول آمن باستخدام رموز مؤقتة (OTP)</li>
            <li>تقنيات حماية من الوصول غير المصرح به مثل Laravel Sanctum</li>
          </ul>

          <h2 className="h5 fw-semibold mt-4">5. حقوقك</h2>
          <p>يحق لك:</p>
          <ul>
            <li>طلب الوصول إلى بياناتك</li>
            <li>تصحيح أو تعديل معلوماتك</li>
            <li>حذف حسابك نهائيًا (عبر التواصل معنا)</li>
          </ul>

          <h2 className="h5 fw-semibold mt-4">6. تخزين البيانات</h2>
          <p>يتم تخزين بياناتك الطبية والشخصية على خوادم آمنة، ويتم الاحتفاظ بها طالما كان حسابك مفعلاً، أو حسب ما تقتضيه اللوائح القانونية السارية.</p>

          <h2 className="h5 fw-semibold mt-4">7. ملفات تعريف الارتباط (Cookies)</h2>
          <p>نستخدم ملفات الكوكيز في موقع العيادة فقط لتحسين الأداء وتجربة المستخدم. لا تُستخدم هذه الملفات لتتبع نشاطك خارج نطاق المنصة.</p>

          <h2 className="h5 fw-semibold mt-4">8. التعديلات على سياسة الخصوصية</h2>
          <p>قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم إعلامك بأي تغييرات هامة عبر التطبيق أو البريد الإلكتروني.</p>

          <h2 className="h5 fw-semibold mt-4">9. التواصل معنا</h2>
          <p>📧 nwr8170@gmail.com</p>
          <p>📞 0994931568</p>
        </div>
      ) : (
        <div dir="ltr" className="text-start">
          <h1 className="h3 fw-bold">Privacy Policy – Clinic Hub App</h1>
          <p>Last Updated: 2025/7/8</p>
          <p>At Clinic Hub, we highly value user privacy and are committed to protecting your personal data and ensuring its use is safe and transparent. This policy explains how we collect, use, share, and safeguard your information when using the app.</p>

          <h2 className="h5 fw-semibold mt-4">1. Information We Collect</h2>
          <p>When you use the app, we may collect the following types of information:</p>

          <p>📌 Information you provide directly:</p>
          <ul>
            <li>Full name</li>
            <li>Phone number</li>
            <li>Email address (if provided)</li>
            <li>Date of birth</li>
            <li>Gender</li>
            <li>National ID</li>
            <li>Medical information (e.g., medical history, prescriptions, appointments)</li>
          </ul>

          <p>🔧 Technical data:</p>
          <ul>
            <li>Device type and operating system</li>
            <li>IP address</li>
            <li>Usage logs (e.g., booking history, login times)</li>
          </ul>

          <h2 className="h5 fw-semibold mt-4">2. How We Use Your Information</h2>
          <p>We use your data for the following purposes:</p>
          <ul>
            <li>Managing and organizing medical appointments</li>
            <li>Sending reminders and notifications (e.g., medication or doctor visit reminders)</li>
            <li>Improving the user experience within the app</li>
            <li>Securing your information and providing technical support when needed</li>
            <li>Generating internal reports to enhance and develop the system</li>
          </ul>

          <h2 className="h5 fw-semibold mt-4">3. Information Sharing</h2>
          <p>We do not sell or rent your data to third parties. However, we may share certain information with:</p>
          <ul>
            <li>Doctors or healthcare providers linked to your account</li>
            <li>Clinic staff authorized to manage appointments</li>
            <li>Third-party service providers (e.g., Firebase, UltraMsg) for notifications and communication, who are committed to protecting your privacy</li>
          </ul>

          <h2 className="h5 fw-semibold mt-4">4. Data Security</h2>
          <p>We apply advanced security measures, including:</p>
          <ul>
            <li>Encrypting data during transmission and storage</li>
            <li>Secure login mechanisms using One-Time Passwords (OTP)</li>
            <li>Unauthorized access protection via Laravel Sanctum</li>
          </ul>

          <h2 className="h5 fw-semibold mt-4">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to your data</li>
            <li>Correct or update your personal information</li>
            <li>Permanently delete your account (by contacting us)</li>
          </ul>

          <h2 className="h5 fw-semibold mt-4">6. Data Storage</h2>
          <p>Your medical and personal data is securely stored on protected servers and retained as long as your account is active, or as required by applicable legal regulations.</p>

          <h2 className="h5 fw-semibold mt-4">7. Cookies</h2>
          <p>We use cookies only on the clinic’s website to enhance performance and user experience. These cookies are not used to track activity outside the platform.</p>

          <h2 className="h5 fw-semibold mt-4">8. Privacy Policy Updates</h2>
          <p>We may update this policy from time to time. You will be notified of any significant changes via the app or email.</p>

          <h2 className="h5 fw-semibold mt-4">9. Contact Us</h2>
          <p>📧 nwr8170@gmail.com</p>
          <p>📞 0994931568</p>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicy;
