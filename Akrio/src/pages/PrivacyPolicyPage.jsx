const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-[#293354]">
          Privacy Policy
        </h1>

        <p className="mb-4 text-gray-600">
          We respect your privacy and are committed to protecting your personal
          information.
        </p>

        <h2 className="mb-2 mt-6 text-xl font-semibold">
          Information We Collect
        </h2>
        <p className="text-gray-600">
          We may collect information such as your name, email address, phone
          number, shipping address, and order information when you use our
          services.
        </p>

        <h2 className="mb-2 mt-6 text-xl font-semibold">
          How We Use Your Information
        </h2>
        <p className="text-gray-600">
          Your information is used to process orders, provide customer support,
          improve our services, and communicate with you.
        </p>

        <h2 className="mb-2 mt-6 text-xl font-semibold">Data Security</h2>
        <p className="text-gray-600">
          We take reasonable measures to protect your personal information from
          unauthorized access or misuse.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
