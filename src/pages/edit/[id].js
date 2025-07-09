import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function FormEditBarang() {
    const router = useRouter(); //dipakai untuk navigasi dan mengambil parameter [id]
    const { id } = router.query; //mengambil parameter [id] dari URL, contoh /edit/12 maka id = 12

    //siapkan state yang diisi dari API, agar bisa diedit oleh user
    const [nama_brg, setNamaBrg] = useState('');
    const [harga, setHarga] = useState('');

    const API_URL = `https://6836865f664e72d28e4119cb.mockapi.io/api/toko_saya/barang/${id}`; // sesuaikan endpoint


    //Gunakan useEffect agar data diambil saat komponen dimount atau saat parameter [id] berubah.
    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json()) //ubah response menjadi JSON
            .then((data) => {
                //isikan state untuk ditampilkan di form
                setNamaBrg(data.nama_brg);
                setHarga(data.harga);
            });
    }, []);

    const handleUpdate = async () => {
        await fetch(API_URL, {
            method: 'PUT', //HTTP method untuk update data
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nama_brg, harga }), //berisi data yang akan dikirim ke API
        });
        /*kembali ke halaman product jika data berhasil diupdate
        mau kembali ke halaman manapun, silahkan, terserah!!!*/
        router.push('/product'); 
    };


    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Data</h1>

            <input
            className="border rounded px-3 py-2 w-full mb-2"
            placeholder="Nama"
            value={nama_brg} //isi elemen input dari state, liat kembali bagian useEffect biar paham
            onChange={(e) => setNamaBrg(e.target.value)}
            />

            <input
            className="border rounded px-3 py-2 w-full mb-4"
            placeholder="Alamat"
            value={harga} //ini juga dari state
            onChange={(e) => setHarga(e.target.value)}
            />

            <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            >
            Update Data
            </button>
        </div>
    )
}
