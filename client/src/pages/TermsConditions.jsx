const TermsConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Terms & Conditions</h1>
          
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p className="text-sm text-gray-400">Last Updated: {new Date().toLocaleDateString()}</p>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">1. Booking & Payments</h2>
              <p>All bookings are subject to availability. A deposit or full payment is required to confirm your reservation. Prices are subject to change without notice until booked.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">2. Cancellation Policy</h2>
              <p>Cancellations made 7 days prior to the tour date may be eligible for a partial refund. Cancellations made within 24 hours are non-refundable.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">3. User Responsibilities</h2>
              <p>You agree to provide accurate information during booking. You are responsible for your own safety and belongings during the tour.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">4. Liability</h2>
              <p>Deep Tours & Travels is not liable for any injuries, losses, or damages incurred during the tour, except where required by law.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">5. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of the new terms.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;