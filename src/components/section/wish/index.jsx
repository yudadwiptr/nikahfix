import React, { forwardRef, useEffect, useRef, useState } from 'react';
import supabase from '../../../lib/supabaseClient';
import badwords from 'indonesian-badwords';

const WishItem = forwardRef(({ name, message, color }, ref) => (
  <div ref={ref} className="bg-[#181818] p-4 rounded-lg transform transition-all duration-300 hover:scale-[1.02] hover:bg-[#222222]">
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold"
          style={{
            backgroundColor: color,
          }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-medium">{name}</h3>
          <span className="text-xs text-[#E50913] bg-[#E50913]/10 px-2 py-0.5 rounded-full">Verified Guest</span>
        </div>
        <p className="text-[#A3A1A1] mt-2 leading-relaxed">{message}</p>
      </div>
    </div>
  </div>
));

const colorList = ['#E50913', '#FF9A00', '#00C853', '#2196F3'];

const InputField = ({ label, error, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm text-[#A3A1A1]">{label}</label>
    <div className="relative">
      <input
        {...props}
        className="w-full bg-[#333333] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50913] transition-all duration-300"
      />
    </div>
    {error && <p className="text-[#E50913] text-xs mt-1">{error}</p>}
  </div>
);

export default function WishSection() {
  const lastChildRef = useRef(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const totalPages = Math.ceil(data.length / pageSize);
    const pagedData = data.slice((page - 1) * pageSize, page * pageSize);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (name.length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }
    if (message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    if (badwords.flag(name)) {
      errors.name = 'Please use appropriate language';
    }
    if (badwords.flag(message)) {
      errors.message = 'Please use appropriate language';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    const randomColor = colorList[data.length % colorList.length];
    const newmessage = badwords.censor(message);
    try {
      const { error: supabaseError } = await supabase
        .from(import.meta.env.VITE_APP_TABLE_NAME)
        .insert([{ name, message: newmessage, color: randomColor }]);

      if (supabaseError) throw supabaseError;

      // Setelah submit, fetch data terbaru dari Supabase
      await fetchData();
      setTimeout(scrollToLastChild, 500);
      setName('');
      setMessage('');
      setFormErrors({});
      setError(null);
      // Tampilkan pesan sukses
      setTimeout(() => {
        setError(null);
      }, 2000);
      setError('Yeay terkirim!');
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from(import.meta.env.VITE_APP_TABLE_NAME)
        .select('id, name, message, color, created_at')
        .order('created_at', { ascending: true });
      if (error) throw error;
      if (!data || !Array.isArray(data)) {
        console.error('No wishes data returned from Supabase:', data);
        setData([]);
      } else {
        setData(data);
      }
    } catch (err) {
      console.error('Error fetching wishes:', err);
      setData([]);
    }
  };

  const scrollToLastChild = () => {
    if (lastChildRef.current) {
      lastChildRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // auto-refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg leading-5 text-white font-bold">
          Wish for the couple
        </h2>
        <span className="text-sm text-[#A3A1A1]">{data.length} wishes</span>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#181818] p-4 rounded-lg space-y-4 mb-6">
        {error && (
          <div className={`bg-[#E50913]/10 border border-[#E50913] px-4 py-2 rounded-lg ${error === 'Yeay terkirim!' ? 'text-green-500 border-green-500 bg-green-500/10' : 'text-[#E50913]'}`}>
            {error}
          </div>
        )}

        <InputField
          label="Your Name"
          required
          minLength={3}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={formErrors.name}
          placeholder="Enter your name"
        />

        <div className="space-y-2">
          <label className="block text-sm text-[#A3A1A1]">Your Message</label>
          <textarea
            required
            minLength={10}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[#333333] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50913] transition-all duration-300 resize-none"
            rows={4}
            placeholder="Write your wish for the couple..."
          />
          {formErrors.message && (
            <p className="text-[#E50913] text-xs mt-1">{formErrors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E50913] text-white py-3 rounded-lg font-medium transform transition-all duration-300 hover:bg-[#cc0812] focus:outline-none focus:ring-2 focus:ring-[#E50913] focus:ring-offset-2 focus:ring-offset-[#181818] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </>
          ) : (
            'Send Wish'
          )}
        </button>
      </form>

      <div className="space-y-4">
        {pagedData.map((item, index) => (
          <WishItem
            key={index + (page - 1) * pageSize}
            name={item.name}
            message={item.message}
            color={item.color}
            ref={index === pagedData.length - 1 ? lastChildRef : null}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            className={`px-4 py-2 rounded bg-[#E50913] text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="px-3 py-2 text-white">Page {page} of {totalPages}</span>
          <button
            className={`px-4 py-2 rounded bg-[#E50913] text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}
