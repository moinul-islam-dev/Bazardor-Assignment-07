export const Footer = () => {
  return (
    <footer className="w-full bg-[#f8faf8] border-t border-gray-200 py-6 px-4 sm:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-gray-700 font-medium">
        {/* Left Side Text */}
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>

        {/* Right Side Text */}
        <p className="text-gray-600">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;