import React from 'react'

function LandingFooter() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row justify-between">
          {/* بخش اطلاعات تماس */}
          <div className="">
            <h2 className="text-xl font-bold">تماس با ما</h2>
            <p>آدرس: تهران، خیابان مثال، پلاک 123</p>
            <p>تلفن: +98 21 1234 5678</p>
            <p>ایمیل: support@example.com</p>
          </div>

          {/* بخش لینک‌های مفید */}
          <div className="">
            <h2 className="text-xl font-bold">لینک‌های مفید</h2>
            <ul className="list-none">
              <li><a href="#" className="hover:underline">درباره ما</a></li>
              <li><a href="#" className="hover:underline">خدمات</a></li>
              <li><a href="#" className="hover:underline">پشتیبانی</a></li>
              <li><a href="#" className="hover:underline">سوالات متداول</a></li>
            </ul>
          </div>

          {/* بخش حق کپی */}
          <div className=" text-center md:text-right">
            <p>© 2024 کیف پول مجازی. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter