const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-[#293354]">
          Terms & Conditions
        </h1>

        <p className="mb-4 text-gray-600">
          By using our website, you agree to follow these Terms & Conditions.
        </p>

        <h2 className="mb-2 mt-6 text-xl font-semibold">Use of Our Website</h2>
        <p className="text-gray-600">
          You agree to use our website only for lawful purposes and not misuse
          any of our services.
        </p>

        <h2 className="mb-2 mt-6 text-xl font-semibold">Orders</h2>
        <p className="text-gray-600">
          Orders are subject to product availability and confirmation. Product
          prices and availability may change without notice.
        </p>

        <h2 className="mb-2 mt-6 text-xl font-semibold">
          Account Responsibility
        </h2>
        <p className="text-gray-600">
          You are responsible for maintaining the security of your account
          information and password.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
