// src/components/WishForm.jsx
import { useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function WishForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState({ show: false, kind: 'ok', text: '' });

  const canSubmit = name.trim().length >= 2 && message.trim().length >= 3 && !loading;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setNote({ show: false, kind: 'ok', text: '' });

    try {
      // ⛔️ Penting: jangan pakai .select() kalau belum bikin policy SELECT
      const { error } = await supabase.from('wishes').insert([{ name: name.trim(), message: message.trim(), color: '#E11D48' }])

      if (error) throw error;

      setNote({ show: true, kind: 'ok', text: 'Terima kasih! Ucapanmu terkirim.' });
      setName('');
      setMessage('');
    } catch (err) {
      // tampilkan pesan asli supaya tahu sumber error
      setNote({
        show: true,
        kind: 'err',
        text: err?.message || 'Gagal mengirim. Coba lagi.',
      });
      // bantu debug di console
      console.error('Wish insert error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {note.show && (
        <div
          className={`rounded-lg px-3 py-2 text-sm ${
            note.kind === 'ok' ? 'bg-emerald-600/20 text-emerald-300' : 'bg-red-600/20 text-red-300'
          }`}
        >
          {note.text}
        </div>
      )}

      <label className="block text-sm text-white/80">Your Name</label>
      <input
        className="w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Nama kamu"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="block text-sm text-white/80">Your Message</label>
      <textarea
        rows={4}
        className="w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Tulis ucapan untuk mempelai"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        type="submit"
        disabled={!canSubmit}
        className={`w-full rounded-lg py-3 font-medium ${
          canSubmit ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
        }`}
      >
        {loading ? 'Sending…' : 'Send Wish'}
      </button>
    </form>
  );
}
