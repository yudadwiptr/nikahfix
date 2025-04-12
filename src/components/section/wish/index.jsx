import React, { forwardRef, useEffect, useRef, useState } from 'react';
import supabase from '../../../lib/supabaseClient';
import badwords from 'indonesian-badwords';

const WishItem = forwardRef(({ name, message, color }, ref) => (
  <div ref={ref} className="flex gap-2">
    <div>
      <img
        width={24}
        height={24}
        src="images/face.png"
        style={{
          backgroundColor: color,
          minWidth: 24,
          minHeight: 24,
        }}
        className=" rounded-sm"
      />
    </div>
    <div>
      <p className="text-white text-md -mt-1">{name}</p>
      <p className="text-xs text-[#A3A1A1]">{message}</p>
    </div>
  </div>
));

const colorList = ['red', '#ffdb58', '#6bc76b', '#48cae4'];

export default function WishSection() {
  const lastChildRef = useRef(null);

  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3) {
      setError('Nama minimal 3 karakter!');
      return;
    }

    if (message.length < 10) {
      setError('Pesan minimal 10 karakter!');
      return;
    }

    if (badwords.flag(name)) {
      setError('Gabolah kata kasar!');
      return;
    }

    setLoading(true);
    setError(null);

    // random color based data length
    const randomColor = colorList[data.length % colorList.length];
    const newmessage = badwords.censor(message);
    const { error } = await supabase
      .from(import.meta.env.VITE_APP_TABLE_NAME) // Replace with your actual table name
      .insert([
        { name, message: newmessage, color: randomColor }, // Assuming your table has a "name" column
      ]);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      //scroll to .wish-container last child

      fetchData();
      setTimeout(scrollToLastChild, 500);
      setName('');
      setMessage('');
    }
  };

  const fetchData = async () => {
    const { data, error } = await supabase
      .from(import.meta.env.VITE_APP_TABLE_NAME) // Replace 'your_table' with the actual table name
      .select('name, message, color');

    if (error) console.error('Error fetching data: ', error);
    else setData(data);
  };

  const scrollToLastChild = () => {
    if (lastChildRef.current) {
      lastChildRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-lg leading-5 text-white font-bold mb-5">
        Wish for the couple
      </h2>
      <div className="max-h-[20rem] overflow-auto space-y-4 wish-container">
        {data.map((item, index) => (
          <WishItem
            name={item.name}
            message={item.message}
            color={item.color}
            key={index}
            ref={index === data.length - 1 ? lastChildRef : null}
          />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="space-y-1">
          <label>Name</label>
          <input
            required
            minLength={3}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full focus:outline-none px-2 py-1 text-black"
          />
        </div>
        <div className="space-y-1">
          <label>Message</label>
          <textarea
            required
            minLength={10}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full focus:outline-none px-2 py-1 text-black"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-white text-black rounded-sm"
        >
          Send
        </button>
      </form>
    </div>
  );
}
