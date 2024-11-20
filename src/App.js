import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  return <Pagination />
}

const Pagination = () => {
  const [users, setUsers] = useState([]) // Kullanıcı verileri
  const [loading, setLoading] = useState(true) // Yükleme durumu
  const [error, setError] = useState(null) // Hata durumu

  // API'den veri alma
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true) // Yükleme başlat
      try {
        const response = await axios.get('https://randomuser.me/api?results=20') // 20 kullanıcı getir
        // Kullanıcı verilerini temizleme
        const cleanedData = response.data.results.map((user) => ({
          name: `${user.name.first} ${user.name.last}`,
          age: user.dob.age,
          email: user.email,
        }))
        setUsers(cleanedData)
        setError(null) // Hata varsa sıfırla
      } catch (err) {
        setError('Kullanıcı verileri alınamadı.') // Hata mesajı
      } finally {
        setLoading(false) // Yükleme tamamlandı
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <p>Veriler yükleniyor...</p> // Yükleme ekranı
  if (error) return <p>{error}</p> // Hata mesajı

  return (
    <div>
      <h1 className="flex justify-center items-center mt-2 font-bold">
        Kullanıcı Listesi
      </h1>
      <Pages content={users} itemsPerPage={5} />
    </div>
  )
}

//ALT BİLEŞEN

const Pages = ({ content, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1) // Geçerli sayfa

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(content.length / itemsPerPage)

  // Geçerli sayfadaki kullanıcıları al
  const currentItems = content.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div>
      <table className="table-auto m-auto text-left">
        <thead>
          <tr className="flex justify-center items-center mt-2">
            <th className="px-4 py-2 text-center">Name</th>
            <th className="px-4 py-2 text-center">Age</th>
            <th className="px-4 py-2 text-center">Email</th>
          </tr>
        </thead>

        <tbody className="flex flex-col items-center mt-2 ml-24">
          {currentItems.map((user, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{user.name} </td>
              <td className="px-4 py-2"> {user.age} </td>
              <td className="px-4 py-2">{user.email} </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sayfa bağlantıları */}
      <div className="flex justify-center mt-20">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className="mx-2 py-2 px-4"
            style={{
              backgroundColor: currentPage === index + 1 ? 'blue' : 'gray',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
