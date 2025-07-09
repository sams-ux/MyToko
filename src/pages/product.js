import Layout from "@/components/Layout";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

export default function Product() {
  const { data: session, status } = useSession();
  const [items, setItems] = useState([]); //items adalah array kosong untuk menampung data dari API
  const [nama_brg, setNamaBrg] = useState(''); //variabel untuk menampung inputan nama barang
  const [harga, setHarga] = useState(''); //variabel untuk menampung inputan harga
  const router = useRouter(); 
  
  const API_URL = 'https://6836865f664e72d28e4119cb.mockapi.io/api/toko_saya/barang'

  /*
  useEffect akan dijalankan sekali saat komponen pertama kali dimuat ke dalam DOM.
  dalam contoh ini, fungsi fetchData akan dijalankan saat komponen pertama kali dimuat
  */
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  const fetchData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setItems(data); //simpan ke state setItems yang memiliki array Items
  };

  const handleAddItem = async () => {
    const response = await fetch(API_URL, {
      method: 'POST', //method yang digunakan untuk mengirim data ke API
      headers: {'Content-Type': 'application/json'},
      /*
      Note :
      header merupakan property fungsi fetch
      yang berfungsi untuk memberi tahu server bahwa
      data yang dikirim oleh client (browser) adalah dalam format JSON
      */

      body: JSON.stringify({ nama_brg, harga }), //kirim data ke API dalam format JSON
    });
    const data = await response.json();
    //kosongkan bbrp state (biar gak jadi sampah)
    setItems([...items, data]);
    setNamaBrg('');
    setHarga('');
    //reload data produk
    fetchData();
  };

  const handleDeleteItem = async (id) => {
    //jalankan method DELETE untuk menghapus data
    await fetch(`${API_URL}/${id}`, {method: 'DELETE',}); 
    //reload data produk
    fetchData();
  };

  return (
    <Layout>
      
    <div className="mx-auto p-4">

      <h1 className="text-2xl font-bold mb-4">Daftar Barang</h1>

      <div className="space-y-2 mb-4">
        <input
          className="border rounded px-3 py-2 w-full"
          placeholder="Nama Barang / Produk"
          value={nama_brg} //harus sama dgn state
          onChange={(e) => setNamaBrg(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2 w-full"
          placeholder="Harga Satuan"
          value={harga} //harus sama dgn state
          onChange={(e) => setHarga(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleAddItem}>
          Tambah Barang
        </button>
      </div>

      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="w-[5%] border px-4 py-2 text-left">No</th>
            <th className="w-[60%] border px-4 py-2 text-left">Nama Barang</th>
            <th className="w-[20%] border px-4 py-2 text-left">Harga Satuan</th>
            <th className="w-[15%] border px-4 py-2 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item.nama_brg}</td>
              <td className="border px-4 py-2">Rp. {item.harga}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => router.push(`/edit/${item.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                Edit
                </button>

                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  </Layout>
  )
}


